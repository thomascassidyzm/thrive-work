// DYNAMIC OCEAN ANALYSIS ENGINE
// Progressive Big Five profiling with behavioral predictions and action algorithms
// "You as a verb, not a noun" - dynamic behavioral tendencies, not fixed traits
//
// 🔒 PRIVACY-AWARE: Tracks employerShareable vs personal patterns
// Employee gets: EVERYTHING (full OCEAN profile, personal insights, action plan)
// Employer gets: Aggregated workplace patterns only (k>10 required)

import { k10Enforcement } from '../config/question-privacy-schema.js';

class DynamicOceanAnalysis {
    constructor() {
        // OCEAN dimension mapping for response patterns
        this.oceanMapping = {
            // OPENNESS patterns
            'curious_explorer': { O: +2, C: 0, E: 0, A: 0, N: 0 },
            'perspective_seeker': { O: +2, C: 0, E: 0, A: +1, N: 0 },
            'value_defender': { O: +1, C: 0, E: 0, A: -1, N: 0 },
            'topic_avoider': { O: -2, C: 0, E: 0, A: +1, N: +1 },
            'authentic_sharer': { O: +1, C: 0, E: +1, A: 0, N: 0 },
            
            // CONSCIENTIOUSNESS patterns
            'timing_optimizer': { O: 0, C: +2, E: 0, A: 0, N: 0 },
            'problem_solver': { O: +1, C: +2, E: 0, A: 0, N: 0 },
            'rule_follower': { O: -1, C: +2, E: 0, A: +1, N: 0 },
            'boundary_setter': { O: 0, C: +1, E: 0, A: -1, N: 0 },
            'context_provider': { O: 0, C: +1, E: 0, A: +1, N: 0 },
            'indirect_avoider': { O: 0, C: -1, E: -1, A: +1, N: +1 },
            'silent_withdrawer': { O: 0, C: -1, E: -2, A: -1, N: +1 },
            
            // EXTRAVERSION patterns
            'social_networker': { O: 0, C: 0, E: +2, A: +1, N: -1 },
            'depth_seeker': { O: +1, C: 0, E: -1, A: 0, N: 0 },
            'familiar_anchor': { O: -1, C: 0, E: -1, A: 0, N: +1 },
            'direct_communicator': { O: 0, C: 0, E: +1, A: -1, N: -1 },
            'honest_communicator': { O: 0, C: +1, E: +1, A: 0, N: 0 },
            'immediate_addresser': { O: 0, C: 0, E: +1, A: -1, N: 0 },
            'indirect_communicator': { O: 0, C: 0, E: -1, A: +1, N: +1 },
            
            // AGREEABLENESS patterns
            'harmony_keeper': { O: 0, C: 0, E: 0, A: +2, N: +1 },
            'people_pleaser': { O: 0, C: 0, E: 0, A: +2, N: +1 },
            'accepting_friend': { O: 0, C: 0, E: 0, A: +2, N: 0 },
            'supportive_friend': { O: 0, C: +1, E: 0, A: +2, N: 0 },
            'generous_helper': { O: 0, C: 0, E: 0, A: +2, N: 0 },
            'peacemaker': { O: 0, C: 0, E: +1, A: +2, N: 0 },
            'fairness_advocate': { O: 0, C: +1, E: 0, A: +1, N: 0 },
            'collaborative_problem_solver': { O: +1, C: +1, E: 0, A: +1, N: 0 },
            'authentic_boundary_setter': { O: +1, C: +1, E: +1, A: -1, N: -1 },
            'boundary_enforcer': { O: 0, C: +1, E: 0, A: -1, N: 0 },
            
            // NEUROTICISM patterns
            'conflict_avoider': { O: -1, C: 0, E: -1, A: +1, N: +2 },
            'internal_processor': { O: 0, C: 0, E: -1, A: 0, N: +1 },
            'situation_manager': { O: 0, C: +1, E: 0, A: 0, N: +1 },
            'non_interventionist': { O: 0, C: 0, E: -1, A: 0, N: +1 },
            'boundaried_supporter': { O: 0, C: +1, E: 0, A: 0, N: -1 },
            'resource_connector': { O: +1, C: +1, E: 0, A: +1, N: 0 }
        };
    }

