/**
 * PATTERN ADJUSTMENT ENGINE
 *
 * Provides directional guidance for behavioral pattern shifts
 * "You're at 89/100 for harmony-keeping. Want to move toward 65/100? Here's how."
 *
 * Core Philosophy:
 * - Patterns are dynamic, not fixed traits
 * - Users choose their target position (no "right" answer)
 * - Show concrete behavioral choices, not abstract advice
 * - Track progress in real-time
 * - Provide trade-off analysis (cost/benefit of each position)
 */

export class PatternAdjustmentEngine {
    constructor() {
        // Pattern libraries for each dimension
        this.patternLibrary = this.initializePatternLibrary();

        // Behavioral scenarios for practice
        this.practiceScenarios = this.initializePracticeScenarios();

        // Position descriptions (what each point level means)
        this.positionDescriptions = this.initializePositionDescriptions();
    }

    /**
     * Generate complete adjustment plan for a user goal
     * @param {Object} currentProfile - Current OCEAN percentiles { O: 72, C: 28, E: 45, A: 89, N: 34 }
     * @param {Object} userGoals - Target positions { A: 65, C: 50 }
     * @returns {Object} Complete adjustment plan with timeline, scenarios, tracking
     */
    generateAdjustmentPlan(currentProfile, userGoals) {
        const adjustmentPlans = {};

        Object.entries(userGoals).forEach(([dimension, targetValue]) => {
            const currentValue = currentProfile[dimension];

            if (currentValue === targetValue) {
                adjustmentPlans[dimension] = {
                    status: 'at_target',
                    message: 'You\'re already at your target position'
                };
                return;
            }

            adjustmentPlans[dimension] = this.createDimensionAdjustmentPlan(
                dimension,
                currentValue,
                targetValue,
                currentProfile
            );
        });

        return {
            plans: adjustmentPlans,
            overallTimeline: this.calculateOverallTimeline(adjustmentPlans),
            prioritization: this.prioritizePlans(adjustmentPlans),
            startDate: new Date().toISOString()
        };
    }

    /**
     * Create adjustment plan for a single dimension
     */
    createDimensionAdjustmentPlan(dimension, currentValue, targetValue, fullProfile) {
        const direction = targetValue > currentValue ? 'increase' : 'decrease';
        const distance = Math.abs(targetValue - currentValue);
        const dimensionName = this.getDimensionName(dimension);

        return {
            dimension,
            dimensionName,
            currentValue,
            targetValue,
            direction,
            distance,

            // Timeline estimation
            timeline: {
                estimatedWeeks: Math.ceil(distance / 5), // ~5 points shift per week with practice
                shiftsNeeded: Math.ceil(distance / 2),   // Each behavioral choice = ~2 points
                practiceFrequency: 'Daily awareness, 3-4 intentional choices per week'
            },

            // Current vs Target patterns
            currentPatterns: this.getPatternsAtLevel(dimension, currentValue),
            targetPatterns: this.getPatternsAtLevel(dimension, targetValue),

            // Why someone would want this shift
            motivation: this.getShiftMotivation(dimension, direction, currentValue, targetValue),

            // Trade-offs (what you gain, what you might lose)
            tradeoffs: this.getTradeoffs(dimension, currentValue, targetValue),

            // Concrete practice scenarios
            practiceScenarios: this.getScenarios(dimension, direction, 6),

            // Week-by-week progression
            weeklyPlan: this.generateWeeklyPlan(dimension, currentValue, targetValue),

            // Check-in schedule
            checkIns: this.generateCheckInSchedule(distance),

            // Success metrics
            successIndicators: this.getSuccessIndicators(dimension, direction),

            // Warning signs (shifting too fast, wrong direction, etc.)
            warningSign: this.getWarningSigns(dimension, direction)
        };
    }

    /**
     * Get patterns typical at a given position level
     */
    getPatternsAtLevel(dimension, value) {
        const patterns = this.patternLibrary[dimension];

        // Return patterns that are dominant at this level
        return patterns.filter(p =>
            value >= p.rangeStart && value <= p.rangeEnd
        ).map(p => ({
            name: p.name,
            description: p.description,
            frequency: this.calculateFrequency(value, p.rangeStart, p.rangeEnd),
            examples: p.examples
        }));
    }

