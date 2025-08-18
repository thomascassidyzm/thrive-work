// CONFLICT PATTERNS QUESTION BANK
// 50+ scenarios that reveal how people actually handle conflict, tension, and difficult situations
// vs how they think they handle them

const conflictPatternsQuestions = [
    // DIRECT CONFRONTATION PATTERNS
    {
        id: 'CP001',
        scenario: 'Someone you work with consistently takes credit for your ideas in meetings. You:',
        options: [
            { text: 'Address it immediately in the meeting: "Actually, that was my idea"', domain: 'conflict', pattern_type: 'immediate_confronter' },
            { text: 'Pull them aside privately after the meeting', domain: 'conflict', pattern_type: 'private_addresser' },
            { text: 'Let it slide to avoid making waves', domain: 'conflict', pattern_type: 'harmony_prioritizer' },
            { text: 'Start documenting everything for future reference', domain: 'conflict', pattern_type: 'strategic_documenter' }
        ],
        reveals: ['confrontation_timing', 'public_vs_private_conflict', 'credit_protection'],
        ipip_neo_relevance: ['extraversion_assertiveness', 'agreeableness_straightforwardness', 'conscientiousness_deliberation'],
        category: 'workplace_conflict'
    },

    {
        id: 'CP002',
        scenario: 'Your neighbor plays loud music late at night regularly. You:',
        options: [
            { text: 'Go over and ask them to turn it down', domain: 'conflict', pattern_type: 'direct_requester' },
            { text: 'Leave a polite note asking them to be considerate', domain: 'conflict', pattern_type: 'indirect_communicator' },
            { text: 'Call the authorities to handle it', domain: 'conflict', pattern_type: 'third_party_invoker' },
            { text: 'Endure it and hope they stop eventually', domain: 'conflict', pattern_type: 'passive_endurer' }
        ],
        reveals: ['neighbor_conflict_approach', 'direct_vs_indirect_communication', 'authority_involvement'],
        ipip_neo_relevance: ['extraversion_assertiveness', 'agreeableness_compliance', 'neuroticism_angry_hostility'],
        category: 'neighbor_conflict'
    },

    {
        id: 'CP003',
        scenario: 'A friend consistently shows up late and cancels plans last minute. You:',
        options: [
            { text: 'Tell them directly how their behavior affects you', domain: 'conflict', pattern_type: 'impact_communicator' },
            { text: 'Make jokes about their lateness to hint at the problem', domain: 'conflict', pattern_type: 'humor_hinter' },
            { text: 'Stop making plans with them without explanation', domain: 'conflict', pattern_type: 'silent_withdrawer' },
            { text: 'Accept it as part of who they are', domain: 'conflict', pattern_type: 'behavioral_accepter' }
        ],
        reveals: ['friendship_boundaries', 'expectation_communication', 'relationship_standards'],
        ipip_neo_relevance: ['agreeableness_straightforwardness', 'extraversion_assertiveness', 'conscientiousness_deliberation'],
        category: 'friendship_conflict'
    },

    // ESCALATION PATTERNS
    {
        id: 'CP004',
        scenario: 'During an argument, the other person starts raising their voice and getting aggressive. You:',
        options: [
            { text: 'Match their energy and get louder too', domain: 'conflict', pattern_type: 'escalation_matcher' },
            { text: 'Stay calm and speak more quietly', domain: 'conflict', pattern_type: 'de_escalator' },
            { text: 'Walk away until they calm down', domain: 'conflict', pattern_type: 'situation_exiter' },
            { text: 'Feel overwhelmed and shut down', domain: 'conflict', pattern_type: 'overwhelm_responder' }
        ],
        reveals: ['escalation_response', 'emotional_regulation', 'conflict_tolerance'],
        ipip_neo_relevance: ['neuroticism_angry_hostility', 'agreeableness_compliance', 'extraversion_assertiveness'],
        category: 'heated_conflict'
    },

    {
        id: 'CP005',
        scenario: 'Someone accuses you of something you didn\'t do in front of others. You:',
        options: [
            { text: 'Immediately defend yourself loudly and clearly', domain: 'conflict', pattern_type: 'public_defender' },
            { text: 'Calmly state the facts and ask to discuss privately', domain: 'conflict', pattern_type: 'dignified_redirector' },
            { text: 'Feel humiliated and don\'t know what to say', domain: 'conflict', pattern_type: 'public_shame_responder' },
            { text: 'Get angry and attack their credibility', domain: 'conflict', pattern_type: 'counter_attacker' }
        ],
        reveals: ['false_accusation_response', 'public_confrontation_comfort', 'reputation_protection'],
        ipip_neo_relevance: ['neuroticism_self_consciousness', 'extraversion_assertiveness', 'agreeableness_straightforwardness'],
        category: 'public_confrontation'
    },

    // AVOIDANCE PATTERNS
    {
        id: 'CP006',
        scenario: 'You need to have a difficult conversation with someone close to you. You:',
        options: [
            { text: 'Schedule a time and address it head-on', domain: 'conflict', pattern_type: 'proactive_addresser' },
            { text: 'Wait for the right moment to bring it up naturally', domain: 'conflict', pattern_type: 'opportunistic_communicator' },
            { text: 'Hope the issue resolves itself without discussion', domain: 'conflict', pattern_type: 'avoidant_hoper' },
            { text: 'Practice what you\'ll say multiple times first', domain: 'conflict', pattern_type: 'preparation_dependent' }
        ],
        reveals: ['difficult_conversation_initiation', 'conflict_preparation', 'avoidance_tendencies'],
        ipip_neo_relevance: ['conscientiousness_deliberation', 'neuroticism_anxiety', 'extraversion_assertiveness'],
        category: 'difficult_conversations'
    },

    {
        id: 'CP007',
        scenario: 'There\'s obvious tension in your friend group that everyone\'s ignoring. You:',
        options: [
            { text: 'Bring it up openly: "Can we talk about the elephant in the room?"', domain: 'conflict', pattern_type: 'tension_namer' },
            { text: 'Talk to individuals privately to understand what\'s happening', domain: 'conflict', pattern_type: 'behind_scenes_investigator' },
            { text: 'Try to lighten the mood and distract from the tension', domain: 'conflict', pattern_type: 'mood_lifter' },
            { text: 'Wait for someone else to address it', domain: 'conflict', pattern_type: 'passive_observer' }
        ],
        reveals: ['group_tension_response', 'conflict_initiation', 'social_responsibility'],
        ipip_neo_relevance: ['extraversion_assertiveness', 'agreeableness_altruism', 'openness_actions'],
        category: 'group_tension'
    },

    // MEDIATION & INTERVENTION PATTERNS
    {
        id: 'CP008',
        scenario: 'Two of your friends are in a heated argument in front of you. You:',
        options: [
            { text: 'Try to mediate and help them find common ground', domain: 'conflict', pattern_type: 'active_mediator' },
            { text: 'Suggest they take a break and cool down', domain: 'conflict', pattern_type: 'pause_suggester' },
            { text: 'Stay neutral and let them work it out', domain: 'conflict', pattern_type: 'neutral_observer' },
            { text: 'Feel uncomfortable and look for an excuse to leave', domain: 'conflict', pattern_type: 'conflict_escaper' }
        ],
        reveals: ['third_party_conflict_response', 'mediation_instincts', 'conflict_comfort'],
        ipip_neo_relevance: ['agreeableness_altruism', 'extraversion_assertiveness', 'neuroticism_anxiety'],
        category: 'witness_conflict'
    },

    {
        id: 'CP009',
        scenario: 'Your partner and your best friend don\'t get along and it\'s causing tension. You:',
        options: [
            { text: 'Talk to both separately to understand their perspectives', domain: 'conflict', pattern_type: 'dual_perspective_seeker' },
            { text: 'Arrange a group activity to help them bond', domain: 'conflict', pattern_type: 'relationship_engineer' },
            { text: 'Accept that some people just don\'t click', domain: 'conflict', pattern_type: 'incompatibility_accepter' },
            { text: 'Feel stressed and avoid situations with both present', domain: 'conflict', pattern_type: 'triangulation_avoider' }
        ],
        reveals: ['relationship_triangulation', 'loyalty_conflicts', 'relationship_management'],
        ipip_neo_relevance: ['agreeableness_altruism', 'neuroticism_anxiety', 'conscientiousness_deliberation'],
        category: 'loyalty_conflicts'
    },

    // WORKPLACE CONFLICT PATTERNS
    {
        id: 'CP010',
        scenario: 'A team member isn\'t pulling their weight and it\'s affecting everyone. You:',
        options: [
            { text: 'Address it directly with them first', domain: 'conflict', pattern_type: 'peer_confronter' },
            { text: 'Bring it up in the next team meeting', domain: 'conflict', pattern_type: 'group_addresser' },
            { text: 'Report it to your manager', domain: 'conflict', pattern_type: 'authority_escalator' },
            { text: 'Pick up the slack without saying anything', domain: 'conflict', pattern_type: 'silent_compensator' }
        ],
        reveals: ['team_accountability', 'peer_confrontation', 'workload_fairness'],
        ipip_neo_relevance: ['conscientiousness_dutifulness', 'extraversion_assertiveness', 'agreeableness_compliance'],
        category: 'team_conflict'
    },

    {
        id: 'CP011',
        scenario: 'Your manager gives you feedback that feels unfair and inaccurate. You:',
        options: [
            { text: 'Respectfully disagree and provide your perspective', domain: 'conflict', pattern_type: 'feedback_challenger' },
            { text: 'Ask for specific examples to understand better', domain: 'conflict', pattern_type: 'clarification_seeker' },
            { text: 'Accept it outwardly but feel resentful inside', domain: 'conflict', pattern_type: 'surface_complier' },
            { text: 'Thank them and focus on areas you can improve', domain: 'conflict', pattern_type: 'growth_focuser' }
        ],
        reveals: ['authority_feedback_response', 'hierarchy_challenging', 'professional_boundaries'],
        ipip_neo_relevance: ['agreeableness_compliance', 'extraversion_assertiveness', 'openness_ideas'],
        category: 'feedback_conflict'
    },

    // FAMILY CONFLICT PATTERNS
    {
        id: 'CP012',
        scenario: 'During a family gathering, relatives start arguing about politics. You:',
        options: [
            { text: 'Share your own political views openly', domain: 'conflict', pattern_type: 'opinion_sharer' },
            { text: 'Try to redirect the conversation to safer topics', domain: 'conflict', pattern_type: 'topic_redirector' },
            { text: 'Listen but don\'t engage with the political discussion', domain: 'conflict', pattern_type: 'neutral_listener' },
            { text: 'Leave the room or find something else to do', domain: 'conflict', pattern_type: 'situation_avoider' }
        ],
        reveals: ['political_conflict_comfort', 'family_harmony_priority', 'controversial_topic_engagement'],
        ipip_neo_relevance: ['openness_values', 'agreeableness_compliance', 'extraversion_assertiveness'],
        category: 'family_disagreements'
    },

    {
        id: 'CP013',
        scenario: 'Your adult sibling treats you like you\'re still a child. You:',
        options: [
            { text: 'Call them out on it directly', domain: 'conflict', pattern_type: 'boundary_enforcer' },
            { text: 'Prove your maturity through your actions', domain: 'conflict', pattern_type: 'behavioral_prover' },
            { text: 'Feel frustrated but avoid confrontation to keep peace', domain: 'conflict', pattern_type: 'family_peace_keeper' },
            { text: 'Limit your interactions with them', domain: 'conflict', pattern_type: 'contact_reducer' }
        ],
        reveals: ['family_role_resistance', 'sibling_boundary_setting', 'family_conflict_tolerance'],
        ipip_neo_relevance: ['extraversion_assertiveness', 'agreeableness_compliance', 'conscientiousness_deliberation'],
        category: 'family_roles'
    },

    // ROMANTIC RELATIONSHIP CONFLICT
    {
        id: 'CP014',
        scenario: 'Your romantic partner does something that really bothers you. You:',
        options: [
            { text: 'Bring it up as soon as possible', domain: 'conflict', pattern_type: 'immediate_processor' },
            { text: 'Wait until you\'re both calm and relaxed to discuss it', domain: 'conflict', pattern_type: 'timing_optimizer' },
            { text: 'Hint at your displeasure and hope they figure it out', domain: 'conflict', pattern_type: 'indirect_communicator' },
            { text: 'Decide it\'s not worth fighting about', domain: 'conflict', pattern_type: 'conflict_minimizer' }
        ],
        reveals: ['intimate_conflict_timing', 'romantic_communication_style', 'relationship_harmony_priority'],
        ipip_neo_relevance: ['extraversion_assertiveness', 'agreeableness_straightforwardness', 'conscientiousness_deliberation'],
        category: 'romantic_conflict'
    },

    {
        id: 'CP015',
        scenario: 'During an argument with your partner, they bring up past issues. You:',
        options: [
            { text: 'Point out that you\'re trying to focus on the current issue', domain: 'conflict', pattern_type: 'present_focuser' },
            { text: 'Address the past issues since they\'re clearly still bothering them', domain: 'conflict', pattern_type: 'comprehensive_processor' },
            { text: 'Feel overwhelmed by all the issues at once', domain: 'conflict', pattern_type: 'multi_issue_overwhelmer' },
            { text: 'Get defensive and bring up their past mistakes too', domain: 'conflict', pattern_type: 'tit_for_tat_responder' }
        ],
        reveals: ['conflict_scope_management', 'past_issue_handling', 'defensive_patterns'],
        ipip_neo_relevance: ['conscientiousness_deliberation', 'neuroticism_angry_hostility', 'agreeableness_straightforwardness'],
        category: 'relationship_arguments'
    },

    // STRANGER/PUBLIC CONFLICT
    {
        id: 'CP016',
        scenario: 'A stranger cuts in line in front of you. You:',
        options: [
            { text: 'Politely point out that there\'s a line', domain: 'conflict', pattern_type: 'polite_corrector' },
            { text: 'Say nothing but feel annoyed', domain: 'conflict', pattern_type: 'silent_resentment_holder' },
            { text: 'Loudly call them out for cutting', domain: 'conflict', pattern_type: 'public_shamer' },
            { text: 'Assume they didn\'t notice and give them the benefit of the doubt', domain: 'conflict', pattern_type: 'charitable_interpreter' }
        ],
        reveals: ['public_fairness_enforcement', 'stranger_confrontation_comfort', 'social_rule_enforcement'],
        ipip_neo_relevance: ['extraversion_assertiveness', 'agreeableness_trust', 'conscientiousness_dutifulness'],
        category: 'public_conflict'
    },

    {
        id: 'CP017',
        scenario: 'Someone is being rude to a service worker in front of you. You:',
        options: [
            { text: 'Speak up and defend the worker', domain: 'conflict', pattern_type: 'injustice_intervener' },
            { text: 'Give the worker a sympathetic look or gesture', domain: 'conflict', pattern_type: 'silent_supporter' },
            { text: 'Feel uncomfortable but stay out of it', domain: 'conflict', pattern_type: 'bystander' },
            { text: 'Try to distract or redirect the rude person', domain: 'conflict', pattern_type: 'indirect_intervener' }
        ],
        reveals: ['bystander_intervention', 'social_justice_action', 'stranger_conflict_involvement'],
        ipip_neo_relevance: ['agreeableness_altruism', 'extraversion_assertiveness', 'openness_values'],
        category: 'witness_injustice'
    },

    // ONLINE/DIGITAL CONFLICT
    {
        id: 'CP018',
        scenario: 'Someone posts something on social media that you strongly disagree with. You:',
        options: [
            { text: 'Comment with your opposing viewpoint', domain: 'conflict', pattern_type: 'digital_debater' },
            { text: 'Share content that presents the other side', domain: 'conflict', pattern_type: 'counter_narrative_sharer' },
            { text: 'Unfollow or unfriend them', domain: 'conflict', pattern_type: 'digital_disconnector' },
            { text: 'Ignore it and keep scrolling', domain: 'conflict', pattern_type: 'digital_avoider' }
        ],
        reveals: ['online_disagreement_handling', 'digital_conflict_comfort', 'viewpoint_challenge_methods'],
        ipip_neo_relevance: ['openness_values', 'extraversion_assertiveness', 'agreeableness_compliance'],
        category: 'digital_conflict'
    },

    {
        id: 'CP019',
        scenario: 'You\'re in an online argument that\'s getting heated and personal. You:',
        options: [
            { text: 'Continue until you make your point clear', domain: 'conflict', pattern_type: 'digital_persister' },
            { text: 'Disengage and stop responding', domain: 'conflict', pattern_type: 'digital_withdrawer' },
            { text: 'Try to steer it back to the actual topic', domain: 'conflict', pattern_type: 'discussion_redirector' },
            { text: 'Block the person and move on', domain: 'conflict', pattern_type: 'digital_boundary_setter' }
        ],
        reveals: ['online_escalation_management', 'digital_boundary_setting', 'argument_persistence'],
        ipip_neo_relevance: ['conscientiousness_deliberation', 'neuroticism_angry_hostility', 'extraversion_assertiveness'],
        category: 'online_arguments'
    },

    // MONEY/RESOURCE CONFLICT
    {
        id: 'CP020',
        scenario: 'A friend consistently "forgets" their wallet when you go out together. You:',
        options: [
            { text: 'Directly address the pattern with them', domain: 'conflict', pattern_type: 'financial_boundary_setter' },
            { text: 'Start suggesting activities that don\'t cost money', domain: 'conflict', pattern_type: 'situation_adapter' },
            { text: 'Keep paying but feel resentful about it', domain: 'conflict', pattern_type: 'resentful_enabler' },
            { text: 'Stop inviting them to things that cost money', domain: 'conflict', pattern_type: 'exclusion_protector' }
        ],
        reveals: ['financial_boundary_enforcement', 'friend_exploitation_response', 'money_conversation_comfort'],
        ipip_neo_relevance: ['extraversion_assertiveness', 'agreeableness_compliance', 'conscientiousness_deliberation'],
        category: 'financial_conflict'
    },

    // MORAL/ETHICAL CONFLICT
    {
        id: 'CP021',
        scenario: 'You discover a colleague is lying to clients about your company\'s services. You:',
        options: [
            { text: 'Confront them directly about the dishonesty', domain: 'conflict', pattern_type: 'ethical_confronter' },
            { text: 'Report it to management immediately', domain: 'conflict', pattern_type: 'ethical_escalator' },
            { text: 'Try to correct the misinformation when you encounter it', domain: 'conflict', pattern_type: 'damage_controller' },
            { text: 'Document everything but struggle with what to do', domain: 'conflict', pattern_type: 'ethical_paralysis' }
        ],
        reveals: ['ethical_conflict_response', 'whistleblowing_comfort', 'moral_courage'],
        ipip_neo_relevance: ['conscientiousness_dutifulness', 'agreeableness_straightforwardness', 'openness_values'],
        category: 'ethical_conflict'
    },

    // BOUNDARY SETTING PATTERNS
    {
        id: 'CP022',
        scenario: 'Someone consistently asks you to do favors that are inconvenient for you. You:',
        options: [
            { text: 'Start saying no more often', domain: 'conflict', pattern_type: 'boundary_enforcer' },
            { text: 'Explain why the requests are difficult for you', domain: 'conflict', pattern_type: 'context_provider' },
            { text: 'Keep saying yes but feel increasingly overwhelmed', domain: 'conflict', pattern_type: 'boundary_struggler' },
            { text: 'Help them find alternative solutions', domain: 'conflict', pattern_type: 'solution_redirector' }
        ],
        reveals: ['favor_boundary_setting', 'people_pleasing_patterns', 'help_vs_self_care'],
        ipip_neo_relevance: ['agreeableness_compliance', 'extraversion_assertiveness', 'conscientiousness_deliberation'],
        category: 'boundary_conflicts'
    },

    {
        id: 'CP023',
        scenario: 'A family member regularly makes comments that hurt your feelings. You:',
        options: [
            { text: 'Tell them directly how their comments affect you', domain: 'conflict', pattern_type: 'impact_communicator' },
            { text: 'Make comments back to show them how it feels', domain: 'conflict', pattern_type: 'mirror_responder' },
            { text: 'Limit your time around them', domain: 'conflict', pattern_type: 'exposure_reducer' },
            { text: 'Try to develop thicker skin and not let it bother you', domain: 'conflict', pattern_type: 'resilience_builder' }
        ],
        reveals: ['emotional_boundary_protection', 'family_confrontation_comfort', 'hurt_response_patterns'],
        ipip_neo_relevance: ['extraversion_assertiveness', 'neuroticism_self_consciousness', 'agreeableness_compliance'],
        category: 'emotional_boundaries'
    },

    // COMPETITIVE CONFLICT
    {
        id: 'CP024',
        scenario: 'In a competitive situation, someone is clearly cheating or bending rules. You:',
        options: [
            { text: 'Call them out immediately', domain: 'conflict', pattern_type: 'rule_enforcer' },
            { text: 'Report it to the appropriate authority', domain: 'conflict', pattern_type: 'official_reporter' },
            { text: 'Try to beat them despite their advantage', domain: 'conflict', pattern_type: 'competitor_adapter' },
            { text: 'Lose interest in the competition', domain: 'conflict', pattern_type: 'fairness_dependent' }
        ],
        reveals: ['fairness_enforcement', 'competitive_integrity', 'rule_violation_response'],
        ipip_neo_relevance: ['conscientiousness_dutifulness', 'extraversion_assertiveness', 'agreeableness_straightforwardness'],
        category: 'competitive_conflict'
    },

    // CULTURAL/VALUE CONFLICT
    {
        id: 'CP025',
        scenario: 'Someone makes a comment that goes against your core values. You:',
        options: [
            { text: 'Challenge their viewpoint directly', domain: 'conflict', pattern_type: 'value_defender' },
            { text: 'Ask questions to understand their perspective', domain: 'conflict', pattern_type: 'perspective_seeker' },
            { text: 'Change the subject to avoid conflict', domain: 'conflict', pattern_type: 'topic_avoider' },
            { text: 'Share your own values without attacking theirs', domain: 'conflict', pattern_type: 'value_sharer' }
        ],
        reveals: ['value_conflict_handling', 'belief_challenge_comfort', 'ideological_flexibility'],
        ipip_neo_relevance: ['openness_values', 'agreeableness_compliance', 'extraversion_assertiveness'],
        category: 'value_conflicts'
    }
];

