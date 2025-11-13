# CLEARMINDS B2B COMMUNITY RISK ASSESSMENT
## Privacy & Safety Risk Analysis for Employer-Sponsored Peer Support Communities

**Document Type:** Risk Register & Governance Documentation
**Prepared For:** Legal Review, Board, External Auditors, Enterprise Clients
**Prepared By:** Tom Cassidy, Chief Digital Officer
**Date:** October 2025
**Version:** 1.0
**Review Frequency:** Quarterly

---

## Executive Summary

This document identifies, assesses, and documents mitigation strategies for privacy and safety risks associated with ClearMinds' employer-sponsored (B2B/EAP) peer support communities.

**Key Findings:**
- **8 primary risks identified** (3 High, 3 Medium, 2 Low severity)
- **All high-severity risks have documented mitigation strategies**
- **Residual risk** after mitigation: **Medium** (acceptable with ongoing monitoring)
- **Phase 2 (In-App Communities, Q3 2025)** will reduce residual risk to **Low**

**Recommendation:** Proceed with Phase 1 (enhanced Facebook communities) with documented controls and commit to Phase 2 development timeline for stronger technical protections.

---

## Risk Assessment Framework

### Severity Scoring:

**Likelihood:**
- **High (3)**: Very likely to occur without mitigation (>50% probability)
- **Medium (2)**: Possible but not certain (10-50% probability)
- **Low (1)**: Unlikely without specific circumstances (<10% probability)

**Impact:**
- **Critical (5)**: Catastrophic harm (employee safety, business-ending liability, major regulatory action)
- **High (4)**: Severe harm (employee job loss, significant legal liability, contract termination)
- **Medium (3)**: Moderate harm (privacy violation, reputational damage, client complaints)
- **Low (2)**: Minor harm (user dissatisfaction, minor policy violation)
- **Minimal (1)**: Negligible harm (temporary inconvenience)

**Risk Score = Likelihood × Impact**

**Risk Levels:**
- **Critical (12-15)**: Immediate action required, may be business-blocking
- **High (8-11)**: Requires robust mitigation before proceeding
- **Medium (4-7)**: Monitor and mitigate with standard controls
- **Low (1-3)**: Accept with minimal controls

---

## RISK 1: EMPLOYER IDENTIFICATION OF EMPLOYEES

### Risk Description:
Employer representative (manager, HR, executive) joins Facebook community and identifies employees by name, profile photo, or post content, violating employee confidentiality.

### Scenario Examples:
- Manager uses personal email to join group, recognizes employee by writing style or specific project details mentioned
- HR staff screenshots member list, cross-references with employee roster
- Executive demands ClearMinds provide list of participating employees

### Assessment:

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (without mitigation)** | High (3) | Facebook communities are accessible, employers motivated to monitor |
| **Impact** | High (4) | Employee job loss, discrimination, chilling effect on participation |
| **Inherent Risk Score** | **12 (CRITICAL)** | |

### Mitigation Strategies:

#### Contractual Mitigations:
1. **Employer Non-Snooping Agreement** (mandatory contract clause)
   - Prohibits employer participation, monitoring, and data requests
   - Breach = contract termination + £10,000 per affected employee liquidated damages
   - 48-hour notification requirement for accidental exposure
   - Non-retaliation covenant with legal consequences

2. **Employee Legal Rights Protection**
   - Explicit reference to Equality Act 2010, UK GDPR, employment tribunal remedies
   - Employers acknowledge violation creates evidence of discriminatory practices

#### Technical Mitigations:
3. **Enhanced Moderation Approval Process**
   - Cross-reference join request email/name against employer roster (if provided)
   - Flag employer domain emails (e.g., @companyx.com) for immediate denial
   - Weekly audit of member list against updated employer roster

4. **Mandatory Anonymity Requirements**
   - Pseudonyms required (not real names)
   - Anonymous profile photos required (no faces)
   - Identifying information prohibited in posts
   - Non-compliance = removal from group

5. **Facebook Group Privacy Settings**
   - Private group (only members see posts)
   - Hidden member list (only admins see full list)
   - Content not searchable on Facebook or Google

