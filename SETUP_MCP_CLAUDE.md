# THRIVE AI Coaching Setup Guide

## 🎯 Goal
Get the MCP server + Claude API integration working for live AI coaching.

## 🔧 Quick Setup

### 1. Install Dependencies
```bash
cd /Users/tomcassidy/thrive/thrive-website
npm install
```

### 2. Configure Environment Variables
```bash
# Copy example file
cp .env.example .env

# Edit .env and add your Claude API key
CLAUDE_API_KEY=sk-ant-api03-your-actual-key-here
```

### 3. Test Current System
```bash
# Test the existing API (should work with fallback responses)
curl -X POST http://localhost:3000/api/tom-coaching \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the gateway tools?"}'
```

### 4. Test MCP Server (Standalone)
```bash
# Run the MCP server directly
npm run mcp-server
```

### 5. Test Bridge Server (Advanced)
```bash
# Run the bridge server (connects MCP + Claude API)
npm run bridge

# Test bridge endpoint
curl -X POST http://localhost:3001/api/coaching \
  -H "Content-Type: application/json" \
  -d '{"message": "What are the gateway tools?"}'
```

## 🔍 Current Status

### ✅ Working Now
- **Tom's Direct Responses**: Comprehensive coaching responses work perfectly
- **Fallback System**: Always provides authentic THRIVE coaching
- **All Teaching Content**: 140K+ student feedback integrated
- **Gateway Tools**: Properly prioritized foundational concepts

### 🚧 In Progress
- **Claude API Integration**: Working on reliable connection
- **MCP Bridge**: Advanced architecture for dynamic responses
- **Context Memory**: Conversation history and user progress

### 🎯 Next Steps
1. **Test Claude API key** - Verify it's working with simple call
2. **Debug MCP connection** - Ensure MCP server starts properly
3. **Test bridge integration** - Full MCP + Claude workflow
4. **Add conversation memory** - For personalized interactions

## 🧪 Testing Commands

### Test Existing System
```bash
# Start website
npm run dev

# Visit: http://localhost:3000/contact/
# Try the AI coaching interface
```

### Debug Mode
```bash
# Check API logs
curl -X POST http://localhost:3000/api/tom-coaching \
  -H "Content-Type: application/json" \
  -d '{"message": "test"}' \
  -v
```

### Bridge Server Test
```bash
# Start bridge server
npm run bridge

# Health check
curl http://localhost:3001/health

# Coaching test
curl -X POST http://localhost:3001/api/coaching \
  -H "Content-Type: application/json" \
  -d '{"message": "I feel stuck in a pattern"}' \
  -s | jq
```

## 🎯 Success Metrics

### Current State
- ✅ Reliable fallback responses
- ✅ All Tom's content integrated
- ✅ Gateway tools properly prioritized
- ⏳ Claude API integration pending

### Target State
- 🎯 Claude API + MCP enhanced responses
- 🎯 Dynamic conversation flow
- 🎯 Context-aware coaching
- 🎯 Personality switching system (future)

---

**Ready to test!** The system has excellent fallback responses now, and we're working toward the full Claude API + MCP integration for even more dynamic coaching.