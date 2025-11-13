# Clear Minds Data Governance Framework
## CDO Position Document

**Prepared by:** Chief Data Officer  
**Date:** October 2025  
**Version:** 1.0  
**Review Date:** October 2026

---

## Executive Summary

**Position:** Clear Minds listening history data is classified as **sensitive personal data requiring enhanced protection**, not special category health data under UK GDPR Article 9.

**Rationale:** Following industry precedent (Headspace, Calm, Insight Timer), passive audio consumption without user-reported health information does not "reveal health status" under the legal definition.

**Approach:** Implement strong data protection as if it were health data, without the overhead of special category requirements.

**Investment:** £8k-£18k first year, £6k-£12k ongoing

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

**EAP Context Consideration:**

While deployed in Employee Assistance Programmes (wellness context), the fundamental nature of the data remains unchanged. Analogies:
- Gym membership in EAP ≠ health data
- Financial counseling in EAP ≠ health data  
- Meditation app in EAP ≠ health data

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
- Clear policies and procedures
- Regular reviews and audits
- Evidence of good governance

**4. Industry Alignment**
- Follow Headspace/Calm precedent
- Exceed baseline where it builds trust
- Stay current with ICO guidance

---

## 3. Implementation Requirements

### Legal Compliance (£2k-£5k)

**Must Have:**
- [x] ICO registration (£40-£2,900 based on turnover)
- [ ] Privacy notice (layered: short in-app + full policy)
- [ ] Cookie consent banner (PECR compliant)
- [ ] Terms & Conditions with data protection clauses
- [ ] Records of Processing Activities (ROPA)
- [ ] Data retention policy (documented)
- [ ] User rights infrastructure (deletion, download, access)

**Timeline:** Month 1-2  
**Cost:** £2k-£5k (mostly internal time + ICO registration)

### Security Standards (£6k-£13k)

**Must Have:**
- [ ] Encryption in transit: TLS 1.2+ minimum
- [ ] Encryption at rest: AES-256 minimum
- [ ] Multi-factor authentication: All admin/privileged accounts
- [ ] Access controls: Role-based, principle of least privilege
- [ ] Backup/recovery: Tested monthly, 3-2-1 rule
- [ ] Audit logging: All access to user data logged
- [ ] Incident response plan: Documented, tested

**External Validation:**
- [ ] **Cyber Essentials Plus** (£1k-£4k) - Required for most enterprise EAP contracts
- [ ] **Penetration testing** (£3k-£8k annually) - Find vulnerabilities proactively

**Timeline:** Month 2-3  
**Cost:** £6k-£13k first year, £4k-£8k ongoing

### EAP-Specific Requirements (Internal Implementation)

**Employee Confidentiality Architecture:**

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
- EAP confidentiality policy (public)
- Data sharing agreement template (for employer contracts)
- Employee privacy notice (emphasizes confidentiality)

**Timeline:** Month 2-4 (development sprint)  
**Cost:** Development time (internal)

### Governance & Documentation (Internal)

**Data Protection Impact Assessment (DPIA):**
- Required? Not legally mandatory (not special category data)
- Recommended? **YES** - Best practice for 70k users + sensitive content
- Use ICO template, document risks and mitigations
- Review annually or when processing changes materially

**Designated Data Protection Contact:**
- Not legally required to appoint DPO (not special category + not public authority)
- **Designate CDO** as responsible person
- Point of contact for ICO and data subjects
- Responsible for compliance oversight

**Policies & Procedures:**
- [ ] Data Protection Policy (overarching)
- [ ] Data Retention Policy (specific timeframes)
- [ ] Incident Response Plan (breach procedures)
- [ ] Data Subject Rights Procedure (access, deletion, portability)
- [ ] Vendor Management Policy (processor due diligence)
- [ ] Staff Training Programme (annual refresh)

**Timeline:** Month 1-3 (templates + customization)  
**Cost:** Internal time (use ICO templates as base)

---

## 4. Data Lifecycle Management

### Collection
**What:** Name, email, listening history  
**Why:** Service delivery, improvement, analytics  
**How:** User consent at sign-up, clear privacy notice  
**Legal Basis:** Contract (Art 6(1)(b))