#### Operational Mitigations:
6. **24/7 Professional Moderation**
   - Dedicated moderators monitor join requests and posts
   - Immediate removal of identifying information or suspected employers
   - Employer Snooping Incident Log maintained with escalation protocol

7. **Employee Education**
   - Pre-join warning modal explaining anonymity requirements
   - Pinned group post with privacy rules
   - Employee Privacy Notice explaining protections

### Residual Risk (After Mitigation):

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (with mitigation)** | Low (1) | Contract disincentive + technical blocks + vigilant moderation |
| **Impact (if occurs)** | High (4) | Still serious if happens, but legal protections limit employer's ability to act |
| **Residual Risk Score** | **4 (MEDIUM)** | Acceptable with ongoing monitoring |

### Monitoring & Review:
- **Daily**: Moderator review of join requests and posts
- **Weekly**: Compliance audit of member anonymity
- **Monthly**: Review of Employer Snooping Incident Log
- **Quarterly**: Risk assessment update, effectiveness review

### Phase 2 Enhancement (In-App Communities, Q3 2025):
- **Company segmentation**: Technical impossibility for employers to access employee communities
- **Reduces residual risk to**: **Low (1×4 = 4)**

---

## RISK 2: MALICIOUS ACTOR / EXTORTION

### Risk Description:
Bad actor (member or outsider) screenshots vulnerable posts (mental health struggles, crisis situations) and threatens to share with employer, family, or publicly to extort money or cause harm.

### Scenario Examples:
- Member screenshots another's crisis post and threatens "pay me £500 or I send this to your boss"
- Malicious member gathers screenshots over time, then mass-posts to employer's social media
- Hacker gains access to Facebook account, downloads posts, demands ransom

### Assessment:

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (without mitigation)** | Medium (2) | Requires malicious intent + effort, but possible |
| **Impact** | Critical (5) | Catastrophic harm (suicide risk, job loss, family trauma, PTSD) |
| **Inherent Risk Score** | **10 (HIGH)** | |

### Mitigation Strategies:

#### Preventative Mitigations:
1. **Prohibition on Screenshots (Terms of Service)**
   - Explicit rule: "NO SCREENSHOTS - Never screenshot or share posts outside this group"
   - Violation = immediate permanent ban + legal action
   - Warning in pinned post and pre-join modal

2. **Confidentiality Culture**
   - "What's shared here stays here" ethos reinforced repeatedly
   - Member education on why confidentiality matters
   - Positive reinforcement of supportive behavior

3. **Limited Identifying Information**
   - Anonymity requirements reduce ability to link screenshots to real identity
   - Pseudonyms + anonymous photos make extortion less effective
   - Moderators remove identifying information proactively

4. **Member Vetting**
   - Join request screening
   - Monitor for suspicious behavior (info-gathering, not support-seeking)
   - Remove members who violate trust

#### Detective Mitigations:
5. **Member Reporting Mechanism**
   - Easy "Report to Admin" Facebook feature
   - Email: privacy@clearminds.com
   - Anonymous reporting option

6. **Moderator Vigilance**
   - Monitor for members asking unusually specific questions or gathering info
   - Watch for members who only ask questions and never share/support
   - Track member engagement patterns

#### Responsive Mitigations:
7. **Incident Response Protocol**
   - Immediate removal of malicious actor
   - Private message to affected members with support resources
   - Documentation of incident for legal action if needed
   - Report to Facebook (account termination)
   - Report to police (if criminal extortion)

8. **Legal Recourse**
   - Extortion is criminal (Theft Act 1968, Blackmail)
   - Harassment is actionable (Protection from Harassment Act 1997)
   - Data protection violation (UK GDPR)
   - Terms of Service breach enables civil action

9. **Victim Support**
   - Immediate crisis support for affected employee
   - Legal advice referrals
   - Assistance reporting to police
   - Mental health support escalation

### Residual Risk (After Mitigation):

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (with mitigation)** | Low (1) | Prohibition + vigilance + legal consequences deter most actors |
| **Impact (if occurs)** | Critical (5) | Still catastrophic if happens |
| **Residual Risk Score** | **5 (MEDIUM)** | Acceptable; cannot eliminate entirely on Facebook |

