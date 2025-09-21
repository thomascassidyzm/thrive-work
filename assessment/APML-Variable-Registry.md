# THRIVE Assessment System - APML v1.1.0 Variable Registry

## Variable Registry

### Component: DiagnosticEngine
```
REACTIVE_VARIABLES:
  - optimizationVector: reactive<OptimizationVector>
    PURPOSE: Real-time confidence scoring across 8 diagnostic dimensions
    DEFAULT: {
      structuralEfficiency: 0,
      individualResilience: 0,
      organizationalAlignment: 0,
      workLifeIntegration: 0,
      meetingCultureOptimization: 0,
      teamPsychologicalSafety: 0,
      departmentalDynamics: 0,
      roleClarity: 0
    }
    VALIDATION: values between 0.0 and 1.0

  - evidence: reactive<Array<AssessmentResponse>>
    PURPOSE: Stores all user responses with signals and metadata
    DEFAULT: []
    VALIDATION: each item must have questionId, signals, timestamp

  - questionHistory: reactive<Array<string>>
    PURPOSE: Track question IDs presented to user
    DEFAULT: []
    VALIDATION: array of unique question IDs

  - currentQuestionIndex: ref<number>
    PURPOSE: Current question number in assessment
    DEFAULT: 0
    VALIDATION: non-negative integer

  - confidenceThresholds: readonly<ConfidenceThresholds>
    PURPOSE: Thresholds for assessment completion logic
    DEFAULT: { high: 0.85, medium: 0.65, low: 0.30 }
    VALIDATION: high > medium > low, all between 0 and 1

COMPUTED_VARIABLES:
  - maxConfidence: computed<number>
    PURPOSE: Highest confidence score across all dimensions
    DERIVES_FROM: [optimizationVector]
    VALIDATION: between 0.0 and 1.0

  - entropy: computed<number>
    PURPOSE: Uncertainty measure for assessment completion
    DERIVES_FROM: [optimizationVector]
    VALIDATION: between 0.0 and 1.0

  - primaryOpportunity: computed<PrimaryOpportunity>
    PURPOSE: Highest confidence dimension with metadata
    DERIVES_FROM: [optimizationVector]

METHODS:
  - processResponse: function
    PURPOSE: Process user response and update optimization vector
    PARAMETERS: response: AssessmentResponse
    RETURNS: ProcessingResult
    SIDE_EFFECTS: updates optimizationVector, evidence, questionHistory

  - updateOptimizationVector: function
    PURPOSE: Recalculate all optimization opportunities
    PARAMETERS: none
    RETURNS: void
    SIDE_EFFECTS: updates all optimizationVector values

  - calculateStructuralOptimization: function
    PURPOSE: Calculate structural efficiency optimization score
    PARAMETERS: none
    RETURNS: number (0.0 to 1.0)
    DEPENDS_ON: evidence with structural signals

  - calculateResilienceOpportunities: function
    PURPOSE: Calculate individual resilience optimization score
    PARAMETERS: none
    RETURNS: number (0.0 to 1.0)
    DEPENDS_ON: evidence with individual signals

  - calculateAlignmentOpportunities: function
    PURPOSE: Calculate organizational alignment optimization score
    PARAMETERS: none
    RETURNS: number (0.0 to 1.0)
    DEPENDS_ON: evidence with organizational signals

  - calculateWorkLifeOptimization: function
    PURPOSE: Calculate work-life integration optimization score
    PARAMETERS: none
    RETURNS: number (0.0 to 1.0)
    DEPENDS_ON: evidence with worklife signals

  - calculateMeetingOptimization: function
    PURPOSE: Calculate meeting culture optimization score
    PARAMETERS: none
    RETURNS: number (0.0 to 1.0)
    DEPENDS_ON: evidence with meetings signals

  - calculateSafetyOptimization: function
    PURPOSE: Calculate psychological safety optimization score
    PARAMETERS: none
    RETURNS: number (0.0 to 1.0)
    DEPENDS_ON: evidence with psychologicalSafety signals

  - calculateDepartmentalOptimization: function
    PURPOSE: Calculate departmental dynamics optimization score
    PARAMETERS: none
    RETURNS: number (0.0 to 1.0)
    DEPENDS_ON: evidence with departmental signals

  - calculateRoleOptimization: function
    PURPOSE: Calculate role clarity optimization score
    PARAMETERS: none
    RETURNS: number (0.0 to 1.0)
    DEPENDS_ON: evidence with roleClarity signals

  - determineNextStep: function
    PURPOSE: Determine assessment continuation or completion
    PARAMETERS: none
    RETURNS: AssessmentStatus
    DEPENDS_ON: optimizationVector, evidence.length, entropy

  - sigmoid: function
    PURPOSE: Sigmoid function for probability normalization
    PARAMETERS: x: number
    RETURNS: number (0.0 to 1.0)
    VALIDATION: mathematical function 1/(1+exp(-x))

  - extractSignal: function
    PURPOSE: Extract averaged signal value from evidence
    PARAMETERS: signalName: string
    RETURNS: number
    DEPENDS_ON: evidence array with signals

  - getSignalWeight: function
    PURPOSE: Get importance weight for signal category
    PARAMETERS: category: string, signal: string
    RETURNS: number (0.0 to 1.0)
    VALIDATION: predefined weight table lookup

  - calculateEntropy: function
    PURPOSE: Calculate uncertainty across optimization vector
    PARAMETERS: none
    RETURNS: number (0.0 to 1.0)
    DEPENDS_ON: optimizationVector values

  - getPrimaryOpportunity: function
    PURPOSE: Get highest confidence dimension with metadata
    PARAMETERS: none
    RETURNS: PrimaryOpportunity
    DEPENDS_ON: optimizationVector

  - getHighestUncertaintyDimension: function
    PURPOSE: Find dimension closest to 0.5 (maximum uncertainty)
    PARAMETERS: none
    RETURNS: string (dimension name)
    DEPENDS_ON: optimizationVector

  - getOptimizationRecommendation: function
    PURPOSE: Get intervention recommendation for primary opportunity
    PARAMETERS: none
    RETURNS: InterventionRecommendation
    DEPENDS_ON: primaryOpportunity

  - getState: function
    PURPOSE: Export current state for persistence
    PARAMETERS: none
    RETURNS: DiagnosticEngineState
    VALIDATION: serializable object

  - setState: function
    PURPOSE: Restore state from storage
    PARAMETERS: state: DiagnosticEngineState
    RETURNS: void
    SIDE_EFFECTS: updates all reactive variables
```

