#!/usr/bin/env node

/**
 * THRIVE MCP Bridge Server
 * Connects the MCP server with Claude API for live AI coaching
 */

const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
require('dotenv').config();

const app = express();
const PORT = process.env.BRIDGE_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MCP Server process
let mcpProcess = null;

// Start MCP Server
function startMCPServer() {
  console.log('Starting MCP Server...');
  mcpProcess = spawn('node', ['../mcp-server/server.js'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: __dirname
  });

  mcpProcess.stdout.on('data', (data) => {
    console.log('MCP Server:', data.toString());
  });

  mcpProcess.stderr.on('data', (data) => {
    console.error('MCP Server Error:', data.toString());
  });

  mcpProcess.on('close', (code) => {
    console.log(`MCP Server exited with code ${code}`);
    if (code !== 0) {
      // Restart MCP server if it crashes
      setTimeout(startMCPServer, 5000);
    }
  });
}

// MCP Communication Helper
async function callMCPServer(tool, args) {
  return new Promise((resolve, reject) => {
    if (!mcpProcess) {
      reject(new Error('MCP Server not running'));
      return;
    }

    const request = JSON.stringify({
      method: 'tools/call',
      params: {
        name: tool,
        arguments: args
      }
    });

    mcpProcess.stdin.write(request + '\n');

    // Listen for response
    const timeout = setTimeout(() => {
      reject(new Error('MCP Server timeout'));
    }, 10000);

    mcpProcess.stdout.once('data', (data) => {
      clearTimeout(timeout);
      try {
        const response = JSON.parse(data.toString());
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Claude API Integration
async function callClaudeAPI(message, context = '') {
  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
  
  if (!CLAUDE_API_KEY) {
    throw new Error('Claude API key not configured');
  }

  // Get coaching context from MCP server
  let mcpGuidance = '';
  try {
    const mcpResponse = await callMCPServer('get_tom_coaching_response', {
      user_message: message,
      context: context
    });
    mcpGuidance = mcpResponse.content?.[0]?.text || '';
  } catch (error) {
    console.log('MCP Server unavailable, using direct guidance');
  }

  // Enhanced system prompt with MCP guidance
  const systemPrompt = `You are Tom Cassidy, founder of THRIVE, coaching through AI. Use the THRIVE methodology and respond exactly as Tom would.

${mcpGuidance ? `MCP GUIDANCE: ${mcpGuidance}` : ''}

CORE THRIVE METHODOLOGY:
- The Two Gateway Questions: "What WOULD I choose?" and "What am I putting in?"
- Script Framework: Notice, Question, Choose
- Focus on patterns and conscious choice over advice-giving
- Use Tom's warm but challenging tone
- Reference Ben Franklin's 13x4 system when relevant

Respond as Tom would - focusing on helping people notice their Scripts and choose consciously.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': CLAUDE_API_KEY,
      'Anthropic-Version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 500,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: message
      }]
    })
  });

  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }

  return await response.json();
}

// Bridge API Endpoint
app.post('/api/coaching', async (req, res) => {
  try {
    const { message, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Bridge: Processing coaching request:', message);

    // Try Claude API with MCP enhancement
    try {
      const claudeResponse = await callClaudeAPI(message, context);
      
      console.log('Bridge: Claude API successful');
      res.json({
        ...claudeResponse,
        source: 'claude_mcp_enhanced'
      });

    } catch (claudeError) {
      console.log('Bridge: Claude API failed, trying MCP direct:', claudeError.message);
      
      // Fallback to MCP server direct
      try {
        const mcpResponse = await callMCPServer('get_tom_coaching_response', {
          user_message: message,
          context: context
        });

        res.json({
          content: mcpResponse.content,
          source: 'mcp_direct'
        });

      } catch (mcpError) {
        console.log('Bridge: MCP direct failed, using basic fallback');
        
        // Final fallback
        res.json({
          content: [{
            text: "That's interesting what you're sharing. Let me ask you the two gateway questions that change everything: What WOULD you choose in this situation? And what are you putting into this sausage machine? These are the most robust, quick, and simple tools for life transformation."
          }],
          source: 'bridge_fallback'
        });
      }
    }

  } catch (error) {
    console.error('Bridge: Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    mcp_running: !!mcpProcess,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`THRIVE Bridge Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Coaching API: http://localhost:${PORT}/api/coaching`);
  
  // Start MCP Server
  startMCPServer();
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down bridge server...');
  if (mcpProcess) {
    mcpProcess.kill();
  }
  process.exit(0);
});