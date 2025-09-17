// THRIVE Adaptive Assessment Controller
// Orchestrates the AI-based questioning system

class AdaptiveAssessmentController {
    constructor() {
        this.diagnosticEngine = new DiagnosticEngine();
        this.questionBank = new QuestionBank();
        this.currentQuestion = null;
        this.assessmentStartTime = null;
        this.minQuestions = 8;  // Minimum questions before intervention routing
        this.maxQuestions = 25; // Maximum questions to prevent fatigue

        this.bindEvents();
        this.initializeAssessment();
    }

    initializeAssessment() {
        this.assessmentStartTime = Date.now();

        // Try to restore previous session
        this.restoreSession();

        // Start with first question
        this.showNextQuestion();

        // Initialize progress tracking
        this.updateProgressDisplay();
    }

    restoreSession() {
        try {
            const savedState = localStorage.getItem('thrive_diagnostic_state');
            if (savedState) {
                const state = JSON.parse(savedState);
                this.diagnosticEngine.setState(state.diagnosticEngine);

                if (state.usedQuestions) {
                    state.usedQuestions.forEach(qId => {
                        this.questionBank.usedQuestions.add(qId);
                    });
                }
            }
        } catch (error) {
            console.warn('Could not restore previous session:', error);
        }
    }

    saveSession() {
        try {
            const state = {
                diagnosticEngine: this.diagnosticEngine.getState(),
                usedQuestions: Array.from(this.questionBank.usedQuestions),
                timestamp: Date.now()
            };
            localStorage.setItem('thrive_diagnostic_state', JSON.stringify(state));
        } catch (error) {
            console.warn('Could not save session:', error);
        }
    }

    showNextQuestion() {
        const nextQuestion = this.questionBank.getNextQuestion(this.diagnosticEngine);

        if (!nextQuestion || this.shouldCompleteAssessment()) {
            this.completeAssessment();
            return;
        }

        this.currentQuestion = nextQuestion;
        this.renderQuestion(nextQuestion);
        this.saveSession();
    }

    shouldCompleteAssessment() {
        const state = this.diagnosticEngine.getState();
        const questionCount = state.evidence.length;
        const maxConfidence = Math.max(...Object.values(state.diagnosticVector));

        // Complete if we have enough questions and high confidence
        if (questionCount >= this.minQuestions && maxConfidence > 0.75) {
            return true;
        }

        // Complete if we've reached maximum questions
        if (questionCount >= this.maxQuestions) {
            return true;
        }

        return false;
    }

    renderQuestion(question) {
        const container = document.getElementById('question-container');
        if (!container) return;

        const html = `
            <div class="question-card animate-in">
                <div class="question-progress">
                    <div class="confidence-indicators">
                        ${this.renderConfidenceIndicators()}
                    </div>
                </div>

                <div class="question-content">
                    <h2 class="question-text">${question.text}</h2>

                    <div class="options-container">
                        ${question.options.map((option, index) => `
                            <button
                                class="option-button"
                                data-value="${option.value}"
                                data-option-index="${index}"
                                onclick="assessmentController.selectOptionByIndex(${index})"
                            >
                                ${option.text}
                            </button>
                        `).join('')}
                    </div>
                </div>

                <div class="question-context">
                    <div class="question-type">${this.getQuestionTypeDisplay(question.type)}</div>
                    <div class="question-number">
                        Question ${this.diagnosticEngine.getState().evidence.length + 1}
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;

        // Animate in
        setTimeout(() => {
            container.querySelector('.question-card').classList.add('visible');
        }, 100);
    }

    selectOptionByIndex(index) {
        if (!this.currentQuestion) return;

        const option = this.currentQuestion.options[index];
        if (!option) return;

        this.selectOption(option);
    }

    selectOption(option) {
        if (!this.currentQuestion) return;

        // Disable buttons to prevent double-click
        const buttons = document.querySelectorAll('.option-button');
        buttons.forEach(btn => btn.disabled = true);

        // Highlight selected option
        const selectedButton = document.querySelector(`[data-value="${option.value}"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }

        // Process the response
        const result = this.questionBank.processResponse(
            this.currentQuestion,
            option,
            this.diagnosticEngine
        );

        // Update displays
        this.updateProgressDisplay(result);
        this.showDiagnosticInsight(result);

        // Continue after brief delay
        setTimeout(() => {
            this.showNextQuestion();
        }, 1500);
    }

