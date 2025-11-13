# Thrive Platform Architecture - The Complete Picture

## The Envelope: Thrive as Integration Platform

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                                                                 │
│                              THRIVE PLATFORM                                    │
│                   "Know Thyself & Do Something About It"                       │
│                                                                                 │
│  ┌───────────────────────────────────────────────────────────────────────────┐ │
│  │                      ASSESSMENT & ROUTING LAYER                           │ │
│  │  (The Intelligence - What Makes Thrive Different)                         │ │
│  └───────────────────────────────────────────────────────────────────────────┘ │
│                                      │                                          │
│        ┌─────────────────────────────┼─────────────────────────────┐           │
│        │                             │                             │           │
│        ▼                             ▼                             ▼           │
│  ┌──────────┐                 ┌──────────┐                 ┌──────────┐       │
│  │ WELLNESS │                 │  COACHING │                 │ CLINICAL │       │
│  │   TIER   │                 │   TIER    │                 │   TIER   │       │
│  └──────────┘                 └──────────┘                 └──────────┘       │
│        │                             │                             │           │
│  [Content Partners]           [Coach Network]          [Medical Partners]      │
│                                                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## Layer 1: Assessment & Intelligence (The Core IP)

This is what **Thrive owns and controls** - the secret sauce.

```
┌─────────────────────────────────────────────────────────────┐
│          ASSESSMENT & ROUTING INTELLIGENCE                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. TRIAGE: Neuroindicator                                 │
│     ├─→ Crisis detection (2-3%)                           │
│     ├─→ Clinical need (10-15%)                            │
│     └─→ Wellness pathway (85-90%)                         │
│                                                             │
│  2. PROFILING: OCEAN Behavioral Assessment                 │
│     ├─→ Openness (creativity, curiosity)                  │
│     ├─→ Conscientiousness (organization, planning)        │
│     ├─→ Extraversion (social energy)                      │
│     ├─→ Agreeableness (harmony vs boundaries)            │
│     └─→ Neuroticism (emotional regulation)                │
│                                                             │
│  3. CONTEXT: Home→Work Influence                           │
│     ├─→ Childcare, eldercare, financial stress           │
│     └─→ Organizational insights for employer             │
│                                                             │
│  4. ROUTING ENGINE: Personalized Recommendations           │
│     ├─→ Content matching (which modality?)                │
│     ├─→ Coach matching (which style?)                     │
│     ├─→ Clinical escalation (when to refer?)             │
│     └─→ Adaptive over time (quarterly pulse tracking)    │
│                                                             │
│  5. PRIVACY ENFORCEMENT: K-Anonymity Architecture          │
│     ├─→ Employee: full access to their data              │
│     ├─→ Employer: aggregated insights (k>10)             │
│     └─→ Database constraints prevent individual leaks    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**This layer is:**
- ✓ Portable (JSON-defined content)
- ✓ Validated (based on Big Five research)
- ✓ Privacy-by-design (k-anonymity enforced)
- ✓ Defensible IP (proprietary algorithms + question banks)

**Status:**
- ✅ Cowch IMAGINE assessment (complete demo)
- 🚧 OCEAN analysis engine (436 lines uncommitted)
- 🚧 Home→work influence (in progress)
- ❌ Neuroindicator (need schema)
- ❌ Recommendation engine (need to build)
- ❌ Quarterly pulse (need schema)

---

## Layer 2: Wellness Tier (Content Marketplace)

Thrive acts as **intelligent router** to multiple content partners.

```
┌─────────────────────────────────────────────────────────────┐
│                    WELLNESS CONTENT TIER                    │
│                     (85-90% of users)                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CLEARMINDS (Digital Hypnotherapy)                         │
│  ├─→ What it is: 200+ hypnotherapy programmes             │
│  ├─→ Delivery: App + web, self-service                    │
│  ├─→ Moat: 91K+ community, 4.5 years proven engagement    │
│  ├─→ Routing: High N → sleep/stress programmes            │
│  └─→ Integration: API for user provisioning + tracking    │
│                                                             │
│  COWCH.APP (Chat-Based Wellness - Mandy's IMAGINE)        │
│  ├─→ What it is: Daily check-ins, IMAGINE framework       │
│  ├─→ Delivery: Chat interface, conversational AI          │
│  ├─→ Moat: Mandy's therapeutic framework + IP             │
│  ├─→ Routing: High A + boundary issues → assertiveness    │
│  └─→ Integration: SSO + progress sync                     │
│                                                             │
│  LIMITLESS (Edward Orman's Conquering Life + Tom's 13)    │
│  ├─→ What it is: Structured personal development          │
│  ├─→ Delivery: Modules, videos, workbooks                 │
│  ├─→ Moat: Edward's programme + Tom's framework IP        │
│  ├─→ Routing: Low C + goal confusion → structure          │
│  └─→ Integration: Enrollment API + completion tracking    │
│                                                             │
│  [FUTURE CONTENT PARTNERS]                                 │
│  ├─→ Meditation apps                                       │
│  ├─→ Nutrition coaching                                    │
│  ├─→ Exercise programmes                                   │
│  └─→ Financial wellness tools                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Business Model:**
- Employees get access via employer subscription
- Thrive pays content partners:
  - Per-active-user pricing (Cowch, ClearMinds)
  - Per-enrollment pricing (Limitless)
  - Revenue share model (TBD per partner)
- Thrive captures platform fee from employer

**Status:**
- ✅ ClearMinds (existing, 91K users, need API integration)
- 🚧 Cowch.app (in development, have IMAGINE assessment schema)
- 🚧 Limitless (need Tom's 13 Framework assessment)
- ❌ Partner integration APIs (not built yet)

---

## Layer 3: Coaching Tier (Human Practitioner Network)

For users who need **human guidance**, not just content.

```
┌─────────────────────────────────────────────────────────────┐
│                     COACHING NETWORK                        │
│                    (15-25% of users)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  BROADBANC (Consciousness Coaches)                         │
│  ├─→ Style: Deep identity work, consciousness expansion   │
│  ├─→ Routing: High O + identity exploration               │
│  ├─→ Delivery: 1:1 sessions, group workshops              │
│  └─→ Integration: Booking system + session notes          │
│                                                             │
│  SUPERHEROES (Life Coaches)                                │
│  ├─→ Style: Practical goal-setting, accountability        │
│  ├─→ Routing: Low C + action orientation                  │
│  ├─→ Delivery: 1:1 sessions, action plans                 │
│  └─→ Integration: Booking system + progress tracking      │
│                                                             │
│  JONATHAN KEMP (Integration TBD)                           │
│  ├─→ Discussed yesterday, need specifics                  │
│  └─→ [Details to be determined]                           │
│                                                             │
│  WHATWOULDYOUCHOOSE.APP (Choice Framework)                 │
│  ├─→ Decision-making tools                                │
│  ├─→ Routing: Decision paralysis patterns                 │
│  └─→ [Platform integration details TBD]                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Business Model:**
- Employers can:
  - **Option A:** Subsidize coaching (include in subscription)
  - **Option B:** Offer as opt-in add-on (employee pays partial)
  - **Option C:** Provide as benefit for flagged high-risk users
- Coaches paid per-session
- Thrive takes small platform fee (5-10%)

**Status:**
- 🤝 Broadbanc (partnership in place, need tech integration)
- 🤝 Superheroes (partnership in place, need tech integration)
- ❓ Jonathan Kemp (need to define scope)
- ❓ whatwouldyouchoose.app (need to define integration)

---

## Layer 4: Clinical Tier (Medical Partners via Concierge Health)

For users who meet **clinical threshold**, Thrive refers to medical providers.

```
┌─────────────────────────────────────────────────────────────┐
│               CLINICAL / MEDICAL TIER                       │
│          (10-15% escalated, 2-3% immediate crisis)          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CONCIERGE HEALTH (Medical Service Umbrella)               │
│  ├─→ Role: Manages all clinical providers                 │
│  ├─→ Governance: CQC registration, medical oversight      │
│  ├─→ Liability: Medical malpractice insurance             │
│  └─→ Integration: Referral system + outcomes tracking     │
│                                                             │
│      ├─→ SMART START MINDS (Clinical Hypnotherapy)        │
│      │   ├─→ Dr. Edward Thomas (CQC registered)           │
│      │   ├─→ Catherine Orman                              │
│      │   └─→ Clinical protocols, formal treatment         │
│      │                                                     │
│      ├─→ GOODBODY CLINIC (Physical Health Screening)      │
│      │   ├─→ Comprehensive health assessments             │
│      │   ├─→ Mind-body integration                        │
│      │   └─→ Circular referrals (physical ↔ mental)       │
│      │                                                     │
│      └─→ [FUTURE MEDICAL SERVICES]                        │
│          ├─→ GP network                                   │
│          ├─→ Specialist referrals                         │
│          ├─→ Psychiatry (medication management)           │
│          └─→ CBT/therapy providers                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Business Model:**
- **Thrive role:** Triage + referral (not medical provider)
- **Concierge Health role:** Medical service delivery
- **Revenue model:**
  - Employer pays Concierge Health directly for clinical services
  - OR Concierge Health pays Thrive referral fee (5-10%)
  - Medical billing separate from wellness subscription

**Critical Decision:** Should all medical go via Concierge Health?
- ✅ Pros: Clean separation, liability protection, scalability
- ⚠️ Cons: Less control, dependency risk, revenue share complexity

**Status:**
- 🤝 Smart Start Minds (existing partnership with Dr. Thomas)
- 🤝 Goodbody Clinic (existing partnership)
- ❌ Concierge Health umbrella structure (need to formalize)
- ❌ Referral system (not built)

---

## The Complete Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         EMPLOYEE JOURNEY                            │
└─────────────────────────────────────────────────────────────────────┘

  Employee invited by employer
         │
         ▼
  ┌──────────────┐
  │ Neuroindicator│  (5-10 min)
  │  Assessment   │
  └──────────────┘
         │
         ├─→ Crisis → Immediate resources + Concierge Health
         ├─→ Clinical → Concierge Health referral + wellness tier
         └─→ Wellness → Continue to profiling
                │
                ▼
         ┌──────────────┐
         │    OCEAN     │  (15-20 min)
         │  Assessment  │
         └──────────────┘
                │
                ▼
         ┌──────────────┐
         │  Home→Work   │  (2 min)
         │  Influence   │
         └──────────────┘
                │
                ▼
         ┌──────────────────────┐
         │ RECOMMENDATION ENGINE │
         └──────────────────────┘
                │
        ┌───────┼───────┐
        ▼       ▼       ▼
    Content  Coaching  Clinical
        │       │       │
        └───────┼───────┘
                │
                ▼
         ┌──────────────┐
         │   Employee   │
         │  Dashboard   │
         └──────────────┘
                │
         [Ongoing engagement]
                │
                ▼
         ┌──────────────┐
         │  Quarterly   │
         │    Pulse     │
         └──────────────┘
                │
         [Loop back to recommendation engine]


┌─────────────────────────────────────────────────────────────────────┐
│                        EMPLOYER JOURNEY                             │
└─────────────────────────────────────────────────────────────────────┘

  Employer contracts via Towergate
         │
         ▼
  ┌──────────────┐
  │ Bulk Enroll  │  Upload employee list
  └──────────────┘
         │
         ▼
  ┌──────────────┐
  │ Invitations  │  Automated email campaign
  └──────────────┘
         │
         ▼
  ┌──────────────────────┐
  │  Employer Dashboard  │
  └──────────────────────┘
         │
    ┌────┴────┐
    ▼         ▼
Engagement  Insights
Metrics     (k>10 only)
    │         │
    └────┬────┘
         │
         ▼
  ┌──────────────────────┐
  │  Organizational      │
  │  Action Planning     │
  └──────────────────────┘
         │
    (Systemic interventions)
         │
         ▼
  Next quarterly pulse shows impact
```

---

## Privacy Architecture (The Non-Negotiable Foundation)

```
┌─────────────────────────────────────────────────────────────┐
│                   DATA SEPARATION MODEL                     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  EMPLOYEE DATABASE (Full Access)                           │
├─────────────────────────────────────────────────────────────┤
│  employees                                                  │
│  ├─ id                                                      │
│  ├─ name, email, demographics                              │
│  ├─ assessment_responses (all questions)                   │
│  ├─ ocean_scores (O, C, E, A, N)                          │
│  ├─ behavioral_patterns                                    │
│  ├─ home_work_influence (full details)                    │
│  ├─ recommendations                                        │
│  ├─ content_usage                                          │
│  ├─ coaching_notes                                         │
│  └─ quarterly_pulse_history                               │
│                                                             │
│  Access: Employee only (+ Thrive platform for routing)    │
└─────────────────────────────────────────────────────────────┘

                           │
                    PRIVACY BOUNDARY
                    (k>10 enforced)
                           │
                           ▼

┌─────────────────────────────────────────────────────────────┐
│  EMPLOYER DATABASE (Aggregated Only)                       │
├─────────────────────────────────────────────────────────────┤
│  employer_insights                                          │
│  ├─ company_id                                             │
│  ├─ respondent_count (CHECK >= 10)                        │
│  ├─ ocean_team_patterns (aggregated percentages)          │
│  ├─ home_work_prevalence (%, not names)                   │
│  ├─ engagement_metrics                                     │
│  ├─ quarterly_trends                                       │
│  └─ organizational_recommendations                         │
│                                                             │
│  ❌ FORBIDDEN: individual_id, individual_scores, names    │
│                                                             │
│  Access: Employer HR (if k>=10), Towergate (reports)      │
└─────────────────────────────────────────────────────────────┘

                           │
                    SEPARATE DATABASE
                    (Medical privacy)
                           │
                           ▼

┌─────────────────────────────────────────────────────────────┐
│  CLINICAL DATABASE (Medical-Grade Privacy)                 │
├─────────────────────────────────────────────────────────────┤
│  Managed by: Concierge Health                              │
│                                                             │
│  clinical_records                                           │
│  ├─ patient_id (pseudonymized link to employee_id)        │
│  ├─ diagnoses                                              │
│  ├─ treatment_plans                                        │
│  ├─ session_notes                                          │
│  ├─ medications                                            │
│  └─ outcomes_data                                          │
│                                                             │
│  Access: Patient + clinical provider only                  │
│  Thrive receives: Anonymized outcomes (for ROI tracking)  │
│  Employer receives: NOTHING (medical privacy laws)         │
└─────────────────────────────────────────────────────────────┘
```

**Database Constraints (Enforced)**
```sql
-- Employer insights table MUST have k>=10
CREATE TABLE employer_insights (
    company_id UUID,
    respondent_count INT NOT NULL,
    ocean_patterns JSONB,
    CONSTRAINT k_anonymity CHECK (respondent_count >= 10)
);

-- Audit log for all employer access attempts
CREATE TABLE access_audit (
    timestamp TIMESTAMP,
    user_id UUID,
    resource_type VARCHAR,
    resource_id UUID,
    access_granted BOOLEAN,
    reason VARCHAR
);
```

---

## Tech Stack Decision Points

### Current State: Vanilla JS Demos

**Pros:**
- ✅ Portable (can rebuild in any framework)
- ✅ Fast to prototype
- ✅ No build complexity

**Cons:**
- ❌ Not production-ready
- ❌ No state management
- ❌ Manual data handling

### Option A: Rebuild in React/Next.js

**When:** If Towergate timeline allows (3+ months)

**Pros:**
- Modern, maintainable codebase
- Rich ecosystem (charts, forms, auth)
- Easy to hire developers
- SSR for SEO

**Stack:**
```
Frontend: Next.js + React + TypeScript
Backend: Node.js + Express + PostgreSQL
Auth: NextAuth.js (SSO support)
Charts: Recharts / Chart.js
Forms: React Hook Form
Deployment: Vercel (frontend) + Railway (backend)
```

### Option B: Continue Vanilla JS + Add Backend

**When:** If Towergate needs demo FAST (4-6 weeks)

**Pros:**
- Use existing assessment demos
- Add backend API for data persistence
- Quick to employer portal MVP
- Can rebuild frontend later

**Stack:**
```
Frontend: Vanilla JS + demos (existing)
Backend: Node.js + Express + PostgreSQL
Deployment: Railway (full-stack)
Later: Rebuild frontend in React when time allows
```

### Option C: Hybrid (Demos for Content, React for Portals)

**When:** Best of both worlds

**Strategy:**
- Keep assessment demos in vanilla JS (portable, proven)
- Build employer portal in React (needs complexity)
- Build employee dashboard in React (rich interactions)
- Share backend API between both

---

## Repository Structure (Final Answer)

```
thrive-work/
│
├── README.md                          # Main overview
├── ARCHITECTURE.md                    # This document
│
├── assessments/                       # ✅ Assessment engine (portable)
│   ├── content/                       # JSON question banks
│   │   ├── cowch-imagine-schema.json  # ✓ Complete
│   │   ├── neuroindicator.json        # ← Need to build
│   │   ├── ocean-questions.json       # ← Need to build
│   │   ├── home-work-influence.json   # ← Need to build
│   │   └── quarterly-pulse.json       # ← Need to build
│   │
│   ├── engines/                       # Assessment runners
│   │   └── generic-assessment-engine.js  # ✓ Complete
│   │
│   └── demos/                         # Working HTML demos
│       ├── cowch-imagine-demo.html    # ✓ Complete
│       └── [other demos TBD]
│
├── backend/                           # ← Need to build
│   ├── api/
│   │   ├── assessments/               # POST responses, GET results
│   │   ├── recommendations/           # GET personalized routing
│   │   ├── employer/                  # GET aggregated insights (k>10)
│   │   └── integrations/              # Partner APIs
│   │
│   ├── database/
│   │   ├── schema.sql                 # PostgreSQL schema
│   │   ├── migrations/
│   │   └── seeds/
│   │
│   ├── services/
│   │   ├── recommendation-engine.js   # Routing logic
│   │   ├── privacy-enforcement.js     # K-anonymity checker
│   │   └── partner-integrations.js    # ClearMinds, Cowch, etc.
│   │
│   └── server.js                      # Express app
│
├── employer-portal/                   # ← Need to build (React?)
│   ├── pages/
│   │   ├── dashboard.tsx              # Engagement + insights
│   │   ├── enrollment.tsx             # Bulk upload
│   │   ├── reports.tsx                # Quarterly trends
│   │   └── privacy.tsx                # K-anonymity status
│   │
│   └── components/
│       ├── EngagementChart.tsx
│       ├── HomeWorkInsights.tsx
│       └── OceanPatterns.tsx
│
├── employee-dashboard/                # ← Need to build (React?)
│   ├── pages/
│   │   ├── assessment-flow.tsx        # Neuroindicator → OCEAN → Home→Work
│   │   ├── results.tsx                # OCEAN profile + recommendations
│   │   ├── library.tsx                # Content access
│   │   ├── coaching.tsx               # Book sessions
│   │   └── pulse-check.tsx            # Quarterly check-in
│   │
│   └── components/
│       ├── OceanChart.tsx
│       ├── RecommendationCard.tsx
│       └── ProgressTracker.tsx
│
├── engines/                           # 🚧 Existing (in progress)
│   └── dynamic-ocean-analysis.js      # 436 uncommitted lines
│
├── corporate/                         # ✅ Existing documentation
│   └── policies/
│
└── docs/                              # ✅ Growing documentation
    ├── B2B_USER_FLOWS.md             # ✓ Complete (this session)
    ├── THRIVE_ARCHITECTURE.md        # ✓ Complete (this doc)
    ├── ASSESSMENT_EXTRACTION_GUIDE.md # ✓ Complete
    ├── OCEAN_PRIVACY_ARCHITECTURE.md  # ✓ Existing
    └── DIAGNOSTIC_ANALYSIS.md         # ✓ Existing
```

---

## Build Sequence (Recommended)

### Phase 1: Foundation (Weeks 1-3)
- [ ] Finish assessment JSON schemas (Neuroindicator, OCEAN, Home→Work, Pulse)
- [ ] Create demos for each assessment
- [ ] Commit uncommitted OCEAN analysis code
- [ ] Test complete assessment flow end-to-end

### Phase 2: Backend (Weeks 4-6)
- [ ] Set up PostgreSQL database + schema
- [ ] Build assessment API (record responses, generate results)
- [ ] Build recommendation engine (routing logic)
- [ ] Implement privacy enforcement (k>10 database constraints)

### Phase 3: Employee Experience (Weeks 7-9)
- [ ] Build assessment flow UI (Neuroindicator → OCEAN → Home→Work)
- [ ] Build results visualization
- [ ] Build recommendation display
- [ ] Build content library access

### Phase 4: Employer Portal (Weeks 10-12)
- [ ] Build bulk enrollment (CSV upload)
- [ ] Build aggregated dashboard
- [ ] Build engagement metrics
- [ ] Build quarterly trend tracking

### Phase 5: Partner Integrations (Weeks 13-16)
- [ ] ClearMinds API integration
- [ ] Cowch.app integration
- [ ] Concierge Health referral system
- [ ] Coaching booking system

### Phase 6: Polish & Launch (Weeks 17-20)
- [ ] Mobile responsiveness
- [ ] Accessibility audit
- [ ] Security audit
- [ ] Load testing
- [ ] Towergate pilot launch

---

## Decision Time: What to Build First?

Given everything mapped out, what's the **minimum viable demo** for Towergate?

**Option 1: Complete Assessment Suite (Content-First)**
- Build all JSON schemas + demos
- Shows Thrive's assessment IP
- Portable, reusable
- **Timeline:** 3 weeks
- **Deliverable:** Working assessments, no dashboards

**Option 2: Thin Slice End-to-End (Demo-First)**
- One assessment flow (Neuroindicator → OCEAN)
- Basic employee results page
- Basic employer dashboard (fake aggregated data)
- **Timeline:** 4 weeks
- **Deliverable:** Clickable prototype of full experience

**Option 3: Employer Dashboard Focus (B2B-First)**
- Skip employee experience for now
- Build impressive employer dashboard
- Use mock data to show insights/ROI
- **Timeline:** 3 weeks
- **Deliverable:** HR-facing value proposition

**Which path aligns with Towergate timeline and priorities?**
