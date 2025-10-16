# ClearMinds Neuroindicator - Question Design Rationale

## Overview

The Neuroindicator uses 15 carefully sequenced questions to screen across multiple mental health and wellbeing dimensions. This document explains the clinical and UX rationale behind question selection and ordering.

---

## Core Design Principles

### 1. **Evidence-Based Assessment**
Questions are adapted from validated screening tools:
- **PHQ-9** (Patient Health Questionnaire-9) - Depression screening
- **GAD-7** (Generalized Anxiety Disorder-7) - Anxiety screening
- **ASRS** (Adult ADHD Self-Report Scale) - Attention difficulties
- **Sleep quality scales** - Insomnia/sleep disturbance
- **Functional impairment assessment** - Real-world impact

### 2. **Safety-First Approach**
Crisis screening appears early (Q2) to enable immediate intervention if needed, rather than waiting until the end of assessment.

### 3. **Funnel Sequencing: General → Specific**
Start broad (overall wellbeing) then narrow to specific symptom domains (sleep, mood, focus). This prevents priming bias and allows natural pattern emergence.

### 4. **Multi-Dimensional Coverage**
Questions map to 8 diagnostic dimensions:
- Crisis/safety
- Baseline wellness
- Stress/anxiety
- Sleep/energy
- Attention/focus
- Mood regulation
- Somatic symptoms
- Life stressors/context

### 5. **Contextual Information**
Later questions (duration, attempts, support) provide context for interpretation - distinguishing acute stress from chronic conditions, self-management capacity, and treatment history.

---

## Question-by-Question Rationale

### **Q1: Overall Wellbeing** (Baseline)
**Text:** "How would you describe your overall wellbeing right now?"

**Why First:**
- **Sets baseline expectation** - Establishes general wellness level before specific symptoms
- **Low threat level** - Easy opening question, not intimidating
- **Calibration anchor** - Helps interpret later responses in context
- **Broad capture** - People in crisis will score very low, baseline wellness will score high

**Clinical Basis:**
- Global assessment of functioning (GAF) principle
- Subjective wellbeing scales (WHO-5, SWLS)

**Signals Generated:**
- `baselineWellness` (direct correlation)
- `crisis` (inverse - very low wellbeing flags crisis screening)

---

### **Q2: Self-Harm/Suicide Screening** (Crisis Detection)
**Text:** "In the past 2 weeks, have you had thoughts of self-harm or suicide?"

**Why Second (Early Crisis Detection):**
- **Safety priority** - Identifies crisis cases immediately
- **Prevents assessment fatigue** - Don't make at-risk users complete 15 questions before help
- **Ethical obligation** - Early intervention for highest-risk users
- **Critical flag** - Auto-routes to crisis intervention (bypasses rest of assessment)

**Clinical Basis:**
- PHQ-9 Item 9 (suicidal ideation)
- Columbia Suicide Severity Rating Scale (C-SSRS) principles
- NICE guidelines recommend direct questioning about self-harm/suicide

**Signals Generated:**
- `crisis` (direct - highest weight)
- `moodRegulation` (correlated signal)

**Special Handling:**
- Responses ≥5 trigger immediate crisis intervention
- Assessment terminates, shows 999/Samaritans/A&E resources

---

### **Q3: Sleep Quality**
**Text:** "How well are you sleeping?"

**Why Third:**
- **Universal relevance** - Everyone can answer, non-threatening
- **High diagnostic value** - Sleep disturbance correlates with anxiety, depression, stress, ADHD
- **Treatable symptom** - Sleep hygiene interventions are accessible and evidence-based
- **Cross-cutting indicator** - Poor sleep feeds into multiple pathways

**Clinical Basis:**
- Insomnia Severity Index (ISI)
- Sleep disturbance is transdiagnostic (appears across most mental health conditions)
- Pittsburgh Sleep Quality Index (PSQI)

**Signals Generated:**
- `sleepEnergy` (direct)
- `stressAnxiety` (moderate correlation)
- `baselineWellness` (inverse)

---

### **Q4: Stress/Anxiety Frequency**
**Text:** "How often do you feel stressed or anxious?"

