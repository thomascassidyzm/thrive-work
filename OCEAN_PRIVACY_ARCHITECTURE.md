# OCEAN Workplace Wellness Assessment - Privacy Architecture

## Overview

This document describes the complete privacy architecture for the THRIVE OCEAN workplace wellness assessment, including the two-tier data access system that protects employee privacy while providing valuable workplace insights to employers.

## Core Privacy Principles

### 1. **Employee Sovereignty**
- Employees **own all their data**
- Employees see **everything**: Full OCEAN profile, all behavioral patterns, personal relationships, home environment impacts
- No employer access to individual employee data under any circumstances

### 2. **K>10 Anonymity**
- Employer data access **requires minimum 10 respondents**
- Hard-coded enforcement, no bypass possible
- If team size < 10, employer sees: "Privacy threshold not met"

### 3. **Workplace-Only Aggregation**
- Employers only see **aggregated workplace patterns**
- Personal relationships, life outside work → **Never shared with employer**
- Home→work influence → **Percentages only, no personal stories**

## Data Access Matrix

| Question Category | Employee Access | Employer Access | K>10 Required |
|-------------------|----------------|-----------------|---------------|
| Universal Launch (friends/family) | ✅ Full detail | ❌ None | N/A |
| Group Dynamics (teams) | ✅ Full detail | ✅ Aggregated patterns | Yes |
| Authority Relationships | ✅ Full detail | ✅ Aggregated patterns | Yes |
| Conflict Patterns | ✅ Full detail | ✅ Aggregated patterns | Yes |
| Creative Expression | ✅ Full detail | ✅ Aggregated patterns | Yes |
| Trust & Vulnerability | ✅ Full detail | ✅ Aggregated patterns | Yes |
| Discipline & Impulse | ✅ Full detail | ✅ Aggregated patterns | Yes |
| Personal Relationships | ✅ Full detail | ❌ None | N/A |
| Personal Health | ✅ Full detail | ❌ None | N/A |
| Personal Identity | ✅ Full detail | ❌ None | N/A |
| Home→Work Influence | ✅ Full detail + action plan | ✅ % only (aggregated) | Yes |

## File Structure

### Configuration Files

#### `/config/question-privacy-schema.js`
Defines privacy rules for all question categories:
```javascript
{
  group_dynamics: {
    employerShareable: true,   // Workplace-relevant
    aggregationOnly: false,     // Full patterns OK
    requiresK10: true           // Must have 10+ respondents
  },
  universal_launch: {
    employerShareable: false,   // Personal only
    aggregationOnly: false,
    requiresK10: false
  },
  thrive_environment: {
    employerShareable: true,    // Home→work is relevant
    aggregationOnly: true,      // But only as %
    requiresK10: true
  }
}
```

### Utility Files

#### `/utils/question-privacy-tagger.js`
Applies privacy tags to questions and enforces access rules:
- `tagQuestion(question)` - Applies dataAccess tags based on category
- `validateQuestionPrivacy(question)` - Ensures proper tagging
- `createEmployeeView(responses)` - Full individual results
- `createEmployerView(responses, teamSize)` - Aggregated workplace data only

### Analysis Engine

#### `/engines/dynamic-ocean-analysis.js`
Updated with privacy-aware analysis:
- `analyzeBehavioralTendencies(responses)` - Individual analysis (employee-only)
  - Returns full OCEAN profile
  - Separates workplace vs personal patterns
  - Includes privacy context metadata

- `generateEmployerAggregatedView(allResponses, teamSize)` - Employer view
  - Validates k>10 **before** any processing
  - Filters to workplace-shareable questions only
  - Returns pattern percentages, not individual scores
  - Generates workplace insights (conflict, harmony, communication patterns)
  - Explicitly marks what employer CANNOT see

### Question Banks

#### `/question-banks/home-work-influence-questions.js`
Special category with `aggregationOnly: true`:
```javascript
{
  id: 'HW001',
  scenario: 'How often does childcare unpredictability affect work preparation?',
  dataAccess: {
    employee: true,              // Full insight + action plan
    employerShareable: true,     // Yes, workplace-relevant
    aggregationOnly: true,       // But only % affected
    requiresK10: true
  },
  employeeView: {
    insight: 'Childcare unpredictability affecting work at level 3/3',
    actionPlan: ['Create backup childcare plan', '...']
  },
  employerView: {
    sampleInsight: '42% of team report childcare affects work preparation'
  }
}
```

## Privacy Enforcement Flow

### Employee Results Flow
```
User completes assessment
  ↓
All responses stored in individuals_table
  ↓
dynamic-ocean-analysis.analyzeBehavioralTendencies()
  ↓
Returns:
  - Full OCEAN percentiles
  - All behavioral patterns (workplace + personal)
  - Behavioral predictions
  - 30-day action plan
  - Home→work specific insights
  - Coaching recommendations
  ↓
Employee sees EVERYTHING
```

