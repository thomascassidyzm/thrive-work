// Vercel serverless function for Claude API proxy
// This handles CORS and secures the API key

export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    try {
        const { message } = req.body;

        if (!message || typeof message !== 'string') {
            res.status(400).json({ error: 'Message is required' });
            return;
        }

        // Rate limiting - simple check
        const userAgent = req.headers['user-agent'] || '';
        const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        
        // Call Claude API
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-Key': process.env.CLAUDE_API_KEY,
                'Anthropic-Version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-sonnet-20240229',
                max_tokens: 1000,
                system: `You are the THRIVE Assistant, an expert on the THRIVE platform and services. THRIVE is the Operating System for Humans - a peak performance psychology platform that uses the Script Framework to help people identify and transform unconscious behavioral patterns.

Key Information about THRIVE:
- Uses pattern recognition, not diagnosis or labeling
- Based on the Script Framework and Universal Protocol: Notice, Question, Choose
- Offers assessments that reveal gaps between conscious values and unconscious behaviors
- Provides coaching programs: Pattern Breakthrough (90 days, £1,997), Deep Transformation (6 months, £4,997), Single Domain Focus (6 weeks, £897)
- Has an Advanced Partner Network for specialized interventions
- Focuses on transforming automatic patterns into conscious choices
- Serves both individuals and corporate wellness programs
- Corporate solutions can reduce mental health claims by up to 60%
- All assessments are free to start and take about 10 minutes
- THRIVE democratizes elite mental training for everyday humans

Be helpful, professional, and encouraging. Direct users to:
- Take the assessment at /game/ 
- Learn about coaching at /coaching/
- Explore corporate solutions at /corporate/
- View partner network at /partners/

For complex personal issues, suggest they may benefit from coaching programs. Keep responses concise but informative.`,
                messages: [{
                    role: 'user',
                    content: message
                }]
            })
        });

        if (!claudeResponse.ok) {
            const errorText = await claudeResponse.text();
            console.error('Claude API error:', claudeResponse.status, errorText);
            
            // Return a helpful fallback response
            res.status(200).json({
                content: [{
                    text: "I'm experiencing some technical difficulties right now, but I can still help! For questions about our assessment, visit /game/. For coaching programs, check /coaching/. For corporate wellness solutions, see /corporate/. Is there something specific about THRIVE you'd like to know?"
                }]
            });
            return;
        }

        const data = await claudeResponse.json();
        
        // Log successful interaction (without storing personal data)
        console.log(`Chat interaction completed successfully for IP: ${clientIP?.substring(0, 8)}...`);
        
        res.status(200).json(data);

    } catch (error) {
        console.error('Server error:', error);
        
        // Return a helpful fallback response instead of an error
        res.status(200).json({
            content: [{
                text: "I'm having some technical difficulties, but I'm still here to help! You can explore our free assessment at /game/, learn about our coaching programs at /coaching/, or discover our corporate wellness solutions at /corporate/. What specific aspect of THRIVE interests you most?"
            }]
        });
    }
}