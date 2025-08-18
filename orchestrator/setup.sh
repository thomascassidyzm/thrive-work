#!/bin/bash

# THRIVE Web Orchestrator Setup Script

echo "╔════════════════════════════════════════════════════╗"
echo "║     THRIVE Web Orchestrator Setup                  ║"
echo "╚════════════════════════════════════════════════════╝"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if PM2 is installed globally
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2 globally..."
    npm install -g pm2
fi

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p logs

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check for .env file
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file and add your API keys"
fi

# Start with PM2
echo ""
echo "✅ Setup complete!"
echo ""
echo "Available commands:"
echo "  npm run pm2:start   - Start orchestrator with PM2"
echo "  npm run pm2:stop    - Stop orchestrator"
echo "  npm run pm2:logs    - View logs"
echo "  npm run pm2:status  - Check status"
echo ""
echo "To test Cloudflare tunnel:"
echo "  npm run tunnel:test"
echo ""
echo "The tunnel will provide a public URL like:"
echo "  https://[random-string].trycloudflare.com"
echo ""