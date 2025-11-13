# Thrive B2B User Flows - Complete Architecture

## Overview: The Two Parallel Journeys

```
┌─────────────────────────────────────────────────────────────────┐
│                    THRIVE B2B PLATFORM                          │
│              (Towergate Partnership Model)                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┴─────────────┐
                ▼                           ▼
        ┌───────────────┐           ┌───────────────┐
        │   EMPLOYEE    │           │   EMPLOYER    │
        │   JOURNEY     │           │   JOURNEY     │
        │ (Individual)  │           │   (Org)       │
        └───────────────┘           └───────────────┘
```

---

## EMPLOYEE JOURNEY - Complete Flow Map

### Phase 1: Onboarding (Day 1)

```
EMPLOYEE RECEIVES INVITATION
        │
        ├─→ Email from Thrive/Towergate
        │   Subject: "Welcome to [Company] Wellness Programme"
        │
        ▼
LANDING PAGE
        │
        ├─→ What is Thrive?
        ├─→ Privacy notice (you control your data)
        ├─→ What to expect (15-20 min assessment)
        │
        ▼
CONSENT & ACCOUNT CREATION
        │
        ├─→ Privacy consent
        ├─→ Employer visibility consent (optional)
        ├─→ Create account (email/SSO)
        │
        ▼
ASSESSMENT STAGE 1: NEUROINDICATOR (5-10 min)
        │
        ├─→ Purpose: Triage (wellness vs clinical need)
        ├─→ Questions: 8-12 behavioral scenarios
        ├─→ Privacy: Personal data only
        │
        ▼
    DECISION POINT A
        │
        ├─→ HIGH RISK / CRISIS DETECTED
        │   │
        │   ├─→ IMMEDIATE ESCALATION
        │   │   ├─→ Crisis resources displayed
        │   │   ├─→ Concierge Health referral offered
        │   │   ├─→ Option to continue or pause
        │   │   └─→ Follow-up scheduled
        │   │
        │   └─→ [If employee continues]
        │       └─→ Proceed to OCEAN (optional)
        │
        └─→ WELLNESS PATHWAY (85-90% of users)
            │
            ▼
ASSESSMENT STAGE 2: OCEAN PROFILING (15-20 min)
            │
            ├─→ 60-80 behavioral scenarios
            ├─→ Workplace-shareable questions
            ├─→ Personal-only questions
            ├─→ Pattern detection (automatic vs conscious)
            │
            ▼
ASSESSMENT STAGE 3: HOME→WORK INFLUENCE (2 min)
            │
            ├─→ 6 questions
            │   ├─→ Childcare stress
            │   ├─→ Eldercare responsibilities
            │   ├─→ Financial pressure
            │   ├─→ Relationship strain
            │   ├─→ Housing instability
            │   └─→ Commute burden
            │
            ├─→ Privacy: Aggregation-only
            ├─→ Employee sees: Personal impact
            ├─→ Employer sees: Team % (if k>10)
            │
            ▼
        RESULTS GENERATED
            │
            ├─→ OCEAN Profile (5 dimensions)
            ├─→ Behavioral patterns identified
            ├─→ Home→work influence summary
            ├─→ Personalized recommendations
            │
            ▼
    RECOMMENDATION ENGINE
            │
            ├─→ CONTENT RECOMMENDATIONS
            │   ├─→ ClearMinds (digital hypnotherapy)
            │   ├─→ Cowch.app (chat-based wellness)
            │   ├─→ Limitless (Edward's programme)
            │   └─→ [Other content partners]
            │
            ├─→ COACHING RECOMMENDATIONS
            │   ├─→ Broadbanc (consciousness coaches)
            │   ├─→ Superheroes (life coaches)
            │   ├─→ whatwouldyouchoose.app
            │   └─→ [Other coaching partners]
            │
            └─→ CLINICAL ESCALATION (if needed)
                ├─→ Concierge Health referral
                ├─→ Smart Start Minds (hypnotherapy)
                ├─→ Goodbody Clinic (physical health)
                └─→ GP/specialist network
```

### Phase 2: Engagement (Weeks 1-12)

