# Portable Assessment JSON Files

This directory contains all Thrive assessment question banks in portable JSON format, ready to be used with any platform like Quizzle or custom implementations.

## Available Assessments

### 1. Workplace Patterns Assessment
**File:** `workplace-patterns-questions.json`
- **Questions:** 20
- **Time:** 8-10 minutes
- **Format:** 5-point Likert scale (Strongly Disagree to Strongly Agree)
- **OCEAN Dimensions:** All 5 (Openness, Conscientiousness, Extraversion, Agreeableness, Emotional Stability)
- **Privacy:** Workplace shareable (aggregated data can be shared with employers if k≥10)
- **Use Case:** B2B onboarding, team dynamics, workplace behavioral patterns
- **Target Audience:** Corporate employees, team members

### 2. Full OCEAN Behavioral Analysis
**File:** `ocean-full-questions.json`
- **Questions:** 60
- **Time:** 15-25 minutes
- **Format:** 4-option scenario-based multiple choice
- **OCEAN Dimensions:** Comprehensive coverage of all 5 dimensions
- **Privacy:** Mixed (personal + workplace shareable)
- **Use Case:** Comprehensive personality profiling, self-understanding, relationship insights
- **Target Audience:** General users seeking deep behavioral insights

### 3. Viral Game Assessment
**File:** `viral-game-questions.json`
- **Questions:** 12
- **Time:** 5 minutes
- **Format:** 4-option scenario-based (gamified with emojis)
- **Result Types:** 16 personality archetypes
- **Privacy:** Fully shareable
- **Use Case:** Lead magnet, viral sharing, social media engagement
- **Target Audience:** General public, social media users
- **Features:** Social sharing, archetype matching, famous person comparisons

## JSON Schema Structure

All assessment files follow a consistent schema:

```json
{
  "assessment_meta": {
    "id": "unique_id",
    "title": "Assessment Title",
    "description": "Brief description",
    "version": "1.0",
    "estimated_time_minutes": 10,
    "target_audience": "Target group",
    "privacy_level": "privacy classification",
    "question_count": 20
  },
  "instructions": {
    "intro": "Introduction text",
    "response_format": "How to respond",
    "time_guidance": "Time expectations"
  },
  "questions": [
    {
      "id": "Q001",
      "text": "Question text or scenario",
      "options": [...],
      "ocean_dimension": "openness|conscientiousness|extraversion|agreeableness|emotional_stability",
      "category": "question category",
      "privacy_level": "personal|workplace_shareable|shareable",
      "reverse_scored": false
    }
  ],
  "scoring": {
    "dimensions": [
      {
        "name": "Dimension Name",
        "description": "What this measures",
        "questions": ["Q001", "Q002", ...],
        "interpretation": {
          "high": "High score interpretation",
          "medium": "Medium score interpretation",
          "low": "Low score interpretation"
        }
      }
    ]
  }
}
```

## Scoring Guidelines

### Likert Scale (Workplace Assessment)
- **Scale:** 1-5 (Strongly Disagree to Strongly Agree)
- **Scoring:** Average responses per dimension
- **Percentile Conversion:** `((avgScore - 1) / 4) * 100`
- **Interpretation Ranges:**
  - High: ≥65%
  - Medium: 35-65%
  - Low: <35%

### Scenario-Based (OCEAN Full & Viral Game)
- **Scale:** 1-4 (4 options per scenario)
- **Scoring:** Average responses per dimension
- **Percentile Conversion:** `((avgScore - 1) / 3) * 100`
- **Interpretation Ranges:**
  - High: ≥65%
  - Medium: 35-65%
  - Low: <35%

### Reverse Scoring
Questions with `"reverse_scored": true` should be inverted:
- **Likert (1-5):** `reversed = 6 - original`
- **Scenario (1-4):** `reversed = 5 - original`

This is commonly used for Neuroticism questions when measuring Emotional Stability (inverse relationship).

## OCEAN Dimensions