### Monitoring & Review:
- **Ongoing**: Moderator vigilance for suspicious behavior
- **Immediate**: Response to any reports of screenshot/extortion attempts
- **Monthly**: Review incident reports (if any)
- **Quarterly**: Risk assessment update

### Phase 2 Enhancement (In-App Communities, Q3 2025):
- **Screenshot prevention technology**: Technical controls to detect/prevent screenshots (not foolproof but adds friction)
- **Watermarking**: Invisible digital watermarks link screenshots to source account
- **Reduces residual risk to**: **Medium (1×4 = 4)** (cannot fully prevent, but stronger deterrence)

---

## RISK 3: DATA SCRAPING / PRIVACY INVASION

### Risk Description:
Automated bots or data brokers scrape Facebook group content for personal data, mental health information, or behavioral profiles.

### Scenario Examples:
- Data broker bot joins group, scrapes all posts, sells mental health profiles to insurers or employers
- Researcher harvests data for academic study without consent
- Marketing company builds profiles for targeted advertising

### Assessment:

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (without mitigation)** | Medium (2) | Facebook groups are targets for data harvesting |
| **Impact** | Medium (3) | Privacy violation, potential discrimination, loss of trust |
| **Inherent Risk Score** | **6 (MEDIUM)** | |

### Mitigation Strategies:

#### Technical Mitigations:
1. **Private Group Settings**
   - Group content not visible to non-members
   - Not searchable on Facebook or search engines
   - Posts not indexed by Google/Bing

2. **Manual Approval of Join Requests**
   - Moderators review every request (no auto-approval)
   - Check for bot indicators (brand new account, generic name, no profile info)
   - Deny suspicious requests

3. **Behavioral Monitoring**
   - Watch for accounts that join but never post/comment (passive harvesting)
   - Monitor for rapid-fire post viewing (bot-like behavior)
   - Remove inactive suspicious accounts

#### Legal Mitigations:
4. **Terms of Service Prohibition**
   - "You must not... scrape, harvest, or collect data from this community"
   - Violation = immediate ban + legal action

5. **UK GDPR Compliance**
   - Data scraping without consent violates UK GDPR Article 6 (lawful basis)
   - Potential ICO complaint against scrapers
   - ClearMinds has legitimate interest in protecting member data

#### Operational Mitigations:
6. **Regular Member Audits**
   - Monthly review of member list
   - Remove accounts with no engagement (possible bots)
   - Flag accounts created same day as join request

7. **Anonymity Protection**
   - Pseudonyms + anonymous photos limit value of scraped data
   - No email addresses or contact information in posts
   - Scraped data lacks identifying anchors

### Residual Risk (After Mitigation):

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (with mitigation)** | Low (1) | Private group + manual approval + vigilance |
| **Impact (if occurs)** | Medium (3) | Privacy violation but limited harm due to anonymity |
| **Residual Risk Score** | **3 (LOW)** | Acceptable |

### Monitoring & Review:
- **Monthly**: Member list audit for suspicious accounts
- **Quarterly**: Review Facebook's group privacy settings (in case platform changes)

### Phase 2 Enhancement (In-App Communities, Q3 2025):
- **Full data ownership**: No third-party platform access (Facebook has inherent access)
- **Reduces residual risk to**: **Low (1×2 = 2)** (proprietary platform more controllable)

---

## RISK 4: ACCIDENTAL DISCLOSURE BY EMPLOYEE

### Risk Description:
Employee accidentally reveals their own participation or mental health status to employer through careless posting, recognizable writing style, or oversharing identifying details.

### Scenario Examples:
- Employee posts "I'm stressed about the Q4 presentation I'm giving next week on the new product launch" - specific enough that manager recognizes them
- Employee uses same writing style/phrases in community as in work emails
- Employee posts photo that includes workplace-identifiable items in background

### Assessment:

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (without mitigation)** | Medium (2) | Users may not realize how identifiable details are |
| **Impact** | High (4) | Employee's own disclosure limits legal recourse, but still harmful |
| **Inherent Risk Score** | **8 (HIGH)** | |

### Mitigation Strategies:

