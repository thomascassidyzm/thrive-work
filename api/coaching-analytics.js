// THRIVE Coaching Analytics API
// Simple dashboard to view feedback loop learning data

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    // Import analytics from coaching-v2
    // Note: In production, this would come from a shared database
    const mockAnalytics = {
      total_sessions: 0,
      effective_patterns: {
        tom: [],
        lucy: [],
        liz: [],
        dom: [],
        alastair: [],
        kainne: [],
        edward: []
      },
      recent_sessions: []
    };
    
    // Return simple HTML dashboard
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>THRIVE Coaching Analytics</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .coach-section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
        .metric { display: inline-block; margin: 10px; padding: 10px; background: #f5f5f5; border-radius: 3px; }
        .effective-pattern { margin: 10px 0; padding: 10px; background: #e8f5e8; border-radius: 3px; }
        .quick-dropoff { margin: 10px 0; padding: 10px; background: #ffe8e8; border-radius: 3px; }
    </style>
</head>
<body>
    <h1>🧠 THRIVE Coaching Feedback Loop Analytics</h1>
    
    <div class="metric">
        <strong>Total Sessions:</strong> ${mockAnalytics.total_sessions}
    </div>
    
    <h2>📈 Learning Patterns by Coach</h2>
    
    ${Object.keys(mockAnalytics.effective_patterns).map(coach => `
        <div class="coach-section">
            <h3>${coach.toUpperCase()}</h3>
            <div class="metric">
                <strong>Effective Patterns:</strong> ${mockAnalytics.effective_patterns[coach].length}
            </div>
            
            ${mockAnalytics.effective_patterns[coach].length > 0 ? 
              mockAnalytics.effective_patterns[coach].map(pattern => `
                <div class="effective-pattern">
                    <strong>Deep Engagement:</strong> ${pattern.conversation_depth} exchanges<br>
                    <em>${pattern.response_preview}</em><br>
                    <small>${pattern.timestamp}</small>
                </div>
              `).join('') 
              : '<p><em>No effective patterns recorded yet.</em></p>'
            }
        </div>
    `).join('')}
    
    <h2>🔄 How the Feedback Loop Works</h2>
    <ul>
        <li><strong>Conversation Length:</strong> Sessions with 5+ exchanges are marked as "effective"</li>
        <li><strong>Pattern Storage:</strong> Effective responses are stored for each coach</li>
        <li><strong>Learning Integration:</strong> Recent effective patterns are included in coach prompts</li>
        <li><strong>Quick Dropoff Detection:</strong> Sessions ≤2 exchanges are flagged for improvement</li>
    </ul>
    
    <p><em>Note: In production, this data would be stored in a database. Currently using in-memory storage for simplicity.</em></p>
    
    <script>
        // Auto-refresh every 30 seconds
        setTimeout(() => location.reload(), 30000);
    </script>
</body>
</html>`;
    
    res.setHeader('Content-Type', 'text/html');
    return res.status(200).send(html);
    
  } catch (error) {
    console.error('Analytics error:', error);
    return res.status(500).json({ error: 'Analytics error' });
  }
}