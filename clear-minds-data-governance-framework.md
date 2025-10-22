# clear minds Data Governance Framework
## Enterprise-Grade Privacy for Workplace Wellness

**Prepared by:** Chief Data Officer
**Date:** October 2025
**Version:** 1.0
**Review Date:** October 2026

---

## Executive Summary

**Position:** clear minds listening history data is classified as **sensitive personal data requiring enhanced protection**, not special category health data under UK GDPR Article 9.

**Rationale:** Following industry precedent (Headspace, Calm, Insight Timer), passive audio consumption without user-reported health information does not "reveal health status" under the legal definition.

**Approach:** Implement strong data protection as if it were health data, without the overhead of special category requirements.

**Competitive Advantage:** "We protect your data like health data" - enterprise-grade security meeting health data standards, even where not legally required.

---

## 1. Data Classification Decision

### What we collect:
- User name and email (account data)
- Listening history: which hypnotherapy audio sessions played
- Timestamps and session duration
- Device/platform metadata

### What we DON'T collect:
- User-reported symptoms or health conditions
- Diagnostic information
- Therapeutic assessments
- Any health-related input from users
- Medical history or treatment information

### Classification: Sensitive Personal Data (NOT Special Category)

**Article 6 Legal Basis:**
- Primary: Article 6(1)(b) - Contract (service delivery to users)
- Secondary: Article 6(1)(f) - Legitimate interests (service improvement, analytics)

**Why NOT Article 9 (Special Category):**

✅ **Industry precedent:** Headspace, Calm, Insight Timer, Spotify wellness playlists all treat content consumption as regular personal data

✅ **No revelation of health status:** Listening to "Better Sleep" suggests interest in sleep improvement, not diagnosis of insomnia. Multiple non-health reasons exist (curiosity, general wellness, testing for others).

✅ **Passive consumption vs active reporting:** We broadcast content; users don't report health information back to us

✅ **Comparable activities:** YouTube meditation views, Audible self-help audiobooks, wellness podcast listening - none treated as health data

✅ **ICO guidance interpretation:** Article 4(15) requires data that "reveals information about health status." Content consumption is indirect and ambiguous, not revelatory.

**Enterprise Wellness Context:**

While deployed in workplace wellness programs, the fundamental nature of the data remains unchanged. Analogies:
- Gym membership in workplace benefits ≠ health data
- Financial counseling in employee benefits ≠ health data
- Meditation app in wellness programs ≠ health data

The delivery channel doesn't transform passive content consumption into special category data.

---

## 2. Governance Framework

### Core Principles

**1. User Privacy First**
- Employees are anonymous to employers (zero individual data shared)
- Users control their own data (easy deletion, download)
- Transparent about what we collect and why

**2. Security as if it IS Health Data**
- Encryption, access controls, monitoring
- Even though not legally required as special category, we implement health-data-level security
- Competitive advantage: "We protect your data like health data"

**3. Documented Accountability**
- Clear policies and procedures (31 policies across 6 categories)
- Regular reviews and audits
- Evidence of good governance

**4. Industry Alignment**
- Follow Headspace/Calm precedent
- Exceed baseline where it builds trust
- Stay current with ICO guidance

---

## 3. Implementation Framework

### Legal Compliance

**In Place:**
- ICO registration (Data Controller)
- Privacy notice (layered: short in-app + full policy)
- Cookie consent (PECR compliant)
- Terms & Conditions with data protection clauses
- Records of Processing Activities (ROPA)
- Data retention policy (documented)
- User rights infrastructure (deletion, download, access)

### Security Standards

**In Place:**
- Encryption in transit: TLS 1.3
- Encryption at rest: AES-256
- Multi-factor authentication on all admin accounts
- Role-based access controls (principle of least privilege)
- Monthly tested backups (3-2-1 rule)
- Audit logging on all user data access
- Documented incident response plan

**External Validation:**
- **Cyber Essentials Plus** certification (Q2 2025)
- **Annual penetration testing** by certified partners
- **DPIA** completed and reviewed annually

### Employee Confidentiality Architecture

**"Zero Individual Visibility" Standard**

**Employers receive:**
- Total registered users (count only)
- Overall utilization rate (% of eligible employees)
- Aggregated usage statistics (total sessions played)
- General category breakdown (% using sleep, stress, confidence content)
- Demographics ONLY if ≥10 users in subgroup (k-anonymity = 10)

**Employers NEVER receive:**
- Individual employee names or identifiers
- Which specific employees registered
- Individual usage patterns
- Small group data (under 10 users)
- Any information enabling identification

**Technical Implementation:**
- Employees sign up with personal email (not corporate)
- Optional: Employer access code (links payment, not identity)
- Reporting dashboard: Aggregated stats only, minimum thresholds enforced
- No individual-level data exports

**Documentation:**
- Employee confidentiality policy (public)
- Data sharing agreement template (for employer contracts)
- Employee privacy notice (emphasizes confidentiality)

### Governance & Documentation

