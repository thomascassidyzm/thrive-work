# ClearMinds Corporate Partnership Documentation Microsite

## What This Is

A comprehensive documentation package for insurance partners evaluating ClearMinds Corporate offering. Contains 6 key documents covering governance, compliance, and partnership details.

This microsite is designed to be:
- **Offline-capable** - No internet connection required
- **Print-friendly** - Professional PDF output with proper page breaks
- **Easy to navigate** - Simple HTML with table of contents
- **Professional** - Clean, accessible design

---

## How to Use

### Viewing Locally

1. Navigate to the `eap-docs` folder
2. Open `index.html` in any web browser (Chrome, Firefox, Safari, Edge)
3. Click on any document card to view that document
4. Use breadcrumb navigation and prev/next links to navigate between documents
5. **No internet connection required** - all resources are local

### Printing to PDF

1. Open any document page in your browser
2. Click the "Print this page" button, or use keyboard shortcut:
   - **Mac:** Cmd + P
   - **Windows/Linux:** Ctrl + P
3. In the print dialog, select "Save as PDF" as your printer destination
4. Click Save/Print
5. The PDF will have:
   - Proper page breaks (no orphaned headings)
   - Page numbers in footer
   - Clean, professional formatting
   - All checkboxes and tables visible

### Sharing

**As Files:**
- Zip the entire `eap-docs` folder
- Email or share via file transfer
- Recipient unzips and opens `index.html`

**As Website:**
- Upload the entire `eap-docs` folder to any web hosting service
- Share the URL to `index.html`
- Works on any standard web server (no special configuration needed)

**For Meetings:**
- Open locally on laptop
- Navigate during presentation
- Print to PDF beforehand for handouts

---

## Editing Content

### Filling in Placeholders

All documents contain placeholder text marked with `[PLACEHOLDER]` or `[INSERT...]`. To complete the documents:

1. Open the HTML file you want to edit in any text editor (VS Code, Sublime, Notepad++, etc.)
2. Search for `[` to find all placeholders
3. Replace placeholder text with your actual information
4. Save the file
5. Refresh in browser to see changes

**Common Placeholders:**
- `[NAME]` - Replace with person's name
- `[DATE]` - Replace with actual date
- `[INSERT DESCRIPTION]` - Replace with your specific content
- `[CONTACT]` - Replace with contact information

### Checking Checkboxes

To mark a checkbox as checked in the HTML:

**Before:**
```html
<input type="checkbox"> Task completed
```

**After:**
```html
<input type="checkbox" checked> Task completed
```

### Updating Tables

Tables are formatted in standard HTML. Find the table and edit the cell contents:

```html
<tr>
    <td>Information</td>
    <td>Replace this content</td>
    <td><input type="checkbox"> Status</td>
</tr>
```

---

## File Structure

```
eap-docs/
├── index.html                          # Homepage with navigation cards
├── docs/                               # All document pages
│   ├── master-action-plan.html         # Strategic overview
│   ├── clinical-governance-framework.html  # Safety & quality protocols
│   ├── medical-compliance-statement.html   # Regulatory positioning
│   ├── ssm-partnership.html            # Clinical pathway integration
│   ├── implementation-guide.html       # 4-week plan
│   └── two-week-sprint.html            # Urgent deadline plan
├── css/                                # Styling
│   ├── style.css                       # Screen/web styling
│   └── print.css                       # Print/PDF styling
└── README.md                           # This file
```

---

## Documents Included

### 1. Master Action Plan
**Filename:** `master-action-plan.html`
**Purpose:** Strategic overview of all 9 documents needed, timeline, and completion tracking

**Key Sections:**
- Executive Summary
- Phase 1: Immediate Priorities (Docs A, B, C)
- Phase 2: Standard Due Diligence (Docs D, E, F)
- Phase 3: Enhanced Positioning (Docs G, H, I)
- Key Information to Gather
- Meeting Preparation Checklist
- Critical Success Factors
- Timeline Overview
- Next Steps

### 2. Clinical Governance Framework
**Filename:** `clinical-governance-framework.html`
**Purpose:** Complete framework for content quality, user safety, escalation pathways, and incident management

**Key Sections:**
- Content Creation & Quality Assurance
- User Safety Protocols
- Escalation & Referral Pathways
- Live Chat Support Protocols
- Incident Reporting & Management
- Complaints Handling
- Continuous Quality Improvement
- Regulatory Compliance
- Governance Structure

### 3. Medical Compliance Statement
**Filename:** `medical-compliance-statement.html`
**Purpose:** Regulatory positioning, advertising compliance, evidence base, and safety protocols

