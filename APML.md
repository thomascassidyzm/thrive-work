# THRIVE Website - Application Project Markup Language (APML)
## Complete System Architecture & Development Guide

---

## 🎯 PROJECT OVERVIEW

### Mission Statement
> "Bridging the gap between who you think you are and who you actually are through playful, transformative behavioral assessment and coaching."

### Core Philosophy
- **"You are a verb, not a noun"** - Humans are dynamic beings, not fixed entities
- **"Play the Game"** - Making self-discovery fun and engaging (Queen reference!)
- **Pattern Recognition, Not Diagnosis** - We observe behaviors, not label identities
- **Scripts vs. Authentic Self** - Identifying unconscious patterns vs. conscious choices

---

## 🏗️ ARCHITECTURE

### Technology Stack
```yaml
Frontend:
  - HTML5 (Semantic, accessible markup)
  - CSS3 (Custom properties, Grid, Flexbox)
  - Vanilla JavaScript (ES6 modules)
  - No framework dependencies (intentionally lightweight)

Backend Services:
  - Vercel Functions (API proxy for Claude)
  - Node.js (MCP server for enhanced coaching)
  - Express.js (Bridge server for MCP-Web integration)

AI Integration:
  - Claude API (Direct coaching responses)
  - MCP Protocol (Enhanced coaching with file access)
  - Fallback System (Intelligent offline responses)

Infrastructure:
  - Vercel (Hosting, serverless functions)
  - GitHub (Version control, CI/CD)
  - LocalStorage (Client-side persistence)
```

### Directory Structure
```
thrive-website/
├── 📁 api/                     # API endpoints
│   ├── chat.js                 # Legacy chat endpoint
│   ├── tom-coaching.js         # Main coaching API
│   └── test-claude.js          # Testing endpoint
│
├── 📁 assets/                  # Static resources
│   ├── css/
│   │   ├── main.css           # Global styles
│   │   ├── coaching.css       # Coaching page styles
│   │   └── corporate.css      # Corporate page styles
│   ├── js/
│   │   ├── main.js            # Global JavaScript
│   │   └── chat.js            # Chat interface logic
│   └── images/
│       ├── tom-headshot.jpg
│       └── liz-headshot.jpg
│
├── 📁 engines/                 # Core assessment logic
│   ├── adaptive-question-engine.js
│   ├── coach-handoff-system.js
│   ├── dynamic-ocean-analysis.js
│   ├── game-coaching-integration.js
│   └── pattern-analysis-engine.js
│
├── 📁 question-banks/          # Assessment questions
│   ├── universal-launch-questions.js
│   ├── authority-relationships-questions.js
│   ├── conflict-patterns-questions.js
│   └── group-dynamics-questions.js
│
├── 📁 mcp-server/              # Enhanced AI coaching
│   ├── server.js
│   ├── package.json
│   └── README.md
│
├── 📁 bridge-server/           # MCP-Web bridge
│   └── server.js
│
├── 📄 Pages
│   ├── index.html              # Homepage
│   ├── game/index.html         # Assessment game
│   ├── chat/index.html         # AI coaching chat
│   ├── coaching/index.html     # Coaching programs
│   ├── corporate/index.html    # B2B solutions
│   ├── partners/index.html     # Partner network
│   ├── about/index.html        # About THRIVE
│   └── blog/index.html         # Blog/Resources
│
└── 📄 Configuration
    ├── vercel.json             # Vercel deployment config
    ├── package.json            # Node dependencies
    └── .env.example            # Environment template
```

---

## 🔄 GIT WORKFLOW & BRANCHING STRATEGY

### Branch Structure
```
main (production)
  └── staging (integration testing)
       └── feature/[name] (individual features)
       └── hotfix/[name] (emergency fixes)
```

### Development Workflow

#### 1. Starting New Feature
```bash
# Always branch from staging
git checkout staging
git pull origin staging
git checkout -b feature/new-coaching-ui

# Work on feature
# Make atomic commits with clear messages
git add .
git commit -m "feat: Add dynamic coach personality system"
```

