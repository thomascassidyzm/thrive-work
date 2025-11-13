# ClearMinds Compliance Roadmap 2025
## 12-Week Implementation Plan + Long-Term Strategy

**Document Date**: October 31, 2025
**Owner**: Chief Delivery Officer (Tom Cassidy)
**Review Frequency**: Bi-weekly

---

## EXECUTIVE SUMMARY

This roadmap implements the findings from the comprehensive policy review, prioritizing actions by risk level and business impact. Total estimated investment: **£267k-£538k Year 1**.

**Critical Path**: Weeks 1-8 focus on legal/regulatory compliance (Zero-tolerance for gaps). Weeks 9-12 begin operational implementation and Phase 2 in-app development (business-critical for Q3 2025 deadline).

---

## PHASE 0: IMMEDIATE ACTIONS (Week 1-2)
### ⚠️ PRIORITY 0 - Legal/Regulatory Risk

**Goal**: Fix non-compliance and legal enforceability gaps
**Owner**: Tom Cassidy + External Legal Counsel
**Budget**: £20k-£30k

#### Week 1 Actions:

**1. Complete All Policy Placeholders** (3 days)
- [ ] Register with ICO (Data Protection) → Obtain ICO registration number
- [ ] Get Companies House number (if not already registered)
- [ ] Update ALL policies with:
  - [INSERT DATE] → Actual effective dates (recommend January 1, 2025)
  - [INSERT COMPANY NUMBER] → Companies House registration
  - [INSERT ADDRESS] → Registered office address
  - [INSERT EMAIL] → support@clearminds.com, dpo@clearminds.com, security@clearminds.com, abuse@clearminds.com
  - [INSERT ICO NUMBER] → From ICO registration
  - [INSERT REFUND POLICY] → "14-day cooling-off period per Consumer Rights Act 2015"
- **Files to update**: Terms of Service, Acceptable Use Policy, Medical Disclaimer, Results Disclaimer, Privacy Policy, Data Protection Policy
- **Owner**: Tom + Operations team
- **Cost**: Internal time only

**2. Clarify CQC Regulatory Status** (5 days)
- [ ] **Service audit**: Document ALL services ClearMinds provides
  - ✓ Pre-recorded hypnotherapy audio: NOT CQC-regulated
  - ✓ Guided meditation: NOT CQC-regulated
  - ? Live therapy sessions: IF YES → requires CQC registration
  - ? Clinical assessments: IF YES → requires CQC registration
  - ? Treatment planning: IF YES → requires CQC registration
- [ ] **Decision**: Are you providing "regulated activities" under Health and Social Care Act 2008?
- [ ] **If NO (pre-recorded only)**:
  - Update Medical Disclaimer: "ClearMinds provides self-directed digital wellness content and is not CQC-registered. Live clinical services are provided by our partner Smart Start Minds (CQC Provider ID: 1-2950268195)"
  - Update Clinical Supervision Policy: Add disclaimer "ClearMinds follows CQC standards as voluntary best practice but is not subject to CQC regulation"
- [ ] **If YES (any live clinical services)**:
  - Apply for CQC registration immediately
  - Budget: £3k-£5k registration + ongoing compliance costs
- **Owner**: Tom + Clinical Director
- **Cost**: Internal time (or £3k-£5k if CQC registration needed)

**3. Appoint Designated Safeguarding Lead** (7 days)
- [ ] Identify candidate (Clinical Director or qualified founder)
- [ ] Obtain Safeguarding Adults Level 4 training (2-day course + exam)
- [ ] Publish DSL contact details (24/7 emergency contact)
- [ ] Update ALL policies replacing [Name] and [Email] placeholders with actual DSL info
- **Owner**: Tom (to appoint) + HR (to arrange training)
- **Cost**: £800-£1,500 (training) + internal time
- **CRITICAL**: Cannot handle safeguarding concerns without named DSL

**4. Clarify Session Recording Policy** (3 days)
- [ ] Audit current practice: Are video counselling sessions recorded?
  - If YES: Where stored? Who accesses? How long retained? For what purpose (quality assurance, supervision, regulatory)?
  - If NO: Document this clearly
- [ ] Update Privacy Policy Section 2.1 with clear statement
- [ ] If recording: Implement explicit consent mechanism ("I consent to this session being recorded for [purpose]")
- [ ] If recording: Add to Data Retention Schedule
- **Owner**: Tom + Operations + Legal
- **Cost**: Internal time only

#### Week 2 Actions:

**5. External Legal Review (INITIATE)** (Week 2, complete Week 6)
- [ ] Hire UK employment law firm to review:
  - Employer Non-Snooping Agreement
  - B2B community governance framework
  - Master Services Agreement (to be drafted Week 3-4)
- [ ] Hire data protection counsel to review:
  - Privacy Policy
  - Data Processing Agreement (to be drafted Week 3-4)
  - GDPR compliance overall
- [ ] Request legal opinions on:
  - £10k liquidated damages enforceability
  - CQC regulatory status
  - International data transfers
  - ToS limitation of liability caps
- **Owner**: Tom (to hire) → External counsel (to review)
- **Budget**: £15k-£25k
- **Timeline**: 4-6 weeks for complete review + recommendations
- **CRITICAL**: Do NOT launch B2B pilot without legal sign-off

