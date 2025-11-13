# Thrive Platform - Mermaid Diagrams

These diagrams render automatically in GitHub and can be embedded in web pages.

---

## 1. Thrive Platform Overview

```mermaid
graph TB
    subgraph Thrive["THRIVE PLATFORM - Know Thyself & Do Something About It"]
        Assessment["Assessment & Routing Intelligence<br/>(Core IP)"]

        Assessment --> Wellness["Wellness Tier<br/>85-90% of users"]
        Assessment --> Coaching["Coaching Tier<br/>15-25% of users"]
        Assessment --> Clinical["Clinical Tier<br/>10-15% of users"]

        Wellness --> CM["ClearMinds<br/>Digital Hypnotherapy<br/>91K users"]
        Wellness --> Cowch["Cowch.app<br/>IMAGINE Framework<br/>Chat-based"]
        Wellness --> Limitless["Limitless<br/>Edward Orman<br/>Tom's 13 Framework"]

        Coaching --> Broadbanc["Broadbanc<br/>Consciousness Coaches"]
        Coaching --> Superheroes["Superheroes<br/>Life Coaches"]
        Coaching --> Jonathan["Jonathan Kemp<br/>TBD"]

        Clinical --> CH["Concierge Health<br/>Medical Umbrella"]
        CH --> SSM["Smart Start Minds<br/>Clinical Hypnotherapy"]
        CH --> Goodbody["Goodbody Clinic<br/>Physical Health"]
        CH --> GP["GP/Specialist<br/>Network"]
    end

    style Assessment fill:#ffff00,stroke:#333,stroke-width:4px,color:#000
    style Thrive fill:#1a1a2e,stroke:#ffff00,stroke-width:2px,color:#fff
```

---

## 2. Employee Journey - Complete Flow

```mermaid
graph TD
    Start([Employee Receives<br/>Invitation]) --> Landing[Landing Page<br/>Privacy Notice<br/>What to Expect]
    Landing --> Consent[Consent &<br/>Account Creation]
    Consent --> Neuro[Neuroindicator<br/>5-10 min<br/>Triage Assessment]

    Neuro --> Crisis{Risk Level?}

    Crisis -->|High Risk<br/>2-3%| ImmediateSupport[IMMEDIATE SUPPORT<br/>Crisis Resources<br/>Concierge Health Referral<br/>Safety Planning]

    Crisis -->|Clinical Need<br/>10-15%| ClinicalPath[CLINICAL PATHWAY<br/>Concierge Health<br/>Smart Start Minds<br/>Goodbody Clinic]

    Crisis -->|Wellness<br/>85-90%| OCEAN[OCEAN Assessment<br/>15-20 min<br/>60-80 Questions]

    OCEAN --> HomeWork[Home→Work Influence<br/>2 min<br/>6 Questions]

    HomeWork --> Results[RESULTS GENERATED<br/>OCEAN Profile<br/>Behavioral Patterns<br/>Personal Impact]

    Results --> Recommendations[RECOMMENDATION ENGINE]

    Recommendations --> ContentRec[Content Recommendations<br/>ClearMinds, Cowch, Limitless]
    Recommendations --> CoachRec[Coaching Recommendations<br/>Broadbanc, Superheroes]
    Recommendations --> ClinicalRec[Clinical Escalation<br/>if needed]

    ContentRec --> Dashboard[Employee Dashboard<br/>Results, Content Library<br/>Progress Tracking]
    CoachRec --> Dashboard
    ClinicalRec --> Dashboard

    Dashboard --> Pulse[Quarterly Pulse<br/>5 Questions<br/>2-3 min]

    Pulse --> TrendAnalysis{Deterioration<br/>Detected?}
    TrendAnalysis -->|Yes| NewRec[Update Recommendations<br/>Possible Clinical Escalation]
    TrendAnalysis -->|No| Continue[Continue Current Plan]

    NewRec --> Dashboard
    Continue --> Dashboard

    style Neuro fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style OCEAN fill:#764ba2,stroke:#333,stroke-width:2px,color:#fff
    style Results fill:#ffff00,stroke:#333,stroke-width:2px,color:#000
    style Dashboard fill:#00d4aa,stroke:#333,stroke-width:2px,color:#fff
```

---

## 3. Decision Tree - Routing Logic

