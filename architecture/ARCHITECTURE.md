# Thrive Platform Architecture

**Last Updated:** 2025-01-13
**Version:** 1.0

---

## Executive Summary

Thrive is an **intelligent employee wellbeing platform** that combines assessment intelligence with a curated ecosystem of wellness, coaching, and clinical services. Rather than being a single product, Thrive acts as a **routing and matching system** that connects employees to the right resources based on their needs.

**Core Value Proposition:**
- **Assessment Intelligence** as the defensible IP
- **Partner Ecosystem** providing content, coaching, and clinical services
- **Privacy-First Architecture** with K-anonymity (k≥10) enforcement
- **Adaptive Routing** that escalates or adjusts based on ongoing monitoring

---

## 1. Platform Overview

### The Three-Tier Model

```
┌─────────────────────────────────────────────────────────┐
│     ASSESSMENT & ROUTING INTELLIGENCE (Core IP)         │
│                                                          │
│  • Neuroindicator (Triage)                             │
│  • OCEAN Profiling                                      │
│  • Home→Work Influence Analysis                         │
│  • Recommendation Engine                                │
│  • Privacy Enforcement Layer                            │
└─────────────────────────────────────────────────────────┘
                            ↓
        ┌──────────────────┼──────────────────┐
        ↓                  ↓                   ↓
┌───────────────┐  ┌───────────────┐  ┌──────────────┐
│ WELLNESS TIER │  │ COACHING TIER │  │ CLINICAL TIER│
│   85-90%      │  │   15-25%      │  │   10-15%     │
└───────────────┘  └───────────────┘  └──────────────┘
        ↓                  ↓                   ↓
```

### Wellness Tier (85-90% of users)
Self-directed content and tools for employees in the wellness pathway:

- **ClearMinds** - Digital hypnotherapy platform (91K proven users)
  - Sleep mastery, confidence building, stress management
  - Proven efficacy data, established track record

- **Cowch.app** - IMAGINE Framework chat-based wellness
  - Mandy Lehto's 7-dimension wellness model
  - Interactive, conversational approach

- **Limitless** - Edward Orman's structured program
  - Tom's 13 Framework for personal development
  - Goal-setting and accountability

- **OCEAN Analysis** - Behavioral insights and awareness
  - Personality profiling reports
  - Self-understanding and growth tools

### Coaching Tier (15-25% of users)
Human-supported coaching for deeper engagement:

- **Executive Coaching** - 1-on-1 professional coaching
  - Leadership development
  - Career transitions
  - Performance optimization

- **Broadbanc Consciousness** - Consciousness-based coaching
  - Self-awareness development
  - Leadership from consciousness
  - Transformational coaching

- **FLOW (Hassan)** - Specialized coaching methodology
  - Flow state optimization
  - Performance psychology

- **SmartWisdom (Jonathan Kemp)** - Corporate mental health approach
  - Thinking algorithms
  - Regular practices for mental fitness
  - Advanced note-taking techniques
  - Proven in corporate settings

### Clinical Tier (10-15% of users)
Medical and clinical intervention coordinated through Concierge Health:

- **Concierge Health** - Medical coordination umbrella
  - Assessment and triage
  - Provider network management
  - Care coordination

- **Smart Start Minds** - Clinical hypnotherapy
  - Dr. Gethin Thomas
  - Clinical-grade interventions
  - Medical oversight

- **Goodbody Clinic** - Physical health services
  - GP consultations
  - Specialist referrals
  - Integrated care

---

## 2. Assessment Intelligence (The Core IP)

### Component 1: Neuroindicator (Triage)
**Purpose:** Initial risk assessment and pathway determination
**Duration:** 5-10 minutes
**Output:** Routes to Crisis (2-3%), Clinical (10-15%), or Wellness (85-90%)

**What it assesses:**
- Immediate crisis indicators
- Clinical intervention needs
- General wellness suitability

**Critical thresholds:**
- High risk/crisis → Immediate support pathway
- Clinical need → Concierge Health referral
- Wellness appropriate → Continue to OCEAN

### Component 2: OCEAN Profiling
**Purpose:** Personality and behavioral pattern assessment
**Duration:** 15-20 minutes
**Questions:** 60-80 scenarios (from bank of 196)

**Five factors assessed:**
- **Openness** - Creativity, curiosity, imagination
- **Conscientiousness** - Organization, planning, discipline
- **Extraversion** - Social engagement, energy source
- **Agreeableness** - Cooperation, empathy, conflict approach
- **Neuroticism** - Emotional stability, stress response

