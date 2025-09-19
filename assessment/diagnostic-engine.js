// THRIVE Diagnostic Assessment Engine
// AI-Based Probabilistic Conditional Logic System

class DiagnosticEngine {
    constructor() {
        this.confidenceThresholds = {
            high: 0.85,    // Strong signal - ready for intervention routing (after 25+ questions)
            medium: 0.65,  // Emerging pattern - ask targeted follow-ups (after 20+ questions)
            low: 0.30      // Weak signal - continue general exploration
        };

        this.optimizationVector = {
            structuralEfficiency: 0,
            individualResilience: 0,
            organizationalAlignment: 0,
            workLifeIntegration: 0,
            meetingCultureOptimization: 0,
            teamPsychologicalSafety: 0,
            departmentalDynamics: 0,
            roleClarity: 0
        };

        this.evidence = [];
        this.questionHistory = [];
        this.currentQuestionIndex = 0;
    }

    // Main assessment processing function
    processResponse(response) {
        this.evidence.push({
            ...response,
            timestamp: Date.now(),
            questionIndex: this.currentQuestionIndex
        });

        // Recalculate all optimization opportunities
        this.updateOptimizationVector();

        // Determine next action
        return this.determineNextStep();
    }

    updateOptimizationVector() {
        // Structural Efficiency Opportunities
        this.optimizationVector.structuralEfficiency = this.calculateStructuralOptimization();

        // Individual Resilience Enhancement
        this.optimizationVector.individualResilience = this.calculateResilienceOpportunities();

        // Organizational Alignment Potential
        this.optimizationVector.organizationalAlignment = this.calculateAlignmentOpportunities();

        // Work-Life Integration Enhancement
        this.optimizationVector.workLifeIntegration = this.calculateWorkLifeOptimization();

        // Meeting Culture Enhancement
        this.optimizationVector.meetingCultureOptimization = this.calculateMeetingOptimization();

        // Team Psychological Safety Growth
        this.optimizationVector.teamPsychologicalSafety = this.calculateSafetyOptimization();

        // Departmental Dynamics Enhancement
        this.optimizationVector.departmentalDynamics = this.calculateDepartmentalOptimization();

        // Role Clarity Enhancement
        this.optimizationVector.roleClarity = this.calculateRoleOptimization();
    }

    calculateStructuralOptimization() {
        const relevantResponses = this.evidence.filter(r =>
            r.signals && r.signals.structural
        );

        if (relevantResponses.length === 0) return 0;

        let confidence = 0;
        let weightSum = 0;

        relevantResponses.forEach(response => {
            const signals = response.signals.structural;
            Object.entries(signals).forEach(([signal, value]) => {
                const weight = this.getSignalWeight('structural', signal);
                confidence += this.sigmoid(value) * weight;
                weightSum += weight;
            });
        });

        return weightSum > 0 ? confidence / weightSum : 0;
    }

    calculateResilienceOpportunities() {
        const relevantResponses = this.evidence.filter(r =>
            r.signals && r.signals.individual
        );

        if (relevantResponses.length === 0) return 0;

        let confidence = 0;
        let weightSum = 0;

        relevantResponses.forEach(response => {
            const signals = response.signals.individual;
            Object.entries(signals).forEach(([signal, value]) => {
                const weight = this.getSignalWeight('individual', signal);
                confidence += this.sigmoid(value) * weight;
                weightSum += weight;
            });
        });

        return weightSum > 0 ? confidence / weightSum : 0;
    }

    calculateAlignmentOpportunities() {
        const relevantResponses = this.evidence.filter(r =>
            r.signals && r.signals.organizational
        );

        if (relevantResponses.length === 0) return 0;

        let confidence = 0;
        let weightSum = 0;

        relevantResponses.forEach(response => {
            const signals = response.signals.organizational;
            Object.entries(signals).forEach(([signal, value]) => {
                const weight = this.getSignalWeight('organizational', signal);
                confidence += this.sigmoid(value) * weight;
                weightSum += weight;
            });
        });

        return weightSum > 0 ? confidence / weightSum : 0;
    }

