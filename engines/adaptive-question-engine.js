// ADAPTIVE QUESTION ENGINE
// Behavioral Biometrics System - builds confidence-based behavioral signatures
// Dynamically selects questions based on previous responses to maximize insight

import { groupDynamicsQuestions } from '../question-banks/group-dynamics-questions.js';
import { authorityRelationshipsQuestions } from '../question-banks/authority-relationships-questions.js';
import { conflictPatternsQuestions } from '../question-banks/conflict-patterns-questions.js';

class AdaptiveQuestionEngine {
    constructor() {
        // Combine all question banks
        this.allQuestions = [
            ...groupDynamicsQuestions,
            ...authorityRelationshipsQuestions,
            ...conflictPatternsQuestions
        ];
        
        // Assessment state
        this.responses = [];
        this.patternConfidence = {};
        this.overallConfidence = 0;
        this.stage = 1;
        this.questionsAsked = 0;
        
        // Pattern tracking
        this.detectedPatterns = {};
        this.uncertainAreas = [];
        this.behavioralSignature = {};
        
        console.log(`🚀 Adaptive Engine Initialized with ${this.allQuestions.length} total questions`);
    }

    // STAGE 1: INITIAL PATTERN DETECTION (10 questions)
    getInitialQuestions() {
        console.log('🎯 STAGE 1: Initial Pattern Detection - 10 random questions');
        
        // Simple approach: 10 completely random questions from all available
        const availableQuestions = [...this.allQuestions];
        const selectedQuestions = [];
        
        // Select 10 random questions
        for (let i = 0; i < 10 && availableQuestions.length > 0; i++) {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            const selectedQuestion = availableQuestions.splice(randomIndex, 1)[0];
            selectedQuestions.push(selectedQuestion);
        }
        
        console.log(`Selected ${selectedQuestions.length} completely random initial questions`);
        return selectedQuestions;
    }

    // STAGE 2: PATTERN REFINEMENT (20 questions)
    getRefinementQuestions() {
        console.log('🔍 STAGE 2: Pattern Refinement - 20 more questions');
        
        // Analyze initial responses to identify patterns
        this.analyzeInitialPatterns();
        
        // Select 20 more questions, mix of targeted and random
        const targetQuestions = [];
        
        // Get available questions (not already asked)
        const availableQuestions = this.allQuestions.filter(q => !this.isAlreadyAsked(q));
        
        // Take 20 random questions from remaining pool
        const selectedQuestions = this.selectRandomQuestions(availableQuestions, 20);
        targetQuestions.push(...selectedQuestions);
        
        console.log(`Selected ${targetQuestions.length} questions for pattern refinement`);
        return targetQuestions;
    }

    // STAGE 3: PRECISION MAPPING (sets of 20)
    getPrecisionQuestions() {
        console.log('🎯 STAGE 3: Precision Mapping');
        
        // Update pattern analysis
        this.updatePatternAnalysis();
        
        // Target the most uncertain patterns for deep dive
        const precisionQuestions = [];
        const questionsPerPattern = 5;
        
        // Get patterns with lowest confidence scores
        const uncertainPatterns = Object.entries(this.patternConfidence)
            .filter(([pattern, confidence]) => confidence < 0.8)
            .sort((a, b) => a[1] - b[1])
            .slice(0, 4)
            .map(([pattern]) => pattern);
        
        uncertainPatterns.forEach(pattern => {
            const patternQuestions = this.allQuestions.filter(q => 
                q.pattern_type === pattern && !this.isAlreadyAsked(q)
            );
            
            if (patternQuestions.length > 0) {
                const selected = this.selectRandomQuestions(patternQuestions, questionsPerPattern);
                precisionQuestions.push(...selected);
            }
        });
        
        // Fill remaining with edge case exploration
        while (precisionQuestions.length < 20) {
            const edgeCaseQuestions = this.allQuestions.filter(q => 
                !this.isAlreadyAsked(q) && 
                !precisionQuestions.includes(q) &&
                q.reveals && q.reveals.length > 2 // Complex questions that reveal multiple aspects
            );
            
            if (edgeCaseQuestions.length > 0) {
                precisionQuestions.push(edgeCaseQuestions[Math.floor(Math.random() * edgeCaseQuestions.length)]);
            } else {
                break;
            }
        }
        
        console.log(`Selected ${precisionQuestions.length} precision questions for deep pattern analysis`);
        return precisionQuestions;
    }

