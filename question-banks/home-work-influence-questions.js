// HOME → WORK INFLUENCE QUESTIONS
// Special privacy handling: aggregationOnly = true
//
// 🔒 PRIVACY MODEL:
// - Employee sees: Specific personal insights, correlations, action plan
// - Employer sees: Aggregated % only (e.g., "42% report childcare affects focus")
// - Requires k>10 for employer access

const homeWorkInfluenceQuestions = [
    // CHILDCARE UNPREDICTABILITY
    {
        id: 'HW001',
        category: 'home_work_influence',
        scenario: 'How often does unpredictable childcare (sick days, schedule changes, etc.) affect your ability to prepare for work?',
        options: [
            {
                text: 'Never or rarely - childcare is stable and predictable',
                domain: 'home_environment',
                pattern_type: 'stable_home_base',
                severity: 0
            },
            {
                text: 'Occasionally - a few times per month',
                domain: 'home_environment',
                pattern_type: 'minor_home_stressor',
                severity: 1
            },
            {
                text: 'Frequently - at least weekly',
                domain: 'home_environment',
                pattern_type: 'moderate_home_stressor',
                severity: 2
            },
            {
                text: 'Constantly - it\'s a major source of work stress',
                domain: 'home_environment',
                pattern_type: 'major_home_stressor',
                severity: 3
            },
            {
                text: 'Not applicable - no childcare responsibilities',
                domain: 'home_environment',
                pattern_type: 'not_applicable',
                severity: null
            }
        ],
        reveals: ['home_work_energy_impact', 'childcare_stress', 'work_preparation_barriers'],

        // 🔒 CRITICAL PRIVACY SETTINGS
        dataAccess: {
            employee: true,              // Employee gets full insight
            employerShareable: true,     // Employer can see aggregated data
            aggregationOnly: true,       // Employer ONLY sees % affected
            requiresK10: true,          // Must have 10+ respondents
            privacyCategory: 'thrive_environment'
        },

        // What each role sees:
        employeeView: {
            insight: 'Childcare unpredictability is {{affecting}} your work preparation. Impact level: {{severity}}/3',
            actionPlan: [
                'Create backup childcare plan for emergencies',
                'Discuss flexible work arrangements with manager',
                'Build buffer time into morning routine',
                'Connect with other working parents for support network'
            ]
        },
        employerView: {
            aggregatedOnly: true,
            sampleInsight: '{{percentage}}% of team ({{count}}/{{total}}) report childcare unpredictability affects work preparation',
            noIndividualDetails: true
        }
    },

    // ELDERCARE RESPONSIBILITIES
    {
        id: 'HW002',
        category: 'home_work_influence',
        scenario: 'Do eldercare responsibilities impact your energy available for work?',
        options: [
            {
                text: 'No eldercare responsibilities',
                domain: 'home_environment',
                pattern_type: 'not_applicable',
                severity: null
            },
            {
                text: 'Have responsibilities but they don\'t affect work',
                domain: 'home_environment',
                pattern_type: 'managed_home_responsibility',
                severity: 0
            },
            {
                text: 'Sometimes affects my energy - a few times per month',
                domain: 'home_environment',
                pattern_type: 'minor_home_stressor',
                severity: 1
            },
            {
                text: 'Regularly affects my energy - at least weekly',
                domain: 'home_environment',
                pattern_type: 'moderate_home_stressor',
                severity: 2
            },
            {
                text: 'Significantly drains my work energy most days',
                domain: 'home_environment',
                pattern_type: 'major_home_stressor',
                severity: 3
            }
        ],
        reveals: ['home_work_energy_impact', 'eldercare_burden', 'resilience_drain'],

        dataAccess: {
            employee: true,
            employerShareable: true,
            aggregationOnly: true,      // 🔒 Employer sees % only
            requiresK10: true,
            privacyCategory: 'thrive_environment'
        },

        employeeView: {
            insight: 'Eldercare responsibilities are {{impacting}} your work energy at level {{severity}}/3',
            actionPlan: [
                'Research eldercare resources and support services',
                'Discuss flexible schedule needs with manager',
                'Set boundaries around emergency availability',
                'Join eldercare support group for coping strategies'
            ]
        },
        employerView: {
            aggregatedOnly: true,
            sampleInsight: '{{percentage}}% of team report eldercare responsibilities impact work energy',
            recommendation: 'Consider eldercare support benefits or flexible scheduling policies'
        }
    },

    // FINANCIAL STRESS
    {
        id: 'HW003',
        category: 'home_work_influence',
        scenario: 'How often does financial stress at home make it hard to focus at work?',
        options: [
            {
                text: 'Never - finances are stable',
                domain: 'home_environment',
                pattern_type: 'stable_home_base',
                severity: 0
            },
            {
                text: 'Occasionally - during bill payment times',
                domain: 'home_environment',
                pattern_type: 'minor_home_stressor',
                severity: 1
            },
            {
                text: 'Frequently - at least weekly',
                domain: 'home_environment',
                pattern_type: 'moderate_home_stressor',
                severity: 2
            },
            {
                text: 'Constantly - it\'s always on my mind',
                domain: 'home_environment',
                pattern_type: 'major_home_stressor',
                severity: 3
            }
        ],
        reveals: ['home_work_focus_impact', 'financial_anxiety', 'cognitive_load'],

        dataAccess: {
            employee: true,
            employerShareable: true,
            aggregationOnly: true,      // 🔒 Employer sees % only, NOT specific financial details
            requiresK10: true,
            privacyCategory: 'thrive_environment'
        },

        employeeView: {
            insight: 'Financial stress is affecting your work focus at level {{severity}}/3',
            actionPlan: [
                'Connect with financial counseling resources',
                'Create budget visibility system',
                'Discuss pay timing or advance options with HR',
                'Separate work hours from financial planning time'
            ]
        },
        employerView: {
            aggregatedOnly: true,
            sampleInsight: '{{percentage}}% of team report financial stress affects work focus',
            recommendation: 'Consider financial wellness programs or pay timing flexibility'
        }
    },

    // RELATIONSHIP STRESS
    {
        id: 'HW004',
        category: 'home_work_influence',
        scenario: 'Does stress from personal relationships at home affect your work performance?',
        options: [
            {
                text: 'No - my relationships are supportive',
                domain: 'home_environment',
                pattern_type: 'stable_home_base',
                severity: 0
            },
            {
                text: 'Occasionally - during conflicts',
                domain: 'home_environment',
                pattern_type: 'minor_home_stressor',
                severity: 1
            },
            {
                text: 'Frequently - ongoing tension affects my focus',
                domain: 'home_environment',
                pattern_type: 'moderate_home_stressor',
                severity: 2
            },
            {
                text: 'Constantly - relationship stress is overwhelming',
                domain: 'home_environment',
                pattern_type: 'major_home_stressor',
                severity: 3
            }
        ],
        reveals: ['home_work_performance_impact', 'relationship_strain', 'emotional_spillover'],

        dataAccess: {
            employee: true,
            employerShareable: true,
            aggregationOnly: true,      // 🔒 Employer sees % affected, NOT relationship details
            requiresK10: true,
            privacyCategory: 'thrive_environment'
        },

        employeeView: {
            insight: 'Relationship stress is impacting your work at level {{severity}}/3',
            actionPlan: [
                'Consider couples counseling or relationship support',
                'Create boundaries between home stress and work time',
                'Practice emotional regulation techniques',
                'Connect with Employee Assistance Program (EAP) resources'
            ]
        },
        employerView: {
            aggregatedOnly: true,
            sampleInsight: '{{percentage}}% of team report relationship stress affects work performance',
            recommendation: 'Ensure EAP benefits are well-communicated and accessible'
        }
    },

    // HOUSING INSTABILITY
    {
        id: 'HW005',
        category: 'home_work_influence',
        scenario: 'Does housing insecurity or instability affect your ability to show up fully at work?',
        options: [
            {
                text: 'No - housing is stable',
                domain: 'home_environment',
                pattern_type: 'stable_home_base',
                severity: 0
            },
            {
                text: 'Minor concerns - sometimes worried about rent/mortgage',
                domain: 'home_environment',
                pattern_type: 'minor_home_stressor',
                severity: 1
            },
            {
                text: 'Moderate concerns - housing situation is uncertain',
                domain: 'home_environment',
                pattern_type: 'moderate_home_stressor',
                severity: 2
            },
            {
                text: 'Severe concerns - housing instability is critical',
                domain: 'home_environment',
                pattern_type: 'major_home_stressor',
                severity: 3
            }
        ],
        reveals: ['home_work_presence_impact', 'housing_anxiety', 'basic_needs_security'],

        dataAccess: {
            employee: true,
            employerShareable: true,
            aggregationOnly: true,      // 🔒 Employer sees %, NOT housing details
            requiresK10: true,
            privacyCategory: 'thrive_environment'
        },

        employeeView: {
            insight: 'Housing concerns are affecting your work presence at level {{severity}}/3',
            actionPlan: [
                'Connect with housing assistance programs',
                'Discuss pay advance or housing subsidy options',
                'Research emergency housing resources',
                'Create housing stability plan with counselor'
            ]
        },
        employerView: {
            aggregatedOnly: true,
            sampleInsight: '{{percentage}}% of team report housing concerns affect work presence',
            recommendation: 'Consider housing assistance benefits or pay structure adjustments'
        }
    },

    // COMMUTE STRESS
    {
        id: 'HW006',
        category: 'home_work_influence',
        scenario: 'How much does your commute drain your energy before work even starts?',
        options: [
            {
                text: 'Not at all - short or pleasant commute',
                domain: 'home_environment',
                pattern_type: 'stable_home_base',
                severity: 0
            },
            {
                text: 'Slightly - manageable but not ideal',
                domain: 'home_environment',
                pattern_type: 'minor_home_stressor',
                severity: 1
            },
            {
                text: 'Significantly - arrives already drained',
                domain: 'home_environment',
                pattern_type: 'moderate_home_stressor',
                severity: 2
            },
            {
                text: 'Severely - commute is exhausting and affects performance',
                domain: 'home_environment',
                pattern_type: 'major_home_stressor',
                severity: 3
            }
        ],
        reveals: ['home_work_energy_impact', 'commute_burden', 'arrival_state'],

        dataAccess: {
            employee: true,
            employerShareable: true,
            aggregationOnly: true,      // 🔒 Employer sees % affected by commute
            requiresK10: true,
            privacyCategory: 'thrive_environment'
        },

        employeeView: {
            insight: 'Your commute is draining your work energy at level {{severity}}/3',
            actionPlan: [
                'Explore remote work options for some days',
                'Research alternative commute routes',
                'Create energizing commute routine (podcast, audiobook, meditation)',
                'Discuss flexible start times to avoid peak traffic'
            ]
        },
        employerView: {
            aggregatedOnly: true,
            sampleInsight: '{{percentage}}% of team report commute significantly drains work energy',
            recommendation: 'Consider remote work flexibility or transit subsidies'
        }
    }
];

// Pattern type descriptions for home→work influence
const homeWorkPatterns = {
    'stable_home_base': {
        observation: 'Your home environment is stable and supportive of your work',
        strength: 'This stability is a significant asset for work performance',
        maintenance: 'Continue maintaining these supportive home structures'
    },
    'minor_home_stressor': {
        observation: 'Occasional home stressors affect your work',
        impact: 'These are manageable but worth addressing',
        action: 'Small adjustments can prevent escalation'
    },
    'moderate_home_stressor': {
        observation: 'Regular home stressors are affecting your work capacity',
        impact: 'This is creating consistent energy drain',
        action: 'Proactive support and resources needed'
    },
    'major_home_stressor': {
        observation: 'Significant home stressors are heavily impacting work',
        impact: 'This requires immediate attention and support',
        action: 'Connect with resources and discuss accommodations'
    }
};

export { homeWorkInfluenceQuestions, homeWorkPatterns };
