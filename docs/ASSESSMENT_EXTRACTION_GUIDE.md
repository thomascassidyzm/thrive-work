# Assessment Extraction Guide

## For Developers: How to Rebuild These Assessments in Any Tech Stack

This guide explains how to extract the assessment content and logic from our demos and rebuild them in your preferred framework (React, Vue, Flutter, Swift, Kotlin, etc.).

---

## Architecture Overview

Our assessments are built with **complete separation of concerns**:

```
┌─────────────────────────────────────────────────────┐
│           WHAT YOU NEED TO EXTRACT                  │
└─────────────────────────────────────────────────────┘

1. CONTENT (JSON files in /assessments/content/)
   ├── Questions, options, metadata
   ├── Scoring definitions
   ├── Privacy rules
   └── Framework-agnostic, portable data

2. LOGIC (JSON files in /assessments/logic/)
   ├── Routing rules (which question comes next)
   ├── Conditional branching
   ├── Recommendation algorithms
   └── Pure logic, no implementation details

3. PRESENTATION (demos in /assessments/demos/)
   ├── HTML/CSS/JS implementation
   ├── IGNORE THIS - rebuild in your stack
   └── Just reference for UX patterns
```

---

## Step 1: Understanding the JSON Schema

### Example: Cowch IMAGINE Assessment

**File:** `/assessments/content/cowch-imagine-schema.json`

```json
{
  "assessment": {
    "id": "cowch-imagine-v1",
    "name": "Cowch IMAGINE Framework Assessment",
    "framework": "IMAGINE",
    // ... metadata
  },

  "questions": [
    {
      "id": "IMAGINE-001",
      "dimension": "I",  // Which dimension this measures
      "text": "When you wake up in the morning...",
      "options": [
        {
          "id": "a",
          "text": "A sense of duty...",
          "pattern": "external_motivation",
          "score": { "I": 0.3, "N": 0.7 },  // Scoring weights
          "followUp": "What would happen if..."  // Optional reflection prompt
        }
      ]
    }
  ],

  "routingLogic": {
    "type": "probabilistic-branching",
    "rules": [
      {
        "if": {
          "question": "IMAGINE-001",
          "selectedOption": ["a", "c"]
        },
        "then": {
          "prioritize": ["mindset-questions", "nurture-questions"]
        }
      }
    ]
  },

  "scoringAlgorithm": {
    "dimensions": {
      "I": {
        "calculation": "weighted-average-of-I-scores",
        "interpretation": {
          "0-30": "Struggling to find intrinsic motivation...",
          "31-60": "Mixed motivation patterns...",
          "61-100": "Strong intrinsic motivation..."
        }
      }
    }
  }
}
```

---

## Step 2: Implementing the Core Engine

You need to build 3 core functions in your chosen language:

### 2.1 Question Navigation

```javascript
// PSEUDO-CODE - implement in your language

function getNextQuestion(responses, routingLogic, allQuestions) {
    // 1. Check if routing logic applies
    for (rule in routingLogic.rules) {
        if (evaluateCondition(rule.if, responses)) {
            // 2. Apply routing action
            if (rule.then.prioritize) {
                return findNextQuestionInCategories(
                    rule.then.prioritize,
                    allQuestions,
                    responses
                );
            }
        }
    }

    // 3. Default: return next unanswered question
    return allQuestions.find(q => !isAnswered(q, responses));
}
```

**What you need:**
- Loop through routing rules
- Evaluate conditions (match question IDs + selected options)
- Return appropriate next question

### 2.2 Score Calculation

```javascript
// PSEUDO-CODE

function calculateScores(responses, questions, scoringAlgorithm) {
    const scores = {};

    // For each dimension (I, M, A, G, I2, N, E)
    for (dimension in scoringAlgorithm.dimensions) {
        // Get all responses that measure this dimension
        const relevantResponses = responses.filter(r => {
            const question = questions.find(q => q.id === r.questionId);
            return question.dimension === dimension;
        });

        // Calculate weighted average
        const totalScore = relevantResponses.reduce((sum, r) => {
            const option = getOptionById(r.questionId, r.optionId, questions);
            return sum + option.score[dimension];
        }, 0);

        scores[dimension] = (totalScore / relevantResponses.length) * 100;
    }

    return scores;
}
```

**What you need:**
- Extract score weights from each option's `score` object
- Group by dimension
- Calculate weighted average
- Scale to 0-100

### 2.3 Recommendation Generation