    // Generate progressive OCEAN analysis based on responses
    // 🔒 PRIVACY: This generates INDIVIDUAL results - employee-only access
    analyzeBehavioralTendencies(responses) {
        console.log('🌊 Generating Dynamic OCEAN Analysis...');

        const oceanScores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
        const patternCounts = {};
        const responseCount = responses.length;

        // Separate workplace vs personal patterns for privacy tracking
        const workplacePatterns = {};
        const personalPatterns = {};

        // Calculate raw OCEAN scores from responses
        responses.forEach(response => {
            const patternType = response.selectedOption.pattern_type;
            const isWorkplaceShareable = response.question?.dataAccess?.employerShareable === true;

            if (patternType && this.oceanMapping[patternType]) {
                const mapping = this.oceanMapping[patternType];
                oceanScores.O += mapping.O;
                oceanScores.C += mapping.C;
                oceanScores.E += mapping.E;
                oceanScores.A += mapping.A;
                oceanScores.N += mapping.N;

                patternCounts[patternType] = (patternCounts[patternType] || 0) + 1;

                // Track workplace vs personal patterns separately
                if (isWorkplaceShareable) {
                    workplacePatterns[patternType] = (workplacePatterns[patternType] || 0) + 1;
                } else {
                    personalPatterns[patternType] = (personalPatterns[patternType] || 0) + 1;
                }
            }
        });
        
        // Convert to percentiles (0-100 scale)
        const oceanPercentiles = this.convertToPercentiles(oceanScores, responseCount);
        
        // Calculate confidence based on sample size
        const confidence = this.calculateConfidence(responseCount);
        
        // Generate behavioral predictions
        const behavioralPredictions = this.generateBehavioralPredictions(oceanPercentiles, confidence);
        
        // Generate action algorithms
        const actionAlgorithms = this.generateActionAlgorithms(oceanPercentiles, patternCounts);

        // Analyze home→work influence (employee gets full details)
        const homeWorkInfluence = this.analyzeHomeWorkInfluence(responses);

        return {
            // FULL INDIVIDUAL RESULTS (employee-only)
            oceanPercentiles,
            confidence,
            behavioralPredictions,
            actionAlgorithms,
            rawScores: oceanScores,
            responseCount,
            progressiveInsight: this.generateProgressiveInsight(oceanPercentiles, confidence, responseCount),

            // PRIVACY-SEPARATED PATTERNS
            patternBreakdown: {
                all: patternCounts,              // All patterns (employee sees this)
                workplace: workplacePatterns,    // Workplace-shareable patterns
                personal: personalPatterns       // Personal-only patterns
            },

            // HOME→WORK INFLUENCE (full details for employee)
            homeWorkInfluence,

            // METADATA
            privacyContext: {
                totalResponses: responseCount,
                workplaceResponses: Object.values(workplacePatterns).reduce((a, b) => a + b, 0),
                personalResponses: Object.values(personalPatterns).reduce((a, b) => a + b, 0),
                dataAccess: {
                    employee: 'full',  // Employee sees everything
                    employer: 'aggregated_workplace_only'  // Employer sees aggregated workplace patterns (k>10)
                }
            }
        };
    }