#### Preventative Mitigations:
1. **Pre-Join Education**
   - Warning modal explains anonymity requirements
   - Examples of what NOT to share
   - "Share wisely - only what you'd be comfortable being public"

2. **Pinned Group Rules**
   - Clear examples of prohibited identifying information
   - Guidance on generic vs specific language

3. **Employee Privacy Notice**
   - Section on "How to Protect Yourself"
   - Recommendations on safe sharing

#### Detective Mitigations:
4. **Moderator Proactive Monitoring**
   - Scan posts for overly specific workplace details
   - Remove identifying information before it spreads
   - Private message member with guidance

#### Responsive Mitigations:
5. **Employer Non-Retaliation Clause**
   - Even if employer accidentally learns of participation, they CANNOT retaliate
   - 48-hour notification requirement
   - Legal consequences for adverse action

6. **Post Deletion Support**
   - Members can edit/delete own posts
   - Can request moderator to delete posts
   - Fast response to "please remove my post" requests

7. **Member Education on Post Review**
   - Encourage members to review before posting: "Would this identify me to my manager?"
   - Template in pinned post

### Residual Risk (After Mitigation):

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (with mitigation)** | Low (1) | Education + moderation + deletion support |
| **Impact (if occurs)** | Medium (3) | Non-retaliation clause limits harm; employer can't legally act |
| **Residual Risk Score** | **3 (LOW)** | Acceptable |

### Monitoring & Review:
- **Ongoing**: Moderator review of posts for identifying information
- **Monthly**: Sample post review for effectiveness of education
- **Quarterly**: Update education materials based on common mistakes

### Phase 2 Enhancement (In-App Communities, Q3 2025):
- **Writing style obfuscation**: Optional AI tool to rephrase posts for anonymity
- **Reduces residual risk to**: **Low (1×2 = 2)**

---

## RISK 5: CRISIS RESPONSE INADEQUACY

### Risk Description:
Member in acute mental health crisis (suicidal ideation, severe distress) posts in community but does not receive adequate or timely support, resulting in harm.

### Scenario Examples:
- Member posts "I can't take it anymore, goodbye" at 3am when moderator is asleep
- Member in crisis receives peer advice instead of professional intervention
- Moderator misses crisis post due to high volume of content

### Assessment:

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (without mitigation)** | Medium (2) | Mental health communities will inevitably have crisis posts |
| **Impact** | Critical (5) | Death or serious harm |
| **Inherent Risk Score** | **10 (HIGH)** | |

### Mitigation Strategies:

#### Preventative Mitigations:
1. **Crisis Disclaimer (Prominently Displayed)**
   - Pinned post: "This community is NOT a crisis service. For emergencies, call 999 or Samaritans 116 123."
   - Pre-join modal includes crisis resources
   - Group description includes crisis numbers

2. **Education on Crisis Resources**
   - Every member sees crisis resources before joining
   - Crisis numbers pinned and easily accessible
   - Regular reminder posts (weekly)

#### Detective Mitigations:
3. **24/7 Moderation Coverage**
   - International team (UK, US, Australia) provides around-the-clock coverage
   - Shift handoff protocol ensures no gaps
   - Moderators check group multiple times per shift

4. **Crisis Keyword Monitoring**
   - Moderators trained to watch for crisis language ("can't go on," "ending it," "goodbye")
   - Priority flagging of crisis posts

5. **Member Peer Support**
   - Members educated to tag moderators if they see crisis posts
   - Encouraged to respond with crisis resources while waiting for moderator

#### Responsive Mitigations:
6. **Crisis Response Protocol**
   - Moderator private messages member immediately with crisis resources
   - Public comment with Samaritans 116 123, Crisis Text Line, 999
   - Escalation to emergency services if immediate risk and location known

7. **Partnership with Crisis Services**
   - Established relationship with Samaritans, CALM, Crisis Text Line
   - Warm handoff capability (if member consents)
   - Documentation of crisis response for quality assurance

8. **Post-Crisis Follow-Up**
   - Moderator checks in with member (if still in group)
   - Connects to ClearMinds AI coaching or specialist referrals
   - Offers ongoing support

