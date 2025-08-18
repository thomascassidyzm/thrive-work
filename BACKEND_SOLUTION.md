# THRIVE Backend Solution for Assessment Data Persistence

## The Problem
Users spend 10-50+ questions answering behavioral scenarios, but data can be lost if:
- Browser crashes
- Page refreshes accidentally  
- LocalStorage gets cleared
- They want to continue on different device
- Coach doesn't receive the data properly

## Simple Backend Solution: Supabase (Recommended)

### Why Supabase?
- Free tier handles 50K monthly active users
- Built-in authentication (magic links, social login)
- Real-time database with automatic REST API
- No server management needed
- 5 minute setup

### Implementation Plan

#### 1. Database Schema
```sql
-- Users table (handled by Supabase Auth)
-- Automatic with user.id as primary key

-- Assessments table
CREATE TABLE assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  responses JSONB NOT NULL,
  question_count INTEGER,
  behavioral_signature JSONB,
  ocean_analysis JSONB,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Assessment sessions (for continuation)
CREATE TABLE assessment_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  current_responses JSONB,
  current_question INTEGER,
  selected_questions JSONB,
  last_saved TIMESTAMP DEFAULT NOW()
);

-- Coaching conversations
CREATE TABLE coaching_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  assessment_id UUID REFERENCES assessments(id),
  coach_name TEXT,
  messages JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 2. Frontend Integration
```javascript
// Initialize Supabase
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Auto-save after each question
async function saveProgress(responses, currentQuestion) {
  if (!supabase.auth.user()) {
    // Prompt for account creation after 10 questions
    if (responses.length === 10) {
      showAccountPrompt();
    }
    return;
  }
  
  const { data, error } = await supabase
    .from('assessment_sessions')
    .upsert({
      user_id: supabase.auth.user().id,
      current_responses: responses,
      current_question: currentQuestion,
      last_saved: new Date()
    });
}

// Complete assessment
async function completeAssessment(analysis) {
  const { data, error } = await supabase
    .from('assessments')
    .insert({
      user_id: supabase.auth.user().id,
      responses: analysis.responses,
      question_count: analysis.questionCount,
      behavioral_signature: analysis.behavioralSignature,
      ocean_analysis: analysis.oceanAnalysis,
      completed_at: new Date()
    });
    
  return data.id; // Use for coach handoff
}

// Coach receives assessment
async function loadAssessmentForCoaching(assessmentId) {
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('id', assessmentId)
    .single();
    
  return data; // Full assessment data for coach
}
```

#### 3. Account Creation Flow
```javascript
// After 10 questions
function showAccountPrompt() {
  const modal = `
    <div class="account-modal">
      <h2>Save Your Progress</h2>
      <p>Create a free account to:</p>
      <ul>
        <li>✓ Save your assessment progress</li>
        <li>✓ Continue on any device</li>
        <li>✓ Get personalized coaching</li>
        <li>✓ Track changes over time</li>
      </ul>
      
      <input type="email" id="email" placeholder="Enter your email">
      <button onclick="createAccount()">Create Account & Continue</button>
      <button onclick="continueWithoutAccount()">Continue Without Saving</button>
    </div>
  `;
}

async function createAccount() {
  const email = document.getElementById('email').value;
  
  // Supabase magic link (no password needed!)
  const { error } = await supabase.auth.signIn({ email });
  
  if (!error) {
    showMessage('Check your email for a magic link to continue!');
    // Save current progress
    await saveProgress(responses, currentQuestion);
  }
}
```

#### 4. Premium Upgrade Flow
```javascript
// At 50 questions (OCEAN analysis available)
async function offerPremiumAnalysis() {
  const modal = `
    <div class="premium-modal">
      <h2>🌊 Complete OCEAN Analysis Available!</h2>
      <p>You've answered 50+ questions. Unlock your comprehensive report:</p>
      
      <div class="premium-features">
        <h3>$20 One-Time Payment Includes:</h3>
        <ul>
          <li>📊 Full OCEAN personality profile</li>
          <li>🎭 Your top 10 Scripts identified</li>
          <li>🎯 Sausage Machine input analysis</li>
          <li>📋 30-day transformation action plan</li>
          <li>💬 Unlimited AI coaching sessions</li>
          <li>📈 Progress tracking over time</li>
        </ul>
      </div>
      
      <button onclick="processPayment()">Get Full Analysis - $20</button>
      <button onclick="continueBasicCoaching()">Continue with Basic Coaching</button>
    </div>
  `;
}