**Key Sections:**
- Regulatory Classification (NOT a Medical Device)
- Claims & Advertising Compliance (ASA)
- Disclaimer Framework
- Evidence Base
- Clinical Pathway Integration
- User Safety & Informed Consent
- Data Protection & Confidentiality
- Professional Standards & Ethics
- Quality Assurance & Compliance Monitoring

**Includes:** Pre-filled CQC information for Smart Start Minds

### 4. Smart Start Minds Partnership
**Filename:** `ssm-partnership.html`
**Purpose:** Partnership structure, clinical referral pathways, CQC credentials, and quality assurance

**Key Sections:**
- Partner Overview (with verified CQC registration details)
- Partnership Structure & Roles
- Clinical Referral Pathway (step-by-step)
- Data Protection & Information Governance
- Quality Assurance & Governance
- User Experience & Support
- Insurance Partner Assurance
- Continuous Improvement

**Pre-filled Data:**
- CQC Provider ID: 1-2950268195
- CQC Location ID: 1-3947887340
- Rating: GOOD
- Medical Director: Dr. Thomas Dannhauser

### 5. Implementation Guide
**Filename:** `implementation-guide.html`
**Purpose:** 4-week implementation plan with detailed checklists and progress tracking

**Key Sections:**
- Priority 1: Essential Documents (Weeks 1-2)
- Priority 2: Standard Due Diligence (Weeks 2-3)
- Priority 3: Enhanced Positioning (Weeks 3-4)
- Key Information to Gather (comprehensive tables)
- Meeting Preparation Checklist
- Critical Success Factors
- 4-Week Timeline Overview
- Next Steps

### 6. 2-Week Sprint Plan
**Filename:** `two-week-sprint.html`
**Purpose:** Day-by-day action plan for urgent 2-week deadline to partner meeting

**Key Sections:**
- Critical Success Criteria
- Day-by-Day Action Plan (all 14 days detailed)
- Critical Path Items
- Quick Wins
- Emergency Protocols
- Daily Stand-up Template
- Quick Checklist (print-friendly)
- Survival Tips
- Meeting Day Checklist
- Follow-up Email Template

---

## Technical Details

### Browser Compatibility
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Any modern browser with CSS Grid support

### Print Compatibility
- ✅ Chrome/Edge: Excellent PDF output
- ✅ Firefox: Good PDF output
- ✅ Safari: Good PDF output
- ⚠️ For best results, use Chrome/Edge for PDF generation

### No Dependencies
- No JavaScript required
- No external CDNs
- No internet connection needed
- No server-side processing
- Pure HTML + CSS

### Accessibility
- Semantic HTML structure
- Keyboard navigable
- Screen reader compatible
- High contrast text
- Responsive design (mobile, tablet, desktop)

---

## Customization

### Changing Colors

Edit `css/style.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #2563eb;      /* Main brand color */
    --text-color: #1f2937;         /* Body text */
    --border-color: #e5e7eb;       /* Borders */
    /* ... more variables ... */
}
```

### Adding Your Logo

1. Add your logo image file to the folder (e.g., `logo.png`)
2. Edit `index.html` and add before the `<h1>` tag:

```html
<img src="logo.png" alt="Company Logo" style="max-width: 200px; margin-bottom: 1rem;">
```

3. Repeat for each document page if desired

### Changing Fonts

Edit `css/style.css` and modify the `body` font-family:

```css
body {
    font-family: "Your Font", -apple-system, BlinkMacSystemFont, sans-serif;
    /* ... */
}
```

---

## Troubleshooting

### PDFs look different than browser view
- This is normal - print styles remove navigation and apply page breaks
- Use Print Preview to see how PDF will look before saving

### Checkboxes don't work in PDF
- Checkboxes in PDF are visual only (not interactive)
- Check them in HTML before printing, or print and check by hand

### Navigation links don't work
- Make sure you're opening `index.html` first
- Check that all files are in the correct folders
- Ensure file/folder names match exactly (case-sensitive on some systems)

### Styles not loading
- Make sure `css` folder is in the same directory as `index.html`
- Check browser console for errors (F12 key)
- Try hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

---

## Support

For questions or issues with this documentation package, contact:

**Document Owner:** [YOUR NAME]
**Email:** [YOUR EMAIL]
**Phone:** [YOUR PHONE]

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | [DATE] | Initial release | [NAME] |

---

## License & Usage

This documentation package is for internal business use in partnership discussions with insurance providers. All content is confidential and proprietary.

**Do not:**
- Share publicly
- Modify for other purposes without authorization
- Remove confidential information markers

**Do:**
- Share with prospective partners under NDA
- Customize with your organization's specific information
- Print and distribute in partnership meetings
- Use as template for future partnership documentation

---

**Last Updated:** [DATE]
**Package Version:** 1.0
**Created with:** HTML5, CSS3 (no frameworks or dependencies)