```mermaid
graph TD
    Neuro[NEUROINDICATOR<br/>ASSESSMENT] --> Split{Triage<br/>Decision}

    Split -->|2-3%| Crisis[CRISIS]
    Split -->|10-15%| Clinical[CLINICAL]
    Split -->|85-90%| Wellness[WELLNESS]

    Crisis --> CrisisSupport[Immediate Support<br/>━━━━━━━━━━<br/>Crisis Hotline<br/>Safety Resources<br/>Emergency Services<br/>Follow-up Scheduling]

    Clinical --> ClinicalSupport[Concierge Health<br/>━━━━━━━━━━<br/>Smart Start Minds<br/>Clinical Hypnotherapy<br/>Goodbody Clinic<br/>GP Referrals]

    Wellness --> WellnessSupport[Thrive Wellness<br/>━━━━━━━━━━<br/>ClearMinds Content<br/>Cowch.app<br/>Limitless Programme<br/>Coaching Access]

    CrisisSupport --> Monitor[All paths can escalate<br/>if situation changes]
    ClinicalSupport --> Monitor
    WellnessSupport --> Monitor

    Monitor --> Pulse[QUARTERLY PULSE CHECK<br/>Monitor all users]

    Pulse --> Escalate{Need to<br/>Change Path?}
    Escalate -->|Yes| Split
    Escalate -->|No| Continue[Continue Current Support]

    style Crisis fill:#ff6b6b,stroke:#333,stroke-width:2px,color:#fff
    style Clinical fill:#ffa500,stroke:#333,stroke-width:2px,color:#fff
    style Wellness fill:#4ecdc4,stroke:#333,stroke-width:2px,color:#fff
    style Pulse fill:#95e1d3,stroke:#333,stroke-width:2px,color:#000
```

---

## 4. Privacy Architecture - Data Separation

```mermaid
graph TB
    subgraph Employee["EMPLOYEE VIEW - Full Access"]
        EmpData[All Assessment Responses<br/>Complete OCEAN Profile<br/>Personal Patterns<br/>Home→Work Details<br/>Recommendations<br/>Content Usage<br/>Coaching Notes<br/>Full History]
    end

    PrivacyBoundary[PRIVACY BOUNDARY<br/>K>10 Enforcement]

    subgraph Employer["EMPLOYER VIEW - Aggregated Only (k≥10)"]
        EmpInsights[Team OCEAN Patterns %<br/>Home→Work Prevalence %<br/>Engagement Metrics<br/>Quarterly Trends<br/>❌ NO Individual Data<br/>❌ NO Names/IDs<br/>❌ NO Personal Scores]
    end

    subgraph Clinical["CLINICAL DATABASE - Separate (Medical Privacy)"]
        ClinicalData[Patient Records<br/>Diagnoses<br/>Treatment Plans<br/>Session Notes<br/>Medications<br/>Outcomes<br/>━━━━━━━━━━<br/>Managed by Concierge Health<br/>Patient + Provider Access Only<br/>Employer: NO ACCESS]
    end

    EmpData --> PrivacyBoundary
    PrivacyBoundary --> EmpInsights

    Employee -.-|Separate System| Clinical

    style Employee fill:#4ecdc4,stroke:#333,stroke-width:2px,color:#000
    style PrivacyBoundary fill:#ffff00,stroke:#ff0000,stroke-width:4px,color:#000
    style Employer fill:#95e1d3,stroke:#333,stroke-width:2px,color:#000
    style Clinical fill:#ff6b6b,stroke:#333,stroke-width:2px,color:#fff
```

---

## 5. Assessment Intelligence - Core IP

```mermaid
graph TD
    subgraph Core["ASSESSMENT & ROUTING INTELLIGENCE - Thrive Core IP"]
        Triage[1. TRIAGE: Neuroindicator<br/>━━━━━━━━━━<br/>Crisis Detection 2-3%<br/>Clinical Need 10-15%<br/>Wellness Pathway 85-90%]

        Profile[2. PROFILING: OCEAN<br/>━━━━━━━━━━<br/>Openness<br/>Conscientiousness<br/>Extraversion<br/>Agreeableness<br/>Neuroticism]

        Context[3. CONTEXT: Home→Work<br/>━━━━━━━━━━<br/>Childcare Stress<br/>Eldercare Burden<br/>Financial Pressure<br/>Relationship Strain<br/>Housing Instability<br/>Commute Impact]

        Routing[4. ROUTING ENGINE<br/>━━━━━━━━━━<br/>Content Matching<br/>Coach Matching<br/>Clinical Escalation<br/>Adaptive Over Time]

        Privacy[5. PRIVACY ENFORCEMENT<br/>━━━━━━━━━━<br/>K-Anonymity k≥10<br/>Database Constraints<br/>Employee Full Access<br/>Employer Aggregated Only]
    end

    Triage --> Profile
    Profile --> Context
    Context --> Routing
    Routing --> Privacy

    style Core fill:#1a1a2e,stroke:#ffff00,stroke-width:3px,color:#fff
    style Triage fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style Profile fill:#764ba2,stroke:#333,stroke-width:2px,color:#fff
    style Context fill:#fa7c91,stroke:#333,stroke-width:2px,color:#fff
    style Routing fill:#4ecdc4,stroke:#333,stroke-width:2px,color:#000
    style Privacy fill:#ffff00,stroke:#333,stroke-width:2px,color:#000
```

---

## 6. Content Routing Logic - OCEAN to Recommendations

