# Policy Separation Project - Status Summary

**Last Updated:** 2025-11-12
**Project:** Separate Clear Minds (digital wellness) from Concierge Health (CQC clinical services)

---

## ✅ COMPLETED: Clear Minds Policies

### B2B Community (9 files) - 100% Complete
All files copied as-is (already appropriate):
- ✅ 1-employer-non-snooping-agreement.md
- ✅ 2-facebook-community-terms-of-service.md
- ✅ 3-facebook-group-rules-pinned-post.md
- ✅ 4-user-warning-consent-flow.md
- ✅ 5-enhanced-moderator-protocols.md
- ✅ 6-employee-privacy-notice.md
- ✅ 7-towergate-pitch-deck.md
- ✅ 8-community-risk-assessment.md
- ✅ README.md

### Legal (4 files) - 100% Complete
- ✅ **medical-disclaimer.md** - REWRITTEN (clear boundaries, Concierge referral pathway)
- ✅ **terms-of-service.md** - REWRITTEN (digital platform, NOT medical service)
- ✅ **acceptable-use-policy.md** - ADAPTED (community guidelines, digital platform)
- ✅ **results-disclaimer.md** - COPIED (already appropriate)

### Data Governance (4 files) - 100% Complete
- ✅ **privacy-policy.md** - REWRITTEN (minimal data: name + email only)
- ✅ **data-protection-policy-clearminds.md** - REWRITTEN (sensitive data, NOT special category)
- ✅ **data-processing-agreement-template.md** - COPIED (template, needs customization)
- ✅ **dpia-template.md** - COPIED (template, needs customization)

### Remaining Data Governance (3 files) - ⚠️ TO DO
- ⚠️ data-breach-response-plan.md - NEEDS ADAPTATION (simplified for name/email)
- ⚠️ subject-access-request-procedure.md - NEEDS ADAPTATION (simple CSV export)
- ⚠️ information-security-policy.md - NEEDS ADAPTATION (Cyber Essentials Plus focus)

### External (3 files) - ⚠️ TO DO
- ⚠️ ai-usage-policy.md - NEEDS ADAPTATION (AI chat, content creation)
- ⚠️ complaints-policy.md - NEEDS ADAPTATION (digital service complaints)
- ⚠️ group-sla.md - NEEDS ADAPTATION (B2B SLA for digital platform)

---

## Clear Minds Summary

**Status:** ~70% Complete (17/23 policies done)

**Key Achievements:**
- ✅ Core identity established (digital wellness, NOT medical)
- ✅ Data protection framework (minimal collection, name + email only)
- ✅ Legal boundaries clarified (NOT CQC, referral to Concierge Health)
- ✅ B2B confidentiality framework (Zero Individual Visibility)

**Remaining Work:**
- ⚠️ 3 data governance policies (simplified versions)
- ⚠️ 3 external policies (adapted for digital platform)

---

## ❌ TO DO: Concierge Health Policies

### Clinical (5 files) - 0% Complete
Need adaptation for CQC partner network model:
- ❌ consent-capacity-policy.md
- ❌ dignity-respect-policy.md
- ❌ duty-of-candour-policy.md
- ❌ infection-control-policy.md
- ❌ safeguarding-adults-policy.md

### Data Governance (7 files) - 0% Complete
Need creation/adaptation for special category health data:
- ❌ privacy-policy.md (REWRITE - health data)
- ❌ data-protection-policy.md (REWRITE - Article 9)
- ❌ data-breach-response-plan.md (ADAPT - clinical data)
- ❌ subject-access-request-procedure.md (ADAPT - clinical records)
- ❌ information-security-policy.md (ADAPT - NHS integration)
- ❌ data-processing-agreement-template.md (COPY)
- ❌ dpia-template.md (COPY)

### Legal (3 files) - 0% Complete
Need creation for clinical services:
- ❌ terms-of-service.md (REWRITE - clinical, CQC registration)
- ❌ professional-standards.md (NEW - GMC/HCPC/BACP codes)
- ❌ acceptable-use-policy.md (ADAPT - clinical platform)