**6. Audit International Data Transfers** (Week 2)
- [ ] List ALL third-party services that process employee/user data:
  - Cloud hosting (AWS, Azure, Google Cloud) - where are servers?
  - Analytics (Google Analytics, Mixpanel, Amplitude) - data location?
  - Payment processing (Stripe, GoCardless) - data location?
  - Email (SendGrid, Mailchimp, Customer.io) - data location?
  - CRM (HubSpot, Salesforce) - data location?
  - Support (Intercom, Zendesk) - data location?
- [ ] For each service outside UK/EEA:
  - Obtain Data Processing Agreement (DPA)
  - Confirm Standard Contractual Clauses (SCCs) or adequacy decision
  - Document in Record of Processing Activities (ROPA)
- [ ] Update Privacy Policy Section 6 with accurate transfer information (remove "UK-based only" if not true)
- **Owner**: Tom + IT + Legal
- **Cost**: Internal time

---

## PHASE 1: SHORT-TERM COMPLIANCE (Week 3-8)
### 🔧 PRIORITY 1 - B2B Contract Framework + Core Compliance

**Goal**: Establish enforceable B2B contracts and close regulatory gaps
**Owner**: Tom Cassidy + External Counsel
**Budget**: £50k-£100k

#### Week 3-4: Draft B2B Contracts

**7. Draft Master Services Agreement (MSA)** (Week 3-4)
- [ ] **Scope**: Comprehensive B2B contract covering:
  - Definitions (Services, Fees, Confidential Information)
  - Scope of Services (refer to Health SLA / Group SLA as Exhibit A)
  - Fees and Payment Terms (PEPM rates, volume discounts, minimum commitments, late payment interest at 8% p.a.)
  - Term and Termination (12-month initial, auto-renewal, 90-day termination for convenience, immediate for material breach)
  - Intellectual Property (ClearMinds owns platform/content, Client owns employee data)
  - Confidentiality / NDA (mutual, 3-year survival post-termination)
  - Data Protection (GDPR compliance, refer to DPA as Exhibit B, 24-hour breach notification)
  - Warranties (authority, compliance with laws, no conflicts)
  - Indemnification:
    - Client indemnifies ClearMinds for employee claims (wrongful termination, discrimination) arising from employer's actions
    - ClearMinds indemnifies Client for IP infringement claims
  - Limitation of Liability:
    - Cap: 12 months fees OR £250k, whichever is LOWER
    - Exclude indirect damages (lost profits, business interruption)
    - No cap for: death/injury, fraud, data breaches (statutory liability)
  - Insurance (Professional Indemnity £2M, Cyber Liability £5M)
  - Force Majeure (pandemics, natural disasters, cyberattacks, infrastructure failures beyond reasonable control)
  - Dispute Resolution (escalation: Account Manager → Director → Mediation → English courts)
  - Governing Law (England and Wales)
  - Entire Agreement clause
- [ ] **Legal review**: External counsel reviews draft (Week 5-6)
- [ ] **Finalize**: Incorporate counsel feedback (Week 7)
- [ ] **Deploy**: Use for ALL new enterprise contracts (Week 8+)
- **Owner**: Tom (to draft outline) → Legal counsel (to review/finalize)
- **Budget**: £8k-£15k (legal fees)
- **CRITICAL**: Without MSA, corporate contracts are unenforceable

**8. Draft Data Processing Agreement (DPA)** (Week 3-4)
- [ ] **Scope**: GDPR Article 28 compliance for employee data processing:
  - Subject Matter: Processing employee wellness data for duration of MSA
  - Nature and Purpose: Hypnotherapy platform access, engagement tracking, anonymized analytics
  - Types of Personal Data: Name, email, employer, usage data, wellbeing survey responses, session history
  - Categories of Data Subjects: Employees of Client company
  - Processor Obligations:
    - Process only on documented instructions (Client = data controller)
    - Staff confidentiality (NDAs for all employees)
    - Security measures (ISO 27001, AES-256 encryption, MFA, role-based access)
    - Assist with DSARs (data subject access requests), right to erasure, data portability
    - Breach notification within 24 hours
    - Delete/return data on termination (unless legal retention obligation)
    - Allow audits (with reasonable notice, limited to business hours, Client pays costs)
  - Sub-Processors:
    - List approved sub-processors in Schedule 1 (AWS, payment processor, analytics)
    - 28-day notice period for new sub-processors
    - Client objection rights
  - International Transfers: If data stored outside UK/EEA, use Standard Contractual Clauses
  - Liability: ClearMinds liable for GDPR breaches from its processing; Client liable for lawfulness of instructions
- [ ] **Schedule 1**: List all sub-processors (AWS, Stripe, analytics tools, etc.)
- [ ] **Legal review**: Data protection counsel reviews (Week 5-6)
- [ ] **Finalize**: Incorporate feedback (Week 7)
- [ ] **Deploy**: Attach as Exhibit B to MSA (Week 8+)
- **Owner**: Tom + Legal counsel
- **Budget**: £5k-£10k (legal fees)
- **CRITICAL**: GDPR violation without DPA (€10M or 2% revenue fine)

#### Week 5-6: AI/Algorithm Compliance

