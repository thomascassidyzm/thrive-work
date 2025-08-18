// DYNAMIC OCEAN ANALYSIS ENGINE
// Progressive Big Five profiling with behavioral predictions and action algorithms
// "You as a verb, not a noun" - dynamic behavioral tendencies, not fixed traits

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
    analyzeBehavioralTendencies(responses) {
        console.log('🌊 Generating Dynamic OCEAN Analysis...');
        
        const oceanScores = { O: 0, C: 0, E: 0, A: 0, N: 0 };
        const patternCounts = {};
        const responseCount = responses.length;
        
        // Calculate raw OCEAN scores from responses
        responses.forEach(response => {
            const patternType = response.selectedOption.pattern_type;
            if (patternType && this.oceanMapping[patternType]) {
                const mapping = this.oceanMapping[patternType];
                oceanScores.O += mapping.O;
                oceanScores.C += mapping.C;
                oceanScores.E += mapping.E;
                oceanScores.A += mapping.A;
                oceanScores.N += mapping.N;
                
                patternCounts[patternType] = (patternCounts[patternType] || 0) + 1;
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
        
        return {
            oceanPercentiles,
            confidence,
            behavioralPredictions,
            actionAlgorithms,
            rawScores: oceanScores,
            responseCount,
            progressiveInsight: this.generateProgressiveInsight(oceanPercentiles, confidence, responseCount)
        };
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