### Residual Risk (After Mitigation):

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (with mitigation)** | Low (1) | 24/7 coverage + rapid response + clear crisis resources |
| **Impact (if occurs)** | Critical (5) | Still life-threatening if response fails |
| **Residual Risk Score** | **5 (MEDIUM)** | Acceptable; cannot eliminate entirely |

### Monitoring & Review:
- **Daily**: Shift handoff notes any crisis situations
- **Weekly**: Review crisis response times and outcomes
- **Monthly**: Crisis protocol training refresh
- **Quarterly**: Partnership review with crisis services

### Liability Note:
ClearMinds Community Terms of Service include clear disclaimer: "This is peer support, not professional treatment. For crises, call 999 or Samaritans 116 123." This limits (but does not eliminate) legal liability.

---

## RISK 6: REGULATORY NON-COMPLIANCE

### Risk Description:
ClearMinds fails to comply with UK GDPR, Data Protection Act 2018, or other regulatory requirements, resulting in ICO investigation, fines, or enforcement action.

### Assessment:

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (without mitigation)** | Medium (2) | Data protection compliance is complex |
| **Impact** | High (4) | ICO fines (up to 4% revenue), reputational damage, contract losses |
| **Inherent Risk Score** | **8 (HIGH)** | |

### Mitigation Strategies:

1. **UK GDPR Compliance Framework**
   - Privacy notice published and accessible
   - Lawful basis: Legitimate interest (mental health support) + Consent (for data sharing with partners)
   - Data minimization: Collect only necessary data (name, email, assessment responses)
   - Purpose limitation: Data used only for mental health support, not marketing without consent

2. **Data Subject Rights Processes**
   - Subject Access Request (SAR) process documented
   - Right to erasure ("right to be forgotten") honored within 30 days
   - Right to rectification, restriction, portability supported
   - Contact: privacy@clearminds.com

3. **Data Protection Impact Assessment (DPIA)**
   - DPIA completed for B2B community program (this document serves as foundation)
   - High-risk processing identified and mitigated
   - Reviewed quarterly

4. **Data Security Measures**
   - Encryption in transit (HTTPS) and at rest
   - Access controls (role-based permissions)
   - Audit logs of data access
   - Annual penetration testing
   - Cyber Essentials Plus certification (in progress)

5. **ICO Registration**
   - Data controller registration with ICO (when Gibraltar company completes UK registration)
   - Annual registration fee paid
   - Registration number displayed on website

6. **Breach Notification Procedures**
   - If breach affects employee data: Notify ICO within 72 hours (if risk to rights/freedoms)
   - Notify affected individuals without undue delay
   - Document breach in breach register

7. **Privacy by Design**
   - k≥10 anonymization for employer analytics
   - Separate data systems (employers cannot access employee data)
   - Minimization of data collection
   - Retention policies (delete after purpose fulfilled)

### Residual Risk (After Mitigation):

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (with mitigation)** | Low (1) | Comprehensive compliance framework |
| **Impact (if occurs)** | Medium (3) | Fines possible but well-documented compliance efforts reduce severity |
| **Residual Risk Score** | **3 (LOW)** | Acceptable |

### Monitoring & Review:
- **Quarterly**: DPIA review and update
- **Annually**: Full GDPR compliance audit
- **As needed**: Legal review of new features or data processing

---

## RISK 7: FACEBOOK PLATFORM DEPENDENCY

### Risk Description:
Facebook changes group features, privacy settings, or terms of service in ways that undermine ClearMinds' ability to protect employee privacy or provide the service.

### Scenario Examples:
- Facebook changes group privacy settings to default "public"
- Facebook introduces algorithmic recommendations that surface group content to non-members
- Facebook integrates with third-party apps that can access group data

### Assessment:

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (without mitigation)** | Medium (2) | Facebook frequently changes features |
| **Impact** | Medium (3) | Could force service disruption or privacy issues |
| **Inherent Risk Score** | **6 (MEDIUM)** | |

### Mitigation Strategies:

1. **Regular Monitoring of Facebook Updates**
   - Subscribe to Facebook for Developers updates
   - Monitor Group Admin feature announcements
   - Monthly review of privacy settings

2. **Phase 2 Development Commitment**
   - In-app community platform (Q3 2025) eliminates Facebook dependency
   - Proprietary platform = full control