### Openness (O)
Measures curiosity, creativity, imagination, artistic appreciation, and willingness to try new experiences.

**High scorers:** Creative, curious, imaginative, open to new ideas
**Low scorers:** Practical, conventional, prefer familiar approaches

### Conscientiousness (C)
Measures organization, planning, discipline, reliability, and attention to detail.

**High scorers:** Organized, reliable, disciplined, goal-oriented
**Low scorers:** Spontaneous, flexible, adaptable, less structured

### Extraversion (E)
Measures social energy, assertiveness, enthusiasm, and need for stimulation.

**High scorers:** Outgoing, energetic, talkative, enjoy social interaction
**Low scorers:** Reserved, quiet, prefer solitude, need time alone to recharge

### Agreeableness (A)
Measures cooperation, empathy, trust, kindness, and concern for others.

**High scorers:** Empathetic, cooperative, trusting, conflict-averse
**Low scorers:** Skeptical, competitive, direct, comfortable with conflict

### Emotional Stability (inverse of Neuroticism) (N)
Measures emotional resilience, stress management, and mood stability.

**High scorers:** Calm, resilient, emotionally stable, handle stress well
**Low scorers:** Sensitive to stress, emotionally reactive, anxious

## Privacy Classifications

### `personal`
- Data visible only to the individual
- Not aggregated or shared with employers
- Used for: Deep personal insights, sensitive topics, relationships

### `workplace_shareable`
- Can be aggregated for employer insights
- Requires k-anonymity (k≥10 responses minimum)
- Individual data remains private
- Used for: Team dynamics, work patterns, collaboration styles

### `shareable`
- Fully shareable on social media
- No privacy restrictions
- Designed for viral engagement
- Used for: Lead generation, social sharing, gamified assessments

## Integration Examples

### Using with Quizzle

```javascript
// Load assessment
const assessment = await fetch('workplace-patterns-questions.json').then(r => r.json());

// Initialize Quizzle
const quiz = new Quizzle({
  questions: assessment.questions,
  scoring: assessment.scoring,
  onComplete: (results) => {
    // Handle results
  }
});
```

### Custom Implementation

```javascript
// Calculate dimension scores
function calculateScores(responses, assessment) {
  const scores = {};

  assessment.scoring.dimensions.forEach(dim => {
    let total = 0;
    let count = 0;

    dim.questions.forEach(qId => {
      const question = assessment.questions.find(q => q.id === qId);
      let score = responses[qId];

      // Handle reverse scoring
      if (question.reverse_scored) {
        const maxValue = question.scale === '1-5' ? 6 : 5;
        score = maxValue - score;
      }

      total += score;
      count++;
    });

    const avgScore = total / count;
    const maxScale = assessment.questions[0].scale === '1-5' ? 4 : 3;
    const percentile = ((avgScore - 1) / maxScale) * 100;

    scores[dim.name] = {
      average: avgScore.toFixed(1),
      percentile: Math.round(percentile),
      interpretation: getInterpretation(percentile, dim.interpretation)
    };
  });

  return scores;
}

function getInterpretation(percentile, interp) {
  if (percentile >= 65) return interp.high;
  if (percentile >= 35) return interp.medium;
  return interp.low;
}
```

## File Compatibility

These JSON files are compatible with:
- ✅ Quizzle
- ✅ TypeForm
- ✅ SurveyJS
- ✅ Google Forms (with import script)
- ✅ Custom web applications
- ✅ Mobile apps (iOS/Android)
- ✅ Backend assessment engines

## Version History

- **v1.0** (2025-11-13): Initial release
  - 3 complete assessments
  - 92 total questions
  - Full OCEAN coverage
  - Privacy classification system
  - Archetype matching for viral game

## License & Usage

These assessment files are part of the Thrive platform. For commercial use or integration into external platforms, please contact the Thrive team.

## Support

For questions about integration or custom implementations:
- Documentation: `/thrive-work/assessments/README.md`
- Architecture: `/thrive-work/architecture/ARCHITECTURE.md`
- Support: Contact Thrive development team
