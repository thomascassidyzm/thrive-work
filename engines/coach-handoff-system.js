// COACH HANDOFF SYSTEM
// Intelligently transfers assessment data to AI coaches for personalized planning
// Creates context-rich coaching sessions with behavioral insights

class CoachHandoffSystem {
    constructor() {
        this.coaches = {
            tom: {
                name: 'Tom',
                specialties: ['relationships', 'personal_mastery', 'life_purpose', 'harmony_patterns'],
                personality: 'warm, direct, insightfully challenging',
                approach: 'Script Framework, powerful questions, gap between values and behavior'
            },
            liz: {
                name: 'Liz',
                specialties: ['identity_work', 'self_worth', 'emotional_fulfillment', 'feeling_states'],
                personality: 'empowering, nurturing, deeply intuitive',
                approach: 'Super Hero Coaching, feelings-first methodology, inherent worth recognition'
            },
            alastair: {
                name: 'Alastair',
                specialties: ['addictions', 'compulsive_patterns', 'ocd', 'authority_patterns'],
                personality: 'gentle, understanding, scientifically grounded',
                approach: 'Hypnotherapy insights, pattern interruption, unconscious reprogramming'
            },
            kainne: {
                name: 'Kainne',
                specialties: ['business', 'productivity', 'adhd', 'conflict_patterns'],
                personality: 'energetic, practical, solution-focused',
                approach: 'Business psychology, execution frameworks, ADHD-friendly strategies'
            },
            edward: {
                name: 'Edward',
                specialties: ['psychological_foundations', 'self_acceptance', 'limiting_beliefs', 'perception_patterns'],
                personality: 'warm, patient, deeply compassionate',
                approach: 'Foundation work, neuroplasticity, 4 domains system, acceptance before change'
            },
            dom: {
                name: 'Dom',
                specialties: ['performance', 'discipline', 'strategy', 'team_dynamics', 'mental_toughness'],
                personality: 'direct, energetic, performance-focused',
                approach: 'Elite sports psychology, tactical analysis, systematic improvement, championship mindset'
            }
        };
    }

    // Prepare assessment data for coach handoff
    prepareCoachingContext(responses, behavioralSignature, patternAnalysis, overallConfidence) {
        console.log('🤝 Preparing coaching context for handoff...');
        
        const context = {
            assessmentSummary: this.generateAssessmentSummary(responses, overallConfidence),
            behavioralInsights: this.extractBehavioralInsights(behavioralSignature, patternAnalysis),
            coachRecommendation: this.recommendOptimalCoach(behavioralSignature, patternAnalysis),
            conversationStarters: this.generateConversationStarters(patternAnalysis),
            explorationAreas: this.identifyExplorationAreas(patternAnalysis),
            confidenceReport: this.generateConfidenceReport(overallConfidence, responses.length)
        };
        
        return context;
    }

    // Generate assessment summary for coach
    generateAssessmentSummary(responses, confidence) {
        const totalQuestions = responses.length;
        const domains = [...new Set(responses.map(r => r.questionData.domain))];
        const categories = [...new Set(responses.map(r => r.questionData.category))];
        
        return {
            totalResponses: totalQuestions,
            confidenceLevel: Math.round(confidence * 100),
            domainsCovered: domains,
            categoriesCovered: categories,
            dataQuality: this.assessDataQuality(responses, confidence),
            readinessLevel: this.determineReadinessLevel(confidence, totalQuestions)
        };
    }

    // Extract key behavioral insights for coaching
    extractBehavioralInsights(behavioralSignature, patternAnalysis) {
        const insights = {
            dominantPatterns: {},
            crossPatternInsights: [],
            strengthAreas: [],
            growthOpportunities: [],
            potentialChallenges: []
        };

        // Extract dominant patterns per domain
        Object.keys(behavioralSignature).forEach(domain => {
            const domainPatterns = behavioralSignature[domain];
            if (Object.keys(domainPatterns).length > 0) {
                const dominantPattern = Object.keys(domainPatterns).reduce((a, b) => 
                    domainPatterns[a] > domainPatterns[b] ? a : b
                );
                
                insights.dominantPatterns[domain] = {
                    pattern: dominantPattern,
                    frequency: domainPatterns[dominantPattern],
                    description: this.getPatternDescription(dominantPattern)
                };
            }
        });

        // Extract cross-pattern insights
        if (patternAnalysis.crossPatternAnalysis) {
            insights.crossPatternInsights = patternAnalysis.crossPatternAnalysis.combinations || [];
            insights.behavioralSignature = patternAnalysis.crossPatternAnalysis.signature || 'Complex Pattern';
        }

        return insights;
    }

