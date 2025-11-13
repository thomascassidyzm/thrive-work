# Thrive Assessment System

## Portable, Content-First Assessment Architecture

This directory contains **fully functional assessment demos** built with a unique architecture: **content and logic are stored in JSON, making them portable to any tech stack**.

---

## 🎯 Purpose

Build working demos that:
1. **Function fully** - Can be used immediately for user testing and stakeholder demos
2. **Extract easily** - Any web developer can rebuild in React/Vue/Flutter/Swift/etc.
3. **Scale properly** - Privacy-aware architecture ready for B2B deployment

---

## 📁 Directory Structure

```
assessments/
├── content/                          # PURE DATA - Framework agnostic
│   ├── cowch-imagine-schema.json    # Mandy's IMAGINE framework (chat-based wellness)
│   ├── neuroindicator.json          # Triage assessment (wellness vs clinical)
│   ├── ocean-questions.json         # Personality profiling (workplace + personal)
│   ├── home-work-influence.json     # Organizational insights (B2B)
│   ├── limitless-13.json            # Tom's 13 Framework (Edward Orman's programme)
│   └── quarterly-pulse.json         # Ongoing wellness check-ins
│
├── logic/                            # ROUTING RULES - Portable algorithms
│   ├── neuroindicator-routing.json  # Conditional branching logic
│   ├── ocean-scoring.json           # Personality dimension calculations
│   ├── recommendation-engine.json   # Content/coaching routing
│   └── privacy-rules.json           # K-anonymity enforcement
│
├── engines/                          # JAVASCRIPT IMPLEMENTATION
│   ├── generic-assessment-engine.js # Runs any JSON-defined assessment
│   ├── routing-engine.js            # Executes branching logic
│   └── scoring-engine.js            # Calculates dimensional scores
│
├── demos/                            # WORKING HTML DEMOS
│   ├── cowch-imagine-demo.html      # Chat-based IMAGINE framework
│   ├── neuroindicator-demo.html     # Triage assessment
│   ├── ocean-demo.html              # Full OCEAN personality assessment
│   └── limitless-demo.html          # Tom's 13 Framework assessment
│
└── README.md                         # You are here
```

---

## 🚀 Quick Start

### Run a Demo Locally

1. **Clone or navigate to this directory**
2. **Serve the files** (assessments need HTTP server to load JSON):
   ```bash
   # Option 1: Python
   python -m http.server 8000

   # Option 2: Node.js
   npx serve .

   # Option 3: PHP
   php -S localhost:8000
   ```
3. **Open demo in browser:**
   ```
   http://localhost:8000/demos/cowch-imagine-demo.html
   ```

### Try Different Assessments

- **Cowch IMAGINE:** Chat-based wellness using Mandy's framework
- **Neuroindicator:** Quick triage (wellness vs clinical routing)
- **OCEAN:** Deep personality profiling
- **Limitless:** Tom's 13 Framework for personal development

---

## 🏗️ Architecture Principles

### 1. **Content-First Design**

All assessment content lives in **JSON files**:
- Questions and options
- Scoring weights
- Routing logic
- Privacy rules
- Recommendations

**Why?** A developer can read the JSON and rebuild in **any language/framework** without reverse-engineering JavaScript.

### 2. **Separation of Concerns**

```
CONTENT (JSON) → LOGIC (JSON) → PRESENTATION (HTML/CSS/JS)
    ↓                ↓                    ↓
 Portable        Portable           Replaceable
 Reusable        Reusable          (rebuild in React/Flutter/etc.)
```

### 3. **Privacy by Design**

Every assessment defines:
- **Employee access:** Full visibility into their data
- **Employer access:** Aggregated patterns only (k>10 required)
- **Never shared:** Personal dimensions, clinical flags, home-life details

---

## 📊 Assessment Types

### Cowch IMAGINE Framework (Chat-Based Wellness)

**File:** `content/cowch-imagine-schema.json`