    /**
     * Generate employer-safe aggregated view
     * 🔒 PRIVACY: Only workplace patterns, only if k>10
     */
    generateEmployerAggregatedView(allResponses, teamSize) {
        // Validate k>10 requirement
        const accessCheck = k10Enforcement.validateAccess({ respondentCount: teamSize });
        if (!accessCheck.allowed) {
            return {
                error: 'PRIVACY_THRESHOLD_NOT_MET',
                reason: accessCheck.reason,
                message: accessCheck.employerMessage,
                minimumRequired: k10Enforcement.MINIMUM_RESPONDENTS,
                currentCount: teamSize
            };
        }

        // Filter to only workplace-shareable responses
        const workplaceResponses = allResponses.filter(r =>
            r.question?.dataAccess?.employerShareable === true
        );

        // Calculate aggregated workplace patterns
        const workplacePatternCounts = {};
        workplaceResponses.forEach(response => {
            const pattern = response.selectedOption?.pattern_type;
            if (pattern) {
                workplacePatternCounts[pattern] = (workplacePatternCounts[pattern] || 0) + 1;
            }
        });

        // Convert to percentages
        const patternPercentages = {};
        Object.keys(workplacePatternCounts).forEach(pattern => {
            patternPercentages[pattern] = {
                count: workplacePatternCounts[pattern],
                percentage: Math.round((workplacePatternCounts[pattern] / teamSize) * 100),
                description: this.getPatternDescription(pattern)
            };
        });

        // Generate workplace insights (aggregated only)
        const workplaceInsights = this.generateWorkplaceInsights(patternPercentages, teamSize);

        // Calculate home→work influence percentages (aggregated only)
        const homeWorkInfluenceAggregated = this.aggregateHomeWorkInfluence(allResponses, teamSize);
        workplaceInsights.homeWorkInfluence = homeWorkInfluenceAggregated;

        return {
            respondentCount: teamSize,
            privacyThresholdMet: true,
            minimumRequired: k10Enforcement.MINIMUM_RESPONDENTS,

            // Aggregated workplace patterns (%)
            patternDistribution: patternPercentages,

            // Team-level insights (including home→work %)
            workplaceInsights,

            // What employer CANNOT see
            individualScores: 'PROTECTED',
            personalPatterns: 'PROTECTED',
            specificResponses: 'PROTECTED',

            // Metadata
            timestamp: new Date().toISOString(),
            privacyNote: 'Individual employee data is protected. Only aggregated workplace patterns shown (minimum 10 respondents).'
        };
    }

    /**
     * Get human-readable description of a pattern
     */
    getPatternDescription(patternType) {
        const descriptions = {
            'curious_explorer': 'Seeks new perspectives and approaches',
            'harmony_keeper': 'Prioritizes group harmony',
            'direct_communicator': 'Addresses issues head-on',
            'problem_solver': 'Focuses on finding solutions',
            'boundary_setter': 'Maintains clear boundaries',
            'people_pleaser': 'Prioritizes others\' needs over own',
            'conflict_avoider': 'Prefers to avoid tense situations',
            'social_networker': 'Energized by social interaction',
            'peacemaker': 'Mediates conflicts between others',
            // Add more as needed
        };
        return descriptions[patternType] || patternType.replace(/_/g, ' ');
    }

    /**
     * Generate workplace-specific insights from aggregated data
     */
    generateWorkplaceInsights(patternPercentages, teamSize) {
        const insights = {
            teamDynamics: [],
            culturalIndicators: [],
            riskFactors: [],
            strengths: []
        };

        // Analyze conflict patterns
        const conflictAvoidance = (patternPercentages['conflict_avoider']?.percentage || 0);
        const directCommunication = (patternPercentages['direct_communicator']?.percentage || 0);

        if (conflictAvoidance > 40) {
            insights.riskFactors.push({
                indicator: 'High conflict avoidance',
                percentage: conflictAvoidance,
                implication: 'Team may struggle with addressing tensions directly',
                recommendation: 'Consider psychological safety training and clear conflict resolution processes'
            });
        }

        if (directCommunication > 50) {
            insights.strengths.push({
                indicator: 'Strong direct communication',
                percentage: directCommunication,
                implication: 'Team addresses issues openly',
                benefit: 'Likely to resolve problems efficiently'
            });
        }

        // Analyze harmony vs authenticity balance
        const harmonyKeeping = (patternPercentages['harmony_keeper']?.percentage || 0);
        const boundarySetting = (patternPercentages['boundary_setter']?.percentage || 0);

        if (harmonyKeeping > boundarySetting * 2) {
            insights.culturalIndicators.push({
                indicator: 'Strong harmony preference',
                ratio: `${harmonyKeeping}% harmony vs ${boundarySetting}% boundaries`,
                implication: 'Culture may suppress authentic disagreement',
                consideration: 'May need to explicitly encourage diverse perspectives'
            });
        }

        // Analyze people-pleasing patterns
        const peoplePleasing = (patternPercentages['people_pleaser']?.percentage || 0);
        if (peoplePleasing > 30) {
            insights.riskFactors.push({
                indicator: 'Elevated people-pleasing',
                percentage: peoplePleasing,
                implication: 'Team members may struggle with boundary-setting',
                recommendation: 'Support programs for assertiveness and self-advocacy'
            });
        }

        return insights;
    }
    