    // Recommend optimal coach based on patterns
    recommendOptimalCoach(behavioralSignature, patternAnalysis) {
        console.log('🎯 Analyzing patterns to recommend optimal coach...');
        
        const patternTypes = this.extractAllPatternTypes(behavioralSignature);
        const scores = {};
        
        // Score each coach based on their specialties
        Object.keys(this.coaches).forEach(coachId => {
            const coach = this.coaches[coachId];
            let score = 0;
            
            // Check pattern alignment with coach specialties
            patternTypes.forEach(pattern => {
                if (this.isPatternRelevantToCoach(pattern, coach)) {
                    score += 1;
                }
            });
            
            // Bonus points for specific pattern combinations
            score += this.calculatePatternCombinationBonus(patternTypes, coach);
            
            scores[coachId] = score;
        });
        
        // Find highest scoring coach
        const recommendedCoachId = Object.keys(scores).reduce((a, b) => 
            scores[a] > scores[b] ? a : b
        );
        
        const recommendation = {
            primaryCoach: recommendedCoachId,
            coachInfo: this.coaches[recommendedCoachId],
            reasoning: this.generateRecommendationReasoning(recommendedCoachId, patternTypes),
            alternativeCoaches: this.getAlternativeCoaches(scores, recommendedCoachId)
        };
        
        console.log(`🎯 Recommended coach: ${recommendation.coachInfo.name}`);
        return recommendation;
    }

    // Generate conversation starters for the coaching session
    generateConversationStarters(patternAnalysis) {
        const starters = [];
        
        if (patternAnalysis.patternInsights) {
            Object.values(patternAnalysis.patternInsights).forEach(insight => {
                if (insight.dominantPattern && insight.confidence > 0.5) {
                    const starter = this.createPatternConversationStarter(insight);
                    if (starter) starters.push(starter);
                }
            });
        }
        
        // Add general starters if we don't have enough pattern-specific ones
        if (starters.length < 3) {
            starters.push(
                "What stood out to you most while taking the assessment?",
                "Which of your responses surprised you?",
                "What patterns are you hoping to understand better?"
            );
        }
        
        return starters.slice(0, 5); // Return top 5 starters
    }

    // Identify areas for deeper exploration
    identifyExplorationAreas(patternAnalysis) {
        const areas = [];
        
        // Areas with medium confidence (need more exploration)
        if (patternAnalysis.patternInsights) {
            Object.values(patternAnalysis.patternInsights).forEach(insight => {
                if (insight.confidence >= 0.3 && insight.confidence < 0.7) {
                    areas.push({
                        domain: insight.domain,
                        pattern: insight.dominantPattern,
                        confidence: insight.confidence,
                        reason: 'Medium confidence - worth exploring deeper',
                        explorationQuestions: this.generateExplorationQuestions(insight.dominantPattern)
                    });
                }
            });
        }
        
        return areas;
    }

    // Generate confidence report for coaching context
    generateConfidenceReport(confidence, questionCount) {
        return {
            overallConfidence: Math.round(confidence * 100),
            confidenceLevel: this.getConfidenceLevel(confidence),
            sampleSize: questionCount,
            reliability: this.assessReliability(confidence, questionCount),
            recommendedApproach: this.getRecommendedCoachingApproach(confidence)
        };
    }

    // Create coaching session initiation
    initiateCoachingSession(context, selectedCoach) {
        console.log(`🚀 Initiating coaching session with ${selectedCoach}...`);
        
        const sessionData = {
            coachId: selectedCoach,
            coachInfo: this.coaches[selectedCoach],
            assessmentContext: context,
            sessionType: 'pattern_exploration',
            initialMessage: this.generateInitialCoachMessage(context, selectedCoach),
            suggestedFlow: this.generateSuggestedSessionFlow(context),
            timestamp: Date.now()
        };
        
        return sessionData;
    }

    // Generate initial coach message based on context
    generateInitialCoachMessage(context, coachId) {
        const coach = this.coaches[coachId];
        const confidence = context.confidenceReport.overallConfidence;
        const dominantPatterns = Object.values(context.behavioralInsights.dominantPatterns);
        
        let message = `Hello! I'm ${coach.name}. I've been looking at the patterns we spotted in your responses - `;
        
        if (confidence >= 70) {
            message += `really interesting stuff! We're noticing some clear behavioral tendencies. `;
        } else if (confidence >= 50) {
            message += `some fascinating patterns are emerging. `;
        } else {
            message += `we're starting to see some intriguing patterns. `;
        }
        
        if (dominantPatterns.length > 0) {
            const primaryPattern = dominantPatterns[0];
            const behaviorDescription = this.getBehaviorDescription(primaryPattern.pattern);
            message += `${behaviorDescription} `;
        }
        
        message += `I'm curious - what do you think about these patterns? Do they resonate with your experience?`;
        
        return message;
    }

