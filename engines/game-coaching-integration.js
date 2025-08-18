// GAME-COACHING INTEGRATION
// Seamlessly connects the adaptive assessment engine with the coaching system
// Provides user choice points and intelligent handoffs

import { AdaptiveQuestionEngine } from './adaptive-question-engine.js';
import { PatternAnalysisEngine } from './pattern-analysis-engine.js';
import { CoachHandoffSystem } from './coach-handoff-system.js';

class GameCoachingIntegration {
    constructor() {
        this.questionEngine = new AdaptiveQuestionEngine();
        this.patternEngine = new PatternAnalysisEngine();
        this.handoffSystem = new CoachHandoffSystem();
        
        console.log('🎮 Game-Coaching Integration initialized');
    }

    // Main assessment flow with coaching integration
    async processAssessmentFlow(responses, stage) {
        console.log(`🎯 Processing assessment flow - Stage: ${stage}, Responses: ${responses.length}`);
        
        const result = {
            stage,
            questionsAsked: responses.length,
            confidence: 0,
            readyForCoaching: false,
            coachingOption: null,
            nextQuestions: [],
            progressUpdate: {},
            choicePoint: null
        };

        // Update question engine with all responses
        responses.forEach(response => {
            this.questionEngine.processResponse(
                response.questionId, 
                response.selectedOption, 
                response.questionData
            );
        });

        // Get current state
        const progress = this.questionEngine.getProgress();
        result.confidence = progress.confidence;
        result.progressUpdate = progress;

        // Check if we've hit a choice point (after 30 questions)
        if (responses.length >= 30 && !result.choicePoint) {
            result.choicePoint = await this.createChoicePoint(responses, progress);
        }

        // If they choose to continue mapping, get more questions
        if (stage === 'continue_mapping' || responses.length < 30) {
            result.nextQuestions = this.questionEngine.getNextQuestions();
        }

        // If they choose coaching or have high confidence, prepare coaching context
        if (stage === 'start_coaching' || progress.confidence >= 0.8) {
            result.coachingOption = await this.prepareCoachingHandoff(responses, progress);
            result.readyForCoaching = true;
        }

        return result;
    }

    // Create choice point after sufficient data
    async createChoicePoint(responses, progress) {
        console.log('🤔 Creating choice point for user...');
        
        // Analyze patterns to give preview of what coaching could offer
        const behavioralSignature = this.questionEngine.generateBehavioralSignature();
        const patternAnalysis = this.patternEngine.analyzeBehavioralSignature(
            behavioralSignature.dominantPatterns,
            progress.confidence,
            responses
        );

        // Generate preview insights
        const previewInsights = this.generateCoachingPreview(patternAnalysis);
        
        return {
            type: 'coaching_vs_mapping',
            confidence: Math.round(progress.confidence * 100),
            questionsCompleted: responses.length,
            message: this.generateChoicePointMessage(progress.confidence, previewInsights),
            options: {
                continueMapping: {
                    label: 'Continue Mapping My Patterns',
                    description: `Get ${20} more questions to increase confidence to ${Math.round((progress.confidence + 0.2) * 100)}%+`,
                    action: 'continue_mapping'
                },
                startCoaching: {
                    label: 'Start Coaching Session',
                    description: 'Explore your patterns with an AI coach and create an action plan',
                    action: 'start_coaching',
                    preview: previewInsights
                }
            }
        };
    }

    // Generate choice point message based on confidence
    generateChoicePointMessage(confidence, insights) {
        const confidencePercent = Math.round(confidence * 100);
        
        if (confidence >= 0.7) {
            return `Excellent! We have ${confidencePercent}% confidence in your behavioral patterns. ${insights.preview} You can start coaching now or continue mapping for even more precision.`;
        } else if (confidence >= 0.5) {
            return `Great progress! We have ${confidencePercent}% confidence and are seeing clear patterns emerge. ${insights.preview} Ready to explore these with a coach, or continue mapping?`;
        } else {
            return `We're at ${confidencePercent}% confidence and starting to see interesting patterns. ${insights.preview} You can begin coaching now or continue for stronger insights.`;
        }
    }

    // Generate preview of what coaching could offer
    generateCoachingPreview(patternAnalysis) {
        let preview = '';
        let recommendedCoach = 'one of our coaches';
        
        if (patternAnalysis.patternInsights) {
            const dominantPatterns = Object.values(patternAnalysis.patternInsights)
                .filter(insight => insight.confidence > 0.4)
                .map(insight => this.humanizePatternName(insight.dominantPattern))
                .slice(0, 2);
            
            if (dominantPatterns.length > 0) {
                preview = `We're seeing ${dominantPatterns.join(' and ')} patterns.`;
            }
        }

        // Get coach recommendation preview
        if (patternAnalysis.patternInsights) {
            const mockBehavioralSignature = this.convertToMockSignature(patternAnalysis.patternInsights);
            const handoffContext = this.handoffSystem.prepareCoachingContext(
                [], mockBehavioralSignature, patternAnalysis, patternAnalysis.overallConfidence || 0.6
            );
            
            if (handoffContext.coachRecommendation) {
                recommendedCoach = handoffContext.coachRecommendation.coachInfo.name;
                preview += ` ${recommendedCoach} would be perfect for exploring these with you.`;
            }
        }
        
        return {
            preview,
            recommendedCoach,
            actionable: preview.length > 0
        };
    }

