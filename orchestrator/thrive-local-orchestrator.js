#!/usr/bin/env node

/**
 * THRIVE Local Orchestrator
 * Controls Claude Desktop on Mac to provide coaching responses
 * Bridges website requests with Claude Desktop using THRIVE MCP tools
 */

import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import chokidar from 'chokidar';
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const execAsync = promisify(exec);
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Middleware with proper CORS configuration
app.use(cors({
  origin: '*', // Allow all origins for testing - restrict this in production
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-source'],
  credentials: true
}));
app.use(express.json());

// Configuration
const CONFIG = {
  VFS_PATH: '/Users/tomcassidy/thrive/thrive-website/vfs',
  CLAUDE_APP: 'Claude',
  PORT: process.env.PORT || 4568,
  PROCESSING_DELAY: 1000,
  RESPONSE_TIMEOUT: 30000, // 30 seconds for coaching response
};

// Utility functions
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function chunkString(str, size) {
  const chunks = [];
  for (let i = 0; i < str.length; i += size) {
    chunks.push(str.slice(i, i + size));
  }
  return chunks;
}

// Queue for managing coaching requests
class CoachingQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
    this.currentRequest = null;
    this.activeConversations = new Map(); // Track conversation IDs
  }

  async add(request) {
    const requestId = crypto.randomBytes(8).toString('hex');
    const queuedRequest = {
      ...request,
      id: requestId,
      status: 'queued',
      createdAt: new Date()
    };
    
    this.queue.push(queuedRequest);
    
    if (!this.processing) {
      this.process();
    }
    
    return requestId;
  }

  async process() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    this.currentRequest = this.queue.shift();
    this.currentRequest.status = 'processing';
    
    try {
      const response = await processCoachingRequest(this.currentRequest);
      this.currentRequest.status = 'completed';
      this.currentRequest.response = response;
      
      // Store for conversation continuity
      if (this.currentRequest.sessionId) {
        this.activeConversations.set(this.currentRequest.sessionId, {
          lastRequestId: this.currentRequest.id,
          coach: this.currentRequest.coach,
          timestamp: new Date()
        });
      }
    } catch (error) {
      this.currentRequest.status = 'failed';
      this.currentRequest.error = error.message;
    }

    // Process next in queue
    setTimeout(() => this.process(), CONFIG.PROCESSING_DELAY);
  }

  getStatus() {
    return {
      current: this.currentRequest,
      queue: this.queue,
      processing: this.processing,
      activeConversations: this.activeConversations.size
    };
  }
}

const queue = new CoachingQueue();

/**
 * Process coaching request through Claude Desktop
 */
