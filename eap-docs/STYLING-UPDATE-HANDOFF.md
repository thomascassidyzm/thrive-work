# 🎨 POLICY STYLING UPDATE - HANDOFF BRIEF

## 📋 Task Overview

Update remaining ClearMinds policy HTML files to match the improved consistent styling. The user prefers the **newer style** with white headings in the gradient header (not the older blue headings).

---

## ✅ What's Been Completed (6 files)

These files have the **CORRECT styling** to replicate:

### **Reference Files (Use These as Templates):**
1. `/policies/data-governance/data-protection-policy.html` ⭐ **BEST REFERENCE**
2. `/policies/data-governance/privacy-policy.html`
3. `/policies/data-governance/information-security-policy.html`
4. `/policies/data-governance/cookie-policy.html`
5. `/policies/data-governance/staff-quick-reference-guide.html`
6. `/policies/external/ai-usage-policy.html`

---

## 🎯 Files That Need Updating

### **External Policies** (2 files)
Location: `/policies/external/`
- `health-service-level-agreement.html`
- `group-sla-policy.html`

### **Internal Policies** (13 files)
Location: `/policies/internal/`
- `capability-policy.html`
- `disciplinary-procedure.html`
- `drugs-alcohol-policy.html`
- `edi-policy.html`
- `employee-handbook.html`
- `expenses-policy.html`
- `flexible-working-policy.html`
- `grievance-policy.html`
- `holiday-policy.html`
- `hybrid-working-policy.html`
- `performance-appraisal-policy.html`
- `recruitment-policy.html`
- `training-policy.html`

### **Data Governance** (8 files)
Location: `/policies/data-governance/`
- `data-breach-response-plan.html`
- `data-retention-policy.html`
- `subject-access-request-procedure.html`
- `record-of-processing-activities-ropa.html`
- `dpia-template.html`
- `data-processing-agreement-template.html`

Location: `/policies/data-governance/forms/`
- `data-breach-report-form.html`
- `subject-access-request-form.html`

**Total to update: 23 files**

---

## 🎨 Styling Requirements

### **Key Visual Elements:**

1. **Header Section:**
   - Linear gradient background: `linear-gradient(135deg, #007a87 0%, #0d3b3e 100%)`
   - **WHITE text for h1 heading** (not blue!) - this is critical
   - White "Back to Policies" link with color `#dff4da`
   - Subtitle in color `#bedee1`
   - Padding: `60px 0`

2. **Policy Meta Box:**
   - Background: `#dff4da` (light green)
   - Border-left: `4px solid #007a87`
   - h4 headings in `#007a87`
   - Clean, simple layout

3. **Content Area:**
   - White background with subtle shadow
   - h2 headings in `#007a87` with border-bottom `2px solid #dff4da`
   - h3 headings in `#0d3b3e`
   - Consistent spacing

4. **Highlight Boxes:**
   - Background: `#fffbf5`
   - Border-left: `4px solid #81b7a8`
   - Used for important callouts

---

## 📝 Complete Style Template

Use this exact CSS (already tested and approved):

```css
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; background: #fffbf5; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

.policy-header {
    background: linear-gradient(135deg, #007a87 0%, #0d3b3e 100%);
    color: white;
    padding: 60px 0;
    margin-bottom: 40px;
}
.policy-header a {
    color: #dff4da;
    text-decoration: none;
    display: inline-block;
    margin-bottom: 20px;
}
.policy-header h1 {
    color: white;  /* CRITICAL: Must be white, not blue! */
    font-size: 3rem;
    margin-bottom: 10px;
}
.policy-header .subtitle {
    color: #bedee1;
    font-size: 1.2rem;
}

.policy-meta {
    background: #dff4da;
    padding: 20px;
    border-radius: 8px;
    margin: 30px 0;
    border-left: 4px solid #007a87;
}
.policy-meta h4 {
    color: #007a87;
    margin: 0 0 15px 0;
    font-size: 1.2rem;
}
.policy-meta p {
    margin: 5px 0;
    color: #333;
}

.policy-content {
    background: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    margin-bottom: 30px;
}
.policy-content h2 {
    color: #007a87;
    font-size: 2rem;
    margin: 40px 0 20px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #dff4da;
}
.policy-content h3 {
    color: #0d3b3e;
    font-size: 1.5rem;
    margin: 30px 0 15px 0;
}
.policy-content p {
    line-height: 1.8;
    color: #333;
    margin-bottom: 15px;
}
.policy-content ul, .policy-content ol {
    margin: 15px 0 15px 30px;
    line-height: 1.8;
}
.policy-content li {
    margin-bottom: 10px;
}

.highlight-box {
    background: #fffbf5;
    border-left: 4px solid #81b7a8;
    padding: 20px;
    margin: 20px 0;
    border-radius: 4px;
}
.highlight-box h4 {
    color: #007a87;
    margin-top: 0;
}

.alert-box {
    background: #fff3cd;
    border-left: 4px solid #ffc107;
    padding: 20px;
    margin: 20px 0;
    border-radius: 4px;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
}
th, td {
    padding: 12px;
    text-align: left;
    border: 1px solid #e0e0e0;
}
th {
    background: #007a87;
    color: white;
    font-weight: 600;
}
tr:nth-child(even) {
    background: #f8f9fa;
}

.footer {
    margin-top: 40px;
    padding: 20px 0;
    border-top: 2px solid #e0e0e0;
    text-align: center;
    color: #666;
    font-size: 0.9rem;
}

@media print {
    body { background: white; }
    .policy-header { background: #007a87 !important; -webkit-print-color-adjust: exact; }
}
@media (max-width: 768px) {
    .policy-header h1 { font-size: 2rem; }
    .policy-content { padding: 20px; }
}
```

