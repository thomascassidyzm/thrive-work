// UNIVERSAL LAUNCH QUESTION SET
// 10 carefully selected questions that apply to everyone regardless of work situation
// Focus: Friends, family, personal relationships, social situations

const universalLaunchQuestions = [
    // FRIEND GROUP DYNAMICS
    {
        id: 'UL001',
        scenario: 'Your friend group is planning something you don\'t want to do, but everyone else seems excited. You:',
        options: [
            { text: 'Go along with it to avoid being difficult', domain: 'social', pattern_type: 'harmony_keeper' },
            { text: 'Honestly say it\'s not for you', domain: 'social', pattern_type: 'authentic_boundary_setter' },
            { text: 'Suggest an alternative that works for everyone', domain: 'social', pattern_type: 'collaborative_problem_solver' },
            { text: 'Make an excuse to get out of it', domain: 'social', pattern_type: 'indirect_avoider' }
        ],
        reveals: ['peer_pressure_response', 'authenticity_vs_acceptance', 'boundary_setting'],
        category: 'social_pressure'
    },

    // FAMILY CONFLICT
    {
        id: 'UL002',
        scenario: 'A family member regularly makes comments that hurt your feelings. You:',
        options: [
            { text: 'Tell them directly how their comments affect you', domain: 'relationships', pattern_type: 'direct_communicator' },
            { text: 'Try to develop thicker skin and not let it bother you', domain: 'relationships', pattern_type: 'internal_processor' },
            { text: 'Limit your time around them', domain: 'relationships', pattern_type: 'boundary_enforcer' }
        ],
        reveals: ['family_boundary_setting', 'emotional_protection', 'confrontation_comfort'],
        category: 'family_dynamics'
    },

    // FRIEND RELIABILITY
    {
        id: 'UL003',
        scenario: 'A friend consistently shows up late and cancels plans last minute. You:',
        options: [
            { text: 'Tell them directly how their behavior affects you', domain: 'relationships', pattern_type: 'honest_communicator' },
            { text: 'Accept it as part of who they are', domain: 'relationships', pattern_type: 'accepting_friend' },
            { text: 'Make jokes about their lateness to hint at the problem', domain: 'relationships', pattern_type: 'indirect_communicator' },
            { text: 'Stop making plans with them without explanation', domain: 'relationships', pattern_type: 'silent_withdrawer' }
        ],
        reveals: ['friendship_standards', 'expectation_communication', 'relationship_maintenance'],
        category: 'friendship_boundaries'
    },

    // SOCIAL GATHERING DYNAMICS
    {
        id: 'UL004',
        scenario: 'At a party, you typically:',
        options: [
            { text: 'Find one person to have a deep conversation with', domain: 'social', pattern_type: 'depth_seeker' },
            { text: 'Work the room and talk to lots of people', domain: 'social', pattern_type: 'social_networker' },
            { text: 'Stay close to the people you came with', domain: 'social', pattern_type: 'familiar_anchor' }
        ],
        reveals: ['social_energy_patterns', 'new_people_comfort', 'party_behavior'],
        category: 'social_behavior'
    },

    // PERSONAL CONFLICT
    {
        id: 'UL005',
        scenario: 'Someone you care about does something that really bothers you. You:',
        options: [
            { text: 'Bring it up as soon as possible', domain: 'conflict', pattern_type: 'immediate_addresser' },
            { text: 'Wait until you\'re both calm and relaxed to discuss it', domain: 'conflict', pattern_type: 'timing_optimizer' },
            { text: 'Hint at your displeasure and hope they figure it out', domain: 'conflict', pattern_type: 'indirect_communicator' },
            { text: 'Decide it\'s not worth fighting about', domain: 'conflict', pattern_type: 'harmony_prioritizer' }
        ],
        reveals: ['conflict_timing', 'communication_style', 'relationship_harmony_priority'],
        category: 'personal_conflict'
    },

    // SOCIAL SUPPORT
    {
        id: 'UL006',
        scenario: 'Someone consistently asks you to do favors that are inconvenient for you. You:',
        options: [
            { text: 'Start saying no more often', domain: 'boundaries', pattern_type: 'boundary_setter' },
            { text: 'Keep saying yes but feel increasingly overwhelmed', domain: 'boundaries', pattern_type: 'people_pleaser' },
            { text: 'Explain why the requests are difficult for you', domain: 'boundaries', pattern_type: 'context_provider' },
            { text: 'Help them find alternative solutions', domain: 'boundaries', pattern_type: 'problem_solver' }
        ],
        reveals: ['helping_boundaries', 'people_pleasing_patterns', 'self_care_vs_others'],
        category: 'personal_boundaries'
    },

    // FRIEND DISAGREEMENT
    {
        id: 'UL007',
        scenario: 'Two of your friends are in a heated argument in front of you. You:',
        options: [
            { text: 'Try to mediate and help them find common ground', domain: 'conflict', pattern_type: 'peacemaker' },
            { text: 'Stay neutral and let them work it out', domain: 'conflict', pattern_type: 'non_interventionist' },
            { text: 'Feel uncomfortable and look for an excuse to leave', domain: 'conflict', pattern_type: 'conflict_avoider' },
            { text: 'Suggest they take a break and cool down', domain: 'conflict', pattern_type: 'situation_manager' }
        ],
        reveals: ['conflict_mediation', 'friend_responsibility', 'tension_tolerance'],
        category: 'friend_conflict'
    },

    // SOCIAL FAIRNESS
    {
        id: 'UL008',
        scenario: 'Your group is splitting a bill and someone clearly can\'t afford their fair share. You:',
        options: [
            { text: 'Quietly offer to cover part of their portion', domain: 'social', pattern_type: 'generous_helper' },
            { text: 'Suggest the group split it differently', domain: 'social', pattern_type: 'fairness_advocate' },
            { text: 'Stick to equal splits but feel bad about it', domain: 'social', pattern_type: 'rule_follower' }
        ],
        reveals: ['generosity_patterns', 'fairness_sensitivity', 'group_financial_dynamics'],
        category: 'social_fairness'
    },

    // PERSONAL VALUES
    {
        id: 'UL009',
        scenario: 'Someone close to you makes a comment that goes against your core values. You:',
        options: [
            { text: 'Challenge their viewpoint directly', domain: 'values', pattern_type: 'value_defender' },
            { text: 'Ask questions to understand their perspective', domain: 'values', pattern_type: 'curious_explorer' },
            { text: 'Change the subject to avoid conflict', domain: 'values', pattern_type: 'harmony_keeper' },
            { text: 'Share your own values without attacking theirs', domain: 'values', pattern_type: 'authentic_sharer' }
        ],
        reveals: ['value_expression', 'belief_challenge_comfort', 'relationship_vs_principles'],
        category: 'values_conflict'
    },

    // EMOTIONAL SUPPORT
    {
        id: 'UL010',
        scenario: 'A close friend is going through a tough time and keeps venting to you. You:',
        options: [
            { text: 'Listen and offer emotional support whenever they need it', domain: 'relationships', pattern_type: 'supportive_friend' },
            { text: 'Try to help them find solutions to their problems', domain: 'relationships', pattern_type: 'problem_solver' },
            { text: 'Listen but set some boundaries about when you\'re available', domain: 'relationships', pattern_type: 'boundaried_supporter' },
            { text: 'Encourage them to talk to a professional', domain: 'relationships', pattern_type: 'resource_connector' }
        ],
        reveals: ['emotional_support_patterns', 'helper_boundaries', 'caretaking_instincts'],
        category: 'emotional_support'
    }
];

