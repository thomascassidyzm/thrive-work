# THRIVE AI-Based Diagnostic Assessment System

## Overview

This is a complete refactor of the original static dimension selector into an **AI-powered probabilistic assessment system** that uses conditional logic to identify whether workplace dysfunction stems from individual, organizational, or systemic sources.

## Core Philosophy

**"At the very least, humans are inconsistent. So anything we can do to calibrate and regulate consistency is a very good thing."**

Instead of boolean decision trees, the system uses **probabilistic confidence scoring** to avoid overfitting and provide nuanced diagnostic insights.

## System Architecture

### 1. DiagnosticEngine.js
**Probabilistic Conditional Logic Engine**
- Maintains confidence vectors across 8 diagnostic dimensions
- Uses sigmoid functions to calculate weighted probabilities
- Employs ensemble approaches to prevent overfitting
- Real-time uncertainty calculation and entropy analysis

**Key Features:**
- Confidence thresholds (high: 0.75, medium: 0.40, low: 0.15)
- Cross-referencing signals for pattern validation
- Intervention routing based on confidence scores
- State persistence for session continuity

### 2. QuestionBank.js
**Intelligent Question Management**
- 20+ behavioral scenario questions with weighted signals
- Entry questions (weekly preparedness framework)
- Targeted follow-ups based on emerging patterns
- Broad exploratory questions for pattern building

**Question Types:**
- **Entry**: Weekly preparedness, organization, agency
- **Targeted**: Meeting culture, work-life integration, psychological safety
- **Broad**: General workplace patterns and energy flows

### 3. AdaptiveController.js
**User Experience Orchestration**
- Manages assessment flow and state
- Real-time progress tracking and insights display
- Session restoration and data persistence
- Intervention routing upon completion

## Diagnostic Framework

### Primary Analysis Dimensions

1. **Structural Barriers** - Process/resource limitations
2. **Individual Stress** - Personal stress management patterns
3. **Organizational Dysfunction** - Company-wide cultural issues
4. **Work-Life Integration** - Boundary and transition difficulties
5. **Meeting Culture** - Meeting inefficiency and participation issues
6. **Psychological Safety** - Comfort with vulnerability and voice
7. **Departmental Issues** - Team-specific dynamics
8. **Role Clarity** - Expectation alignment and skill match

### Signal Processing

Each question generates **weighted signals** across multiple dimensions:

```javascript
// Example: Meeting participation question
signals: {
    meetings: {
        speak_up: 'direct',
        participation_comfort: 'direct'
    },
    psychologicalSafety: {
        speak_up_comfort: 'direct',
        voice_safety: 'direct'
    }
}
```

Values are normalized to -2 to +2 range for sigmoid processing, preventing extreme probability swings.

## Key Innovations

### 1. **Probabilistic vs Boolean Logic**
- **Traditional**: `if (preparedness < 3) { showStructuralQuestions(); }`
- **THRIVE**: Builds confidence scores across all dimensions simultaneously

### 2. **Adaptive Questioning**
- Questions selected based on information theory (highest uncertainty areas)
- Dynamic flow: Entry → Targeted → Confirmatory
- Stops when confidence threshold reached (8-25 questions)

### 3. **Source Attribution Analysis**
Distinguishes between:
- **Individual issues** → Dr. Thomas neuroevaluator/OCEAN assessment
- **Organizational issues** → Management consultation + aggregate reporting
- **Departmental issues** → Team coaching and dynamics work
- **Mixed issues** → Dual-track approach

### 4. **Real-Time Insights**
- Live confidence indicators during assessment
- Emerging pattern display
- Intervention readiness notifications

## Assessment Flow

```
Entry Questions (3-4) → Pattern Recognition → Targeted Follow-ups → Completion
     ↓                       ↓                     ↓                ↓
Weekly Prep Analysis → Confidence Building → Uncertainty Reduction → Intervention Routing
```

### Completion Criteria
- **High Confidence**: >75% confidence in primary pattern + low entropy
- **Question Limit**: Maximum 25 questions to prevent fatigue
- **Minimum Questions**: At least 8 questions for reliability

## Intervention Routing

Based on primary dysfunction pattern:

- **Structural Barriers** → Organizational consultation
- **Individual Stress** → Personal coaching/neuroevaluator
- **Psychological Safety** → Team development programs
- **Meeting Culture** → Productivity optimization
- **Work-Life Integration** → Boundary coaching
- **Role Clarity** → HR consultation/role optimization

## Technical Implementation

### Data Persistence
- localStorage with backup strategies
- Session restoration on page reload
- State compression for URL sharing

### Performance Optimization
- Lazy question loading
- Progressive enhancement
- Mobile-responsive design
- Accessibility compliance

### Integration Points
- Seamless handoff to existing THRIVE coaching system
- Aggregate data collection for organizational insights
- Integration with Supabase backend (future)

## Usage Instructions

### For Users
1. Navigate to `/assessment/`
2. Answer questions honestly - system adapts to your responses
3. Watch confidence indicators build in real-time
4. Receive personalized intervention recommendations
5. Proceed to coaching or organizational consultation

### For Developers
1. All files are in `/assessment/` directory
2. No build process required - pure HTML/CSS/JS
3. Modular architecture allows easy extension
4. Well-documented APIs for integration

## Benefits Over Original System

### User Experience
- **Lower friction**: Starts with simple questions vs choosing dimensions
- **Personalized flow**: Adapts based on individual patterns
- **Faster insights**: 8-15 minutes vs 60+ questions
- **Better outcomes**: Precise problem identification

### Business Value
- **Higher conversion**: Targeted intervention routing
- **Dual revenue streams**: Individual + organizational services
- **Better data**: Rich behavioral insights vs static responses
- **Scalable**: Works across diverse populations and contexts

## Future Enhancements

### Phase 2: Advanced AI
- Machine learning model training on response patterns
- Predictive analytics for intervention success
- Natural language processing for open-text responses
- Integration with wearable/biometric data

### Phase 3: Organizational Intelligence
- Department-level pattern analysis
- Company culture mapping
- Predictive workforce analytics
- ROI tracking for interventions

## Testing & Validation

### Current Status
- ✅ Core engine implemented and tested
- ✅ Question bank with weighted signals
- ✅ Adaptive UI with real-time updates
- ✅ Session persistence and restoration
- ⏳ User testing and feedback integration
- ⏳ Clinical validation with Dr. Thomas

### Validation Metrics
- Assessment-intervention alignment accuracy
- User satisfaction scores
- Time-to-insight measurements
- Intervention success rates

---

**This system represents a fundamental shift from static assessment to intelligent diagnostic triage - matching each individual with the most appropriate intervention pathway while building organizational intelligence for systemic improvements.**