**Why Fourth:**
- **High prevalence** - Most common mental health concern
- **Builds on sleep** - Natural progression from sleep disturbance
- **Differentiates acute vs chronic** - Frequency language important
- **Gateway question** - Opens up stress/anxiety pathway

**Clinical Basis:**
- GAD-7 frequency scale ("not at all" to "nearly every day")
- Perceived Stress Scale (PSS)

**Signals Generated:**
- `stressAnxiety` (direct)
- `baselineWellness` (inverse)
- `somaticSymptoms` (moderate - anxiety often somaticizes)

---

### **Q5: Concentration/Focus**
**Text:** "How is your ability to concentrate and focus?"

**Why Fifth:**
- **ADHD screening** - Primary indicator for attention difficulties
- **Secondary to sleep/anxiety** - Concentration problems can stem from other causes (sleep, anxiety, depression)
- **Functional impact** - Focus difficulties affect work/study performance
- **Differential diagnosis** - Helps distinguish ADHD from anxiety/depression

**Clinical Basis:**
- ASRS (Adult ADHD Self-Report Scale) - concentration/attention items
- DSM-5 ADHD criteria (inattention symptoms)

**Signals Generated:**
- `attentionFocus` (direct)
- `sleepEnergy` (moderate - poor sleep impairs focus)
- `stressAnxiety` (moderate - anxiety impairs concentration)

---

### **Q6: Mood/Depression**
**Text:** "Over the past month, how often have you felt down, depressed, or hopeless?"

**Why Sixth:**
- **Core depression screening** - PHQ-9 core items combined
- **Temporal framing** - "Past month" gives bigger picture than "past 2 weeks"
- **Differentiates from anxiety** - While stress/anxiety addressed earlier, this targets low mood specifically
- **Severity indicator** - Frequency scale indicates severity

**Clinical Basis:**
- PHQ-9 Items 1-2 ("Little interest/pleasure" + "Feeling down/depressed/hopeless")
- Beck Depression Inventory (BDI) mood items

**Signals Generated:**
- `moodRegulation` (direct)
- `crisis` (moderate - correlates with suicide risk)
- `baselineWellness` (inverse)

---

### **Q7: Physical Symptoms (Somatic)**
**Text:** "Do you experience physical symptoms like headaches, muscle tension, or stomach issues?"

**Why Seventh:**
- **Somatic presentation** - Many people present with physical symptoms rather than psychological
- **Anxiety indicator** - Somatic symptoms strongly correlate with anxiety disorders
- **Medical exclusion flag** - May need GP to rule out medical causes
- **Validation** - Acknowledges physical manifestations of mental distress

**Clinical Basis:**
- Somatic Symptom Scale (SSS-8)
- GAD-7 somatic anxiety items
- PHQ-15 (somatic symptom severity)

**Signals Generated:**
- `somaticSymptoms` (direct)
- `stressAnxiety` (moderate correlation)

---

### **Q8: Life Stressors Impact**
**Text:** "How much are work or life stressors impacting your wellbeing?"

**Why Eighth:**
- **Contextual attribution** - Are symptoms driven by external stressors?
- **Adjustment disorder screening** - Differentiates adjustment reaction from primary mental health condition
- **Intervention targeting** - High life stressors may indicate organizational/systemic issues
- **Workplace link** - Can flag connection to THRIVE workplace assessment

**Clinical Basis:**
- Life Events Scale
- Adjustment Disorder criteria (DSM-5)
- Workplace stress assessment tools

**Signals Generated:**
- `lifeStressors` (direct)
- `stressAnxiety` (moderate)
- `baselineWellness` (inverse)

---

### **Q9: Duration**
**Text:** "How long have you been experiencing these difficulties?"

**Why Ninth (After Symptoms, Before Impact):**
- **Chronicity marker** - Distinguishes acute stress from chronic conditions
- **Severity indicator** - Longer duration often indicates greater severity/treatment resistance
- **Diagnostic criterion** - Many conditions require minimum duration (e.g., GAD requires 6 months)
- **Intervention planning** - Acute vs chronic guides different pathways