### Component: QuestionBank
```
REACTIVE_VARIABLES:
  - questions: readonly<Array<Question>>
    PURPOSE: Complete bank of 122 assessment questions
    DEFAULT: [] (loaded from static definition)
    VALIDATION: 122 unique questions with valid structure

  - usedQuestions: reactive<Set<string>>
    PURPOSE: Track questions already presented to user
    DEFAULT: new Set()
    VALIDATION: set of valid question IDs

METHODS:
  - getNextQuestion: function
    PURPOSE: Select next question based on diagnostic state
    PARAMETERS: diagnosticEngine: DiagnosticEngine, questionType?: string
    RETURNS: Question | null
    SIDE_EFFECTS: updates usedQuestions

  - determineQuestionType: function
    PURPOSE: Determine optimal question type based on evidence
    PARAMETERS: diagnosticEngine: DiagnosticEngine
    RETURNS: 'entry' | 'targeted' | 'broad'
    DEPENDS_ON: evidence.length, optimizationVector

  - getTargetedQuestionsFor: function
    PURPOSE: Get questions targeting specific focus area
    PARAMETERS: focusArea: string
    RETURNS: Array<Question>
    VALIDATION: focusArea must be valid dimension name

  - processResponse: function
    PURPOSE: Process question response through diagnostic engine
    PARAMETERS: question: Question, selectedOption: Option, diagnosticEngine: DiagnosticEngine
    RETURNS: ProcessingResult
    SIDE_EFFECTS: calls diagnosticEngine.processResponse

  - calculateSignals: function
    PURPOSE: Calculate signal values from user response
    PARAMETERS: question: Question, selectedOption: Option
    RETURNS: SignalValues
    VALIDATION: applies signal direction transformations

  - getAllQuestions: function
    PURPOSE: Get complete question bank for testing/debugging
    PARAMETERS: none
    RETURNS: Array<Question>
    VALIDATION: returns all 122 questions

  - reset: function
    PURPOSE: Clear used questions for new assessment
    PARAMETERS: none
    RETURNS: void
    SIDE_EFFECTS: clears usedQuestions set
```

