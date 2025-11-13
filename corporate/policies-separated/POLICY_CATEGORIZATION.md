# Policy Categorization: Clear Minds vs Concierge Health

## Overview

This document categorizes all policies between **Clear Minds** (digital wellness platform) and **Concierge Health** (CQC-registered clinical services).

---

## CLEAR MINDS Policies
**Service Model:** Digital hypnotherapy audio platform + moderated Facebook community
**Data Collection:** Name + Email ONLY (plus listening history)
**Payment:** Via Shopify/App Stores (Clear Minds never handles payment data)
**Regulatory Status:** NOT CQC-registered, NOT medical service

### B2B Community (8 policies) - ALL CLEAR MINDS
1. ✅ `1-employer-non-snooping-agreement.md`
2. ✅ `2-facebook-community-terms-of-service.md`
3. ✅ `3-facebook-group-rules-pinned-post.md`
4. ✅ `4-user-warning-consent-flow.md`
5. ✅ `5-enhanced-moderator-protocols.md`
6. ✅ `6-employee-privacy-notice.md`
7. ✅ `7-towergate-pitch-deck.md`
8. ✅ `8-community-risk-assessment.md`

**Action:** Copy to `policies-separated/clearminds/b2b-community/` AS-IS (already appropriate)

### Data Governance - CLEAR MINDS (Simplified Versions)
1. ✅ `privacy-policy.md` - **REWRITTEN** (minimal data collection)
2. ✅ `data-protection-policy.md` - **REWRITTEN** (sensitive data, not special category)
3. ⚠️ `data-breach-response-plan.md` - **ADAPT** (simplified for name/email only)
4. ⚠️ `subject-access-request-procedure.md` - **ADAPT** (simple CSV export)
5. ⚠️ `information-security-policy.md` - **ADAPT** (focus on Cyber Essentials Plus)
6. ❌ `data-processing-agreement-template.md` - **SHARED** (both entities need this)
7. ❌ `dpia-template.md` - **SHARED** (both entities need this)

### Legal - CLEAR MINDS (with boundary clarifications)
1. ✅ `acceptable-use-policy.md` - **ADAPT** (digital platform + community rules)
2. ✅ `terms-of-service.md` - **ADAPT** (clarify NOT medical service, referral to Concierge)
3. ✅ `medical-disclaimer.md` - **ADAPT** (strengthen boundary, add Concierge referral pathway)
4. ✅ `results-disclaimer.md` - **KEEP AS-IS** (already appropriate)

### External - CLEAR MINDS
1. ✅ `ai-usage-policy.md` - **ADAPT** (AI chat support, content creation)
2. ✅ `complaints-policy.md` - **ADAPT** (digital service complaints)
3. ✅ `group-sla.md` - **ADAPT** (B2B service level agreement for digital platform)
4. ❌ `clinical-supervision-policy.md` - **CONCIERGE HEALTH** (clinical staff only)
5. ❌ `health-sla.md` - **CONCIERGE HEALTH** (clinical SLA)

---

## CONCIERGE HEALTH Policies
**Service Model:** CQC-registered network of medical/therapeutic partners
**Data Collection:** Full health data, medical records, assessments
**Payment:** Direct billing or insurance
**Regulatory Status:** CQC-registered (partner network)

### Clinical (5 policies) - ALL CONCIERGE HEALTH
1. ✅ `consent-capacity-policy.md` - **CONCIERGE ONLY**
2. ✅ `dignity-respect-policy.md` - **CONCIERGE ONLY**
3. ✅ `duty-of-candour-policy.md` - **CONCIERGE ONLY**
4. ✅ `infection-control-policy.md` - **CONCIERGE ONLY**
5. ✅ `safeguarding-adults-policy.md` - **CONCIERGE ONLY**

**Action:** Copy to `policies-separated/concierge-health/clinical/` and UPDATE to reflect:
- CQC registration status
- Partner network model
- Referral pathway FROM Clear Minds

### Data Governance - CONCIERGE HEALTH (Full Health Data Protections)
1. ✅ `privacy-policy.md` - **REWRITE** (special category health data, clinical records)
2. ✅ `data-protection-policy.md` - **REWRITE** (Article 9 processing, health data safeguards)
3. ✅ `data-breach-response-plan.md` - **ADAPT** (clinical data breach protocols)
4. ✅ `subject-access-request-procedure.md` - **ADAPT** (clinical records access)
5. ✅ `information-security-policy.md` - **ADAPT** (clinical systems, NHS integration)
6. ✅ `data-processing-agreement-template.md` - **SHARED**
7. ✅ `dpia-template.md` - **SHARED**

### External - CONCIERGE HEALTH
1. ✅ `clinical-supervision-policy.md` - **CONCIERGE ONLY**
2. ✅ `health-sla.md` - **CONCIERGE ONLY** (clinical service levels)
3. ✅ `complaints-policy.md` - **ADAPT** (clinical complaints, CQC reporting)

