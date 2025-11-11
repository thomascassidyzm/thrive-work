# 🎯 THRIVE Viral Assessment Funnel

## Overview

Three-stage progressive engagement funnel that transforms a 5-minute viral game into a comprehensive personality assessment with AI coaching.

## The Funnel

```
STAGE 1: Viral Game (10 questions, 5 minutes)
  ↓ "Want to know more?"

STAGE 2: Deep Dive (10 questions, 5 minutes)
  ↓ "Get your complete profile"

STAGE 3: Full OCEAN Assessment (60 questions, 15 minutes)
  ↓ AI Coach + Pattern Adjustment Dashboard
```

## Stage 1: Viral Game (`/viral-game.html`)

**Purpose:** Shareable entry point that reveals automatic vs conscious patterns

**Key Features:**
- 10 questions randomly selected from question banks
- Transforms THRIVE questions to "automatic vs conscious" format
- "Are You Sure?" reflection moments at questions 3, 6, 9
- Results show % automatic vs conscious
- **CTA:** "Want to Know More?" → Stage 2
- **Alternative:** "Skip to Full OCEAN Assessment"

**Viral Mechanics:**
- Quick (5 minutes)
- Reveals something surprising ("You're running on autopilot")
- Non-threatening results (pattern observation, not diagnosis)
- Shareable ("What Are You Like?")

**Technical:**
- Uses existing question banks
- Auto-detects automatic patterns (high N, low C, negative E)
- Stores results in `sessionStorage` as `viralGameResults`

## Stage 2: Deep Dive (`/viral-game-stage2.html`)

**Purpose:** Catch contradictions, show pattern shifts, deepen commitment

**Key Features:**
- Shows Stage 1 summary
- 10 NEW questions (different from Stage 1)
- Detects pattern shifts between stages
- Reveals contradictions: "You said X, but in this situation you chose Y"
- Combined analysis (20 questions total)
- **CTA:** "Get My Complete Profile" → Stage 3

**The Hook:**
- "This gets uncomfortable. That's the point."
- "We're going to show you exactly where the gaps are"
- Shows specific contradictions in results
- Pattern shift detection (e.g., "automatic increased from 50% to 70%")

**Technical:**
- Loads Stage 1 results from `sessionStorage`
- Excludes Stage 1 question IDs to ensure new questions
- Combines both stages for deeper analysis
- Stores in `viralGameStage2Results`

## Stage 3: Full OCEAN (`/ocean-assessment.html`)

**Purpose:** Comprehensive personality profile with AI coaching

**Key Features:**
- 60 questions with balanced OCEAN coverage
- Confidence checkpoints at 20/40/60 questions
- Full OCEAN percentiles (5 traits)
- Pattern adjustment dashboard
- AI coach integration with personality-aware responses
- Download PDF, print, share with coach

**Integration:**
- Can load viral game results for context
- Could show: "Based on your 70% automatic pattern in Stage 1, here's how your OCEAN profile explains that..."
- AI coach receives full OCEAN context + viral game patterns

## User Journey Flow

### Path A: Full Funnel (Ideal)
```
Homepage → Viral Game (5 min)
  ↓ Hooked by insight
Stage 2 Deep Dive (5 min)
  ↓ Pattern shift detected
Full OCEAN Assessment (15 min)
  ↓ Complete personality profile
AI Coach + Pattern Adjustment
```

### Path B: Skip Ahead
```
Homepage → Viral Game (5 min)
  ↓ "Skip to Full Assessment"
Full OCEAN Assessment (15 min)
  ↓
AI Coach + Pattern Adjustment
```

### Path C: Direct Entry (Existing)
```
Homepage → Full OCEAN Assessment (15 min)
  ↓
AI Coach + Pattern Adjustment
```

## Navigation Updates

**Homepage (`/index.html`):**
- "Start Your Assessment" → `/viral-game.html` (was `/game/`)
- "Take Quick Assessment" → `/viral-game.html` (was `/ocean-assessment.html`)