```
EMPLOYEE DASHBOARD
        │
        ├─→ MY PROFILE
        │   ├─→ OCEAN scores
        │   ├─→ Behavioral patterns
        │   ├─→ Growth areas identified
        │   └─→ Progress tracking
        │
        ├─→ MY RECOMMENDATIONS
        │   ├─→ Suggested content
        │   ├─→ Suggested coaching
        │   ├─→ Action plan (30-day)
        │   └─→ Track completions
        │
        ├─→ CONTENT LIBRARY (Wellness Tier)
        │   │
        │   ├─→ ClearMinds Hypnotherapy
        │   │   ├─→ Sleep programmes
        │   │   ├─→ Stress management
        │   │   ├─→ Confidence building
        │   │   ├─→ Habit formation
        │   │   └─→ [200+ programmes]
        │   │
        │   ├─→ Cowch.app
        │   │   ├─→ Daily check-ins
        │   │   ├─→ IMAGINE framework coaching
        │   │   ├─→ Chat-based support
        │   │   └─→ Reflection exercises
        │   │
        │   ├─→ Limitless Programme
        │   │   ├─→ Tom's 13 Framework modules
        │   │   ├─→ Energy management
        │   │   ├─→ Focus training
        │   │   └─→ Life mastery content
        │   │
        │   └─→ [Future Content Partners]
        │
        ├─→ COACHING (if recommended)
        │   ├─→ Book session
        │   ├─→ View upcoming appointments
        │   ├─→ Session notes
        │   └─→ Progress tracking
        │
        ├─→ COMMUNITY (Optional)
        │   ├─→ ClearMinds community (91K+ members)
        │   ├─→ Peer support groups
        │   ├─→ Discussion forums
        │   └─→ Wellness challenges
        │
        └─→ CLINICAL SERVICES (if escalated)
            ├─→ Concierge Health portal
            ├─→ Book appointments
            ├─→ Access care plans
            └─→ Medical records (separate privacy)
```

### Phase 3: Ongoing Monitoring (Monthly/Quarterly)

```
QUARTERLY WELLNESS PULSE (Every 3 months)
        │
        ├─→ 5 Quick Questions (2-3 min)
        │   ├─→ Stress level this quarter
        │   ├─→ Sleep quality
        │   ├─→ Workplace support
        │   ├─→ Workload manageability
        │   └─→ Overall wellbeing
        │
        ▼
    TREND ANALYSIS
        │
        ├─→ Compare to baseline (onboarding)
        ├─→ Compare to previous quarter
        ├─→ Flag deterioration
        │
        ▼
    DECISION POINT B
        │
        ├─→ DETERIORATION DETECTED
        │   │
        │   ├─→ Automated check-in triggered
        │   ├─→ New recommendations generated
        │   ├─→ Escalation to clinical (if needed)
        │   └─→ Manager notification (if employee consents)
        │
        └─→ STABLE OR IMPROVING
            │
            ├─→ Continue current plan
            ├─→ Celebrate progress
            └─→ Suggest advanced content
```

---

## EMPLOYER JOURNEY - Complete Flow Map

### Phase 1: Partnership Setup (Pre-Launch)

```
EMPLOYER SIGNS CONTRACT (via Towergate)
        │
        ├─→ Legal agreement
        ├─→ Pricing: £X per employee per year
        ├─→ Privacy commitments
        │
        ▼
EMPLOYER PORTAL SETUP
        │
        ├─→ Admin account creation
        ├─→ Company branding (logo, colors)
        ├─→ Integration with HRIS (optional)
        │   ├─→ Workday
        │   ├─→ BambooHR
        │   ├─→ SAP SuccessFactors
        │   └─→ CSV upload (fallback)
        │
        ▼
BULK EMPLOYEE ENROLLMENT
        │
        ├─→ Upload employee list
        │   ├─→ CSV: name, email, department, location
        │   └─→ HRIS sync (automated)
        │
        ├─→ Customize invitation email
        ├─→ Set launch date
        └─→ Send invitations
```

### Phase 2: Launch & Monitoring (Weeks 1-4)