**9. Audit AI/Algorithmic Processing** (Week 5)
- [ ] **System audit**: Identify ALL automated/algorithmic processing:
  - Therapist/content matching: Does algorithm recommend specific hypnotherapy tracks? How?
  - Triage/risk assessment: Do you assess user risk level algorithmically?
  - Personalization: How are content recommendations generated?
  - Analytics: What insights are derived from user data?
  - Employer reporting: How are aggregate metrics calculated?
- [ ] **For each algorithm**: Document:
  - What decisions it makes/influences
  - What training data it uses
  - How accuracy is monitored
  - How users can challenge decisions
  - Whether human oversight exists
- [ ] **Article 22 Assessment**: Does any processing constitute "automated decision-making with legal or significant effects"?
  - If YES: Users have right to human intervention, right to contest, right to explanation
- [ ] **EU AI Act Classification** (prepare for 2025-2026 enforcement):
  - Unacceptable risk (prohibited): Social scoring, subliminal manipulation → ClearMinds unlikely
  - High risk (strict requirements): Medical devices, employment decisions → IF you influence hiring/firing = high risk
  - Limited risk (transparency only): Chatbots, emotion recognition → IF you use AI chatbots = disclose
  - Minimal risk (no requirements): Most content recommendation systems
- **Owner**: Tom + CTO + AI/Data Science team
- **Cost**: Internal time + potential external AI audit (£5k-£15k if needed)

**10. Update Privacy Policy with AI Disclosures** (Week 6)
- [ ] **Add Section**: "Automated Decision-Making and AI" (before Data Subject Rights section)
- [ ] **Content**:
  - "We use algorithms to personalize your experience, including recommending hypnotherapy tracks based on your goals and usage patterns."
  - "The logic behind recommendations: [explain in plain English how algorithm works]"
  - "Significance: Personalized content may be more relevant to your needs, but you can always browse all content manually"
  - "Consequences: Recommendations do not limit your access to other content. You control what you listen to."
  - "Human oversight: Our clinical team reviews algorithm outputs quarterly to ensure appropriateness"
  - "Your rights: You can request human review of any recommendation, opt out of personalization, or request explanation of why specific content was recommended"
  - "Contact: ai-governance@clearminds.com"
- [ ] **Legal review**: Ensure Article 22 GDPR compliance
- [ ] **Deploy**: Publish updated Privacy Policy (Week 7)
- **Owner**: Tom + Legal + Product team
- **Cost**: Internal time

#### Week 7-8: Security & Insurance

**11. Cyber Essentials Plus Preparation** (Week 7-8, certify Q2 2025)
- [ ] **Gap analysis**: Compare current security posture vs Cyber Essentials Plus requirements:
  - Firewalls: Configured correctly?
  - Secure configuration: Remove default passwords, disable unused services
  - User access control: MFA enabled? Role-based access?
  - Malware protection: Antivirus on all devices?
  - Patch management: Regular updates?
- [ ] **Remediate gaps**: Fix any non-compliant areas (Week 8-10)
- [ ] **External assessment**: Schedule IASME-certified body to assess (Q2 2025)
- [ ] **Certification**: Obtain Cyber Essentials Plus badge (Q2 2025)
- **Owner**: Tom + CTO/IT Lead
- **Budget**: £3k-£8k (certification + assessment)
- **CRITICAL**: Many enterprise clients require CE+ minimum

**12. Secure Professional Indemnity & Cyber Liability Insurance** (Week 8)
- [ ] **Professional Indemnity**: £1-2M coverage for:
  - Clinical negligence (even if pre-recorded content, user could claim harm)
  - Data protection breaches (ICO fines)
  - Contractual liability (failure to deliver services per SLA)
- [ ] **Cyber Liability**: £5M coverage for:
  - Data breach costs (forensics, notification, credit monitoring, legal)
  - Business interruption (lost revenue from ransomware/DDoS)
  - Regulatory fines (ICO penalties)
  - Third-party claims (users suing for data breach)
- [ ] **D&O Insurance** (optional but recommended): £1-3M coverage for director/officer liability
- [ ] **Obtain quotes**: 3-5 insurers (compare coverage and premiums)
- [ ] **Purchase**: Select best coverage
- [ ] **Compliance**: Provide certificate of insurance to enterprise clients (in sales process)
- **Owner**: Tom + CFO/Finance
- **Budget**: £15k-£45k/year (PI £10k-£30k, Cyber £5k-£15k)
- **CRITICAL**: Enterprise clients WILL ask for proof of insurance

---

## PHASE 2: OPERATIONAL READINESS (Week 9-12)
### 🚀 PRIORITY 2 - Infrastructure & Team

**Goal**: Build operational capacity for B2B scale
**Owner**: Tom Cassidy + Rachel Goodley (Moderation) + Product/Engineering
**Budget**: £200k-£400k (Year 1)

#### Week 9-10: Governance Infrastructure

**13. Appoint Data Protection Officer (DPO)** (Week 9)
- [ ] **Hire**: Part-time or outsourced DPO (full-time not necessary at startup scale)
  - Option 1: Outsource to DPO-as-a-Service (£15k-£30k/year)
  - Option 2: Hire part-time (2 days/week, £20k-£35k pro-rata)
