// PATTERN ANALYSIS ENGINE
// Behavioral Biometrics - analyzes response patterns to generate implementation frameworks
// Uses confidence thresholds and evidence-based recommendations

import { DynamicOceanAnalysis } from './dynamic-ocean-analysis.js';

class PatternAnalysisEngine {
    constructor() {
        this.confidenceThresholds = {
            LOW: 0.3,
            MEDIUM: 0.6,
            HIGH: 0.8,
            IMPLEMENTATION_READY: 0.9
        };
        
        // Initialize Dynamic OCEAN Analysis engine
        this.oceanAnalysis = new DynamicOceanAnalysis();
        
        // Behavior observation patterns for exploration
        this.behaviorObservations = {
            // Group Dynamics Behaviors
            'harmony_keeper': {
                observation: 'You often prioritize group harmony, sometimes over your own needs',
                whatThisMeans: 'You have a gift for creating peaceful environments and building consensus',
                explorationQuestions: ['What happens inside you when there\'s group tension?', 'What would it feel like to voice disagreement?'],
                growthInvitation: 'You might find that your authentic voice actually strengthens group dynamics',
                experimentSuggestion: 'Try sharing a small disagreement in a safe group setting and notice what happens'
            },
            
            'natural_leader': {
                observation: 'You tend to step up to lead when groups need direction',
                whatThisMeans: 'You naturally take initiative and inspire confidence in others',
                explorationQuestions: ['What draws you to take charge?', 'When do you prefer to let others lead?'],
                growthInvitation: 'You might explore when leading serves the group vs when stepping back empowers others',
                experimentSuggestion: 'Practice asking powerful questions instead of giving directions for a week'
            },
            
            'conflict_avoider': {
                observation: 'You usually prefer to keep things peaceful rather than rock the boat',
                whatThisMeans: 'You create calm environments and maintain important relationships',
                explorationQuestions: ['What does conflict feel like in your body?', 'What would change if disagreement felt safer?'],
                growthInvitation: 'You might discover that some conflicts actually strengthen relationships',
                experimentSuggestion: 'Practice having one small, kind disagreement each week and notice the outcomes'
            },
            
            // Authority Behaviors
            'authority_deferrer': {
                observation: 'You tend to naturally follow authority figures without much questioning',
                whatThisMeans: 'You work well in structures and respect expertise and experience',
                explorationQuestions: ['What feels safe about deferring to authority?', 'When has your own judgment proven valuable?'],
                growthInvitation: 'You might explore when your own wisdom deserves equal weight with authority',
                experimentSuggestion: 'Next time an authority figure gives advice, pause and ask yourself what you would choose'
            },
            
            'system_challenger': {
                observation: 'You naturally question authority claims and challenge structures when they don\'t serve',
                whatThisMeans: 'You drive improvement and stand up for important principles',
                explorationQuestions: ['What experiences shaped your questioning nature?', 'When do systems actually serve you well?'],
                growthInvitation: 'You could explore maximizing your impact while minimizing relationship costs',
                experimentSuggestion: 'Try working within a system for positive change before challenging it directly'
            },
            
            // Conflict Behaviors
            'immediate_confronter': {
                observation: 'You tend to address problems right when you notice them',
                whatThisMeans: 'You prevent issues from festering and communicate with refreshing clarity',
                explorationQuestions: ['What drives you to tackle issues immediately?', 'How do others usually respond to your directness?'],
                growthInvitation: 'You might experiment with timing to maximize your impact and others\' receptiveness',
                experimentSuggestion: 'Before addressing your next concern, pause and consider: is this the best moment for the other person to hear this?'
            },
            
            'private_addresser': {
                observation: 'You prefer to work through conflicts one-on-one rather than in groups',
                whatThisMeans: 'You protect people\'s dignity and create safe spaces for vulnerable conversations',
                explorationQuestions: ['What feels better about private conversations?', 'When might group discussion actually serve better?'],
                growthInvitation: 'You could explore when public accountability actually helps resolve systemic issues',
                experimentSuggestion: 'Next time you notice a pattern affecting multiple people, consider addressing it with the group'
            }
        };
    }

    // Analyze behavioral signature and generate insights
    analyzeBehavioralSignature(behavioralSignature, confidence, responses) {
        console.log('🧠 Analyzing behavioral signature for implementation insights...');
        
        const analysis = {
            overallConfidence: confidence,
            patternInsights: {},
            crossPatternAnalysis: {},
            implementationPlan: {},
            evidenceBase: this.calculateEvidenceBase(responses),
            readyForImplementation: confidence >= this.confidenceThresholds.IMPLEMENTATION_READY,
            // NEW: Dynamic OCEAN Analysis
            oceanAnalysis: this.oceanAnalysis.analyzeBehavioralTendencies(responses)
        };
        
        // Analyze each domain
        Object.keys(behavioralSignature).forEach(domain => {
            const domainPatterns = behavioralSignature[domain];
            analysis.patternInsights[domain] = this.analyzeDomainPatterns(domainPatterns, domain);
        });
        
        // Cross-pattern analysis for complex insights
        analysis.crossPatternAnalysis = this.performCrossPatternAnalysis(analysis.patternInsights);
        
        // Generate implementation plan if confidence is high enough
        if (confidence >= this.confidenceThresholds.HIGH) {
            analysis.implementationPlan = this.generateImplementationPlan(analysis.patternInsights, analysis.crossPatternAnalysis);
        }
        
        return analysis;
    }