**Viral Game CTAs:**
- Primary: "YES - SHOW ME MORE" → `/viral-game-stage2.html`
- Secondary: "Skip to Full OCEAN Assessment" → `/ocean-assessment.html`
- Tertiary: "Start Over" → Restart Stage 1

**Stage 2 CTAs:**
- Primary: "GET MY COMPLETE PROFILE" → `/ocean-assessment.html`
- Secondary: "Review Stage 1 Results" → `/viral-game.html`

## Data Storage

**Session Storage:**
```javascript
// Stage 1
sessionStorage.setItem('viralGameResults', JSON.stringify({
    responses: [...],
    analysis: {
        patternType: 'significant_automatic',
        automaticPercentage: 70,
        consciousPercentage: 30,
        reflectionCount: 2
    },
    timestamp: Date.now()
}));

// Stage 2
sessionStorage.setItem('viralGameStage2Results', JSON.stringify({
    responses: [...],
    analysis: {
        combinedAutoPercent: 65,
        stage2AutoPercent: 60,
        hasContradiction: true,
        contradictionText: "Pattern shifted from 70% to 60%..."
    },
    timestamp: Date.now()
}));
```

## Technical Architecture

**Question Transformation:**
```javascript
// Transforms THRIVE questions to game format
function transformQuestionForGame(q) {
    const transformedOptions = q.options.map(opt => {
        // Detect automatic patterns from OCEAN scores
        const isAutomatic = (
            (opt.ocean?.N > 0.5) ||   // High neuroticism
            (opt.ocean?.C < -0.2) ||  // Low conscientiousness
            (opt.ocean?.E < -0.3)     // Low extraversion
        );

        return {
            text: opt.text,
            pattern: isAutomatic ? 'automatic' : 'conscious',
            domain: q.domain,
            ocean: opt.ocean
        };
    });
}
```

**Random Selection:**
- Stage 1: Random 10 from all questions (revelation score ≥ 6)
- Stage 2: Random 10 excluding Stage 1 IDs
- Stage 3: Random 60 with balanced OCEAN coverage (min 8 per dimension)

**Visual Design:**
- Consistent dark gradient background (#1a1a2e → #16213e → #0f3460)
- Yellow accent (#ffff00) for THRIVE brand
- Animated particles for engagement
- Smooth cross-fade transitions (900ms auto-advance)
- Glass-morphism cards (backdrop-filter blur)

## Conversion Optimization

**Stage 1 → Stage 2:**
- Hook: "Want to know more?" (curiosity)
- Value: "Show you exactly where the gaps are"
- Social proof: Already invested 5 minutes
- **Expected conversion:** 40-60%

**Stage 2 → Stage 3:**
- Hook: Pattern contradictions revealed
- Value: "Complete personality profile"
- Commitment: Already invested 10 minutes
- **Expected conversion:** 60-80%

**Overall funnel:**
- 100 visitors → 50 complete Stage 1 → 30 complete Stage 2 → 20 complete Stage 3
- **Net conversion:** 20% (vs. 5-10% for direct entry)

## Future Enhancements

1. **Email capture at Stage 2**
   - "Send me my full report when I complete Stage 3"
   - Captures lead even if they don't finish

2. **Social sharing**
   - "Share your pattern" buttons
   - "Challenge a friend" functionality
   - Twitter/LinkedIn integration

3. **A/B Testing**
   - Different CTAs
   - Different result presentations
   - Skip vs. continue rates

4. **Analytics**
   - Track conversion at each stage
   - Identify drop-off points
   - Optimize question selection

5. **Personalization**
   - Use Stage 1 results to customize Stage 2 questions
   - Adaptive difficulty based on engagement

## Files Created

- `/viral-game.html` - Stage 1 (10 questions)
- `/viral-game-stage2.html` - Stage 2 (10 questions)
- Updated `/index.html` - Navigation changes

## Files Modified

- `/index.html` - Updated CTAs to viral game entry point

## Integration with Existing System

**Compatible with:**
- All existing question banks (vitality, relationships, thoughts, health, vision)
- OCEAN assessment system
- Results capture service (IndexedDB)
- AI coach integration
- Pattern adjustment dashboard

**No breaking changes** - all existing entry points still work
