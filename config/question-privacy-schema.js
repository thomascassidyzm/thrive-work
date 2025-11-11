// QUESTION PRIVACY SCHEMA
// Defines data access rules for all OCEAN assessment questions
// Ensures k>10 privacy for employer-accessible data while giving employees full access

/**
 * DATA ACCESS RULES:
 *
 * employee: true (ALWAYS) - Employee always gets full access to all their data
 * employerShareable: boolean - Can this question's data be aggregated for employer view?
 * aggregationOnly: boolean - Employer only sees aggregated %, never individual details
 * requiresK10: boolean - Employer access requires minimum 10 respondents
 *
 * PRIVACY BOUNDARIES:
 * - Personal relationships → employerShareable: false
 * - Workplace scenarios → employerShareable: true
 * - Home environment impact on work → aggregationOnly: true (employer sees % only)
 * - All employer data → requiresK10: true (hard-coded, no bypass)
 */

const privacyRules = {
    // UNIVERSAL LAUNCH QUESTIONS (10 questions)
    // Friends, family, personal relationships - NOT workplace shareable
    universal_launch: {
        employerShareable: false,  // Personal relationships only
        aggregationOnly: false,
        requiresK10: false,        // Not relevant - not shareable at all
        rationale: "Personal friend/family dynamics reveal character but are private"
    },

    // GROUP DYNAMICS QUESTIONS (30+ questions)
    // Workplace teams, meetings, collaboration - WORKPLACE SHAREABLE
    group_dynamics: {
        employerShareable: true,   // Team dynamics are workplace-relevant
        aggregationOnly: false,    // Pattern distributions can be shown
        requiresK10: true,         // Must have 10+ respondents
        rationale: "Reveals how teams collaborate, make decisions, handle conflict"
    },

    // AUTHORITY RELATIONSHIPS QUESTIONS (34+ questions)
    // Boss, hierarchy, power dynamics - WORKPLACE SHAREABLE
    authority_relationships: {
        employerShareable: true,   // Authority patterns affect culture
        aggregationOnly: false,
        requiresK10: true,
        rationale: "Shows organizational authority climate, leadership effectiveness"
    },

    // CONFLICT PATTERNS QUESTIONS (25+ questions)
    // How people handle disagreements - WORKPLACE SHAREABLE
    conflict_patterns: {
        employerShareable: true,   // Conflict styles affect team health
        aggregationOnly: false,
        requiresK10: true,
        rationale: "Team conflict patterns indicate cultural norms, psychological safety"
    },

    // CREATIVE EXPRESSION QUESTIONS (12+ questions)
    // Innovation, risk-taking, idea sharing - WORKPLACE SHAREABLE
    creative_expression: {
        employerShareable: true,   // Creativity climate affects innovation
        aggregationOnly: false,
        requiresK10: true,
        rationale: "Shows whether culture encourages innovation and risk-taking"
    },

    // TRUST & VULNERABILITY QUESTIONS (15+ questions)
    // Openness, sharing concerns, asking for help - WORKPLACE SHAREABLE
    trust_vulnerability: {
        employerShareable: true,   // Trust patterns affect team safety
        aggregationOnly: false,
        requiresK10: true,
        rationale: "Reveals psychological safety and trust levels in teams"
    },

    // DISCIPLINE & IMPULSE QUESTIONS (15+ questions)
    // Planning, follow-through, self-control - WORKPLACE SHAREABLE
    discipline_impulse: {
        employerShareable: true,   // Work patterns affect productivity
        aggregationOnly: false,
        requiresK10: true,
        rationale: "Shows organizational support for planning and execution"
    },

    // THRIVE-SPECIFIC DIMENSIONS
    // These map to THRIVE's holistic wellness model

    thrive_time: {
        employerShareable: true,   // Time management affects work performance
        aggregationOnly: true,     // Employer sees % struggling with time, not details
        requiresK10: true,
        rationale: "Reveals structural time pressures without exposing personal schedules"
    },

    thrive_health: {
        employerShareable: false,  // Personal health is private
        aggregationOnly: false,
        requiresK10: false,
        rationale: "Health information is protected, employee-only"
    },

    thrive_relationships: {
        employerShareable: false,  // Personal relationships are private
        aggregationOnly: false,
        requiresK10: false,
        rationale: "Intimate relationships are not workplace business"
    },

    thrive_identity: {
        employerShareable: false,  // Personal identity exploration is private
        aggregationOnly: false,
        requiresK10: false,
        rationale: "Who you are outside work is personal"
    },

    thrive_vitality: {
        employerShareable: true,   // Energy levels affect work
        aggregationOnly: true,     // Employer sees % reporting low energy, not why
        requiresK10: true,
        rationale: "Work energy patterns indicate burnout risk without exposing causes"
    },

    thrive_environment: {
        employerShareable: true,   // Home→work influence is relevant
        aggregationOnly: true,     // Employer sees % affected by home stress, not details
        requiresK10: true,
        rationale: "Shows extent of home environment impact on work without specifics"
    }
};