### Storage
**Where:** [Cloud provider, UK region preferred]  
**Security:** Encrypted at rest (AES-256), access controls, MFA  
**Retention:** Active accounts + 12 months post-inactivity, then deletion  
**Backups:** Encrypted, tested monthly, 90-day retention

### Use
**Primary:** Deliver hypnotherapy sessions to users  
**Secondary:** Service improvement (which content is popular)  
**Analytics:** Aggregated, anonymized for EAP reporting  
**Research:** If added later, separate consent + ethics review required

### Sharing
**Third Parties:**
- Cloud hosting provider (processor agreement required)
- Payment processor (minimal data, PCI-DSS compliant)
- Analytics tools (anonymized only, or processor agreement)

**Therapist Partnerships (if added):**
- Separate controllers (not processors)
- User consent required for each referral
- Data sharing agreement (minimal data, secure transfer)
- Independent privacy notice from therapist

**International Transfers:**
- Prefer UK/EU data residency
- If non-UK: Adequacy decision or IDTA required
- Document Transfer Risk Assessment

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

## 5. EAP Deployment: Employer Contracts

### Standard Clauses

**Data Protection Terms:**

"Clear Minds Ltd processes employee data as an independent data controller. [Employer] has no access to individual employee data, including:
- Employee names or identifiers
- Registration status
- Usage patterns or listening history  
- Any personal or health-related information

Clear Minds provides [Employer] with aggregated, anonymized statistics only, subject to minimum reporting thresholds (≥10 users per subgroup) to prevent identification."

**Confidentiality Commitment:**

"Clear Minds maintains absolute confidentiality of individual employee use. Employees create accounts using personal credentials independent of employer systems. [Employer] receives only:
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
- Clear Minds does NOT share back which employees registered

**Preferred Model:** 
Employer receives access codes; employees self-register voluntarily without employer knowing who signed up.

---

## 6. Future Considerations

### Wellness Questionnaires (Planned Addition)

**If Internal Use Only (service improvement):**
- Classification: Sensitive personal data
- Legal Basis: Contract + legitimate interests
- No ethics approval required
- Privacy notice update required

**If Research/Publication Intended:**
- Conduct as separate research project
- Ethics committee approval (university REC or independent)
- Separate informed consent (distinct from service consent)
- Legal basis: Legitimate interests + Scientific research (Art 9(2)(j) IF health data)
- DPIA required for research project
- 10-20 year retention (UKRI standards)
- Consider: Does asking health questions MAKE it special category data?

**Recommendation:** 
Start with service improvement only. If research ambitions emerge, reassess classification and seek ethics approval proactively.

### OCEAN Personality Testing (Planned Addition)

**Classification:** Potentially special category data (psychological assessment)

**Requirements:**
- British Psychological Society standards (qualified administrators)
- Explicit consent for profiling
- Transparency about how results are used
- Right to object (Article 21)
- No solely automated decisions based on results
- Appropriate Policy Document if using Art 9(2)(b) employment condition

**Recommendation:**
- Treat as special category from the start
- Get BPS-qualified person involved
- Separate consent flow ("Would you like to take personality assessment?")
- Clear explanation of results and use

### Therapist/Neurofeedback Partnerships (Planned)

**Relationship:** Separate controllers (not processors)