```
EMPLOYER DASHBOARD (HR View)
        │
        ├─→ ENGAGEMENT METRICS
        │   ├─→ Invitations sent: 250
        │   ├─→ Accounts created: 187 (75%)
        │   ├─→ Assessments completed: 142 (57%)
        │   ├─→ Active users (last 30 days): 98 (39%)
        │   └─→ Content engagement: 67% using 1+ modalities
        │
        ├─→ AGGREGATED INSIGHTS (k>10 enforced)
        │   │
        │   ├─→ TEAM OCEAN PATTERNS
        │   │   ├─→ High conflict avoidance: 42%
        │   │   ├─→ High stress vulnerability: 38%
        │   │   ├─→ Low conscientiousness: 27%
        │   │   └─→ [Only if 10+ respondents]
        │   │
        │   ├─→ HOME→WORK INFLUENCE
        │   │   ├─→ Childcare affecting work: 27% (68/250)
        │   │   ├─→ Financial stress: 31% (78/250)
        │   │   ├─→ Eldercare responsibilities: 12% (30/250)
        │   │   └─→ Commute burden: 44% (110/250)
        │   │
        │   └─→ ORGANIZATIONAL RECOMMENDATIONS
        │       ├─→ "27% report childcare stress → Consider flexible scheduling"
        │       ├─→ "31% report financial stress → Review pay structure"
        │       ├─→ "44% report commute burden → Explore remote work options"
        │       └─→ [Generated based on thresholds]
        │
        ├─→ QUARTERLY PULSE TRENDS
        │   ├─→ Team stress: +23% Q2→Q3 ⚠️
        │   ├─→ Sleep quality: -18% Q2→Q3 ⚠️
        │   ├─→ Workload: +31% Q2→Q3 ⚠️
        │   └─→ Support perception: Stable
        │
        ├─→ MODALITY USAGE
        │   ├─→ ClearMinds: 102 active users (68% completion)
        │   ├─→ Cowch.app: 87 active users (73% daily check-ins)
        │   ├─→ Limitless: 45 enrolled (52% module completions)
        │   ├─→ Coaching: 23 active (91% session attendance)
        │   └─→ Clinical: 12 referred, 8 in treatment
        │
        ├─→ ROI TRACKING
        │   ├─→ Engagement score: 67/100
        │   ├─→ Wellbeing improvement: +23% avg
        │   ├─→ Absenteeism: -12% vs previous year
        │   └─→ Employee satisfaction: +18% (NPS)
        │
        └─→ PRIVACY CONTROLS
            ├─→ K-anonymity status: ✓ 142 respondents
            ├─→ Individual data access: BLOCKED
            ├─→ Audit log: All access attempts logged
            └─→ Compliance: GDPR/Privacy Act compliant
```

### Phase 3: Organizational Action (Ongoing)

```
HR USES INSIGHTS FOR CHANGE
        │
        ├─→ SYSTEMIC INTERVENTIONS
        │   │
        │   ├─→ Childcare stress (27%)
        │   │   ├─→ Implement flexible scheduling
        │   │   ├─→ Explore childcare subsidies
        │   │   └─→ Create parent support group
        │   │
        │   ├─→ Financial stress (31%)
        │   │   ├─→ Review pay structure
        │   │   ├─→ Offer financial wellness programme
        │   │   └─→ Communicate benefits clearly
        │   │
        │   ├─→ Workload increasing (+31%)
        │   │   ├─→ Review resource allocation
        │   │   ├─→ Manager training on delegation
        │   │   └─→ Hire additional staff
        │   │
        │   └─→ Track impact of changes
        │       └─→ Next quarterly pulse shows improvement
        │
        ├─→ INDIVIDUAL SUPPORT (with consent)
        │   │
        │   ├─→ Employee flags deterioration
        │   ├─→ Employee grants manager visibility
        │   ├─→ Manager initiates supportive conversation
        │   └─→ Reasonable adjustments offered
        │
        └─→ STRATEGIC PLANNING
            ├─→ Annual wellbeing report
            ├─→ Budget allocation for next year
            ├─→ Expansion to new departments
            └─→ Success stories / case studies
```

---

## DECISION TREE: Where Does Each Employee Go?