### Employer Aggregation Flow
```
Multiple employees complete assessment
  ↓
Nightly aggregation job runs
  ↓
Check: respondentCount >= 10?
  ↓
NO → Skip, write to audit log
YES → Continue
  ↓
Filter to employerShareable questions only
  ↓
Calculate pattern percentages
  ↓
Generate workplace insights
  ↓
Write to aggregated_workplace_table
  ↓
Employer dashboard shows:
  - Team size (must be ≥10)
  - Pattern distributions (%)
  - Workplace insights
  - Home→work influence (% only)
  - Risk factors
  - Strengths
```

## Example Results

### Employee Sees (Individual):
```json
{
  "oceanPercentiles": {
    "O": 72,
    "C": 58,
    "E": 34,
    "A": 81,
    "N": 45
  },
  "behavioralPatterns": {
    "all": {
      "harmony_keeper": 12,
      "curious_explorer": 8,
      "boundary_setter": 3,
      "conflict_avoider": 6
    },
    "workplace": { /* workplace patterns */ },
    "personal": { /* personal patterns */ }
  },
  "homeWorkInfluence": {
    "childcare": {
      "severity": 3,
      "impact": "Childcare unpredictability is significantly affecting your work preparation",
      "actionPlan": ["Create backup childcare plan", "..."]
    }
  },
  "relationshipInsights": { /* full personal relationship analysis */ },
  "actionPlan": [ /* 30-day Sausage Machine plan */ ]
}
```

### Employer Sees (Aggregated, k>10):
```json
{
  "respondentCount": 15,
  "privacyThresholdMet": true,
  "patternDistribution": {
    "harmony_keeper": {
      "percentage": 47,
      "count": 7,
      "description": "Prioritizes group harmony"
    },
    "conflict_avoider": {
      "percentage": 40,
      "count": 6,
      "description": "Prefers to avoid tense situations"
    }
  },
  "workplaceInsights": {
    "riskFactors": [{
      "indicator": "High conflict avoidance",
      "percentage": 40,
      "implication": "Team may struggle with addressing tensions directly",
      "recommendation": "Consider psychological safety training"
    }],
    "homeWorkInfluence": {
      "childcare": {
        "percentage": 27,
        "insight": "27% of team (4/15) report childcare unpredictability affects work",
        "recommendation": "Consider flexible scheduling or childcare benefits"
      }
    }
  },
  "individualScores": "PROTECTED",
  "personalPatterns": "PROTECTED",
  "specificResponses": "PROTECTED"
}
```

## K>10 Enforcement

### Hard-Coded Rules
```javascript
const k10Enforcement = {
  MINIMUM_RESPONDENTS: 10,
  allowBypass: false,  // NO BYPASS POSSIBLE
  hardCodedMinimum: 10,

  validateAccess: function(groupData) {
    if (groupData.respondentCount < 10) {
      return {
        allowed: false,
        reason: 'Privacy threshold not met',
        employerMessage: 'Insufficient sample size (minimum 10 required)'
      };
    }
    return { allowed: true };
  }
}
```

### Audit Logging
Every employer data access attempt is logged:
```javascript
{
  event: 'EMPLOYER_DATA_ACCESS',
  employerId: 'emp_12345',
  teamId: 'team_789',
  respondentCount: 15,
  metThreshold: true,
  timestamp: '2025-01-11T...'
}
```

## Question Tagging Guide

### Adding New Questions

1. **Determine Category**
   - Is it about workplace behavior? → `group_dynamics`, `authority_relationships`, etc.
   - Is it about personal life? → `universal_launch`, `thrive_relationships`, etc.
   - Is it home→work influence? → `thrive_environment`

2. **Apply Privacy Tags**
```javascript
{
  id: 'NEW001',
  scenario: 'Your question text...',
  category: 'group_dynamics',  // Determines privacy rules
  dataAccess: {
    employee: true,              // ALWAYS true
    employerShareable: true,     // true if workplace-relevant
    aggregationOnly: false,      // true if only % should be shared
    requiresK10: true,          // true if employerShareable
    privacyCategory: 'group_dynamics'
  }
}
```

3. **Validate Tags**
```javascript
import { validateQuestionPrivacy } from './utils/question-privacy-tagger.js';
const validation = validateQuestionPrivacy(question);
if (!validation.valid) {
  console.error(validation.errors);
}
```

## Database Schema

