// THRIVE Diagnostic Assessment Engine
// AI-Based Probabilistic Conditional Logic System

class DiagnosticEngine {
    constructor() {
        this.confidenceThresholds = {
            high: 0.75,    // Strong signal - ready for intervention routing
            medium: 0.40,  // Emerging pattern - ask targeted follow-ups
            low: 0.15      // Weak signal - continue general exploration
        };

        this.diagnosticVector = {
            structuralBarriers: 0,
            individualStress: 0,
            organizationalDysfunction: 0,
            workLifeIntegration: 0,
            meetingCulture: 0,
            psychologicalSafety: 0,
            departmentalIssues: 0,
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

        // Recalculate all diagnostic probabilities
        this.updateDiagnosticVector();

        // Determine next action
        return this.determineNextStep();
    }

    updateDiagnosticVector() {
        // Structural Barriers Analysis
        this.diagnosticVector.structuralBarriers = this.calculateStructuralBarriers();

        // Individual Stress Analysis
        this.diagnosticVector.individualStress = this.calculateIndividualStress();

        // Organizational Dysfunction
        this.diagnosticVector.organizationalDysfunction = this.calculateOrganizationalDysfunction();

        // Work-Life Integration
        this.diagnosticVector.workLifeIntegration = this.calculateWorkLifeIntegration();

        // Meeting Culture
        this.diagnosticVector.meetingCulture = this.calculateMeetingCulture();

        // Psychological Safety
        this.diagnosticVector.psychologicalSafety = this.calculatePsychologicalSafety();

        // Departmental Issues
        this.diagnosticVector.departmentalIssues = this.calculateDepartmentalIssues();

        // Role Clarity
        this.diagnosticVector.roleClarity = this.calculateRoleClarity();
    }

    calculateStructuralBarriers() {
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

    calculateIndividualStress() {
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

    calculateOrganizationalDysfunction() {
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

    calculateWorkLifeIntegration() {
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

    calculateMeetingCulture() {
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

    calculatePsychologicalSafety() {
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

    calculateDepartmentalIssues() {
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

    calculateRoleClarity() {
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
        const maxConfidence = Math.max(...Object.values(this.diagnosticVector));
        const entropy = this.calculateEntropy();

        if (maxConfidence > this.confidenceThresholds.high && entropy < 0.5) {
            return {
                status: 'ready_for_intervention',
                diagnosis: this.diagnosticVector,
                primaryDysfunction: this.getPrimaryDysfunction(),
                recommendedIntervention: this.getInterventionRecommendation(),
                confidence: maxConfidence,
                totalQuestions: this.evidence.length
            };
        } else if (maxConfidence > this.confidenceThresholds.medium) {
            return {
                status: 'need_targeted_followup',
                diagnosis: this.diagnosticVector,
                focusArea: this.getHighestUncertaintyDimension(),
                nextQuestionType: 'targeted',
                confidence: maxConfidence
            };
        } else {
            return {
                status: 'continue_exploration',
                diagnosis: this.diagnosticVector,
                nextQuestionType: 'broad',
                confidence: maxConfidence
            };
        }
    }

    calculateEntropy() {
        const values = Object.values(this.diagnosticVector);
        const sum = values.reduce((a, b) => a + b, 0);

        if (sum === 0) return 1; // Maximum uncertainty

        const probabilities = values.map(v => v / sum);
        return -probabilities.reduce((entropy, p) => {
            return entropy + (p > 0 ? p * Math.log2(p) : 0);
        }, 0) / Math.log2(values.length);
    }

    getPrimaryDysfunction() {
        const sorted = Object.entries(this.diagnosticVector)
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
        const uncertainties = Object.entries(this.diagnosticVector)
            .map(([key, prob]) => [key, Math.abs(prob - 0.5)])
            .sort((a, b) => a[1] - b[1]);

        return uncertainties[0][0];
    }

    getInterventionRecommendation() {
        const primary = this.getPrimaryDysfunction();

        const interventions = {
            structuralBarriers: {
                type: 'organizational_consultation',
                description: 'Organizational structure and process analysis',
                provider: 'management_consultant',
                urgency: 'high'
            },
            individualStress: {
                type: 'personal_coaching',
                description: 'Individual stress management and coping strategies',
                provider: 'dr_thomas_neuroevaluator',
                urgency: 'medium'
            },
            organizationalDysfunction: {
                type: 'culture_transformation',
                description: 'Company-wide culture and leadership development',
                provider: 'organizational_psychologist',
                urgency: 'high'
            },
            workLifeIntegration: {
                type: 'boundary_coaching',
                description: 'Work-life integration and boundary setting',
                provider: 'life_coach',
                urgency: 'medium'
            },
            meetingCulture: {
                type: 'meeting_optimization',
                description: 'Meeting culture analysis and optimization',
                provider: 'productivity_consultant',
                urgency: 'medium'
            },
            psychologicalSafety: {
                type: 'team_development',
                description: 'Psychological safety and team dynamics improvement',
                provider: 'team_coach',
                urgency: 'high'
            },
            departmentalIssues: {
                type: 'department_analysis',
                description: 'Department-specific dynamics and leadership',
                provider: 'department_consultant',
                urgency: 'medium'
            },
            roleClarity: {
                type: 'role_optimization',
                description: 'Role clarity and expectation alignment',
                provider: 'hr_consultant',
                urgency: 'medium'
            }
        };

        return interventions[primary.primary] || interventions.individualStress;
    }

    // Save state for persistence
    getState() {
        return {
            diagnosticVector: this.diagnosticVector,
            evidence: this.evidence,
            questionHistory: this.questionHistory,
            currentQuestionIndex: this.currentQuestionIndex
        };
    }

    // Restore state from storage
    setState(state) {
        this.diagnosticVector = state.diagnosticVector || this.diagnosticVector;
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