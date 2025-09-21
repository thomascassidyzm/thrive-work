# THRIVE Assessment System - Single Source of Truth (SSoT) APML Registry

## Project Overview
Comprehensive registry of all variables, data structures, and naming conventions across the THRIVE Workplace Diagnostic Assessment system to ensure consistency and prevent naming mismatches.

---

## Core Data Structures

### 1. Optimization Vector (Primary Diagnostic State)
**Location**: `diagnostic-engine.js` - Line 12-21
**Object Name**: `optimizationVector`
**Purpose**: Real-time confidence scoring across 8 diagnostic dimensions

```javascript
optimizationVector: {
    structuralEfficiency: 0,        // Organizational structure optimization opportunities
    individualResilience: 0,        // Individual stress management and coping needs
    organizationalAlignment: 0,     // Company culture and systemic alignment
    workLifeIntegration: 0,        // Work-life boundary and integration patterns
    meetingCultureOptimization: 0, // Meeting efficiency and cultural improvement
    teamPsychologicalSafety: 0,    // Team psychological safety and communication
    departmentalDynamics: 0,       // Department-specific leadership and dynamics
    roleClarity: 0                 // Role expectations and responsibility clarity
}
```

### 2. Evidence Array (Response Storage)
**Location**: `diagnostic-engine.js` - Line 23
**Array Name**: `evidence`
**Purpose**: Stores all user responses with signals and metadata

```javascript
evidence: [
    {
        // Question metadata
        questionId: 'wp007',
        questionType: 'entry',
        questionCategory: 'values_entry',
        selectedOption: { value: 3, text: '...' },

        // Calculated signals
        signals: {
            categoryName: {
                signalName: 'direction',  // 'direct', 'inverse', 'mixed', 'attention'
                // ...
            }
        },

        // Processing metadata
        timestamp: 1699123456789,
        questionIndex: 0
    }
]
```

### 3. Question Bank Structure
**Location**: `question-bank.js` - Line 47-2308
**Array Name**: `questions`
**Total Count**: 122 questions
**Categories**: Entry (22), Targeted (83), Validation (17)

```javascript
questions: [
    {
        id: 'wp007',                    // Unique question identifier
        type: 'entry',                  // 'entry', 'targeted', 'broad', 'validation'
        category: 'values_entry',       // Semantic grouping
        text: 'Question text...',       // Display text
        options: [                      // 4-option format
            { value: 1, text: '...' },
            { value: 2, text: '...' },
            { value: 3, text: '...' },
            { value: 4, text: '...' }
        ],
        signals: {                      // Signal calculations
            categoryName: {
                signalName: 'direction' // 'direct', 'inverse', 'mixed'
            }
        },
        validationPair: 'string'        // For validation questions only
    }
]
```

---

## Signal Categories and Names

### Structural Efficiency Signals
**Category**: `structuralEfficiency` or `structural`
```javascript
signals: {
    planning_barriers: 'direction',
    resource_constraints: 'direction',
    process_clarity: 'direction',
    approval_clarity: 'direction',
    process_transparency: 'direction'
}
```

### Individual Resilience Signals
**Category**: `individualResilience` or `individual`
```javascript
signals: {
    home_stress: 'direction',
    health_issues: 'direction',
    skill_gaps: 'direction',
    motivation: 'direction',
    stress_tolerance: 'direction',
    pressure_performance: 'direction',
    neuroticism: 'direction',
    openness: 'direction',
    conscientiousness: 'direction',
    extraversion: 'direction',
    agreeableness: 'direction'
}
```

### Organizational Alignment Signals
**Category**: `organizationalAlignment` or `organizational`
```javascript
signals: {
    culture_toxicity: 'direction',
    leadership_quality: 'direction',
    change_management: 'direction',
    values_authenticity: 'direction',
    culture_integrity: 'direction',
    hierarchy_clarity: 'direction'
}
```

### Work-Life Integration Signals
**Category**: `workLifeIntegration` or `worklife`
```javascript
signals: {
    transition_ease: 'direction',
    weekend_restoration: 'direction',
    family_conflicts: 'direction',
    work_intrusion: 'direction',
    mental_separation: 'direction',
    time_off_accessibility: 'direction',
    recovery_support: 'direction'
}
```