// Stripe integration
async function processPayment() {
  const stripe = Stripe(STRIPE_PUBLIC_KEY);
  
  // Create checkout session
  const { sessionId } = await fetch('/api/create-checkout', {
    method: 'POST',
    body: JSON.stringify({
      userId: supabase.auth.user().id,
      assessmentId: currentAssessmentId
    })
  }).then(r => r.json());
  
  // Redirect to Stripe
  stripe.redirectToCheckout({ sessionId });
}
```

## Alternative: Simple Node.js + SQLite

If you prefer self-hosted:

```javascript
// server.js
const express = require('express');
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');

const app = express();
const db = new sqlite3.Database('./thrive.db');

// Create tables
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS assessments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    responses TEXT,
    question_count INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

// Save assessment progress
app.post('/api/save-assessment', authenticateUser, (req, res) => {
  const { responses, questionCount } = req.body;
  
  db.run(
    `INSERT OR REPLACE INTO assessments (user_id, responses, question_count) 
     VALUES (?, ?, ?)`,
    [req.user.id, JSON.stringify(responses), questionCount],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true });
    }
  );
});

// Load assessment for coaching
app.get('/api/assessment/:id', authenticateUser, (req, res) => {
  db.get(
    `SELECT * FROM assessments WHERE id = ? AND user_id = ?`,
    [req.params.id, req.user.id],
    (err, row) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!row) return res.status(404).json({ error: 'Assessment not found' });
      
      row.responses = JSON.parse(row.responses);
      res.json(row);
    }
  );
});
```

## Immediate Frontend Fix (Before Backend)

For now, let's make the frontend more robust:

```javascript
// Enhanced localStorage with backup
class AssessmentStorage {
  constructor() {
    this.storageKey = 'thriveAssessment';
    this.backupKey = 'thriveAssessmentBackup';
  }
  
  save(data) {
    // Save to primary storage
    localStorage.setItem(this.storageKey, JSON.stringify(data));
    
    // Save backup
    localStorage.setItem(this.backupKey, JSON.stringify({
      ...data,
      savedAt: new Date().toISOString()
    }));
    
    // Also save to sessionStorage as extra backup
    sessionStorage.setItem(this.storageKey, JSON.stringify(data));
  }
  
  load() {
    // Try primary storage
    let data = localStorage.getItem(this.storageKey);
    
    // Try backup if primary fails
    if (!data) {
      data = localStorage.getItem(this.backupKey);
    }
    
    // Try session storage as last resort
    if (!data) {
      data = sessionStorage.getItem(this.storageKey);
    }
    
    return data ? JSON.parse(data) : null;
  }
  
  clear() {
    // Never clear without confirmation
    if (confirm('This will delete your assessment data. Are you sure?')) {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem(this.backupKey);
      sessionStorage.removeItem(this.storageKey);
    }
  }
}

// Use it
const assessmentStorage = new AssessmentStorage();

// After each question
assessmentStorage.save({
  responses,
  currentQuestion,
  selectedQuestions,
  timestamp: Date.now()
});

// When going to coach
const assessmentData = assessmentStorage.load();
if (assessmentData) {
  window.location.href = `/chat/?assessment=${encodeURIComponent(JSON.stringify(assessmentData))}`;
}
```

## Deployment Timeline

1. **Immediate** (Today): Fix localStorage handling, prevent data loss
2. **Day 1-2**: Set up Supabase, create tables
3. **Day 3-4**: Integrate authentication (magic links)
4. **Day 5**: Add Stripe for premium reports
5. **Day 6-7**: Test and deploy

## Cost Estimate

### Supabase (Recommended)
- **Free tier**: 50K monthly active users, 500MB database
- **Pro tier**: $25/month for unlimited users, 8GB database
- Start free, upgrade only when needed

### Alternative: Heroku + PostgreSQL
- **Free tier**: 1000 hours/month, 10K row database
- **Hobby tier**: $7/month for always-on, 10M rows

### Stripe Fees
- 2.9% + $0.30 per transaction
- On $20 payment: ~$0.88 fee, you keep $19.12

## Security Considerations

1. **Never trust client data** - validate everything server-side
2. **Use JWT tokens** for authentication
3. **HTTPS only** - never send assessment data over HTTP
4. **Rate limiting** - prevent abuse
5. **GDPR compliance** - allow users to delete their data

## Next Steps

1. Fix immediate localStorage issues ✓
2. Choose backend (Supabase recommended)
3. Implement account creation at 10 questions
4. Add payment at 50 questions for full analysis
5. Deploy and test