    calculateFrequency(currentValue, rangeStart, rangeEnd) {
        // How often this pattern appears at current position
        const rangeMid = (rangeStart + rangeEnd) / 2;
        const distance = Math.abs(currentValue - rangeMid);
        const maxDistance = (rangeEnd - rangeStart) / 2;

        // Closer to middle = more frequent
        return Math.max(20, 100 - (distance / maxDistance) * 80);
    }

    /**
     * Get motivation for wanting this shift
     */
    getShiftMotivation(dimension, direction, currentValue, targetValue) {
        const motivations = {
            O: {
                increase: {
                    title: 'Why shift toward more openness/exploration?',
                    reasons: [
                        'Feel stuck in routine and want more variety',
                        'Career requires innovation and creative thinking',
                        'Want to challenge assumptions and explore alternatives',
                        'Desire deeper intellectual or aesthetic experiences'
                    ],
                    servesYouWhen: 'Innovation, creativity, and adaptability are valued'
                },
                decrease: {
                    title: 'Why shift toward more practical/traditional patterns?',
                    reasons: [
                        'Too many new ideas causing decision paralysis',
                        'Need more consistency and predictability',
                        'Want to deepen expertise in familiar areas',
                        'Preference for proven methods over experimentation'
                    ],
                    servesYouWhen: 'Reliability, consistency, and proven approaches matter'
                }
            },
            C: {
                increase: {
                    title: 'Why shift toward more structure/planning?',
                    reasons: [
                        'Missing deadlines and feeling disorganized',
                        'Want more reliability in follow-through',
                        'Need better project management skills',
                        'Desire less stress from last-minute scrambling'
                    ],
                    servesYouWhen: 'Complex projects, deadlines, and coordination matter'
                },
                decrease: {
                    title: 'Why shift toward more flexibility/spontaneity?',
                    reasons: [
                        'Feeling rigid and over-structured',
                        'Missing opportunities from over-planning',
                        'Want more adaptability to changing situations',
                        'Creativity suffering from too much control'
                    ],
                    servesYouWhen: 'Rapid change, creativity, and flow states matter'
                }
            },
            E: {
                increase: {
                    title: 'Why shift toward more social engagement?',
                    reasons: [
                        'Career requires networking and visibility',
                        'Feeling isolated and disconnected',
                        'Want more energy from social interaction',
                        'Leadership role requires more presence'
                    ],
                    servesYouWhen: 'Collaboration, networking, and team leadership matter'
                },
                decrease: {
                    title: 'Why shift toward more solitude/reflection?',
                    reasons: [
                        'Drained from too much social interaction',
                        'Need deeper focus and concentration',
                        'Want more introspection and self-knowledge',
                        'Prefer quality connections over quantity'
                    ],
                    servesYouWhen: 'Deep work, reflection, and intimate connections matter'
                }
            },
            A: {
                increase: {
                    title: 'Why shift toward more harmony/collaboration?',
                    reasons: [
                        'Relationships suffering from too much conflict',
                        'Want smoother team dynamics',
                        'Career requires diplomacy and relationship-building',
                        'Desire less stress from confrontation'
                    ],
                    servesYouWhen: 'Team cohesion, diplomacy, and collaboration matter'
                },
                decrease: {
                    title: 'Why shift toward more boundaries/self-advocacy?',
                    reasons: [
                        'Feeling burnt out from over-accommodating',
                        'Resentment building from suppressed needs',
                        'Need stronger boundaries with others',
                        'Want more authentic self-expression'
                    ],
                    servesYouWhen: 'Self-advocacy, authenticity, and boundaries matter'
                }
            },
            N: {
                increase: {
                    title: 'Why shift toward more emotional sensitivity?',
                    reasons: [
                        'Missing important emotional signals',
                        'Want deeper emotional connections',
                        'Too detached from own feelings',
                        'Need more empathy and attunement'
                    ],
                    servesYouWhen: 'Emotional awareness, empathy, and connection matter'
                },
                decrease: {
                    title: 'Why shift toward more emotional stability?',
                    reasons: [
                        'Stress and anxiety interfering with life',
                        'Emotional reactions feel disproportionate',
                        'Want more resilience and calm',
                        'Need better stress management'
                    ],
                    servesYouWhen: 'Stress resilience, emotional regulation, and stability matter'
                }
            }
        };

        return motivations[dimension]?.[direction] || {};
    }