### Meeting Culture Signals
**Category**: `meetingCultureOptimization` or `meetings`
```javascript
signals: {
    meeting_hours: 'direction',
    purpose_clarity: 'direction',
    speak_up: 'direction',
    questioning_comfort: 'direction',
    purpose_achievement: 'direction'
}
```

### Team Psychological Safety Signals
**Category**: `teamPsychologicalSafety` or `psychologicalSafety`
```javascript
signals: {
    speak_up_comfort: 'direction',
    admit_mistakes: 'direction',
    challenge_ideas: 'direction',
    ask_for_help: 'direction',
    personal_disclosure: 'direction',
    vulnerability_comfort: 'direction'
}
```

### Departmental Dynamics Signals
**Category**: `departmentalDynamics` or `departmental`
```javascript
signals: {
    team_dynamics: 'direction',
    leadership_style: 'direction',
    workload_fair: 'direction',
    team_communication: 'direction',
    celebration_culture: 'direction',
    recognition_frequency: 'direction'
}
```

### Role Clarity Signals
**Category**: `roleClarity`
```javascript
signals: {
    expectations_clear: 'direction',
    goal_alignment: 'direction',
    skill_match: 'direction',
    autonomy: 'direction',
    success_metrics: 'direction',
    performance_clarity: 'direction',
    boundary_clarity: 'direction',
    role_definition: 'direction'
}
```

### Validation Signals
**Category**: `validation`
```javascript
signals: {
    social_desirability: 'direction',
    honesty_check: 'direction',
    attention_check: 'attention',
    reading_compliance: 'attention',
    perfectionism_bias: 'direction',
    behavioral_honesty: 'direction'
}
```

---

## Function Names and Locations

### Diagnostic Engine (`diagnostic-engine.js`)
```javascript
// Core processing
processResponse(response)                    // Line 29
updateOptimizationVector()                  // Line 43
determineNextStep()                         // Line 271

// Calculation methods
calculateStructuralOptimization()           // Line 69
calculateResilienceOpportunities()          // Line 91
calculateAlignmentOpportunities()           // Line 113
calculateWorkLifeOptimization()             // Line 135
calculateMeetingOptimization()              // Line 157
calculateSafetyOptimization()               // Line 179
calculateDepartmentalOptimization()         // Line 195
calculateRoleOptimization()                 // Line 211

// Utility functions
sigmoid(x)                                  // Line 228
extractSignal(signalName)                   // Line 232
getSignalWeight(category, signal)           // Line 248
calculateEntropy()                          // Line 315
getPrimaryOpportunity()                     // Line 327
getHighestUncertaintyDimension()            // Line 338
getOptimizationRecommendation()             // Line 347

// State management
getState()                                  // Line 405
setState(state)                             // Line 415
```

### Question Bank (`question-bank.js`)
```javascript
// Question selection
getNextQuestion(diagnosticEngine, questionType)  // Line 2311
determineQuestionType(diagnosticEngine)          // Line 2357
getTargetedQuestionsFor(focusArea)              // Line 2375

// Signal processing
processResponse(question, selectedOption, diagnosticEngine)  // Line 2388
calculateSignals(question, selectedOption)                  // Line 2394

// Utility
getAllQuestions()                           // Line 2420
reset()                                     // Line 2424
```

### Adaptive Controller (`adaptive-controller.js`)
```javascript
// Core flow
initialize()                                // Line 23
showNextQuestion()                          // Line 78
selectOption(optionIndex)                   // Line 187
shouldCompleteAssessment()                  // Line 224

// UI rendering
renderQuestion(question)                    // Line 114
renderConfidenceIndicators()                // Line 210
renderCurrentInsights(optimizationVector)   // Line 273
renderCompletion(result)                    // Line 329

// Display helpers
getDimensionName(dimension)                 // Line 453
getDimensionDescription(dimension)          // Line 467
getDefaultIntervention(primaryDysfunction)  // Line 481
getProgressMessage(evidenceLength)          // Line 234

// Session management
saveSession()                               // Line 497
restoreSession()                            // Line 517
continueAssessment()                        // Line 540
```

---

## Critical Naming Conventions

### Question ID Patterns
- **Entry Questions**: `wp###` (workplace preparedness)
- **Targeted Questions**: `[category]###` (st001, rc005, etc.)
- **Validation Questions**: `val###`
- **OCEAN Questions**: `oc###`