**Data Protection Impact Assessment (DPIA):**
- Best practice for 70k+ users handling sensitive wellness content
- Uses ICO template, documents risks and mitigations
- Reviewed annually or when processing changes materially

**Designated Data Protection Contact:**
- Chief Data Officer designated as responsible person
- Point of contact for ICO and data subjects
- Responsible for compliance oversight

**Policy Framework:**
- Data Protection Policy (overarching)
- Data Retention Policy (specific timeframes)
- Incident Response Plan (breach procedures)
- Data Subject Rights Procedure (access, deletion, portability)
- Vendor Management Policy (processor due diligence)
- Staff Training Programme (annual refresh)

---

## 4. Data Lifecycle Management

### Collection
**What:** Name, email, listening history
**Why:** Service delivery, improvement, analytics
**How:** User consent at sign-up, clear privacy notice
**Legal Basis:** Contract (Art 6(1)(b))

### Storage
**Where:** UK-region cloud infrastructure
**Security:** Encrypted at rest (AES-256), access controls, MFA
**Retention:** Active accounts + 12 months post-inactivity, then deletion
**Backups:** Encrypted, tested monthly, 90-day retention

### Use
**Primary:** Deliver hypnotherapy sessions to users
**Secondary:** Service improvement (which content is popular)
**Analytics:** Aggregated, anonymized for employer reporting
**Research:** If added later, separate consent + ethics review required

### Sharing
**Third Parties:**
- Cloud hosting provider (processor agreement in place)
- Payment processor (minimal data, PCI-DSS compliant)
- Analytics tools (anonymized only, or processor agreement)

**Clinical Referral Partners:**
- Separate controllers (not processors)
- User consent required for each referral
- Data sharing agreement (minimal data, secure transfer)
- Independent privacy notice from clinical partner
- Smart Start Minds (CQC-registered: 1-2950268195)

**International Transfers:**
- UK/EU data residency preferred
- If non-UK: Adequacy decision or IDTA required
- Transfer Risk Assessment documented

### Deletion
**User Request:** Within 1 month (extendable to 3 months if complex)
**Automatic:** 12 months after account inactivity (with 30-day warning email)
**Backups:** Data deleted from live systems; backups naturally expire (90 days)
**Legal Hold:** Exception for ongoing legal matters (documented)

**Process:**
1. User requests deletion (any format accepted)
2. Verify identity
3. Delete from production within 7 days
4. Confirm to user
5. Log request and completion

---

## 5. Enterprise Deployment: Employer Contracts

### Standard Clauses

**Data Protection Terms:**

"clear minds ltd processes employee data as an independent data controller. [Employer] has no access to individual employee data, including:
- Employee names or identifiers
- Registration status
- Usage patterns or listening history
- Any personal or health-related information

clear minds provides [Employer] with aggregated, anonymized statistics only, subject to minimum reporting thresholds (≥10 users per subgroup) to prevent identification."

**Confidentiality Commitment:**

"clear minds maintains absolute confidentiality of individual employee use. Employees create accounts using personal credentials independent of employer systems. [Employer] receives only:
- Total registered user count
- Overall utilization percentage
- Aggregated content category usage (e.g., % using stress, sleep content)
- Demographics (only if ≥10 users in subgroup)

No individual-level data will be shared under any circumstances, except as required by law (court order, safeguarding emergency)."

**Data Processing Agreement (if employer provides employee list for invitation):**

If employer provides employee emails for invitation purposes only:
- Article 28 DPA required
- Emails used solely for invitation, not linked to usage
- Emails deleted after invitation sent (or 30 days)
- clear minds does NOT share back which employees registered

**Preferred Model:**
Employer receives access codes; employees self-register voluntarily without employer knowing who signed up.

---

## 6. Risk Assessment & Mitigation

### Risk Matrix

| Risk | Likelihood | Impact | Mitigation | Residual Risk |
|------|-----------|--------|------------|---------------|
| ICO challenges classification as not special category | Low | Medium | Documented reasoning, industry precedent, prompt remediation plan | Low |
| Data breach of listening history | Low | High | Encryption, access controls, pen testing, incident response | Low |
| Employer identifies individual employees | Low | High | k-anonymity thresholds (≥10), technical controls, contract terms | Very Low |
| User data subject request not handled in time | Medium | Medium | Documented process, designated owner, automated tracking | Low |
| Small employer (<50 employees) enables identification | Medium | Medium | Policy: No subgroup reporting for employers <50 employees | Low |

### Incident Response

**Data Breach Procedure:**

**Detection → Assessment (within 24 hours) → ICO Notification (within 72 hours) → User Notification (if high risk)**

**Breach Response Team:**
- CDO (lead)
- CTO (technical investigation)
- CEO (communications)
- External: InfoSec consultant (if major breach)

**72-Hour ICO Notification:**
- Nature of breach
- Categories and number of data subjects affected
- Likely consequences
- Measures taken or proposed
- Contact details

