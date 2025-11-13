# USER WARNING & CONSENT FLOW (UI COPY)
## Pre-Join Modal for Facebook Community Access

**Document Type:** UI/UX Copy for Portal Integration
**Placement:** Modal displayed before employee clicks "Join Community" link
**Required Action:** Checkbox consent before proceeding

---

## MODAL SCREEN 1: INITIAL WARNING

### Modal Title:
**Before You Join the ClearMinds Community**

### Modal Body:

👋 **Welcome!** Our peer support community is here to connect you with others on similar mental health journeys.

Before you join, there are a few important things to know about **privacy and safety**.

---

**📱 This Community Uses Facebook (For Now)**

Our community currently runs on Facebook while we build our own in-app platform (coming Q3 2025).

**What this means for you:**

✅ **What we CAN protect:**
- Your employer **cannot** access this community (contractually prohibited)
- Professional moderators (not your employer) monitor 24/7
- Enhanced vetting process to block employer join attempts
- Private group (only approved members see posts)

❌ **What we CANNOT fully prevent (Facebook limitations):**
- **Screenshots** - Facebook doesn't let us disable screenshots (though taking them is against our rules and may result in removal)
- **Facebook's data practices** - Facebook itself has access to posts per their platform terms
- **100% anonymity guarantee** - We require pseudonyms, but we can't prevent all identification if you share too many personal details

---

**🔒 How to Protect Yourself:**

**REQUIRED (Strictly Enforced):**
- ✅ Use a **pseudonym** (not your real name) as your display name
- ✅ Use an **anonymous profile photo** (avatar, landscape, no face)
- ✅ **Never share** identifying information (real names, workplace details, specific identifying details)

**RECOMMENDED (For Extra Safety):**
- ⚠️ Share wisely - Only post what you'd be comfortable potentially becoming public
- ⚠️ Use a personal email (not work email) for Facebook account
- ⚠️ Avoid oversharing specific details that could identify you

---

**🚀 Better Privacy is Coming:**

We're building an **in-app anonymous community** (launching Q3 2025) with:
- Mandatory anonymous usernames (no real names allowed)
- Company segmentation (employers technically cannot access)
- Screenshot prevention technology
- Full data ownership (not on Facebook)

**You can wait for the in-app version if you prefer stronger privacy protections.**

---

**✅ I Understand and Want to Continue**

By checking this box and clicking "Continue to Community," I confirm that I:

- [ ] Understand this community uses Facebook (third-party platform)
- [ ] Will use a pseudonym and anonymous photo (not my real name or face)
- [ ] Will not share identifying information about myself or others
- [ ] Understand that screenshots cannot be fully prevented (though they're prohibited)
- [ ] Will share wisely - only what I'm comfortable potentially being public
- [ ] Have read and agree to the [Community Rules] and [Terms of Service]
- [ ] Understand my employer cannot access this community, but Facebook's platform has inherent limitations

**[Cancel]** **[Continue to Community]** ← (Only enabled after checkbox is checked)

---

## MODAL SCREEN 2: FINAL CHECKLIST (After Checkbox, Before Proceeding)

### Modal Title:
**Quick Privacy Checklist**

### Modal Body:

Before you click to Facebook, make sure you've done these steps:

**Facebook Profile Setup:**
- [ ] **Changed your display name to a pseudonym** (not your full legal name)
  - How: Settings & Privacy → Settings → Name
  - Example: "Sarah M." instead of "Sarah Johnson"

- [ ] **Changed your profile photo to something anonymous** (no clear face photo)
  - How: Click your profile photo → Upload Photo
  - Use: Avatar, landscape, abstract image, or leave it as Facebook default

**Remember:**
- ✅ Never post identifying details (full names, workplace, address, etc.)
- ✅ Use content warnings for sensitive topics ("CW: self-harm")
- ✅ Report rule violations to moderators
- ✅ This is peer support, not professional treatment - seek professional help when needed

**Crisis? Don't wait for the community:**
- 🆘 **Samaritans:** 116 123 (24/7)
- 🚨 **Emergency:** 999

---

**[Go Back]** **[I'm Ready - Take Me to Facebook]** ← (Opens Facebook group in new tab)

---

## MODAL SCREEN 3: POST-JOIN CONFIRMATION (Shown After Return From Facebook)

### Modal Title:
**✅ You're In! Welcome to the Community**

### Modal Body:

**Great! You should now be a member of the ClearMinds Facebook Community.**

(If you don't see a "Join Group" request or "Member" badge, try the link again or contact support@clearminds.com)

---

**🎯 What's Next:**

**In the community, you can:**
- Read the pinned post with full community rules
- Introduce yourself (using your pseudonym!)
- Share your experiences and ask questions
- Support others on their wellness journeys

**Remember the key rules:**
- 🔒 Pseudonym and anonymous photo required
- 🚫 No screenshots or sharing content outside the group
- 🤝 Be kind, supportive, and respectful
- 📢 Report violations to moderators

---

**🚀 Coming Soon: In-App Community (Q3 2025)**

Want even stronger privacy protections? We're building an in-app community with:
- Mandatory anonymous usernames
- Screenshot prevention technology
- Company segmentation (employers can't access)

**We'll notify you when it's ready!**

---

**[Close]** **[Go to Community Now]** **[Explore Other ClearMinds Features]**

---

## ALTERNATIVE FLOW: OPTING TO WAIT FOR IN-APP

### If user clicks "Cancel" or "Go Back" from initial warning:

### Modal Title:
**No Problem!**

### Modal Body:

**We understand that privacy is important.**

You can:

**🎯 Use ClearMinds without joining the community:**
- ✅ Neuroindicator screening and mental health assessments
- ✅ AI coaching with our expert coaches (Tom, Alastair, Lucy, Edward, Kainne, Dom)
- ✅ ClearMinds hypnotherapy app
- ✅ Specialist referrals (CBT, ADHD screening, etc.)

**🚀 Wait for the in-app community (Q3 2025):**
We'll email you when our privacy-enhanced in-app community launches with stronger protections:
- Mandatory anonymous usernames
- Screenshot prevention
- Company segmentation
- Full data ownership

**Notify me when in-app community launches:**
- [ ] Send me an email update when it's ready

**[Explore ClearMinds Features]** **[Actually, I Want to Join Now]**

---

## PRIVACY CONCERNS / SUPPORT LINK

### Always Visible (Small Link at Bottom of All Modals):

**Questions? Concerns?**
- Privacy questions: privacy@clearminds.com
- Community support: community@clearminds.com
- General support: support@clearminds.com
- [Read Full Privacy Notice] | [Read Community Terms]

---

## TECHNICAL IMPLEMENTATION NOTES

### Modal Behavior:
- **Trigger**: User clicks "Join Community" link in portal
- **Dismissible**: Yes (user can close or click "Cancel")
- **Persistent**: Shown every time user tries to access Facebook community until they complete the flow
- **Consent tracking**: Store checkbox consent in database with timestamp
- **One-time**: After user completes flow and joins, don't show again (but allow access to privacy info)

### Required UI Elements:
- **Modal backdrop** (dims background, prevents interaction with rest of page)
- **Checkbox** (required, must be checked to enable "Continue" button)
- **Disabled state** for "Continue" button until checkbox is checked
- **Links** to full Terms of Service and Community Rules (open in new tab)
- **Accessible** (keyboard navigation, screen reader friendly)

### Copy Variables to Customize:
- `[Your Company Name]` - Replace with employer name
- `[Community Rules]` - Link to full rules document
- `[Terms of Service]` - Link to full terms document
- `Q3 2025` - Update with actual in-app launch timeline

### Analytics Tracking:
- Modal viewed (timestamp)
- Checkbox checked (timestamp)
- "Continue to Community" clicked (timestamp)
- "Cancel" clicked (timestamp)
- "Wait for in-app" opted in (timestamp + email capture)

---

## VISUAL DESIGN RECOMMENDATIONS

### Color Coding:
- **Green (✅)**: What we CAN protect / Good practices
- **Red (❌)**: Limitations / Prohibitions
- **Yellow (⚠️)**: Caution / Recommendations
- **Blue (🚀)**: Future improvements / Upgrades

### Icons:
- 🔒 Privacy/Security
- 📱 Facebook/Platform
- ✅ Confirmation/Approval
- ❌ Prohibition/Limitation
- ⚠️ Warning/Caution
- 🚀 Future/Coming Soon
- 🎯 Action/Next Steps
- 🚨 Crisis/Emergency
- 🤝 Community/Support

### Typography:
- **Bold**: Key terms, required actions, warnings
- *Italic*: Examples, recommendations
- Regular: Explanatory text

### Layout:
- **Progressive disclosure**: Don't overwhelm with all info at once (multi-screen flow)
- **Scannable**: Bullet points, short paragraphs, visual hierarchy
- **Mobile-friendly**: Readable on phone screens
- **Clear CTAs**: Obvious next actions

---

## COMPLIANCE NOTES

### Legal Requirements Met:
- ✅ **Informed consent**: User explicitly acknowledges understanding and agrees
- ✅ **Transparency**: Clear disclosure of Facebook limitations
- ✅ **Right to decline**: User can opt out and use other ClearMinds features
- ✅ **Data subject rights**: Links to privacy notice and full terms
- ✅ **Consent tracking**: Timestamp and acknowledgment stored

### GDPR Compliance:
- ✅ **Freely given**: User can decline without penalty (access to other services)
- ✅ **Specific**: Consent is for joining Facebook community specifically
- ✅ **Informed**: Clear explanation of what joining entails
- ✅ **Unambiguous**: Checkbox action is clear affirmative consent

---

## TONE & VOICE

**Approach**: Transparent, protective, empowering (not alarmist)

**DO**:
- Be honest about limitations
- Empower users to make informed choices
- Acknowledge Facebook's inherent risks
- Offer clear alternatives (wait for in-app)
- Emphasize what we DO protect (employer cannot access)

**DON'T**:
- Minimize risks ("it's totally safe!")
- Overwhelm with legal jargon
- Scare users away from joining
- Make promises we can't keep
- Hide Facebook limitations

**Remember**: Users need to trust that we're being straight with them. Transparency builds trust, even when acknowledging limitations.

---

**END OF DOCUMENT**

**For development handoff to:** [Development Team]
**For legal review by:** [Legal Team]
**Questions:** privacy@clearminds.com
**Document Control:** Version 1.0 | October 2025