### Component: AdaptiveController
```
REACTIVE_VARIABLES:
  - diagnosticEngine: reactive<DiagnosticEngine>
    PURPOSE: Core AI diagnostic engine instance
    DEFAULT: new DiagnosticEngine()
    VALIDATION: valid DiagnosticEngine instance

  - questionBank: reactive<QuestionBank>
    PURPOSE: Question bank instance for question selection
    DEFAULT: new QuestionBank()
    VALIDATION: valid QuestionBank instance

  - currentQuestion: ref<Question | null>
    PURPOSE: Currently displayed question
    DEFAULT: null
    VALIDATION: valid Question object or null

  - questionContainer: ref<HTMLElement | null>
    PURPOSE: DOM reference to question display container
    DEFAULT: null
    VALIDATION: valid HTML element or null

  - sessionData: reactive<SessionData>
    PURPOSE: Session persistence data
    DEFAULT: {}
    VALIDATION: serializable object

  - deepAnalysisMode: ref<boolean>
    PURPOSE: Enable extended assessment mode
    DEFAULT: false
    VALIDATION: boolean

  - maxQuestions: ref<number>
    PURPOSE: Maximum questions for current session
    DEFAULT: 35
    VALIDATION: positive integer

COMPUTED_VARIABLES:
  - assessmentProgress: computed<number>
    PURPOSE: Progress percentage (0-100)
    DERIVES_FROM: [diagnosticEngine.evidence.length, maxQuestions]
    VALIDATION: between 0 and 100

  - confidenceDisplay: computed<string>
    PURPOSE: Formatted confidence percentage display
    DERIVES_FROM: [diagnosticEngine.maxConfidence]
    VALIDATION: percentage string with % symbol

METHODS:
  - initialize: function
    PURPOSE: Initialize assessment controller and start session
    PARAMETERS: none
    RETURNS: void
    SIDE_EFFECTS: restores session, shows first question

  - showNextQuestion: function
    PURPOSE: Display next question in assessment flow
    PARAMETERS: none
    RETURNS: void
    SIDE_EFFECTS: updates currentQuestion, renders UI

  - selectOption: function
    PURPOSE: Process user option selection
    PARAMETERS: optionIndex: number
    RETURNS: void
    SIDE_EFFECTS: processes response, advances to next question

  - shouldCompleteAssessment: function
    PURPOSE: Check if assessment should be completed
    PARAMETERS: none
    RETURNS: boolean
    DEPENDS_ON: diagnosticEngine.determineNextStep()

  - renderQuestion: function
    PURPOSE: Render question HTML with options
    PARAMETERS: question: Question
    RETURNS: string (HTML)
    VALIDATION: valid HTML string

  - renderConfidenceIndicators: function
    PURPOSE: Render confidence progress indicators
    PARAMETERS: none
    RETURNS: string (HTML)
    DEPENDS_ON: diagnosticEngine.optimizationVector

  - renderCurrentInsights: function
    PURPOSE: Render real-time diagnostic insights
    PARAMETERS: optimizationVector: OptimizationVector
    RETURNS: void
    SIDE_EFFECTS: updates diagnostic insights DOM

  - renderCompletion: function
    PURPOSE: Render assessment completion screen
    PARAMETERS: result: ProcessingResult
    RETURNS: void
    SIDE_EFFECTS: shows completion UI, hides questions

  - getDimensionName: function
    PURPOSE: Get display name for optimization dimension
    PARAMETERS: dimension: string
    RETURNS: string
    VALIDATION: dimension must be valid optimization vector key

  - getDimensionDescription: function
    PURPOSE: Get description for optimization dimension
    PARAMETERS: dimension: string
    RETURNS: string
    VALIDATION: dimension must be valid optimization vector key

  - getDefaultIntervention: function
    PURPOSE: Get intervention recommendation for dimension
    PARAMETERS: primaryDysfunction: string
    RETURNS: InterventionRecommendation
    VALIDATION: primaryDysfunction must be valid dimension

  - getProgressMessage: function
    PURPOSE: Get contextual progress message
    PARAMETERS: evidenceLength: number
    RETURNS: string
    VALIDATION: evidenceLength must be non-negative

  - saveSession: function
    PURPOSE: Persist session state to localStorage
    PARAMETERS: none
    RETURNS: void
    SIDE_EFFECTS: writes to localStorage

  - restoreSession: function
    PURPOSE: Restore session state from localStorage
    PARAMETERS: none
    RETURNS: boolean (success)
    SIDE_EFFECTS: updates reactive variables

  - continueAssessment: function
    PURPOSE: Enable extended assessment mode
    PARAMETERS: none
    RETURNS: void
    SIDE_EFFECTS: sets deepAnalysisMode, increases maxQuestions
```