/**
 * SPECIAL CASE: HOME → WORK INFLUENCE QUESTIONS
 *
 * These questions measure how home environment affects work performance.
 * Employee gets: Specific insights, personal action plan
 * Employer gets: Aggregated % only (e.g., "42% report childcare unpredictability affects focus")
 */
const homeWorkInfluenceRules = {
    employerShareable: true,       // Yes, this IS workplace-relevant
    aggregationOnly: true,         // But ONLY as aggregated %
    requiresK10: true,             // Minimum 10 respondents
    individualAccess: 'full',      // Employee gets complete personal insight
    employerAccess: 'percentage',  // Employer gets % affected, not stories

    exampleQuestions: [
        {
            id: 'HW001',
            text: 'How often does stress at home make it hard to focus at work?',
            employeeSees: 'Your home stress impacts work focus 67% of the time. Here are strategies...',
            employerSees: '34% of team (12/35) report home stress significantly affects work focus'
        },
        {
            id: 'HW002',
            text: 'Does unpredictable childcare affect your work preparation?',
            employeeSees: 'Childcare unpredictability is your #1 work energy drain. Consider...',
            employerSees: '18% of team (8/44) report childcare unpredictability as major factor'
        },
        {
            id: 'HW003',
            text: 'Do eldercare responsibilities impact your work energy?',
            employeeSees: 'Eldercare stress is affecting your resilience. Resources include...',
            employerSees: '12% of team (5/42) report eldercare responsibilities affect work energy'
        }
    ]
};

/**
 * QUESTION TAGGING INTERFACE
 *
 * Every question in the system should be tagged with this structure:
 */
const questionTagTemplate = {
    id: 'AR001',                           // Unique question ID
    scenario: 'Your boss asks...',         // Question text
    category: 'workplace_authority',       // Category for analysis

    dataAccess: {
        employee: true,                    // ALWAYS true - employees own their data
        employerShareable: true,           // Can employer see aggregated data?
        aggregationOnly: false,            // Only % or full patterns?
        requiresK10: true,                 // Needs 10+ respondents?
        privacyCategory: 'authority_relationships'  // Links to privacyRules above
    },

    oceanMapping: {
        patterns: ['principled_resistor', 'collaborative_problem_solver'],
        dimensions: { O: +1, C: +1, E: 0, A: -1, N: 0 }
    },

    reveals: ['authority_deference', 'principle_vs_security', 'workplace_courage']
};

/**
 * K>10 ENFORCEMENT
 *
 * Hard-coded rules that cannot be bypassed:
 */
const k10Enforcement = {
    MINIMUM_RESPONDENTS: 10,

    // Check before allowing employer access to ANY aggregated data
    validateAccess: function(groupData) {
        if (groupData.respondentCount < this.MINIMUM_RESPONDENTS) {
            return {
                allowed: false,
                reason: `Privacy threshold not met. Need ${this.MINIMUM_RESPONDENTS} respondents, have ${groupData.respondentCount}`,
                employerMessage: 'Insufficient sample size to protect employee privacy (minimum 10 respondents required)'
            };
        }
        return {
            allowed: true,
            respondentCount: groupData.respondentCount
        };
    },

    // No bypass, no exceptions
    allowBypass: false,
    hardCodedMinimum: 10,

    // Audit log for compliance
    logAccess: function(employerId, teamId, respondentCount, timestamp) {
        return {
            event: 'EMPLOYER_DATA_ACCESS',
            employerId,
            teamId,
            respondentCount,
            metThreshold: respondentCount >= this.MINIMUM_RESPONDENTS,
            timestamp
        };
    }
};

/**
 * DATA FLOW ARCHITECTURE
 *
 * Question → Answer → Pattern Recognition → Dual Storage
 *   ↓
 * individuals_table (full data, employee-only)
 *   ↓
 * Nightly aggregation job (if employerShareable === true)
 *   ↓
 * Check respondentCount >= 10
 *   ↓
 * aggregated_workplace_table (employer-accessible)
 */

// Export all rules and templates
export {
    privacyRules,
    homeWorkInfluenceRules,
    questionTagTemplate,
    k10Enforcement
};
