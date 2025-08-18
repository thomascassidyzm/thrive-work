// THRIVE Coaching API v2 - Simplified with external prompts
// Fetches coaching instructions from website for easy maintenance

// Cache for coaching prompts (15 minute TTL)
let promptsCache = null;
let cacheExpiry = 0;

async function getCoachingPrompts() {
  const now = Date.now();
  
  // Return cached prompts if still valid
  if (promptsCache && now < cacheExpiry) {
    return promptsCache;
  }
  
  try {
    // Fetch prompts from the website
    const response = await fetch('https://www.thrive-life.org/coaching-prompts/');
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
    const { message, coach = 'tom', conversation_history = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    // Get coaching prompts
    const coachingPrompts = await getCoachingPrompts();
    
    // Build system prompt based on coach
    let systemPrompt = coachingPrompts;
    
    // Add coach-specific focus
    if (coach !== 'tom') {
      systemPrompt += `\n\nYou are responding as ${coach} from the THRIVE team. Focus on your specific expertise while using the THRIVE methodology.`;
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
        model: 'claude-sonnet-4-20250514',
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
    
    return res.status(200).json({
      ...data,
      source: 'claude_api'
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