// Pattern observations for universal scenarios
const universalPatterns = {
    'harmony_keeper': { 
        observation: 'You often prioritize keeping things peaceful in your relationships', 
        exploration: 'What happens inside you when there\'s tension with people you care about?',
        growth_invitation: 'You might explore when your authentic voice could actually strengthen your relationships'
    },
    'authentic_boundary_setter': { 
        observation: 'You tend to stay true to yourself even when it might disappoint others', 
        exploration: 'What helps you maintain your authenticity in relationships?',
        growth_invitation: 'You could explore how your example encourages others to be more authentic too'
    },
    'direct_communicator': { 
        observation: 'You prefer addressing issues head-on rather than letting them fester', 
        exploration: 'How do people usually respond to your directness?',
        growth_invitation: 'You might experiment with timing to maximize your impact and others\' receptiveness'
    },
    'people_pleaser': { 
        observation: 'You often prioritize others\' needs and comfort over your own', 
        exploration: 'What would it feel like to say no without feeling guilty?',
        growth_invitation: 'You could practice small acts of self-care and notice how it affects your relationships'
    },
    'peacemaker': { 
        observation: 'You naturally step in to help resolve conflicts between others', 
        exploration: 'What draws you to heal rifts between people?',
        growth_invitation: 'You might explore when letting others work through their own conflicts serves them better'
    },
    'conflict_avoider': { 
        observation: 'You prefer to stay away from tense or conflicted situations', 
        exploration: 'What does conflict feel like in your body?',
        growth_invitation: 'You could gradually build your comfort with witnessing others\' disagreements'
    }
};

export { universalLaunchQuestions, universalPatterns };