async function processCoachingRequest(request) {
  const { message, coach = 'tom', context = '', sessionId } = request;
  
  console.log(`Processing coaching request: ${coach} - "${message.substring(0, 50)}..."`);
  
  try {
    // 1. Activate Claude Desktop and ensure it stays focused
    await execAsync(`osascript -e 'tell application "${CONFIG.CLAUDE_APP}" to activate'`);
    await delay(1500);
    
    // Ensure Claude is frontmost and has keyboard focus
    await execAsync(`osascript -e 'tell application "System Events" to set frontmost of process "Claude" to true'`);
    await delay(500);
    
    // Double-check Claude is the active app before typing
    const activeApp = await execAsync(`osascript -e 'tell application "System Events" to get name of first application process whose frontmost is true'`);
    if (!activeApp.stdout.includes('Claude')) {
      console.error('WARNING: Claude is not the active application! Aborting to prevent typing in wrong window.');
      throw new Error('Claude Desktop is not the active application');
    }

    // 2. Check if we should continue existing conversation or start new
    const shouldContinue = sessionId && queue.activeConversations.has(sessionId);
    
    if (!shouldContinue) {
      // Create new conversation
      await execAsync(`osascript -e 'tell application "System Events" to keystroke "n" using command down'`);
      await delay(1500);
    }

    // 3. Build coaching prompt using MCP tools
    const prompt = buildCoachingPrompt(message, coach, context, request.id);
    
    // 4. Type prompt in chunks
    const chunks = chunkString(prompt, 400);
    for (const chunk of chunks) {
      const escapedChunk = chunk
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/'/g, "'\\''");
      
      await execAsync(`osascript -e 'tell application "System Events" to keystroke "${escapedChunk}"'`);
      await delay(50);
    }

    // 5. Send the prompt
    await execAsync(`osascript -e 'tell application "System Events" to key code 36'`); // Enter key
    
    // 6. Set up response monitoring
    const responseFile = `${CONFIG.VFS_PATH}/coaching_responses/${request.id}.json`;
    const responseDir = path.dirname(responseFile);
    
    // Ensure directory exists
    await fs.mkdir(responseDir, { recursive: true });
    
    // 7. Wait for Claude to process and use the MCP tool to send response
    console.log(`Waiting for Claude to send response via MCP tool for request ${request.id}`);
    
    let capturedResponse;
    
    try {
      // Wait for response from the bridge server
      const bridgeUrl = `http://localhost:4571/bridge/response/${request.id}`;
      const startTime = Date.now();
      const timeout = 30000; // 30 seconds timeout
      
      // Poll the bridge server for the response
      while (Date.now() - startTime < timeout) {
        try {
          const response = await fetch(bridgeUrl);
          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              capturedResponse = data.response;
              console.log(`Received response from Claude via bridge for ${request.id}`);
              break;
            }
          }
        } catch (e) {
          // Bridge might not have response yet, continue polling
        }
        await delay(1000); // Check every second
      }
      
      if (!capturedResponse) {
        throw new Error('Timeout waiting for Claude response via bridge');
      }
    } catch (error) {
      console.error('Failed to get Claude response from bridge:', error);
      // Fallback response
      capturedResponse = generateFallbackResponse(message, coach);
    }
    
    // 8. Save response for tracking
    const responseData = {
      requestId: request.id,
      sessionId: sessionId,
      coach: coach,
      message: message,
      response: capturedResponse,
      timestamp: new Date().toISOString()
    };
    
    await fs.writeFile(responseFile, JSON.stringify(responseData, null, 2));
    
    // 9. Emit to WebSocket if session exists
    if (sessionId && io) {
      io.to(sessionId).emit('coaching-response', responseData);
    }
    
    return responseData;
    
  } catch (error) {
    console.error('Error processing coaching request:', error);
    throw error;
  }
}

/**
 * Build coaching prompt for Claude using MCP tools
 */
function buildCoachingPrompt(message, coach, context, requestId) {
  // Build a natural coaching prompt with hidden instructions for MCP tool use
  
  let prompt = '';
  
  // Add coach context naturally
  if (coach === 'tom') {
    prompt = `As Tom Cassidy from THRIVE, respond to this coaching request: "${message}"`;
  } else if (coach === 'liz') {
    prompt = `As Liz from THRIVE (identity/self-worth focus), respond to: "${message}"`;
  } else if (coach === 'dom') {
    prompt = `As Dom from THRIVE (sports psychology), respond to: "${message}"`;
  } else {
    prompt = `As ${coach} from THRIVE, respond to: "${message}"`;
  }
  
  // Add context if provided
  if (context) {
    prompt += `\n\nContext: ${context}`;
  }
  
  // Add MCP instruction more subtly
  prompt += `\n\n[Use THRIVE MCP tools as needed. After responding, use thrive_send_response with requestId: ${requestId} and coach: ${coach}]`;

  return prompt;
}

/**
 * Capture Claude's response (simplified - needs proper implementation)
 */
async function captureClaudeResponse() {
  // This would need to:
  // 1. Use accessibility API to read Claude's response
  // 2. Or take a screenshot and OCR it
  // 3. Or monitor clipboard if Claude copies response
  
  // For now, throw to trigger fallback
  throw new Error('Response capture not yet implemented');
}