**Clinical Basis:**
- DSM-5 duration criteria for most disorders
- Chronic vs acute stress differentiation
- Treatment-resistant indicator (symptoms >6 months)

**Signals Generated:**
- `crisis` (moderate - chronic symptoms increase risk)
- `chronicPattern` (direct - new dimension)

---

### **Q10: Functional Impact**
**Text:** "How much are these issues affecting your daily activities (work, relationships, self-care)?"

**Why Tenth:**
- **Severity indicator** - Functional impairment is key diagnostic criterion
- **Intervention threshold** - High impairment indicates need for professional help
- **Clinical significance** - Symptoms + impairment = clinical disorder
- **Outcome priority** - Restoration of functioning is primary treatment goal

**Clinical Basis:**
- DSM-5 impairment criterion (required for all diagnoses)
- Work and Social Adjustment Scale (WSAS)
- Sheehan Disability Scale (SDS)

**Signals Generated:**
- `functionalImpact` (direct - new dimension)
- `crisis` (moderate - severe impairment increases risk)
- `baselineWellness` (inverse)

---

### **Q11: Goals/Expectations**
**Text:** "What are you hoping to achieve from this assessment?"

**Why Eleventh (After Symptoms, Before Outcomes):**
- **Readiness to change** - Assesses help-seeking motivation
- **Expectation management** - Helps calibrate outcome recommendations
- **Validation pathway** - "Just checking in" responses → baseline wellness outcome
- **Engagement predictor** - Higher help-seeking → more likely to follow recommendations

**Clinical Basis:**
- Stages of Change Model (Prochaska & DiClemente)
- Help-seeking behavior theory
- Therapeutic alliance research (matching client goals improves outcomes)

**Signals Generated:**
- `baselineWellness` (contextual - "feeling okay" responses)
- `helpseeking` (direct - new dimension)

---

### **Q12: Self-Help Attempts**
**Text:** "Have you tried any self-help strategies (e.g., exercise, meditation, sleep hygiene)?"

**Why Twelfth:**
- **Self-efficacy assessment** - Are they capable of self-management?
- **Intervention matching** - Failed self-help → recommend professional support
- **Success validation** - "Yes, they've helped" → baseline wellness
- **Treatment resistance flag** - "Tried everything, no improvement" → specialist referral

**Clinical Basis:**
- Self-efficacy theory (Bandura)
- Stepped care model (try least intensive interventions first)
- Treatment responsiveness assessment

**Signals Generated:**
- `selfManagementCapacity` (inverse - unsuccessful attempts = lower capacity)
- `baselineWellness` (contextual - successful strategies = higher wellness)

---

### **Q13: Current Support**
**Text:** "Are you currently receiving any mental health support (therapy, medication, etc.)?"

**Why Thirteenth:**
- **Treatment history** - Already engaged with services?
- **Treatment resistance** - "Yes but not helping" → specialist referral
- **Continuity of care** - Avoid duplicate recommendations
- **Gap identification** - "Previously but not now" → may need reconnection

**Clinical Basis:**
- Treatment history assessment (standard clinical practice)
- Treatment resistance criteria (failed 2+ adequate trials)
- Continuity of care principles

**Signals Generated:**
- `currentSupport` (direct - new dimension)
- `treatmentResistant` (contextual - not helping = resistance flag)

---

### **Q14: Energy Levels**
**Text:** "How would you describe your energy levels?"

**Why Fourteenth:**
- **Depression indicator** - Low energy (anhedonia/fatigue) is core depression symptom
- **Sleep confirmation** - Cross-validates sleep quality responses
- **Physiological flag** - Very low energy may indicate medical causes (thyroid, anemia)
- **Functional capacity** - Energy level predicts ability to engage with interventions

**Clinical Basis:**
- PHQ-9 Item 4 ("Feeling tired or having little energy")
- Fatigue Severity Scale (FSS)
- Depression symptomatology (anhedonia, psychomotor retardation)

**Signals Generated:**
- `sleepEnergy` (direct)
- `moodRegulation` (moderate - fatigue correlates with depression)
- `baselineWellness` (direct - high energy = good baseline)

