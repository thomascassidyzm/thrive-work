// THRIVE Diagnostic Question Bank
// AI-weighted questions for probabilistic assessment

class QuestionBank {
    constructor() {
        this.questions = this.initializeQuestions();
        this.usedQuestions = new Set();
    }

    initializeQuestions() {
        return [
            // Entry Questions - Weekly Preparedness & Organization
            {
                id: 'wp001',
                type: 'entry',
                category: 'weekly_prep',
                text: 'Thinking about this upcoming work week, how prepared do you feel?',
                options: [
                    { value: 1, text: 'Completely unprepared, dreading it' },
                    { value: 2, text: 'Somewhat unprepared, feeling anxious' },
                    { value: 3, text: 'Moderately prepared, some uncertainty' },
                    { value: 4, text: 'Well prepared, feeling confident' },
                    { value: 5, text: 'Completely prepared, excited to start' }
                ],
                signals: {
                    structural: { planning_barriers: 'inverse' },
                    individual: { anxiety_level: 'direct' },
                    organizational: { predictability: 'inverse' }
                }
            },

            {
                id: 'wp002',
                type: 'entry',
                category: 'weekly_prep',
                text: 'Do you feel organized and structured going into next week?',
                options: [
                    { value: 1, text: 'Not at all - complete chaos' },
                    { value: 2, text: 'Barely organized, struggling' },
                    { value: 3, text: 'Somewhat organized, manageable' },
                    { value: 4, text: 'Well organized, clear structure' },
                    { value: 5, text: 'Extremely organized, everything planned' }
                ],
                signals: {
                    structural: { resource_constraints: 'inverse', process_clarity: 'direct' },
                    individual: { organization_skills: 'direct' }
                }
            },

            {
                id: 'wp003',
                type: 'entry',
                category: 'weekly_prep',
                text: 'Do you feel enabled to determine positive outcomes for your week?',
                options: [
                    { value: 1, text: 'Not at all - everything happens to me' },
                    { value: 2, text: 'Limited control over outcomes' },
                    { value: 3, text: 'Some influence on my week' },
                    { value: 4, text: 'Good control over most outcomes' },
                    { value: 5, text: 'Complete agency over my week' }
                ],
                signals: {
                    structural: { autonomy_level: 'direct' },
                    organizational: { empowerment_culture: 'direct' },
                    roleClarity: { expectation_clarity: 'direct' }
                }
            },

            // Meeting Culture Questions
            {
                id: 'mt001',
                type: 'targeted',
                category: 'meetings',
                text: 'How many hours per week do you spend in meetings?',
                options: [
                    { value: 5, text: 'Less than 5 hours' },
                    { value: 10, text: '5-10 hours' },
                    { value: 15, text: '11-15 hours' },
                    { value: 20, text: '16-20 hours' },
                    { value: 25, text: 'More than 20 hours' }
                ],
                signals: {
                    meetings: {
                        meeting_hours: 'direct',
                        time_management_stress: 'direct'
                    },
                    structural: { meeting_efficiency: 'inverse' }
                }
            },

            {
                id: 'mt002',
                type: 'targeted',
                category: 'meetings',
                text: 'When you\'re in a meeting and someone asks an open question, how likely are you to respond?',
                options: [
                    { value: 1, text: 'Never - I stay silent' },
                    { value: 2, text: 'Rarely - only when directly asked' },
                    { value: 3, text: 'Sometimes - depends on the topic' },
                    { value: 4, text: 'Often - I contribute regularly' },
                    { value: 5, text: 'Always - I\'m very vocal' }
                ],
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
            },

            {
                id: 'mt003',
                type: 'targeted',
                category: 'meetings',
                text: 'Do you ever question why you\'re in specific meetings but attend anyway?',
                options: [
                    { value: 5, text: 'Never - every meeting has clear value' },
                    { value: 4, text: 'Rarely - most meetings are worthwhile' },
                    { value: 3, text: 'Sometimes - some meetings feel unnecessary' },
                    { value: 2, text: 'Often - many meetings seem pointless' },
                    { value: 1, text: 'Always - most meetings waste my time' }
                ],
                signals: {
                    meetings: {
                        purpose_clarity: 'direct',
                        questioning_comfort: 'inverse'
                    },
                    psychologicalSafety: {
                        challenge_ideas: 'inverse'
                    },
                    structural: { meeting_governance: 'direct' }
                }
            },

            // Work-Life Integration Questions
            {
                id: 'wl001',
                type: 'targeted',
                category: 'worklife',
                text: 'How easily can you switch from work mode to family/recreation mode?',
                options: [
                    { value: 1, text: 'Very difficult - work thoughts dominate' },
                    { value: 2, text: 'Somewhat difficult - takes hours to switch' },
                    { value: 3, text: 'Moderately easy - takes some time' },
                    { value: 4, text: 'Pretty easy - switch within 30 minutes' },
                    { value: 5, text: 'Very easy - immediate transition' }
                ],
                signals: {
                    worklife: {
                        transition_ease: 'direct',
                        mental_boundaries: 'direct'
                    },
                    individual: {
                        stress_regulation: 'direct',
                        compartmentalization: 'direct'
                    }
                }
            },

            {
                id: 'wl002',
                type: 'targeted',
                category: 'worklife',
                text: 'Is there a specific day when you consistently feel exhausted?',
                options: [
                    { value: 1, text: 'Every day - constant exhaustion' },
                    { value: 2, text: 'Most days - rarely feel energized' },
                    { value: 3, text: 'Mid-week - Wednesday/Thursday crash' },
                    { value: 4, text: 'End of week - Friday burnout' },
                    { value: 5, text: 'No pattern - energy levels vary' }
                ],
                signals: {
                    individual: {
                        energy_management: 'inverse',
                        burnout_risk: 'direct'
                    },
                    structural: {
                        workload_distribution: 'inverse'
                    }
                }
            },

            {
                id: 'wl003',
                type: 'targeted',
                category: 'worklife',
                text: 'How restorative do you find your weekends?',
                options: [
                    { value: 1, text: 'Not at all - dread Monday' },
                    { value: 2, text: 'Slightly - still feel drained' },
                    { value: 3, text: 'Somewhat - partial recovery' },
                    { value: 4, text: 'Very - feel recharged' },
                    { value: 5, text: 'Completely - excited for the week' }
                ],
                signals: {
                    worklife: {
                        weekend_restoration: 'direct',
                        work_intrusion: 'inverse'
                    },
                    individual: {
                        recovery_ability: 'direct'
                    }
                }
            },

            // Psychological Safety Questions
            {
                id: 'ps001',
                type: 'targeted',
                category: 'psychological_safety',
                text: 'When you make a mistake at work, how comfortable are you admitting it?',
                options: [
                    { value: 1, text: 'Very uncomfortable - I hide mistakes' },
                    { value: 2, text: 'Uncomfortable - I minimize mistakes' },
                    { value: 3, text: 'Somewhat comfortable - depends on the situation' },
                    { value: 4, text: 'Comfortable - I usually admit mistakes' },
                    { value: 5, text: 'Very comfortable - I openly discuss mistakes' }
                ],
                signals: {
                    psychologicalSafety: {
                        admit_mistakes: 'direct',
                        vulnerability_comfort: 'direct'
                    },
                    organizational: {
                        blame_culture: 'inverse',
                        learning_culture: 'direct'
                    }
                }
            },

            {
                id: 'ps002',
                type: 'targeted',
                category: 'psychological_safety',
                text: 'How comfortable do you feel asking for help when you need it?',
                options: [
                    { value: 1, text: 'Very uncomfortable - I struggle alone' },
                    { value: 2, text: 'Uncomfortable - I rarely ask for help' },
                    { value: 3, text: 'Somewhat comfortable - depends on the person' },
                    { value: 4, text: 'Comfortable - I ask for help when needed' },
                    { value: 5, text: 'Very comfortable - I actively seek support' }
                ],
                signals: {
                    psychologicalSafety: {
                        ask_for_help: 'direct'
                    },
                    individual: {
                        self_sufficiency_pressure: 'inverse',
                        vulnerability_tolerance: 'direct'
                    }
                }
            },

            // Structural/Organizational Questions
            {
                id: 'st001',
                type: 'targeted',
                category: 'structural',
                text: 'Do you have a clear plan that you\'re allowed to execute?',
                options: [
                    { value: 1, text: 'No plan and no permission to create one' },
                    { value: 2, text: 'Vague plan, limited execution authority' },
                    { value: 3, text: 'Clear plan, some execution barriers' },
                    { value: 4, text: 'Clear plan, mostly free to execute' },
                    { value: 5, text: 'Clear plan, complete execution freedom' }
                ],
                signals: {
                    structural: {
                        planning_barriers: 'inverse',
                        autonomy_level: 'direct',
                        resource_access: 'direct'
                    },
                    roleClarity: {
                        expectation_clarity: 'direct'
                    }
                }
            },

            {
                id: 'st002',
                type: 'targeted',
                category: 'structural',
                text: 'What specific factors make you feel unprepared for your work week?',
                options: [
                    { value: 1, text: 'Constantly changing priorities' },
                    { value: 2, text: 'Lack of information or resources' },
                    { value: 3, text: 'Unclear expectations from leadership' },
                    { value: 4, text: 'Personal time management issues' },
                    { value: 5, text: 'External factors beyond work control' }
                ],
                signals: {
                    structural: {
                        priority_stability: 'inverse',
                        resource_constraints: 'direct',
                        leadership_clarity: 'inverse'
                    },
                    individual: {
                        time_management: 'inverse',
                        external_stressors: 'direct'
                    }
                }
            },

            // Role Clarity & Values Alignment
            {
                id: 'rc001',
                type: 'targeted',
                category: 'role_clarity',
                text: 'When work social events conflict with family time, what influences your choice?',
                options: [
                    { value: 1, text: 'Work pressure - I feel I must attend' },
                    { value: 2, text: 'Career concerns - attendance affects advancement' },
                    { value: 3, text: 'Mixed consideration - depends on the event' },
                    { value: 4, text: 'Family priority - I choose family unless critical' },
                    { value: 5, text: 'Personal values - I follow my priorities' }
                ],
                signals: {
                    worklife: {
                        boundary_clarity: 'direct',
                        values_alignment: 'direct'
                    },
                    organizational: {
                        culture_pressure: 'inverse',
                        work_life_respect: 'direct'
                    }
                }
            },

            // Departmental Dynamics
            {
                id: 'dd001',
                type: 'targeted',
                category: 'departmental',
                text: 'How would you describe the communication within your immediate team?',
                options: [
                    { value: 1, text: 'Poor - lots of misunderstandings' },
                    { value: 2, text: 'Below average - some communication issues' },
                    { value: 3, text: 'Average - generally functional' },
                    { value: 4, text: 'Good - clear and effective most of the time' },
                    { value: 5, text: 'Excellent - transparent and open' }
                ],
                signals: {
                    departmental: {
                        team_communication: 'direct',
                        collaboration_quality: 'direct'
                    },
                    psychologicalSafety: {
                        communication_safety: 'direct'
                    }
                }
            },

            // Broad Exploratory Questions
            {
                id: 'br001',
                type: 'broad',
                category: 'general',
                text: 'What typically happens to your energy levels throughout the work week?',
                options: [
                    { value: 1, text: 'Start low, stay low throughout' },
                    { value: 2, text: 'Start okay, decline rapidly' },
                    { value: 3, text: 'Fluctuate unpredictably' },
                    { value: 4, text: 'Generally stable with minor dips' },
                    { value: 5, text: 'Start high, maintain or improve' }
                ],
                signals: {
                    individual: {
                        energy_pattern: 'direct',
                        sustainability: 'direct'
                    },
                    structural: {
                        workload_balance: 'direct'
                    }
                }
            },

            {
                id: 'br002',
                type: 'broad',
                category: 'general',
                text: 'How often do you feel your skills and abilities match what your role requires?',
                options: [
                    { value: 1, text: 'Never - constantly struggling' },
                    { value: 2, text: 'Rarely - often feel inadequate' },
                    { value: 3, text: 'Sometimes - depends on the task' },
                    { value: 4, text: 'Usually - generally well-matched' },
                    { value: 5, text: 'Always - perfect fit for my role' }
                ],
                signals: {
                    roleClarity: {
                        skill_match: 'direct',
                        competence_confidence: 'direct'
                    },
                    individual: {
                        imposter_syndrome: 'inverse'
                    }
                }
            }
        ];
    }