    // Convert raw scores to percentiles with realistic distribution
    convertToPercentiles(oceanScores, responseCount) {
        // Base percentile around 50, adjusted by scores
        const percentiles = {};
        
        Object.keys(oceanScores).forEach(dimension => {
            const rawScore = oceanScores[dimension];
            const maxPossibleScore = responseCount * 2; // Max +2 per response
            const minPossibleScore = responseCount * -2; // Max -2 per response
            
            // Normalize to 0-100 scale, centered around 50
            let percentile = 50 + (rawScore / maxPossibleScore) * 40;
            percentile = Math.max(5, Math.min(95, percentile)); // Keep within reasonable bounds
            
            percentiles[dimension] = Math.round(percentile);
        });
        
        return percentiles;
    }
    
    // Calculate confidence based on sample size
    calculateConfidence(responseCount) {
        if (responseCount >= 50) return 0.95;
        if (responseCount >= 30) return 0.85;
        if (responseCount >= 20) return 0.75;
        if (responseCount >= 10) return 0.65;
        if (responseCount >= 5) return 0.45;
        return 0.25;
    }
    
    // Generate behavioral predictions based on OCEAN scores
    generateBehavioralPredictions(oceanPercentiles, confidence) {
        const predictions = {};
        
        // OPENNESS predictions
        if (oceanPercentiles.O >= 70) {
            predictions.openness = {
                tendency: "You're likely to seek out new experiences and embrace different perspectives",
                scenarios: ["Trying unconventional solutions to problems", "Enjoying abstract or philosophical conversations", "Being curious about different cultures and ideas"],
                probability: confidence
            };
        } else if (oceanPercentiles.O <= 30) {
            predictions.openness = {
                tendency: "You tend to prefer familiar approaches and established methods",
                scenarios: ["Sticking with proven strategies", "Preferring concrete over abstract discussions", "Valuing tradition and conventional wisdom"],
                probability: confidence
            };
        }
        
        // CONSCIENTIOUSNESS predictions  
        if (oceanPercentiles.C >= 70) {
            predictions.conscientiousness = {
                tendency: "You're likely to be organized, planned, and goal-oriented in your approach",
                scenarios: ["Creating detailed plans before starting projects", "Following through on commitments", "Maintaining organized systems and schedules"],
                probability: confidence
            };
        } else if (oceanPercentiles.C <= 30) {
            predictions.conscientiousness = {
                tendency: "You tend to be more spontaneous and flexible in your approach",
                scenarios: ["Adapting plans as you go", "Working in bursts of inspiration", "Prioritizing freedom over rigid structure"],
                probability: confidence
            };
        }
        
        // EXTRAVERSION predictions
        if (oceanPercentiles.E >= 70) {
            predictions.extraversion = {
                tendency: "You're likely to be energized by social interaction and external stimulation",
                scenarios: ["Speaking up in group settings", "Initiating conversations with new people", "Thinking out loud to process ideas"],
                probability: confidence
            };
        } else if (oceanPercentiles.E <= 30) {
            predictions.extraversion = {
                tendency: "You tend to prefer quieter environments and process internally",
                scenarios: ["Needing time alone to recharge", "Preferring one-on-one conversations", "Thinking things through before speaking"],
                probability: confidence
            };
        }
        
        // AGREEABLENESS predictions
        if (oceanPercentiles.A >= 70) {
            predictions.agreeableness = {
                tendency: "You're likely to prioritize harmony and others' needs in relationships",
                scenarios: ["Seeking win-win solutions in conflicts", "Being sensitive to others' emotions", "Putting group needs before personal preferences"],
                probability: confidence
            };
        } else if (oceanPercentiles.A <= 30) {
            predictions.agreeableness = {
                tendency: "You tend to be direct and prioritize your own needs and opinions",
                scenarios: ["Speaking your mind even when it might create tension", "Advocating for your interests", "Challenging ideas you disagree with"],
                probability: confidence
            };
        }
        
        // NEUROTICISM predictions
        if (oceanPercentiles.N >= 70) {
            predictions.neuroticism = {
                tendency: "You're likely to be sensitive to stress and emotional fluctuations",
                scenarios: ["Feeling deeply affected by relationship conflicts", "Needing extra time to process challenging situations", "Being highly attuned to environmental stressors"],
                probability: confidence
            };
        } else if (oceanPercentiles.N <= 30) {
            predictions.neuroticism = {
                tendency: "You tend to remain calm and stable under pressure",
                scenarios: ["Staying composed during conflicts", "Bouncing back quickly from setbacks", "Maintaining perspective during stressful times"],
                probability: confidence
            };
        }
        
        return predictions;
    }
    
