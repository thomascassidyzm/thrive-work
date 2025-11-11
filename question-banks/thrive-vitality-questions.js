// THRIVE VITALITY DIMENSION QUESTIONS
// Energy, motivation, engagement, and burnout risk
// Hidden OCEAN: Extraversion (energy), Neuroticism (burnout), Openness (engagement)

const thriveVitalityQuestions = [
    {
        id: 'VIT001',
        scenario: 'Your motivation for work currently is:',
        options: [
            { text: 'High and driven by purpose', domain: 'vitality', pattern_type: 'purpose_motivated', ocean: { E: 0.7, O: 0.7, N: -0.4 } },
            { text: 'Purely financial necessity', domain: 'vitality', pattern_type: 'externally_motivated', ocean: { N: 0.5, E: -0.3, C: 0.3 } },
            { text: 'Variable day to day', domain: 'vitality', pattern_type: 'fluctuating_motivation', ocean: { N: 0.6, O: 0.4, C: -0.2 } },
            { text: 'Nearly non-existent', domain: 'vitality', pattern_type: 'motivation_depleted', ocean: { N: 0.8, E: -0.5, C: -0.4 } }
        ],
        reveals: ['motivation_level', 'engagement', 'burnout_risk'],
        category: 'work_motivation'
    },
    
    {
        id: 'VIT002',
        scenario: 'Monday mornings make you feel:',
        options: [
            { text: 'Excited for the week ahead', domain: 'vitality', pattern_type: 'week_enthusiast', ocean: { E: 0.8, O: 0.6, N: -0.5 } },
            { text: 'Neutral - just another day', domain: 'vitality', pattern_type: 'week_neutral', ocean: { N: 0.1, C: 0.5, E: 0.2 } },
            { text: 'Anxious about what\'s coming', domain: 'vitality', pattern_type: 'week_dreader', ocean: { N: 0.8, E: -0.3, C: 0.2 } },
            { text: 'Exhausted before it starts', domain: 'vitality', pattern_type: 'pre_exhausted', ocean: { N: 0.7, E: -0.5, C: -0.3 } }
        ],
        reveals: ['work_anticipation', 'energy_levels', 'emotional_state'],
        category: 'weekly_energy'
    },
    
    {
        id: 'VIT003',
        scenario: 'Your enthusiasm for new projects:',
        options: [
            { text: 'High - love new challenges', domain: 'vitality', pattern_type: 'challenge_seeker', ocean: { O: 0.9, E: 0.7, C: 0.5 } },
            { text: 'Depends on the project', domain: 'vitality', pattern_type: 'selective_enthusiast', ocean: { O: 0.6, C: 0.6, N: 0.2 } },
            { text: 'Low - feel overwhelmed already', domain: 'vitality', pattern_type: 'capacity_overwhelmed', ocean: { N: 0.7, E: -0.3, C: -0.2 } },
            { text: 'Gone - used to be enthusiastic', domain: 'vitality', pattern_type: 'enthusiasm_depleted', ocean: { N: 0.8, E: -0.4, O: -0.3 } }
        ],
        reveals: ['project_enthusiasm', 'capacity', 'burnout_stage'],
        category: 'work_enthusiasm'
    },
    
    {
        id: 'VIT004',
        scenario: 'Your energy after a typical workday:',
        options: [
            { text: 'Still have energy for personal activities', domain: 'vitality', pattern_type: 'energy_sustained', ocean: { E: 0.7, C: 0.6, N: -0.4 } },
            { text: 'Just enough for basic needs', domain: 'vitality', pattern_type: 'energy_minimal', ocean: { N: 0.5, E: -0.2, C: 0.3 } },
            { text: 'Completely drained', domain: 'vitality', pattern_type: 'energy_depleted', ocean: { N: 0.8, E: -0.5, C: -0.3 } },
            { text: 'Varies widely by day', domain: 'vitality', pattern_type: 'energy_variable', ocean: { O: 0.5, N: 0.4, C: 0.2 } }
        ],
        reveals: ['energy_sustainability', 'recovery_capacity', 'work_intensity'],
        category: 'daily_energy'
    },
    
    {
        id: 'VIT005',
        scenario: 'Your passion for your field of work:',
        options: [
            { text: 'Deeply passionate and engaged', domain: 'vitality', pattern_type: 'passion_driven', ocean: { O: 0.8, E: 0.7, C: 0.6 } },
            { text: 'Interested but not passionate', domain: 'vitality', pattern_type: 'moderate_interest', ocean: { O: 0.4, C: 0.5, N: 0.2 } },
            { text: 'Lost the passion I once had', domain: 'vitality', pattern_type: 'passion_lost', ocean: { N: 0.7, E: -0.3, O: -0.2 } },
            { text: 'Never had passion for it', domain: 'vitality', pattern_type: 'passion_absent', ocean: { O: -0.3, N: 0.5, C: 0.3 } }
        ],
        reveals: ['work_passion', 'field_engagement', 'career_satisfaction'],
        category: 'work_passion'
    },
    
    {
        id: 'VIT006',
        scenario: 'Signs of burnout you\'re experiencing:',
        options: [
            { text: 'None - feeling energized', domain: 'vitality', pattern_type: 'burnout_free', ocean: { N: -0.5, E: 0.7, C: 0.6 } },
            { text: 'Some early warning signs', domain: 'vitality', pattern_type: 'burnout_early', ocean: { N: 0.5, E: 0.2, C: 0.3 } },
            { text: 'Multiple clear symptoms', domain: 'vitality', pattern_type: 'burnout_active', ocean: { N: 0.8, E: -0.4, C: -0.3 } },
            { text: 'Severe burnout symptoms', domain: 'vitality', pattern_type: 'burnout_severe', ocean: { N: 0.9, E: -0.6, C: -0.5 } }
        ],
        reveals: ['burnout_level', 'symptom_awareness', 'intervention_need'],
        category: 'burnout_assessment'
    },
    
    {
        id: 'VIT007',
        scenario: 'Your creativity and innovation at work:',
        options: [
            { text: 'Flowing freely and abundantly', domain: 'vitality', pattern_type: 'creative_flowing', ocean: { O: 0.9, E: 0.6, N: -0.4 } },
            { text: 'Present but constrained', domain: 'vitality', pattern_type: 'creative_limited', ocean: { O: 0.6, N: 0.3, C: 0.4 } },
            { text: 'Blocked or stifled', domain: 'vitality', pattern_type: 'creative_blocked', ocean: { N: 0.6, O: 0.2, E: -0.3 } },
            { text: 'Don\'t have energy for creativity', domain: 'vitality', pattern_type: 'creative_exhausted', ocean: { N: 0.8, E: -0.5, O: -0.3 } }
        ],
        reveals: ['creative_energy', 'innovation_capacity', 'mental_resources'],
        category: 'creative_vitality'
    },
    
    {
        id: 'VIT008',
        scenario: 'Your sense of accomplishment at work:',
        options: [
            { text: 'Regularly feel accomplished', domain: 'vitality', pattern_type: 'achievement_satisfied', ocean: { C: 0.7, E: 0.5, N: -0.4 } },
            { text: 'Occasionally feel successful', domain: 'vitality', pattern_type: 'moderate_achievement', ocean: { C: 0.5, N: 0.2, O: 0.4 } },
            { text: 'Rarely feel I\'ve achieved anything', domain: 'vitality', pattern_type: 'achievement_lacking', ocean: { N: 0.7, C: -0.2, E: -0.3 } },
            { text: 'Can\'t remember last accomplishment', domain: 'vitality', pattern_type: 'achievement_disconnected', ocean: { N: 0.8, E: -0.5, C: -0.4 } }
        ],
        reveals: ['accomplishment_sense', 'success_recognition', 'fulfillment'],
        category: 'achievement_feeling'
    },
    
    {
        id: 'VIT009',
        scenario: 'Your engagement in meetings and discussions:',
        options: [
            { text: 'Actively engaged and contributing', domain: 'vitality', pattern_type: 'meeting_engaged', ocean: { E: 0.8, O: 0.6, C: 0.5 } },
            { text: 'Engaged when topic interests me', domain: 'vitality', pattern_type: 'selective_engagement', ocean: { O: 0.6, C: 0.4, N: 0.2 } },
            { text: 'Present but mentally checked out', domain: 'vitality', pattern_type: 'disengaged_present', ocean: { N: 0.6, E: -0.4, C: -0.2 } },
            { text: 'Actively avoid if possible', domain: 'vitality', pattern_type: 'meeting_avoider', ocean: { N: 0.7, E: -0.5, A: -0.2 } }
        ],
        reveals: ['meeting_engagement', 'participation_energy', 'workplace_connection'],
        category: 'engagement_level'
    },
    
    {
        id: 'VIT010',
        scenario: 'Your overall vitality compared to a year ago:',
        options: [
            { text: 'Much more energized now', domain: 'vitality', pattern_type: 'vitality_improving', ocean: { E: 0.7, O: 0.6, N: -0.5 } },
            { text: 'About the same', domain: 'vitality', pattern_type: 'vitality_stable', ocean: { C: 0.5, N: 0.1, E: 0.3 } },
            { text: 'Noticeably declining', domain: 'vitality', pattern_type: 'vitality_declining', ocean: { N: 0.7, E: -0.4, C: -0.2 } },
            { text: 'Dramatically worse', domain: 'vitality', pattern_type: 'vitality_depleted', ocean: { N: 0.9, E: -0.6, C: -0.4 } }
        ],
        reveals: ['vitality_trajectory', 'energy_trend', 'intervention_urgency'],
        category: 'vitality_trend'
    }
];

export { thriveVitalityQuestions };