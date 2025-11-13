---
title: Group SLA Policy
subtitle: Corporate Partnership Service Standards
document_owner: Partnerships Director
effective_date: July 2025
review_date: July 2026
version: 1.0
applies_to: All corporate group partnerships and multi-user implementations
reference: CM-SLA-GROUP-001
---

# Group SLA Policy

## 1. Purpose & Scope

This Group Service Level Agreement defines the service standards, implementation processes, and ongoing support that ClearMinds provides to corporate partners implementing our wellbeing services across their employee populations. It complements our Health SLA by addressing the specific needs of group deployments.

### Group Partnership Commitment

ClearMinds is committed to being a trusted wellbeing partner that integrates seamlessly into your employee benefits ecosystem. We provide dedicated support, customisation options, and strategic partnership to maximise employee engagement and wellbeing outcomes.

## 2. Implementation Services

### 2.1 Onboarding Timeline

**Implementation Timeline:** Standard implementations typically complete within 14-30 days depending on partnership complexity, technical requirements, and client readiness. Enterprise implementations with custom integrations may require additional time.

| Implementation Phase | Timeline | Key Activities |
|---------------------|----------|----------------|
| Initial Setup | Days 1-7 | Account configuration, branding setup, admin portal access |
| Integration | Days 7-14 | SSO configuration, user provisioning, testing |
| Training | Days 14-21 | HR training, manager briefings, communication materials |
| Launch | Days 21-30 | Soft launch, feedback gathering, full rollout |
| Custom Integrations | +2-4 weeks | SCIM provisioning, HRIS integration, API development (if required) |

### 2.2 Implementation Support

During implementation, partners receive:

- Dedicated implementation manager
- Weekly progress calls
- Customised communication templates
- Launch toolkit with posters, emails, and promotional materials
- Technical integration support
- Training sessions for HR and line managers

## 3. Account Management

### 3.1 Dedicated Support

All group partners receive:

- **Named Account Manager:** Single point of contact for all partnership matters
- **Quarterly Business Reviews:** Performance analysis, insights, and strategic planning
- **Priority Support:** Expedited response times for partner queries
- **Strategic Advice:** Best practice guidance for maximising employee engagement

### 3.2 Account Manager Response Times

| Query Type | Response Time | Resolution Time |
|-----------|---------------|-----------------|
| General Enquiries | 4 hours | 1 business day |
| Technical Issues | 2 hours | 4 hours |
| Urgent/Critical | 1 hour | 2 hours |
| Strategic Planning | 24 hours | As agreed |

## 4. Customisation & Branding

### 4.1 White Label Options (Enterprise Tier)

- Custom branded portal with company logo and colours
- Personalised welcome messages
- Custom domain name (e.g., wellbeing.yourcompany.com)
- Branded mobile app experience
- Custom email communications

### 4.2 Content Customisation

- Curated content collections for specific industries or demographics
- Custom content playlists addressing organisational priorities
- Bespoke content creation (subject to minimum contract value)
- Multilingual content support (10+ languages available)

## 5. User Management & Employee Lifecycle

### 5.1 Provisioning Methods

Flexible user onboarding options:

- **Single Sign-On (SSO):** Seamless access via SAML 2.0 or OAuth
- **Bulk Upload:** CSV import for rapid onboarding
- **Access Codes:** Unique codes for self-registration
- **API Integration:** Automated provisioning via HR systems
- **Manual Registration:** Self-service signup with company code

### 5.2 Provisioning SLAs

| Method | Processing Time | User Volumes |
|--------|----------------|--------------|
| SSO Configuration | 7-10 business days | Unlimited |
| Bulk Upload | 24-48 hours | Up to 10,000 users |
| Access Codes | Same business day | Unlimited |
| API Integration | 14-21 business days | Unlimited |

### 5.3 Employee Lifecycle Management