```mermaid
graph LR
    subgraph OCEAN["OCEAN Profile"]
        O[Openness<br/>72%ile]
        C[Conscientiousness<br/>45%ile]
        E[Extraversion<br/>38%ile]
        A[Agreeableness<br/>81%ile]
        N[Neuroticism<br/>67%ile]
    end

    subgraph Logic["Routing Logic"]
        HighN[High N + Sleep Issues]
        LowC[Low C + Goal Confusion]
        HighA[High A + Conflict Avoidance]
        LowE[Low E + Social Anxiety]
        HighO[High O + Identity Exploration]
    end

    subgraph Rec["Recommendations"]
        ClearMindsSleep[ClearMinds<br/>Sleep Mastery Programme]
        LimitlessStructure[Limitless<br/>Tom's 13 Framework<br/>Structure & Planning]
        CowchBoundaries[Cowch.app<br/>Boundary Setting<br/>Assertiveness Training]
        ClearMindsConfidence[ClearMinds<br/>Social Confidence<br/>Building]
        BroadbancCoach[Broadbanc<br/>Consciousness Coach<br/>Identity Work]
    end

    N --> HighN
    C --> LowC
    A --> HighA
    E --> LowE
    O --> HighO

    HighN --> ClearMindsSleep
    LowC --> LimitlessStructure
    HighA --> CowchBoundaries
    LowE --> ClearMindsConfidence
    HighO --> BroadbancCoach

    style OCEAN fill:#764ba2,stroke:#333,stroke-width:2px,color:#fff
    style Logic fill:#667eea,stroke:#333,stroke-width:2px,color:#fff
    style Rec fill:#4ecdc4,stroke:#333,stroke-width:2px,color:#000
```

---

## 7. LEGO Pieces Status

```mermaid
graph TB
    subgraph Complete["✓ COMPLETE"]
        C1[Cowch IMAGINE<br/>JSON + Demo]
        C2[OCEAN Questions<br/>196 scenarios]
        C3[Privacy Architecture<br/>Documented]
        C4[ClearMinds<br/>91K users, proven]
        C5[Partnerships<br/>Dr Thomas, Goodbody]
    end

    subgraph InProgress["~ IN PROGRESS"]
        P1[OCEAN Engine<br/>436 uncommitted lines]
        P2[Home→Work Logic<br/>In analysis engine]
        P3[Cowch Integration<br/>Have IMAGINE schema]
    end

    subgraph NotStarted["✗ NOT STARTED"]
        N1[Neuroindicator<br/>Need schema + demo]
        N2[Employer Portal<br/>Dashboard + enrollment]
        N3[Employee Dashboard<br/>Results + content access]
        N4[Backend API<br/>Database + privacy]
        N5[Partner Integrations<br/>APIs + booking systems]
    end

    subgraph Undefined["? UNDEFINED"]
        U1[Tom's 13 Framework<br/>Need documentation]
        U2[Jonathan Kemp<br/>Scope TBD]
        U3[Concierge Health<br/>Formal structure]
    end

    style Complete fill:#4ecdc4,stroke:#333,stroke-width:2px,color:#000
    style InProgress fill:#ffa500,stroke:#333,stroke-width:2px,color:#fff
    style NotStarted fill:#ff6b6b,stroke:#333,stroke-width:2px,color:#fff
    style Undefined fill:#95e1d3,stroke:#333,stroke-width:2px,color:#000
```

---

## 8. Build Timeline Options

```mermaid
gantt
    title Thrive Build Timeline - Three Options
    dateFormat YYYY-MM-DD

    section Option A: Content-First
    Assessment JSONs     :a1, 2025-01-14, 14d
    OCEAN Demo           :a2, after a1, 7d
    Neuroindicator Demo  :a3, after a1, 7d
    Home→Work Demo       :a4, after a1, 3d

    section Option B: Thin Slice End-to-End
    Assessments (minimal)    :b1, 2025-01-14, 14d
    Backend API + DB         :b2, after b1, 14d
    Employee Dashboard       :b3, after b2, 14d
    Employer Portal          :b4, after b2, 14d

    section Option C: B2B-First
    Minimal Assessments  :c1, 2025-01-14, 7d
    Backend (aggregation):c2, after c1, 14d
    Employer Portal      :c3, after c2, 21d

    section Milestones
    Content Complete     :milestone, m1, 2025-02-04, 0d
    Thin Slice Demo      :milestone, m2, 2025-03-25, 0d
    B2B Demo Ready       :milestone, m3, 2025-03-04, 0d
```

---

## How to Use These Diagrams

### In GitHub
Just paste the markdown - Mermaid renders automatically!

### In HTML
Add this script tag and use `<div class="mermaid">` blocks:

```html
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>mermaid.initialize({ startOnLoad: true });</script>

<div class="mermaid">
graph TD
    A[Start] --> B[End]
</div>
```

### In Documentation Tools
- **Notion**: Paste the code blocks
- **Obsidian**: Install Mermaid plugin
- **GitBook**: Native support
- **Confluence**: Install Mermaid macro

### Export as Images
Use https://mermaid.live to:
- Edit diagrams visually
- Export as PNG/SVG
- Share public links

---

## Customization

You can customize colors, styles, and themes. See [Mermaid docs](https://mermaid.js.org/) for full syntax.

**Common customizations:**
```mermaid
%%{init: {'theme':'dark'}}%%
graph TD
    A[Dark Theme] --> B[Looks Cool]
```