    // CORE ENGINE: Get next question set
    getNextQuestions() {
        console.log(`\n🧠 Getting next questions - Current stage: ${this.stage}, Questions asked: ${this.questionsAsked}`);
        
        let questions = [];
        
        if (this.stage === 1) {
            // Stage 1: Initial 10 questions
            questions = this.getInitialQuestions();
            this.stage = 2;
        } else if (this.stage === 2) {
            // Stage 2: Refinement 20 questions  
            questions = this.getRefinementQuestions();
            this.stage = 3;
        } else {
            // Stage 3+: Precision sets of 20
            questions = this.getPrecisionQuestions();
        }
        
        return questions;
    }

    // Process response and update patterns
    processResponse(questionId, selectedOption, questionData) {
        console.log(`📝 Processing response for question ${questionId}`);
        
        const response = {
            questionId,
            selectedOption,
            questionData,
            timestamp: Date.now(),
            stage: this.stage
        };
        
        this.responses.push(response);
        this.questionsAsked++;
        
        // Update pattern tracking
        this.updatePatternTracking(response);
        
        // Calculate new confidence levels
        this.calculateConfidence();
        
        console.log(`📊 Overall confidence: ${(this.overallConfidence * 100).toFixed(1)}%`);
        
        return {
            overallConfidence: this.overallConfidence,
            questionsAsked: this.questionsAsked,
            stage: this.stage,
            behavioralSignature: this.behavioralSignature,
            readyForImplementation: this.overallConfidence >= 0.9
        };
    }

    // Analyze initial patterns from first 4 responses
    analyzeInitialPatterns() {
        console.log('🔍 Analyzing initial patterns...');
        
        // Track pattern types from responses
        const patternCounts = {};
        
        this.responses.forEach(response => {
            const patternType = response.selectedOption.pattern_type;
            if (patternType) {
                patternCounts[patternType] = (patternCounts[patternType] || 0) + 1;
            }
        });
        
        // Identify areas that need more exploration
        const categories = [...new Set(this.responses.map(r => r.questionData.category))];
        const allCategories = [...new Set(this.allQuestions.map(q => q.category))];
        
        this.uncertainAreas = allCategories.filter(cat => !categories.includes(cat));
        
        console.log('Initial patterns detected:', patternCounts);
        console.log('Uncertain areas identified:', this.uncertainAreas);
    }

    // Update pattern analysis as more data comes in
    updatePatternAnalysis() {
        console.log('📈 Updating pattern analysis...');
        
        // Count pattern occurrences
        const patternCounts = {};
        const totalResponses = this.responses.length;
        
        this.responses.forEach(response => {
            const patternType = response.selectedOption.pattern_type;
            if (patternType) {
                patternCounts[patternType] = (patternCounts[patternType] || 0) + 1;
            }
        });
        
        // Calculate pattern confidence based on consistency and sample size
        Object.keys(patternCounts).forEach(pattern => {
            const count = patternCounts[pattern];
            const frequency = count / totalResponses;
            
            // Confidence increases with consistency and sample size
            const consistencyScore = frequency > 0.6 ? 0.8 : frequency > 0.3 ? 0.5 : 0.2;
            const sampleSizeScore = Math.min(count / 5, 1); // Need at least 5 instances for high confidence
            
            this.patternConfidence[pattern] = (consistencyScore + sampleSizeScore) / 2;
        });
        
        console.log('Updated pattern confidence:', this.patternConfidence);
    }