```
                    NEUROINDICATOR ASSESSMENT
                              │
                ┌─────────────┼─────────────┐
                ▼             ▼             ▼
           CRISIS        CLINICAL       WELLNESS
           (2-3%)        (10-15%)       (85-90%)
                │             │             │
                ▼             ▼             ▼
         ┌──────────┐  ┌──────────┐  ┌──────────┐
         │IMMEDIATE │  │CONCIERGE │  │  THRIVE  │
         │SUPPORT   │  │ HEALTH   │  │ WELLNESS │
         └──────────┘  └──────────┘  └──────────┘
                │             │             │
                ▼             ▼             ▼
         Crisis line   Smart Start    Content Library
         Resources     Minds (clinical)   ├─ ClearMinds
         Safety plan   Goodbody Clinic    ├─ Cowch.app
         Follow-up     GP referrals       ├─ Limitless
                                          └─ Coaching
                │             │             │
                └─────────────┼─────────────┘
                              │
                    All paths can escalate
                    if situation changes
                              │
                              ▼
                    QUARTERLY PULSE CHECK
                    (Monitor all users)
```

---

## CONTENT ROUTING LOGIC

### Based on OCEAN + Neuroindicator Results

```
EMPLOYEE COMPLETES ASSESSMENTS
        │
        ▼
RECOMMENDATION ENGINE ANALYZES
        │
        ├─→ High N (Neuroticism) + Sleep issues
        │   └─→ Recommend: ClearMinds "Sleep Mastery" programme
        │
        ├─→ Low C (Conscientiousness) + Goal confusion
        │   └─→ Recommend: Limitless "Tom's 13 Framework" + Structure coach
        │
        ├─→ High A (Agreeableness) + Conflict avoidance pattern
        │   └─→ Recommend: Cowch.app "Boundary Setting" + Assertiveness training
        │
        ├─→ Low E (Extraversion) + Social anxiety indicators
        │   └─→ Recommend: ClearMinds "Social Confidence" + Consider coaching
        │
        ├─→ High O (Openness) + Identity exploration
        │   └─→ Recommend: Broadbanc Consciousness Coach + Reflection exercises
        │
        └─→ Multiple flags + Clinical threshold
            └─→ Recommend: Concierge Health clinical evaluation
```

---

## PRIVACY ENFORCEMENT AT EVERY STAGE

```
┌─────────────────────────────────────────────────────────┐
│              PRIVACY BOUNDARY ENFORCEMENT               │
└─────────────────────────────────────────────────────────┘

EMPLOYEE VIEW (Full Access)
├─→ All assessment responses
├─→ Complete OCEAN profile
├─→ Personal behavioral patterns
├─→ Home→work influence details
├─→ Content recommendations
├─→ Coaching notes (if applicable)
├─→ Clinical records (via Concierge Health)
└─→ Full history and trends

                        │
                        │ PRIVACY BOUNDARY
                        │
                        ▼

EMPLOYER VIEW (Aggregated Only, k>10)
├─→ Team-level OCEAN patterns
├─→ Home→work influence percentages
├─→ Quarterly pulse trend data
├─→ Engagement metrics
├─→ ROI calculations
└─→ NO INDIVIDUAL DATA (enforced by database constraint)

DATABASE CONSTRAINT
├─→ CHECK (respondent_count >= 10)
├─→ Queries blocked if k<10
├─→ Audit log for all access attempts
└─→ Employee consent required for manager visibility
```

---

## MISSING COMPONENTS (What We Need to Build)

### Critical Path (Must Have for Towergate Launch)

1. **Employer Portal**
   - [ ] Bulk enrollment system (CSV upload / HRIS integration)
   - [ ] Aggregated dashboard (OCEAN patterns, home→work insights)
   - [ ] Privacy enforcement UI (k>10 messaging)
   - [ ] Engagement metrics tracking
   - [ ] ROI calculator

2. **Complete Assessment Suite**
   - [x] Cowch IMAGINE (demo complete)
   - [ ] Neuroindicator (JSON schema + demo)
   - [ ] OCEAN 60-80 questions (JSON schema + demo)
   - [ ] Home→Work influence (JSON schema + demo)
   - [ ] Quarterly pulse (JSON schema + demo)

