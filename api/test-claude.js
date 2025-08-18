// Simple Claude API test endpoint
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  console.log('Claude API test called');
  console.log('API key exists:', !!process.env.CLAUDE_API_KEY);
  console.log('API key starts with:', process.env.CLAUDE_API_KEY ? process.env.CLAUDE_API_KEY.substring(0, 15) + '...' : 'null');

  if (!process.env.CLAUDE_API_KEY) {
    res.status(500).json({ error: 'No Claude API key configured' });
    return;
  }

  try {
    console.log('Making Claude API call...');
    
    const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': process.env.CLAUDE_API_KEY,
        'Anthropic-Version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 100,
        messages: [{
          role: 'user',
          content: 'Say hello'
        }]
      })
    });

    console.log('Claude API response status:', claudeResponse.status);
    
    if (claudeResponse.ok) {
      const data = await claudeResponse.json();
      console.log('Claude API success');
      res.status(200).json({ 
        success: true, 
        source: 'claude_api_direct',
        response: data 
      });
    } else {
      const errorText = await claudeResponse.text();
      console.log('Claude API error:', claudeResponse.status, errorText);
      res.status(500).json({ 
        error: 'Claude API failed', 
        status: claudeResponse.status,
        details: errorText
      });
    }

  } catch (error) {
    console.error('Claude API test error:', error);
    res.status(500).json({ 
      error: 'Request failed', 
      details: error.message 
    });
  }
}