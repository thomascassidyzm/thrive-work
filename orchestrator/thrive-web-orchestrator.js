#!/usr/bin/env node

/**
 * THRIVE Web Orchestrator
 * HTTP server that handles coaching requests from the website
 * Exposes via Cloudflare tunnel for production access
 */

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for now, tighten in production
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Configuration
const CONFIG = {
  PORT: process.env.PORT || 4568,
  CLAUDE_API_KEY: process.env.CLAUDE_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  API_PROVIDER: process.env.API_PROVIDER || 'claude' // 'claude' or 'openai'
};

// Tom's coaching methodology (imported from api/tom-coaching.js)
const COACHING_STYLES = {
  tom: {
    name: "Tom Cassidy",
    personality: {
      tone: "Warm, direct, and insightfully challenging",
      approach: "Uses powerful questions rather than giving advice",
      style: "Cuts through surface level to reveal core patterns quickly",
      energy: "Encouraging but doesn't let people stay comfortable in limitations"
    },
    signature_phrases: [
      "What are you noticing about that pattern?",
      "Would you consciously choose that response?",
      "What's the Script running there?",
      "If you could pause and choose consciously, what would you do differently?",
      "That sounds like an inherited response rather than a conscious choice",
      "What would authentic you do in that situation?",
      "I'm curious about the gap between what you value and what you're actually doing",
      "What pattern do you notice repeating there?",
      "That's interesting - tell me more about that automatic response"
    ],
    gateway_questions: {
      primary: "What WOULD you choose?",
      secondary: "What are you putting in?"
    },
    responses: {
      patterns: "That stuckness often points to a Script - an inherited response pattern you wouldn't consciously choose. What do you notice about the moment just before that pattern kicks in? What would authentic you choose to do differently in that situation?",
      relationships: "Relationships reveal our patterns so clearly. What do you notice about your automatic response in those moments? If you could pause before reacting, what would conscious choice look like? What's the gap between how you want to show up and what actually happens automatically?",
      overwhelm: "Ah, that's exactly why Ben Franklin's system is so brilliant. He tried to improve everything at once and failed miserably. So he created the 13 Virtues - focus on just one thing per week. By the time you cycle through all 13, you've raised the 'sea of unconscious competence' gradually. It's minimum willpower, zero pressure. What would happen if you just picked one thing to notice this week?"
    }
  },
  
  liz: {
    name: "Liz",
    personality: {
      tone: "Compassionate, empowering, deeply accepting",
      approach: "Helps people feel good about being exactly who they are",
      style: "Identity-focused, self-worth building",
      energy: "Warm embrace that makes you feel seen and valued"
    },
    focus: "Identity work, self-worth, feeling good about being YOU",
    key_questions: [
      "Who would you be if you fully accepted yourself?",
      "What if there's nothing wrong with you?",
      "How would it feel to love this part of yourself?"
    ]
  },
  
  dom: {
    name: "Dom",
    personality: {
      tone: "Athletic, strategic, competitive but supportive",
      approach: "Everything is a game you can win with the right strategy",
      style: "Sports psychology applied to life",
      energy: "Coach in the locker room giving you the winning game plan"
    },
    focus: "Performance, winning mindset, competitive edge",
    metaphors: [
      "What's your game plan here?",
      "That's a tactical error in your thinking",
      "You're playing not to lose instead of playing to win",
      "Time to adjust your strategy at halftime"
    ]
  },
  
  alastair: {
    name: "Alastair",
    personality: {
      tone: "Understanding, non-judgmental, pattern-aware",
      approach: "Helps identify triggers and build conscious alternatives",
      style: "Gentle but persistent in breaking cycles",
      energy: "Calm presence that makes change feel possible"
    },
    focus: "Addictions, compulsive patterns, OCD",
    key_tools: [
      "Trigger identification",
      "Pattern interruption",
      "Replacement behaviors",
      "Urge surfing"
    ]
  },
  
  kainne: {
    name: "Kainne",
    personality: {
      tone: "Practical, action-oriented, results-focused",
      approach: "Implementation over information, doing over planning",
      style: "ADHD-friendly, bite-sized actions",
      energy: "Let's get this done together, one step at a time"
    },
    focus: "Business, getting things done, ADHD",
    principles: [
      "Implementation beats information",
      "Start before you're ready",
      "Progress over perfection",
      "One thing at a time"
    ]
  },
  
  edward: {
    name: "Edward",
    personality: {
      tone: "Gentle, foundational, belief-examining",
      approach: "Start with basics and build solid foundations",
      style: "Patient exploration of limiting beliefs",
      energy: "Wise teacher helping you see what you couldn't see before"
    },
    focus: "Foundations, self-acceptance, limiting beliefs",
    approach_steps: [
      "Identify the limiting belief",
      "Trace it to its origin",
      "Question its validity",
      "Replace with chosen belief"
    ]
  }
};

// Generate coaching response using AI
async function generateCoachingResponse(message, coach = 'tom', context = '') {
  const coachStyle = COACHING_STYLES[coach] || COACHING_STYLES.tom;
  
  // Build system prompt based on coach
  const systemPrompt = buildCoachingPrompt(coachStyle, coach);
  
  try {
    if (CONFIG.API_PROVIDER === 'openai' && CONFIG.OPENAI_API_KEY) {
      return await callOpenAI(systemPrompt, message, context);
    } else if (CONFIG.CLAUDE_API_KEY) {
      return await callClaude(systemPrompt, message, context);
    } else {
      // Fallback to scripted response
      return generateScriptedResponse(message, coachStyle, coach);
    }
  } catch (error) {
    console.error('AI API error:', error);
    return generateScriptedResponse(message, coachStyle, coach);
  }
}