#### 2. Feature Complete
```bash
# Test locally first
npm test

# Push feature branch
git push origin feature/new-coaching-ui

# Create PR to staging (not main!)
# Use PR template for review
```

#### 3. Integration Testing
```bash
# After PR approved and merged to staging
git checkout staging
git pull origin staging

# Deploy to staging environment
vercel --prod=false

# Run integration tests
npm run test:integration
```

#### 4. Weekly Release Cycle (Fridays)
```bash
# Ensure staging is stable
git checkout staging
git pull origin staging

# Create release branch
git checkout -b release/v1.2.0

# Update version numbers
npm version minor
git add .
git commit -m "chore: Bump version to 1.2.0"

# Merge to main
git checkout main
git merge release/v1.2.0

# Tag the release
git tag -a v1.2.0 -m "Release: Play the Game standardization, code extraction"
git push origin main --tags

# Back-merge to staging
git checkout staging
git merge main
git push origin staging
```

#### 5. Hotfix Process
```bash
# Critical bug in production
git checkout main
git checkout -b hotfix/chat-api-error

# Fix the issue
git add .
git commit -m "fix: Resolve chat API timeout issue"

# Merge to main immediately
git checkout main
git merge hotfix/chat-api-error
git push origin main

# CRITICAL: Also merge to staging
git checkout staging
git merge hotfix/chat-api-error
git push origin staging
```

### Commit Message Convention
```
feat: New feature
fix: Bug fix
docs: Documentation changes
style: Formatting, missing semicolons, etc
refactor: Code restructuring
perf: Performance improvements
test: Adding tests
chore: Maintenance tasks
```

---

## 🎮 USER JOURNEY & FLOW

### Primary User Flow
```mermaid
Landing Page → "WHAT ARE YOU LIKE, ANYWAY?" 
    → Play the Game (10 min assessment)
    → Dynamic Results (OCEAN + Patterns)
    → Email Capture
    → Choose Coach
    → AI Coaching Chat
    → Coaching Program Enrollment
```

### Assessment Tiers
1. **Quick Taste** (5 questions) - Basic pattern glimpse
2. **Standard** (10 questions) - OCEAN profile + key patterns  
3. **Deep Dive** (30 questions) - Full behavioral analysis

### Coach Specializations
- **Tom Cassidy**: Relationships, personal mastery, Scripts framework
- **Liz**: Identity work, self-worth, Super Hero Coaching
- **Alastair**: Addictions, compulsive patterns, OCD
- **Kainne**: Business challenges, ADHD, productivity

---

## 🚀 DEPLOYMENT & INFRASTRUCTURE

### Environment Variables
```bash
# Production (Vercel)
CLAUDE_API_KEY=sk-ant-api03-xxxxx
NODE_ENV=production
API_BASE_URL=https://thrive.com

# Staging
NODE_ENV=staging
API_BASE_URL=https://staging.thrive.com

# Local Development
NODE_ENV=development
API_BASE_URL=http://localhost:3000
```

### Deployment Commands
```bash
# Local development
npm run dev

# Build for production
npm run build

# Deploy to staging
vercel --prod=false

# Deploy to production
vercel --prod

# Run tests
npm test
npm run test:integration
npm run test:e2e
```

### Server Processes
```bash
# MCP Server (Local enhanced coaching)
node mcp-server/server.js

# Bridge Server (MCP-Web integration)
node bridge-server/server.js

# All services with PM2
pm2 start ecosystem.config.js
pm2 save
```

---

## 💼 BUSINESS MODEL & PRICING

### Revenue Streams
```yaml
Free Tier:
  - 10-minute assessment
  - Basic OCEAN results
  - 1 coach conversation

Domain Assessments: £15
  - Targeted 30-question deep dives
  - Specific life area focus
  - Detailed pattern analysis

Coaching Programs:
  - Single Domain Focus: £897 (6 weeks)
  - Pattern Breakthrough: £1,997 (90 days)
  - Deep Transformation: £4,997 (6 months)

Corporate Solutions:
  - Employee Wellness: £50/employee/month
  - Insurance Partnership: Custom pricing
  - White label options available
```