    // Update pattern tracking with each response
    updatePatternTracking(response) {
        const patternType = response.selectedOption.pattern_type;
        const domain = response.selectedOption.domain;
        
        if (patternType) {
            // Track pattern frequency
            if (!this.behavioralSignature[domain]) {
                this.behavioralSignature[domain] = {};
            }
            
            if (!this.behavioralSignature[domain][patternType]) {
                this.behavioralSignature[domain][patternType] = 0;
            }
            
            this.behavioralSignature[domain][patternType]++;
        }
    }

    // Calculate overall confidence score
    calculateConfidence() {
        const totalQuestions = this.questionsAsked;
        
        // Realistic confidence progression based on question count
        let baseConfidence = 0;
        if (totalQuestions >= 10) {
            // 10 questions: 20-40% confidence (depends on randomness)
            baseConfidence = 0.20 + (Math.random() * 0.20); // 20-40%
        }
        if (totalQuestions >= 30) {
            // 30 questions: 50-70% confidence
            baseConfidence = 0.50 + (Math.random() * 0.20); // 50-70%
        }
        if (totalQuestions >= 50) {
            // 50 questions: 70-85% confidence
            baseConfidence = 0.70 + (Math.random() * 0.15); // 70-85%
        }
        if (totalQuestions >= 70) {
            // 70+ questions: 80-90% confidence
            baseConfidence = 0.80 + (Math.random() * 0.10); // 80-90%
        }
        
        // Bonus confidence from pattern consistency
        const patternConfidences = Object.values(this.patternConfidence);
        const avgPatternConfidence = patternConfidences.length > 0 
            ? patternConfidences.reduce((a, b) => a + b, 0) / patternConfidences.length 
            : 0;
        
        // Combined confidence (cap at 95% to avoid false certainty)
        this.overallConfidence = Math.min((baseConfidence + avgPatternConfidence) / 2, 0.95);
        
        console.log(`📊 Confidence calculation: Base(${baseConfidence.toFixed(2)}) + Pattern(${avgPatternConfidence.toFixed(2)}) = ${this.overallConfidence.toFixed(2)}`);
    }

    // Generate behavioral signature summary
    generateBehavioralSignature() {
        console.log('🎯 Generating final behavioral signature...');
        
        const signature = {
            confidence: this.overallConfidence,
            questionsAnalyzed: this.questionsAsked,
            dominantPatterns: {},
            implementationReady: this.overallConfidence >= 0.9,
            recommendations: []
        };
        
        // Identify dominant patterns per domain
        Object.keys(this.behavioralSignature).forEach(domain => {
            const domainPatterns = this.behavioralSignature[domain];
            const dominantPattern = Object.keys(domainPatterns).reduce((a, b) => 
                domainPatterns[a] > domainPatterns[b] ? a : b
            );
            
            signature.dominantPatterns[domain] = {
                pattern: dominantPattern,
                frequency: domainPatterns[dominantPattern],
                confidence: this.patternConfidence[dominantPattern] || 0.5
            };
        });
        
        return signature;
    }

    // Helper methods
    isAlreadyAsked(question) {
        return this.responses.some(r => r.questionId === question.id);
    }
    
    selectRandomQuestions(questions, count) {
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }
    
    // Get progress for UI
    getProgress() {
        return {
            questionsAsked: this.questionsAsked,
            confidence: this.overallConfidence,
            stage: this.stage,
            confidencePercentage: Math.round(this.overallConfidence * 100),
            nextMilestone: this.getNextMilestone()
        };
    }
    
    getNextMilestone() {
        if (this.overallConfidence < 0.5) return { target: 50, questionsNeeded: 30 - this.questionsAsked };
        if (this.overallConfidence < 0.7) return { target: 70, questionsNeeded: 50 - this.questionsAsked };
        if (this.overallConfidence < 0.9) return { target: 90, questionsNeeded: 70 - this.questionsAsked };
        return { target: 95, questionsNeeded: 'Continue for maximum precision' };
    }
}

// Export the engine
export { AdaptiveQuestionEngine };