    /**
     * Get trade-offs for shifting position
     */
    getTradeoffs(dimension, currentValue, targetValue) {
        const direction = targetValue > currentValue ? 'increase' : 'decrease';

        const tradeoffs = {
            O: {
                increase: {
                    gains: [
                        'More creativity and innovation',
                        'Broader perspective and flexibility',
                        'Intellectual stimulation and growth',
                        'Adaptability to change'
                    ],
                    costs: [
                        'Less focus on proven methods',
                        'Potential for scattered attention',
                        'May struggle with routine tasks',
                        'Others may see you as impractical'
                    ]
                },
                decrease: {
                    gains: [
                        'More consistency and reliability',
                        'Deeper expertise in familiar areas',
                        'Less overwhelm from novelty',
                        'Comfort with routine and tradition'
                    ],
                    costs: [
                        'Less adaptability to change',
                        'May miss creative opportunities',
                        'Potential rigidity in thinking',
                        'Limited intellectual exploration'
                    ]
                }
            },
            C: {
                increase: {
                    gains: [
                        'Better follow-through on goals',
                        'Less last-minute stress',
                        'More reliable to others',
                        'Improved project management'
                    ],
                    costs: [
                        'Less spontaneity and flexibility',
                        'May feel rigid or controlled',
                        'Harder to adapt to changes',
                        'Risk of over-planning'
                    ]
                },
                decrease: {
                    gains: [
                        'More spontaneity and flow',
                        'Better adaptation to change',
                        'Less stress from structure',
                        'More creativity from flexibility'
                    ],
                    costs: [
                        'Less reliability and follow-through',
                        'More last-minute scrambling',
                        'May disappoint others',
                        'Harder to manage complex projects'
                    ]
                }
            },
            E: {
                increase: {
                    gains: [
                        'More energy from social connection',
                        'Broader network and visibility',
                        'Better team collaboration',
                        'Natural leadership presence'
                    ],
                    costs: [
                        'Less time for solitude and reflection',
                        'Potential energy drain from over-socializing',
                        'Shallow connections vs depth',
                        'Less focus time'
                    ]
                },
                decrease: {
                    gains: [
                        'More energy for deep work',
                        'Deeper, quality relationships',
                        'Better self-knowledge through reflection',
                        'Less social exhaustion'
                    ],
                    costs: [
                        'Smaller network and less visibility',
                        'May seem aloof or disconnected',
                        'Harder to build team cohesion',
                        'Limited leadership opportunities'
                    ]
                }
            },
            A: {
                increase: {
                    gains: [
                        'Smoother relationships and less conflict',
                        'Better team cohesion',
                        'Easier diplomacy and negotiation',
                        'More likability and trust'
                    ],
                    costs: [
                        'Weaker boundaries and self-advocacy',
                        'Potential resentment from over-accommodating',
                        'May be taken advantage of',
                        'Less authentic self-expression'
                    ]
                },
                decrease: {
                    gains: [
                        'Stronger boundaries and self-advocacy',
                        'More authentic self-expression',
                        'Less resentment and burnout',
                        'Clearer needs communication'
                    ],
                    costs: [
                        'More interpersonal conflict',
                        'May seem difficult or demanding',
                        'Harder to build quick rapport',
                        'Less team harmony'
                    ]
                }
            },
            N: {
                increase: {
                    gains: [
                        'Greater emotional awareness',
                        'Deeper empathy and connection',
                        'More attunement to subtle cues',
                        'Richer emotional life'
                    ],
                    costs: [
                        'More stress and anxiety',
                        'Potential emotional overwhelm',
                        'Less resilience to setbacks',
                        'More worry and rumination'
                    ]
                },
                decrease: {
                    gains: [
                        'Better stress resilience',
                        'More emotional stability',
                        'Less anxiety and worry',
                        'Calmer under pressure'
                    ],
                    costs: [
                        'Less emotional sensitivity',
                        'May miss important emotional cues',
                        'Harder to empathize deeply',
                        'Risk of emotional detachment'
                    ]
                }
            }
        };

        return tradeoffs[dimension]?.[direction] || {};
    }

