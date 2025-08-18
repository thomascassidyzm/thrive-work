// THRIVE TIME DIMENSION QUESTIONS
// Rhythm, balance, and boundaries. Work-life integration and time management.
// Hidden OCEAN indicators: Conscientiousness (planning), Neuroticism (stress), Openness (flexibility)

const thriveTimeQuestions = [
    {
        id: 'TIME001',
        scenario: 'When you wake up on a workday, your first thought is usually:',
        options: [
            { text: 'What I need to accomplish today', domain: 'time', pattern_type: 'task_focused', ocean: { C: 0.8, N: 0.3 } },
            { text: 'How tired I still feel', domain: 'time', pattern_type: 'energy_depleted', ocean: { N: 0.7, E: -0.3 } },
            { text: 'Looking forward to specific parts of my day', domain: 'time', pattern_type: 'optimistic_planner', ocean: { E: 0.6, O: 0.5 } },
            { text: 'Checking messages to see what\'s waiting', domain: 'time', pattern_type: 'reactive_starter', ocean: { N: 0.5, C: -0.2 } }
        ],
        reveals: ['morning_mindset', 'work_anticipation', 'energy_levels'],
        category: 'daily_rhythm'
    },
    
    {
        id: 'TIME002',
        scenario: 'Your work calendar for next week is:',
        options: [
            { text: 'Carefully planned with buffer time between meetings', domain: 'time', pattern_type: 'structured_planner', ocean: { C: 0.9, N: -0.3 } },
            { text: 'Back-to-back meetings with no breathing room', domain: 'time', pattern_type: 'overcommitted', ocean: { C: 0.5, N: 0.6, A: 0.4 } },
            { text: 'Mostly empty - I schedule as things come up', domain: 'time', pattern_type: 'flexible_scheduler', ocean: { O: 0.7, C: -0.4 } },
            { text: 'A mix of planned meetings and open work time', domain: 'time', pattern_type: 'balanced_scheduler', ocean: { C: 0.6, O: 0.4 } }
        ],
        reveals: ['time_management', 'boundary_setting', 'planning_style'],
        category: 'scheduling'
    },
    
    {
        id: 'TIME003',
        scenario: 'When you finish work for the day, you:',
        options: [
            { text: 'Have a clear cutoff time and stick to it', domain: 'time', pattern_type: 'boundary_maintainer', ocean: { C: 0.7, N: -0.4 } },
            { text: 'Keep checking messages throughout the evening', domain: 'time', pattern_type: 'always_connected', ocean: { N: 0.7, C: 0.3 } },
            { text: 'Work until tasks are done, regardless of time', domain: 'time', pattern_type: 'task_completer', ocean: { C: 0.8, N: 0.4 } },
            { text: 'It varies depending on the day', domain: 'time', pattern_type: 'flexible_boundaries', ocean: { O: 0.6, A: 0.3 } }
        ],
        reveals: ['work_life_boundaries', 'disconnect_ability', 'completion_drive'],
        category: 'boundaries'
    },
    
    {
        id: 'TIME004',
        scenario: 'Your lunch break typically involves:',
        options: [
            { text: 'Eating at my desk while working', domain: 'time', pattern_type: 'non_stop_worker', ocean: { C: 0.6, N: 0.5, E: -0.3 } },
            { text: 'Taking a proper break away from work', domain: 'time', pattern_type: 'break_taker', ocean: { C: 0.5, N: -0.4, O: 0.4 } },
            { text: 'Quick meal then back to work', domain: 'time', pattern_type: 'minimal_breaker', ocean: { C: 0.7, N: 0.3 } },
            { text: 'Social time with colleagues', domain: 'time', pattern_type: 'social_breaker', ocean: { E: 0.8, A: 0.5 } }
        ],
        reveals: ['break_patterns', 'self_care', 'work_intensity'],
        category: 'breaks'
    },
    
    {
        id: 'TIME005',
        scenario: 'When multiple deadlines collide, you:',
        options: [
            { text: 'Create a priority matrix and tackle systematically', domain: 'time', pattern_type: 'systematic_prioritizer', ocean: { C: 0.9, N: -0.2 } },
            { text: 'Feel overwhelmed and struggle to start', domain: 'time', pattern_type: 'pressure_paralyzed', ocean: { N: 0.8, C: -0.3 } },
            { text: 'Work longer hours to get everything done', domain: 'time', pattern_type: 'time_extender', ocean: { C: 0.7, N: 0.5 } },
            { text: 'Negotiate deadlines and reset expectations', domain: 'time', pattern_type: 'boundary_negotiator', ocean: { A: 0.6, O: 0.5, N: -0.3 } }
        ],
        reveals: ['pressure_response', 'prioritization', 'stress_management'],
        category: 'deadline_management'
    },
    
    {
        id: 'TIME006',
        scenario: 'Your weekends are usually:',
        options: [
            { text: 'Completely work-free for recovery', domain: 'time', pattern_type: 'weekend_protector', ocean: { C: 0.6, N: -0.5, O: 0.4 } },
            { text: 'A mix of catch-up work and personal time', domain: 'time', pattern_type: 'weekend_mixer', ocean: { C: 0.5, N: 0.3, A: 0.4 } },
            { text: 'When I get ahead on work projects', domain: 'time', pattern_type: 'weekend_worker', ocean: { C: 0.8, N: 0.6, E: -0.3 } },
            { text: 'Scheduled with personal activities and commitments', domain: 'time', pattern_type: 'weekend_planner', ocean: { C: 0.7, E: 0.5, O: 0.4 } }
        ],
        reveals: ['work_life_balance', 'recovery_patterns', 'personal_time'],
        category: 'weekend_use'
    },
    
    {
        id: 'TIME007',
        scenario: 'When asked to take on additional work, you:',
        options: [
            { text: 'Usually say yes to be helpful', domain: 'time', pattern_type: 'yes_person', ocean: { A: 0.8, N: 0.4, C: 0.3 } },
            { text: 'Evaluate against current commitments first', domain: 'time', pattern_type: 'capacity_evaluator', ocean: { C: 0.8, N: -0.2 } },
            { text: 'Often say yes then regret it later', domain: 'time', pattern_type: 'overcommitter', ocean: { A: 0.7, N: 0.6, C: -0.2 } },
            { text: 'Have learned to say no when needed', domain: 'time', pattern_type: 'boundary_setter', ocean: { C: 0.6, N: -0.4, A: 0.2 } }
        ],
        reveals: ['boundary_setting', 'people_pleasing', 'capacity_awareness'],
        category: 'workload_management'
    },
    
    {
        id: 'TIME008',
        scenario: 'Your approach to email and messages is:',
        options: [
            { text: 'Respond immediately to everything', domain: 'time', pattern_type: 'instant_responder', ocean: { C: 0.5, N: 0.6, A: 0.5 } },
            { text: 'Check at specific times during the day', domain: 'time', pattern_type: 'batch_processor', ocean: { C: 0.9, N: -0.3 } },
            { text: 'Constantly monitoring but selective responding', domain: 'time', pattern_type: 'always_aware', ocean: { N: 0.5, C: 0.4 } },
            { text: 'Often behind on responses', domain: 'time', pattern_type: 'message_overwhelmed', ocean: { C: -0.3, N: 0.6, O: 0.3 } }
        ],
        reveals: ['communication_boundaries', 'interruption_management', 'response_pressure'],
        category: 'communication_time'
    },
    
    {
        id: 'TIME009',
        scenario: 'Your ideal workday would have:',
        options: [
            { text: 'Long stretches of uninterrupted focus time', domain: 'time', pattern_type: 'deep_work_seeker', ocean: { C: 0.7, E: -0.4, O: 0.5 } },
            { text: 'A variety of different activities and interactions', domain: 'time', pattern_type: 'variety_seeker', ocean: { O: 0.8, E: 0.6 } },
            { text: 'Clear structure with predictable routine', domain: 'time', pattern_type: 'routine_preferrer', ocean: { C: 0.8, O: -0.3, N: -0.2 } },
            { text: 'Flexibility to adapt as needs arise', domain: 'time', pattern_type: 'adaptive_worker', ocean: { O: 0.7, A: 0.5, C: 0.3 } }
        ],
        reveals: ['work_style_preference', 'structure_needs', 'ideal_rhythm'],
        category: 'work_preference'
    },
    
    {
        id: 'TIME010',
        scenario: 'At the end of a typical workday, you feel:',
        options: [
            { text: 'Satisfied with what I accomplished', domain: 'time', pattern_type: 'achievement_satisfied', ocean: { C: 0.7, N: -0.4, E: 0.3 } },
            { text: 'Exhausted and running on empty', domain: 'time', pattern_type: 'energy_depleted', ocean: { N: 0.7, E: -0.4 } },
            { text: 'Frustrated I didn\'t get more done', domain: 'time', pattern_type: 'never_enough', ocean: { C: 0.6, N: 0.6 } },
            { text: 'Ready to switch to personal time', domain: 'time', pattern_type: 'compartmentalizer', ocean: { C: 0.5, N: -0.3, O: 0.4 } }
        ],
        reveals: ['daily_satisfaction', 'energy_management', 'achievement_standards'],
        category: 'daily_reflection'
    }
];

export { thriveTimeQuestions };