For large-scale partnerships managing thousands of employees (e.g., Towergate's 260,000+ employee base across client companies), we provide streamlined processes for managing natural employee flux:

#### High-Volume Employee Management

Designed for insurance brokers, wellness benefits providers, and benefits platforms serving multiple employer clients with continuous employee turnover.

#### 5.3.1 New Joiners Process

**For partner HR teams to onboard new employees:**

| Onboarding Method | Process | Timeframe | Best For |
|------------------|---------|-----------|----------|
| **Automated (Recommended)** | New hire added to HR system → Automatically provisioned in ClearMinds via SCIM/API | Real-time (within 15 minutes) | Large volumes (50+ joiners/month) |
| **Bulk Upload** | HR uploads CSV with new employee details via admin portal (weekly/monthly) | Processed within 4 hours | Medium volumes (10-50 joiners/month) |
| **Self-Service** | New employees receive company access code in welcome pack, register themselves | Immediate | Low volumes or decentralized HR |
| **SSO Sync** | New hire added to Azure AD/Okta → First login creates ClearMinds account automatically | Immediate on first login | SSO-enabled organizations |

**What HR teams need to provide:**

- Work email address (required for account creation)
- First name and last name
- Employee ID (optional but recommended for tracking)
- Department/location (optional, for reporting segmentation)
- Start date (to align access with employment commencement)

**Automated welcome process:**

- Welcome email sent automatically on account creation
- Personalized onboarding journey begins
- Mobile app download links included
- First session recommendations based on common new starter needs (stress management, sleep, confidence)

#### 5.3.2 Leavers Process

**For partner HR teams to offboard departing employees:**

| Offboarding Method | Process | Access Termination | Data Handling |
|-------------------|---------|-------------------|---------------|
| **Automated (Recommended)** | Employee removed from HR system → Auto-deprovisioned via SCIM/API | Real-time (within 15 minutes) | Account suspended immediately, data retained per DPA |
| **Bulk Removal** | HR uploads CSV of leavers via admin portal (weekly/monthly) | Within 4 hours | Accounts suspended in batch, confirmation report sent |
| **Manual Request** | HR emails account manager with leaver details | Within 24 hours | Individual suspension, confirmation provided |
| **SSO Sync** | Employee removed from Azure AD/Okta → ClearMinds access revoked automatically | Immediate on next login attempt | No action required, SSO denies access |

**Leaver data retention (UK GDPR compliance):**

- **Account status:** Suspended immediately (login disabled)
- **Personal data:** Retained for 90 days to allow for payroll reconciliation and contractual obligations
- **Clinical records:** Retained for 7 years (CQC requirement) in secure, anonymized format
- **Aggregated data:** Continues to be included in historical reporting (non-identifiable)
- **Full deletion:** After 90-day grace period, personal identifiers removed (email, name, employee ID)

#### Important: Leaver Grace Period

**90-Day Access Extension Option:** Some partners choose to provide continued access for departing employees for up to 90 days post-employment as a goodwill gesture. This can be configured per partner preference.

**Billing:** Extended access is billed at standard PEPM rate unless otherwise agreed in contract.

#### 5.3.3 Employee Changes & Transfers

**Managing employee data updates:**

| Change Type | How to Update | Impact on Service |
|-------------|--------------|-------------------|
| Email address change | Automated via SCIM/API or bulk upload | Login credentials updated, no loss of history |
| Name change | Automated or manual update via admin portal | Profile updated, no impact on service |
| Department/location move | Updated via CSV upload or API | Reporting segmentation updated, no service impact |
| Inter-company transfer | Coordinate with account manager | Access maintained, billing transferred to new entity |

#### 5.3.4 Bulk Employee Management Tools

**For high-volume partners managing 10,000+ employees:**

- **Admin Portal:** Self-service dashboard for HR teams to:
  - Upload bulk joiner/leaver lists (CSV format, up to 50,000 rows)
  - View processing status in real-time
  - Download confirmation reports
  - Schedule recurring uploads (e.g., monthly payroll sync)

- **API Access (Enterprise tier):** Direct integration with HRIS systems:
  - Real-time provisioning/deprovisioning
  - Bi-directional data sync
  - Automated reconciliation reports
  - Webhook notifications for critical events

- **SCIM Protocol Support:** Industry-standard user lifecycle management:
  - Compatible with Workday, BambooHR, Azure AD, Okta
  - Automated create/update/delete operations
  - Group-based access control

- **Reconciliation Service:** Monthly automated comparison:
  - Partner's active employee list vs ClearMinds active users
  - Identifies discrepancies (orphaned accounts, missing users)
  - Billing accuracy verification
  - Sent to partner finance/HR teams for review

#### 5.3.5 HR Team Support & Training

**Enabling partner HR teams to manage employee lifecycle efficiently:**

- **Initial HR Training:** 1-hour admin portal training covering joiner/leaver processes
- **Documentation:** Step-by-step guides for all user management tasks
- **Video Tutorials:** Short how-to videos for common processes
- **HR Helpdesk:** Dedicated support line for partner HR teams (response within 2 hours)
- **Quarterly Check-ins:** Review of user management processes and optimization opportunities

#### 5.3.6 Billing Accuracy for Employee Flux

**Transparent billing aligned with actual employee numbers:**

- **Monthly True-Up:** Billing calculated based on active users during billing period
- **Pro-rata Adjustments:** New joiners charged from activation date, leavers credited from termination date
- **Minimum Commitment:** Contractual minimum user count (e.g., 80% of original employee base) protects against large-scale reductions
- **Growth Allowance:** No billing for users added up to 10% above contract baseline (encourages adoption)
- **Reconciliation Reports:** Detailed monthly reports showing:
  - Opening active user count
  - New joiners added
  - Leavers removed
  - Closing active user count
  - Billing calculation breakdown

### Case Study: Managing High-Volume Employee Flux

**Example: Towergate Insurance Brokers**

With 260,000+ employees across multiple client companies, Towergate's HR teams benefit from:

- **Automated SCIM integration:** Real-time sync with their HR platform processes ~5,000 joiners/leavers per month automatically
- **Monthly reconciliation:** Automated reports ensure billing accuracy across hundreds of client companies
- **Dedicated integration team:** ClearMinds technical team provides ongoing API support and optimization
- **Bulk upload fallback:** For clients without API access, CSV bulk upload processes 10,000+ employees weekly
- **Zero manual intervention:** 98% of user lifecycle events handled automatically, HR team only manages exceptions

## 6. Reporting & Analytics

### 6.1 Standard Reporting

Monthly dashboards include:

- User registration and activation rates
- Engagement metrics (active users, session completions)
- Content popularity and usage trends
- Demographic breakdowns (where GDPR-compliant)
- Platform performance metrics

### 6.2 Custom Reporting (Enterprise Tier)

- Bespoke reporting tailored to organisational KPIs
- Integration with HR analytics platforms
- ROI analysis and wellbeing outcome tracking
- Comparative benchmarking (anonymised industry data)
- Predictive analytics and trend forecasting

### 6.3 Data Privacy

- All reporting fully GDPR-compliant
- Aggregated data only (minimum 10 users per segment)
- No personally identifiable information shared
- Clear data processing agreements

## 7. Communication & Engagement Support

### 7.1 Launch Support Materials

Provided at no additional cost:

- Email templates (pre-launch, launch, ongoing promotion)
- Intranet graphics and banners
- Digital posters and flyers
- Social media content
- Manager talking points and FAQs
- Video assets and demo recordings

### 7.2 Ongoing Engagement Support

- Quarterly themed campaigns
- Seasonal wellness initiatives
- Mental Health Awareness Week content
- Stress Awareness Month resources
- Custom campaign creation (Enterprise tier)

## 8. Integration Capabilities

### 8.1 Technical Integrations

| Integration Type | Standard | Setup Time |
|-----------------|----------|------------|
| SSO (SAML/OAuth) | Included | 5 business days |
| SCIM Provisioning | Included | 10 business days |
| API Access | Enterprise tier | 5 business days |
| HR System Integration | Custom quote | 15-30 business days |

### 8.2 Benefits Platform Integration

- Pre-built integrations with major benefits platforms
- Deep linking support for seamless navigation
- Shared analytics where appropriate
- Co-branded communications

## 9. Training & Education

### 9.1 Standard Training Package

Included with all group partnerships:

- 2-hour HR/admin training session (virtual or in-person)
- 1-hour manager briefing webinar
- Recorded training materials for ongoing reference
- User guides and FAQs
- Quarterly "What's New" webinars

### 9.2 Enhanced Training (Enterprise Tier)

- On-site training days
- Mental Health First Aider integration training
- Custom training modules
- Manager coaching on wellbeing conversations
- Train-the-trainer programmes

## 10. Service Tiers

### 10.1 Standard Tier

For organisations with 50-500 employees:

- All core platform features
- Email support (24-hour response)
- Monthly reporting
- Quarterly business reviews
- Standard branding

### 10.2 Premium Tier

For organisations with 500-2,000 employees:

- Everything in Standard, plus:
- Named account manager
- Priority support (4-hour response)
- Custom content playlists
- Enhanced reporting
- SSO implementation included

### 10.3 Enterprise Tier

For organisations with 2,000+ employees:

- Everything in Premium, plus:
- White label options
- API access
- Bespoke reporting
- Custom content creation
- Dedicated success manager
- Strategic wellbeing consultation

## 11. Contractual Terms

### 11.1 Minimum Contract Periods

- Standard tier: 12-month minimum
- Premium tier: 24-month minimum
- Enterprise tier: 24-36 month minimum

### 11.2 Pricing & Billing

- Per-employee-per-month pricing (PEPM)
- Volume discounts available
- Annual payment discount: 10%
- Quarterly payment terms available
- Usage-based billing for API consumption (Enterprise)

### 11.3 Renewal Terms

- 90-day renewal notice period
- Price protection for first renewal period
- Automatic renewal unless notice given
- Upgrade/downgrade options at renewal

## 12. Performance Guarantees

### 12.1 Engagement Targets

ClearMinds commits to supporting partners in achieving:

- 30% activation rate within first 3 months (industry standard: 20-25%)
- 15% monthly active users by month 6 (industry standard: 10-12%)
- 80%+ user satisfaction scores (measured quarterly)

### 12.2 Support for Engagement

To achieve these targets, we provide:

- Quarterly engagement strategy reviews
- Customised communication plans
- Best practice sharing from high-performing clients
- Targeted campaigns for low-engagement segments

## 13. Governance & Escalation

### 13.1 Escalation Path

| Level | Contact | Escalation Criteria |
|-------|---------|---------------------|
| Level 1 | Support Team | All routine queries |
| Level 2 | Account Manager | Unresolved after 48 hours, strategic issues |
| Level 3 | Partnerships Director | Unresolved after 5 days, contractual matters |
| Level 4 | CEO | Critical partnership risk, major service failures |

### 13.2 Partnership Reviews

- **Monthly:** Performance data and quick check-ins
- **Quarterly:** Comprehensive business reviews
- **Annual:** Strategic planning and contract review

### Partnership Contact

- **New Partnership Enquiries:** partnerships@clearminds.com
- **Account Management:** Your named account manager
- **Technical Integration:** integration@clearminds.com
- **Escalations:** partnerships-director@clearminds.com

---

**Document Control**

SLA Reference: CM-SLA-GROUP-001 | Version: 1.0 | Approved by: Partnerships Director & Board

Next Review: July 2026

© 2024 ClearMinds. All rights reserved.