    calculateWorkLifeOptimization() {
        const workLifeResponses = this.evidence.filter(r =>
            r.category === 'worklife' || (r.signals && r.signals.worklife)
        );

        if (workLifeResponses.length === 0) return 0;

        const signals = {
            transitionEase: this.extractSignal('transition_ease'),
            weekendRestoration: this.extractSignal('weekend_restoration'),
            familyTimeConflicts: this.extractSignal('family_conflicts'),
            workThoughtIntrusion: this.extractSignal('work_intrusion')
        };

        return this.sigmoid(
            signals.transitionEase * -0.3 +
            signals.weekendRestoration * -0.4 +
            signals.familyTimeConflicts * 0.2 +
            signals.workThoughtIntrusion * 0.1
        );
    }

    calculateMeetingOptimization() {
        const meetingResponses = this.evidence.filter(r =>
            r.category === 'meetings' || (r.signals && r.signals.meetings)
        );

        if (meetingResponses.length === 0) return 0;

        const signals = {
            hoursPerWeek: this.extractSignal('meeting_hours'),
            purposeClarity: this.extractSignal('purpose_clarity'),
            speakUpFrequency: this.extractSignal('speak_up'),
            questioningComfort: this.extractSignal('questioning_comfort')
        };

        return this.sigmoid(
            (signals.hoursPerWeek - 15) * 0.1 +
            signals.purposeClarity * -0.3 +
            signals.speakUpFrequency * -0.2 +
            signals.questioningComfort * -0.4
        );
    }

    calculateSafetyOptimization() {
        const safetySignals = {
            speakUp: this.extractSignal('speak_up_comfort'),
            admitMistakes: this.extractSignal('admit_mistakes'),
            challengeIdeas: this.extractSignal('challenge_ideas'),
            askForHelp: this.extractSignal('ask_for_help')
        };

        return this.sigmoid(
            safetySignals.speakUp * -0.3 +
            safetySignals.admitMistakes * -0.3 +
            safetySignals.challengeIdeas * -0.2 +
            safetySignals.askForHelp * -0.2
        ) * -1 + 1; // Invert - low safety = high dysfunction
    }

    calculateDepartmentalOptimization() {
        const deptSignals = {
            teamDynamics: this.extractSignal('team_dynamics'),
            leadershipStyle: this.extractSignal('leadership_style'),
            workloadDistribution: this.extractSignal('workload_fair'),
            teamCommunication: this.extractSignal('team_communication')
        };

        return this.sigmoid(
            deptSignals.teamDynamics * -0.3 +
            deptSignals.leadershipStyle * -0.2 +
            deptSignals.workloadDistribution * -0.3 +
            deptSignals.teamCommunication * -0.2
        );
    }

    calculateRoleOptimization() {
        const roleSignals = {
            expectationClarity: this.extractSignal('expectations_clear'),
            goalAlignment: this.extractSignal('goal_alignment'),
            skillMatch: this.extractSignal('skill_match'),
            autonomyLevel: this.extractSignal('autonomy')
        };

        return this.sigmoid(
            roleSignals.expectationClarity * -0.3 +
            roleSignals.goalAlignment * -0.3 +
            roleSignals.skillMatch * -0.2 +
            roleSignals.autonomyLevel * -0.2
        ) * -1 + 1; // Invert - high clarity = low dysfunction
    }

    // Utility functions
    sigmoid(x) {
        return 1 / (1 + Math.exp(-x));
    }

    extractSignal(signalName) {
        const responses = this.evidence.filter(r =>
            r.signals && Object.values(r.signals).some(category =>
                category[signalName] !== undefined
            )
        );

        if (responses.length === 0) return 0;

        const values = responses.flatMap(r =>
            Object.values(r.signals).map(category => category[signalName]).filter(v => v !== undefined)
        );

        return values.reduce((sum, v) => sum + v, 0) / values.length;
    }

    getSignalWeight(category, signal) {
        const weights = {
            structural: {
                planning_barriers: 0.4,
                resource_constraints: 0.3,
                process_clarity: 0.3
            },
            individual: {
                home_stress: 0.3,
                health_issues: 0.2,
                skill_gaps: 0.2,
                motivation: 0.3
            },
            organizational: {
                culture_toxicity: 0.4,
                leadership_quality: 0.3,
                change_management: 0.3
            }
        };

        return weights[category]?.[signal] || 0.1;
    }