    // Generate suggested coaching session flow
    generateSuggestedSessionFlow(context) {
        const flow = [];
        const confidence = context.confidenceReport.overallConfidence;
        
        // Opening
        flow.push({
            phase: 'opening',
            focus: 'Build rapport and understand motivation',
            suggestedQuestions: context.conversationStarters.slice(0, 2)
        });
        
        // Pattern exploration
        if (confidence >= 50) {
            flow.push({
                phase: 'pattern_exploration',
                focus: 'Explore identified patterns with specific examples',
                suggestedQuestions: [
                    'Can you think of a recent situation where this pattern showed up?',
                    'How do you feel about this pattern when you notice it?'
                ]
            });
        }
        
        // Gap identification
        flow.push({
            phase: 'gap_identification',
            focus: 'Find gaps between conscious values and automatic behaviors',
            suggestedQuestions: [
                'What would you choose if you could respond differently?',
                'What does your authentic self want in these situations?'
            ]
        });
        
        // Action planning
        if (confidence >= 60) {
            flow.push({
                phase: 'action_planning',
                focus: 'Create specific next steps for growth',
                suggestedQuestions: [
                    'What would be a small first step toward conscious choice?',
                    'How will you notice when this pattern is running?'
                ]
            });
        } else {
            flow.push({
                phase: 'continued_assessment',
                focus: 'Recommend continuing assessment for better insights',
                suggestedQuestions: [
                    'Would you like to continue mapping your patterns?',
                    'What areas feel most important to understand?'
                ]
            });
        }
        
        return flow;
    }

    // Helper methods
    extractAllPatternTypes(behavioralSignature) {
        const patterns = [];
        Object.values(behavioralSignature).forEach(domain => {
            patterns.push(...Object.keys(domain));
        });
        return [...new Set(patterns)];
    }

    isPatternRelevantToCoach(pattern, coach) {
        // Check if pattern falls within coach's specialties
        const patternCategories = {
            'harmony_keeper': ['relationships', 'harmony_patterns', 'self_worth'],
            'authority_deferrer': ['authority_patterns', 'self_worth'],
            'natural_leader': ['business', 'relationships'],
            'conflict_avoider': ['conflict_patterns', 'relationships', 'self_worth'],
            'immediate_confronter': ['conflict_patterns', 'business'],
            'system_challenger': ['authority_patterns', 'business'],
            'boundary_struggler': ['identity_work', 'self_worth'],
            'silent_compensator': ['self_worth', 'identity_work'],
            'people_pleaser': ['identity_work', 'self_worth', 'emotional_fulfillment']
        };
        
        const relevantCategories = patternCategories[pattern] || [];
        return coach.specialties.some(specialty => relevantCategories.includes(specialty));
    }

    calculatePatternCombinationBonus(patterns, coach) {
        let bonus = 0;
        
        // Tom bonus combinations
        if (coach.name === 'Tom') {
            if (patterns.includes('harmony_keeper') && patterns.includes('authority_deferrer')) {
                bonus += 2; // Classic Tom territory
            }
        }
        
        // Liz bonus combinations
        if (coach.name === 'Liz') {
            if (patterns.includes('boundary_struggler') || patterns.includes('silent_compensator') || patterns.includes('people_pleaser')) {
                bonus += 2; // Identity and self-worth work
            }
            if (patterns.includes('harmony_keeper') && patterns.includes('conflict_avoider')) {
                bonus += 1; // Self-worth issues often underlie these patterns
            }
        }
        
        // Alastair bonus combinations
        if (coach.name === 'Alastair') {
            if (patterns.includes('compulsive_pattern') || patterns.includes('automatic_responder')) {
                bonus += 2; // Unconscious pattern work
            }
        }
        
        // Kainne bonus combinations
        if (coach.name === 'Kainne') {
            if (patterns.includes('natural_leader') && patterns.includes('immediate_confronter')) {
                bonus += 2; // Business leadership patterns
            }
        }
        
        return bonus;
    }