### API Endpoints
```
ENDPOINTS:
  - /assessment/
    METHOD: GET
    PURPOSE: Serve assessment interface
    PARAMETERS: none
    RETURNS: HTML assessment interface

  - /assessment/diagnostic-engine.js
    METHOD: GET
    PURPOSE: Serve diagnostic engine JavaScript
    PARAMETERS: none
    RETURNS: DiagnosticEngine class implementation

  - /assessment/question-bank.js
    METHOD: GET
    PURPOSE: Serve question bank JavaScript
    PARAMETERS: none
    RETURNS: QuestionBank class with 122 questions

  - /assessment/adaptive-controller.js
    METHOD: GET
    PURPOSE: Serve adaptive controller JavaScript
    PARAMETERS: none
    RETURNS: AdaptiveController class implementation

  - /assessment/process-map.js
    METHOD: GET
    PURPOSE: Serve process visualization JavaScript
    PARAMETERS: none
    RETURNS: ProcessMap visualization component
```

### Database Schema
```
TABLES:
  - assessment_sessions
    COLUMNS:
      - id: UUID PRIMARY KEY
      - user_id: UUID REFERENCES users(id)
      - started_at: TIMESTAMP DEFAULT NOW()
      - completed_at: TIMESTAMP NULL
      - status: TEXT CHECK(status IN ('in_progress', 'completed', 'abandoned'))
      - current_question_index: INTEGER DEFAULT 0
      - diagnostic_vector: JSONB DEFAULT '{}'
        FORMAT: OptimizationVector JSON structure
      - primary_dysfunction: TEXT NULL
      - primary_confidence: DECIMAL(3,2) NULL
      - recommended_intervention: JSONB NULL

  - assessment_responses
    COLUMNS:
      - id: UUID PRIMARY KEY
      - session_id: UUID REFERENCES assessment_sessions(id)
      - question_id: TEXT NOT NULL
        FORMAT: Question ID from question bank
      - question_type: TEXT CHECK(question_type IN ('entry', 'targeted', 'broad', 'validation'))
      - selected_option: JSONB NOT NULL
        FORMAT: {value: number, text: string}
      - signals: JSONB DEFAULT '{}'
        FORMAT: SignalValues JSON structure
      - answered_at: TIMESTAMP DEFAULT NOW()

  - diagnostic_results
    COLUMNS:
      - id: UUID PRIMARY KEY
      - session_id: UUID REFERENCES assessment_sessions(id)
      - structural_barriers: DECIMAL(4,3) DEFAULT 0
      - individual_stress: DECIMAL(4,3) DEFAULT 0
      - organizational_dysfunction: DECIMAL(4,3) DEFAULT 0
      - work_life_integration: DECIMAL(4,3) DEFAULT 0
      - meeting_culture: DECIMAL(4,3) DEFAULT 0
      - psychological_safety: DECIMAL(4,3) DEFAULT 0
      - departmental_issues: DECIMAL(4,3) DEFAULT 0
      - role_clarity: DECIMAL(4,3) DEFAULT 0

CONSTRAINTS:
  - assessment_sessions_status_valid: CHECK(status IN ('in_progress', 'completed', 'abandoned'))
  - assessment_responses_question_type_valid: CHECK(question_type IN ('entry', 'targeted', 'broad', 'validation'))
  - diagnostic_results_confidence_range: CHECK(ALL confidence values BETWEEN 0.0 AND 1.0)
```