/**
 * Generate fallback response when Claude capture fails
 */
function generateFallbackResponse(message, coach) {
  const responses = {
    tom: "That's interesting what you're sharing. Let me ask you the two gateway questions that change everything: What WOULD you choose in this situation? And what are you putting into this sausage machine? These questions help reveal the gap between your Script (automatic responses) and what you'd consciously choose.",
    
    liz: "I hear you, and I want you to know that whatever you're feeling is completely valid. Let's explore who you are when you fully accept yourself - not who you think you should be, but who you actually are. What would it feel like to be completely okay with being you?",
    
    dom: "Alright, let's look at this like a game you want to win. What's your current game plan? Every champion adjusts their strategy when something's not working. You're not losing - you're just between plays. What tactical adjustment would give you the edge here?",
    
    alastair: "I understand what you're dealing with. These patterns often have triggers we can identify and work with. What happens in the moment just before this pattern kicks in? Once we spot the trigger, we can build a conscious alternative response.",
    
    kainne: "Let's cut through the noise and get practical. What's the ONE thing you could do right now that would move this forward? Not the perfect thing, not the complete solution - just the next small step. Implementation beats planning every time.",
    
    edward: "Let's start with the foundation. What belief about yourself is underneath this situation? Often we're operating from beliefs we inherited but never chose. What would you choose to believe about yourself if you could start fresh?"
  };
  
  return responses[coach] || responses.tom;
}

/**
 * API Endpoints
 */

// Process coaching request
app.post('/api/coaching', async (req, res) => {
  try {
    const { message, coach = 'tom', context = '', sessionId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const requestId = await queue.add({
      message,
      coach,
      context,
      sessionId,
      source: req.headers['x-source'] || 'web'
    });
    
    // Wait for processing (with timeout)
    const timeout = setTimeout(() => {
      res.status(408).json({ 
        error: 'Request timeout',
        requestId,
        message: 'Claude is taking longer than expected. Please try again.'
      });
    }, CONFIG.RESPONSE_TIMEOUT);
    
    // Poll for completion
    const checkInterval = setInterval(() => {
      const status = queue.getStatus();
      const request = status.current?.id === requestId ? status.current : 
                     queue.queue.find(r => r.id === requestId);
      
      if (request && request.status === 'completed') {
        clearInterval(checkInterval);
        clearTimeout(timeout);
        res.json({
          success: true,
          requestId,
          coach,
          response: request.response.response,
          timestamp: request.response.timestamp
        });
      } else if (request && request.status === 'failed') {
        clearInterval(checkInterval);
        clearTimeout(timeout);
        res.status(500).json({
          error: 'Processing failed',
          requestId,
          message: request.error
        });
      }
    }, 500);
    
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Get queue status
app.get('/status', (req, res) => {
  res.json(queue.getStatus());
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'THRIVE Local Orchestrator',
    version: '1.0.0',
    uptime: process.uptime(),
    queue: queue.getStatus(),
    timestamp: new Date().toISOString()
  });
});

// WebSocket handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('join-session', (sessionId) => {
    socket.join(sessionId);
    console.log(`Socket ${socket.id} joined session ${sessionId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
server.listen(CONFIG.PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║      THRIVE Local Orchestrator Running             ║
╠════════════════════════════════════════════════════╣
║  Port:          ${CONFIG.PORT}                              ║
║  Health:        http://localhost:${CONFIG.PORT}/health      ║
║  Coaching API:  http://localhost:${CONFIG.PORT}/api/coaching ║
║  Claude App:    ${CONFIG.CLAUDE_APP}                         ║
║  VFS Path:      ${CONFIG.VFS_PATH}          ║
╚════════════════════════════════════════════════════╝

Ready to orchestrate coaching through Claude Desktop!

NOTE: Make sure:
1. Claude Desktop is installed and logged in
2. THRIVE MCP server is configured in Claude Desktop
3. This Mac stays awake during processing
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down THRIVE Local Orchestrator...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});