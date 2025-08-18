// THRIVE IDENTITY DIMENSION QUESTIONS
// Purpose, values alignment, role clarity, and authentic expression
// Hidden OCEAN: Openness (authenticity), Conscientiousness (values), Neuroticism (identity confusion)

const thriveIdentityQuestions = [
    {
        id: 'ID001',
        scenario: 'Your current job role:',
        options: [
            { text: 'Perfectly aligns with my values and purpose', domain: 'identity', pattern_type: 'aligned_worker', ocean: { O: 0.7, C: 0.7, N: -0.5 } },
            { text: 'Pays the bills but lacks meaning', domain: 'identity', pattern_type: 'disconnected_worker', ocean: { N: 0.5, O: -0.3, A: 0.2 } },
            { text: 'Growing into alignment over time', domain: 'identity', pattern_type: 'evolving_alignment', ocean: { O: 0.6, C: 0.5, E: 0.4 } },
            { text: 'Conflicts with who I really am', domain: 'identity', pattern_type: 'misaligned_worker', ocean: { N: 0.7, O: 0.4, A: -0.2 } }
        ],
        reveals: ['values_alignment', 'purpose_connection', 'authenticity'],
        category: 'role_alignment'
    },
    
    {
        id: 'ID002',
        scenario: 'At work, you feel you can:',
        options: [
            { text: 'Be completely yourself', domain: 'identity', pattern_type: 'authentic_expresser', ocean: { O: 0.8, E: 0.6, N: -0.4 } },
            { text: 'Show a professional version of yourself', domain: 'identity', pattern_type: 'professional_mask', ocean: { C: 0.6, A: 0.5, N: 0.2 } },
            { text: 'Have to hide important parts of who you are', domain: 'identity', pattern_type: 'identity_hider', ocean: { N: 0.7, E: -0.4, A: 0.3 } },
            { text: 'Adapt based on the situation', domain: 'identity', pattern_type: 'adaptive_identity', ocean: { O: 0.6, A: 0.5, E: 0.3 } }
        ],
        reveals: ['authenticity_freedom', 'workplace_self', 'identity_expression'],
        category: 'workplace_authenticity'
    },
    
    {
        id: 'ID003',
        scenario: 'Your sense of professional identity is:',
        options: [
            { text: 'Clear and well-defined', domain: 'identity', pattern_type: 'clear_identity', ocean: { C: 0.7, O: 0.5, N: -0.4 } },
            { text: 'Still figuring it out', domain: 'identity', pattern_type: 'exploring_identity', ocean: { O: 0.7, N: 0.4, E: 0.3 } },
            { text: 'Shifts depending on context', domain: 'identity', pattern_type: 'fluid_identity', ocean: { O: 0.8, A: 0.5, N: 0.2 } },
            { text: 'Lost or confused', domain: 'identity', pattern_type: 'identity_confusion', ocean: { N: 0.8, C: -0.3, E: -0.3 } }
        ],
        reveals: ['identity_clarity', 'professional_self', 'role_confusion'],
        category: 'professional_identity'
    },
    
    {
        id: 'ID004',
        scenario: 'The work you do makes you feel:',
        options: [
            { text: 'Proud and fulfilled', domain: 'identity', pattern_type: 'purpose_driven', ocean: { C: 0.7, E: 0.5, N: -0.5 } },
            { text: 'Neutral - it\'s just a job', domain: 'identity', pattern_type: 'work_detached', ocean: { N: 0.2, A: 0.3, C: 0.4 } },
            { text: 'Like I\'m making a difference', domain: 'identity', pattern_type: 'impact_focused', ocean: { O: 0.7, A: 0.7, E: 0.5 } },
            { text: 'Empty or meaningless', domain: 'identity', pattern_type: 'meaning_lacking', ocean: { N: 0.7, E: -0.4, O: -0.2 } }
        ],
        reveals: ['work_meaning', 'purpose_fulfillment', 'impact_sense'],
        category: 'work_meaning'
    },
    
    {
        id: 'ID005',
        scenario: 'Your personal values and your company\'s values:',
        options: [
            { text: 'Strongly align', domain: 'identity', pattern_type: 'values_aligned', ocean: { C: 0.7, A: 0.6, N: -0.4 } },
            { text: 'Have some overlap', domain: 'identity', pattern_type: 'partial_alignment', ocean: { O: 0.5, A: 0.4, N: 0.2 } },
            { text: 'Often conflict', domain: 'identity', pattern_type: 'values_conflict', ocean: { N: 0.7, O: 0.4, A: -0.3 } },
            { text: 'I don\'t know the company values', domain: 'identity', pattern_type: 'values_disconnected', ocean: { O: -0.2, C: -0.3, N: 0.4 } }
        ],
        reveals: ['values_match', 'organizational_fit', 'ethical_alignment'],
        category: 'values_alignment'
    },
    
    {
        id: 'ID006',
        scenario: 'Your career trajectory feels:',
        options: [
            { text: 'Clear and purposeful', domain: 'identity', pattern_type: 'directed_path', ocean: { C: 0.8, O: 0.5, N: -0.4 } },
            { text: 'Uncertain but exciting', domain: 'identity', pattern_type: 'open_explorer', ocean: { O: 0.8, N: 0.3, E: 0.5 } },
            { text: 'Stuck or stagnant', domain: 'identity', pattern_type: 'career_stuck', ocean: { N: 0.7, E: -0.3, C: -0.2 } },
            { text: 'Driven by external expectations', domain: 'identity', pattern_type: 'externally_driven', ocean: { A: 0.6, N: 0.5, C: 0.3 } }
        ],
        reveals: ['career_direction', 'growth_sense', 'autonomy'],
        category: 'career_path'
    },
    
    {
        id: 'ID007',
        scenario: 'When asked to do something against your values:',
        options: [
            { text: 'Refuse and explain why', domain: 'identity', pattern_type: 'values_defender', ocean: { C: 0.7, A: -0.2, O: 0.6 } },
            { text: 'Do it but feel terrible', domain: 'identity', pattern_type: 'reluctant_compromiser', ocean: { N: 0.7, A: 0.5, C: -0.2 } },
            { text: 'Find a creative workaround', domain: 'identity', pattern_type: 'creative_navigator', ocean: { O: 0.8, C: 0.5, A: 0.4 } },
            { text: 'Do it without question', domain: 'identity', pattern_type: 'values_flexible', ocean: { A: 0.7, C: 0.3, N: 0.2 } }
        ],
        reveals: ['values_strength', 'integrity', 'moral_courage'],
        category: 'values_conflict'
    },
    
    {
        id: 'ID008',
        scenario: 'Your sense of belonging at work:',
        options: [
            { text: 'Feel like I truly belong', domain: 'identity', pattern_type: 'belonging_secure', ocean: { E: 0.6, A: 0.6, N: -0.5 } },
            { text: 'Feel like an outsider', domain: 'identity', pattern_type: 'outsider_feeling', ocean: { N: 0.7, E: -0.4, A: -0.2 } },
            { text: 'Belongs in some ways but not others', domain: 'identity', pattern_type: 'partial_belonging', ocean: { O: 0.5, N: 0.3, A: 0.4 } },
            { text: 'Don\'t need to belong', domain: 'identity', pattern_type: 'independent_identity', ocean: { E: -0.3, C: 0.5, O: 0.4 } }
        ],
        reveals: ['belonging_sense', 'cultural_fit', 'inclusion'],
        category: 'belonging'
    },
    
    {
        id: 'ID009',
        scenario: 'Your work persona vs. your true self:',
        options: [
            { text: 'They\'re the same person', domain: 'identity', pattern_type: 'integrated_self', ocean: { O: 0.8, C: 0.6, N: -0.4 } },
            { text: 'Slightly different but compatible', domain: 'identity', pattern_type: 'adaptive_authentic', ocean: { O: 0.6, A: 0.5, C: 0.5 } },
            { text: 'Completely different people', domain: 'identity', pattern_type: 'split_identity', ocean: { N: 0.7, E: -0.3, A: 0.2 } },
            { text: 'Trying to merge them', domain: 'identity', pattern_type: 'integrating_self', ocean: { O: 0.7, N: 0.4, C: 0.4 } }
        ],
        reveals: ['authenticity_gap', 'persona_management', 'self_integration'],
        category: 'work_persona'
    },
    
    {
        id: 'ID010',
        scenario: 'The legacy you want to leave through your work:',
        options: [
            { text: 'Clear vision of my impact', domain: 'identity', pattern_type: 'legacy_focused', ocean: { O: 0.7, C: 0.7, A: 0.5 } },
            { text: 'Haven\'t thought about it', domain: 'identity', pattern_type: 'present_focused', ocean: { O: -0.2, C: 0.3, N: 0.3 } },
            { text: 'Want impact but unclear how', domain: 'identity', pattern_type: 'impact_seeker', ocean: { O: 0.6, N: 0.4, A: 0.5 } },
            { text: 'Don\'t believe my work matters', domain: 'identity', pattern_type: 'impact_disconnected', ocean: { N: 0.7, E: -0.3, O: -0.3 } }
        ],
        reveals: ['purpose_clarity', 'impact_drive', 'meaning_making'],
        category: 'legacy_impact'
    }
];

export { thriveIdentityQuestions };