    // Generate action algorithms based on OCEAN profile
    generateActionAlgorithms(oceanPercentiles, patternCounts) {
        const algorithms = {};
        
        // Decision-making algorithm
        algorithms.decisionMaking = this.generateDecisionAlgorithm(oceanPercentiles);
        
        // Relationship algorithm  
        algorithms.relationships = this.generateRelationshipAlgorithm(oceanPercentiles);
        
        // Stress management algorithm
        algorithms.stressManagement = this.generateStressAlgorithm(oceanPercentiles);
        
        // Growth algorithm
        algorithms.growth = this.generateGrowthAlgorithm(oceanPercentiles, patternCounts);
        
        return algorithms;
    }
    
    generateDecisionAlgorithm(ocean) {
        let algorithm = "When making decisions, you might: ";
        
        if (ocean.C >= 60) algorithm += "1) Gather comprehensive information, ";
        else algorithm += "1) Trust your intuition, ";
        
        if (ocean.O >= 60) algorithm += "2) Consider unconventional options, ";
        else algorithm += "2) Evaluate proven approaches, ";
        
        if (ocean.E >= 60) algorithm += "3) Discuss with others, ";
        else algorithm += "3) Reflect internally, ";
        
        if (ocean.A >= 60) algorithm += "4) Consider impact on others, ";
        else algorithm += "4) Prioritize your needs, ";
        
        if (ocean.N >= 60) algorithm += "5) Allow extra time for processing.";
        else algorithm += "5) Move forward confidently.";
        
        return algorithm;
    }
    
    generateRelationshipAlgorithm(ocean) {
        let algorithm = "In relationships, you're likely to: ";
        
        if (ocean.A >= 60) algorithm += "prioritize harmony and others' needs, ";
        else algorithm += "maintain clear boundaries and express your needs, ";
        
        if (ocean.E >= 60) algorithm += "share thoughts and feelings openly, ";
        else algorithm += "process internally before sharing, ";
        
        if (ocean.N >= 60) algorithm += "be sensitive to tension and conflicts, ";
        else algorithm += "remain stable during relationship challenges, ";
        
        if (ocean.O >= 60) algorithm += "appreciate deep, meaningful conversations.";
        else algorithm += "value consistency and reliability.";
        
        return algorithm;
    }
    
    generateStressAlgorithm(ocean) {
        let algorithm = "When stressed, effective strategies for you: ";
        
        if (ocean.N >= 60) {
            algorithm += "1) Acknowledge your sensitivity as valid, 2) Create calm environments, 3) Process emotions before problem-solving, ";
        } else {
            algorithm += "1) Take direct action, 2) Maintain perspective, 3) Focus on solutions, ";
        }
        
        if (ocean.E >= 60) algorithm += "4) Talk it through with trusted people.";
        else algorithm += "4) Find quiet time for reflection.";
        
        return algorithm;
    }
    
    generateGrowthAlgorithm(ocean, patterns) {
        const dominantPatterns = Object.keys(patterns).sort((a, b) => patterns[b] - patterns[a]).slice(0, 3);

        let algorithm = "For personal growth, consider: ";

        // Growth suggestions based on OCEAN profile
        if (ocean.O < 40) algorithm += "Experimenting with new approaches, ";
        if (ocean.C < 40) algorithm += "Building small organizational habits, ";
        if (ocean.E < 40) algorithm += "Gradually expanding social comfort zone, ";
        if (ocean.A < 40) algorithm += "Practicing collaborative approaches, ";
        if (ocean.N > 60) algorithm += "Developing stress resilience strategies, ";

        algorithm += "while honoring your natural strengths.";

        return algorithm;
    }

