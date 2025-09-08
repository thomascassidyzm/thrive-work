// THRIVE Coaching API v2 - Simplified with external prompts
// Fetches coaching instructions from website for easy maintenance

// Cache for coaching prompts (15 minute TTL)
let promptsCache = null;
let cacheExpiry = 0;

// Simple metrics storage (in production, use a database)
const sessionMetricsStorage = [];
const effectivePatterns = {
  tom: [],
  lucy: [],
  liz: [],
  dom: [],
  alastair: [],
  kainne: [],
  edward: []
};

async function getCoachingPrompts() {
  const now = Date.now();
  
  // Return cached prompts if still valid
  if (promptsCache && now < cacheExpiry) {
    return promptsCache;
  }
  
  try {
    // Fetch prompts from the website (same domain in production)
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://www.thrive-work.com';
    const response = await fetch(`${baseUrl}/coaching-prompts/`);
    if (!response.ok) {
      throw new Error('Failed to fetch coaching prompts');
    }
    
    const html = await response.text();
    // Extract the prompts from the pre tag
    const match = html.match(/<pre id="coaching-prompts">([\s\S]*?)<\/pre>/);
    if (!match) {
      throw new Error('Could not parse coaching prompts');
    }
    
    promptsCache = match[1].trim();
    cacheExpiry = now + (2 * 60 * 60 * 1000); // Cache for 2 hours
    
    return promptsCache;
  } catch (error) {
    console.error('Error fetching coaching prompts:', error);
    // Return basic fallback prompts
    return `You are a THRIVE coach. Respond with warmth, insight, and powerful questions.
Focus on patterns, conscious choice, and the gap between values and behaviors.`;
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { message, coach = 'tom', conversation_history = [], session_id } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Track session metrics for feedback loop
    const sessionMetrics = {
      session_id: session_id || `session_${Date.now()}`,
      coach: coach,
      message_count: conversation_history.length + 1,
      timestamp: new Date().toISOString(),
      message_length: message.length,
      conversation_depth: conversation_history.length
    };
    
    // Get coaching prompts
    const coachingPrompts = await getCoachingPrompts();
    
    // Build system prompt based on coach
    let systemPrompt = coachingPrompts;
    
    // Add coach-specific focus
    if (coach !== 'tom') {
      systemPrompt += `\n\nYou are responding as ${coach} from the THRIVE team. Focus on your specific expertise while using the THRIVE methodology.`;
    }
    
    // Learning enhancement: Include effective patterns for this coach
    const effectivePatterns = getEffectivePatternsForCoach(coach);
    if (effectivePatterns.length > 0) {
      const recentEffective = effectivePatterns.slice(-3); // Last 3 effective patterns
      systemPrompt += `\n\nRecent effective responses that led to deep engagement (${recentEffective.length} patterns):`;
      recentEffective.forEach((pattern, i) => {
        systemPrompt += `\n${i+1}. Deep conversation (${pattern.conversation_depth} exchanges): "${pattern.response_preview}..."`;
      });
      systemPrompt += `\n\nUse insights from these successful patterns when relevant.`;
    }
    
    // Only use API if key is configured
    if (!process.env.CLAUDE_API_KEY || process.env.CLAUDE_API_KEY.includes('your-api-key')) {
      // Return intelligent fallback
      return res.status(200).json({
        content: [{
          text: generateFallbackResponse(message, coach)
        }],
        source: 'fallback'
      });
    }
    
    // Call Claude API
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'prompt-caching-2024-07-31'
      },
      body: JSON.stringify({
        model: 'claude-3-5-haiku-20241022',
        max_tokens: 800,
        system: [
          {
            type: 'text',
            text: systemPrompt,
            cache_control: { type: 'ephemeral' }  // Cache this for 5 minutes
          }
        ],
        messages: [
          ...conversation_history.map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          {
            role: 'user',
            content: message
          }
        ]
      })
    });
    
    if (!claudeResponse.ok) {
      const errorText = await claudeResponse.text();
      console.error('Claude API error:', errorText);
      throw new Error(`Claude API error: ${claudeResponse.status}`);
    }
    
    const data = await claudeResponse.json();
    
    // Store session metrics for learning (simple approach - log to console for now)
    // TODO: Replace with database storage or analytics service
    if (sessionMetrics.conversation_depth > 3) {
      console.log('🔥 ENGAGED SESSION:', sessionMetrics);
    }
    logSessionMetrics(sessionMetrics, data.content[0]?.text || '');
    
    return res.status(200).json({
      ...data,
      source: 'claude_api',
      session_metrics: sessionMetrics // Include for frontend tracking
    });
    
  } catch (error) {
    console.error('API error:', error);
    
    // Always return a response rather than erroring
    return res.status(200).json({
      content: [{
        text: generateFallbackResponse(req.body.message || '', req.body.coach || 'tom')
      }],
      source: 'fallback',
      error: error.message
    });
  }
}

function generateFallbackResponse(message, coach) {
  const responses = {
    tom: "That's interesting what you're sharing. Let me ask you the two gateway questions: What WOULD you choose in this situation? And what are you putting into this sausage machine?",
    liz: "I hear you, and whatever you're feeling is completely valid. What would it feel like to be completely okay with being you?",
    dom: "Let's look at this like a game you want to win. What tactical adjustment would give you the edge here?",
    alastair: "These patterns often have triggers we can identify. What happens just before this pattern kicks in?",
    kainne: "Let's get practical. What's the ONE thing you could do right now that would move this forward?",
    edward: "What belief about yourself is underneath this situation? What would you choose to believe if you could start fresh?"
  };
  
  return responses[coach] || responses.tom;
}

// Simple feedback loop implementation
function logSessionMetrics(metrics, response) {
  // Store metrics (in production, save to database)
  sessionMetricsStorage.push({
    ...metrics,
    response_length: response.length,
    response_preview: response.substring(0, 100) + '...'
  });
  
  // Identify effective patterns (conversations > 5 exchanges)
  if (metrics.conversation_depth > 5) {
    console.log(`✅ EFFECTIVE PATTERN - ${metrics.coach}: Deep conversation (${metrics.conversation_depth} exchanges)`);
    
    // Store as effective pattern for this coach
    effectivePatterns[metrics.coach].push({
      pattern_type: 'deep_engagement',
      conversation_depth: metrics.conversation_depth,
      timestamp: metrics.timestamp,
      response_preview: response.substring(0, 200)
    });
    
    // Keep only last 10 effective patterns per coach
    if (effectivePatterns[metrics.coach].length > 10) {
      effectivePatterns[metrics.coach] = effectivePatterns[metrics.coach].slice(-10);
    }
  }
  
  // Log quick dropoffs for learning
  if (metrics.conversation_depth <= 2 && metrics.message_count <= 2) {
    console.log(`⚠️ QUICK DROPOFF - ${metrics.coach}: Short conversation (${metrics.conversation_depth} exchanges)`);
  }
}

// Function to get effective patterns for learning enhancement
function getEffectivePatternsForCoach(coach) {
  return effectivePatterns[coach] || [];
}

// Export metrics for potential analytics dashboard
function getSessionAnalytics() {
  return {
    total_sessions: sessionMetricsStorage.length,
    effective_patterns: effectivePatterns,
    recent_sessions: sessionMetricsStorage.slice(-20) // Last 20 sessions
  };
}