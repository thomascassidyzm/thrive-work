# Policy Separation: Clear Minds vs Concierge Health

## Overview

This folder contains separated and adapted policies for two distinct entities:

1. **Clear Minds** - Digital wellness platform (non-medical)
2. **Concierge Health** - CQC-registered medical services network

---

## Why Separate?

### Legal Separation Strategy

**Clear Minds** and **Concierge Health** operate as separate entities to:

✅ **Protect Clear Minds** from medical service regulation and liability
✅ **Protect Users** from confusion about what is/isn't medical care
✅ **Enable Clear Minds** to operate as a lightweight digital platform
✅ **Enable Concierge Health** to provide full clinical services under CQC regulation

### The Boundary

| Aspect | Clear Minds | Concierge Health |
|--------|-------------|------------------|
| **What it is** | Digital hypnotherapy audio + community | Medical/therapeutic in-person services |
| **Data collected** | Name + Email ONLY | Full health data, medical records |
| **Regulatory status** | NOT CQC-registered, NOT medical | CQC-registered partner network |
| **Payment** | Shopify/App Stores | Direct billing, insurance |
| **Relationship** | Refers TO Concierge | Receives referrals FROM Clear Minds |

---

## Progress Status

### ✅ Clear Minds - COMPLETED

| Category | Files | Status |
|----------|-------|--------|
| **B2B Community** | 9 files | ✅ Copied as-is |
| **Data Governance** | 2 core files | ✅ Rewritten (privacy-policy.md, data-protection-policy-clearminds.md) |
| **Data Governance** | 5 remaining | ⚠️ Need adaptation |
| **Legal** | 4 files | ⚠️ Need adaptation |
| **External** | 3 files | ⚠️ Need adaptation |

### ❌ Concierge Health - TO DO

| Category | Files | Status |
|----------|-------|--------|
| **Clinical** | 5 files | ❌ Need adaptation for CQC partner network |
| **Data Governance** | 7 files | ❌ Need creation/adaptation for health data |
| **Legal** | 3 files | ❌ Need creation for clinical services |
| **External** | 3 files | ❌ Need adaptation for clinical SLAs |

---

## Next Steps

### Phase 1: Complete Clear Minds Policies ⚠️ IN PROGRESS

1. Adapt data governance policies (5 files)
2. Adapt legal policies (4 files)
3. Adapt external policies (3 files)

### Phase 2: Create Concierge Health Policies ❌ NOT STARTED

1. Adapt clinical policies for CQC partner network model (5 files)
2. Rewrite data governance for special category health data (7 files)
3. Create clinical services legal framework (3 files)
4. Adapt external policies for clinical SLAs (3 files)

### Phase 3: Convert to Google Docs Format ❌ NOT STARTED

1. Run Pandoc conversion on all final .md files → .docx
2. Upload to Google Drive
3. Open in Google Docs (automatic formatting conversion)

---

## Key Documents

### Clear Minds

✅ **Completed:**
- `/clearminds/data-governance/privacy-policy.md` - Minimal data collection model
- `/clearminds/data-governance/data-protection-policy-clearminds.md` - Sensitive data (NOT special category)
- `/clearminds/b2b-community/*` - All 9 B2B/community policies

⚠️ **To Do:**
- Medical disclaimer (strengthen boundaries, add Concierge referral)
- Terms of Service (clarify NOT medical, referral pathway)
- SAR procedure, breach response, security policy (simplified versions)

### Concierge Health

❌ **All to be created/adapted**

---

## File Locations

```
/policies-separated/
├── README.md (this file)
├── POLICY_CATEGORIZATION.md (detailed categorization)
├── clearminds/
│   ├── b2b-community/ ✅ (9 files)
│   ├── data-governance/ ✅ (2/7 done)
│   ├── legal/ ❌ (0/4 done)
│   └── external/ ❌ (0/3 done)
└── concierge-health/
    ├── clinical/ ❌ (0/5 done)
    ├── data-governance/ ❌ (0/7 done)
    ├── legal/ ❌ (0/3 done)
    └── external/ ❌ (0/3 done)
```

---

## Conversion Script

When policies are complete, run:

```bash
cd /Users/tomcassidy/thrive/thrive-work/corporate/policies-separated

# Convert Clear Minds policies
find clearminds -name "*.md" -type f -exec sh -c '
  for file; do
    dir=$(dirname "$file")
    base=$(basename "$file" .md)
    pandoc "$file" -o "${dir}/${base}.docx" --standalone
    echo "✓ $file → ${dir}/${base}.docx"
  done
' sh {} +

# Convert Concierge Health policies (when ready)
find concierge-health -name "*.md" -type f -exec sh -c '
  for file; do
    dir=$(dirname "$file")
    base=$(basename "$file" .md)
    pandoc "$file" -o "${dir}/${base}.docx" --standalone
    echo "✓ $file → ${dir}/${base}.docx"
  done
' sh {} +
```

---

## References

- **CDO Data Governance Position:** `/Users/tomcassidy/thrive/thrive-work/cdo_data_governance_position.md`
- **Care Quality Governance Framework:** `/Users/tomcassidy/thrive/thrive-work/Care Quality Governance Framework V2.pdf`
- **Original Policies:** `/Users/tomcassidy/thrive/thrive-work/corporate/policies/`

---

**Document Control**

Created: 2025-11-12
Version: 1.0
Owner: Tom Cassidy (CIO)

© 2025 Clear Minds Ltd & Concierge Health