    /**
     * Get specific practice scenarios for dimension shift
     */
    getScenarios(dimension, direction, count = 6) {
        const scenarios = this.practiceScenarios[dimension]?.[direction] || [];
        return scenarios.slice(0, count);
    }

    /**
     * Generate week-by-week progression plan
     */
    generateWeeklyPlan(dimension, currentValue, targetValue) {
        const distance = Math.abs(targetValue - currentValue);
        const weeks = Math.ceil(distance / 5);
        const direction = targetValue > currentValue ? 'increase' : 'decrease';

        const plan = [];
        let progressValue = currentValue;

        for (let week = 1; week <= weeks; week++) {
            const weekProgress = Math.min(5, targetValue - progressValue);
            const nextValue = progressValue + (direction === 'increase' ? weekProgress : -weekProgress);

            plan.push({
                week,
                focus: this.getWeekFocus(week, weeks),
                startingPosition: progressValue,
                targetPosition: nextValue,
                practiceGoal: this.getWeekPracticeGoal(dimension, direction, week),
                scenarios: this.getScenarios(dimension, direction, 3).slice((week-1) * 3, week * 3),
                reflection: this.getWeekReflection(dimension, direction, week),
                successMetric: `Choose ${direction === 'increase' ? 'more' : 'fewer'} ${this.getDimensionName(dimension)} patterns in 3-4 situations`
            });

            progressValue = nextValue;
        }

        return plan;
    }

    getWeekFocus(week, totalWeeks) {
        if (week === 1) return 'Awareness & Observation';
        if (week === 2) return 'Small Experiments';
        if (week === totalWeeks) return 'Integration & Reflection';
        if (week <= totalWeeks / 2) return 'Building Frequency';
        return 'Deepening Practice';
    }

    getWeekPracticeGoal(dimension, direction, week) {
        const goals = {
            1: 'Notice your automatic pattern 3 times without changing it',
            2: 'Try the new pattern once in a low-stakes situation',
            3: 'Practice the new pattern 3 times this week',
            4: 'Make the new pattern your default in familiar situations'
        };
        return goals[Math.min(week, 4)];
    }

    getWeekReflection(dimension, direction, week) {
        return [
            'What situations triggered your old pattern?',
            'When you tried the new pattern, what happened?',
            'How did it feel different from your usual approach?',
            'What made it easier or harder to choose the new pattern?',
            'Are you noticing any changes in how others respond to you?'
        ];
    }

    /**
     * Generate check-in schedule
     */
    generateCheckInSchedule(distance) {
        const checkIns = [];
        const weeks = Math.ceil(distance / 5);

        for (let week = 1; week <= weeks; week++) {
            checkIns.push({
                week,
                type: week === 1 ? 'baseline' : week === weeks ? 'completion' : 'progress',
                questions: this.getCheckInQuestions(week, weeks),
                estimatedDuration: '2-3 minutes'
            });
        }

        return checkIns;
    }

    getCheckInQuestions(week, totalWeeks) {
        if (week === 1) {
            return [
                'What motivated you to adjust this pattern?',
                'What specific situations do you want to handle differently?',
                'How will you know the adjustment is working?'
            ];
        }

        if (week === totalWeeks) {
            return [
                'Did you reach your target position? How does it feel?',
                'What changes have you noticed in your behavior?',
                'Do you want to continue adjusting, or maintain this position?',
                'What made this shift easier or harder than expected?'
            ];
        }

        return [
            'How many times did you practice the new pattern this week?',
            'What situation was easiest to change? Hardest?',
            'Are you noticing any shifts in how it feels?',
            'Do you want to continue, pause, or adjust your target?'
        ];
    }