    getNextQuestion(diagnosticEngine, questionType = 'auto') {
        const state = diagnosticEngine.getState();

        if (questionType === 'auto') {
            questionType = this.determineQuestionType(diagnosticEngine);
        }

        let candidateQuestions;

        if (questionType === 'entry' && state.evidence.length < 3) {
            candidateQuestions = this.questions.filter(q =>
                q.type === 'entry' && !this.usedQuestions.has(q.id)
            );
        } else if (questionType === 'targeted') {
            const focusArea = diagnosticEngine.getHighestUncertaintyDimension();
            candidateQuestions = this.getTargetedQuestionsFor(focusArea);
        } else if (questionType === 'broad') {
            candidateQuestions = this.questions.filter(q =>
                q.type === 'broad' && !this.usedQuestions.has(q.id)
            );
        } else {
            // Default to any unused question
            candidateQuestions = this.questions.filter(q =>
                !this.usedQuestions.has(q.id)
            );
        }

        if (candidateQuestions.length === 0) {
            return null; // No more questions
        }

        // Select question with highest expected information gain
        const selectedQuestion = this.selectOptimalQuestion(candidateQuestions, diagnosticEngine);
        this.usedQuestions.add(selectedQuestion.id);

        return selectedQuestion;
    }

    determineQuestionType(diagnosticEngine) {
        const state = diagnosticEngine.getState();
        const maxConfidence = Math.max(...Object.values(state.diagnosticVector));

        if (state.evidence.length < 3) {
            return 'entry';
        } else if (maxConfidence > 0.4) {
            return 'targeted';
        } else {
            return 'broad';
        }
    }