    generateRecommendationReasoning(coachId, patterns) {
        const coach = this.coaches[coachId];
        
        switch (coachId) {
            case 'tom':
                return `Tom specializes in relationship patterns and the gaps between values and behavior. Your patterns suggest you'd benefit from his Script Framework approach.`;
            case 'liz':
                return `Liz's Super Hero Coaching focuses on identity work and feeling good about being YOU. Your patterns suggest you'd benefit from her feelings-first approach to transformation.`;
            case 'alastair':
                return `Alastair's expertise in unconscious patterns and compulsive behaviors aligns well with what we're seeing in your responses.`;
            case 'kainne':
                return `Kainne's business psychology and practical approach would be great for your action-oriented patterns.`;
            default:
                return `This coach's specialties align well with your behavioral patterns.`;
        }
    }

    getAlternativeCoaches(scores, primaryCoach) {
        return Object.keys(scores)
            .filter(id => id !== primaryCoach)
            .sort((a, b) => scores[b] - scores[a])
            .slice(0, 2)
            .map(id => ({
                id,
                name: this.coaches[id].name,
                reason: `Alternative option - ${this.coaches[id].specialties.join(', ')}`
            }));
    }

    createPatternConversationStarter(insight) {
        const patternStarters = {
            'harmony_keeper': "We're noticing you often prioritize group harmony - what's that like for you in your daily life?",
            'authority_deferrer': "You seem to naturally respect authority figures - when does that approach serve you well?",
            'natural_leader': "We're seeing some leadership tendencies - what draws you to step up in groups?",
            'conflict_avoider': "You tend to prefer keeping things peaceful - what would change if disagreement felt safer?",
            'immediate_confronter': "You often address issues right when you notice them - how do others usually respond to that directness?"
        };
        
        return patternStarters[insight.dominantPattern];
    }

    generateExplorationQuestions(pattern) {
        const explorationQuestions = {
            'harmony_keeper': [
                'When did you first learn that keeping peace was important?',
                'What happens inside you when there\'s conflict in a group?'
            ],
            'authority_deferrer': [
                'What authority figures shaped your early understanding of respect?',
                'When has deferring to authority not served you well?'
            ],
            'natural_leader': [
                'What kind of leader do you want to be?',
                'When do you step back and let others lead?'
            ]
        };
        
        return explorationQuestions[pattern] || [
            'Can you think of a specific example of this pattern?',
            'What would you choose if you could respond differently?'
        ];
    }

    // Assessment and utility methods
    assessDataQuality(responses, confidence) {
        if (confidence >= 0.7) return 'high';
        if (confidence >= 0.5) return 'medium';
        return 'developing';
    }

    determineReadinessLevel(confidence, questionCount) {
        if (confidence >= 0.8 && questionCount >= 50) return 'implementation_ready';
        if (confidence >= 0.6 && questionCount >= 30) return 'coaching_ready';
        if (confidence >= 0.4 && questionCount >= 20) return 'exploration_ready';
        return 'initial_insights';
    }

    getConfidenceLevel(confidence) {
        if (confidence >= 0.8) return 'high';
        if (confidence >= 0.6) return 'medium-high';
        if (confidence >= 0.4) return 'medium';
        return 'developing';
    }

    assessReliability(confidence, questionCount) {
        const score = (confidence * 0.7) + ((questionCount / 70) * 0.3);
        if (score >= 0.8) return 'very_reliable';
        if (score >= 0.6) return 'reliable';
        if (score >= 0.4) return 'moderately_reliable';
        return 'early_stage';
    }

    getRecommendedCoachingApproach(confidence) {
        if (confidence >= 0.8) return 'implementation_focused';
        if (confidence >= 0.6) return 'pattern_exploration';
        if (confidence >= 0.4) return 'discovery_oriented';
        return 'assessment_continuation';
    }

    getBehaviorDescription(pattern) {
        const descriptions = {
            'harmony_keeper': 'We\'re noticing you often prioritize group harmony, sometimes even over your own needs.',
            'authority_deferrer': 'You seem to naturally respect authority figures and work well within structures.',
            'natural_leader': 'You tend to step up when groups need direction or guidance.',
            'conflict_avoider': 'You usually prefer to keep things peaceful rather than rock the boat.',
            'immediate_confronter': 'You tend to address problems right when you notice them.',
            'private_addresser': 'You prefer working through conflicts one-on-one rather than in groups.'
        };
        
        return descriptions[pattern] || 'We\'re seeing some interesting behavioral tendencies that might be worth exploring.';
    }

    humanizePatternName(pattern) {
        const humanNames = {
            'harmony_keeper': 'Harmony Keeper',
            'authority_deferrer': 'Authority Respecter',
            'natural_leader': 'Natural Leader',
            'conflict_avoider': 'Peace Seeker',
            'immediate_confronter': 'Direct Communicator',
            'private_addresser': 'Diplomatic Resolver'
        };
        
        return humanNames[pattern] || pattern.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
}

export { CoachHandoffSystem };