- [ ] **Requirements**: Must have expert GDPR knowledge, independent reporting line
- [ ] **Responsibilities**: Monitor GDPR compliance, advise on DPIAs, act as ICO contact, handle DSARs
- [ ] **Update policies**: Replace [DPO NAME] and [DPO EMAIL] placeholders with actual contact
- **Owner**: Tom (to hire)
- **Budget**: £15k-£35k/year

**14. Create Record of Processing Activities (ROPA)** (Week 9)
- [ ] **Purpose**: GDPR Article 30 requirement - document ALL processing activities
- [ ] **Template**: Spreadsheet or GDPR software with:
  - Controller/Processor name (ClearMinds)
  - Processing purpose (e.g., "Deliver hypnotherapy platform", "Process payments", "Analyze engagement")
  - Data subjects categories (employees, corporate clients, B2C users)
  - Personal data categories (name, email, health data, usage logs)
  - Recipients (who we share with: AWS, payment processor, analytics)
  - International transfers (if any, with safeguards)
  - Retention periods (8 years clinical, 7 years financial, etc.)
  - Security measures (encryption, MFA, access controls)
- [ ] **Populate**: Document all current processing activities (10-20 entries typical)
- [ ] **Review**: Quarterly updates (as new services/processors added)
- **Owner**: DPO + Tom
- **Cost**: Internal time (or £1k-£2k if using GDPR software)

**15. Obtain Data Processing Agreements from ALL Vendors** (Week 10)
- [ ] **Vendor list**: Every service that processes personal data on ClearMinds's behalf:
  - AWS, Azure, Google Cloud (hosting)
  - Stripe, GoCardless (payments)
  - SendGrid, Mailchimp (email)
  - Intercom, Zendesk (support)
  - Google Analytics, Mixpanel (analytics)
  - HubSpot, Salesforce (CRM)
- [ ] **Request DPAs**: Email each vendor requesting signed Data Processing Agreement
  - Most have standard templates (just request and sign)
  - Ensure they include: sub-processor list, security obligations, breach notification, audit rights
- [ ] **File**: Store all signed DPAs securely (compliance audit evidence)
- [ ] **ROPA update**: Add each processor to Record of Processing Activities
- **Owner**: DPO + Operations
- **Cost**: Internal time (most vendors provide DPAs free)

#### Week 11-12: Phase 2 In-App Development (CRITICAL PATH)

**16. Initiate Phase 2 In-App Community Development** (Week 11)
- [ ] **Project plan**: 9-12 month timeline to Q3 2025 launch
- [ ] **MVP scope**:
  - Anonymous usernames (no real names, technically enforced)
  - Company segmentation (employers cannot access employee communities, architectural separation)
  - Basic moderation tools (admin dashboard, content flagging, member management)
  - Mobile apps (iOS, Android) + web interface
  - End-to-end encryption (messages, posts)
  - Screenshot prevention (technical controls: disable screenshots in app, watermark content)
- [ ] **Team**: Hire or contract:
  - 2-3 full-stack developers (mobile + backend)
  - 1 product manager
  - 1 QA engineer
  - 1 designer (UX/UI for in-app communities)
- [ ] **Budget**: £150k-£300k for MVP (9-12 months)
  - Development: £100k-£200k (team salaries/contracts)
  - Infrastructure: £10k-£20k (servers, testing environments)
  - Security: £10k-£20k (penetration testing, security audit)
  - Design: £10k-£20k (UX/UI work)
  - Project management: £10k-£20k (PM, agile coaching)
  - Contingency: £10k-£20k (20% buffer for scope creep)
- [ ] **Timeline**:
  - Week 11-14: Requirements, design, architecture
  - Week 15-30: Development (backend, mobile, web)
  - Week 31-34: Testing (QA, security, penetration test)
  - Week 35-38: Beta testing with pilot clients
  - Week 39-40: Launch prep (training, docs, migration plan)
  - Week 40: LAUNCH (Q3 2025 target)
- **Owner**: Tom + CTO + Product Manager (to be hired)
- **Budget**: £150k-£300k
- **CRITICAL**: Q3 2025 deadline is NON-NEGOTIABLE. If you miss this, credibility destroyed + stuck with Facebook MEDIUM risk indefinitely.