**Privacy classification:**
- Some questions → Employer-shareable (workplace patterns)
- Some questions → Aggregation-only (home→work influence)
- Some questions → Personal-only (health, relationships)

### Component 3: Home→Work Influence
**Purpose:** Understand external stressors affecting workplace performance
**Duration:** 2 minutes
**Questions:** 6 key life factors

**Factors assessed:**
1. Childcare stress
2. Eldercare burden
3. Financial pressure
4. Relationship strain
5. Housing instability
6. Commute impact

**Privacy:** Employers see **prevalence %** only (e.g., "23% experiencing childcare stress"), never individual details.

### Component 4: Recommendation Engine
**Purpose:** Match employee profile to optimal resources
**Logic examples:**
- High Neuroticism + Sleep Issues → ClearMinds Sleep Mastery
- Low Conscientiousness + Goal Confusion → Limitless (Tom's 13)
- High Agreeableness + Conflict Avoidance → Cowch Boundary Setting
- Low Extraversion + Social Anxiety → ClearMinds Confidence Building
- High Openness + Identity Exploration → Executive Coaching

**Adaptive over time:**
- Quarterly pulse checks (5 questions, 2-3 min)
- Trend analysis detects deterioration
- Can escalate from wellness → coaching → clinical

### Component 5: Privacy Enforcement
**Purpose:** Protect individual employee data while providing organizational insights
**Key principle:** K-Anonymity with k≥10

**Hard rules:**
- Employers see **NO data** until ≥10 employees complete assessments
- Database constraints enforce this (cannot be bypassed)
- Clinical data in completely separate system (Concierge Health manages)
- Employees have full access to their own data always

---

## 3. Privacy Architecture

### Three Separate Databases

#### Database 1: Employee View (Full Access)
**Owner:** Individual employee
**Access:** Employee only (+ platform for service delivery)

**Contains:**
- All assessment responses
- Complete OCEAN profile
- Personal patterns and scores
- Home→work details
- Recommendations
- Content usage history
- Coaching session notes
- Full historical data

**Guarantees:**
- Employee sees everything about themselves
- Can export or delete their data
- Complete transparency

#### Database 2: Employer View (Aggregated Only)
**Owner:** Employer organization
**Access:** HR/Benefits team (subject to k≥10 constraint)

**Contains (aggregated only when k≥10):**
- Team OCEAN pattern distribution (e.g., "32% high neuroticism")
- Home→work influence prevalence (e.g., "18% childcare stress")
- Engagement metrics (e.g., "67% active in past month")
- Quarterly trend changes
- Content category utilization rates

**Explicitly DOES NOT contain:**
- Individual names or IDs
- Personal scores or responses
- Who accessed which content
- Individual coaching/clinical details

**K≥10 Enforcement:**
- If only 9 employees have completed assessments → Employer sees "Insufficient data (minimum 10 required)"
- Database query layer enforces this constraint
- No override mechanism exists

#### Database 3: Clinical (Medical Privacy)
**Owner:** Concierge Health (medical practice)
**Access:** Patient + Provider only

**Contains:**
- Patient medical records
- Diagnoses and treatment plans
- Clinical session notes
- Medications and prescriptions
- Treatment outcomes
- Provider communications

**Explicitly DOES NOT grant access to:**
- Employer (NO ACCESS - medical privacy laws)
- Thrive platform (beyond referral coordination)
- Other employees

**Governed by:**
- Medical privacy regulations (GDPR, medical confidentiality)
- Clinical governance frameworks
- Professional standards (GMC, etc.)

---

## 4. Employee Journey

### Initial Onboarding (25-30 minutes total)

**Step 1: Invitation & Consent (2-3 min)**
- Employee receives invitation from employer
- Landing page explains: what Thrive is, what to expect, privacy guarantees
- Explicit consent required before proceeding
- Account creation

**Step 2: Neuroindicator Assessment (5-10 min)**
- Triage questionnaire
- Determines initial pathway
- **If Crisis detected:** Immediate support resources + Concierge Health contact
- **If Clinical need:** Skip OCEAN, direct to Concierge Health
- **If Wellness appropriate:** Continue to OCEAN

**Step 3: OCEAN Assessment (15-20 min)** *(Wellness pathway only)*
- 60-80 behavioral scenario questions
- Adaptive: follows up on interesting patterns
- Progress bar shows completion

**Step 4: Home→Work Influence (2 min)**
- 6 quick questions about life factors
- Helps platform understand external context

**Step 5: Results & Recommendations (5 min exploration)**
- OCEAN profile visualization
- Personalized insights
- Recommended content, coaching, or clinical options
- Dashboard tour

### Ongoing Engagement

**Continuous Access:**
- Content library (ClearMinds programs, Cowch conversations, etc.)
- Coaching booking (if in coaching tier)
- Clinical appointments (if in clinical tier)
- Progress tracking dashboard

**Quarterly Pulse (2-3 min every 3 months):**
- 5 quick questions about current state
- Trend analysis compares to baseline
- **If deterioration detected:** Platform suggests escalation (e.g., wellness → coaching, or coaching → clinical)
- **If stable/improving:** Celebrate progress, continue current plan

---

## 5. Employer Journey

### Partnership Setup
- Commercial agreement with Thrive
- Privacy agreement (employer acknowledges limitations)
- Decide: pilot group or company-wide rollout
- Branding customization (if desired)

### Bulk Enrollment
- Upload employee list (email addresses)
- System sends invitations
- Tracks enrollment progress (how many have started/completed)

### Dashboard Access (Subject to k≥10)
**Before 10 completions:**
- "Insufficient data - minimum 10 required for privacy"
- Shows only: enrollment count, completion count

**After 10+ completions:**
- Team OCEAN patterns (distribution charts)
- Home→work influence prevalence (% experiencing each factor)
- Engagement metrics (active users, content consumption rates)
- Quarterly trend tracking (is team improving/declining?)

**Actions employer can take:**
- View organizational patterns (never individuals)
- Identify systemic issues (e.g., "40% report eldercare burden")
- Make workplace changes based on aggregate insights
- Monitor ROI (engagement rates, wellbeing trend direction)

### Organizational Recommendations
Platform can suggest organizational-level interventions:
- If 35% have high childcare stress → Consider flexible working policy
- If 50% have high neuroticism + low conscientiousness → Team might benefit from structure/leadership support
- If engagement dropping → Review communication/rollout strategy

---

## 6. Current Status (LEGO Pieces)

### ✓ COMPLETE (5 components)
1. **Cowch IMAGINE Framework** - JSON schema + working demo
2. **OCEAN Question Bank** - 196 behavioral scenarios with privacy classification
3. **Privacy Architecture** - Fully documented, k≥10 logic designed
4. **ClearMinds Partnership** - 91K proven users, established integration
5. **Clinical Partnerships** - Dr. Gethin Thomas (Smart Start Minds), Goodbody Clinic

### ~ IN PROGRESS (3 components)
1. **OCEAN Analysis Engine** - 436 lines of uncommitted code (pattern matching, recommendation logic)
2. **Home→Work Influence Logic** - In analysis engine, needs formalization
3. **Cowch Integration** - Have IMAGINE schema, need API connection

### ✗ NOT STARTED (5 components)
1. **Neuroindicator Assessment** - Need crisis detection logic, question bank, thresholds
2. **Employer Portal** - Dashboard UI, enrollment system, reporting
3. **Employee Dashboard** - Results visualization, content library, booking system
4. **Backend API** - Database, authentication, privacy enforcement layer
5. **Partner Integrations** - APIs for ClearMinds, Cowch, coaching booking, clinical referrals

### ? UNDEFINED (3 components)
1. **Tom's 13 Framework** - Need documentation to build Limitless assessment/content
2. **FLOW (Hassan)** - Scope and integration approach TBD
3. **Concierge Health Structure** - Formalize umbrella organization for all clinical services

---

## 7. Build Options

### Option A: Content-First (3 weeks)
**Deliverable:** All assessments as portable JSON + working demos

**Work:**
1. Neuroindicator schema + demo (1 week)
2. OCEAN finalization (60-80 questions selected) + demo (1 week)
3. Home→Work formalization + demo (3 days)
4. Quarterly pulse schema (2 days)

**Pros:**
- Portable (can rebuild in any tech stack later)
- Content team can test and refine
- No tech stack decision needed yet

**Cons:**
- Doesn't demo full B2B value proposition
- No employer dashboard to show ROI

---

### Option B: Thin Slice End-to-End (8 weeks)
**Deliverable:** Working demo of complete employee + employer journey

**Work:**
1. Assessments (minimal viable versions) - 2 weeks
2. Backend API + database - 2 weeks
3. Employee dashboard (results + recommendations) - 2 weeks
4. Employer dashboard (insights + enrollment) - 2 weeks

**Pros:**
- Complete story for Towergate pitch
- Demonstrates full platform value
- Can actually pilot with small group

**Cons:**
- Longer timeline
- Need to commit to tech stack

---

### Option C: Employer Dashboard Focus (6 weeks)
**Deliverable:** HR-facing dashboard showing ROI potential

**Work:**
1. Minimal assessments (enough for demo data) - 1 week
2. Backend (aggregation logic priority) - 2 weeks
3. Impressive employer dashboard - 3 weeks
4. Mock employee data for realistic visualization

**Pros:**
- Fastest route to Towergate demo
- Shows B2B value clearly
- Less dependent on content finalization

**Cons:**
- Can't demo employee experience
- Mock data less convincing than real pilot

---

## 8. Technical Considerations

### Tech Stack Options

**Frontend:**
- React (most popular, huge ecosystem)
- Vue.js (simpler learning curve)
- Svelte (fastest, smallest bundle)
- Flutter Web (if also building mobile)

**Backend:**
- Node.js + Express (JavaScript full-stack)
- Python + FastAPI (if doing ML/AI later)
- Go (performance, if scale is priority)
- Supabase (fastest MVP, includes auth + DB)

**Database:**
- PostgreSQL (recommended - best for k≥10 constraints)
- MongoDB (if flexibility more important than constraints)
- Supabase (managed Postgres with auth built-in)

**Recommendation: Start with Supabase**
- Fastest time to MVP
- Built-in authentication
- PostgreSQL with row-level security (perfect for privacy)
- Can migrate later if needed

---

## 9. Key Decisions Needed

1. **Assessment Length**
   - 60 questions (15 min) vs 80 questions (20 min) vs 196 questions (40 min)?
   - Trade-off: Completion rate vs data richness

2. **Clinical Thresholds**
   - What Neuroindicator scores trigger Concierge Health referral?
   - What Quarterly Pulse deterioration triggers escalation?

3. **Concierge Health Structure**
   - Should all medical services formally route through Concierge Health?
   - Who owns the clinical database and governance?

4. **Tech Stack**
   - Commit to specific stack for Option B/C, or stay portable with Option A?

5. **Towergate Timeline**
   - When do they need to see a working demo?
   - Determines which build option to pursue

6. **Partner Integration Priority**
   - Which partner to integrate first? (ClearMinds most proven, Cowch most flexible)

7. **OCEAN Analysis Positioning**
   - Is OCEAN a standalone wellness tool, or part of coaching tier?
   - Current placement: Wellness tier (self-directed behavioral insights)

---

## 10. Success Metrics

### Employee Engagement
- % completing initial assessments
- % engaging with recommended content
- % booking coaching sessions
- Quarterly pulse completion rate
- OCEAN score improvements over time

### Employer Value
- Aggregate wellbeing trend direction
- Identification of systemic issues (home→work factors)
- Policy changes informed by data
- Cost savings vs traditional EAP

### Platform Performance
- Assessment completion time (target: <30 min)
- Recommendation accuracy (self-reported usefulness)
- Privacy constraint enforcement (100% compliance)
- Clinical escalation appropriateness

---

## 11. Risk Mitigation

### Privacy Risks
- **Risk:** Employer pressure to bypass k≥10
- **Mitigation:** Database-level enforcement, cannot be overridden

- **Risk:** Data breach exposing individual responses
- **Mitigation:** Encryption at rest, separate databases, minimal data retention

### Clinical Risks
- **Risk:** Missing a crisis case in Neuroindicator
- **Mitigation:** Conservative thresholds, immediate escalation pathways, liability insurance

- **Risk:** Concierge Health overwhelmed by clinical volume
- **Mitigation:** Accurate triage percentages, capacity planning, waitlist management

### Commercial Risks
- **Risk:** Partner unavailability (e.g., ClearMinds changes terms)
- **Mitigation:** Multiple partners per tier, platform-agnostic architecture

- **Risk:** Employer dissatisfaction with limited individual visibility
- **Mitigation:** Clear privacy messaging upfront, demonstrate value of aggregate insights

---

## Next Steps

**Immediate (This Week):**
1. Decide on build option (A, B, or C)
2. Finalize partner list (Hassan/FLOW scope)
3. Get Tom's 13 Framework documentation
4. Define Neuroindicator crisis thresholds

**Short-term (Next 2 Weeks):**
1. Select OCEAN questions (60-80 from 196 bank)
2. Design employer dashboard wireframes
3. Choose tech stack (if pursuing Option B or C)
4. Set up development environment

**Medium-term (Next Month):**
1. Build first assessment demos
2. Create partner integration specs
3. Develop privacy enforcement logic
4. Prepare Towergate pitch materials

---

**Document maintained by:** Tom Cassidy
**For questions:** Review with development team

**Version History:**
- v1.0 (2025-01-13): Initial comprehensive architecture document
