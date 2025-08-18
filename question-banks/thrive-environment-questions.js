// THRIVE ENVIRONMENT DIMENSION QUESTIONS
// Context, culture, workspace, and organizational climate
// Hidden OCEAN: Agreeableness (culture fit), Openness (adaptability), Neuroticism (safety)

const thriveEnvironmentQuestions = [
    {
        id: 'ENV001',
        scenario: 'Your physical workspace:',
        options: [
            { text: 'Supports productivity and wellbeing', domain: 'environment', pattern_type: 'workspace_optimized', ocean: { C: 0.6, N: -0.4, O: 0.5 } },
            { text: 'Adequate but not ideal', domain: 'environment', pattern_type: 'workspace_acceptable', ocean: { A: 0.5, C: 0.4, N: 0.2 } },
            { text: 'Actively hinders my work', domain: 'environment', pattern_type: 'workspace_problematic', ocean: { N: 0.6, C: -0.3, O: 0.3 } },
            { text: 'Constantly changing (remote/office)', domain: 'environment', pattern_type: 'workspace_fluid', ocean: { O: 0.7, N: 0.3, C: 0.2 } }
        ],
        reveals: ['workspace_quality', 'environmental_support', 'productivity_factors'],
        category: 'physical_workspace'
    },
    
    {
        id: 'ENV002',
        scenario: 'The culture at your workplace feels:',
        options: [
            { text: 'Supportive and collaborative', domain: 'environment', pattern_type: 'culture_positive', ocean: { A: 0.7, E: 0.6, N: -0.4 } },
            { text: 'Competitive and challenging', domain: 'environment', pattern_type: 'culture_competitive', ocean: { C: 0.6, A: -0.2, N: 0.4 } },
            { text: 'Toxic or dysfunctional', domain: 'environment', pattern_type: 'culture_toxic', ocean: { N: 0.8, A: -0.3, E: -0.4 } },
            { text: 'Neutral or undefined', domain: 'environment', pattern_type: 'culture_absent', ocean: { O: 0.3, A: 0.3, N: 0.3 } }
        ],
        reveals: ['culture_quality', 'workplace_atmosphere', 'cultural_fit'],
        category: 'organizational_culture'
    },
    
    {
        id: 'ENV003',
        scenario: 'Psychological safety at work (ability to speak up, make mistakes):',
        options: [
            { text: 'Feel completely safe to be honest', domain: 'environment', pattern_type: 'psychologically_safe', ocean: { N: -0.5, E: 0.6, O: 0.7 } },
            { text: 'Safe with certain people only', domain: 'environment', pattern_type: 'selective_safety', ocean: { N: 0.3, A: 0.4, C: 0.4 } },
            { text: 'Have to be very careful', domain: 'environment', pattern_type: 'guarded_environment', ocean: { N: 0.6, A: 0.2, E: -0.3 } },
            { text: 'Feel unsafe to express myself', domain: 'environment', pattern_type: 'psychologically_unsafe', ocean: { N: 0.8, E: -0.5, A: -0.2 } }
        ],
        reveals: ['psychological_safety', 'expression_freedom', 'trust_environment'],
        category: 'psychological_safety'
    },
    
    {
        id: 'ENV004',
        scenario: 'Leadership at your organization:',
        options: [
            { text: 'Inspiring and supportive', domain: 'environment', pattern_type: 'leadership_positive', ocean: { A: 0.6, C: 0.6, N: -0.4 } },
            { text: 'Competent but distant', domain: 'environment', pattern_type: 'leadership_distant', ocean: { C: 0.5, A: 0.2, E: -0.2 } },
            { text: 'Inconsistent or confusing', domain: 'environment', pattern_type: 'leadership_inconsistent', ocean: { N: 0.6, O: 0.3, C: -0.2 } },
            { text: 'Problematic or toxic', domain: 'environment', pattern_type: 'leadership_toxic', ocean: { N: 0.8, A: -0.3, C: -0.3 } }
        ],
        reveals: ['leadership_quality', 'management_support', 'organizational_trust'],
        category: 'leadership_environment'
    },
    
    {
        id: 'ENV005',
        scenario: 'Resources and tools provided for your work:',
        options: [
            { text: 'Everything I need and more', domain: 'environment', pattern_type: 'well_resourced', ocean: { C: 0.6, N: -0.4, O: 0.4 } },
            { text: 'Adequate for basic needs', domain: 'environment', pattern_type: 'basically_resourced', ocean: { A: 0.5, C: 0.4, N: 0.2 } },
            { text: 'Constantly fighting for resources', domain: 'environment', pattern_type: 'resource_struggling', ocean: { N: 0.6, C: -0.2, A: -0.2 } },
            { text: 'Severely under-resourced', domain: 'environment', pattern_type: 'resource_deprived', ocean: { N: 0.7, C: -0.4, E: -0.3 } }
        ],
        reveals: ['resource_availability', 'organizational_support', 'tool_adequacy'],
        category: 'resources'
    },
    
    {
        id: 'ENV006',
        scenario: 'Communication flow in your organization:',
        options: [
            { text: 'Clear, transparent, and timely', domain: 'environment', pattern_type: 'communication_excellent', ocean: { C: 0.6, A: 0.5, N: -0.4 } },
            { text: 'Mostly effective', domain: 'environment', pattern_type: 'communication_adequate', ocean: { C: 0.5, A: 0.4, N: 0.2 } },
            { text: 'Often unclear or delayed', domain: 'environment', pattern_type: 'communication_poor', ocean: { N: 0.5, C: -0.2, O: 0.3 } },
            { text: 'Chaotic or non-existent', domain: 'environment', pattern_type: 'communication_broken', ocean: { N: 0.7, C: -0.4, A: -0.2 } }
        ],
        reveals: ['communication_quality', 'information_flow', 'organizational_clarity'],
        category: 'communication_environment'
    },
    
    {
        id: 'ENV007',
        scenario: 'Recognition and appreciation at work:',
        options: [
            { text: 'Regularly recognized for contributions', domain: 'environment', pattern_type: 'well_recognized', ocean: { E: 0.5, A: 0.5, N: -0.4 } },
            { text: 'Occasionally acknowledged', domain: 'environment', pattern_type: 'sometimes_recognized', ocean: { A: 0.4, C: 0.4, N: 0.2 } },
            { text: 'Rarely or never recognized', domain: 'environment', pattern_type: 'under_recognized', ocean: { N: 0.6, E: -0.3, A: 0.2 } },
            { text: 'Only criticized, never praised', domain: 'environment', pattern_type: 'criticism_only', ocean: { N: 0.8, E: -0.4, A: -0.3 } }
        ],
        reveals: ['recognition_culture', 'appreciation', 'positive_reinforcement'],
        category: 'recognition'
    },
    
    {
        id: 'ENV008',
        scenario: 'Change and uncertainty in your workplace:',
        options: [
            { text: 'Well-managed with clear communication', domain: 'environment', pattern_type: 'change_managed', ocean: { C: 0.6, O: 0.5, N: -0.3 } },
            { text: 'Frequent but I adapt well', domain: 'environment', pattern_type: 'change_adaptive', ocean: { O: 0.8, N: 0.2, C: 0.4 } },
            { text: 'Constant and stressful', domain: 'environment', pattern_type: 'change_overwhelming', ocean: { N: 0.7, O: 0.2, C: -0.3 } },
            { text: 'Chaotic and poorly handled', domain: 'environment', pattern_type: 'change_chaotic', ocean: { N: 0.8, C: -0.4, A: -0.2 } }
        ],
        reveals: ['change_management', 'uncertainty_handling', 'stability'],
        category: 'organizational_change'
    },
    
    {
        id: 'ENV009',
        scenario: 'Diversity and inclusion at your workplace:',
        options: [
            { text: 'Genuinely inclusive and diverse', domain: 'environment', pattern_type: 'inclusive_environment', ocean: { O: 0.7, A: 0.6, N: -0.3 } },
            { text: 'Trying but room for improvement', domain: 'environment', pattern_type: 'inclusion_developing', ocean: { O: 0.5, A: 0.5, C: 0.4 } },
            { text: 'Surface-level diversity only', domain: 'environment', pattern_type: 'inclusion_superficial', ocean: { N: 0.4, O: 0.3, A: 0.2 } },
            { text: 'Exclusionary or discriminatory', domain: 'environment', pattern_type: 'exclusionary_environment', ocean: { N: 0.7, A: -0.3, O: 0.2 } }
        ],
        reveals: ['inclusion_quality', 'diversity_reality', 'belonging_environment'],
        category: 'diversity_inclusion'
    },
    
    {
        id: 'ENV010',
        scenario: 'Overall, your work environment:',
        options: [
            { text: 'Energizes and supports me', domain: 'environment', pattern_type: 'environment_supportive', ocean: { E: 0.6, N: -0.5, O: 0.6 } },
            { text: 'Neither helps nor hinders', domain: 'environment', pattern_type: 'environment_neutral', ocean: { N: 0.2, C: 0.4, A: 0.4 } },
            { text: 'Drains my energy', domain: 'environment', pattern_type: 'environment_draining', ocean: { N: 0.7, E: -0.4, C: -0.2 } },
            { text: 'Actively harmful to wellbeing', domain: 'environment', pattern_type: 'environment_toxic', ocean: { N: 0.9, E: -0.5, A: -0.3 } }
        ],
        reveals: ['environmental_impact', 'workplace_effect', 'overall_environment'],
        category: 'environmental_assessment'
    }
];

export { thriveEnvironmentQuestions };