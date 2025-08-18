// THRIVE RELATIONSHIPS DIMENSION QUESTIONS  
// Connection, communication, team dynamics, and social support
// Hidden OCEAN: Extraversion (social), Agreeableness (cooperation), Neuroticism (conflict)

const thriveRelationshipsQuestions = [
    {
        id: 'REL001',
        scenario: 'In team meetings, you typically:',
        options: [
            { text: 'Actively contribute ideas and opinions', domain: 'relationships', pattern_type: 'active_contributor', ocean: { E: 0.8, O: 0.6, A: 0.4 } },
            { text: 'Listen and speak when directly asked', domain: 'relationships', pattern_type: 'passive_participant', ocean: { E: -0.5, A: 0.5, N: 0.3 } },
            { text: 'Dominate the conversation', domain: 'relationships', pattern_type: 'conversation_dominator', ocean: { E: 0.9, A: -0.4, C: 0.3 } },
            { text: 'Contribute selectively on topics I know well', domain: 'relationships', pattern_type: 'selective_contributor', ocean: { C: 0.6, E: 0.2, O: 0.4 } }
        ],
        reveals: ['team_participation', 'communication_style', 'group_dynamics'],
        category: 'team_interaction'
    },
    
    {
        id: 'REL002', 
        scenario: 'When a colleague is struggling with their workload:',
        options: [
            { text: 'Offer help even if I\'m busy', domain: 'relationships', pattern_type: 'compulsive_helper', ocean: { A: 0.8, N: 0.3, C: -0.2 } },
            { text: 'Help if I have capacity', domain: 'relationships', pattern_type: 'balanced_supporter', ocean: { A: 0.6, C: 0.6, N: -0.2 } },
            { text: 'Focus on my own work', domain: 'relationships', pattern_type: 'self_focused', ocean: { A: -0.3, C: 0.5, E: -0.2 } },
            { text: 'Offer emotional support but not practical help', domain: 'relationships', pattern_type: 'emotional_supporter', ocean: { A: 0.7, E: 0.5, C: 0.2 } }
        ],
        reveals: ['helping_behavior', 'team_support', 'boundary_balance'],
        category: 'colleague_support'
    },
    
    {
        id: 'REL003',
        scenario: 'Your relationships with direct reports or team members:',
        options: [
            { text: 'Professional and task-focused', domain: 'relationships', pattern_type: 'professional_distance', ocean: { C: 0.7, E: -0.2, A: 0.2 } },
            { text: 'Friendly and personal', domain: 'relationships', pattern_type: 'personal_connector', ocean: { E: 0.7, A: 0.7, O: 0.5 } },
            { text: 'Varies by person', domain: 'relationships', pattern_type: 'selective_connector', ocean: { O: 0.6, A: 0.4, E: 0.3 } },
            { text: 'Struggle to connect', domain: 'relationships', pattern_type: 'connection_challenged', ocean: { E: -0.5, N: 0.5, A: -0.2 } }
        ],
        reveals: ['leadership_style', 'professional_boundaries', 'connection_ability'],
        category: 'team_relationships'
    },
    
    {
        id: 'REL004',
        scenario: 'When conflict arises with a colleague:',
        options: [
            { text: 'Address it directly and immediately', domain: 'relationships', pattern_type: 'direct_confronter', ocean: { E: 0.6, A: -0.2, C: 0.5, N: -0.3 } },
            { text: 'Avoid confrontation and hope it resolves', domain: 'relationships', pattern_type: 'conflict_avoider', ocean: { A: 0.3, N: 0.6, E: -0.4 } },
            { text: 'Process internally first, then address calmly', domain: 'relationships', pattern_type: 'thoughtful_resolver', ocean: { C: 0.7, N: -0.2, O: 0.5 } },
            { text: 'Involve a mediator or manager', domain: 'relationships', pattern_type: 'mediation_seeker', ocean: { N: 0.5, A: 0.5, E: -0.2 } }
        ],
        reveals: ['conflict_style', 'confrontation_comfort', 'resolution_approach'],
        category: 'conflict_management'
    },
    
    {
        id: 'REL005',
        scenario: 'Your work friendships are:',
        options: [
            { text: 'Deep and extend outside work', domain: 'relationships', pattern_type: 'work_friend_maker', ocean: { E: 0.8, A: 0.7, O: 0.6 } },
            { text: 'Friendly but stay at work', domain: 'relationships', pattern_type: 'workplace_boundary', ocean: { A: 0.5, C: 0.6, E: 0.3 } },
            { text: 'Minimal - I keep work and personal separate', domain: 'relationships', pattern_type: 'work_life_separator', ocean: { E: -0.4, C: 0.5, A: 0.1 } },
            { text: 'Would like more but struggle to build them', domain: 'relationships', pattern_type: 'connection_seeker', ocean: { E: -0.2, N: 0.5, A: 0.6 } }
        ],
        reveals: ['workplace_friendships', 'social_needs', 'boundary_preferences'],
        category: 'work_friendships'
    },
    
    {
        id: 'REL006',
        scenario: 'In collaborative projects, you:',
        options: [
            { text: 'Take charge and coordinate others', domain: 'relationships', pattern_type: 'natural_coordinator', ocean: { E: 0.7, C: 0.8, A: 0.2 } },
            { text: 'Contribute equally and cooperatively', domain: 'relationships', pattern_type: 'equal_collaborator', ocean: { A: 0.8, C: 0.6, E: 0.5 } },
            { text: 'Prefer to work on my part independently', domain: 'relationships', pattern_type: 'independent_worker', ocean: { E: -0.4, C: 0.6, A: -0.2 } },
            { text: 'Go along with what others decide', domain: 'relationships', pattern_type: 'passive_follower', ocean: { A: 0.7, E: -0.3, N: 0.4 } }
        ],
        reveals: ['collaboration_style', 'leadership_tendency', 'team_role'],
        category: 'collaboration'
    },
    
    {
        id: 'REL007',
        scenario: 'When you need support at work:',
        options: [
            { text: 'Easily ask colleagues for help', domain: 'relationships', pattern_type: 'comfortable_asker', ocean: { E: 0.6, A: 0.6, N: -0.3 } },
            { text: 'Struggle alone rather than ask', domain: 'relationships', pattern_type: 'reluctant_asker', ocean: { E: -0.5, N: 0.5, C: 0.3 } },
            { text: 'Only ask those I trust completely', domain: 'relationships', pattern_type: 'selective_trust', ocean: { A: 0.3, N: 0.4, C: 0.4 } },
            { text: 'Ask for help strategically when needed', domain: 'relationships', pattern_type: 'strategic_asker', ocean: { C: 0.7, O: 0.5, N: -0.2 } }
        ],
        reveals: ['help_seeking', 'vulnerability', 'trust_levels'],
        category: 'support_seeking'
    },
    
    {
        id: 'REL008',
        scenario: 'Your communication style with colleagues is:',
        options: [
            { text: 'Direct and to the point', domain: 'relationships', pattern_type: 'direct_communicator', ocean: { C: 0.6, A: -0.2, E: 0.4 } },
            { text: 'Diplomatic and considerate', domain: 'relationships', pattern_type: 'diplomatic_communicator', ocean: { A: 0.8, C: 0.5, N: 0.2 } },
            { text: 'Varies based on the person', domain: 'relationships', pattern_type: 'adaptive_communicator', ocean: { O: 0.7, A: 0.5, E: 0.4 } },
            { text: 'Often misunderstood', domain: 'relationships', pattern_type: 'communication_struggler', ocean: { N: 0.6, A: -0.2, E: -0.3 } }
        ],
        reveals: ['communication_style', 'interpersonal_skills', 'social_awareness'],
        category: 'communication'
    },
    
    {
        id: 'REL009',
        scenario: 'Team social events and gatherings:',
        options: [
            { text: 'I organize and enthusiastically attend', domain: 'relationships', pattern_type: 'social_organizer', ocean: { E: 0.9, A: 0.7, O: 0.6 } },
            { text: 'Attend out of obligation', domain: 'relationships', pattern_type: 'reluctant_attender', ocean: { A: 0.5, E: -0.3, N: 0.4 } },
            { text: 'Enjoy them and always participate', domain: 'relationships', pattern_type: 'social_participant', ocean: { E: 0.7, A: 0.6, O: 0.5 } },
            { text: 'Avoid whenever possible', domain: 'relationships', pattern_type: 'social_avoider', ocean: { E: -0.7, N: 0.5, A: -0.2 } }
        ],
        reveals: ['social_engagement', 'team_bonding', 'introversion_extraversion'],
        category: 'social_events'
    },
    
    {
        id: 'REL010',
        scenario: 'Your reputation at work is likely:',
        options: [
            { text: 'The helpful team player', domain: 'relationships', pattern_type: 'team_player', ocean: { A: 0.8, C: 0.6, E: 0.5 } },
            { text: 'The competent professional', domain: 'relationships', pattern_type: 'competent_professional', ocean: { C: 0.8, A: 0.3, E: 0.2 } },
            { text: 'The creative innovator', domain: 'relationships', pattern_type: 'creative_innovator', ocean: { O: 0.9, E: 0.5, A: 0.3 } },
            { text: 'Not sure how others see me', domain: 'relationships', pattern_type: 'uncertain_reputation', ocean: { N: 0.6, E: -0.3, A: 0.4 } }
        ],
        reveals: ['workplace_identity', 'social_perception', 'self_awareness'],
        category: 'workplace_reputation'
    }
];

export { thriveRelationshipsQuestions };