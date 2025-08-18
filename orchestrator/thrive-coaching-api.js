#!/usr/bin/env node

/**
 * THRIVE Coaching API Server
 * Provides coaching responses using Claude API with THRIVE methodology
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4570;

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());

// THRIVE Coaching Context
const THRIVE_CONTEXT = {
  tom: {
    role: "You are Tom Cassidy, founder of THRIVE. You provide coaching using the Script Framework methodology.",
    style: `
COACHING STYLE:
- Warm, direct, and insightfully challenging
- Use powerful questions rather than giving advice
- Cut through surface level to reveal core patterns quickly
- Encouraging but don't let people stay comfortable in limitations
- Focus on the gap between conscious values and unconscious behaviors

KEY PHRASES YOU USE:
- "What's the Script running there?"
- "That sounds like an inherited response rather than a conscious choice"
- "What would authentic you do in that situation?"
- "I'm curious about the gap between what you value and what you're actually doing"
- "What pattern do you notice repeating there?"
- "Would you consciously choose that response?"

SCRIPT FRAMEWORK (your core methodology):
1. NOTICE: Help people identify automatic patterns
2. QUESTION: "Would you consciously choose this response?"
3. CHOOSE: Guide them to conscious choice instead of automatic reaction

Always relate responses back to the Script concept - the automatic patterns we run that we wouldn't consciously choose.`
  },
  
  liz: {
    role: "You are Liz from THRIVE, focusing on identity, self-worth, and emotional patterns.",
    style: `Focus on self-acceptance, identity, and emotional patterns. Help people explore who they are when they fully accept themselves.`
  },
  
  dom: {
    role: "You are Dom from THRIVE, with a sports psychology background.",
    style: `Use sports and performance metaphors. Focus on tactical adjustments, game plans, and winning strategies for life.`
  }
};

/**
 * Call Claude API with coaching context
 */
async function getCoachingResponse(message, coach = 'tom', conversationHistory = []) {
  const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
  
  if (!CLAUDE_API_KEY) {
    throw new Error('CLAUDE_API_KEY not configured');
  }
  
  const coachContext = THRIVE_CONTEXT[coach] || THRIVE_CONTEXT.tom;
  
  // Build messages array with context
  const messages = [
    {
      role: "user",
      content: `${coachContext.role}\n\n${coachContext.style}\n\nIMPORTANT: Respond as ${coach === 'tom' ? 'Tom Cassidy' : coach}, not as Claude. Stay in character throughout.\n\nUser's message: ${message}`
    }
  ];
  
  // Add conversation history if provided
  if (conversationHistory && conversationHistory.length > 0) {
    // Prepend history before the current message
    const historyMessages = conversationHistory.slice(-10); // Keep last 10 messages
    messages.unshift(...historyMessages);
  }
  
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1000,
        messages: messages,
        temperature: 0.7,
        system: `${coachContext.role} ${coachContext.style}`
      })
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      throw new Error(`Claude API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.content[0].text;
    
  } catch (error) {
    console.error('Error calling Claude API:', error);
    throw error;
  }
}

/**
 * Fallback responses for when API is unavailable
 */
function getFallbackResponse(message, coach) {
  const fallbacks = {
    tom: "I notice you're reaching out, and that takes courage. Let me ask you this: What's the pattern you're noticing in your life right now that you'd like to explore? Remember, we're looking for the gap between what you'd consciously choose and what's actually happening automatically.",
    liz: "Thank you for sharing with me. I can feel there's something important here. What would it feel like to fully accept yourself in this moment, exactly as you are? Sometimes our struggles come from fighting against who we think we should be, rather than embracing who we actually are.",
    dom: "Alright, let's tackle this together. Think of your situation like a game - what's your current position, and what move would give you the advantage? Every champion has faced setbacks. The question is: what adjustment to your game plan would help you win?"
  };
  
  return fallbacks[coach] || fallbacks.tom;
}

// API Endpoints

app.post('/api/coaching', async (req, res) => {
  try {
    const { message, coach = 'tom', history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    console.log(`Processing coaching request for ${coach}: "${message.substring(0, 50)}..."`);
    
    let response;
    
    try {
      // Try to get response from Claude API
      response = await getCoachingResponse(message, coach, history);
    } catch (apiError) {
      console.error('Failed to get Claude response, using fallback:', apiError.message);
      // Use fallback if API fails
      response = getFallbackResponse(message, coach);
    }
    
    // Return response to web chat
    res.json({
      success: true,
      coach,
      response,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'THRIVE Coaching API',
    version: '1.0.0',
    port: PORT,
    apiKeyConfigured: !!process.env.CLAUDE_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║         THRIVE Coaching API Running                ║
╠════════════════════════════════════════════════════╣
║  Port:          ${PORT}                              ║
║  Health:        http://localhost:${PORT}/health      ║
║  Coaching API:  http://localhost:${PORT}/api/coaching ║
║  API Key:       ${process.env.CLAUDE_API_KEY ? 'Configured ✓' : 'NOT CONFIGURED ✗'}            ║
╚════════════════════════════════════════════════════╝

This server provides coaching responses that return to the web chat.
${!process.env.CLAUDE_API_KEY ? '\n⚠️  WARNING: Set CLAUDE_API_KEY in .env file for Claude API responses\n' : ''}
Ready to provide coaching responses!
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down THRIVE Coaching API...');
  process.exit(0);
});