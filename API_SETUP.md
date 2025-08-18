# THRIVE Chat API Setup Guide

## Overview
The THRIVE website uses a Vercel serverless function to securely proxy requests to the Claude API. This setup ensures API keys are kept secure and handles CORS properly.

## File Structure
```
/api/chat.js          # Vercel serverless function (backend proxy)
/vercel.json          # Vercel configuration
/.env.example         # Environment variables template
/contact/index.html   # Frontend chat interface
```

## Setup Instructions

### 1. Environment Variables
Add your Claude API key to Vercel:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `thrive-website` project
3. Navigate to **Settings > Environment Variables**
4. Add a new variable:
   - **Name**: `CLAUDE_API_KEY`
   - **Value**: `YOUR_ANTHROPIC_API_KEY_HERE`
   - **Environments**: Production, Preview, Development

### 2. Deploy Changes
After adding the environment variable:
1. Commit and push these new files to your repository
2. Vercel will automatically redeploy with the new API endpoint
3. The chat interface will now use `/api/chat` instead of direct Claude API calls

### 3. Testing
Once deployed, test the chat interface:
- Visit your contact page: `https://your-domain.com/contact/`
- Try asking questions like:
  - "How does the assessment work?"
  - "What coaching programs do you offer?"
  - "Tell me about THRIVE"

### 4. Local Development (Optional)
To test locally:
```bash
# Install Vercel CLI
npm i -g vercel

# Copy environment template
cp .env.example .env.local

# Add your API key to .env.local
# Then run local development server
vercel dev
```

## How It Works

### Frontend (`/contact/index.html`)
- Sends POST requests to `/api/chat` 
- Includes intelligent fallback responses
- Handles errors gracefully

### Backend (`/api/chat.js`)
- Receives user messages
- Proxies requests to Claude API with secure headers
- Returns responses in the expected format
- Includes rate limiting and error handling

### Security Features
- API key stored securely in Vercel environment variables
- CORS headers properly configured
- Input validation and sanitization
- Graceful error handling with helpful fallbacks

## Troubleshooting

### Chat shows "technical difficulties"
1. Check Vercel deployment logs
2. Verify environment variable is set correctly
3. Ensure API key is valid and has credits

### Local development not working
1. Make sure you have `.env.local` with your API key
2. Run `vercel dev` instead of `npm run dev`
3. Check console for any error messages

### API endpoint not found
1. Ensure `vercel.json` is committed to repository
2. Check Vercel function logs in dashboard
3. Verify deployment completed successfully

## Support
The system includes comprehensive fallback responses, so even if the Claude API is temporarily unavailable, users still get helpful information about THRIVE services.