    /**
     * Analyze home→work influence from responses
     * 🔒 PRIVACY: Employee sees full details, employer sees % only (aggregated)
     */
    analyzeHomeWorkInfluence(responses) {
        const homeWorkResponses = responses.filter(r =>
            r.question?.category === 'home_work_influence' &&
            r.selectedOption?.severity !== undefined &&
            r.selectedOption?.severity !== null
        );

        if (homeWorkResponses.length === 0) {
            return {};
        }

        const influence = {};
        const categories = {
            childcare: { key: 'childcare', label: 'Childcare Unpredictability' },
            eldercare: { key: 'eldercare', label: 'Eldercare Responsibilities' },
            financial: { key: 'financial', label: 'Financial Stress' },
            relationships: { key: 'relationships', label: 'Relationship Stress' },
            housing: { key: 'housing', label: 'Housing Concerns' },
            commute: { key: 'commute', label: 'Commute Burden' }
        };

        homeWorkResponses.forEach(response => {
            const severity = response.selectedOption.severity;
            const questionId = response.question.id;

            // Map question IDs to categories
            let category = null;
            if (questionId === 'HW001') category = 'childcare';
            else if (questionId === 'HW002') category = 'eldercare';
            else if (questionId === 'HW003') category = 'financial';
            else if (questionId === 'HW004') category = 'relationships';
            else if (questionId === 'HW005') category = 'housing';
            else if (questionId === 'HW006') category = 'commute';

            if (category && severity > 0) {
                influence[category] = {
                    severity,
                    impact: this.getHomeWorkImpactMessage(category, severity),
                    actionPlan: this.getHomeWorkActionPlan(category, severity)
                };
            }
        });

        return influence;
    }

    getHomeWorkImpactMessage(category, severity) {
        const messages = {
            childcare: [
                'Childcare is stable and supportive',
                'Childcare unpredictability is beginning to affect your work preparation',
                'Childcare challenges are regularly affecting your work preparation',
                'Childcare unpredictability is significantly affecting your work preparation'
            ],
            eldercare: [
                'Eldercare responsibilities are manageable',
                'Eldercare responsibilities are occasionally affecting your work energy',
                'Eldercare responsibilities are regularly draining your work energy',
                'Eldercare responsibilities are significantly draining your work energy'
            ],
            financial: [
                'Financial situation is stable',
                'Financial stress is occasionally affecting your focus at work',
                'Financial stress is frequently affecting your focus at work',
                'Financial stress is constantly affecting your focus at work'
            ],
            relationships: [
                'Personal relationships are supportive',
                'Relationship stress is occasionally affecting your work performance',
                'Relationship stress is frequently affecting your work performance',
                'Relationship stress is significantly affecting your work performance'
            ],
            housing: [
                'Housing situation is stable',
                'Housing concerns are beginning to affect your ability to show up fully',
                'Housing concerns are regularly affecting your ability to show up fully',
                'Housing concerns are critically affecting your ability to show up fully'
            ],
            commute: [
                'Commute is manageable',
                'Commute is slightly draining your work energy',
                'Commute is significantly draining your work energy',
                'Commute is severely draining your work energy'
            ]
        };

        return messages[category]?.[severity] || 'Impact detected';
    }

    getHomeWorkActionPlan(category, severity) {
        const plans = {
            childcare: [
                'Create backup childcare plan for emergencies',
                'Discuss flexible work arrangements with manager',
                'Build buffer time into morning routine',
                'Connect with other working parents for support network'
            ],
            eldercare: [
                'Research eldercare resources and support services',
                'Discuss flexible schedule needs with manager',
                'Set boundaries around emergency availability',
                'Join eldercare support group for coping strategies'
            ],
            financial: [
                'Connect with financial counseling resources',
                'Create budget visibility system',
                'Discuss pay timing or advance options with HR',
                'Separate work hours from financial planning time'
            ],
            relationships: [
                'Consider couples counseling or relationship support',
                'Create boundaries between home stress and work time',
                'Practice emotional regulation techniques',
                'Connect with Employee Assistance Program (EAP) resources'
            ],
            housing: [
                'Connect with housing assistance programs',
                'Discuss pay advance or housing subsidy options',
                'Research emergency housing resources',
                'Create housing stability plan with counselor'
            ],
            commute: [
                'Explore remote work options for some days',
                'Research alternative commute routes',
                'Create energizing commute routine (podcast, audiobook, meditation)',
                'Discuss flexible start times to avoid peak traffic'
            ]
        };

        return plans[category] || [];
    }