```javascript
// PSEUDO-CODE

function generateRecommendations(scores, flags, resultActions) {
    const recommendations = [];

    for (rule in resultActions.recommendations) {
        // Check if score range matches
        if (scoreInRange(scores[rule.if.dimension], rule.if.score)) {
            // Check additional conditions (AND logic)
            if (rule.if.and) {
                if (rule.if.and.flagForCoaching && flags.length > 0) {
                    recommendations.push(rule.recommend);
                }
            } else {
                recommendations.push(rule.recommend);
            }
        }
    }

    return recommendations;
}
```

**What you need:**
- Evaluate score thresholds
- Check for flags (coaching needs)
- Return matching recommendations

---

## Step 3: Tech Stack Examples

### React Implementation

```jsx
// AssessmentEngine.tsx
import { useState, useEffect } from 'react';
import assessmentData from './content/cowch-imagine-schema.json';

export function useAssessment() {
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [responses, setResponses] = useState([]);
    const [scores, setScores] = useState(null);

    useEffect(() => {
        // Load first question
        setCurrentQuestion(getNextQuestion(responses, assessmentData));
    }, [responses]);

    const recordResponse = (questionId, optionId) => {
        const newResponses = [...responses, { questionId, optionId }];
        setResponses(newResponses);

        // Check if complete
        if (newResponses.length === assessmentData.questions.length) {
            setScores(calculateScores(newResponses, assessmentData));
        }
    };

    return { currentQuestion, recordResponse, scores };
}

// Question.tsx
export function Question({ question, onAnswer }) {
    return (
        <div className="question">
            <h3>{question.text}</h3>
            {question.options.map(option => (
                <button
                    key={option.id}
                    onClick={() => onAnswer(question.id, option.id)}
                >
                    {option.text}
                </button>
            ))}
        </div>
    );
}
```

### Flutter (Dart) Implementation

```dart
// assessment_model.dart
class AssessmentEngine {
  final Map<String, dynamic> assessmentData;
  List<Response> responses = [];

  AssessmentEngine(this.assessmentData);

  Question? getNextQuestion() {
    // Implement routing logic
    final routingLogic = assessmentData['routingLogic'];

    for (var rule in routingLogic['rules']) {
      if (_evaluateCondition(rule['if'])) {
        return _findQuestionInCategories(rule['then']['prioritize']);
      }
    }

    // Default: next unanswered
    return _getNextUnanswered();
  }

  void recordResponse(String questionId, String optionId) {
    responses.add(Response(questionId, optionId));
  }

  Map<String, int> calculateScores() {
    // Implement scoring algorithm
  }
}

// question_widget.dart
class QuestionWidget extends StatelessWidget {
  final Question question;
  final Function(String, String) onAnswer;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(question.text),
        ...question.options.map((option) =>
          ElevatedButton(
            onPressed: () => onAnswer(question.id, option.id),
            child: Text(option.text),
          )
        ).toList(),
      ],
    );
  }
}
```

### Backend API (Node.js/Express)

```javascript
// routes/assessment.js
const express = require('express');
const router = express.Router();
const assessmentData = require('../content/cowch-imagine-schema.json');

// Start new assessment
router.post('/start', (req, res) => {
    const session = {
        sessionId: generateId(),
        assessmentId: assessmentData.assessment.id,
        responses: [],
        currentQuestionIndex: 0
    };

    // Store in database
    await db.sessions.insert(session);

    res.json({
        sessionId: session.sessionId,
        firstQuestion: assessmentData.questions[0]
    });
});

// Record response and get next question
router.post('/respond', async (req, res) => {
    const { sessionId, questionId, optionId } = req.body;

    // Load session
    const session = await db.sessions.findOne({ sessionId });

    // Record response
    session.responses.push({ questionId, optionId });

    // Get next question
    const nextQuestion = getNextQuestion(
        session.responses,
        assessmentData.routingLogic,
        assessmentData.questions
    );

    await db.sessions.update({ sessionId }, session);

    if (nextQuestion) {
        res.json({ question: nextQuestion });
    } else {
        // Assessment complete - calculate scores
        const scores = calculateScores(session.responses, assessmentData);
        res.json({ complete: true, scores });
    }
});
```

---

## Step 4: Privacy Implementation

### Employer Dashboard Aggregation

**Critical:** Never expose individual responses to employers.

