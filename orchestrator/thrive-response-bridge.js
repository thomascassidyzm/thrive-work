#!/usr/bin/env node

/**
 * THRIVE Response Bridge Server
 * Receives responses from Claude Desktop via MCP tool
 * Stores responses for the orchestrator to retrieve
 */

import express from 'express';
import cors from 'cors';
import { EventEmitter } from 'events';

const app = express();
const PORT = 4571;

// Response storage with event emitter for real-time updates
class ResponseStore extends EventEmitter {
  constructor() {
    super();
    this.responses = new Map();
    this.pendingRequests = new Map();
  }

  // Store a response from Claude
  storeResponse(requestId, response) {
    console.log(`Storing response for request ${requestId}`);
    this.responses.set(requestId, {
      response,
      timestamp: new Date().toISOString(),
      retrieved: false
    });
    
    // Emit event for waiting requests
    this.emit(`response-${requestId}`, response);
    
    // Clean up old responses after 5 minutes
    setTimeout(() => {
      this.responses.delete(requestId);
    }, 5 * 60 * 1000);
  }

  // Wait for a response (with timeout)
  async waitForResponse(requestId, timeout = 30000) {
    // Check if response already exists
    if (this.responses.has(requestId)) {
      const data = this.responses.get(requestId);
      data.retrieved = true;
      return data.response;
    }

    // Wait for response with timeout
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.removeListener(`response-${requestId}`, listener);
        reject(new Error('Response timeout'));
      }, timeout);

      const listener = (response) => {
        clearTimeout(timer);
        resolve(response);
      };

      this.once(`response-${requestId}`, listener);
    });
  }
}

const responseStore = new ResponseStore();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-request-id'],
  credentials: true
}));
app.use(express.json());

// Endpoints

// Receive response from Claude Desktop (via MCP tool)
app.post('/bridge/response', (req, res) => {
  const { requestId, response, coach } = req.body;
  
  if (!requestId || !response) {
    return res.status(400).json({ error: 'Missing requestId or response' });
  }
  
  console.log(`Received response from Claude for request ${requestId}`);
  responseStore.storeResponse(requestId, { response, coach });
  
  res.json({ 
    success: true, 
    message: 'Response stored',
    requestId 
  });
});

// Get response (called by orchestrator)
app.get('/bridge/response/:requestId', async (req, res) => {
  const { requestId } = req.params;
  
  try {
    console.log(`Waiting for response for request ${requestId}`);
    const response = await responseStore.waitForResponse(requestId);
    res.json({ 
      success: true, 
      requestId,
      ...response
    });
  } catch (error) {
    res.status(408).json({ 
      error: 'Response timeout',
      message: 'Claude Desktop did not send response in time' 
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'THRIVE Response Bridge',
    port: PORT,
    pendingResponses: responseStore.responses.size,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║       THRIVE Response Bridge Running               ║
╠════════════════════════════════════════════════════╣
║  Port:          ${PORT}                              ║
║  Health:        http://localhost:${PORT}/health      ║
║  Response API:  http://localhost:${PORT}/bridge/response ║
╚════════════════════════════════════════════════════╝

This bridge receives responses from Claude Desktop
via MCP tools and makes them available to the orchestrator.
  `);
});