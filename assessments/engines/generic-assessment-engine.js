/**
 * GENERIC ASSESSMENT ENGINE
 *
 * Runs ANY assessment defined in JSON format
 * Handles: questions, routing logic, scoring, recommendations
 *
 * PORTABLE: Content in JSON, logic in JSON, this engine is just the interpreter
 * A developer in any stack can read the JSON and rebuild this logic
 */

class GenericAssessmentEngine {
    constructor(assessmentJSON) {
        this.assessment = assessmentJSON.assessment;
        this.questions = assessmentJSON.questions;
        this.routingLogic = assessmentJSON.routingLogic;
        this.scoringAlgorithm = assessmentJSON.scoringAlgorithm;
        this.resultActions = assessmentJSON.resultActions;
        this.privacyModel = assessmentJSON.privacyModel;

        // Runtime state
        this.responses = [];
        this.currentQuestionIndex = 0;
        this.flags = {};
        this.scores = {};
    }

    /**
     * Get next question based on routing logic
     */
    getNextQuestion() {
        // If no routing logic, just return questions in order
        if (!this.routingLogic) {
            return this.questions[this.currentQuestionIndex];
        }

        // Apply probabilistic branching logic
        const nextQuestionId = this.applyRoutingLogic();
        return this.questions.find(q => q.id === nextQuestionId);
    }

    /**
     * Apply routing logic from JSON to determine next question
     */
    applyRoutingLogic() {
        if (this.routingLogic.type === 'probabilistic-branching') {
            for (const rule of this.routingLogic.rules) {
                if (this.evaluateCondition(rule.if)) {
                    // Rule matches - apply the action
                    if (rule.then.prioritize) {
                        return this.findNextQuestionInCategories(rule.then.prioritize);
                    }
                    if (rule.then.flagForCoaching) {
                        this.flags.coachingPriority = rule.then.flagForCoaching;
                        this.flags.recommendedModality = rule.then.recommendedModality;
                    }
                }
            }
        }

        // Default: next unanswered question
        return this.questions[this.currentQuestionIndex]?.id;
    }

    /**
     * Evaluate conditional logic from JSON
     */
    evaluateCondition(condition) {
        if (condition.question) {
            const response = this.responses.find(r => r.questionId === condition.question);
            if (!response) return false;

            const matchesOption = condition.selectedOption.includes(response.selectedOptionId);

            // Handle AND conditions
            if (condition.and) {
                return matchesOption && this.evaluateCondition(condition.and);
            }

            return matchesOption;
        }

        return true;
    }

    /**
     * Find next question in prioritized categories
     */
    findNextQuestionInCategories(categories) {
        for (const category of categories) {
            const question = this.questions.find(q =>
                q.category === category &&
                !this.responses.find(r => r.questionId === q.id)
            );
            if (question) return question.id;
        }

        // Fallback to any unanswered question
        return this.questions.find(q =>
            !this.responses.find(r => r.questionId === q.id)
        )?.id;
    }

    /**
     * Record user response
     */
    recordResponse(questionId, optionId, reflectionText = null) {
        const question = this.questions.find(q => q.id === questionId);
        const option = question.options.find(o => o.id === optionId);

        const response = {
            questionId,
            selectedOptionId: optionId,
            pattern: option.pattern,
            score: option.score,
            timestamp: new Date().toISOString(),
            reflectionText
        };

        // Check for coaching flags
        if (option.flagForCoaching) {
            this.flags[questionId] = {
                flag: true,
                note: option.coachingNote,
                priority: option.flagPriority || 'medium'
            };
        }

        this.responses.push(response);
        this.currentQuestionIndex++;

        return {
            response,
            followUp: option.followUp,
            needsReflection: question.responseType === 'multiple-choice-with-reflection'
        };
    }

    /**
     * Calculate scores based on JSON-defined algorithm
     */
    calculateScores() {
        const dimensionScores = {};

        // Get unique dimensions from questions
        const dimensions = [...new Set(this.questions.map(q => q.dimension))];

        for (const dimension of dimensions) {
            // Get all responses for this dimension
            const dimensionResponses = this.responses.filter(r => {
                const question = this.questions.find(q => q.id === r.questionId);
                return question.dimension === dimension;
            });

            if (dimensionResponses.length === 0) {
                dimensionScores[dimension] = null;
                continue;
            }

            // Weighted average calculation
            const totalScore = dimensionResponses.reduce((sum, r) => {
                return sum + (r.score[dimension] || 0);
            }, 0);

            const averageScore = totalScore / dimensionResponses.length;
            dimensionScores[dimension] = Math.round(averageScore * 100);
        }

        this.scores = dimensionScores;
        return dimensionScores;
    }

    /**
     * Generate recommendations based on scores and flags
     */
    generateRecommendations() {
        const recommendations = [];

        if (!this.resultActions || !this.resultActions.recommendations) {
            return recommendations;
        }

        for (const rule of this.resultActions.recommendations) {
            if (this.evaluateRecommendationCondition(rule.if)) {
                recommendations.push(rule.recommend);
            }
        }

        return recommendations;
    }