**User Notification (if high risk):**
- Clear, plain language
- What happened, what data affected
- Likely consequences
- What we're doing
- What they should do
- How to contact us

**Post-Incident:**
- Root cause analysis
- Remediation plan
- Update controls
- Staff training
- Document lessons learned

---

## 7. Competitive Positioning

### Market Differentiation

**"Enterprise-Grade Privacy for Workplace Wellness"**

**Key Messages:**

✅ **"We treat your data like health data"** - Even though not legally required, we implement health-data-level security

✅ **"Zero employer visibility"** - Absolute employee confidentiality, independently audited

✅ **"Cyber Essentials Plus certified"** - Government-backed security standard

✅ **"Regular penetration testing"** - Proactive security, not reactive

✅ **"Following Headspace precedent"** - Industry-leading data protection approach

### Procurement Advantages

**Enterprise buyers ask:**
- "Is employee data confidential from us?" → **YES**, contractually and technically guaranteed
- "Are you Cyber Essentials certified?" → **YES**, Plus level (external audit)
- "Have you been pen tested?" → **YES**, annually by certified partners
- "Do you have a DPIA?" → **YES**, available on request
- "Who's your DPO?" → Designated Chief Data Officer as responsible person
- "Are you GDPR compliant?" → **YES**, full documentation available (31 policies)

**Industry Comparison (vs Headspace, Calm):**
- Same data classification approach ✓
- Same confidentiality model ✓
- Same security standards ✓
- **Differentiator:** More transparent about our reasoning and governance framework

---

## 8. Investment Framework

### Annual Operating Costs

**Security & Compliance:**
- ICO registration renewal: £2,900 (annual)
- Cyber Essentials Plus renewal: £1,000 (annual)
- Annual penetration testing: £5,000
- Training refreshers: £500
- Compliance monitoring: Internal time (0.2 FTE CDO)

**Total Annual Investment: £9,400**

### Optional Enhancements

- ISO 27001 (if pursuing NHS contracts): £15,000-£45,000
- ORCHA certification (digital health apps): £2,000-£5,000
- External DPO service: £1,200-£24,000 (annual)

---

## 9. Review & Updates

### Annual Review Triggers

**Mandatory review every 12 months:**
- Classification decision remains valid?
- ICO issued new guidance on wellness apps?
- Industry precedent changed (Headspace, Calm, etc.)?
- Our processing activities changed materially?
- Security controls still appropriate?
- Policies and procedures up to date?

### Immediate Review Triggers

**Review classification if:**
- We add health questionnaires or symptom tracking
- We add diagnostic or therapeutic features
- ICO challenges our classification
- Major competitor gets enforced against
- We enter NHS market (higher scrutiny)
- User-reported health data added to platform

### Change Management

**If classification changes to special category:**
1. Update privacy notice (30-day notice to users)
2. Implement explicit consent mechanism
3. Update DPIA
4. Review Article 9 conditions (likely Art 9(2)(a) explicit consent)
5. Update ROPA
6. Staff training on new requirements
7. Review all vendor contracts

**Process:** CDO proposes, CEO approves, document reasoning

---

## 10. Accountability Demonstration

**If ICO asks:** *"Why did you classify this as NOT special category data?"*

**Our response:**
1. This position document (reasoned analysis)
2. Industry precedent (Headspace, Calm, Spotify)
3. Legal interpretation of Article 4(15) ("reveal" test)
4. Comparison to clear health data examples
5. Security controls implemented anyway (health-data-level)
6. Willingness to adjust if ICO disagrees

**Key message:** We made an informed, reasonable decision in good faith, with appropriate safeguards regardless of classification.

---

## 11. Sign-Off

**This framework represents clear minds' data governance position for UK enterprise wellness deployment.**

**Key Commitments:**

✓ Protect user data as if it were special category health data
✓ Maintain absolute employee confidentiality in workplace programs
✓ Follow industry precedent (Headspace/Calm model)
✓ Implement enterprise-grade security controls
✓ Document all decisions and maintain accountability
✓ Review annually and adjust as guidance evolves
✓ Respond promptly to any ICO guidance or challenges

**Framework Oversight:**

**Chief Data Officer:** Tom Cassidy

**Approved by Board:** October 2025

---

## Appendix: Resources

**ICO Guidance:**
- Special category data: ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/lawful-basis/special-category-data/
- DPIA template: ico.org.uk (search "DPIA template")
- Privacy notices: ico.org.uk (search "privacy notice guidance")

**Certifications:**
- Cyber Essentials: ncsc.gov.uk/cyberessentials
- IASME (CE certifying body): iasme.co.uk

**Templates:**
- ICO privacy notice generator
- ICO DPIA template
- ICO consent guidance

**Monitoring:**
- ICO enforcement actions: ico.org.uk/action-weve-taken/enforcement/
- Data protection case law: ICO and EDPB decisions

---

**This is a living document, reviewed annually and updated as regulations, industry precedent, or our processing activities evolve.**

---

**END OF DOCUMENT**
