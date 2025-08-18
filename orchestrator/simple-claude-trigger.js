#!/usr/bin/env node

/**
 * Simple Claude Desktop Trigger Server
 * Opens Claude Desktop with coaching prompts - no response capture
 */

import express from 'express';
import { exec } from 'child_process';
import { promisify } from 'util';
import cors from 'cors';

const execAsync = promisify(exec);
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
app.use(express.json());

const PORT = process.env.PORT || 4569;

// Utility function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Open Claude Desktop with a coaching message
 */
async function sendToClaudeDesktop(message, coach = 'tom') {
  try {
    console.log(`Opening Claude Desktop for ${coach}: "${message.substring(0, 50)}..."`);
    
    // 1. Activate Claude Desktop
    await execAsync(`osascript -e 'tell application "Claude" to activate'`);
    await delay(1500);
    
    // 2. Ensure Claude is frontmost
    await execAsync(`osascript -e 'tell application "System Events" to set frontmost of process "Claude" to true'`);
    await delay(500);
    
    // 3. Create new conversation (Cmd+N)
    await execAsync(`osascript -e 'tell application "System Events" to keystroke "n" using command down'`);
    await delay(1000);
    
    // 4. Build the coaching prompt
    let prompt = '';
    if (coach === 'tom') {
      prompt = `As Tom Cassidy, founder of THRIVE, I need your help with something. ${message}`;
    } else if (coach === 'liz') {
      prompt = `As Liz from THRIVE, focusing on identity and self-worth, I'd like support with: ${message}`;
    } else if (coach === 'dom') {
      prompt = `As Dom from THRIVE, with a sports psychology background, I need coaching on: ${message}`;
    }
    
    // 5. Type the prompt in chunks to avoid issues with long text
    const chunks = prompt.match(/.{1,200}/g) || [];
    for (const chunk of chunks) {
      const escapedChunk = chunk
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/'/g, "\\'");
      
      await execAsync(`osascript -e 'tell application "System Events" to keystroke "${escapedChunk}"'`);
      await delay(100);
    }
    
    // 6. Send the message (Enter key)
    await execAsync(`osascript -e 'tell application "System Events" to key code 36'`);
    
    console.log('Message sent to Claude Desktop successfully');
    return { success: true, message: 'Claude Desktop opened with your message' };
    
  } catch (error) {
    console.error('Error opening Claude Desktop:', error);
    throw error;
  }
}

// API Endpoints

// Main coaching endpoint
app.post('/api/coaching', async (req, res) => {
  try {
    const { message, coach = 'tom' } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Send to Claude Desktop
    const result = await sendToClaudeDesktop(message, coach);
    
    // Return success immediately
    res.json({
      success: true,
      coach,
      message: 'Your message has been sent to Claude Desktop. Check the Claude app for the response.',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      error: 'Failed to open Claude Desktop',
      message: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Simple Claude Trigger',
    version: '1.0.0',
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║      Simple Claude Desktop Trigger Running         ║
╠════════════════════════════════════════════════════╣
║  Port:          ${PORT}                              ║
║  Health:        http://localhost:${PORT}/health      ║
║  Coaching API:  http://localhost:${PORT}/api/coaching ║
╚════════════════════════════════════════════════════╝

This server will:
✓ Open Claude Desktop when you send a message
✓ Create a new conversation
✓ Type your coaching message
✓ Let you see and interact with Claude's response

Ready to trigger Claude Desktop!
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down Simple Claude Trigger...');
  process.exit(0);
});