### Individual Data Table (Employee-Only Access)
```sql
CREATE TABLE individual_ocean_data (
  user_id UUID PRIMARY KEY,
  ocean_scores JSONB,           -- Full OCEAN percentiles
  behavioral_patterns JSONB,     -- All patterns (workplace + personal)
  home_work_influence JSONB,     -- Detailed home→work analysis
  relationship_insights JSONB,   -- Personal relationships
  action_plan JSONB,            -- 30-day plan
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Row-Level Security Policy
ALTER TABLE individual_ocean_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY employee_own_data ON individual_ocean_data
  FOR SELECT USING (auth.uid() = user_id);  -- Only see own data
```

### Aggregated Workplace Data Table (Employer Access, k>10 Only)
```sql
CREATE TABLE aggregated_workplace_data (
  team_id UUID,
  organization_id UUID,
  respondent_count INTEGER CHECK (respondent_count >= 10),  -- Hard constraint
  pattern_distribution JSONB,    -- Workplace patterns only (%)
  workplace_insights JSONB,      -- Aggregated insights
  home_work_percentages JSONB,  -- % affected by home stressors
  timestamp TIMESTAMP,
  PRIMARY KEY (team_id, timestamp)
);

-- Row-Level Security Policy
ALTER TABLE aggregated_workplace_data ENABLE ROW LEVEL SECURITY;
CREATE POLICY employer_aggregated_only ON aggregated_workplace_data
  FOR SELECT USING (
    respondent_count >= 10 AND  -- Must meet k>10
    organization_id IN (SELECT org_id FROM employer_access WHERE employer_id = auth.uid())
  );
```

## Testing Privacy Boundaries

### Test Cases

1. **✅ Employee can access all their data**
```javascript
const employeeView = createEmployeeView(responses, userId);
assert(employeeView.oceanScores !== undefined);
assert(employeeView.personalInsights !== undefined);
assert(employeeView.homeWorkInfluence !== undefined);
```

2. **❌ Employer cannot access individual data**
```javascript
const individual = await db.query('SELECT * FROM individual_ocean_data WHERE user_id = $1', [userId]);
assert(individual.rows.length === 0);  // Should return nothing for employer
```

3. **✅ Employer can access aggregated data when k>10**
```javascript
const employerView = generateEmployerAggregatedView(responses, 15);
assert(!employerView.error);
assert(employerView.respondentCount === 15);
assert(employerView.patternDistribution !== undefined);
```

4. **❌ Employer cannot access aggregated data when k<10**
```javascript
const employerView = generateEmployerAggregatedView(responses, 8);
assert(employerView.error === 'PRIVACY_THRESHOLD_NOT_MET');
assert(employerView.minimumRequired === 10);
assert(employerView.currentCount === 8);
```

5. **❌ Employer cannot see personal patterns**
```javascript
const employerView = generateEmployerAggregatedView(responses, 15);
assert(employerView.individualScores === 'PROTECTED');
assert(employerView.personalPatterns === 'PROTECTED');
```

6. **✅ Home→work influence shows % for employer, details for employee**
```javascript
// Employee
const employee = createEmployeeView(responses, userId);
assert(employee.homeWorkInfluence.childcare.severity === 3);
assert(employee.homeWorkInfluence.childcare.actionPlan.length > 0);

// Employer
const employer = generateEmployerAggregatedView(responses, 15);
assert(employer.workplaceInsights.homeWorkInfluence.childcare.percentage === 27);
assert(employer.workplaceInsights.homeWorkInfluence.childcare.actionPlan === undefined);
```

## Next Steps

- [ ] Build employee results dashboard (full OCEAN profile + action plan)
- [ ] Build employer dashboard (aggregated insights only)
- [ ] Implement nightly aggregation job with k>10 enforcement
- [ ] Add audit logging for all employer data access
- [ ] Create test suite for privacy boundaries
- [ ] Legal review of privacy model (GDPR, employment law compliance)
- [ ] User acceptance testing with both employees and employers

## Questions & Answers

**Q: Can an employer see individual employee OCEAN scores?**
A: No. Never. Under any circumstances.

**Q: What if a manager really wants to see one person's results?**
A: No. The system is designed to make this impossible.

**Q: What if there are only 5 people on a team?**
A: Employer sees: "Privacy threshold not met (minimum 10 respondents required)". No data shown.

**Q: Can employer see that someone reported childcare stress?**
A: No. Employer only sees "42% of team report childcare affects work" - no individual attribution possible.

**Q: What if employer tries to bypass the k>10 rule?**
A: Impossible. It's hard-coded with `allowBypass: false` and database-level constraint `CHECK (respondent_count >= 10)`.

**Q: Do employees know what employers can see?**
A: Yes. Every question shows clear privacy indicators, and results page explicitly states what's private vs. shared.

---

**Built with privacy-first design. Employee sovereignty. K>10 anonymity. Workplace insights without invasion.**