    /**
     * Get success indicators for this adjustment
     */
    getSuccessIndicators(dimension, direction) {
        const indicators = {
            O: {
                increase: [
                    'You feel curious about new ideas rather than skeptical',
                    'You\'re trying new approaches without anxiety',
                    'Others describe you as innovative or creative',
                    'Routine feels less comfortable, exploration more natural'
                ],
                decrease: [
                    'You feel calmer with established routines',
                    'You prefer proven methods over experiments',
                    'Others describe you as reliable and practical',
                    'Novelty feels less necessary, familiarity more satisfying'
                ]
            },
            C: {
                increase: [
                    'You\'re meeting deadlines with less stress',
                    'Planning ahead feels natural, not forced',
                    'Others rely on you more for follow-through',
                    'You feel more in control of projects'
                ],
                decrease: [
                    'You adapt easily to changing plans',
                    'Spontaneity feels freeing, not chaotic',
                    'Others describe you as flexible and easygoing',
                    'You feel less stressed by unexpected changes'
                ]
            },
            E: {
                increase: [
                    'Social interaction energizes rather than drains you',
                    'You speak up more naturally in groups',
                    'Others seek you out for collaboration',
                    'You feel connected rather than isolated'
                ],
                decrease: [
                    'Solitude feels restorative, not lonely',
                    'You have energy for focused work after social time',
                    'Your relationships feel deeper, not broader',
                    'You feel calm rather than overwhelmed by socializing'
                ]
            },
            A: {
                increase: [
                    'Conflicts feel less frequent and intense',
                    'Others describe you as diplomatic and collaborative',
                    'You feel comfortable prioritizing group harmony',
                    'Relationships feel smoother and easier'
                ],
                decrease: [
                    'You express disagreement without guilt',
                    'Boundaries feel clear and comfortable',
                    'Others respect your needs more',
                    'You feel less resentment from over-accommodating'
                ]
            },
            N: {
                increase: [
                    'You notice emotional nuances you missed before',
                    'Empathy and connection feel deeper',
                    'You\'re more attuned to others\' feelings',
                    'Emotional experiences feel richer'
                ],
                decrease: [
                    'Stress affects you less intensely',
                    'You recover faster from setbacks',
                    'Worry and rumination decrease',
                    'You feel calmer and more stable overall'
                ]
            }
        };

        return indicators[dimension]?.[direction] || [];
    }

    /**
     * Get warning signs of problems with adjustment
     */
    getWarningSigns(dimension, direction) {
        return {
            tooFast: [
                'Feeling exhausted or overwhelmed by the changes',
                'Others commenting that you seem different in a concerning way',
                'The new patterns feel forced or inauthentic',
                'You\'re experiencing more stress, not less'
            ],
            wrongDirection: [
                'Initial relief quickly turns to new problems',
                'The trade-offs feel worse than expected',
                'You\'re missing your old patterns',
                'Your goals have changed and this adjustment no longer serves them'
            ],
            needsSupport: [
                'You keep reverting to old patterns under stress',
                'The adjustment triggers unexpected emotional reactions',
                'Relationships are suffering in ways you didn\'t anticipate',
                'You need more guidance than self-directed practice provides'
            ]
        };
    }

    /**
     * Calculate overall timeline when adjusting multiple dimensions
     */
    calculateOverallTimeline(adjustmentPlans) {
        const activePlans = Object.values(adjustmentPlans).filter(p => p.status !== 'at_target');

        if (activePlans.length === 0) return null;

        const longestPlan = Math.max(...activePlans.map(p => p.timeline?.estimatedWeeks || 0));

        return {
            totalWeeks: longestPlan,
            parallelAdjustments: activePlans.length,
            recommendation: activePlans.length > 2
                ? 'Consider focusing on 1-2 patterns at a time for best results'
                : 'You can work on these patterns simultaneously'
        };
    }

    /**
     * Prioritize which adjustments to work on first
     */
    prioritizePlans(adjustmentPlans) {
        const activePlans = Object.entries(adjustmentPlans)
            .filter(([_, plan]) => plan.status !== 'at_target')
            .map(([dimension, plan]) => ({
                dimension,
                ...plan,
                urgency: this.calculateUrgency(dimension, plan)
            }))
            .sort((a, b) => b.urgency - a.urgency);

        return {
            recommended: activePlans[0]?.dimension,
            order: activePlans.map(p => p.dimension),
            reasoning: this.getPrioritizationReasoning(activePlans)
        };
    }