    // Prepare coaching handoff with full context
    async prepareCoachingHandoff(responses, progress) {
        console.log('🤝 Preparing coaching handoff...');
        
        // Generate complete behavioral signature
        const behavioralSignature = this.questionEngine.generateBehavioralSignature();
        
        // Perform pattern analysis
        const patternAnalysis = this.patternEngine.analyzeBehavioralSignature(
            behavioralSignature.dominantPatterns,
            progress.confidence,
            responses
        );

        // Prepare coaching context
        const coachingContext = this.handoffSystem.prepareCoachingContext(
            responses,
            behavioralSignature.dominantPatterns,
            patternAnalysis,
            progress.confidence
        );

        // Initiate coaching session with recommended coach
        const sessionData = this.handoffSystem.initiateCoachingSession(
            coachingContext,
            coachingContext.coachRecommendation.primaryCoach
        );

        return {
            context: coachingContext,
            session: sessionData,
            redirectUrl: this.generateCoachingUrl(sessionData)
        };
    }

    // Generate coaching URL with context
    generateCoachingUrl(sessionData) {
        const baseUrl = '/chat/';
        const params = new URLSearchParams({
            coach: sessionData.coachId,
            session_type: 'assessment_handoff',
            context: 'behavioral_patterns'
        });
        
        return `${baseUrl}?${params.toString()}`;
    }

    // Create assessment progress display
    createProgressDisplay(progress) {
        const percentage = Math.round(progress.confidence * 100);
        const filledBlocks = Math.floor(percentage / 10);
        const progressBar = '▓'.repeat(filledBlocks) + '░'.repeat(10 - filledBlocks);
        
        return {
            percentage,
            progressBar,
            confidenceLevel: this.getConfidenceLevel(progress.confidence),
            questionsAsked: progress.questionsAsked,
            nextMilestone: progress.nextMilestone,
            statusMessage: this.generateStatusMessage(progress.confidence, progress.questionsAsked)
        };
    }

    // Generate status message for progress
    generateStatusMessage(confidence, questionsAsked) {
        if (confidence >= 0.8) {
            return `High confidence achieved! Ready for detailed implementation planning.`;
        } else if (confidence >= 0.6) {
            return `Strong patterns detected. Coaching available or continue for more precision.`;
        } else if (confidence >= 0.4) {
            return `Clear patterns emerging. Continue mapping for coaching readiness.`;
        } else {
            return `Initial patterns detected. Continue to build behavioral signature.`;
        }
    }

    // Helper methods
    getConfidenceLevel(confidence) {
        if (confidence >= 0.8) return 'High';
        if (confidence >= 0.6) return 'Medium-High';
        if (confidence >= 0.4) return 'Medium';
        return 'Developing';
    }

    humanizePatternName(pattern) {
        const humanNames = {
            'harmony_keeper': 'Harmony Seeking',
            'authority_deferrer': 'Authority Respecting',
            'natural_leader': 'Leadership',
            'conflict_avoider': 'Peace Seeking',
            'immediate_confronter': 'Direct Communication',
            'private_addresser': 'Diplomatic Resolution'
        };
        
        return humanNames[pattern] || pattern.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    convertToMockSignature(patternInsights) {
        const mockSignature = {};
        
        Object.keys(patternInsights).forEach(domain => {
            const insight = patternInsights[domain];
            if (insight.dominantPattern) {
                mockSignature[domain] = {
                    [insight.dominantPattern]: Math.floor(insight.frequency * 10) || 1
                };
            }
        });
        
        return mockSignature;
    }

    // Handle coaching session initiation
    async initiateCoachingSession(assessmentData, selectedCoach = null) {
        console.log('🚀 Initiating coaching session...');
        
        // If no coach specified, use recommendation
        if (!selectedCoach && assessmentData.context?.coachRecommendation) {
            selectedCoach = assessmentData.context.coachRecommendation.primaryCoach;
        }
        
        // Prepare initial coaching message
        const initialMessage = this.generateInitialCoachingMessage(assessmentData.context, selectedCoach);
        
        // Send to coaching API with full context
        const coachingResponse = await this.sendToCoachingAPI(initialMessage, {
            assessmentContext: assessmentData.context,
            isHandoffSession: true,
            coach: selectedCoach
        });
        
        return {
            coachId: selectedCoach,
            initialMessage,
            coachResponse: coachingResponse,
            context: assessmentData.context
        };
    }

    // Generate initial coaching message
    generateInitialCoachingMessage(context, coachId) {
        const patterns = Object.values(context.behavioralInsights?.dominantPatterns || {});
        const confidence = context.confidenceReport?.overallConfidence || 50;
        
        let message = `Hi! I've just completed ${context.assessmentSummary?.totalResponses || 'some'} assessment questions and I'm ready to explore my patterns with coaching. `;
        
        if (patterns.length > 0) {
            message += `The assessment shows I have ${patterns.map(p => p.pattern).join(' and ')} patterns. `;
        }
        
        message += `I'm particularly interested in understanding what these patterns mean and how I can grow from here.`;
        
        return message;
    }

    // Send message to coaching API with context
    async sendToCoachingAPI(message, options) {
        try {
            const response = await fetch('/api/tom-coaching', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message,
                    use_fallback: false,
                    coach: options.coach || 'tom',
                    assessmentContext: options.assessmentContext,
                    isHandoffSession: options.isHandoffSession || false
                })
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error calling coaching API:', error);
            return {
                content: [{
                    text: "I'm ready to explore your patterns with you! Let's start by talking about what stood out to you most during the assessment."
                }],
                source: 'fallback'
            };
        }
    }
}

export { GameCoachingIntegration };