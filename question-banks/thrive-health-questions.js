// THRIVE HEALTH DIMENSION QUESTIONS
// Physical and mental resilience. Energy, stress, and wellbeing.
// Hidden OCEAN indicators: Neuroticism (stress/anxiety), Conscientiousness (health habits), Extraversion (energy)

const thriveHealthQuestions = [
    {
        id: 'HEALTH001',
        scenario: 'Your energy levels throughout a typical workday:',
        options: [
            { text: 'Start strong but crash in the afternoon', domain: 'health', pattern_type: 'energy_crasher', ocean: { N: 0.5, C: -0.2 } },
            { text: 'Consistently steady throughout', domain: 'health', pattern_type: 'stable_energy', ocean: { C: 0.7, N: -0.4, E: 0.4 } },
            { text: 'Low most of the time', domain: 'health', pattern_type: 'chronic_fatigue', ocean: { N: 0.7, E: -0.5 } },
            { text: 'Highly variable depending on tasks', domain: 'health', pattern_type: 'task_dependent_energy', ocean: { O: 0.6, N: 0.3 } }
        ],
        reveals: ['energy_patterns', 'vitality', 'sustainability'],
        category: 'energy_management'
    },
    
    {
        id: 'HEALTH002',
        scenario: 'Your sleep pattern on work nights is:',
        options: [
            { text: 'Consistent bedtime and 7-8 hours', domain: 'health', pattern_type: 'good_sleeper', ocean: { C: 0.8, N: -0.5 } },
            { text: 'Often stay up late, wake up tired', domain: 'health', pattern_type: 'sleep_deprived', ocean: { C: -0.3, N: 0.6 } },
            { text: 'Trouble falling asleep due to racing thoughts', domain: 'health', pattern_type: 'anxious_sleeper', ocean: { N: 0.8, O: 0.3 } },
            { text: 'Varies widely depending on stress', domain: 'health', pattern_type: 'stress_affected_sleeper', ocean: { N: 0.6, C: -0.2 } }
        ],
        reveals: ['sleep_quality', 'stress_impact', 'recovery_ability'],
        category: 'sleep_patterns'
    },
    
    {
        id: 'HEALTH003',
        scenario: 'When you feel stressed at work, you:',
        options: [
            { text: 'Take a walk or brief break', domain: 'health', pattern_type: 'active_coper', ocean: { C: 0.6, N: -0.3, O: 0.5 } },
            { text: 'Push through and keep working', domain: 'health', pattern_type: 'stress_ignorer', ocean: { C: 0.7, N: 0.5 } },
            { text: 'Feel it building in your body (tension, headaches)', domain: 'health', pattern_type: 'somatic_stressor', ocean: { N: 0.8, C: -0.2 } },
            { text: 'Talk to a colleague for support', domain: 'health', pattern_type: 'social_coper', ocean: { E: 0.7, A: 0.6, N: 0.2 } }
        ],
        reveals: ['stress_coping', 'body_awareness', 'stress_management'],
        category: 'stress_response'
    },
    
    {
        id: 'HEALTH004',
        scenario: 'Your physical activity level is:',
        options: [
            { text: 'Regular exercise routine I maintain', domain: 'health', pattern_type: 'active_maintainer', ocean: { C: 0.8, N: -0.4, E: 0.5 } },
            { text: 'Want to exercise but rarely do', domain: 'health', pattern_type: 'intention_gap', ocean: { C: -0.3, N: 0.5, A: 0.3 } },
            { text: 'Too exhausted from work to exercise', domain: 'health', pattern_type: 'depleted_inactive', ocean: { N: 0.6, E: -0.4 } },
            { text: 'Sporadic - active phases then nothing', domain: 'health', pattern_type: 'inconsistent_exerciser', ocean: { O: 0.5, C: -0.2, N: 0.3 } }
        ],
        reveals: ['physical_activity', 'health_habits', 'energy_availability'],
        category: 'physical_activity'
    },
    
    {
        id: 'HEALTH005',
        scenario: 'Your eating habits during work are:',
        options: [
            { text: 'Planned meals at regular times', domain: 'health', pattern_type: 'structured_eater', ocean: { C: 0.8, N: -0.3 } },
            { text: 'Skip meals when busy', domain: 'health', pattern_type: 'meal_skipper', ocean: { C: -0.2, N: 0.5 } },
            { text: 'Stress eating or emotional eating', domain: 'health', pattern_type: 'emotional_eater', ocean: { N: 0.7, A: 0.3 } },
            { text: 'Grab whatever is quick and available', domain: 'health', pattern_type: 'convenience_eater', ocean: { C: -0.3, O: 0.2, N: 0.3 } }
        ],
        reveals: ['nutrition_habits', 'self_care', 'stress_eating'],
        category: 'nutrition'
    },
    
    {
        id: 'HEALTH006',
        scenario: 'Physical symptoms you experience from work stress:',
        options: [
            { text: 'Headaches and muscle tension', domain: 'health', pattern_type: 'tension_holder', ocean: { N: 0.7, C: 0.3 } },
            { text: 'Digestive issues or stomach problems', domain: 'health', pattern_type: 'gut_reactor', ocean: { N: 0.8, A: 0.3 } },
            { text: 'Rarely have physical symptoms', domain: 'health', pattern_type: 'resilient_body', ocean: { N: -0.5, C: 0.5, E: 0.4 } },
            { text: 'Fatigue and low energy', domain: 'health', pattern_type: 'energy_depleted', ocean: { N: 0.6, E: -0.4 } }
        ],
        reveals: ['somatic_stress', 'body_stress_response', 'physical_resilience'],
        category: 'physical_symptoms'
    },
    
    {
        id: 'HEALTH007',
        scenario: 'Your mental state at work is typically:',
        options: [
            { text: 'Focused and clear-headed', domain: 'health', pattern_type: 'mentally_sharp', ocean: { C: 0.7, N: -0.4, O: 0.5 } },
            { text: 'Anxious and worried', domain: 'health', pattern_type: 'anxiety_prone', ocean: { N: 0.8, C: -0.2 } },
            { text: 'Foggy and hard to concentrate', domain: 'health', pattern_type: 'brain_fog', ocean: { N: 0.5, C: -0.4, O: -0.2 } },
            { text: 'Varies with stress levels', domain: 'health', pattern_type: 'stress_reactive', ocean: { N: 0.6, O: 0.3 } }
        ],
        reveals: ['mental_clarity', 'anxiety_levels', 'cognitive_function'],
        category: 'mental_state'
    },
    
    {
        id: 'HEALTH008',
        scenario: 'How often do you take sick days:',
        options: [
            { text: 'Rarely - I power through illness', domain: 'health', pattern_type: 'illness_ignorer', ocean: { C: 0.6, N: 0.4, A: -0.2 } },
            { text: 'Only when absolutely necessary', domain: 'health', pattern_type: 'minimal_sick_leave', ocean: { C: 0.7, A: 0.4, N: 0.2 } },
            { text: 'When I need them for physical or mental health', domain: 'health', pattern_type: 'health_prioritizer', ocean: { C: 0.5, N: -0.3, O: 0.4 } },
            { text: 'More often lately due to burnout', domain: 'health', pattern_type: 'burnout_indicator', ocean: { N: 0.7, C: -0.3, E: -0.4 } }
        ],
        reveals: ['health_boundaries', 'burnout_risk', 'self_care_priority'],
        category: 'sick_leave'
    },
    
    {
        id: 'HEALTH009',
        scenario: 'Your emotional resilience at work:',
        options: [
            { text: 'Bounce back quickly from setbacks', domain: 'health', pattern_type: 'emotionally_resilient', ocean: { N: -0.6, E: 0.5, C: 0.6 } },
            { text: 'Take things personally and dwell on them', domain: 'health', pattern_type: 'ruminator', ocean: { N: 0.8, A: 0.2 } },
            { text: 'Depends on overall stress levels', domain: 'health', pattern_type: 'conditionally_resilient', ocean: { N: 0.4, O: 0.4 } },
            { text: 'Getting worn down over time', domain: 'health', pattern_type: 'resilience_depleting', ocean: { N: 0.7, E: -0.3, C: -0.2 } }
        ],
        reveals: ['emotional_resilience', 'recovery_ability', 'stress_accumulation'],
        category: 'emotional_health'
    },
    
    {
        id: 'HEALTH010',
        scenario: 'Your approach to workplace wellness programs:',
        options: [
            { text: 'Actively participate and find them helpful', domain: 'health', pattern_type: 'wellness_engager', ocean: { O: 0.6, C: 0.6, E: 0.5 } },
            { text: 'Too busy to participate', domain: 'health', pattern_type: 'too_busy_for_wellness', ocean: { C: 0.4, N: 0.5 } },
            { text: 'Skeptical about their effectiveness', domain: 'health', pattern_type: 'wellness_skeptic', ocean: { O: -0.3, A: -0.2, N: 0.3 } },
            { text: 'Would like to but feel judged for taking time', domain: 'health', pattern_type: 'wellness_inhibited', ocean: { N: 0.6, A: 0.5, E: -0.2 } }
        ],
        reveals: ['wellness_engagement', 'self_care_permission', 'program_effectiveness'],
        category: 'wellness_programs'
    }
];

export { thriveHealthQuestions };