### Legal - CONCIERGE HEALTH
1. ✅ `terms-of-service.md` - **REWRITE** (clinical services, CQC registration, informed consent)
2. ✅ `medical-disclaimer.md` - **MINIMAL** (we ARE a medical service, professional standards apply)
3. ✅ `acceptable-use-policy.md` - **ADAPT** (clinical platform usage)

---

## SHARED Policies (Both Entities Need Versions)

### Templates (Both)
1. `data-processing-agreement-template.md` - **SHARED**
2. `dpia-template.md` - **SHARED**

### Each Entity Needs Own Version
1. `privacy-policy.md` - ✅ Clear Minds (minimal data) | ❌ Concierge (health data)
2. `data-protection-policy.md` - ✅ Clear Minds (sensitive data) | ❌ Concierge (special category)
3. `terms-of-service.md` - ⚠️ Clear Minds (digital) | ❌ Concierge (clinical)
4. `complaints-policy.md` - ⚠️ Clear Minds (service) | ❌ Concierge (clinical + CQC)

---

## File Structure

```
/policies-separated/
├── clearminds/
│   ├── b2b-community/ (8 files - copy as-is)
│   ├── data-governance/
│   │   ├── privacy-policy.md ✅ DONE
│   │   ├── data-protection-policy-clearminds.md ✅ DONE
│   │   ├── data-breach-response-plan.md (adapt)
│   │   ├── subject-access-request-procedure.md (adapt)
│   │   ├── information-security-policy.md (adapt)
│   │   ├── data-processing-agreement-template.md (copy)
│   │   └── dpia-template.md (copy)
│   ├── legal/
│   │   ├── terms-of-service.md (adapt)
│   │   ├── medical-disclaimer.md (adapt - strengthen boundaries)
│   │   ├── results-disclaimer.md (copy as-is)
│   │   └── acceptable-use-policy.md (adapt)
│   └── external/
│       ├── ai-usage-policy.md (adapt)
│       ├── complaints-policy.md (adapt)
│       └── group-sla.md (adapt)
│
├── concierge-health/
│   ├── clinical/ (5 files - adapt for CQC partner network)
│   │   ├── consent-capacity-policy.md
│   │   ├── dignity-respect-policy.md
│   │   ├── duty-of-candour-policy.md
│   │   ├── infection-control-policy.md
│   │   └── safeguarding-adults-policy.md
│   ├── data-governance/
│   │   ├── privacy-policy.md (rewrite - health data)
│   │   ├── data-protection-policy.md (rewrite - Article 9)
│   │   ├── data-breach-response-plan.md (adapt - clinical)
│   │   ├── subject-access-request-procedure.md (adapt - clinical records)
│   │   ├── information-security-policy.md (adapt - clinical systems)
│   │   ├── data-processing-agreement-template.md (copy)
│   │   └── dpia-template.md (copy)
│   ├── legal/
│   │   ├── terms-of-service.md (rewrite - clinical services)
│   │   ├── professional-standards.md (new - GMC/HCPC/BACP)
│   │   └── acceptable-use-policy.md (adapt - clinical platform)
│   └── external/
│       ├── clinical-supervision-policy.md (copy, adapt)
│       ├── health-sla.md (copy, adapt)
│       └── complaints-policy.md (adapt - CQC reporting)
│
└── POLICY_CATEGORIZATION.md (this file)
```

---

## Summary Status

### ✅ Completed
- Clear Minds: Privacy Policy (REWRITTEN)
- Clear Minds: Data Protection Policy (REWRITTEN)
- Folder structure created

### ⚠️ In Progress
- Clear Minds: Remaining policies need adaptation
- Concierge Health: All policies need creation/adaptation

### ❌ Not Started
- Concierge Health: Complete policy set
- .docx conversion of final policies

---

## Next Steps

1. **Copy B2B community policies to Clear Minds folder** (8 files, as-is)
2. **Adapt remaining Clear Minds policies** (legal, external, data governance)
3. **Create/adapt Concierge Health policies** (clinical, data governance, legal)
4. **Convert final .md files to .docx** using Pandoc
5. **Upload to Google Drive** for editing

---

## Key Differences Summary

| Aspect | Clear Minds | Concierge Health |
|--------|-------------|------------------|
| **Service Type** | Digital wellness platform | CQC-registered medical services |
| **Data Collection** | Name + Email ONLY | Full health data, medical records |
| **Data Classification** | Sensitive (NOT special category) | Special category health data (Article 9) |
| **Legal Basis** | Contract (Art 6(1)(b)) | Explicit consent + Health/social care (Art 9(2)(h)) |
| **Regulatory** | NOT CQC, NOT medical | CQC-registered partner network |
| **Payment** | Shopify/App Stores | Direct billing, insurance |
| **Clinical Records** | NONE (listening history only) | 8+ years clinical records retention |
| **Professional Standards** | Content quality, moderation | GMC, HCPC, BACP professional codes |
| **Safeguarding** | Community moderation | Clinical safeguarding protocols |
| **Referral Pathway** | TO Concierge Health | FROM Clear Minds |

---

**Document Control**

Created: [DATE]
Version: 1.0
Owner: Tom Cassidy (CIO/DPO)

© 2025 Clear Minds Ltd & Concierge Health
