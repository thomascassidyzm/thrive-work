// CREATIVE EXPRESSION & OPENNESS QUESTIONS
// Testing artistic appreciation, fantasy, imagination through behavioral choices
// "You are a verb, not a noun" - what you DO reveals more than what you think you are

export const creativeExpressionQuestions = [
    {
        id: 'CE001',
        scenario: 'You have a free Saturday afternoon and notice there\'s a new art exhibition, a live music venue, a sports bar, and a shopping center all nearby. What pulls you?',
        domain: 'openness',
        category: 'artistic_appreciation',
        options: [
            { text: 'Check out the art exhibition to see what\'s new', domain: 'openness', pattern_type: 'aesthetic_explorer' },
            { text: 'Head to the live music venue for the vibe', domain: 'openness', pattern_type: 'sensory_seeker' },
            { text: 'Watch the game at the sports bar with others', domain: 'openness', pattern_type: 'familiar_entertainer' },
            { text: 'Browse the shops for things you need', domain: 'openness', pattern_type: 'practical_chooser' }
        ]
    },
    {
        id: 'CE002',
        scenario: 'Your friend invites you to their amateur theater performance. It\'s the same night as a work networking event. Both are optional. What do you actually do?',
        domain: 'openness',
        category: 'artistic_support',
        options: [
            { text: 'Go to the theater - you love supporting creative friends', domain: 'openness', pattern_type: 'creative_supporter' },
            { text: 'Choose networking - it\'s more practical for your career', domain: 'openness', pattern_type: 'pragmatic_prioritizer' },
            { text: 'Try to do both, even if briefly', domain: 'openness', pattern_type: 'experience_maximizer' },
            { text: 'Skip both and enjoy a quiet evening', domain: 'openness', pattern_type: 'solitude_chooser' }
        ]
    },
    {
        id: 'CE003',
        scenario: 'You\'re decorating your living space. What actually happens?',
        domain: 'openness',
        category: 'aesthetic_expression',
        options: [
            { text: 'Carefully curate art, colors, and textures that inspire you', domain: 'openness', pattern_type: 'aesthetic_curator' },
            { text: 'Keep it minimal and functional', domain: 'openness', pattern_type: 'functional_minimalist' },
            { text: 'Display lots of photos and memories', domain: 'openness', pattern_type: 'memory_decorator' },
            { text: 'It stays pretty bare - decorating isn\'t your thing', domain: 'openness', pattern_type: 'decoration_indifferent' }
        ]
    },
    {
        id: 'CE004',
        scenario: 'When you listen to music, what\'s your actual pattern?',
        domain: 'openness',
        category: 'musical_engagement',
        options: [
            { text: 'Actively seek out new artists and genres', domain: 'openness', pattern_type: 'musical_explorer' },
            { text: 'Stick to your favorite playlists from years ago', domain: 'openness', pattern_type: 'musical_traditionalist' },
            { text: 'Whatever\'s on the radio or popular', domain: 'openness', pattern_type: 'passive_listener' },
            { text: 'Music is mainly background noise while doing other things', domain: 'openness', pattern_type: 'ambient_user' }
        ]
    },
    {
        id: 'CE005',
        scenario: 'A coworker shows you their hobby artwork during lunch. What\'s your genuine response?',
        domain: 'openness',
        category: 'creative_engagement',
        options: [
            { text: 'Get genuinely interested and ask about their process', domain: 'openness', pattern_type: 'process_curious' },
            { text: 'Compliment it politely and change the subject', domain: 'openness', pattern_type: 'polite_acknowledger' },
            { text: 'Share your own creative pursuits in return', domain: 'openness', pattern_type: 'creative_reciprocator' },
            { text: 'Feel uncomfortable - you don\'t know how to respond to art', domain: 'openness', pattern_type: 'aesthetic_uncomfortable' }
        ]
    },
    {
        id: 'CE006',
        scenario: 'You\'re daydreaming during a boring meeting. Where does your mind actually go?',
        domain: 'openness',
        category: 'fantasy_imagination',
        options: [
            { text: 'Elaborate scenarios of alternative lives you could be living', domain: 'openness', pattern_type: 'fantasy_weaver' },
            { text: 'Practical plans for your upcoming tasks', domain: 'openness', pattern_type: 'practical_planner' },
            { text: 'Replaying recent conversations and events', domain: 'openness', pattern_type: 'past_processor' },
            { text: 'You rarely daydream - you stay focused on the present', domain: 'openness', pattern_type: 'present_focused' }
        ]
    },
    {
        id: 'CE007',
        scenario: 'Someone suggests trying an improv comedy class together. What\'s your real reaction?',
        domain: 'openness',
        category: 'creative_risk',
        options: [
            { text: 'Excited - you love trying creative challenges', domain: 'openness', pattern_type: 'creative_risk_taker' },
            { text: 'Anxious - but you\'ll try it for the experience', domain: 'openness', pattern_type: 'anxious_experimenter' },
            { text: 'Make an excuse - that\'s way outside your comfort zone', domain: 'openness', pattern_type: 'comfort_zone_protector' },
            { text: 'Suggest something else you\'d prefer instead', domain: 'openness', pattern_type: 'alternative_suggester' }
        ]
    },
    {
        id: 'CE008',
        scenario: 'You find an old musical instrument in your closet. What actually happens?',
        domain: 'openness',
        category: 'creative_engagement',
        options: [
            { text: 'Start playing around with it immediately', domain: 'openness', pattern_type: 'playful_explorer' },
            { text: 'Think "I should learn this" but never actually do', domain: 'openness', pattern_type: 'aspiring_procrastinator' },
            { text: 'Sell it or give it away - you\'re not musical', domain: 'openness', pattern_type: 'practical_declutterer' },
            { text: 'Sign up for lessons to properly learn it', domain: 'openness', pattern_type: 'structured_learner' }
        ]
    },
    {
        id: 'CE009',
        scenario: 'When reading books or watching movies, what actually draws you in?',
        domain: 'openness',
        category: 'narrative_preference',
        options: [
            { text: 'Complex, ambiguous stories that make you think', domain: 'openness', pattern_type: 'complexity_seeker' },
            { text: 'Feel-good stories with clear happy endings', domain: 'openness', pattern_type: 'comfort_viewer' },
            { text: 'True stories and documentaries about real events', domain: 'openness', pattern_type: 'reality_preferrer' },
            { text: 'You rarely read or watch anything for pleasure', domain: 'openness', pattern_type: 'media_minimal' }
        ]
    },
    {
        id: 'CE010',
        scenario: 'Your city offers free creative workshops (pottery, writing, dance, etc.). What\'s your actual pattern?',
        domain: 'openness',
        category: 'creative_participation',
        options: [
            { text: 'Sign up for multiple workshops enthusiastically', domain: 'openness', pattern_type: 'workshop_enthusiast' },
            { text: 'Consider it but never actually register', domain: 'openness', pattern_type: 'perpetual_considerer' },
            { text: 'Only go if a friend drags you along', domain: 'openness', pattern_type: 'social_participant' },
            { text: 'No interest - you have better things to do', domain: 'openness', pattern_type: 'creative_dismisser' }
        ]
    },
    {
        id: 'CE011',
        scenario: 'Someone shares an unusual creative idea with you. What\'s your honest internal reaction?',
        domain: 'openness',
        category: 'idea_receptivity',
        options: [
            { text: 'Intrigued - you want to understand their vision', domain: 'openness', pattern_type: 'vision_curious' },
            { text: 'Skeptical - but you listen politely', domain: 'openness', pattern_type: 'polite_skeptic' },
            { text: 'Immediately think of practical obstacles', domain: 'openness', pattern_type: 'practical_evaluator' },
            { text: 'Inspired to share your own weird ideas', domain: 'openness', pattern_type: 'creative_resonator' }
        ]
    },
    {
        id: 'CE012',
        scenario: 'How do you actually engage with beauty in everyday life?',
        domain: 'openness',
        category: 'aesthetic_attention',
        options: [
            { text: 'Often stop to notice beautiful moments (sunsets, architecture, etc.)', domain: 'openness', pattern_type: 'beauty_noticer' },
            { text: 'Occasionally appreciate beauty when it\'s obvious', domain: 'openness', pattern_type: 'occasional_appreciator' },
            { text: 'Too busy or distracted to notice most of the time', domain: 'openness', pattern_type: 'task_focused' },
            { text: 'Actively seek out beautiful experiences', domain: 'openness', pattern_type: 'beauty_seeker' }
        ]
    }
];