3. **Alternative Platform Readiness**
   - Discord, Slack, or custom platform as backup options
   - Can migrate community if Facebook becomes unsuitable

4. **Transparent Communication**
   - Pre-join modal acknowledges Facebook limitations
   - Users know this is interim solution
   - Notify users of in-app community when ready

5. **Terms of Service Acknowledgment**
   - ClearMinds makes no guarantees about Facebook's policies
   - Users acknowledge inherent limitations

### Residual Risk (After Mitigation):

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (with mitigation)** | Low (1) | Monitoring + Phase 2 plan + alternative options |
| **Impact (if occurs)** | Medium (3) | Migration possible but disruptive |
| **Residual Risk Score** | **3 (LOW)** | Acceptable for interim solution |

### Monitoring & Review:
- **Monthly**: Facebook platform update review
- **Quarterly**: Alternative platform evaluation

### Phase 2 Eliminates This Risk:
- In-app community = no third-party dependency
- Full control over features, privacy, and user experience

---

## RISK 8: COMMUNITY TOXICITY / HARMFUL CONTENT

### Risk Description:
Community develops toxic culture (victim-blaming, harmful advice, negativity spirals) that harms members instead of supporting them.

### Scenario Examples:
- Members give dangerous medical advice ("stop taking your medication")
- Victim-blaming ("you're just not trying hard enough")
- Pro-eating disorder or pro-self-harm content emerges

### Assessment:

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (without mitigation)** | Low (1) | Rachel's team has 91k member experience, knows how to manage this |
| **Impact** | High (4) | Could cause serious harm to vulnerable members |
| **Inherent Risk Score** | **4 (MEDIUM)** | |

### Mitigation Strategies:

1. **Clear Community Rules**
   - Prohibition on medical advice/diagnosis
   - Prohibition on pro-harm content
   - Encouragement of compassion and validation

2. **Professional Moderation (24/7)**
   - Trained moderators enforce rules consistently
   - Remove harmful content quickly
   - Ban repeat offenders

3. **Positive Culture-Setting**
   - Pinned post sets supportive tone
   - Moderators model compassionate responses
   - Celebrate positive interactions

4. **Member Education**
   - Pre-join modal sets expectations
   - Pinned post explains ethos
   - Regular reminder posts

5. **Reporting Mechanism**
   - Easy "Report to Admin" feature
   - Members help flag harmful content

6. **Escalation to Professional Support**
   - AI coaching available for members needing more than peer support
   - Specialist referrals (CBT, psychiatry) for complex cases
   - Crisis resources for acute situations

### Residual Risk (After Mitigation):

| Factor | Score | Rationale |
|--------|-------|-----------|
| **Likelihood (with mitigation)** | Low (1) | Experienced moderation team + clear rules |
| **Impact (if occurs)** | Medium (3) | Quickly addressed, limited spread |
| **Residual Risk Score** | **3 (LOW)** | Acceptable |

### Monitoring & Review:
- **Daily**: Moderator review of all posts/comments
- **Weekly**: Review of enforcement actions and community tone
- **Monthly**: Member satisfaction check (informal)
- **Quarterly**: Community culture assessment

---

## RESIDUAL RISK SUMMARY TABLE

| Risk | Inherent Risk | Residual Risk | Status |
|------|---------------|---------------|--------|
| 1. Employer Identification | Critical (12) | Medium (4) | ✅ Acceptable with mitigation |
| 2. Extortion/Blackmail | High (10) | Medium (5) | ✅ Acceptable with mitigation |
| 3. Data Scraping | Medium (6) | Low (3) | ✅ Acceptable |
| 4. Accidental Self-Disclosure | High (8) | Low (3) | ✅ Acceptable |
| 5. Crisis Response Inadequacy | High (10) | Medium (5) | ✅ Acceptable with 24/7 coverage |
| 6. Regulatory Non-Compliance | High (8) | Low (3) | ✅ Acceptable with compliance framework |
| 7. Facebook Platform Dependency | Medium (6) | Low (3) | ✅ Acceptable with Phase 2 plan |
| 8. Community Toxicity | Medium (4) | Low (3) | ✅ Acceptable with moderation |