**Requirements:**
- Data sharing agreement between controllers
- User consent for each referral
- Minimal data sharing (only what's needed)
- Therapist provides own privacy notice
- Due diligence: Professional registration, insurance, ICO registration
- Breach notification coordination

**Legal Basis:**
- Contract (Art 6(1)(b)) for service
- Health/social care provision (Art 9(2)(h)) if special category data shared

---

## 7. Risk Assessment & Mitigation

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

## 8. Competitive Positioning

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
- "Is employee data confidential from us?" → YES, contractually and technically guaranteed
- "Are you Cyber Essentials certified?" → YES, Plus level (external audit)
- "Have you been pen tested?" → YES, annually
- "Do you have a DPIA?" → YES, available on request
- "Who's your DPO?" → Designated CDO as responsible person
- "Are you GDPR compliant?" → YES, full documentation available

**Headspace comparison:**
- Same data classification approach ✓
- Same confidentiality model ✓  
- Same security standards ✓
- **Differentiator:** More transparent about our reasoning and governance

---

## 9. Budget Summary

### Year 1 Implementation

**Legal & Compliance:**
- ICO registration: £40-£2,900
- Privacy notice/T&Cs review (optional external): £1,000-£2,000
- DPIA template customization: Internal time
- **Subtotal: £1k-£5k**

**Security & Validation:**
- Cyber Essentials Plus: £1,000-£4,000
- Penetration testing: £3,000-£8,000
- Security improvements (if needed from pen test): £2,000-£5,000
- **Subtotal: £6k-£17k**

**Governance & Tools:**
- DPIA/ROPA documentation: Internal time
- Incident response planning: Internal time
- Staff training (develop materials): £500-£1,000
- **Subtotal: £1k-£1k**

**TOTAL YEAR 1: £8,000-£23,000**

### Ongoing Annual Costs

- ICO registration renewal: £40-£2,900
- Cyber Essentials renewal: £300-£1,000
- Annual penetration test: £3,000-£8,000
- Training refreshers: £500
- Policy reviews: Internal time
- Compliance monitoring: Internal time (0.2 FTE CDO)

**TOTAL ONGOING: £4,000-£12,000/year**

### Optional/Future

- ISO 27001 (if chasing NHS): £15,000-£45,000
- ORCHA certification: £2,000-£5,000
- External DPO service: £800-£2,000/month
- Research ethics committee: £500-£2,000 per study

---

## 10. Review & Updates

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

## 11. Documentation Trail

### What We Maintain

**Strategic:**
- [ ] This position document (annual review)
- [ ] DPIA (review when processing changes)
- [ ] Classification decision log

**Operational:**
- [ ] Privacy notice (version control)
- [ ] ROPA (Records of Processing Activities)
- [ ] Data retention schedule
- [ ] Vendor/processor list with DPA status
- [ ] Staff training records

**Incident:**
- [ ] Breach log (even if not reportable)
- [ ] Data subject request log
- [ ] Complaint log

**Audit:**
- [ ] Pen test reports (annual)
- [ ] Cyber Essentials certificates
- [ ] Policy review logs
- [ ] Access review logs (annual)

### Accountability Demonstration

**If ICO asks:**

"Why did you classify this as NOT special category data?"

**Our response:**
1. This position document (reasoned analysis)
2. Industry precedent (Headspace, Calm, Spotify)
3. Legal interpretation of Article 4(15) ("reveal" test)
4. Comparison to clear health data examples
5. Security controls implemented anyway
6. Willingness to adjust if ICO disagrees

**Key message:** We made an informed, reasonable decision in good faith, with appropriate safeguards regardless of classification.

---

## 12. Sign-Off

**This framework represents Clear Minds' data governance position for UK EAP deployment.**

**Key Commitments:**

✓ Protect user data as if it were special category health data  
✓ Maintain absolute employee confidentiality in EAP context  
✓ Follow industry precedent (Headspace/Calm model)  
✓ Implement enterprise-grade security controls  
✓ Document all decisions and maintain accountability  
✓ Review annually and adjust as guidance evolves  
✓ Respond promptly to any ICO guidance or challenges  

**Approved:**

**Chief Data Officer:** _________________ Date: _________

**CEO:** _________________ Date: _________

---

## Appendix A: Quick Reference Checklist

### Pre-EAP Launch Checklist

**Legal:**
- [ ] ICO registered
- [ ] Privacy notice published (in-app + website)
- [ ] Cookie consent implemented
- [ ] Terms & Conditions finalized
- [ ] ROPA documented

**Security:**
- [ ] Encryption verified (TLS 1.2+, AES-256)
- [ ] MFA enabled (all admin accounts)
- [ ] Backups tested
- [ ] Cyber Essentials Plus booked/completed
- [ ] Pen test scheduled

**EAP-Specific:**
- [ ] Aggregation rules implemented (k≥10)
- [ ] Employer reporting dashboard built
- [ ] Data sharing agreement template ready
- [ ] Employee privacy notice (emphasizing confidentiality)
- [ ] Sign-up flow (independent of employer)

**Governance:**
- [ ] DPIA completed
- [ ] Incident response plan documented
- [ ] Data subject rights process defined
- [ ] Staff trained on confidentiality
- [ ] CDO designated as data protection contact

**Ready to launch when all items checked.**

---

## Appendix B: Resources

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

**END OF DOCUMENT**