**Purpose:** Conversational wellness assessment using Mandy Lehto's IMAGINE framework

**Dimensions:**
- **I**nspiration - What motivates you
- **M**indset - Mental frameworks and beliefs
- **A**ction - Translating ideas into behavior
- **G**rowth - Capacity for learning
- **I**ntegration - Experience → identity
- **N**urture - Self-care patterns
- **E**volution - Personal development trajectory

**Features:**
- Chat-style interactions
- Follow-up reflection prompts
- Adaptive routing based on responses
- Flags for coaching needs

**Use Case:** B2C wellness app, employee self-discovery, coaching intake

---

### Neuroindicator (Triage Assessment)

**File:** `content/neuroindicator.json`

**Purpose:** Quick assessment to route users to appropriate support level

**Output:**
- **Wellness pathway:** ClearMinds content, Cowch.app, Limitless programme
- **Clinical pathway:** Smart Start Minds (clinical hypnotherapy), Concierge Health

**Features:**
- 5-10 minutes
- Probabilistic routing logic
- Crisis detection and escalation
- Privacy-compliant for B2B

**Use Case:** Employee onboarding, initial triage for Towergate partnership

---

### OCEAN Assessment (Personality Profiling)

**File:** `content/ocean-questions.json`

**Purpose:** Behavioral personality profiling for workplace and personal insights

**Dimensions:**
- **O**penness - Creativity, curiosity
- **C**onscientiousness - Organization, planning
- **E**xtraversion - Social energy
- **A**greeableness - Harmony vs self-advocacy
- **N**euroticism - Emotional regulation

**Features:**
- Workplace-shareable vs personal-only questions
- Behavioral scenarios (not self-report)
- Action plan generation
- Employer dashboard insights (aggregated)

**Use Case:** B2B workplace wellness, team building, organizational development

---

### Home→Work Influence (B2B Organizational Insights)

**File:** `content/home-work-influence.json`

**Purpose:** Identify systemic issues affecting employee wellbeing

**Categories:**
- Childcare stress
- Eldercare responsibilities
- Financial pressure
- Relationship strain
- Housing instability
- Commute burden

**Features:**
- 6 questions, 2 minutes
- **Aggregation-only** privacy (employer sees %, not individuals)
- Organizational recommendations ("27% report childcare stress → consider flexible scheduling")

**Use Case:** Employer dashboard, organizational change recommendations, ROI tracking

---

### Limitless - Tom's 13 Framework

**File:** `content/limitless-13.json`

**Purpose:** Assessment for Edward Orman's "Conquering Life" programme using Tom's 13 Framework

**Dimensions:** (Example - actual framework TBD)
- Energy management
- Focus and attention
- Emotional regulation
- Relationship quality
- Purpose and meaning
- [... 8 more dimensions]

**Use Case:** Programme intake, progress tracking, coaching personalization

---

### Quarterly Wellness Pulse

**File:** `content/quarterly-pulse.json`

**Purpose:** Ongoing engagement and trend tracking for B2B clients

**Questions:** (5 questions, 2-3 minutes)
1. Stress level this month
2. Sleep quality
3. Workplace support
4. Workload manageability
5. Overall wellbeing

**Features:**
- Track individual trends over time
- Flag deterioration for intervention
- Generate employer insights (team stress increasing)

**Use Case:** Sustained engagement, ROI demonstration, early intervention

---

## 🔐 Privacy Architecture

### Two-Tier Access Model

```
┌─────────────────────────────────────────────────────┐
│                 EMPLOYEE VIEW                       │
│              (Full Access)                          │
├─────────────────────────────────────────────────────┤
│  • All questions answered                          │
│  • Complete OCEAN profile                          │
│  • Personal patterns and insights                  │
│  • Home→work influence details                     │
│  • Coaching flags and recommendations              │
│  • Action plans                                    │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              EMPLOYER VIEW                          │
│          (Aggregated, k>10 Only)                    │
├─────────────────────────────────────────────────────┤
│  • Team-level OCEAN patterns                       │
│  • Home→work influence percentages                 │
│  • Engagement metrics                              │
│  • Quarterly pulse trends                          │
│  • NO INDIVIDUAL DATA                              │
└─────────────────────────────────────────────────────┘
```