**17. Hire Dedicated B2B Moderation Lead** (Week 12)
- [ ] **Role**: Oversee B2B community moderation (separate from Rachel's consumer team)
- [ ] **Requirements**:
  - Mental health crisis response experience
  - Employer relations understanding
  - Social engineering detection skills
  - Team management (will grow to 5-7 moderators at scale)
- [ ] **Responsibilities**:
  - Implement Enhanced Moderator Protocols
  - Weekly compliance audits (employer snooping detection)
  - Crisis response (24/7 coverage coordination)
  - Incident reporting to DSL
  - Liaison with corporate clients (without revealing individual employee data)
- [ ] **Salary**: £35k-£45k + benefits
- [ ] **Start date**: Before pilot launch (Month 1-2 of pilot)
- **Owner**: Rachel Goodley (to recruit) + Tom (to approve)
- **Budget**: £35k-£45k/year
- **CRITICAL**: Rachel's consumer team cannot scale to 5+ B2B clients without dedicated lead

---

## PHASE 3: PILOT PREPARATION (Month 3-4)
### 🎯 PRIORITY 3 - B2B Pilot Launch Readiness

**Goal**: Prepare for Towergate pilot (or first enterprise client)
**Owner**: Tom Cassidy (overall) + Rachel Goodley (moderation) + Sales
**Budget**: £20k-£50k

#### Month 3: Automation & Tooling

**18. Build Automated Employer Detection Tools** (Month 3)
- [ ] **Domain email flagging**: Auto-flag join requests with employer domain emails (e.g., @towergate.com)
- [ ] **Roster cross-check**: Upload employer employee roster → system flags matches automatically (don't rely on manual cross-check)
- [ ] **Behavioral analytics**: Flag suspicious patterns:
  - Member who only reads, never posts (lurker = red flag)
  - Cluster of join requests from same region/time
  - Member asking unusually specific questions about workplace
- [ ] **NLP content scanning**: Scan posts for workplace identifiers (company name, project names, manager names)
- [ ] **Admin dashboard**: Moderator tools to review flagged members, resolve incidents, generate reports
- [ ] **Budget**: £20k-£50k development cost (could be less if MVP version, more if sophisticated NLP)
- **Owner**: CTO + B2B Moderation Lead
- **Timeline**: 6-8 weeks development
- **ROI**: Highest-impact investment for risk reduction. Manual detection does NOT scale.

**19. Formalize Crisis Partnerships** (Month 3)
- [ ] **Identify partners**: Samaritans, Shout, Anxiety UK, CALM (already mentioned in pitch deck)
- [ ] **Negotiate MOUs**: Memoranda of Understanding covering:
  - Referral protocols (how to escalate)
  - Warm handoff procedures (do we conference in crisis line? give member number?)
  - Training for moderators (how to recognize crisis, what to say)
  - Reporting requirements (do we notify partner of referrals?)
- [ ] **Integrate into app**: Crisis resources prominently displayed (in-community, in-app)
- [ ] **Train moderators**: 2-day crisis response training from partner organization
- **Owner**: Tom + Clinical Director + Rachel
- **Budget**: £5k-£10k (MOU legal review, training, integration)
- **CRITICAL**: Pitch deck promises these partnerships. Must be formalized before client launch.

#### Month 4: Pilot Launch

**20. Deploy B2B Contract Framework** (Month 4)
- [ ] **MSA + DPA finalized**: Legal-approved, ready to sign
- [ ] **SLAs updated**: Revised uptime commitments (99% not 99.5%), service credit caps (25% annual), force majeure clause
- [ ] **Pilot terms**: Consider offering 6-month pilot at discounted rate (£50/employee/year instead of £60-£80) to reduce client risk
- [ ] **Towergate contract**: Execute MSA, DPA, Health SLA, Group SLA, Employer Non-Snooping Agreement
- [ ] **Kick-off**: Implementation begins (SSO setup, roster upload, employee communications)
- **Owner**: Tom (to execute contract) + Operations (to implement)
- **Cost**: Included in MSA/DPA legal fees already budgeted

**21. Pre-Launch Compliance Checklist** (Month 4)
- [ ] ✅ All policy placeholders completed
- [ ] ✅ CQC regulatory status clarified (policies updated)
- [ ] ✅ Designated Safeguarding Lead appointed and published
- [ ] ✅ Session recording policy clarified
- [ ] ✅ External legal review completed (B2B contracts + GDPR)
- [ ] ✅ AI/algorithm transparency implemented (Privacy Policy updated)
- [ ] ✅ International data transfers audited and documented
- [ ] ✅ MSA and DPA finalized and executed
- [ ] ✅ Insurance secured (PI £1-2M, Cyber £5M)
- [ ] ✅ DPO appointed
- [ ] ✅ ROPA created
- [ ] ✅ Vendor DPAs obtained
- [ ] ✅ Automated employer detection tools deployed
- [ ] ✅ Crisis partnerships formalized
- [ ] ✅ B2B Moderation Lead hired and trained
- [ ] ✅ Phase 2 in-app development initiated (on track for Q3 2025)
- **Owner**: Tom (overall compliance)
- **Gate**: Do NOT launch pilot until ALL items checked

---

## PHASE 4: POST-PILOT OPTIMIZATION (Month 7-12)
### 📊 PRIORITY 4 - Scale Preparation

**Goal**: Learn from pilot, prepare for multi-client scale
**Owner**: Tom Cassidy + Product + Operations
**Budget**: £50k-£100k

#### Month 7-9: Pilot Lessons & Iteration

**22. Pilot Evaluation & Lessons Learned** (Month 7)
- [ ] **Success metrics review**:
  - Engagement rate achieved? (Target: ≥30%, Minimum: ≥20%)
  - Satisfaction score? (Target: ≥80%)
  - Privacy incidents? (Target: Zero unresolved)
  - Employer snooping attempts detected? (How many? How caught? How resolved?)
  - Crisis posts? (How handled? Response time? Outcomes?)
- [ ] **Operational learnings**:
  - Moderation workload: Was weekly audit sustainable?
  - Employer roster accuracy: Did employer keep it updated?
  - False positives: Did we wrongly flag legitimate members?
  - Technology gaps: What automation would have helped?
- [ ] **Policy updates**: Based on pilot experience, refine policies (e.g., if Facebook screenshot happened despite prohibition, how to respond?)
- [ ] **Client feedback**: What did Towergate like/dislike? What would they change?
- [ ] **Decision gate**: Proceed to scale? Pause until Phase 2? Adjust pricing/model?
- **Owner**: Tom + Rachel + Product
- **Cost**: Internal time

**23. Revise Policies for Digital Context** (Month 8-9)
- [ ] **Clinical policies rewrite** (based on agent recommendations):
  - Consent & Capacity Policy → "Digital Signup & Data Processing Policy" (remove Mental Capacity Act assessments, focus on ToS/Privacy consent)
  - Duty of Candour Policy → "Incident Management & Service Recovery Policy" (remove CQC Reg 20 requirements, focus on transparency when things go wrong)
  - Infection Control Policy → Delete or simplify to basic Workplace Health & Safety
  - Safeguarding Adults Policy → Retain with digital adaptations (in-app reporting, crisis signposting, automated keyword detection)
  - Dignity & Respect Policy → Retain as UX/Content Standards (excellent as-is, just rebrand as digital accessibility/inclusivity framework)
- [ ] **External legal review**: Re-review revised policies (£5k-£10k)
- [ ] **Deploy**: Publish updated policies (Month 10)
- **Owner**: Tom + Clinical Director + Legal counsel
- **Budget**: £5k-£10k (legal review)
- **Benefit**: Reduces compliance burden (policies match actual service model)

#### Month 10-12: Scale Infrastructure

**24. Moderation Team Expansion** (Month 10-12)
- [ ] **Hiring plan**: If scaling beyond 2-3 clients, hire:
  - 2-3 additional B2B moderators (£30k-£40k each)
  - 1 moderation team lead (if Rachel transitions to oversight role)
- [ ] **Training**: 2-4 week onboarding per new moderator (safeguarding, employer detection, crisis response, ClearMinds policies)
- [ ] **Shift coverage**: Ensure 24/7 coverage across time zones (UK, US, Australia)
- **Owner**: Rachel + B2B Moderation Lead
- **Budget**: £60k-£120k (2-3 moderators)
- **Trigger**: When signing 4th-5th enterprise client (proactive hiring, not reactive)

**25. ISO 27001 Certification (INITIATE)** (Month 12, certify 2026)
- [ ] **Gap analysis**: Compare current Info Sec Policy vs ISO 27001 requirements (133 controls)
- [ ] **Remediation**: Implement missing controls (policies, procedures, technical measures)
- [ ] **External audit**: Stage 1 (documentation review) + Stage 2 (on-site assessment)
- [ ] **Certification**: Obtain ISO 27001:2022 certificate
- [ ] **Budget**: £30k-£60k (consultancy, audit fees, remediation costs)
- [ ] **Timeline**: 12-18 months from start to certification
  - Month 12: Gap analysis + remediation planning
  - Months 13-18: Implement controls
  - Months 19-21: Pre-audit + corrections
  - Months 22-24: External audit + certification
- **Owner**: CTO + Info Sec Lead (to be hired or outsourced)
- **CRITICAL**: Many enterprise clients require ISO 27001 (especially financial services, healthcare, government)

---

## PHASE 5: LONG-TERM STRATEGY (Year 2+)
### 🚀 PRIORITY 5 - Enterprise Maturity

**Goal**: Achieve enterprise-grade compliance and scale to 10+ clients
**Owner**: Tom Cassidy + Executive Team
**Budget**: £100k-£300k/year (ongoing)

#### Year 2 Priorities:

**26. SOC 2 Type II Certification** (if targeting US market)
- **Purpose**: US enterprise clients often require SOC 2 (similar to ISO 27001 but US-focused)
- **Scope**: Security, Availability, Processing Integrity, Confidentiality, Privacy (choose relevant Trust Services Criteria)
- **Process**: 6-12 months (3-6 months implementation + 6-month audit period)
- **Budget**: £50k-£100k (first year: readiness + audit; ongoing: annual audits £30k-£50k)
- **ROI**: Opens US market (enterprise SaaS buyers expect SOC 2)

**27. Phase 2 In-App Communities Launch & Migration** (Q3 2025)
- **Launch**: In-app communities go live (Q3 2025 target)
- **Parallel run**: Keep Facebook communities open for 3-6 months (users can choose)
- **Migration incentives**: In-app has better features (screenshot prevention, stronger anonymity, company segmentation)
- **Communication**: "We're moving to better platform, Facebook closing [date]"
- **Sunset Facebook**: Close all Facebook communities (Q4 2025 or Q1 2026)
- **Risk reduction**: Residual risk drops from MEDIUM → LOW (per Risk Assessment)

**28. Governance Maturity Evolution**
- **Quarterly risk assessment reviews** (not just monthly operational checks)
- **Annual external audits** (data protection, security, moderation effectiveness)
- **Board-level reporting** (Tom presents quarterly on B2B program health, risks, incidents, growth)
- **Continuous improvement culture** (incident retrospectives, client feedback loops, policy iterations)

**29. International Expansion Compliance** (if scaling to EU/US/AU)
- **EU GDPR** (already covered if UK GDPR compliant, but monitor post-Brexit divergence)
- **US State Privacy Laws** (CCPA/CPRA in California, VCDPA in Virginia, etc. - if selling to US employers)
- **Australia Privacy Act 1988** (if selling to Australian employers)
- **Each jurisdiction**: Requires legal review, policy updates, data localization considerations

**30. Advanced Privacy-Enhancing Technologies**
- **Differential privacy**: Add noise to analytics (better than just k≥10 anonymization)
- **Federated learning**: Train AI models without centralizing employee data
- **Privacy-preserving record linkage**: Combine datasets without exposing individual records
- **Why**: Demonstrates privacy leadership, future-proofs against stricter regulations, competitive differentiation

---

## BUDGET SUMMARY (YEAR 1)

### Phase 0-1: Immediate & Short-Term (Months 1-2)
| Item | Cost | Priority |
|------|------|----------|
| ICO registration | £40-£120 | P0 |
| CQC registration (if needed) | £3k-£5k | P0 |
| DSL training | £800-£1,500 | P0 |
| External legal review (MSA, DPA, B2B framework) | £15k-£25k | P0 |
| Complete placeholders, audits | Internal time | P0 |
| **Subtotal Phase 0-1** | **£19k-£32k** | - |

### Phase 1: Short-Term (Months 2-3)
| Item | Cost | Priority |
|------|------|----------|
| Professional Indemnity Insurance (£1-2M) | £10k-£30k/year | P1 |
| Cyber Liability Insurance (£5M) | £5k-£15k/year | P1 |
| Cyber Essentials Plus | £3k-£8k | P1 |
| **Subtotal Phase 1** | **£18k-£53k** | - |

### Phase 2: Operational (Months 3-4)
| Item | Cost | Priority |
|------|------|----------|
| DPO appointment (part-time Year 1) | £15k-£30k/year | P1 |
| ROPA / GDPR software | £1k-£2k | P2 |
| Vendor DPAs | Internal time | P1 |
| Automated employer detection tools | £20k-£50k | P1 |
| Crisis partnerships (MOUs, training) | £5k-£10k | P1 |
| B2B Moderation Lead | £35k-£45k/year | P1 |
| **Subtotal Phase 2** | **£76k-£137k** | - |

### Phase 3: Pilot (Months 3-6)
| Item | Cost | Priority |
|------|------|----------|
| Penetration testing | £5k-£15k | P2 |
| Policy rewrite (digital context) | £5k-£10k | P2 |
| **Subtotal Phase 3** | **£10k-£25k** | - |

### Phase 4: Scale Prep (Months 6-12)
| Item | Cost | Priority |
|------|------|----------|
| Phase 2 in-app development (MVP) | £150k-£300k | P0 |
| Additional moderators (2-3 FTE) | £60k-£120k | P2 |
| ISO 27001 initiation (gap analysis, planning) | £10k-£20k | P2 |
| **Subtotal Phase 4** | **£220k-£440k** | - |

### TOTAL YEAR 1 BUDGET
| Phase | Range |
|-------|-------|
| Immediate (P0) | £19k-£32k |
| Short-term (P1) | £18k-£53k |
| Operational (P1-P2) | £76k-£137k |
| Pilot (P2) | £10k-£25k |
| Scale (P0/P2) | £220k-£440k |
| **GRAND TOTAL** | **£343k-£687k** |

**Note**: Original estimate was £267k-£538k. Updated estimate includes additional moderators (£60k-£120k) for scale readiness. Core P0/P1 items: £113k-£222k.

---

## SUCCESS METRICS & CHECKPOINTS

### Week 4 Checkpoint:
- ✅ All policy placeholders completed
- ✅ CQC regulatory status clarified
- ✅ DSL appointed
- ✅ Session recording policy clarified
- ✅ External legal review initiated

### Week 8 Checkpoint:
- ✅ MSA and DPA drafted and under legal review
- ✅ AI/algorithm audit completed
- ✅ Privacy Policy updated with Article 22 disclosures
- ✅ Insurance secured (PI + Cyber)
- ✅ Cyber Essentials Plus prep underway

### Month 3 Checkpoint:
- ✅ MSA and DPA finalized (legal-approved)
- ✅ DPO appointed
- ✅ ROPA created
- ✅ Vendor DPAs obtained
- ✅ Automated employer detection tools in development

### Month 4 Checkpoint (PILOT LAUNCH):
- ✅ All pre-launch compliance items checked
- ✅ Towergate contract executed (or first enterprise client)
- ✅ B2B Moderation Lead hired
- ✅ Crisis partnerships formalized
- ✅ Phase 2 development initiated

### Month 7 Checkpoint (POST-PILOT):
- ✅ Pilot evaluated (engagement, satisfaction, privacy, incidents)
- ✅ Lessons learned documented
- ✅ Decision: Proceed to scale? Adjustments needed?

### Month 12 Checkpoint (END YEAR 1):
- ✅ Cyber Essentials Plus certified
- ✅ Phase 2 in-app in beta testing (launch Q3 2025)
- ✅ ISO 27001 gap analysis completed
- ✅ 2-5 enterprise clients live
- ✅ Zero catastrophic privacy breaches

---

## RISK MITIGATION PLAN

### Critical Risks & Mitigations:

**Risk 1: Phase 2 In-App Development Delayed**
- **Impact**: Miss Q3 2025 deadline → credibility loss, stuck on Facebook indefinitely
- **Likelihood**: 40-50% (software always slips)
- **Mitigation**:
  - Start development NOW (Week 11, don't wait for pilot results)
  - Hire experienced mobile dev team (not first-time founders building MVP)
  - Weekly sprint reviews with Tom/Board
  - MVP scope: Cut nice-to-haves if slipping (e.g., advanced analytics can come in v2)
  - Contingency: If slipping badly by Month 8, consider off-the-shelf community platform (Discourse, Mighty Networks) with custom modifications

**Risk 2: External Legal Review Identifies Deal-Breakers**
- **Impact**: Must rewrite policies/contracts → delay pilot launch
- **Likelihood**: 20-30% (some revisions expected, but not starting from scratch)
- **Mitigation**:
  - Choose experienced legal counsel (tech/health specialization, not generalist)
  - Front-load legal review (Week 2-6, not Week 8)
  - Budget buffer for revisions (included in £15k-£25k estimate)

**Risk 3: Insurance Costs Higher Than Expected**
- **Impact**: Budget overrun (£15k-£45k estimated, could be £50k-£80k if high-risk)
- **Likelihood**: 30-40% (mental health + B2B data = higher premiums)
- **Mitigation**:
  - Get quotes from 3-5 insurers (shop around)
  - Consider higher deductibles to lower premiums
  - Demonstrate risk controls (policies, Cyber Essentials Plus, moderation protocols) to get better rates
  - Phase in coverage (start with £1M PI, increase to £2M when revenue scales)

**Risk 4: Can't Recruit B2B Moderation Lead**
- **Impact**: Rachel's team overwhelmed → quality drops → crisis missed or employer infiltration
- **Likelihood**: 20-30% (specialized skills, competitive market)
- **Mitigation**:
  - Start recruiting early (Month 1-2, not Month 4)
  - Offer competitive package (£35k-£45k + equity + flexible work)
  - Consider promoting internal candidate (if Rachel's team has strong performer)
  - Fallback: Outsource to specialized B2B moderation agency (£50k-£80k but faster to deploy)

**Risk 5: Towergate Pilot Engagement Below 20%**
- **Impact**: ROI doesn't justify cost → Towergate doesn't scale → revenue doesn't support investment
- **Likelihood**: 25-35% (engagement is hard to predict)
- **Mitigation**:
  - Pre-pilot employee comms (Towergate champions, internal marketing)
  - Onboarding optimization (make first-time experience seamless)
  - Incentives (raffle for active members, recognition)
  - Regular check-ins with Towergate HR (pulse surveys, focus groups)
  - Pivot strategy: If <20%, offer extended pilot at reduced rate to gather more data before deciding

---

## GOVERNANCE & ACCOUNTABILITY

### Weekly Cadence:
- **Tom**: Review compliance progress (30 min weekly standup)
- **DPO**: Monitor GDPR compliance (weekly check-in)
- **Rachel/B2B Moderation Lead**: Review moderation incidents (weekly team meeting)

### Bi-Weekly Cadence:
- **Compliance Steering Committee**: Tom + DPO + Legal + Clinical Director (1-hour review of roadmap progress, blockers, risks)

### Monthly Cadence:
- **Board Update**: Tom presents compliance status, budget burn, risks to board (30-min update in board meeting)

### Quarterly Cadence:
- **Risk Assessment Review**: Update Risk Assessment (8 risks) with new data, adjust mitigations
- **Policy Review**: Review all policies for updates (legislation changes, ICO guidance, lessons learned)
- **Vendor Review**: Re-assess all data processors (DPAs current? Security incidents? Performance?)

### Annual Cadence:
- **External Audit**: Independent audit of data protection, security, moderation practices
- **Insurance Renewal**: Review coverage, claims experience, adjust limits
- **Certifications**: Renew Cyber Essentials Plus, progress ISO 27001, consider SOC 2

---

## CONCLUSION

This roadmap is **achievable but requires discipline and investment**. The critical path is:

1. **Weeks 1-8**: Fix legal/regulatory gaps (£113k-£222k)
2. **Months 3-4**: Launch pilot with operational readiness (£76k-£137k)
3. **Months 4-12**: Build Phase 2 in-app while piloting (£220k-£440k)

**Total Year 1**: £343k-£687k

**ROI Justification**:
- One enterprise contract (£100k-£500k ARR) pays for 15-73% of compliance investment
- Avoiding one ICO fine (£10M or 2% revenue) makes this essential, not optional
- Security certifications (CE+, ISO 27001) open enterprise market worth £XXM

**What Success Looks Like (End Year 1)**:
- 3-5 enterprise clients live (£300k-£2M ARR)
- Zero catastrophic privacy breaches
- Phase 2 in-app launched (Q3 2025)
- Cyber Essentials Plus certified
- ISO 27001 in progress (certify Year 2)
- Industry-leading B2B governance framework validated in market

**The risk of NOT doing this**:
- ICO fine (£10M or 2% revenue)
- Enterprise clients walk away (no MSA/DPA/insurance)
- Catastrophic privacy breach ends business
- Stuck on Facebook indefinitely (credibility loss)

**Recommendation**: Treat this as **mandatory investment, not optional expense**. The B2B opportunity is worth it, but only if you do compliance properly.

---

**Document Owner**: Tom Cassidy, Chief Delivery Officer
**Review Date**: Bi-weekly (every 2 weeks)
**Next Update**: Week 4 Checkpoint (review progress, adjust timeline/budget if needed)
**Questions**: tom@clearminds.com

**LET'S BUILD SOMETHING GREAT. 🚀**
