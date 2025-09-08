// THRIVE PWA Learning Sync Endpoint
// Receives anonymized insights from local PWA databases

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
    const insights = req.body;
    
    // Validate the insights structure
    if (!insights.timestamp || !insights.coaches || !insights.total_sessions) {
      return res.status(400).json({ error: 'Invalid insights format' });
    }
    
    // Log the anonymized insights (in production, store in database)
    console.log('📊 PWA Learning Insights Received:');
    console.log('Timestamp:', insights.timestamp);
    console.log('Total Sessions:', insights.total_sessions);
    console.log('Coaches Data:', insights.coaches.map(coach => ({
      coach: coach.coach,
      patterns: coach.effective_pattern_count,
      avg_depth: coach.avg_conversation_depth,
      topics: coach.common_topics
    })));
    
    // In production, you could:
    // 1. Store in database for analysis
    // 2. Post to GitHub as an issue for tracking
    // 3. Send to analytics service
    // 4. Update coaching prompts based on successful patterns
    
    // Example: Auto-create GitHub issue with learnings
    if (shouldCreateGitHubIssue(insights)) {
      await createLearningInsightIssue(insights);
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Insights received and processed',
      patterns_identified: insights.coaches.reduce((sum, coach) => sum + coach.effective_pattern_count, 0)
    });
    
  } catch (error) {
    console.error('Sync error:', error);
    return res.status(500).json({ error: 'Failed to process insights' });
  }
}

function shouldCreateGitHubIssue(insights) {
  // Create GitHub issue if we have significant new learnings
  const totalPatterns = insights.coaches.reduce((sum, coach) => sum + coach.effective_pattern_count, 0);
  return totalPatterns >= 10; // Threshold for creating a learning issue
}

async function createLearningInsightIssue(insights) {
  // This would post to GitHub API to create an issue with learnings
  // For now, just log what would be posted
  
  const issueTitle = `PWA Learning Insights - ${new Date().toISOString().split('T')[0]}`;
  const issueBody = `
# 🧠 THRIVE PWA Learning Insights

**Timestamp:** ${insights.timestamp}
**Total Sessions Analyzed:** ${insights.total_sessions}

## Coach Performance Insights

${insights.coaches.map(coach => `
### ${coach.coach.toUpperCase()}
- **Effective Patterns:** ${coach.effective_pattern_count}
- **Average Conversation Depth:** ${coach.avg_conversation_depth.toFixed(1)} exchanges
- **Most Common Successful Topics:** ${coach.common_topics.map(t => `${t.topic} (${t.count}x)`).join(', ')}
`).join('')}

## Key Learnings
- Conversations with ${insights.coaches.reduce((max, coach) => coach.avg_conversation_depth > max.avg_conversation_depth ? coach : max).coach} tend to go deepest on average
- Most engaging topics across all coaches: ${insights.coaches.flatMap(c => c.common_topics).sort((a, b) => b.count - a.count).slice(0, 3).map(t => t.topic).join(', ')}

---
*This data is completely anonymized - no personal information included*
*Generated automatically by PWA feedback system*
  `.trim();
  
  console.log('📋 Would create GitHub issue:');
  console.log('Title:', issueTitle);
  console.log('Body:', issueBody);
  
  // In production:
  // await fetch('https://api.github.com/repos/yourusername/thrive-work/issues', {
  //   method: 'POST',
  //   headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}` },
  //   body: JSON.stringify({ title: issueTitle, body: issueBody })
  // });
}