### External (3 files) - 0% Complete
Need adaptation for clinical SLAs:
- ❌ clinical-supervision-policy.md (COPY, ADAPT)
- ❌ health-sla.md (COPY, ADAPT)
- ❌ complaints-policy.md (ADAPT - CQC reporting)

---

## Concierge Health Summary

**Status:** 0% Complete (0/18 policies done)

**Key Requirements:**
- CQC-registered partner network model
- Special category health data (Article 9)
- Clinical records retention (8+ years)
- Professional standards (GMC, HCPC, BACP)
- Receives referrals FROM Clear Minds

---

## Overall Project Status

**Total Policies:** 41 (23 Clear Minds + 18 Concierge Health)
**Completed:** 17 (41%)
**Remaining:** 24 (59%)

### Breakdown:
- ✅ Clear Minds: 17/23 (74%)
- ❌ Concierge Health: 0/18 (0%)

---

## Next Steps

### Phase 1: Complete Clear Minds (6 policies remaining)
1. Adapt data-breach-response-plan.md
2. Adapt subject-access-request-procedure.md
3. Adapt information-security-policy.md
4. Adapt ai-usage-policy.md
5. Adapt complaints-policy.md
6. Adapt group-sla.md

**Estimated Time:** 2-3 hours

### Phase 2: Create Concierge Health Policies (18 policies)
1. Clinical policies (5 files) - adapt for CQC partner network
2. Data governance (7 files) - rewrite for health data
3. Legal (3 files) - create clinical framework
4. External (3 files) - adapt for clinical SLAs

**Estimated Time:** 6-8 hours

### Phase 3: Convert to .docx and Upload
1. Run `./CONVERSION_SCRIPT.sh`
2. Upload all .docx files to Google Drive
3. Open with Google Docs (auto-converts formatting)
4. Final review and customization

**Estimated Time:** 1 hour

---

## File Locations

**Separated Policies:** `/Users/tomcassidy/thrive/thrive-work/corporate/policies-separated/`
**Original Policies:** `/Users/tomcassidy/thrive/thrive-work/corporate/policies/`
**Original .docx:** `/Users/tomcassidy/thrive/thrive-work/corporate/policies-docx/`

---

## Key Documents Created

1. **POLICY_CATEGORIZATION.md** - Detailed categorization of all 29 original policies
2. **README.md** - Overview and next steps
3. **CONVERSION_SCRIPT.sh** - Automated Pandoc conversion to .docx
4. **STATUS_SUMMARY.md** - This file (progress tracking)

---

## Commands

### Convert Clear Minds policies to .docx:
```bash
cd /Users/tomcassidy/thrive/thrive-work/corporate/policies-separated
./CONVERSION_SCRIPT.sh
```

### List all Clear Minds policies:
```bash
find clearminds -name "*.md" -type f ! -name "README.md"
```

### Count completed policies:
```bash
find clearminds -name "*.md" -type f ! -name "README.md" | wc -l
```

---

## Success Criteria

### Clear Minds Policies Must:
- ✅ Clarify NOT a medical service
- ✅ Emphasize minimal data collection (name + email only)
- ✅ Establish referral pathway to Concierge Health
- ✅ Protect B2B employee confidentiality (Zero Individual Visibility)
- ✅ Reflect digital-only platform (no in-person services)

### Concierge Health Policies Must:
- ❌ Establish CQC-registered partner network model
- ❌ Implement special category health data protections (Article 9)
- ❌ Define clinical records retention (8+ years)
- ❌ Reference professional standards (GMC, HCPC, BACP)
- ❌ Clarify referral relationship with Clear Minds (receives referrals)

---

**Document Control**

Created: 2025-11-12
Version: 1.0
Owner: Tom Cassidy (CIO/DPO)

© 2025 Clear Minds Ltd & Concierge Health