---

### **Q15: Social Support**
**Text:** "Do you have good social support (friends, family, community)?"

**Why Last:**
- **Protective factor** - Strong support reduces crisis risk
- **Resource assessment** - Who can help in crisis or recovery?
- **Intervention modifier** - Isolated individuals may need more intensive support
- **Loneliness screening** - Social isolation is modifiable risk factor

**Clinical Basis:**
- Social support scales (Multidimensional Scale of Perceived Social Support)
- Protective factors literature (social support buffers stress)
- Loneliness and mental health research

**Signals Generated:**
- `socialSupport` (inverse - less support = higher score)
- `crisis` (moderate - isolation increases risk)

---

## Sequencing Strategy Summary

### **Phase 1: Opening & Safety (Q1-2)**
- Establish baseline
- Screen for crisis
- Ethical priority: safety first

### **Phase 2: Core Symptoms (Q3-7)**
- Sleep → Anxiety → Focus → Mood → Physical
- Funnel from general to specific
- Build dimensional confidence scores
- Natural flow: sleep affects everything else

### **Phase 3: Context & Attribution (Q8-10)**
- Life stressors (external vs internal attribution)
- Duration (acute vs chronic)
- Functional impact (severity marker)

### **Phase 4: Capacity & Resources (Q11-15)**
- Goals (motivation/expectations)
- Self-help attempts (self-efficacy)
- Current support (treatment history)
- Energy (functional capacity)
- Social support (protective factors)

---

## Signal Processing Logic

### **Direct Signals**
Higher response value = higher dimension score
- Example: "How often stressed?" → higher frequency = higher `stressAnxiety` score

### **Inverse Signals**
Higher response value = lower dimension score
- Example: "Overall wellbeing?" → higher wellbeing = lower `crisis` score

### **Moderate Signals**
Correlated but not primary indicator (weighted at 0.5x)
- Example: Poor sleep → moderate signal for `stressAnxiety` (not primary, but correlated)

### **Contextual Signals**
Depends on specific answer pattern, not just value
- Example: Q11 "Just checking in" → suggests `baselineWellness`
- Example: Q12 "Tried but no improvement" → suggests need for professional support

---

## Why This Beats Traditional Boolean Logic

### **Traditional Approach:**
```
if (depressed === true) → recommend therapy
if (anxious === true) → recommend CBT
```

**Problems:**
- Oversimplified (people rarely fit single categories)
- Misses comorbidity (anxiety + depression + sleep issues)
- Ignores severity gradients
- No nuance (mild vs severe treated same)

### **Neuroindicator Approach:**
```
Build confidence scores across all dimensions simultaneously:
{
  stressAnxiety: 3.8,
  moodRegulation: 2.1,
  sleepEnergy: 4.2,
  attentionFocus: 1.5,
  ...
}

Route to outcome based on highest confidence + context
```

**Benefits:**
- Captures comorbidity (multiple elevated dimensions)
- Severity-sensitive (thresholds at 2.5, 3.5, 4.0)
- Contextual (duration, attempts, support modifies recommendations)
- Personalized outcomes (not one-size-fits-all)

---

## Outcome Determination Logic

### **Threshold-Based Routing**

```javascript
// Priority 1: Crisis (overrides everything)
if (crisis > 3.5 || Q2_response >= 5) → Crisis intervention

// Priority 2: Baseline wellness (you're fine)
if (baselineWellness >= 4 && crisis < 2) → Validation + optimization

// Priority 3: Specific symptom patterns
if (stressAnxiety >= 3.5 || sleepEnergy >= 3.5) → Stress/anxiety pathway
if (moodRegulation >= 3.5) → Depression pathway
if (attentionFocus >= 3.5) → ADHD/neuroevaluation pathway

// Priority 4: General support
else → General wellbeing support
```

### **Contextual Modifiers**

- **Duration > 6 months** → Flags chronic pattern, may suggest specialist referral
- **Functional impact severe** → Escalates urgency of recommendations
- **Failed self-help** → Deprioritizes lifestyle-only recommendations
- **Treatment resistant** → Routes to specialist services (MindFit, SmartStartMinds)
- **Low social support** → Emphasizes professional support over self-management