    // Analyze patterns within a specific domain
    analyzeDomainPatterns(domainPatterns, domain) {
        const totalResponses = Object.values(domainPatterns).reduce((sum, count) => sum + count, 0);
        const patterns = Object.keys(domainPatterns);
        
        // Find dominant pattern
        const dominantPattern = patterns.reduce((a, b) => 
            domainPatterns[a] > domainPatterns[b] ? a : b
        );
        
        const dominantFrequency = domainPatterns[dominantPattern] / totalResponses;
        const patternDefinition = this.patternDefinitions[dominantPattern];
        
        return {
            dominantPattern,
            frequency: dominantFrequency,
            confidence: this.calculatePatternConfidence(dominantFrequency, totalResponses),
            definition: patternDefinition || { description: 'Pattern definition pending', growthDirection: 'Analysis in progress' },
            allPatterns: domainPatterns,
            totalDataPoints: totalResponses,
            domain
        };
    }

    // Perform cross-pattern analysis to identify complex behavioral signatures
    performCrossPatternAnalysis(patternInsights) {
        console.log('🔗 Performing cross-pattern analysis...');
        
        const combinations = [];
        const domains = Object.keys(patternInsights);
        
        // Generate pattern combinations
        for (let i = 0; i < domains.length; i++) {
            for (let j = i + 1; j < domains.length; j++) {
                const domain1 = domains[i];
                const domain2 = domains[j];
                const pattern1 = patternInsights[domain1].dominantPattern;
                const pattern2 = patternInsights[domain2].dominantPattern;
                
                const combination = this.analyzePatternCombination(pattern1, pattern2, domain1, domain2);
                if (combination) {
                    combinations.push(combination);
                }
            }
        }
        
        return {
            combinations,
            signature: this.generateBehavioralSignatureDescription(patternInsights),
            uniqueInsights: this.generateUniqueInsights(combinations)
        };
    }

    // Analyze specific pattern combinations for insights
    analyzePatternCombination(pattern1, pattern2, domain1, domain2) {
        // Define known pattern combinations and their implications (verb-based language)
        const combinationInsights = {
            'harmony_keeper + authority_deferrer': {
                signature: 'You tend to seek harmony while respecting established authority',
                insight: 'You often avoid conflict both in groups and with authority figures',
                challenge: 'Important issues may go unaddressed when you default to compliance',
                opportunity: 'You might experiment with strategic advocacy - choosing when to speak up serves both harmony and progress'
            },
            
            'natural_leader + immediate_confronter': {
                signature: 'You often step up to lead and address issues directly',
                insight: 'You tend to take charge and tackle problems head-on',
                challenge: 'Your directness might sometimes feel overwhelming to others',
                opportunity: 'You could explore collaborative leadership approaches that harness your natural initiative'
            },
            
            'conflict_avoider + private_addresser': {
                signature: 'You typically prefer gentle, private resolution approaches',
                insight: 'You often choose one-on-one conversations over group confrontation',
                challenge: 'Some systemic issues might need public addressing or stronger approaches',
                opportunity: 'You might build confidence in graduated conflict approaches - starting private and escalating when needed'
            },
            
            'authority_deferrer + private_addresser': {
                signature: 'You often work through proper channels quietly and respectfully',
                insight: 'You tend to respect hierarchy while addressing issues privately',
                challenge: 'You might miss opportunities for needed systemic change',
                opportunity: 'You could explore when public advocacy actually serves the greater good'
            }
        };
        
        const combinationKey = `${pattern1} + ${pattern2}`;
        const reverseKey = `${pattern2} + ${pattern1}`;
        
        return combinationInsights[combinationKey] || combinationInsights[reverseKey] || null;
    }

    // Generate implementation plan based on analysis
    generateImplementationPlan(patternInsights, crossPatternAnalysis) {
        console.log('📋 Generating implementation plan...');
        
        const plan = {
            primaryFocusAreas: [],
            twelveWeekPlan: {},
            cassidyMethodIntegration: {},
            progressMetrics: {}
        };
        
        // Identify top 3 growth areas based on pattern analysis
        const growthAreas = Object.values(patternInsights)
            .filter(insight => insight.confidence >= this.confidenceThresholds.MEDIUM)
            .sort((a, b) => b.confidence - a.confidence)
            .slice(0, 3)
            .map(insight => ({
                domain: insight.domain,
                pattern: insight.dominantPattern,
                growthDirection: insight.definition.growthDirection,
                implementationStrategy: insight.definition.implementationStrategy
            }));
        
        plan.primaryFocusAreas = growthAreas;
        
        // Generate 12-week CASSIDY METHOD plan
        plan.twelveWeekPlan = this.generateTwelveWeekPlan(growthAreas);
        
        return plan;
    }

