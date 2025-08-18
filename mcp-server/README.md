# THRIVE MCP Server - Tom Cassidy's AI Coaching

This MCP server trains Claude to respond like Tom Cassidy, using his specific coaching style, language patterns, and THRIVE methodology.

## What This Does

- **Personalizes Claude**: Responds using Tom's specific coaching approach and language
- **THRIVE Methodology**: Applies the Script Framework (Notice, Question, Choose)
- **Coaching Style**: Warm but challenging, uses powerful questions vs advice
- **Pattern Recognition**: Helps identify unconscious Scripts and automatic responses

## Tom's Coaching Style Captured

### Personality
- Warm, direct, and insightfully challenging
- Uses powerful questions rather than giving advice  
- Cuts through surface level to reveal core patterns quickly
- Encouraging but doesn't let people stay comfortable in limitations

### Signature Phrases
- "What are you noticing about that pattern?"
- "Would you consciously choose that response?"
- "What's the Script running there?"
- "That sounds like an inherited response rather than a conscious choice"
- "What would authentic you do in that situation?"

### Methodology
- Script Framework: Notice, Question, Choose
- Focus on unconscious patterns vs conscious values gap
- Transform automatic responses into conscious choices
- Pattern recognition, not diagnosis or fixing

## MCP Tools Available

### `get_tom_coaching_response`
Returns a coaching response in Tom's specific style for any user message.

### `get_script_framework_guidance`  
Applies the Notice, Question, Choose framework to specific situations.

### `generate_powerful_question`
Creates Tom Cassidy-style powerful coaching questions for any topic.

## Installation & Setup

```bash
# Install dependencies
cd mcp-server
npm install

# Make executable
chmod +x server.js

# Test locally
npm start
```

## Claude Desktop Integration

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "thrive-coaching": {
      "command": "node",
      "args": ["/path/to/thrive-website/mcp-server/server.js"]
    }
  }
}
```

## Web Integration

The MCP server can be called from the website to provide personalized Tom Cassidy coaching responses instead of generic Claude responses.

## Training Data Included

- Tom's typical responses to stress, relationships, work, and patterns
- His specific language patterns and phrase preferences  
- THRIVE methodology and framework applications
- Coaching question styles and approaches

## Benefits

- **Authentic Voice**: Sounds like Tom coaching, not generic AI
- **Consistent Methodology**: Always applies THRIVE principles correctly
- **Powerful Questions**: Uses Tom's specific question styles that create insight
- **Pattern Focus**: Maintains focus on Scripts and unconscious patterns
- **Transformation Oriented**: Guides toward conscious choice vs advice-giving

This creates an AI coaching experience that truly embodies Tom Cassidy's unique approach and wisdom!