    determineNextStep() {
        const maxConfidence = Math.max(...Object.values(this.optimizationVector));
        const entropy = this.calculateEntropy();
        const questionCount = this.evidence.length;

        // Require minimum 20 questions before any diagnostic conclusions
        if (questionCount < 20) {
            return {
                status: 'continue_exploration',
                optimizationOpportunities: this.optimizationVector,
                nextQuestionType: 'broad',
                confidence: maxConfidence,
                totalQuestions: questionCount,
                minimumRequired: 20
            };
        }

        if (maxConfidence > this.confidenceThresholds.high && entropy < 0.5) {
            return {
                status: 'ready_for_optimization',
                optimizationOpportunities: this.optimizationVector,
                primaryOpportunity: this.getPrimaryOpportunity(),
                recommendedIntervention: this.getOptimizationRecommendation(),
                confidence: maxConfidence,
                totalQuestions: this.evidence.length
            };
        } else if (maxConfidence > this.confidenceThresholds.medium) {
            return {
                status: 'need_targeted_followup',
                optimizationOpportunities: this.optimizationVector,
                focusArea: this.getHighestUncertaintyDimension(),
                nextQuestionType: 'targeted',
                confidence: maxConfidence
            };
        } else {
            return {
                status: 'continue_exploration',
                optimizationOpportunities: this.optimizationVector,
                nextQuestionType: 'broad',
                confidence: maxConfidence
            };
        }
    }

    calculateEntropy() {
        const values = Object.values(this.optimizationVector);
        const sum = values.reduce((a, b) => a + b, 0);

        if (sum === 0) return 1; // Maximum uncertainty

        const probabilities = values.map(v => v / sum);
        return -probabilities.reduce((entropy, p) => {
            return entropy + (p > 0 ? p * Math.log2(p) : 0);
        }, 0) / Math.log2(values.length);
    }

    getPrimaryOpportunity() {
        const sorted = Object.entries(this.optimizationVector)
            .sort(([,a], [,b]) => b - a);
        return {
            primary: sorted[0][0],
            confidence: sorted[0][1],
            secondary: sorted[1][0],
            secondaryConfidence: sorted[1][1]
        };
    }

    getHighestUncertaintyDimension() {
        // Find dimension closest to 0.5 (maximum uncertainty)
        const uncertainties = Object.entries(this.optimizationVector)
            .map(([key, prob]) => [key, Math.abs(prob - 0.5)])
            .sort((a, b) => a[1] - b[1]);

        return uncertainties[0][0];
    }

    getOptimizationRecommendation() {
        const primary = this.getPrimaryOpportunity();

        const interventions = {
            structuralEfficiency: {
                type: 'organizational_optimization',
                description: 'Structural efficiency and process enhancement analysis',
                provider: 'management_consultant',
                urgency: 'high'
            },
            individualResilience: {
                type: 'resilience_coaching',
                description: 'Individual resilience building and performance optimization',
                provider: 'performance_coach',
                urgency: 'medium'
            },
            organizationalAlignment: {
                type: 'culture_enhancement',
                description: 'Organizational alignment and leadership effectiveness',
                provider: 'organizational_development_specialist',
                urgency: 'high'
            },
            workLifeIntegration: {
                type: 'boundary_coaching',
                description: 'Work-life integration and boundary setting',
                provider: 'life_coach',
                urgency: 'medium'
            },
            meetingCultureOptimization: {
                type: 'meeting_effectiveness',
                description: 'Meeting culture enhancement and productivity optimization',
                provider: 'productivity_consultant',
                urgency: 'medium'
            },
            teamPsychologicalSafety: {
                type: 'team_enhancement',
                description: 'Team psychological safety and collaboration optimization',
                provider: 'team_development_coach',
                urgency: 'high'
            },
            departmentalDynamics: {
                type: 'team_optimization',
                description: 'Departmental dynamics enhancement and leadership development',
                provider: 'team_effectiveness_consultant',
                urgency: 'medium'
            },
            roleClarity: {
                type: 'role_optimization',
                description: 'Role clarity and expectation alignment',
                provider: 'hr_consultant',
                urgency: 'medium'
            }
        };

        return interventions[primary.primary] || interventions.individualResilience;
    }

    // Save state for persistence
    getState() {
        return {
            optimizationVector: this.optimizationVector,
            evidence: this.evidence,
            questionHistory: this.questionHistory,
            currentQuestionIndex: this.currentQuestionIndex
        };
    }

    // Restore state from storage
    setState(state) {
        this.optimizationVector = state.optimizationVector || state.diagnosticVector || this.optimizationVector;
        this.evidence = state.evidence || [];
        this.questionHistory = state.questionHistory || [];
        this.currentQuestionIndex = state.currentQuestionIndex || 0;
    }
}

// Export for use in assessment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiagnosticEngine;
} else {
    window.DiagnosticEngine = DiagnosticEngine;
}