    getTargetedQuestionsFor(focusArea) {
        const categoryMap = {
            structuralBarriers: 'structural',
            meetingCulture: 'meetings',
            workLifeIntegration: 'worklife',
            psychologicalSafety: 'psychological_safety',
            departmentalIssues: 'departmental',
            roleClarity: 'role_clarity'
        };

        const targetCategory = categoryMap[focusArea];

        return this.questions.filter(q =>
            (q.category === targetCategory ||
             (q.signals && Object.keys(q.signals).includes(focusArea))) &&
            !this.usedQuestions.has(q.id)
        );
    }

    selectOptimalQuestion(candidates, diagnosticEngine) {
        // For now, select randomly from candidates
        // TODO: Implement expected information gain calculation
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    processResponse(question, selectedOption, diagnosticEngine) {
        const response = {
            questionId: question.id,
            question: question.text,
            selectedOption: selectedOption,
            category: question.category,
            signals: this.calculateSignals(question, selectedOption)
        };

        return diagnosticEngine.processResponse(response);
    }

    calculateSignals(question, selectedOption) {
        const signals = {};

        if (question.signals) {
            Object.entries(question.signals).forEach(([category, categorySignals]) => {
                signals[category] = {};

                Object.entries(categorySignals).forEach(([signal, direction]) => {
                    let value = selectedOption.value;

                    // Apply signal direction transformation
                    if (direction === 'inverse') {
                        value = 6 - value; // Invert 1-5 scale
                    }

                    // Normalize to -2 to +2 range for sigmoid function
                    signals[category][signal] = (value - 3) * 0.8;
                });
            });
        }

        return signals;
    }

    // Get questions for testing/debugging
    getAllQuestions() {
        return this.questions;
    }

    reset() {
        this.usedQuestions.clear();
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionBank;
} else {
    window.QuestionBank = QuestionBank;
}