3. **Recommendation Engine**
   - [ ] Content routing logic (OCEAN → ClearMinds/Cowch/Limitless)
   - [ ] Coaching matching (profile → coach type)
   - [ ] Clinical escalation triggers (risk scoring)
   - [ ] Integration with content partner APIs

4. **Employee Dashboard**
   - [ ] Results visualization (OCEAN charts, progress tracking)
   - [ ] Content library access (ClearMinds, Cowch, Limitless)
   - [ ] Coaching booking system
   - [ ] Quarterly pulse reminders

### Important But Not Critical Path

5. **Clinical Integration**
   - [ ] Concierge Health referral system
   - [ ] Smart Start Minds booking
   - [ ] Goodbody Clinic scheduling
   - [ ] Medical records integration (separate privacy)

6. **Content Partner Integrations**
   - [ ] ClearMinds API (user provisioning, usage tracking)
   - [ ] Cowch.app integration (SSO, progress sync)
   - [ ] Limitless programme access (enrollment, tracking)
   - [ ] Broadbanc coach matching
   - [ ] whatwouldyouchoose.app integration

7. **Advanced Features**
   - [ ] Mobile app (React Native)
   - [ ] Offline assessment capability
   - [ ] Multi-language support
   - [ ] Accessibility compliance (WCAG 2.1)
   - [ ] PDF report generation

### Nice to Have (Post-Launch)