    // Generate 12-week CASSIDY METHOD implementation plan
    generateTwelveWeekPlan(growthAreas) {
        const plan = {};
        
        growthAreas.forEach((area, index) => {
            const weekStart = (index * 4) + 1;
            const weekEnd = weekStart + 3;
            
            plan[`weeks_${weekStart}_${weekEnd}`] = {
                focusArea: area.domain,
                pattern: area.pattern,
                week1: `NOTICE: Become aware of your ${area.pattern} pattern in daily situations`,
                week2: `QUESTION: Ask "Would I choose this response?" when the pattern appears`,
                week3: `CHOOSE: Practice alternative responses from ${area.growthDirection}`,
                week4: `INTEGRATE: Make the new choice automatic through repetition`,
                strategy: area.implementationStrategy,
                progressMetrics: [
                    'Pattern awareness frequency',
                    'Conscious choice moments',
                    'Alternative response success rate',
                    'Outcome satisfaction improvement'
                ]
            };
        });
        
        return plan;
    }

    // Calculate evidence base strength
    calculateEvidenceBase(responses) {
        const totalResponses = responses.length;
        const domainCoverage = new Set(responses.map(r => r.questionData.domain)).size;
        const categoryCoverage = new Set(responses.map(r => r.questionData.category)).size;
        
        return {
            dataPoints: totalResponses,
            domainsCovered: domainCoverage,
            categoriesCovered: categoryCoverage,
            strength: this.calculateEvidenceStrength(totalResponses, domainCoverage, categoryCoverage)
        };
    }

    // Calculate pattern confidence based on frequency and sample size
    calculatePatternConfidence(frequency, sampleSize) {
        // Higher frequency = more consistent pattern
        const frequencyScore = frequency;
        
        // Larger sample size = more reliable
        const sampleScore = Math.min(sampleSize / 10, 1); // Need 10+ responses for max confidence
        
        // Combined confidence
        return (frequencyScore + sampleScore) / 2;
    }

    // Calculate overall evidence strength
    calculateEvidenceStrength(responses, domains, categories) {
        const responseScore = Math.min(responses / 60, 1); // 60 responses = max score
        const domainScore = Math.min(domains / 5, 1); // 5 domains = max score  
        const categoryScore = Math.min(categories / 15, 1); // 15 categories = max score
        
        return (responseScore + domainScore + categoryScore) / 3;
    }

    // Generate behavioral signature description
    generateBehavioralSignatureDescription(patternInsights) {
        const dominantPatterns = Object.values(patternInsights).map(insight => insight.dominantPattern);
        
        // Generate descriptive signature based on pattern combinations (verb-based language)
        if (dominantPatterns.includes('harmony_keeper') && dominantPatterns.includes('authority_deferrer')) {
            return 'You tend to prioritize harmony and respect established authority structures';
        } else if (dominantPatterns.includes('natural_leader') && dominantPatterns.includes('immediate_confronter')) {
            return 'You often step up to lead and address issues directly as they arise';
        } else if (dominantPatterns.includes('conflict_avoider')) {
            return 'You typically seek peaceful solutions and prefer to avoid confrontational situations';
        } else {
            return 'Your behavioral patterns show a unique combination that deserves personalized exploration';
        }
    }

    // Generate unique insights from pattern combinations
    generateUniqueInsights(combinations) {
        return combinations.map(combo => ({
            insight: combo.insight,
            signature: combo.signature,
            implementationFocus: combo.opportunity
        }));
    }

    // Generate confidence statement for user
    generateConfidenceStatement(analysis) {
        const confidence = analysis.overallConfidence;
        const evidenceBase = analysis.evidenceBase;
        
        let statement = '';
        
        if (confidence >= this.confidenceThresholds.IMPLEMENTATION_READY) {
            statement = `Based on your ${evidenceBase.dataPoints} responses across ${evidenceBase.domainsCovered} different areas, we're seeing some really clear behavioral tendencies (${Math.round(confidence * 100)}% confidence). Remember - you are a verb, not a noun. These patterns show how you tend to behave, not who you are. Ready to explore how you might choose differently?`;
        } else if (confidence >= this.confidenceThresholds.HIGH) {
            statement = `Your ${evidenceBase.dataPoints} responses are revealing clear behavioral patterns (${Math.round(confidence * 100)}% confidence). You're constantly becoming - these tendencies can evolve. Want to explore these patterns with coaching, or continue mapping for even more clarity?`;
        } else if (confidence >= this.confidenceThresholds.MEDIUM) {
            statement = `We're starting to see interesting behavioral tendencies in your ${evidenceBase.dataPoints} responses (${Math.round(confidence * 100)}% confidence). You are a verb, not a noun - these patterns show how you've been behaving, not who you are. Continue mapping or explore what we've discovered so far?`;
        } else {
            statement = `After ${evidenceBase.dataPoints} responses, we're beginning to spot some behavioral patterns (${Math.round(confidence * 100)}% confidence). Remember - you're constantly becoming. The more you explore, the clearer your tendencies become.`;
        }
        
        return statement;
    }
}

export { PatternAnalysisEngine };