    renderConfidenceIndicators() {
        const vector = this.diagnosticEngine.diagnosticVector;
        const maxConfidence = Math.max(...Object.values(vector));

        return `
            <div class="confidence-summary">
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${maxConfidence * 100}%"></div>
                </div>
                <div class="confidence-text">
                    ${Math.round(maxConfidence * 100)}% confidence
                </div>
            </div>
        `;
    }

    getQuestionTypeDisplay(type) {
        const displays = {
            entry: 'Initial Assessment',
            targeted: 'Deep Dive',
            broad: 'Exploration',
            confirmatory: 'Confirmation'
        };
        return displays[type] || 'Assessment';
    }

    updateProgressDisplay(result = null) {
        const state = this.diagnosticEngine.getState();
        const questionCount = state.evidence.length;
        const progress = Math.min(questionCount / this.minQuestions, 1) * 100;

        const progressElement = document.getElementById('assessment-progress');
        if (progressElement) {
            progressElement.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-text">
                    ${questionCount} questions answered
                    ${result?.status === 'ready_for_intervention' ? ' • Analysis complete!' : ''}
                </div>
            `;
        }

        // Update diagnostic insights
        this.updateDiagnosticDisplay(state.diagnosticVector);
    }

    updateDiagnosticDisplay(diagnosticVector) {
        const insightsElement = document.getElementById('diagnostic-insights');
        if (!insightsElement) return;

        const topDimensions = Object.entries(diagnosticVector)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3)
            .filter(([,confidence]) => confidence > 0.1);

        if (topDimensions.length === 0) {
            insightsElement.innerHTML = '<div class="insight-placeholder">Building your profile...</div>';
            return;
        }

        const html = `
            <div class="current-insights">
                <h3>Emerging Patterns</h3>
                ${topDimensions.map(([dimension, confidence]) => `
                    <div class="insight-item">
                        <div class="insight-name">${this.getDimensionName(dimension)}</div>
                        <div class="insight-confidence">
                            <div class="confidence-bar mini">
                                <div class="confidence-fill" style="width: ${confidence * 100}%"></div>
                            </div>
                            <span>${Math.round(confidence * 100)}%</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        insightsElement.innerHTML = html;
    }

    showDiagnosticInsight(result) {
        if (result.status === 'ready_for_intervention') {
            this.showInterventionInsight(result);
            return;
        }

        const insightElement = document.getElementById('question-insight');
        if (!insightElement) return;

        let insightText = '';
        const maxConfidence = Math.max(...Object.values(result.diagnosis));

        if (maxConfidence > 0.6) {
            insightText = 'Strong patterns emerging - almost ready for recommendations';
        } else if (maxConfidence > 0.3) {
            insightText = 'Patterns developing - continuing targeted assessment';
        } else {
            insightText = 'Building your unique profile...';
        }

        insightElement.innerHTML = `<div class="insight-text">${insightText}</div>`;
    }

    showInterventionInsight(result) {
        const primary = result.primaryDysfunction;
        const intervention = result.recommendedIntervention;

        const insightElement = document.getElementById('question-insight');
        if (insightElement) {
            insightElement.innerHTML = `
                <div class="intervention-ready">
                    <div class="primary-finding">
                        Primary pattern: ${this.getDimensionName(primary.primary)}
                    </div>
                    <div class="confidence-level">
                        Confidence: ${Math.round(primary.confidence * 100)}%
                    </div>
                </div>
            `;
        }
    }

    completeAssessment() {
        const result = this.diagnosticEngine.determineNextStep();

        // Clear the session
        localStorage.removeItem('thrive_diagnostic_state');

        // Show completion screen
        this.showCompletionScreen(result);

        // Track completion
        this.trackAssessmentCompletion(result);
    }

    showCompletionScreen(result) {
        const container = document.getElementById('question-container');
        if (!container) return;

        const primary = result.primaryDysfunction || result.diagnosis;
        const intervention = result.recommendedIntervention;
        const totalTime = Math.round((Date.now() - this.assessmentStartTime) / 1000 / 60);

        const html = `
            <div class="completion-screen animate-in">
                <div class="completion-header">
                    <h1>Assessment Complete</h1>
                    <div class="completion-stats">
                        <div class="stat">
                            <span class="stat-number">${result.totalQuestions || this.diagnosticEngine.getState().evidence.length}</span>
                            <span class="stat-label">Questions</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${totalTime}</span>
                            <span class="stat-label">Minutes</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${Math.round((primary.confidence || 0) * 100)}%</span>
                            <span class="stat-label">Confidence</span>
                        </div>
                    </div>
                </div>

                <div class="completion-results">
                    <h2>Your Primary Pattern</h2>
                    <div class="primary-result">
                        <div class="result-name">${this.getDimensionName(primary.primary)}</div>
                        <div class="result-description">
                            ${this.getDimensionDescription(primary.primary)}
                        </div>
                    </div>

                    ${intervention ? `
                        <div class="intervention-recommendation">
                            <h3>Recommended Next Step</h3>
                            <div class="intervention-card">
                                <div class="intervention-type">${intervention.type.replace(/_/g, ' ').toUpperCase()}</div>
                                <div class="intervention-description">${intervention.description}</div>
                                <div class="intervention-provider">Best handled by: ${intervention.provider.replace(/_/g, ' ')}</div>
                            </div>
                        </div>
                    ` : ''}
                </div>

                <div class="completion-actions">
                    <button class="action-button primary" onclick="assessmentController.proceedToCoaching()">
                        Get Personalized Coaching
                    </button>
                    <button class="action-button secondary" onclick="assessmentController.viewFullReport()">
                        View Detailed Report
                    </button>
                    <button class="action-button tertiary" onclick="assessmentController.shareResults()">
                        Share with Manager
                    </button>
                </div>
            </div>
        `;

        container.innerHTML = html;
        setTimeout(() => {
            container.querySelector('.completion-screen').classList.add('visible');
        }, 100);
    }

    getDimensionName(dimension) {
        const names = {
            structuralBarriers: 'Structural Barriers',
            individualStress: 'Individual Stress Patterns',
            organizationalDysfunction: 'Organizational Dysfunction',
            workLifeIntegration: 'Work-Life Integration',
            meetingCulture: 'Meeting Culture Issues',
            psychologicalSafety: 'Psychological Safety Concerns',
            departmentalIssues: 'Department Dynamics',
            roleClarity: 'Role Clarity Issues'
        };
        return names[dimension] || dimension;
    }

    getDimensionDescription(dimension) {
        const descriptions = {
            structuralBarriers: 'Your challenges stem from organizational structure and process limitations that prevent effective work execution.',
            individualStress: 'Your patterns suggest individual-level stress management and coping strategy needs.',
            organizationalDysfunction: 'Company-wide cultural or systemic issues are impacting your work experience.',
            workLifeIntegration: 'Difficulties with boundaries and transitions between work and personal life.',
            meetingCulture: 'Meeting inefficiencies and cultural issues are affecting your productivity and engagement.',
            psychologicalSafety: 'Concerns about speaking up, making mistakes, or being authentic at work.',
            departmentalIssues: 'Team-specific dynamics and leadership issues within your immediate work group.',
            roleClarity: 'Unclear expectations, mismatched skills, or ambiguous responsibilities in your role.'
        };
        return descriptions[dimension] || 'Pattern identified in your work experience.';
    }

    // Action handlers
    proceedToCoaching() {
        const results = this.diagnosticEngine.getState();
        const params = new URLSearchParams({
            assessment: JSON.stringify(results),
            source: 'diagnostic_assessment'
        });
        window.location.href = `/chat/?${params.toString()}`;
    }

    viewFullReport() {
        // TODO: Implement detailed report view
        alert('Full report feature coming soon!');
    }

    shareResults() {
        // TODO: Implement sharing functionality
        alert('Sharing feature coming soon!');
    }

    bindEvents() {
        // Handle page visibility changes to save state
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.saveSession();
            }
        });

        // Handle beforeunload to save state
        window.addEventListener('beforeunload', () => {
            this.saveSession();
        });

        // Handle back button
        window.addEventListener('popstate', (e) => {
            if (confirm('Are you sure you want to leave the assessment? Your progress will be saved.')) {
                this.saveSession();
            } else {
                history.pushState(null, null, location.href);
            }
        });
    }

    trackAssessmentCompletion(result) {
        // TODO: Implement analytics tracking
        console.log('Assessment completed:', result);
    }
}

// Initialize when DOM is ready
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdaptiveAssessmentController;
} else {
    // Auto-initialize for browser
    let assessmentController;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof DiagnosticEngine !== 'undefined' && typeof QuestionBank !== 'undefined') {
                assessmentController = new AdaptiveAssessmentController();
            }
        });
    } else {
        if (typeof DiagnosticEngine !== 'undefined' && typeof QuestionBank !== 'undefined') {
            assessmentController = new AdaptiveAssessmentController();
        }
    }
}