### Question Categories
- `entry`, `targeted`, `broad`, `validation`
- Semantic categories: `structural`, `role_clarity`, `worklife`, `meetings`, `team_dynamics`, `departmental`, `organizational`, `ocean_*`

### Signal Direction Values
- `'direct'` - Higher option value = higher signal strength
- `'inverse'` - Higher option value = lower signal strength
- `'mixed'` - Complex calculation required
- `'attention'` - Attention check validation

### Confidence Thresholds
```javascript
confidenceThresholds: {
    high: 0.85,    // Ready for intervention routing (25+ questions)
    medium: 0.65,  // Emerging pattern - targeted follow-ups (20+ questions)
    low: 0.30      // Weak signal - continue exploration
}
```

### Assessment Status Values
- `'continue_exploration'` - Keep asking questions
- `'need_targeted_followup'` - Focus on specific dimensions
- `'ready_for_optimization'` - Complete assessment

---

## Data Flow Architecture

### 1. Question Selection Process
```
User Response → Question Bank → Diagnostic Engine → Confidence Calculation → Next Question Type
```

### 2. Signal Processing Flow
```
Selected Option → calculateSignals() → Evidence Array → updateOptimizationVector() → UI Update
```

### 3. Completion Logic Flow
```
20+ Questions → High Confidence (>0.85) → Low Entropy (<0.5) → Intervention Recommendation
```

---

## Critical Dependencies and Mappings

### Display Name Mappings (MUST MATCH optimization vector keys)
```javascript
// adaptive-controller.js getDimensionName()
structuralEfficiency → 'Structural Barriers'
individualResilience → 'Individual Stress'
organizationalAlignment → 'Organizational Issues'
workLifeIntegration → 'Work-Life Integration'
meetingCultureOptimization → 'Meeting Culture'
teamPsychologicalSafety → 'Psychological Safety'
departmentalDynamics → 'Team Dynamics'
roleClarity → 'Role Clarity'
```

### Question Type Routing
```javascript
// question-bank.js determineQuestionType()
evidence.length < 6 → 'entry'
maxConfidence > 0.4 → 'targeted'
else → 'broad'
```

---

## File Structure and Responsibilities

### Core Assessment Files
- `diagnostic-engine.js` - AI logic and confidence calculation
- `question-bank.js` - 122 questions with signal definitions
- `adaptive-controller.js` - UI flow and session management
- `process-map.js` - Real-time visualization
- `index.html` - Assessment interface

### Backend Integration
- `supabase-schema.sql` - Database schema
- `supabase-integration.js` - Persistent storage

### Documentation
- `SSOT-APML-Registry.md` - This comprehensive registry
- `README.md` - Project overview and setup

---

## Validation Rules

### Data Integrity Checks
1. **Optimization Vector Keys**: Must match display mappings exactly
2. **Question IDs**: Must be unique across all 122 questions
3. **Signal Categories**: Must reference valid optimization vector fields
4. **Signal Directions**: Must be 'direct', 'inverse', 'mixed', or 'attention'
5. **Question Types**: Must be 'entry', 'targeted', 'broad', or 'validation'

### Consistency Requirements
1. All dimension names must use consistent casing and spelling
2. Signal category names must match optimization vector keys
3. Question categories must align with targeting logic
4. Validation pairs must reference existing questions

---

## Change Management Protocol

### When Adding New Dimensions
1. Update `optimizationVector` in `diagnostic-engine.js`
2. Add calculation method `calculate[Name]Optimization()`
3. Update `getDimensionName()` mapping in `adaptive-controller.js`
4. Update `getDimensionDescription()` mapping
5. Update `getDefaultIntervention()` mapping
6. Add corresponding questions with proper signal categories
7. Update this SSOT registry

### When Adding New Questions
1. Assign unique ID following conventions
2. Define proper signal categories matching optimization vector
3. Set appropriate question type and category
4. Add validation pairs if needed
5. Update question count documentation

### When Modifying Signal Logic
1. Update signal definitions in questions
2. Verify direction mappings ('direct', 'inverse', etc.)
3. Test optimization vector calculations
4. Validate UI display consistency
5. Update registry documentation

---

**Last Updated**: 2025-01-21
**Version**: 1.0.0
**Total Questions**: 122
**Diagnostic Dimensions**: 8
**Signal Categories**: 9 (including validation)