**Overall Residual Risk Level:** **MEDIUM** (acceptable for Phase 1 interim solution)

**Phase 2 Residual Risk Level:** **LOW** (in-app communities reduce all risks by 1-2 levels)

---

## RISK TREATMENT PLAN

### Immediate Actions (Before Launch):
- [x] Draft Employer Non-Snooping Agreement (mandatory contract clause)
- [x] Draft Employee Privacy Notice
- [x] Draft Facebook Community Terms of Service
- [x] Draft Enhanced Moderator Protocols
- [ ] Train Rachel's moderation team on B2B protocols
- [ ] Complete ICO registration (when eligible)
- [ ] Begin Cyber Essentials Plus certification
- [ ] Establish crisis service partnerships

### Phase 1 Ongoing (0-6 Months):
- [ ] Daily moderation monitoring
- [ ] Weekly compliance audits
- [ ] Monthly incident log review
- [ ] Quarterly risk assessment update
- [ ] Quarterly DPIA review

### Phase 2 Development (Q1-Q3 2025):
- [ ] Build in-app anonymous community platform
- [ ] Implement company segmentation technology
- [ ] Implement screenshot prevention controls
- [ ] Migrate users from Facebook to in-app
- [ ] Sunset Facebook communities (when in-app fully operational)

---

## GOVERNANCE & OVERSIGHT

### Responsible Parties:

**Risk Owner:** Tom Cassidy, Chief Digital Officer
**Operational Owner:** Rachel Goodley, Head of Customer Care/Support
**Legal Review:** [Legal Team/External Counsel]
**Board Oversight:** [Board of Directors]

### Review Frequency:

**Daily:** Incident monitoring (Rachel's team)
**Weekly:** Compliance audit (Rachel's team)
**Monthly:** Risk register update (Tom Cassidy)
**Quarterly:** Formal risk review (Tom + Rachel + Legal)
**Annually:** Full risk assessment (Tom + Board)

### Escalation Triggers:

**Immediate Escalation to Board:**
- Confirmed employer breach with employee harm
- ICO investigation or enforcement action
- Suicide or serious harm related to community
- Criminal investigation (extortion, harassment)

**Quarterly Escalation to Board:**
- Trends in incident reports
- Regulatory changes affecting compliance
- Phase 2 development progress
- Risk assessment updates

---

## COMPLIANCE DOCUMENTATION

This risk assessment serves as:
- ✅ **DPIA foundation** (UK GDPR Article 35)
- ✅ **Due diligence documentation** for enterprise clients
- ✅ **Governance framework** for Board oversight
- ✅ **Audit trail** for regulators (ICO, external auditors)

---

## CONCLUSION & RECOMMENDATION

### Conclusion:

ClearMinds has identified 8 primary privacy and safety risks associated with B2B peer support communities. Through comprehensive mitigation strategies (contractual, technical, operational), all risks have been reduced to **MEDIUM or LOW residual risk levels**, which are acceptable for an interim Phase 1 solution.

**Key mitigations include:**
- Legally enforceable Employer Non-Snooping Agreement
- Enhanced moderation with employer infiltration detection
- 24/7 crisis response coverage
- UK GDPR compliance framework
- Commitment to Phase 2 in-app communities (Q3 2025)

### Recommendation:

**PROCEED** with Phase 1 (enhanced Facebook communities) for B2B/EAP deployment, subject to:

1. ✅ Completion of immediate actions (training, ICO registration, crisis partnerships)
2. ✅ Ongoing monitoring and quarterly risk review
3. ✅ Commitment to Phase 2 development (in-app communities) to reduce residual risk
4. ✅ Clear communication to employees about Facebook limitations and Phase 2 timeline

**Phase 2 (in-app communities) is essential** to reduce residual risk to LOW levels and provide the privacy protections that B2B clients and employees deserve long-term.

---

**APPROVED FOR B2B DEPLOYMENT:** [Pending Board/Legal Review]

**Prepared By:** Tom Cassidy, CDO
**Date:** October 2025
**Next Review:** January 2026 (Quarterly)

---

**Document Version:** 1.0
**Classification:** Confidential - Internal Use & Client Sharing
**Questions:** privacy@clearminds.com