// Build coaching prompt for AI
function buildCoachingPrompt(coachStyle, coachKey) {
  let prompt = `You are ${coachStyle.name}, a coach in the THRIVE system. `;
  
  if (coachKey === 'tom') {
    prompt += `You are the founder of THRIVE and use a specific methodology.

Your personality: ${coachStyle.personality.tone}
Your approach: ${coachStyle.personality.approach}
Your style: ${coachStyle.personality.style}

Core tools:
- The Two Gateway Questions: "${coachStyle.gateway_questions.primary}" and "${coachStyle.gateway_questions.secondary}"
- Script identification: Everything you do that you wouldn't consciously choose
- Pattern recognition: Help people notice their automatic responses
- 13x4 System: Ben Franklin's approach - one focus per week

Use these signature phrases naturally:
${coachStyle.signature_phrases.map(p => `- ${p}`).join('\n')}

Remember: Never give advice. Ask questions that help them discover their own answers.`;
  } else {
    prompt += `
Personality: ${coachStyle.personality.tone}
Approach: ${coachStyle.personality.approach}
Style: ${coachStyle.personality.style}
Focus: ${coachStyle.focus}

${coachKey === 'dom' ? `Use sports metaphors: ${coachStyle.metaphors.join(', ')}` : ''}
${coachKey === 'liz' ? `Key questions: ${coachStyle.key_questions.join(', ')}` : ''}
${coachKey === 'kainne' ? `Principles: ${coachStyle.principles.join(', ')}` : ''}
${coachKey === 'alastair' ? `Tools: ${coachStyle.key_tools.join(', ')}` : ''}
${coachKey === 'edward' ? `Approach: ${coachStyle.approach_steps.join(' → ')}` : ''}

Always maintain the THRIVE philosophy: Help people notice patterns and choose consciously.`;
  }
  
  return prompt;
}

// Call Claude API
async function callClaude(systemPrompt, message, context) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': CONFIG.CLAUDE_API_KEY,
      'Anthropic-Version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 500,
      system: systemPrompt,
      messages: [{
        role: 'user',
        content: context ? `Context: ${context}\n\nMessage: ${message}` : message
      }]
    })
  });
  
  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }
  
  const data = await response.json();
  return {
    text: data.content[0].text,
    source: 'claude_api'
  };
}

// Call OpenAI API
async function callOpenAI(systemPrompt, message, context) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CONFIG.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: context ? `Context: ${context}\n\nMessage: ${message}` : message }
      ],
      max_tokens: 500,
      temperature: 0.7
    })
  });
  
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }
  
  const data = await response.json();
  return {
    text: data.choices[0].message.content,
    source: 'openai_api'
  };
}

// Generate scripted fallback response
function generateScriptedResponse(message, coachStyle, coach) {
  const messageLower = message.toLowerCase();
  
  // Tom's responses
  if (coach === 'tom') {
    if (messageLower.includes('procrastinat')) {
      return {
        text: "There is no such thing as procrastination. What's going on is that you just don't know what you really want. Once you know exactly what you want in life, everything either gets you closer to your vision or further away. Will this get me closer to where I want to go? Yes or no? If it's closer... Do it! If it's further away... Don't do it!",
        source: 'scripted'
      };
    }
    
    if (messageLower.includes('pattern') || messageLower.includes('stuck')) {
      return {
        text: coachStyle.responses.patterns,
        source: 'scripted'
      };
    }
    
    if (messageLower.includes('relationship')) {
      return {
        text: coachStyle.responses.relationships,
        source: 'scripted'
      };
    }
    
    if (messageLower.includes('overwhelm') || messageLower.includes('too much')) {
      return {
        text: coachStyle.responses.overwhelm,
        source: 'scripted'
      };
    }
  }
  
  // Default response using gateway questions
  return {
    text: `That's interesting what you're sharing. Let me ask you the two gateway questions that change everything: What WOULD you choose in this situation? And what are you putting into this sausage machine? These are the most robust, quick, and simple tools for life transformation.`,
    source: 'scripted'
  };
}

// API Endpoints
app.post('/api/coaching', async (req, res) => {
  try {
    const { message, coach = 'tom', context = '', sessionId } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    console.log(`Coaching request: ${coach} - "${message.substring(0, 50)}..."`);
    
    // Generate response
    const response = await generateCoachingResponse(message, coach, context);
    
    // Emit to WebSocket if session provided
    if (sessionId && io) {
      io.to(sessionId).emit('coaching-response', response);
    }
    
    res.json({
      success: true,
      coach,
      response: response.text,
      source: response.source,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Coaching error:', error);
    res.status(500).json({
      error: 'Failed to generate coaching response',
      message: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'THRIVE Web Orchestrator',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    config: {
      api_provider: CONFIG.API_PROVIDER,
      claude_configured: !!CONFIG.CLAUDE_API_KEY,
      openai_configured: !!CONFIG.OPENAI_API_KEY
    }
  });
});

// WebSocket connection handling
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
║        THRIVE Web Orchestrator Running             ║
╠════════════════════════════════════════════════════╣
║  Port:          ${CONFIG.PORT}                              ║
║  Health:        http://localhost:${CONFIG.PORT}/health      ║
║  Coaching API:  http://localhost:${CONFIG.PORT}/api/coaching ║
║  API Provider:  ${CONFIG.API_PROVIDER}                          ║
╚════════════════════════════════════════════════════╝

Ready to handle coaching requests!
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down THRIVE Web Orchestrator...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});