### Configuration Constants
```
ENVIRONMENT_VARIABLES:
  - NODE_ENV: string
    PURPOSE: Application environment
    DEFAULT: 'development'
    VALIDATION: 'development' | 'production' | 'test'

  - SUPABASE_URL: string
    PURPOSE: Supabase project URL for data persistence
    DEFAULT: none (required in production)
    VALIDATION: valid URL format

  - SUPABASE_ANON_KEY: string
    PURPOSE: Supabase anonymous access key
    DEFAULT: none (required in production)
    VALIDATION: valid Supabase key format

FEATURE_FLAGS:
  - ENABLE_SESSION_PERSISTENCE: boolean
    PURPOSE: Enable localStorage session persistence
    DEFAULT: true
    VALIDATION: boolean

  - ENABLE_REAL_TIME_INSIGHTS: boolean
    PURPOSE: Enable live diagnostic analysis display
    DEFAULT: true
    VALIDATION: boolean

  - ENABLE_DEEP_ANALYSIS: boolean
    PURPOSE: Enable extended assessment mode
    DEFAULT: true
    VALIDATION: boolean

  - MIN_QUESTIONS_REQUIRED: number
    PURPOSE: Minimum questions before assessment completion
    DEFAULT: 20
    VALIDATION: positive integer

  - MAX_QUESTIONS_DEFAULT: number
    PURPOSE: Default maximum questions per session
    DEFAULT: 35
    VALIDATION: positive integer greater than MIN_QUESTIONS_REQUIRED

BUILD_CONSTANTS:
  - QUESTION_BANK_VERSION: string
    PURPOSE: Version identifier for question bank
    DEFAULT: '1.0.0'
    VALIDATION: semantic version format

  - DIAGNOSTIC_ENGINE_VERSION: string
    PURPOSE: Version identifier for diagnostic engine
    DEFAULT: '1.0.0'
    VALIDATION: semantic version format

  - APML_COMPLIANCE_VERSION: string
    PURPOSE: APML specification compliance version
    DEFAULT: '1.1.0'
    VALIDATION: APML version format
```

## Validation Rules

### NAMING CONSISTENCY
- All optimization vector keys MUST match exactly across:
  - DiagnosticEngine.optimizationVector property names
  - AdaptiveController.getDimensionName() mapping keys
  - AdaptiveController.getDimensionDescription() mapping keys
  - AdaptiveController.getDefaultIntervention() mapping keys
- Question IDs MUST be unique across all 122 questions
- Signal category names MUST reference valid optimization vector fields

### TYPE SAFETY
- OptimizationVector values MUST be numbers between 0.0 and 1.0
- Question.options MUST be arrays of exactly 4 Option objects
- Option.value MUST be integers 1, 2, 3, or 4
- Signal directions MUST be 'direct', 'inverse', 'mixed', or 'attention'

### SCOPE VALIDATION
- DiagnosticEngine variables scoped to engine instance
- QuestionBank variables scoped to bank instance
- AdaptiveController variables scoped to controller instance
- Global constants explicitly marked in Configuration Constants section

### LIFECYCLE VALIDATION
- Variable initialization MUST match Registry defaults
- Method signatures MUST match Registry specifications exactly
- Side effects MUST be documented in SIDE_EFFECTS field
- Database operations MUST follow schema constraints

## Code Generation Requirements

### AUTOMATIC GENERATION
- TypeScript interfaces auto-generated from Registry type definitions
- Validation functions auto-generated for all Registry constraints
- Database schema auto-generated from Registry table definitions

### COMPILE-TIME VALIDATION
- Registry completeness check before compilation
- Cross-reference validation for all optimization vector keys
- Type consistency validation across all components

### RUNTIME VALIDATION
- Optional runtime validation for Registry constraints in development mode
- Production assertion removal for performance
- Development-mode identifier tracking for compliance

## APML v1.1.0 Compliance

✅ All identifiers defined in Variable Registry before use
✅ Generated code uses exact names from Registry
✅ Type specifications include exact TypeScript types
✅ Scope validation ensures proper variable containment
✅ Lifecycle validation matches Registry specifications
✅ Automatic generation from Registry definitions
✅ Compile-time validation for Registry completeness
✅ Runtime validation available for development

This registry ensures zero naming-related runtime errors and 100% Registry coverage of all identifiers in the THRIVE Assessment System, following APML v1.1.0 Variable Registry Standard specifications exactly.