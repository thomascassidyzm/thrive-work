// QUESTION PRIVACY TAGGER UTILITY
// Applies privacy schema to questions and validates data access rules

import { privacyRules, k10Enforcement } from '../config/question-privacy-schema.js';

/**
 * Apply privacy tags to a question based on its category
 */
function tagQuestion(question) {
    const category = question.category || inferCategory(question);
    const privacyRule = privacyRules[category];

    if (!privacyRule) {
        console.warn(`No privacy rule found for category: ${category}. Defaulting to private.`);
        return {
            ...question,
            dataAccess: {
                employee: true,
                employerShareable: false,
                aggregationOnly: false,
                requiresK10: false,
                privacyCategory: 'unknown'
            }
        };
    }

    return {
        ...question,
        dataAccess: {
            employee: true,  // ALWAYS true
            employerShareable: privacyRule.employerShareable,
            aggregationOnly: privacyRule.aggregationOnly,
            requiresK10: privacyRule.requiresK10,
            privacyCategory: category,
            rationale: privacyRule.rationale
        }
    };
}

/**
 * Infer category from question structure
 */
function inferCategory(question) {
    // Check domain field
    if (question.options && question.options[0]?.domain) {
        const domain = question.options[0].domain;
        const domainToCategoryMap = {
            'group_dynamics': 'group_dynamics',
            'authority': 'authority_relationships',
            'conflict': 'conflict_patterns',
            'social': 'universal_launch',  // Social = personal
            'relationships': 'universal_launch',  // Personal relationships
            'boundaries': 'universal_launch',
            'values': 'universal_launch',
            'creative': 'creative_expression',
            'trust': 'trust_vulnerability',
            'discipline': 'discipline_impulse'
        };
        return domainToCategoryMap[domain] || 'universal_launch';
    }

    // Check question ID prefix
    if (question.id) {
        const prefixMap = {
            'UL': 'universal_launch',
            'GD': 'group_dynamics',
            'AR': 'authority_relationships',
            'CP': 'conflict_patterns',
            'CE': 'creative_expression',
            'TV': 'trust_vulnerability',
            'DI': 'discipline_impulse',
            'TT': 'thrive_time',
            'TH': 'thrive_health',
            'TR': 'thrive_relationships',
            'TI': 'thrive_identity',
            'TV': 'thrive_vitality',
            'TE': 'thrive_environment',
            'HW': 'thrive_environment'  // Home-work questions
        };
        const prefix = question.id.substring(0, 2);
        return prefixMap[prefix] || 'universal_launch';
    }

    // Default to private
    return 'universal_launch';
}

/**
 * Batch tag all questions in a question bank
 */
function tagQuestionBank(questions) {
    return questions.map(q => tagQuestion(q));
}

/**
 * Validate that a question has proper privacy tagging
 */
