// DISCIPLINE & IMPULSE CONTROL QUESTIONS
// Testing conscientiousness, self-discipline, and impulse control through real behaviors
// "What you do when no one's watching" reveals more than "I am disciplined"

export const disciplineImpulseQuestions = [
    {
        id: 'DI001',
        scenario: 'It\'s 11 PM and you planned to wake up early tomorrow. A new episode of your favorite show just dropped. What actually happens?',
        domain: 'conscientiousness',
        category: 'self_discipline',
        options: [
            { text: 'Stick to your plan and go to bed', domain: 'conscientiousness', pattern_type: 'disciplined_planner' },
            { text: 'Watch "just one episode" (but actually watch three)', domain: 'conscientiousness', pattern_type: 'intention_drifter' },
            { text: 'Stay up watching - you\'ll figure it out tomorrow', domain: 'conscientiousness', pattern_type: 'tomorrow_dealer' },
            { text: 'Set a timer for 30 minutes as a compromise', domain: 'conscientiousness', pattern_type: 'structured_compromiser' }
        ]
    },
    {
        id: 'DI002',
        scenario: 'You\'re working from home with a deadline. What\'s your actual pattern?',
        domain: 'conscientiousness',
        category: 'work_habits',
        options: [
            { text: 'Focused work until it\'s done', domain: 'conscientiousness', pattern_type: 'laser_focused' },
            { text: 'Work in bursts with lots of breaks', domain: 'conscientiousness', pattern_type: 'burst_worker' },
            { text: 'Procrastinate until panic sets in', domain: 'conscientiousness', pattern_type: 'pressure_performer' },
            { text: 'Get distracted every 10 minutes', domain: 'conscientiousness', pattern_type: 'attention_wanderer' }
        ]
    },
    {
        id: 'DI003',
        scenario: 'You set a personal goal (exercise, reading, meditation, etc.). What actually happens over the next month?',
        domain: 'conscientiousness',
        category: 'goal_persistence',
        options: [
            { text: 'Follow through consistently', domain: 'conscientiousness', pattern_type: 'consistent_achiever' },
            { text: 'Strong start, then gradually fade', domain: 'conscientiousness', pattern_type: 'enthusiasm_fader' },
            { text: 'Forget about it within a week', domain: 'conscientiousness', pattern_type: 'goal_forgetter' },
            { text: 'Inconsistent but keep trying', domain: 'conscientiousness', pattern_type: 'persistent_returner' }
        ]
    },
    {
        id: 'DI004',
        scenario: 'There\'s leftover cake in your fridge and you\'re trying to eat healthy. What\'s the reality?',
        domain: 'conscientiousness',
        category: 'impulse_control',
        options: [
            { text: 'Don\'t even think about it - goals first', domain: 'conscientiousness', pattern_type: 'iron_willed' },
            { text: 'Have a small piece as planned treat', domain: 'conscientiousness', pattern_type: 'moderate_controller' },
            { text: 'Eat it all while promising tomorrow is different', domain: 'conscientiousness', pattern_type: 'tomorrow_promiser' },
            { text: 'Throw it away to remove temptation', domain: 'conscientiousness', pattern_type: 'temptation_eliminator' }
        ]
    },
    {
        id: 'DI005',
        scenario: 'Your room/workspace is getting messy. When do you actually clean it?',
        domain: 'conscientiousness',
        category: 'order_maintenance',
        options: [
            { text: 'Keep it clean daily - mess bothers you', domain: 'conscientiousness', pattern_type: 'daily_maintainer' },
            { text: 'Weekly cleaning routine', domain: 'conscientiousness', pattern_type: 'routine_cleaner' },
            { text: 'Only when it\'s unbearable or someone\'s coming', domain: 'conscientiousness', pattern_type: 'crisis_cleaner' },
            { text: 'You function fine in chaos', domain: 'conscientiousness', pattern_type: 'chaos_comfortable' }
        ]
    },
    {
        id: 'DI006',
        scenario: 'You get an urge to buy something you want but don\'t need. What actually happens?',
        domain: 'conscientiousness',
        category: 'impulse_control',
        options: [
            { text: 'Buy it immediately - life\'s short', domain: 'neuroticism', pattern_type: 'impulse_buyer' },
            { text: 'Wait 24-48 hours to see if you still want it', domain: 'conscientiousness', pattern_type: 'delayed_decider' },
            { text: 'Research extensively then probably buy it', domain: 'conscientiousness', pattern_type: 'rationalized_buyer' },
            { text: 'Talk yourself out of it successfully', domain: 'conscientiousness', pattern_type: 'impulse_controller' }
        ]
    },
    {
        id: 'DI007',
        scenario: 'Someone cuts you off in traffic. What\'s your actual reaction?',
        domain: 'neuroticism',
        category: 'emotional_regulation',
        options: [
            { text: 'Rage and yell (even if windows are up)', domain: 'neuroticism', pattern_type: 'road_rager' },
            { text: 'Annoyed but let it go quickly', domain: 'neuroticism', pattern_type: 'quick_releaser' },
            { text: 'Barely notice - focused on your podcast', domain: 'neuroticism', pattern_type: 'unbothered_driver' },
            { text: 'Stew about it for the next 20 minutes', domain: 'neuroticism', pattern_type: 'anger_ruminator' }
        ]
    },
    {
        id: 'DI008',
        scenario: 'You have multiple tasks due. How do you actually handle them?',
        domain: 'conscientiousness',
        category: 'task_management',
        options: [
            { text: 'Make a list and work through systematically', domain: 'conscientiousness', pattern_type: 'systematic_executor' },
            { text: 'Jump between tasks based on mood', domain: 'conscientiousness', pattern_type: 'mood_based_worker' },
            { text: 'Do the easy ones first to feel productive', domain: 'conscientiousness', pattern_type: 'easy_first_doer' },
            { text: 'Panic and do them all last minute', domain: 'conscientiousness', pattern_type: 'deadline_warrior' }
        ]
    },
    {
        id: 'DI009',
        scenario: 'You\'re in a boring conversation you can\'t escape. What actually happens?',
        domain: 'neuroticism',
        category: 'patience',
        options: [
            { text: 'Listen patiently and engage politely', domain: 'agreeableness', pattern_type: 'patient_listener' },
            { text: 'Zone out but pretend to listen', domain: 'neuroticism', pattern_type: 'mental_escaper' },
            { text: 'Try to steer it somewhere interesting', domain: 'extraversion', pattern_type: 'conversation_director' },
            { text: 'Show obvious signs of impatience', domain: 'neuroticism', pattern_type: 'impatience_shower' }
        ]
    },
    {
        id: 'DI010',
        scenario: 'You said you\'d do something but now you don\'t want to. What happens?',
        domain: 'conscientiousness',
        category: 'commitment_keeping',
        options: [
            { text: 'Do it anyway - you gave your word', domain: 'conscientiousness', pattern_type: 'word_keeper' },
            { text: 'Find a legitimate reason to cancel', domain: 'conscientiousness', pattern_type: 'excuse_finder' },
            { text: 'Be honest that you changed your mind', domain: 'conscientiousness', pattern_type: 'honest_canceler' },
            { text: 'Ghost and deal with consequences later', domain: 'neuroticism', pattern_type: 'avoider_ghoster' }
        ]
    },
    {
        id: 'DI011',
        scenario: 'Your phone buzzes while you\'re trying to focus. What\'s your actual behavior?',
        domain: 'conscientiousness',
        category: 'attention_control',
        options: [
            { text: 'Check immediately every time', domain: 'conscientiousness', pattern_type: 'instant_checker' },
            { text: 'Check at planned intervals', domain: 'conscientiousness', pattern_type: 'scheduled_checker' },
            { text: 'Phone stays in another room when focusing', domain: 'conscientiousness', pattern_type: 'distraction_eliminator' },
            { text: 'Try to ignore but usually fail', domain: 'conscientiousness', pattern_type: 'failed_resister' }
        ]
    },
    {
        id: 'DI012',
        scenario: 'You\'re angry about something. How long does it actually last?',
        domain: 'neuroticism',
        category: 'emotional_duration',
        options: [
            { text: 'Minutes - you process and move on', domain: 'neuroticism', pattern_type: 'quick_processor' },
            { text: 'Hours - need time to cool down', domain: 'neuroticism', pattern_type: 'slow_cooler' },
            { text: 'Days - you hold onto things', domain: 'neuroticism', pattern_type: 'emotion_holder' },
            { text: 'Depends entirely on what it\'s about', domain: 'neuroticism', pattern_type: 'contextual_processor' }
        ]
    },
    {
        id: 'DI013',
        scenario: 'There\'s an awkward silence in a group. What do you actually do?',
        domain: 'neuroticism',
        category: 'social_anxiety',
        options: [
            { text: 'Feel compelled to fill it immediately', domain: 'neuroticism', pattern_type: 'silence_filler' },
            { text: 'Comfortable letting it be', domain: 'neuroticism', pattern_type: 'silence_comfortable' },
            { text: 'Look at your phone to escape', domain: 'neuroticism', pattern_type: 'digital_escaper' },
            { text: 'Wait for someone else to break it', domain: 'neuroticism', pattern_type: 'silence_waiter' }
        ]
    },
    {
        id: 'DI014',
        scenario: 'You wake up not feeling great. What determines if you push through your day?',
        domain: 'conscientiousness',
        category: 'resilience',
        options: [
            { text: 'Push through regardless - duties first', domain: 'conscientiousness', pattern_type: 'duty_pusher' },
            { text: 'Assess honestly and adjust accordingly', domain: 'conscientiousness', pattern_type: 'adaptive_assessor' },
            { text: 'Any excuse to take it easy', domain: 'conscientiousness', pattern_type: 'comfort_seeker' },
            { text: 'Depends who\'s counting on you', domain: 'conscientiousness', pattern_type: 'obligation_based' }
        ]
    },
    {
        id: 'DI015',
        scenario: 'You\'re trying to break a bad habit. What\'s your actual success pattern?',
        domain: 'conscientiousness',
        category: 'habit_change',
        options: [
            { text: 'Cold turkey and stick to it', domain: 'conscientiousness', pattern_type: 'cold_turkey_successor' },
            { text: 'Gradual reduction with some setbacks', domain: 'conscientiousness', pattern_type: 'gradual_improver' },
            { text: 'Multiple failed attempts but keep trying', domain: 'conscientiousness', pattern_type: 'persistent_attempter' },
            { text: 'Give up after the first relapse', domain: 'neuroticism', pattern_type: 'relapse_quitter' }
        ]
    }
];