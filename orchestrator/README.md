# THRIVE Web Orchestrator

HTTP server that handles coaching requests from the THRIVE website and exposes them via Cloudflare tunnel.

## Architecture

```
Website (Vercel) → Cloudflare Tunnel → Web Orchestrator (Port 4568) → AI APIs
                                              ↓
                                        Coaching Response
```

## Components

### 1. THRIVE MCP Server (`../thrive-coaching-mcp-server.js`)
- Standalone MCP server for Claude Desktop
- Provides coaching tools directly to Claude
- Used for local Claude Desktop integration

### 2. Web Orchestrator (`thrive-web-orchestrator.js`)
- HTTP server on port 4568
- Handles `/api/coaching` requests
- Integrates with Claude API or OpenAI
- Provides WebSocket support for real-time responses

### 3. PM2 Process Manager
- Manages both orchestrator and Cloudflare tunnel
- Auto-restart on failure
- Log management
- Production deployment

## Setup

1. **Initial Setup**
```bash
chmod +x setup.sh
./setup.sh
```

2. **Configure API Keys**
```bash
cp .env.example .env
# Edit .env and add your CLAUDE_API_KEY
```

3. **Start with PM2**
```bash
npm run pm2:start
```

4. **Get Cloudflare Tunnel URL**
```bash
npm run pm2:logs thrive-cloudflare-tunnel
# Look for: https://[random-string].trycloudflare.com
```

## API Endpoints

### POST `/api/coaching`
Generate a coaching response.

**Request:**
```json
{
  "message": "I keep procrastinating on important tasks",
  "coach": "tom",  // Options: tom, liz, dom, alastair, kainne, edward
  "context": "Optional conversation context",
  "sessionId": "Optional WebSocket session ID"
}
```

**Response:**
```json
{
  "success": true,
  "coach": "tom",
  "response": "There is no such thing as procrastination...",
  "source": "claude_api",  // or "openai_api" or "scripted"
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### GET `/health`
Health check endpoint.

## Coaches Available

- **Tom**: Relationships, personal mastery, life purpose
- **Liz**: Identity work, self-worth, feeling good about being YOU  
- **Dom**: Sports psychology, performance, winning mindset
- **Alastair**: Addictions, compulsive patterns, OCD
- **Kainne**: Business, getting things done, ADHD
- **Edward**: Foundations, self-acceptance, limiting beliefs

## PM2 Commands

```bash
# Start all services
npm run pm2:start

# Stop all services
npm run pm2:stop

# Restart all services
npm run pm2:restart

# View logs
npm run pm2:logs

# Check status
npm run pm2:status

# View specific service logs
pm2 logs thrive-orchestrator
pm2 logs thrive-cloudflare-tunnel
```

## Production Deployment

1. The orchestrator runs locally on your Mac
2. Cloudflare tunnel exposes it to the internet
3. Update your website to use the tunnel URL:

```javascript
// In your website code
const COACHING_API = 'https://your-tunnel-url.trycloudflare.com/api/coaching';
```

## Monitoring

- Logs are stored in `./logs/`
- PM2 provides automatic restart on crash
- Health endpoint for uptime monitoring

## Troubleshooting

### Orchestrator won't start
- Check `.env` file has valid API keys
- Ensure port 4568 is free
- Check logs: `pm2 logs thrive-orchestrator`

### Tunnel keeps disconnecting
- Check internet connection
- View tunnel logs: `pm2 logs thrive-cloudflare-tunnel`
- Restart tunnel: `pm2 restart thrive-cloudflare-tunnel`

### No coaching responses
- Verify API keys in `.env`
- Check orchestrator logs for errors
- Test health endpoint: `curl http://localhost:4568/health`

## Development

For local development without PM2:
```bash
npm start
```

Test the API locally:
```bash
curl -X POST http://localhost:4568/api/coaching \
  -H "Content-Type: application/json" \
  -d '{"message": "I need help with procrastination", "coach": "tom"}'
```