### K-Anonymity Enforcement

**Rule:** Employer sees **NO data** until minimum 10 respondents

**Implementation:**
```javascript
if (totalRespondents < privacyModel.aggregationRules.minimumRespondents) {
    return {
        error: 'PRIVACY_THRESHOLD_NOT_MET',
        message: 'Need 10+ respondents for privacy protection'
    };
}
```

**Database Constraint:**
```sql
CREATE TABLE employer_insights (
    respondent_count INT NOT NULL,
    CONSTRAINT k_anonymity CHECK (respondent_count >= 10)
);
```

---

## 🛠️ For Developers: Rebuilding These Assessments

### Full Extraction Guide

See **[ASSESSMENT_EXTRACTION_GUIDE.md](../docs/ASSESSMENT_EXTRACTION_GUIDE.md)** for complete details.

### Quick Overview

**What to extract:**
1. **Content JSON** - Questions, options, metadata
2. **Logic JSON** - Routing rules, scoring algorithms
3. **Privacy rules** - K-anonymity, shareable metrics

**What to rebuild:**
1. Question display UI
2. Response recording
3. Routing logic interpreter
4. Scoring calculator
5. Results visualization

**Tech stack examples provided for:**
- React
- Flutter (Dart)
- Node.js (backend API)
- Generic pseudo-code

---

## 📈 Usage Examples

### Example 1: B2C Wellness App (Cowch.app)

```javascript
// Load IMAGINE assessment
const assessment = await loadAssessment('cowch-imagine-v1');

// User takes assessment
const results = await userCompletesAssessment(assessment);

// Generate personalized recommendations
const recommendations = generateRecommendations(results);
// → "Start with Cowch.app Values Exploration (7 days)"
// → "Consider Broadbanc Consciousness Coach for deeper work"
```

### Example 2: B2B Employee Onboarding (Towergate)

```javascript
// New employee joins company
const employee = { id: 'emp-123', company: 'acme-corp' };

// Step 1: Neuroindicator triage
const triage = await assessEmployee('neuroindicator', employee);
// → { pathway: 'wellness', needsClinical: false }

// Step 2: OCEAN profiling
const ocean = await assessEmployee('ocean-v1', employee);
// → { O: 72, C: 45, E: 38, A: 81, N: 67 }

// Step 3: Home→work influence
const homeWork = await assessEmployee('home-work-influence', employee);
// → { childcare: 3, financial: 2 }

// Step 4: Route to appropriate resources
const resources = routeToResources(triage, ocean, homeWork);
// → ClearMinds (sleep hypnotherapy) + Cowch.app (stress management)

// Step 5: Aggregate for employer (when k>10)
const employerInsights = aggregateForEmployer('acme-corp');
// → { childcareStress: '27% of team', avgStress: 'increased 23% vs Q2' }
```

### Example 3: Quarterly Check-In

```javascript
// Employee completes quarterly pulse
const pulse = await assessEmployee('quarterly-pulse', employee);
// → { stress: 8, sleep: 4, support: 6, workload: 9, overall: 5 }

// Compare to previous quarter
const trend = compareToPrevious(pulse, employee.previousPulse);
// → { stress: +2, sleep: -2, workload: +3 }  // Deteriorating

// Flag for intervention
if (trend.stress > 1 || trend.sleep < -1) {
    flagForCheckIn(employee, { reason: 'Stress increasing, sleep declining' });
}

// Update employer dashboard
updateEmployerDashboard('acme-corp', {
    teamStressTrend: 'increasing',
    flaggedEmployees: 12  // Count, not names
});
```

---