---

## 📊 METRICS & ANALYTICS

### Key Performance Indicators
```yaml
Engagement:
  - Landing → Game Start: Target 40%
  - Game Start → Completion: Target 70%
  - Results → Email Capture: Target 60%

Conversion:
  - Free → Paid Assessment: Target 15%
  - Assessment → Coaching: Target 5%
  - Coaching Inquiry → Enrollment: Target 30%

Retention:
  - Chat Return Rate: Target 40%
  - Program Completion: Target 80%
  - Referral Rate: Target 25%
```

---

## 🔧 MAINTENANCE & OPERATIONS

### Daily Tasks
- Monitor error logs in Vercel dashboard
- Check chat API response times
- Review user feedback submissions

### Weekly Tasks
- Analyze conversion metrics
- Update question banks if needed
- Review and merge staging → main (Fridays)

### Monthly Tasks
- Performance audit (Lighthouse)
- Security dependency updates
- Coach content refresh
- A/B test analysis

---

## 🐛 KNOWN ISSUES & ROADMAP

### Current Limitations
- [ ] No privacy/terms pages (links commented out)
- [ ] Missing community section
- [ ] Resources page not implemented
- [ ] FAQ section needed

### Roadmap (Q1 2025)
- [ ] Mobile app development
- [ ] Video coaching integration
- [ ] Group coaching features
- [ ] Partner portal
- [ ] Advanced analytics dashboard
- [ ] Multilingual support

---

## 📝 DEVELOPMENT GUIDELINES

### Code Standards
- Use semantic HTML5 elements
- Follow BEM naming for CSS classes
- ES6+ JavaScript (no jQuery)
- Mobile-first responsive design
- Accessibility (WCAG 2.1 AA)

### Content Guidelines
- **Avoid hardcoded numbers** - Use "Choose a coach" not "Choose from our 3 coaches"
- **Future-proof copy** - Write content that scales with feature additions
- **Generic over specific** - "Based on what you're working on" vs specific counts
- **Flexible messaging** - Content should adapt to system growth

### Testing Requirements
- Unit tests for all engines
- Integration tests for user flows
- E2E tests for critical paths
- Performance budgets enforced

### Documentation Requirements
- JSDoc comments for all functions
- README for each major module
- API documentation up to date
- User guides maintained

---

## 🚨 EMERGENCY PROCEDURES

### API Outage
1. Fallback responses activate automatically
2. Check Vercel function logs
3. Verify API key validity
4. Contact Claude support if needed

### Site Down
1. Check Vercel status page
2. Review deployment logs
3. Rollback if recent deployment
4. Use hotfix procedure if critical

### Data Loss
1. LocalStorage is client-side only
2. No server-side persistence currently
3. Future: Implement database backup

---

## 📞 SUPPORT & CONTACTS

### Development Team
- **Frontend**: [Your Name]
- **Backend**: [Your Name]
- **AI/Coaching**: Tom Cassidy

### External Services
- **Vercel Support**: support@vercel.com
- **Claude API**: Anthropic support
- **Domain**: [Your registrar]

---

## 🎯 SUCCESS CRITERIA

### Technical Success
✅ Page load < 3 seconds
✅ 100% uptime (99.9% SLA)
✅ Mobile responsive
✅ Cross-browser compatible
✅ Accessible (WCAG 2.1)

### Business Success
✅ 10,000 assessments/month
✅ 500 coaching enrollments/month
✅ 60% reduction in corporate mental health claims
✅ 4.5+ star user rating

---

*Last Updated: December 2024*
*Version: 1.0.0*
*Status: Production Ready*

---

**"Play the Game. Discover Your Patterns. Transform Your Life."** 🎮✨