    calculateUrgency(dimension, plan) {
        // Larger distances = more urgent
        const distanceScore = plan.distance;

        // Some dimensions have higher impact
        const impactWeights = { N: 1.5, A: 1.3, C: 1.2, E: 1.0, O: 1.0 };
        const impactScore = impactWeights[dimension] || 1.0;

        return distanceScore * impactScore;
    }

    getPrioritizationReasoning(plans) {
        if (plans.length === 0) return '';
        if (plans.length === 1) return `Focus on ${this.getDimensionName(plans[0].dimension)} adjustment`;

        return `Start with ${this.getDimensionName(plans[0].dimension)} (largest shift needed), then ${this.getDimensionName(plans[1].dimension)}`;
    }

    /**
     * Helper: Get full dimension name
     */
    getDimensionName(dimension) {
        const names = {
            O: 'Openness/Exploration',
            C: 'Conscientiousness/Structure',
            E: 'Extraversion/Social Energy',
            A: 'Agreeableness/Harmony',
            N: 'Neuroticism/Emotional Sensitivity'
        };
        return names[dimension] || dimension;
    }

    /**
     * Initialize pattern library (what patterns appear at what levels)
     */
    initializePatternLibrary() {
        return {
            O: [
                {
                    name: 'Routine Comfort',
                    rangeStart: 0,
                    rangeEnd: 35,
                    description: 'Prefer familiar approaches and established methods',
                    examples: ['Stick to known restaurants', 'Follow proven procedures', 'Prefer practical over abstract']
                },
                {
                    name: 'Selective Exploration',
                    rangeStart: 35,
                    rangeEnd: 65,
                    description: 'Balance between familiar and novel',
                    examples: ['Try new things occasionally', 'Mix routine with variety', 'Open to ideas that seem practical']
                },
                {
                    name: 'Active Curiosity',
                    rangeStart: 65,
                    rangeEnd: 100,
                    description: 'Seek novelty, diverse perspectives, and creative approaches',
                    examples: ['Explore new ideas eagerly', 'Embrace unconventional thinking', 'Prioritize learning and growth']
                }
            ],
            C: [
                {
                    name: 'Spontaneous Flow',
                    rangeStart: 0,
                    rangeEnd: 35,
                    description: 'Prefer flexibility and adaptability over structure',
                    examples: ['Wing it rather than plan', 'Adapt in the moment', 'Work in bursts of inspiration']
                },
                {
                    name: 'Flexible Structure',
                    rangeStart: 35,
                    rangeEnd: 65,
                    description: 'Balance between planning and spontaneity',
                    examples: ['Plan when needed', 'Some organization habits', 'Mix structure with flexibility']
                },
                {
                    name: 'Systematic Planning',
                    rangeStart: 65,
                    rangeEnd: 100,
                    description: 'Prefer organization, planning, and follow-through',
                    examples: ['Detailed planning', 'Consistent routines', 'Reliable follow-through']
                }
            ],
            E: [
                {
                    name: 'Reflective Solitude',
                    rangeStart: 0,
                    rangeEnd: 35,
                    description: 'Energized by solitude and depth over breadth',
                    examples: ['Prefer small groups', 'Need alone time', 'Deep over broad connections']
                },
                {
                    name: 'Balanced Social',
                    rangeStart: 35,
                    rangeEnd: 65,
                    description: 'Mix of social engagement and solitude',
                    examples: ['Social when needed', 'Balance group and alone time', 'Adaptable energy']
                },
                {
                    name: 'Social Engagement',
                    rangeStart: 65,
                    rangeEnd: 100,
                    description: 'Energized by interaction and broad connections',
                    examples: ['Seek social activity', 'Energized by groups', 'Build broad networks']
                }
            ],
            A: [
                {
                    name: 'Strong Boundaries',
                    rangeStart: 0,
                    rangeEnd: 35,
                    description: 'Prioritize self-advocacy and clear boundaries',
                    examples: ['Speak up directly', 'Set clear limits', 'Advocate for needs']
                },
                {
                    name: 'Balanced Harmony',
                    rangeStart: 35,
                    rangeEnd: 65,
                    description: 'Balance between harmony and boundaries',
                    examples: ['Collaborative but boundaried', 'Diplomatic with needs', 'Fair-minded']
                },
                {
                    name: 'Harmony-Seeking',
                    rangeStart: 65,
                    rangeEnd: 100,
                    description: 'Prioritize group harmony and accommodation',
                    examples: ['Avoid conflict', 'Accommodate others', 'Prioritize relationships']
                }
            ],
            N: [
                {
                    name: 'Emotional Stability',
                    rangeStart: 0,
                    rangeEnd: 35,
                    description: 'Calm, resilient, and stable under stress',
                    examples: ['Stay calm under pressure', 'Quick recovery', 'Even-tempered']
                },
                {
                    name: 'Moderate Sensitivity',
                    rangeStart: 35,
                    rangeEnd: 65,
                    description: 'Balanced emotional responsiveness',
                    examples: ['Some stress reactivity', 'Manageable emotions', 'Context-dependent stability']
                },
                {
                    name: 'High Sensitivity',
                    rangeStart: 65,
                    rangeEnd: 100,
                    description: 'Emotionally attuned, sensitive to stress',
                    examples: ['Feel deeply', 'More worry and anxiety', 'Strong emotional reactions']
                }
            ]
        };
    }