    /**
     * Evaluate recommendation conditions
     */
    evaluateRecommendationCondition(condition) {
        if (condition.dimension && condition.score) {
            const dimensionScore = this.scores[condition.dimension];
            if (!dimensionScore) return false;

            const [min, max] = condition.score.split('-').map(Number);
            const meetsScoreCondition = dimensionScore >= min && dimensionScore <= max;

            // Check AND conditions
            if (condition.and) {
                if (condition.and.flagForCoaching) {
                    return meetsScoreCondition && Object.keys(this.flags).length > 0;
                }
            }

            return meetsScoreCondition;
        }

        return false;
    }

    /**
     * Get complete results
     */
    getResults() {
        const scores = this.calculateScores();
        const recommendations = this.generateRecommendations();

        return {
            assessmentId: this.assessment.id,
            assessmentName: this.assessment.name,
            framework: this.assessment.framework,
            completedAt: new Date().toISOString(),

            // Individual results
            scores,
            interpretations: this.getInterpretations(scores),
            recommendations,
            flags: this.flags,

            // Privacy-aware data
            responses: this.responses,
            privacyModel: this.privacyModel,

            // Employer-shareable data (if any)
            employerShareable: this.getEmployerShareableData()
        };
    }

    /**
     * Get interpretations for scores based on JSON definitions
     */
    getInterpretations(scores) {
        const interpretations = {};

        for (const [dimension, score] of Object.entries(scores)) {
            if (score === null) continue;

            const dimensionDef = this.scoringAlgorithm?.dimensions?.[dimension];
            if (!dimensionDef || !dimensionDef.interpretation) continue;

            // Find matching interpretation range
            for (const [range, interpretation] of Object.entries(dimensionDef.interpretation)) {
                const [min, max] = range.split('-').map(Number);
                if (score >= min && score <= max) {
                    interpretations[dimension] = {
                        score,
                        interpretation,
                        dimensionName: dimensionDef.name
                    };
                    break;
                }
            }
        }

        return interpretations;
    }

    /**
     * Extract employer-shareable data based on privacy rules
     */
    getEmployerShareableData() {
        if (this.privacyModel.employerAccess === 'none') {
            return null;
        }

        // Only return metrics defined as shareable
        const shareable = {};

        if (this.privacyModel.aggregationRules?.sharedMetrics) {
            for (const metric of this.privacyModel.aggregationRules.sharedMetrics) {
                switch (metric) {
                    case 'engagement-rate':
                        shareable.engagementRate = this.responses.length / this.questions.length;
                        break;
                    case 'completion-rate':
                        shareable.completionRate = this.responses.length === this.questions.length ? 1 : 0;
                        break;
                    case 'satisfaction-score':
                        // Would come from post-assessment survey
                        shareable.satisfactionScore = null;
                        break;
                }
            }
        }

        return shareable;
    }

    /**
     * Export assessment data in portable format
     */
    exportData() {
        return {
            assessmentDefinition: {
                id: this.assessment.id,
                version: this.assessment.version,
                framework: this.assessment.framework
            },
            responses: this.responses,
            results: this.getResults(),
            exportedAt: new Date().toISOString()
        };
    }
}

/**
 * STATIC AGGREGATION FUNCTIONS
 * For employer dashboards - aggregate multiple individual results
 */
class AssessmentAggregator {
    /**
     * Aggregate results from multiple employees
     * Enforces k-anonymity based on privacy rules
     */
    static aggregateResults(individualResults, privacyModel) {
        const k = privacyModel.aggregationRules?.minimumRespondents || 10;

        if (individualResults.length < k) {
            return {
                error: 'PRIVACY_THRESHOLD_NOT_MET',
                message: `Need at least ${k} respondents. Currently have ${individualResults.length}.`,
                threshold: k,
                currentCount: individualResults.length
            };
        }

        // Calculate aggregated metrics
        const aggregated = {
            totalRespondents: individualResults.length,
            aggregatedAt: new Date().toISOString(),
            assessmentId: individualResults[0].assessmentId,

            metrics: {}
        };

        // Only include metrics defined as shareable
        const sharedMetrics = privacyModel.aggregationRules?.sharedMetrics || [];

        for (const metric of sharedMetrics) {
            switch (metric) {
                case 'engagement-rate':
                    aggregated.metrics.averageEngagement =
                        individualResults.reduce((sum, r) => sum + r.employerShareable.engagementRate, 0) /
                        individualResults.length;
                    break;

                case 'completion-rate':
                    aggregated.metrics.completionRate =
                        individualResults.filter(r => r.employerShareable.completionRate === 1).length /
                        individualResults.length;
                    break;
            }
        }

        return aggregated;
    }
}

// Export for use in demos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GenericAssessmentEngine, AssessmentAggregator };
}