---

## Clinical Validation Needed

### **Next Steps:**
1. **Dr. Thomas Dannhauser review** - Clinical accuracy, question phrasing, thresholds
2. **Pilot testing** - 20-30 users with known clinical status
3. **Sensitivity/specificity analysis** - How well does it detect conditions vs false positives?
4. **Outcome validation** - Do recommended pathways match clinical judgment?
5. **User experience testing** - Are questions clear? Any confusion or distress?

### **Potential Refinements:**
- Adjust scoring thresholds based on pilot data
- Add/remove questions based on diagnostic value
- Refine outcome templates based on user feedback
- Add branching logic (skip irrelevant questions)

---

## Why 15 Questions?

### **Too Few (<10):**
- ❌ Insufficient coverage of symptom domains
- ❌ High false positive/negative rate
- ❌ Lacks context (duration, impact, attempts)
- ❌ Can't distinguish comorbid conditions

### **Too Many (>25):**
- ❌ User fatigue (drop-off increases)
- ❌ Diminishing returns (redundant information)
- ❌ Barrier to completion (10+ minutes feels long)

### **Sweet Spot (15):**
- ✅ Comprehensive coverage (8 dimensions)
- ✅ Contextual information (duration, attempts, support)
- ✅ Manageable length (5-10 minutes)
- ✅ Low drop-off rate
- ✅ Clinical validity maintained

---

## Comparison to Validated Scales

| Scale | Questions | Time | Dimensions | Our Coverage |
|-------|-----------|------|------------|--------------|
| PHQ-9 | 9 | 3 min | Depression | ✅ Q6, Q14 |
| GAD-7 | 7 | 2 min | Anxiety | ✅ Q4, Q7 |
| ASRS | 6 | 2 min | ADHD | ✅ Q5 |
| ISI | 7 | 3 min | Sleep | ✅ Q3, Q14 |
| PSS | 10 | 5 min | Stress | ✅ Q4, Q8 |
| **Neuroindicator** | **15** | **8 min** | **8 dimensions + context** | ✅ **Comprehensive** |

---

## Ethical Considerations

### **Transparency**
- Not a diagnostic tool (clearly stated)
- Outcome pathways include non-commercial options
- "You're fine" is valid outcome (not just funnel to sales)

### **Safety**
- Crisis screening early (Q2)
- Immediate intervention for high-risk responses
- Clear escalation pathways (999, Samaritans, GP)

### **Balanced Recommendations**
- Lifestyle strategies before professional support
- Multiple pathway options (not just ClearMinds)
- GP consultation prominent for medical concerns
- Commercial relationships flagged transparently

### **Privacy**
- Browser-only processing (no data stored)
- Optional email for results
- GDPR-compliant data handling

---

## References

### Clinical Screening Tools:
- **PHQ-9:** Kroenke, K., Spitzer, R. L., & Williams, J. B. (2001). The PHQ-9. Journal of general internal medicine, 16(9), 606-613.
- **GAD-7:** Spitzer, R. L., Kroenke, K., Williams, J. B., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder. Archives of internal medicine, 166(10), 1092-1097.
- **ASRS:** Kessler, R. C., et al. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS). Psychological medicine, 35(2), 245-256.

### Theoretical Frameworks:
- **Stepped Care Model:** Bower, P., & Gilbody, S. (2005). Stepped care in psychological therapies. Advances in psychiatric treatment, 11(2), 101-108.
- **Transdiagnostic Approach:** Harvey, A. G., Watkins, E., & Mansell, W. (2004). Cognitive behavioural processes across psychological disorders.

### Digital Mental Health:
- **Internet-Based Assessments:** Batterham, P. J., et al. (2015). A systematic review of Internet-based prevention programs for anxiety and depression. BMC psychiatry, 15(1), 1-11.

---

**Document Version:** 1.0
**Last Updated:** October 2025
**Author:** ClearMinds Clinical Team with Dr. Thomas Dannhauser