    /**
     * Initialize practice scenarios for each dimension/direction
     */
    initializePracticeScenarios() {
        return {
            A: {
                decrease: [
                    {
                        scenario: 'Someone takes credit for your idea in a team meeting',
                        currentPattern: 'Let it slide to avoid tension (harmony_keeper)',
                        newPattern: 'Speak up: "Actually, that was my suggestion earlier" (boundary_setter)',
                        pointShift: '+2 toward boundary-setting',
                        difficulty: 'Medium',
                        setting: 'Work meetings'
                    },
                    {
                        scenario: 'Friend asks to borrow significant money',
                        currentPattern: 'Lend it despite discomfort (people_pleaser)',
                        newPattern: 'Say honestly: "I\'m not comfortable with that" (boundary_setter)',
                        pointShift: '+3 toward boundary-setting',
                        difficulty: 'Hard',
                        setting: 'Personal relationships'
                    },
                    {
                        scenario: 'Colleague interrupts you repeatedly',
                        currentPattern: 'Let them finish, wait your turn (harmony_keeper)',
                        newPattern: 'Interject: "Let me finish my thought first" (boundary_setter)',
                        pointShift: '+2 toward boundary-setting',
                        difficulty: 'Medium',
                        setting: 'Work conversations'
                    },
                    {
                        scenario: 'Boss adds work to your already full plate',
                        currentPattern: 'Say yes to avoid disappointing them (people_pleaser)',
                        newPattern: 'Explain current workload, discuss priorities (boundary_setter)',
                        pointShift: '+3 toward boundary-setting',
                        difficulty: 'Hard',
                        setting: 'Work requests'
                    },
                    {
                        scenario: 'Group wants to see a movie you don\'t like',
                        currentPattern: 'Go along to keep harmony (social_conformer)',
                        newPattern: 'Suggest an alternative or opt out honestly (authentic_boundary_setter)',
                        pointShift: '+2 toward boundary-setting',
                        difficulty: 'Easy',
                        setting: 'Social plans'
                    },
                    {
                        scenario: 'Someone makes a decision you disagree with',
                        currentPattern: 'Stay quiet to avoid conflict (conflict_avoider)',
                        newPattern: 'Share your perspective: "I see it differently because..." (thoughtful_dissenter)',
                        pointShift: '+2 toward boundary-setting',
                        difficulty: 'Medium',
                        setting: 'Group decisions'
                    }
                ],
                increase: [
                    {
                        scenario: 'Teammate makes a mistake that affects the project',
                        currentPattern: 'Call it out directly (direct_challenger)',
                        newPattern: 'Ask: "What happened there? How can we fix it together?" (collaborative_problem_solver)',
                        pointShift: '+2 toward harmony-seeking',
                        difficulty: 'Medium',
                        setting: 'Work conflicts'
                    },
                    {
                        scenario: 'Someone shares an idea you think is flawed',
                        currentPattern: 'Point out the problems immediately (critical_thinker)',
                        newPattern: 'Find the merit first: "I like X aspect, have we considered Y?" (diplomatic_challenger)',
                        pointShift: '+2 toward harmony-seeking',
                        difficulty: 'Medium',
                        setting: 'Brainstorming'
                    },
                    {
                        scenario: 'Friend cancels plans last minute',
                        currentPattern: 'Express frustration and disappointment (boundary_enforcer)',
                        newPattern: 'Respond: "No worries, hope everything\'s okay!" (supportive_friend)',
                        pointShift: '+2 toward harmony-seeking',
                        difficulty: 'Easy',
                        setting: 'Personal relationships'
                    }
                ]
            },
            C: {
                increase: [
                    {
                        scenario: 'Sunday evening before a busy Monday',
                        currentPattern: 'Wing it, deal with Monday when it comes (spontaneous_adapter)',
                        newPattern: 'Spend 15 minutes planning the week (careful_planner)',
                        pointShift: '+2 toward structure',
                        difficulty: 'Easy',
                        setting: 'Weekly planning'
                    },
                    {
                        scenario: 'Project deadline in 2 weeks',
                        currentPattern: 'Wait for deadline pressure (procrastinator)',
                        newPattern: 'Break into tasks, start today (systematic_planner)',
                        pointShift: '+3 toward structure',
                        difficulty: 'Medium',
                        setting: 'Project management'
                    },
                    {
                        scenario: 'Dishes pile up in the sink',
                        currentPattern: 'Do them when they\'re really necessary (spontaneous_cleaner)',
                        newPattern: 'Wash them after each meal (routine_creator)',
                        pointShift: '+1 toward structure',
                        difficulty: 'Easy',
                        setting: 'Daily habits'
                    }
                ],
                decrease: [
                    {
                        scenario: 'Plans change unexpectedly',
                        currentPattern: 'Feel frustrated by disruption (rigid_planner)',
                        newPattern: 'Adapt: "Okay, what\'s the new plan?" (flexible_adapter)',
                        pointShift: '+2 toward spontaneity',
                        difficulty: 'Medium',
                        setting: 'Change management'
                    },
                    {
                        scenario: 'Friend suggests spontaneous activity',
                        currentPattern: 'Decline because it wasn\'t planned (routine_bound)',
                        newPattern: 'Say yes to the adventure (spontaneous_embracer)',
                        pointShift: '+2 toward spontaneity',
                        difficulty: 'Easy',
                        setting: 'Social spontaneity'
                    }
                ]
            },
            // Add more dimensions as needed
        };
    }