8. **Analytics & Optimization**
   - [ ] A/B testing framework
   - [ ] Predictive analytics (who's at risk)
   - [ ] Recommendation algorithm refinement
   - [ ] Usage pattern analysis

9. **Enterprise Features**
   - [ ] SSO (SAML, OAuth)
   - [ ] HRIS integrations (Workday, BambooHR, SAP)
   - [ ] API for custom integrations
   - [ ] White-label capability

10. **Compliance & Security**
    - [ ] ISO 27001 certification
    - [ ] Cyber Essentials Plus
    - [ ] SOC 2 Type II
    - [ ] Penetration testing
    - [ ] GDPR / Privacy Act audit

---

## REPOSITORY STRUCTURE (How It All Fits Together)

```
thrive-work/
│
├── assessments/                    # ← What we just built
│   ├── content/                    # JSON definitions
│   ├── engines/                    # Assessment runners
│   ├── demos/                      # Working proofs-of-concept
│   └── README.md
│
├── employer-portal/                # ← Need to build
│   ├── dashboard/
│   ├── enrollment/
│   ├── reports/
│   └── privacy-controls/
│
├── employee-dashboard/             # ← Need to build
│   ├── profile/
│   ├── recommendations/
│   ├── content-library/
│   ├── coaching/
│   └── pulse-check/
│
├── recommendation-engine/          # ← Need to build
│   ├── routing-logic/
│   ├── content-matching/
│   ├── coaching-matching/
│   └── clinical-escalation/
│
├── integrations/                   # ← Need to build
│   ├── clearminds-api/
│   ├── cowch-api/
│   ├── limitless-api/
│   ├── concierge-health/
│   └── hris-connectors/
│
├── engines/                        # ← Partially built
│   ├── dynamic-ocean-analysis.js   # ✓ In progress
│   └── privacy-enforcement.js      # ← Need to extract
│
├── corporate/                      # ← Existing
│   ├── policies/
│   └── documentation/
│
└── docs/                           # ← Growing
    ├── B2B_USER_FLOWS.md          # ← This document
    ├── ASSESSMENT_EXTRACTION_GUIDE.md
    ├── OCEAN_PRIVACY_ARCHITECTURE.md
    └── DIAGNOSTIC_ANALYSIS.md
```

---

## LEGO PIECES INVENTORY

### ✅ What We Have

| Component | Status | Location | Notes |
|-----------|--------|----------|-------|
| Cowch IMAGINE assessment | ✓ Complete | `/assessments/` | Working demo + JSON |
| Generic assessment engine | ✓ Complete | `/assessments/engines/` | Runs any JSON assessment |
| Privacy architecture design | ✓ Complete | `OCEAN_PRIVACY_ARCHITECTURE.md` | Documented, partially implemented |
| OCEAN analysis engine | 🚧 In progress | `/engines/dynamic-ocean-analysis.js` | 436 uncommitted lines |
| Home→work influence logic | 🚧 In progress | `dynamic-ocean-analysis.js` | 6 categories, employer aggregation |
| Corporate documentation | ✓ Complete | `/corporate/` | Policies, governance frameworks |
| Extraction guide | ✓ Complete | `/docs/` | For rebuilding in other stacks |

### 🔨 What We Need to Build (Priority Order)

| Priority | Component | Estimated Effort | Blocks What |
|----------|-----------|------------------|-------------|
| **P0** | Neuroindicator JSON + demo | 1 week | Employee onboarding flow |
| **P0** | OCEAN 60-80 question bank | 2 weeks | Personality profiling |
| **P0** | Home→work JSON + demo | 3 days | Employer insights |
| **P0** | Employer portal MVP | 4 weeks | B2B launch |
| **P1** | Employee dashboard MVP | 4 weeks | User engagement |
| **P1** | Recommendation engine | 2 weeks | Content routing |
| **P1** | Quarterly pulse | 1 week | Ongoing monitoring |
| **P2** | ClearMinds integration | 2 weeks | Content delivery |
| **P2** | Cowch.app integration | 2 weeks | Content delivery |
| **P2** | Concierge Health integration | 3 weeks | Clinical escalation |

### 🤔 What We Need to Decide

1. **Assessment length:** 60 vs 80 vs 196 OCEAN questions (completion rate vs depth trade-off)
2. **Onboarding flow:** Sequential (Neuroindicator → OCEAN → Home→Work) vs modular (pick components)
3. **Clinical threshold:** What OCEAN/Neuroindicator scores trigger Concierge Health referral?
4. **Employer visibility:** Default opt-in vs opt-out for workplace-shareable patterns
5. **Content partner model:** Deep integration vs lightweight referral
6. **Tech stack:** Continue vanilla JS demos vs rebuild in React now
7. **Mobile strategy:** PWA vs React Native app vs mobile-responsive web only

---

## NEXT STEPS: Three Possible Paths

### Path A: Complete the Assessment Suite (Content-First)

**Goal:** Finish all assessment JSON schemas + demos

**Work:**
1. Neuroindicator schema + demo (1 week)
2. OCEAN 60-80 questions schema (2 weeks)
3. Home→work schema + demo (3 days)
4. Quarterly pulse schema + demo (3 days)

**Outcome:** Complete portable assessment library, ready for any tech stack

**Pros:** Reusable across all platforms, no tech stack lock-in
**Cons:** Doesn't deliver working product yet

---

### Path B: Build Employer Portal MVP (B2B-First)

**Goal:** Working dashboard for Towergate demo

**Work:**
1. Bulk enrollment (CSV upload)
2. Aggregated insights dashboard
3. K>10 privacy enforcement
4. Engagement metrics

**Outcome:** Demonstrable B2B value to Towergate

**Pros:** Shows ROI immediately, validates partnership
**Cons:** Need backend + database, larger scope

---

### Path C: Build Employee Dashboard MVP (User-First)

**Goal:** Working end-to-end employee experience

**Work:**
1. Assessment flow (Neuroindicator → OCEAN → Home→work)
2. Results visualization
3. Recommendation display
4. Content library access

**Outcome:** Functional employee journey for user testing

**Pros:** Validates engagement model, gets user feedback
**Cons:** Doesn't demonstrate employer value yet

---

## RECOMMENDATION

**Hybrid Approach: Parallel Tracks**

**Track 1 (Content):** Finish assessment schemas (3 weeks)
- Neuroindicator
- OCEAN question bank
- Home→work
- Quarterly pulse

**Track 2 (MVP):** Build thin slice end-to-end (4 weeks)
- Simple employee onboarding flow
- Basic employer dashboard
- Privacy enforcement
- Demonstrates complete concept

**Outcome:**
- Content ready for any tech stack
- Working proof-of-concept for Towergate
- Foundation for full build

**What do you think? Which path makes most sense given Towergate timeline?**