---

## 📐 HTML Structure Template

```html
<!DOCTYPE html>
<html lang="en-GB">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Policy Name] - ClearMinds</title>
    <style>
        /* Paste the CSS template above */
    </style>
</head>
<body>
    <div class="policy-header">
        <div class="container">
            <a href="../index.html">← Back to Policies</a>
            <h1>[Policy Name]</h1>
            <p class="subtitle">[Subtitle/Description]</p>
        </div>
    </div>

    <div class="container">
        <div class="policy-meta">
            <h4>Policy Information</h4>
            <p><strong>Policy Owner:</strong> [Owner]</p>
            <p><strong>Effective Date:</strong> [Date]</p>
            <p><strong>Review Date:</strong> [Date]</p>
            <p><strong>Version:</strong> 1.0</p>
            <p><strong>Applies To:</strong> [Scope]</p>
        </div>

        <div class="policy-content">
            <!-- Keep existing content structure -->
            <!-- Just update the styling -->
        </div>

        <div class="footer">
            <p><strong>Document Control</strong></p>
            <p>[Footer info]</p>
            <p>&copy; 2024 ClearMinds. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
```

---

## 🔧 Step-by-Step Process

For each file:

1. **Read the existing file** using `Filesystem:read_file`
2. **Preserve ALL content** - only change the styling/structure
3. **Replace the `<style>` section** with the template above
4. **Update HTML structure** to match the template
5. **Ensure h1 in header is WHITE** (color: white;)
6. **Keep all existing policy content** exactly as written
7. **Save with `Filesystem:write_file`**

---

## ⚠️ Critical Requirements

### **DO:**
- ✅ Use white h1 headings in the gradient header
- ✅ Keep ALL existing policy content unchanged
- ✅ Use the exact CSS template provided
- ✅ Maintain proper file paths (../index.html for navigation)
- ✅ Keep responsive design (@media queries)
- ✅ Test that all styling matches the reference files

### **DON'T:**
- ❌ Change any policy content/wording
- ❌ Use blue headings in the header
- ❌ Remove any sections or information
- ❌ Change file names or locations
- ❌ Add external CSS links (keep styles inline)

---

## 🎯 Quality Check

After updating each file, verify:
- [ ] Header has white h1 (not blue)
- [ ] Gradient background on header
- [ ] Light green policy-meta box
- [ ] White content area with shadow
- [ ] Consistent spacing
- [ ] All original content preserved
- [ ] Footer included
- [ ] Responsive design works

---

## 📁 File Locations

**Base directory:** `/Users/tomcassidy/thrive/thrive-work/eap-docs/policies/`

**Reference files (CORRECT styling):**
- `/policies/data-governance/data-protection-policy.html` ⭐ BEST TEMPLATE
- `/policies/data-governance/privacy-policy.html`

**Files to update:**
- `/policies/external/[filename].html` (2 files)
- `/policies/internal/[filename].html` (13 files)
- `/policies/data-governance/[filename].html` (6 files)
- `/policies/data-governance/forms/[filename].html` (2 files)

---

## 💬 User Feedback

User confirmed:
- ✅ New styling is "perfect"
- ✅ Prefers white headings over blue
- ✅ New styling is "a little better" than original
- ✅ Wants all policies to match this consistent style

---

## 🚀 Suggested Approach

**Efficient batch processing:**

1. Start with External Policies (2 files - quick wins)
2. Then Internal Policies (13 files - most impactful)
3. Finally Data Governance remaining (8 files)

**Or priority order:**
1. Employee Handbook (internal - most used)
2. Health SLA (external - B2B critical)
3. Data Breach Response Plan (governance - operational)
4. Then remaining files in any order

---

## 📊 Progress Tracker

```
✅ Completed (6/29):
- Data Protection Policy
- Privacy Policy
- Information Security Policy
- Cookie Policy
- Staff Quick Reference Guide
- AI Usage Policy

🔄 Remaining (23/29):
- 2 External
- 13 Internal
- 8 Data Governance

Target: 29/29 complete
```

---

## 🎓 Example Comparison

**OLD STYLE (don't use):**
```html
<h1 style="color: #007a87;">Policy Name</h1>
```

**NEW STYLE (use this):**
```html
<h1 style="color: white;">Policy Name</h1>
```

Or in CSS:
```css
.policy-header h1 {
    color: white;  /* Not #007a87 */
}
```

---

## ✅ Ready to Go!

This brief contains everything needed to complete the styling updates. Simply:

1. Read a file from the "Files to update" list
2. Apply the CSS template (keeping all content)
3. Ensure h1 is WHITE in the header
4. Save and move to next file

**Reference file for any questions:**
`/policies/data-governance/data-protection-policy.html`

---

**Created:** October 2024  
**Task:** Update 23 remaining policy files to match improved styling  
**Priority:** Medium (cosmetic improvement, no content changes)  
**Time Estimate:** 15-20 minutes for all files  

Good luck! 🎨