    /**
     * Aggregate home→work influence for employer view
     * 🔒 PRIVACY: Employer sees ONLY percentages, NOT individual details
     */
    aggregateHomeWorkInfluence(allResponses, teamSize) {
        const homeWorkResponses = allResponses.filter(r =>
            r.question?.category === 'home_work_influence' &&
            r.question?.dataAccess?.aggregationOnly === true &&
            r.selectedOption?.severity !== undefined &&
            r.selectedOption?.severity !== null
        );

        if (homeWorkResponses.length === 0) {
            return {};
        }

        // Count affected individuals by category
        const categoryCounts = {};
        const categoryLabels = {
            'HW001': 'childcare',
            'HW002': 'eldercare',
            'HW003': 'financial',
            'HW004': 'relationships',
            'HW005': 'housing',
            'HW006': 'commute'
        };

        homeWorkResponses.forEach(response => {
            const questionId = response.question.id;
            const severity = response.selectedOption.severity;
            const category = categoryLabels[questionId];

            if (category && severity > 0) {
                if (!categoryCounts[category]) {
                    categoryCounts[category] = {
                        affectedCount: 0,
                        totalResponses: 0
                    };
                }
                categoryCounts[category].affectedCount++;
            }

            if (category) {
                if (!categoryCounts[category]) {
                    categoryCounts[category] = {
                        affectedCount: 0,
                        totalResponses: 0
                    };
                }
                categoryCounts[category].totalResponses++;
            }
        });

        // Convert to percentages with recommendations
        const aggregated = {};
        Object.keys(categoryCounts).forEach(category => {
            const data = categoryCounts[category];
            const percentage = Math.round((data.affectedCount / teamSize) * 100);

            if (percentage > 0) {
                aggregated[category] = {
                    percentage,
                    affectedCount: data.affectedCount,
                    totalCount: teamSize,
                    insight: `${percentage}% of team (${data.affectedCount}/${teamSize}) report ${category} affects work`,
                    recommendation: this.getEmployerRecommendation(category, percentage)
                };
            }
        });

        return aggregated;
    }

    getEmployerRecommendation(category, percentage) {
        const recommendations = {
            childcare: percentage > 25 ? 'Consider childcare benefits or flexible scheduling policies' : 'Monitor childcare needs',
            eldercare: percentage > 25 ? 'Consider eldercare support benefits or flexible scheduling' : 'Monitor eldercare support needs',
            financial: percentage > 30 ? 'Consider financial wellness programs or pay structure review' : 'Ensure financial resources are communicated',
            relationships: percentage > 20 ? 'Ensure EAP benefits are well-communicated and accessible' : 'Maintain EAP visibility',
            housing: percentage > 15 ? 'Consider housing assistance benefits or pay structure adjustments' : 'Monitor housing stability',
            commute: percentage > 30 ? 'Consider remote work flexibility or transit subsidies' : 'Monitor commute impact'
        };

        return recommendations[category] || 'Monitor and support as needed';
    }

    // Generate progressive insight summary
    generateProgressiveInsight(oceanPercentiles, confidence, responseCount) {
        const confidencePercent = Math.round(confidence * 100);
        
        let insight = `Based on ${responseCount} behavioral scenarios (${confidencePercent}% confidence), your dynamic OCEAN profile suggests:\\n\\n`;
        
        const dimensionLabels = {
            O: 'Openness',
            C: 'Conscientiousness', 
            E: 'Extraversion',
            A: 'Agreeableness',
            N: 'Emotional Sensitivity'
        };
        
        Object.keys(oceanPercentiles).forEach(dim => {
            const score = oceanPercentiles[dim];
            const label = dimensionLabels[dim];
            
            let tendency = '';
            if (score >= 70) tendency = 'Higher';
            else if (score >= 55) tendency = 'Moderately High';
            else if (score >= 45) tendency = 'Moderate';
            else if (score >= 30) tendency = 'Moderately Low';
            else tendency = 'Lower';
            
            insight += `• ${label}: ${tendency} (${score}th percentile)\\n`;
        });
        
        insight += `\\nThis suggests behavioral tendencies, not fixed traits. As we gather more data, we'll refine these insights and provide increasingly specific strategies for effectiveness in areas that matter to you.`;
        
        if (responseCount < 30) {
            insight += `\\n\\nWith more responses, we can provide percentile-level precision and highly specific action algorithms.`;
        }
        
        return insight;
    }
}

export { DynamicOceanAnalysis };