function validateQuestionPrivacy(question) {
    const errors = [];

    // Must have dataAccess object
    if (!question.dataAccess) {
        errors.push('Missing dataAccess object');
        return { valid: false, errors };
    }

    // Employee access must always be true
    if (question.dataAccess.employee !== true) {
        errors.push('employee access must always be true');
    }

    // If employerShareable, must have requiresK10
    if (question.dataAccess.employerShareable && !question.dataAccess.requiresK10) {
        errors.push('employerShareable questions must have requiresK10: true');
    }

    // If aggregationOnly, must be employerShareable
    if (question.dataAccess.aggregationOnly && !question.dataAccess.employerShareable) {
        errors.push('aggregationOnly requires employerShareable: true');
    }

    // Must have valid category
    if (!question.dataAccess.privacyCategory || !privacyRules[question.dataAccess.privacyCategory]) {
        errors.push('Invalid or missing privacyCategory');
    }

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Filter questions for employee view (all questions)
 */
function getEmployeeQuestions(questions) {
    return questions;  // Employees see everything
}

/**
 * Filter questions for employer aggregation (only employerShareable)
 */
function getEmployerShareableQuestions(questions) {
    return questions.filter(q =>
        q.dataAccess?.employerShareable === true
    );
}

/**
 * Check if employer can access aggregated data for a team
 */
function canEmployerAccessData(teamData) {
    return k10Enforcement.validateAccess(teamData);
}

/**
 * Create aggregated employer view of data
 * Returns ONLY what employer is allowed to see
 */
function createEmployerView(responses, teamSize) {
    // First check k>10
    const accessCheck = canEmployerAccessData({ respondentCount: teamSize });
    if (!accessCheck.allowed) {
        return {
            error: accessCheck.reason,
            message: accessCheck.employerMessage
        };
    }

    // Filter to only employer-shareable questions
    const shareableResponses = responses.filter(r =>
        r.question?.dataAccess?.employerShareable === true
    );

    // Group by pattern type
    const patternCounts = {};
    shareableResponses.forEach(response => {
        const pattern = response.selectedOption?.pattern_type;
        if (pattern) {
            patternCounts[pattern] = (patternCounts[pattern] || 0) + 1;
        }
    });

    // Calculate pattern percentages
    const patternDistribution = {};
    Object.keys(patternCounts).forEach(pattern => {
        patternDistribution[pattern] = {
            count: patternCounts[pattern],
            percentage: Math.round((patternCounts[pattern] / teamSize) * 100)
        };
    });

    // For aggregationOnly questions, show only percentages
    const aggregationOnlyInsights = shareableResponses
        .filter(r => r.question?.dataAccess?.aggregationOnly === true)
        .map(r => ({
            category: r.question.dataAccess.privacyCategory,
            percentage: calculateAggregatedPercentage(r, teamSize),
            insight: generateAggregatedInsight(r, teamSize)
        }));

    return {
        respondentCount: teamSize,
        metPrivacyThreshold: true,
        patternDistribution,
        aggregationOnlyInsights,
        timestamp: new Date().toISOString(),
        privacyNote: 'Individual responses are protected. Only aggregated patterns shown.'
    };
}

/**
 * Create individual employee view of data
 * Returns EVERYTHING - full OCEAN profile, patterns, insights
 */
function createEmployeeView(responses, userId) {
    // Employees see ALL their data
    return {
        userId,
        totalResponses: responses.length,

        // Full OCEAN scores
        oceanScores: calculateOCEANScores(responses),

        // All behavioral patterns identified
        behavioralPatterns: identifyAllPatterns(responses),

        // Workplace-specific insights
        workplaceInsights: generateWorkplaceInsights(responses),

        // Personal relationship insights
        personalInsights: generatePersonalInsights(responses),

        // Home → work influence (specific details)
        homeWorkInfluence: analyzeHomeWorkInfluence(responses),

        // 30-day action plan
        actionPlan: generateActionPlan(responses),

        // Coaching pathway recommendations
        coachingRecommendations: generateCoachingPath(responses),

        timestamp: new Date().toISOString(),
        privacyNote: 'This is your complete personal data. Only you can see this.'
    };
}

// Helper functions (stubs for now, will implement in next phase)
function calculateAggregatedPercentage(response, teamSize) {
    // TODO: Implement proper aggregation
    return Math.round(Math.random() * 100);
}

function generateAggregatedInsight(response, teamSize) {
    // TODO: Generate employer-appropriate insights
    return `${calculateAggregatedPercentage(response, teamSize)}% of team shows this pattern`;
}

function calculateOCEANScores(responses) {
    // TODO: Use dynamic-ocean-analysis.js
    return { O: 0, C: 0, E: 0, A: 0, N: 0 };
}

function identifyAllPatterns(responses) {
    // TODO: Pattern identification
    return [];
}

function generateWorkplaceInsights(responses) {
    // TODO: Workplace-specific analysis
    return {};
}

function generatePersonalInsights(responses) {
    // TODO: Personal relationship analysis
    return {};
}

function analyzeHomeWorkInfluence(responses) {
    // TODO: Home→work specific analysis
    return {};
}

function generateActionPlan(responses) {
    // TODO: 30-day Sausage Machine plan
    return [];
}

function generateCoachingPath(responses) {
    // TODO: Coaching recommendations
    return [];
}

// Export all functions
export {
    tagQuestion,
    tagQuestionBank,
    validateQuestionPrivacy,
    getEmployeeQuestions,
    getEmployerShareableQuestions,
    canEmployerAccessData,
    createEmployerView,
    createEmployeeView
};
