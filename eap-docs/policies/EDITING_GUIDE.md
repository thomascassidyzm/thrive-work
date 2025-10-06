# Quick Editing Guide for Tomorrow

## 🎯 Priority Edits (30 minutes)

### 1. Update Contact Information
Search and replace these placeholders across all files:

**Main Index (index.html)**
- `[INSERT CONTACT DETAILS]` → Your actual contact info
- `[DATE]` → Current date
- `[NAME]` → Document owner name

**All Policy Files**
- `support@clearminds.com` → Real support email
- `hr@clearminds.com` → Real HR email
- `partnerships@clearminds.com` → Real partnerships email
- `dpo@clearminds.com` → Real Data Protection Officer email
- `+44 (0) 20 XXXX XXXX` → Real phone number

### 2. Verify Dates
All policies dated **July 2025**. Update to actual effective dates.

### 3. Check Key Numbers
- Holiday entitlement: Currently 28 days (verify)
- Training budget: Currently £1,000/person (verify)
- Probation period: Currently 6 months (verify)
- Notice periods: Currently 1 month (verify)
- Salary increases/pension: Verify actual figures

---

## 📝 Content Enhancement (1-2 hours)

### External Policies (Most Important for Partners)

**AI Usage Policy**
- Section 8.1: Add actual responsible party names
- Section 10.2: Confirm which legislation you're complying with
- Add specific examples of AI tools you use (ChatGPT, Claude, etc.)

**Health SLA**
- Section 3.1: Verify uptime targets are achievable
- Section 4.1: Confirm actual support hours
- Section 7: Adjust pricing/service tiers to match your actual offerings
- Add real Account Manager names/contacts

**Group SLA**
- Section 2.1: Verify implementation timeline is realistic
- Section 10: Confirm pricing model (PEPM, etc.)
- Add real integration partners (your benefits platform partners)

### Internal Policies

**Employee Handbook** (Start here - most used document)
- Section 2.3: Confirm actual working hours
- Section 2.4: Verify pay dates and pension rates
- Section 3: Update all benefit amounts to actual figures
- Section 8: Add real contact names and emails

---

## 🔍 Where to Find Source Material

Your example PDFs are here:
```
/Users/tomcassidy/thrive/ClearMinds/documentation/examples/
```

**How to extract content:**
1. Open PDF in Preview/Adobe
2. Copy text sections
3. Paste into corresponding HTML file
4. Clean up formatting
5. Keep the branded structure I've created

**Example workflow:**
```
1. Open WillU_Holiday_policy.pdf
2. Copy the "Annual Entitlement" section
3. Open holiday-policy.html in VS Code
4. Find the <h2>Annual Entitlement</h2> section
5. Replace placeholder text with real content
6. Save and refresh browser to preview
```

---

## 🎨 Visual Enhancements (Optional - 1 hour)

### Add Company Logo
In each policy header, replace text logo with image:

```html
<!-- Current (text only) -->
<h1>AI Usage Policy</h1>

<!-- Enhanced (with logo) -->
<img src="../../images/clearminds-logo-white.png" alt="ClearMinds" style="height: 60px; margin-bottom: 20px;">
<h1>AI Usage Policy</h1>
```

### Add Document Footers with Branding
Already have placeholders like:
```html
<p>Document Reference: CM-AI-001 | Version: 1.0</p>
```

Can enhance with:
- Page numbers (for print)
- Copyright notice
- QR code linking to online version

---

## ✅ Quality Checklist

Before sharing with partners, verify:

**Content**
- [ ] All placeholder text replaced with real info
- [ ] Contact emails are real and monitored
- [ ] Phone numbers are correct
- [ ] Dates are current
- [ ] Numbers/figures are accurate (holiday days, budgets, etc.)
- [ ] Company-specific examples added

**Compliance**
- [ ] Employment law terms reviewed by UK HR expert or solicitor
- [ ] GDPR statements accurate for your data practices
- [ ] Health & safety content matches your actual procedures
- [ ] SLA commitments are achievable

**Branding**
- [ ] ClearMinds tone maintained (supportive, clear, professional)
- [ ] UK English throughout (no American spellings)
- [ ] Visual consistency (colors, fonts)
- [ ] No jargon or overly formal language

**Technical**
- [ ] All links work (especially navigation)
- [ ] Displays correctly on mobile
- [ ] Prints properly (test print.css)
- [ ] No broken images or styling

---

## 🚀 Deployment Steps

### 1. Test Locally
```bash
cd ~/thrive/thrive-work/eap-docs
python3 -m http.server 8000
# Visit http://localhost:8000 in browser
```

### 2. Push to Vercel
```bash
cd ~/thrive/thrive-work
git add .
git commit -m "Add comprehensive policy documentation"
git push
vercel --prod
```

### 3. Share with Partners
Send email to Towergate/AXA with:
- Link to documentation hub
- Brief overview of what's included
- Invitation for feedback
- Your contact for questions

**Example email:**
```
Subject: ClearMinds Partnership Documentation - Ready for Review

Hi [Partner Name],

We've completed our comprehensive compliance and governance documentation 
package, now available for your review:

🔗 https://thrive-work.vercel.app/eap-docs/

This includes:
✅ AI Usage Policy
✅ Health Service Level Agreement  
✅ Group SLA Policy
✅ Complete internal HR policy framework

All documents follow best practice and address standard due diligence 
requirements for EAP partnerships. We welcome your feedback.

Best regards,
[Your Name]
```

---

## 💡 Pro Tips

**Editing in VS Code:**
1. Install "Live Server" extension
2. Right-click HTML file → "Open with Live Server"
3. Auto-refreshes as you edit
4. See changes instantly

**Finding Text to Replace:**
- CMD+F (Mac) or CTRL+F (Windows)
- Search for `[` to find all placeholders
- Search for `XXX` or `TODO` for incomplete sections
- Search for `2025` to verify all dates

**Version Control:**
- Make a backup before major changes
- Use git branches for experimental edits
- Tag each version (v1.0, v1.1, etc.)

---

## 📞 If You Need Help Tomorrow

**Common Issues:**

**"Links not working"**
- Check relative paths (../../css/style.css)
- Verify file names match exactly (case-sensitive)

**"Styling looks broken"**
- Confirm style.css file exists in css/ folder
- Check browser console for errors (F12)
- Try hard refresh (CMD+SHIFT+R)

**"Want to add new sections"**
- Copy existing h2/h3 structure
- Keep consistent indentation
- Match the tone of existing content

---

**You're all set!** 🎉

Everything is ready for review and customization tomorrow. The hard work (structure, branding, comprehensive content) is done. Now it's just fine-tuning with your specific details.