    /**
     * Initialize position descriptions (what each level means)
     */
    initializePositionDescriptions() {
        return {
            O: {
                20: 'You strongly prefer familiar approaches and proven methods. Routine provides comfort and stability.',
                50: 'You balance routine with occasional exploration. Open to new ideas when they seem practical.',
                80: 'You actively seek novel experiences and diverse perspectives. Curiosity drives your choices.'
            },
            C: {
                20: 'You prefer flexibility and spontaneity. You adapt in the moment rather than following plans.',
                50: 'You use structure when helpful but stay flexible when needed. Balanced approach to planning.',
                80: 'You prioritize organization and systematic planning. You maintain consistent routines and follow through.'
            },
            E: {
                20: 'You recharge through solitude and prefer depth over breadth in relationships.',
                50: 'You balance social engagement with alone time. Adaptable to both group and solo activities.',
                80: 'You draw energy from social interaction and actively seek engagement with others.'
            },
            A: {
                20: 'You prioritize clear boundaries and direct self-advocacy. You address conflicts openly.',
                50: 'You balance harmony-seeking with boundary-setting. Diplomatic but clear about needs.',
                80: 'You prioritize group harmony and others\' needs. You accommodate to maintain relationships.'
            },
            N: {
                20: 'You maintain emotional stability under stress. You recover quickly from setbacks.',
                50: 'You experience moderate emotional reactivity. Stress affects you but remains manageable.',
                80: 'You feel emotions deeply and intensely. You\'re highly sensitive to stress and emotional cues.'
            }
        };
    }
}

export default PatternAdjustmentEngine;