// Conflict behavior observations for exploration
const conflictPatterns = {
    // Confrontation behaviors
    'immediate_confronter': { 
        observation: 'You tend to address problems right when you notice them', 
        exploration: 'What drives you to tackle issues immediately? How do others usually respond?',
        growth_invitation: 'You might experiment with timing to maximize your impact and others\' receptiveness'
    },
    'private_addresser': { 
        observation: 'You prefer to work through conflicts one-on-one rather than in groups', 
        exploration: 'What feels better about private conversations? When might group discussion serve better?',
        growth_invitation: 'You could explore when public accountability actually helps resolve issues'
    },
    'harmony_prioritizer': { 
        observation: 'You often choose to maintain peace rather than address difficult issues', 
        exploration: 'What does conflict feel like for you? What relationships mean most to you?',
        growth_invitation: 'You might discover that some conflicts actually strengthen relationships'
    },
    'strategic_documenter': { 
        observation: 'You like to gather evidence and build your case before addressing conflicts', 
        exploration: 'What feels important about being prepared? How do you decide when you have enough information?',
        growth_invitation: 'You could explore balancing your thorough preparation with timely action'
    },
    
    // Escalation behaviors
    'de_escalator': { 
        observation: 'You naturally try to calm things down when conflicts get heated', 
        exploration: 'What skills do you use to de-escalate? How do you ensure your own voice gets heard?',
        growth_invitation: 'You might explore making sure your perspective gets through while calming others'
    },
    'escalation_matcher': { 
        observation: 'You tend to match the intensity level that others bring to conflicts', 
        exploration: 'What happens inside you when others get heated? When does matching energy serve you?',
        growth_invitation: 'You could experiment with staying centered regardless of others\' emotional intensity'
    },
    'situation_exiter': { 
        observation: 'You often remove yourself when conflicts start escalating', 
        exploration: 'What do you need when conflict gets intense? How do you take care of yourself?',
        growth_invitation: 'You might explore when staying engaged could actually lead to better resolution'
    },
    
    // Mediation behaviors
    'active_mediator': { 
        observation: 'You often step in to help others work through their disagreements', 
        exploration: 'What draws you to help others resolve conflicts? How do they respond to your help?',
        growth_invitation: 'You could explore when letting others own their own conflicts serves them better'
    },
    'neutral_observer': { 
        observation: 'You prefer to stay out of conflicts between other people', 
        exploration: 'What feels right about staying neutral? When do you feel pulled to get involved?',
        growth_invitation: 'You might consider when your intervention could genuinely help'
    },
    'conflict_escaper': { 
        observation: 'You feel uncomfortable when others are in conflict around you', 
        exploration: 'What happens in your body when others argue? What would help you feel safer?',
        growth_invitation: 'You could gradually build your tolerance for witnessing others\' disagreements'
    },
    
    // Boundary behaviors
    'boundary_enforcer': { 
        observation: 'You clearly communicate your limits and stick to them', 
        exploration: 'How did you learn to set boundaries? What helps you maintain them?',
        growth_invitation: 'You might explore balancing your firmness with occasional flexibility'
    },
    'boundary_struggler': { 
        observation: 'You often have difficulty saying no or maintaining your limits', 
        exploration: 'What makes boundary-setting challenging? What would change if saying no felt easier?',
        growth_invitation: 'You could start with small, low-stakes boundary-setting practice'
    },
    'silent_compensator': { 
        observation: 'You tend to do extra work rather than address unfair distributions', 
        exploration: 'What drives you to compensate silently? How do you feel about the extra load?',
        growth_invitation: 'You might explore speaking up about imbalances before resentment builds'
    },
    
    // Communication behaviors
    'impact_communicator': { 
        observation: 'You focus on explaining how behaviors affect you personally', 
        exploration: 'What feels important about sharing your experience? How do others respond?',
        growth_invitation: 'You could explore balancing impact sharing with collaborative problem-solving'
    },
    'indirect_communicator': { 
        observation: 'You tend to hint at problems rather than stating them directly', 
        exploration: 'What makes direct communication challenging? When do your hints get through?',
        growth_invitation: 'You might practice kind, direct communication in low-stakes situations'
    },
    'timing_optimizer': { 
        observation: 'You wait for just the right moment to bring up difficult topics', 
        exploration: 'How do you sense the right timing? What happens when the perfect moment doesn\'t come?',
        growth_invitation: 'You could explore addressing issues before resentment has time to build'
    }
};

export { conflictPatternsQuestions, conflictPatterns };