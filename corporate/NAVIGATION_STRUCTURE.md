# ClearMinds Corporate Documentation - Navigation Structure

## 📁 Folder Structure for Delivery

This folder contains all governance documentation ready for standalone deployment.

### Root Entry Point
- **`/corporate/index.html`** - Care Quality Governance Framework (PRIMARY LANDING PAGE)
  - Link from clearminds.business homepage should point here
  - Contains full framework overview with 6 governance components

### Documentation Hub
- **`/corporate/documentation/index.html`** - Policy documentation hub
  - Accessible from framework page
  - Overview of all 4 policy categories

### Policy Categories
1. **`/corporate/policies/external/index.html`** - External Policies & SLAs (5 policies)
   - Group SLA, Health SLA, AI Usage, Complaints, Clinical Supervision
   
2. **`/corporate/policies/data-governance/index.html`** - Data Governance (7 policies)
   - GDPR, Data Protection, Breach Response, Privacy, Security, DPA, DPIA, SAR

3. **`/corporate/policies/clinical/index.html`** - Clinical Governance (5 policies)
   - Safeguarding, Infection Control, Consent, Dignity, Duty of Candour

4. **`/corporate/policies/legal/index.html`** - Legal & Compliance (4 policies)
   - Terms of Service, Acceptable Use, Medical Disclaimer, Results Disclaimer

### Presentation Decks
- **`/corporate/deck/index.html`** - Deck selector
- **`/corporate/deck/landscape.html`** - Landscape presentation (A4 297x210mm)
- **`/corporate/deck/portrait.html`** - Portrait presentation (A4 210x297mm)

### Additional Pages
- **`/corporate/landing.html`** - Original corporate landing page
- **`/corporate/css/style.css`** - Shared stylesheet

---

## ✅ Link Verification Status

### Internal Links
- ✅ All policy back links corrected (`href="index.html"`)
- ✅ Documentation hub framework link updated to root
- ✅ All breadcrumb navigation verified
- ✅ All cross-references between policies checked

### External Links
- ✅ ICO: https://ico.org.uk/
- ✅ CQC: https://www.cqc.org.uk/
- ✅ Email: dpo@clearmindseap.com

### Relative Paths
All links use proper relative paths for standalone folder operation:
- From policy files to category index: `href="index.html"`
- From category index to doc hub: `href="../../documentation/index.html"`
- From doc hub to framework root: `href="../index.html"`
- From framework root to doc hub: `href="documentation/index.html"`

---

## 🔗 Recommended Link from clearminds.business

**Primary Link:**
```html
<a href="https://thrive-work.vercel.app/corporate/">
  View Our Care Quality Governance Framework
</a>
```

This links directly to the governance framework, which then provides navigation to all documentation.

---

## 📊 Document Count

- **1** Governance Framework (root)
- **1** Documentation Hub
- **4** Policy Category Indexes
- **21** Individual Policy Documents
- **3** Presentation Deck Pages
- **Total: 30 HTML files + shared CSS**

---

## 🧪 Navigation Testing

To verify all links work:

1. Start at `/corporate/index.html` (framework)
2. Click "View Full Documentation Hub" → should reach `/corporate/documentation/index.html`
3. Click any category button → should reach category index
4. Click any policy → should reach individual policy
5. Click "← Back to Policies" → should return to category index
6. Click breadcrumb "Documentation" → should return to hub
7. Click breadcrumb "Home" → should return to framework root

All paths verified ✅ (2025-10-08)

---

Generated: October 2025
Last Updated: Q4 2025