## 🔄 Workflow Integration

### For Product Teams

1. **Design new assessment** → Create JSON schema
2. **Test with demo** → Use generic engine to validate
3. **Share with developers** → Provide JSON + extraction guide
4. **Developers rebuild** → In React/Flutter/Swift/etc.
5. **Content updates** → Just edit JSON, no code changes needed

### For Content Teams

- Update question text → Edit JSON
- Adjust scoring weights → Modify `score` objects
- Change routing logic → Update `routingLogic` rules
- Add new recommendations → Extend `resultActions`

**No code changes required** - developers just re-import updated JSON

---

## 📊 Metrics & Analytics

### Individual Level (Employee Access)

- Questions answered
- Time spent per question
- Reflection text quality
- Dimensional scores
- Change over time (quarterly pulses)

### Aggregate Level (Employer Access)

- Engagement rate (% who complete)
- Completion rate (% who finish)
- Team-level OCEAN patterns
- Home→work influence prevalence
- Quarterly trend tracking
- Satisfaction scores

---

## 🚦 Roadmap

### ✅ Phase 1: Core Demos (Current)
- [x] Cowch IMAGINE schema
- [x] Generic assessment engine
- [x] Working HTML demo
- [x] Extraction guide for developers

### 🚧 Phase 2: Complete Assessment Library
- [ ] Neuroindicator full schema
- [ ] OCEAN question bank (60-80 questions)
- [ ] Home→work influence complete
- [ ] Limitless (Tom's 13) schema
- [ ] Quarterly pulse questions

### 📋 Phase 3: Advanced Features
- [ ] Adaptive testing (shorten based on confidence)
- [ ] Multi-language support
- [ ] AI-powered follow-up questions
- [ ] Real-time scoring visualization
- [ ] Downloadable PDF reports

### 🎯 Phase 4: Production Deployment
- [ ] React Native mobile app
- [ ] Backend API (Node.js + PostgreSQL)
- [ ] Employer dashboard (React)
- [ ] Integration with HRIS systems
- [ ] ISO 27001 compliance audit

---

## 📚 Additional Resources

### Documentation
- [Assessment Extraction Guide](../docs/ASSESSMENT_EXTRACTION_GUIDE.md)
- [Privacy Architecture](../docs/OCEAN_PRIVACY_ARCHITECTURE.md)
- [Scoring Algorithms](../docs/DIAGNOSTIC_ANALYSIS.md)

### Example Implementations
- JavaScript: `/engines/generic-assessment-engine.js`
- HTML Demo: `/demos/cowch-imagine-demo.html`
- Test Cases: (Coming soon)

### Partner Frameworks
- **Mandy's IMAGINE:** https://thoughtsonlifeandlove.com/
- **Edward Orman's Conquering Life:** (Link TBD)
- **Tom's 13 Framework:** (Documentation TBD)
- **ClearMinds Hypnotherapy:** 91K+ member community, 4.5 years proven engagement

---

## 🤝 Contributing

### Adding a New Assessment

1. **Create JSON schema** in `/content/`
   - Use `cowch-imagine-schema.json` as template
   - Define questions, dimensions, routing logic

2. **Create demo HTML** in `/demos/`
   - Copy `cowch-imagine-demo.html`
   - Update to load your new JSON

3. **Test thoroughly**
   - Complete assessment multiple times
   - Verify routing logic
   - Check scoring calculations
   - Test privacy enforcement

4. **Document**
   - Add to this README
   - Update extraction guide with examples
   - Create user-facing description

---

## 📞 Support

Questions? Contact:
- **Technical:** Thrive development team
- **Content:** Assessment design team
- **Privacy:** Data governance team

---

## 📄 License

Proprietary - Thrive Employee Benefits Platform

**Content is portable, but proprietary.** Developers can rebuild the implementation, but question content, frameworks, and algorithms remain Thrive IP.

---

**Built with ❤️ for the Towergate partnership and beyond.**