```javascript
// aggregation-service.js

function aggregateForEmployer(individualResults, privacyModel) {
    const k = privacyModel.aggregationRules.minimumRespondents;

    // ENFORCE K-ANONYMITY
    if (individualResults.length < k) {
        return {
            error: 'PRIVACY_THRESHOLD_NOT_MET',
            message: `Need ${k} respondents, have ${individualResults.length}`,
            threshold: k
        };
    }

    // Only aggregate metrics defined as shareable
    const aggregated = {};

    for (const metric of privacyModel.aggregationRules.sharedMetrics) {
        switch (metric) {
            case 'engagement-rate':
                aggregated.averageEngagement =
                    individualResults.reduce((sum, r) => sum + r.engagementRate, 0) /
                    individualResults.length;
                break;

            case 'completion-rate':
                aggregated.completionRate =
                    individualResults.filter(r => r.completed).length /
                    individualResults.length;
                break;
        }
    }

    return {
        totalRespondents: individualResults.length,
        metrics: aggregated,
        privacyCompliant: true
    };
}
```

---

## Step 5: Testing Your Implementation

### Validation Checklist

- [ ] **Load JSON:** Can parse all assessment JSON files
- [ ] **Display questions:** Show question text and options correctly
- [ ] **Record responses:** Store user selections
- [ ] **Routing logic:** Next question matches routing rules
- [ ] **Scoring:** Calculated scores match expected values
- [ ] **Recommendations:** Generated recommendations match conditions
- [ ] **Privacy:** k-anonymity enforced for employer data
- [ ] **Follow-ups:** Display optional reflection prompts
- [ ] **Flags:** Coaching flags detected and stored

### Test Cases

```javascript
// test-assessment-engine.js

describe('Cowch IMAGINE Assessment', () => {
    test('should prioritize mindset questions after survival-mode response', () => {
        const responses = [{
            questionId: 'IMAGINE-001',
            selectedOptionId: 'c'  // Survival mode answer
        }];

        const nextQuestion = getNextQuestion(responses, assessmentData);

        expect(nextQuestion.category).toBe('mindset');
    });

    test('should calculate Inspiration score correctly', () => {
        const responses = [
            { questionId: 'IMAGINE-001', selectedOptionId: 'b' },  // I: 0.9
            { questionId: 'IMAGINE-003', selectedOptionId: 'a' }   // I: 0.5
        ];

        const scores = calculateScores(responses, assessmentData);

        expect(scores.I).toBe(70);  // (0.9 + 0.5) / 2 * 100 = 70
    });

    test('should enforce k-anonymity for employer data', () => {
        const results = generateEmployerData(5, assessmentData);  // Only 5 respondents

        expect(results.error).toBe('PRIVACY_THRESHOLD_NOT_MET');
        expect(results.threshold).toBe(10);
    });
});
```

---

## Step 6: Extending to Other Assessments

The same architecture works for **all** Thrive assessments:

- **Neuroindicator:** Same JSON format, different questions/routing
- **OCEAN:** Same scoring algorithm, different dimensions (O, C, E, A, N)
- **Limitless (Tom's 13):** Same structure, 13 framework dimensions
- **Quarterly Pulse:** Simplified version, trend tracking over time

### Generic Implementation

```javascript
// generic-assessment-loader.js

async function loadAssessment(assessmentId) {
    const assessmentData = await fetch(`/content/${assessmentId}.json`);
    return new AssessmentEngine(assessmentData);
}

// Use for any assessment
const cowchAssessment = await loadAssessment('cowch-imagine-v1');
const oceanAssessment = await loadAssessment('ocean-v1');
const limitlessAssessment = await loadAssessment('limitless-13-v1');
```

---

## Step 7: What NOT to Change

When rebuilding in your stack, **preserve these elements**:

### ✅ Keep Intact:
- Question IDs and text
- Option IDs and scoring weights
- Routing logic conditions
- Privacy rules (k-anonymity, shareable metrics)
- Interpretation ranges
- Recommendation conditions

### 🎨 Customize Freely:
- UI design and styling
- Animation and transitions
- Chat bubble appearance
- Button styles
- Layout and spacing
- Loading states
- Error messages (tone/wording)

---

## Resources

### JSON Schemas
- `/assessments/content/` - All assessment definitions
- `/assessments/logic/` - Routing and recommendation rules

### Reference Implementation
- `/assessments/engines/generic-assessment-engine.js` - JavaScript reference
- `/assessments/demos/` - Working HTML demos

### Testing Data
- `/assessments/test-cases/` - Expected outputs for validation

---

## Support

Questions about implementation? Contact the Thrive development team or refer to:

- [Assessment Schema Documentation](./ASSESSMENT_SCHEMA.md)
- [Privacy Architecture Guide](./PRIVACY_ARCHITECTURE.md)
- [Scoring Algorithms Explained](./SCORING_ALGORITHMS.md)

---

**Remember:** The demos are proof-of-concept. Your production version should be faster, prettier, and better integrated with your app. But the assessment content and logic should remain identical to ensure consistency across all Thrive platforms.
