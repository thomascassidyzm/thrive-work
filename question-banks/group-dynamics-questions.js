// GROUP DYNAMICS QUESTION BANK
// 50+ scenarios that reveal how people actually behave in group settings
// vs how they think they behave

const groupDynamicsQuestions = [
    // LEADERSHIP & DOMINANCE PATTERNS
    {
        id: 'GD001',
        scenario: 'At a team meeting, one person is dominating the conversation and others are clearly uncomfortable. You:',
        options: [
            { text: 'Wait for someone else to say something', domain: 'group_dynamics', pattern_type: 'observer' },
            { text: 'Directly address the imbalance', domain: 'group_dynamics', pattern_type: 'intervener' },
            { text: 'Try to redirect with a question to the group', domain: 'group_dynamics', pattern_type: 'facilitator' }
        ],
        reveals: ['leadership_style', 'conflict_comfort', 'group_responsibility'],
        category: 'power_dynamics'
    },
    
    {
        id: 'GD002',
        scenario: 'Your team is stuck on a decision and everyone is looking around waiting for someone to take charge. You:',
        options: [
            { text: 'Step up and suggest a way forward', domain: 'group_dynamics', pattern_type: 'leader' },
            { text: 'Wait to see if anyone else will lead', domain: 'group_dynamics', pattern_type: 'follower' },
            { text: 'Ask what everyone thinks we should do', domain: 'group_dynamics', pattern_type: 'facilitator' },
            { text: 'Suggest we take a break to think it over', domain: 'group_dynamics', pattern_type: 'pause_seeker' }
        ],
        reveals: ['leadership_comfort', 'responsibility_patterns', 'decision_making'],
        category: 'leadership_emergence'
    },

    {
        id: 'GD003',
        scenario: 'Someone takes credit for your idea in a group setting. You:',
        options: [
            { text: 'Immediately speak up: "Actually, that was my suggestion"', domain: 'group_dynamics', pattern_type: 'direct_advocate' },
            { text: 'Let it slide to avoid creating tension', domain: 'group_dynamics', pattern_type: 'harmony_keeper' },
            { text: 'Address it privately with them later', domain: 'group_dynamics', pattern_type: 'private_resolver' }
        ],
        reveals: ['self_advocacy', 'conflict_avoidance', 'recognition_needs'],
        category: 'credit_and_recognition'
    },

    // CONFORMITY & DISSENT PATTERNS
    {
        id: 'GD004',
        scenario: 'The group is enthusiastically supporting an idea you think is fundamentally flawed. You:',
        options: [
            { text: 'Go along with it to maintain group harmony', domain: 'group_dynamics', pattern_type: 'conformer' },
            { text: 'Respectfully present your concerns', domain: 'group_dynamics', pattern_type: 'thoughtful_dissenter' },
            { text: 'Ask probing questions to help them see the issues', domain: 'group_dynamics', pattern_type: 'socratic_challenger' },
            { text: 'Stay quiet but prepare for when it fails', domain: 'group_dynamics', pattern_type: 'silent_skeptic' }
        ],
        reveals: ['conformity_pressure', 'dissent_comfort', 'truth_vs_harmony'],
        category: 'group_think_resistance'
    },

    {
        id: 'GD005',
        scenario: 'You\'re in a meeting where everyone is agreeing with the boss\'s bad idea. You:',
        options: [
            { text: 'Nod along like everyone else', domain: 'group_dynamics', pattern_type: 'authority_conformer' },
            { text: 'Find a diplomatic way to raise concerns', domain: 'group_dynamics', pattern_type: 'diplomatic_challenger' },
            { text: 'Ask clarifying questions that expose the problems', domain: 'group_dynamics', pattern_type: 'strategic_questioner' }
        ],
        reveals: ['authority_deference', 'career_vs_truth', 'courage_patterns'],
        category: 'authority_dynamics'
    },

    {
        id: 'GD006',
        scenario: 'Your friend group is planning something you don\'t want to do, but everyone else seems excited. You:',
        options: [
            { text: 'Go along with it to avoid being difficult', domain: 'group_dynamics', pattern_type: 'social_conformer' },
            { text: 'Suggest an alternative that works for everyone', domain: 'group_dynamics', pattern_type: 'collaborative_redirector' },
            { text: 'Honestly say it\'s not for you', domain: 'group_dynamics', pattern_type: 'authentic_boundary_setter' },
            { text: 'Make an excuse to get out of it', domain: 'group_dynamics', pattern_type: 'indirect_avoider' }
        ],
        reveals: ['peer_pressure_response', 'authenticity_vs_acceptance', 'boundary_setting'],
        category: 'social_pressure'
    },

    // ATTENTION & VISIBILITY PATTERNS
    {
        id: 'GD007',
        scenario: 'In a group discussion, you have a great point to make but several people are talking. You:',
        options: [
            { text: 'Wait for a natural pause in conversation', domain: 'group_dynamics', pattern_type: 'polite_waiter' },
            { text: 'Jump in when you can find an opening', domain: 'group_dynamics', pattern_type: 'active_participant' },
            { text: 'Gesture or say "excuse me" to get attention', domain: 'group_dynamics', pattern_type: 'assertive_speaker' },
            { text: 'Let the moment pass rather than interrupt', domain: 'group_dynamics', pattern_type: 'deferential_observer' }
        ],
        reveals: ['attention_seeking', 'interruption_comfort', 'voice_assertion'],
        category: 'speaking_patterns'
    },

    {
        id: 'GD008',
        scenario: 'At a party, you typically:',
        options: [
            { text: 'Find one person to have a deep conversation with', domain: 'group_dynamics', pattern_type: 'depth_seeker' },
            { text: 'Work the room and talk to lots of people', domain: 'group_dynamics', pattern_type: 'social_networker' },
            { text: 'Stay close to the people you came with', domain: 'group_dynamics', pattern_type: 'safety_cluster' },
            { text: 'Help the host with things to stay busy', domain: 'group_dynamics', pattern_type: 'task_oriented' }
        ],
        reveals: ['social_energy_patterns', 'new_people_comfort', 'group_size_preference'],
        category: 'social_engagement'
    },

    {
        id: 'GD009',
        scenario: 'When you walk into a room full of people you don\'t know well, you:',
        options: [
            { text: 'Look for someone you recognize to join', domain: 'group_dynamics', pattern_type: 'familiar_anchor' },
            { text: 'Introduce yourself to whoever seems approachable', domain: 'group_dynamics', pattern_type: 'social_initiator' },
            { text: 'Find something to do (get a drink, check your phone)', domain: 'group_dynamics', pattern_type: 'activity_buffer' },
            { text: 'Wait for someone to approach you', domain: 'group_dynamics', pattern_type: 'passive_receiver' }
        ],
        reveals: ['social_initiation', 'stranger_anxiety', 'self_introduction_comfort'],
        category: 'social_initiation'
    },

    // CONFLICT & TENSION PATTERNS
    {
        id: 'GD010',
        scenario: 'Two people in your group start arguing and it\'s getting heated. You:',
        options: [
            { text: 'Try to mediate and find common ground', domain: 'group_dynamics', pattern_type: 'peacemaker' },
            { text: 'Stay out of it unless asked to help', domain: 'group_dynamics', pattern_type: 'neutral_observer' },
            { text: 'Suggest taking a break to cool down', domain: 'group_dynamics', pattern_type: 'tension_diffuser' },
            { text: 'Feel uncomfortable and want to leave', domain: 'group_dynamics', pattern_type: 'conflict_avoider' }
        ],
        reveals: ['conflict_mediation', 'group_responsibility', 'tension_tolerance'],
        category: 'conflict_response'
    },

    {
        id: 'GD011',
        scenario: 'Someone in your group consistently interrupts others. You:',
        options: [
            { text: 'Call it out directly: "Let them finish"', domain: 'group_dynamics', pattern_type: 'direct_corrector' },
            { text: 'Try to redirect: "What do you think, Sarah?"', domain: 'group_dynamics', pattern_type: 'diplomatic_redirector' },
            { text: 'Wait and see if anyone else addresses it', domain: 'group_dynamics', pattern_type: 'passive_observer' },
            { text: 'Feel annoyed but don\'t say anything', domain: 'group_dynamics', pattern_type: 'silent_resentment' }
        ],
        reveals: ['group_policing', 'confrontation_comfort', 'fairness_enforcement'],
        category: 'behavioral_correction'
    },

    {
        id: 'GD012',
        scenario: 'Your group is making a decision that will negatively impact someone not present. You:',
        options: [
            { text: 'Speak up for the absent person\'s interests', domain: 'group_dynamics', pattern_type: 'absent_advocate' },
            { text: 'Suggest waiting until they can be included', domain: 'group_dynamics', pattern_type: 'inclusive_delayer' },
            { text: 'Go along with the group\'s decision', domain: 'group_dynamics', pattern_type: 'group_prioritizer' },
            { text: 'Ask if we should check with them first', domain: 'group_dynamics', pattern_type: 'process_questioner' }
        ],
        reveals: ['absent_party_advocacy', 'fairness_vs_efficiency', 'inclusive_thinking'],
        category: 'absent_party_consideration'
    },

    // COLLABORATION & COMPETITION PATTERNS
    {
        id: 'GD013',
        scenario: 'Your team is brainstorming and someone builds on your idea to make it much better. You:',
        options: [
            { text: 'Feel excited that the idea is improving', domain: 'group_dynamics', pattern_type: 'collaborative_builder' },
            { text: 'Feel a bit territorial about your original concept', domain: 'group_dynamics', pattern_type: 'idea_protector' },
            { text: 'Add more to build on their improvement', domain: 'group_dynamics', pattern_type: 'iterative_enhancer' },
            { text: 'Step back and let them run with it', domain: 'group_dynamics', pattern_type: 'generous_releaser' }
        ],
        reveals: ['idea_ownership', 'collaborative_spirit', 'ego_vs_outcome'],
        category: 'idea_building'
    },

    {
        id: 'GD014',
        scenario: 'In a group project, one person isn\'t pulling their weight. You:',
        options: [
            { text: 'Pick up the slack without saying anything', domain: 'group_dynamics', pattern_type: 'silent_compensator' },
            { text: 'Address it directly with them', domain: 'group_dynamics', pattern_type: 'direct_confronter' },
            { text: 'Bring it up with the group/leader', domain: 'group_dynamics', pattern_type: 'authority_escalator' },
            { text: 'Try to motivate them to contribute more', domain: 'group_dynamics', pattern_type: 'motivational_helper' }
        ],
        reveals: ['accountability_enforcement', 'resentment_patterns', 'fairness_expectations'],
        category: 'contribution_imbalance'
    },

    {
        id: 'GD015',
        scenario: 'Someone in your group is clearly struggling with their part of a project. You:',
        options: [
            { text: 'Offer to help them with their section', domain: 'group_dynamics', pattern_type: 'supportive_helper' },
            { text: 'Suggest they ask for help from the group', domain: 'group_dynamics', pattern_type: 'resource_connector' },
            { text: 'Wait to see if they figure it out', domain: 'group_dynamics', pattern_type: 'autonomy_respecter' },
            { text: 'Worry it will affect the group\'s success', domain: 'group_dynamics', pattern_type: 'outcome_worrier' }
        ],
        reveals: ['helping_instincts', 'rescue_patterns', 'group_vs_individual'],
        category: 'struggle_response'
    },

    // STATUS & HIERARCHY PATTERNS
    {
        id: 'GD016',
        scenario: 'In your group, there\'s someone everyone seems to defer to even though they\'re not officially in charge. You:',
        options: [
            { text: 'Also naturally defer to their judgment', domain: 'group_dynamics', pattern_type: 'natural_follower' },
            { text: 'Question why everyone follows their lead', domain: 'group_dynamics', pattern_type: 'hierarchy_questioner' },
            { text: 'Try to balance their influence with other voices', domain: 'group_dynamics', pattern_type: 'power_balancer' },
            { text: 'Challenge their ideas when you disagree', domain: 'group_dynamics', pattern_type: 'authority_challenger' }
        ],
        reveals: ['informal_authority_response', 'hierarchy_comfort', 'power_dynamics'],
        category: 'informal_leadership'
    },

    {
        id: 'GD017',
        scenario: 'You\'re the most experienced person in a group of newcomers. You:',
        options: [
            { text: 'Take charge and guide the group', domain: 'group_dynamics', pattern_type: 'natural_leader' },
            { text: 'Share your knowledge when asked', domain: 'group_dynamics', pattern_type: 'responsive_mentor' },
            { text: 'Try to let others learn by doing', domain: 'group_dynamics', pattern_type: 'experiential_teacher' },
            { text: 'Downplay your experience to fit in', domain: 'group_dynamics', pattern_type: 'expertise_minimizer' }
        ],
        reveals: ['expertise_sharing', 'mentorship_instincts', 'authority_comfort'],
        category: 'expertise_dynamics'
    },

    {
        id: 'GD018',
        scenario: 'Your group has a clear hierarchy and you\'re somewhere in the middle. You:',
        options: [
            { text: 'Focus on serving those above you', domain: 'group_dynamics', pattern_type: 'upward_focused' },
            { text: 'Try to support those below you', domain: 'group_dynamics', pattern_type: 'downward_caring' },
            { text: 'Work to flatten the hierarchy', domain: 'group_dynamics', pattern_type: 'hierarchy_flattener' },
            { text: 'Accept your position and do your part', domain: 'group_dynamics', pattern_type: 'hierarchy_accepter' }
        ],
        reveals: ['hierarchy_navigation', 'power_position_comfort', 'service_direction'],
        category: 'middle_management'
    },

    // INCLUSION & EXCLUSION PATTERNS
    {
        id: 'GD019',
        scenario: 'Your group has inside jokes and references that a new member doesn\'t understand. You:',
        options: [
            { text: 'Make sure to explain the context to them', domain: 'group_dynamics', pattern_type: 'inclusive_explainer' },
            { text: 'Suggest moving to topics everyone can follow', domain: 'group_dynamics', pattern_type: 'topic_redirector' },
            { text: 'Continue with the group flow', domain: 'group_dynamics', pattern_type: 'group_prioritizer' },
            { text: 'Pull them aside later to catch them up', domain: 'group_dynamics', pattern_type: 'private_includer' }
        ],
        reveals: ['inclusion_awareness', 'new_member_sensitivity', 'group_vs_individual'],
        category: 'newcomer_integration'
    },

    {
        id: 'GD020',
        scenario: 'Someone in your friend group is being gradually excluded and you\'ve noticed. You:',
        options: [
            { text: 'Make extra effort to include them', domain: 'group_dynamics', pattern_type: 'inclusion_advocate' },
            { text: 'Ask the group why this is happening', domain: 'group_dynamics', pattern_type: 'process_challenger' },
            { text: 'Talk to them privately about what you\'ve noticed', domain: 'group_dynamics', pattern_type: 'private_supporter' },
            { text: 'Stay out of group dynamics that don\'t involve you', domain: 'group_dynamics', pattern_type: 'non_interventionist' }
        ],
        reveals: ['exclusion_sensitivity', 'social_justice_instincts', 'intervention_comfort'],
        category: 'exclusion_intervention'
    },

    // EMOTIONAL DYNAMICS PATTERNS
    {
        id: 'GD021',
        scenario: 'Someone in your group gets emotional and starts crying during a discussion. You:',
        options: [
            { text: 'Immediately offer comfort and support', domain: 'group_dynamics', pattern_type: 'emotional_caretaker' },
            { text: 'Give them space while staying present', domain: 'group_dynamics', pattern_type: 'respectful_observer' },
            { text: 'Suggest taking a break for them to compose themselves', domain: 'group_dynamics', pattern_type: 'situation_manager' },
            { text: 'Feel uncomfortable and unsure what to do', domain: 'group_dynamics', pattern_type: 'emotional_uncertainty' }
        ],
        reveals: ['emotional_response_patterns', 'caretaking_instincts', 'discomfort_with_emotions'],
        category: 'emotional_situations'
    },

    {
        id: 'GD022',
        scenario: 'Your group is celebrating something but you\'re going through a tough time personally. You:',
        options: [
            { text: 'Join in the celebration despite how you feel', domain: 'group_dynamics', pattern_type: 'group_mood_matcher' },
            { text: 'Share that you\'re struggling and might not be fully present', domain: 'group_dynamics', pattern_type: 'authentic_communicator' },
            { text: 'Find a reason to leave early', domain: 'group_dynamics', pattern_type: 'mood_protector' },
            { text: 'Try to focus on their joy to lift your spirits', domain: 'group_dynamics', pattern_type: 'vicarious_joy_seeker' }
        ],
        reveals: ['mood_authenticity', 'group_vs_self_care', 'emotional_boundaries'],
        category: 'mood_mismatch'
    },

    // DECISION MAKING PATTERNS
    {
        id: 'GD023',
        scenario: 'Your group can\'t decide between two options and is going in circles. You:',
        options: [
            { text: 'Suggest a structured way to make the decision', domain: 'group_dynamics', pattern_type: 'process_organizer' },
            { text: 'Advocate strongly for the option you prefer', domain: 'group_dynamics', pattern_type: 'position_advocate' },
            { text: 'Suggest flipping a coin or voting', domain: 'group_dynamics', pattern_type: 'decision_expediter' },
            { text: 'Wait to see what the group ultimately decides', domain: 'group_dynamics', pattern_type: 'decision_deferrer' }
        ],
        reveals: ['decision_facilitation', 'process_vs_outcome', 'leadership_in_confusion'],
        category: 'decision_deadlock'
    },

    {
        id: 'GD024',
        scenario: 'Your group makes a decision you disagree with but you\'re outvoted. You:',
        options: [
            { text: 'Support the group decision fully', domain: 'group_dynamics', pattern_type: 'team_player' },
            { text: 'Go along but with reservations', domain: 'group_dynamics', pattern_type: 'reluctant_complier' },
            { text: 'Continue advocating for your position', domain: 'group_dynamics', pattern_type: 'persistent_advocate' },
            { text: 'Remove yourself from the decision implementation', domain: 'group_dynamics', pattern_type: 'conscientious_objector' }
        ],
        reveals: ['minority_position_handling', 'group_loyalty_vs_personal_conviction', 'consensus_expectations'],
        category: 'minority_position'
    },

    // COMMUNICATION PATTERNS
    {
        id: 'GD025',
        scenario: 'In group conversations, you tend to:',
        options: [
            { text: 'Listen more than you speak', domain: 'group_dynamics', pattern_type: 'active_listener' },
            { text: 'Share stories and experiences', domain: 'group_dynamics', pattern_type: 'story_contributor' },
            { text: 'Ask questions to understand others better', domain: 'group_dynamics', pattern_type: 'curious_questioner' },
            { text: 'Try to keep the conversation flowing', domain: 'group_dynamics', pattern_type: 'conversation_facilitator' }
        ],
        reveals: ['communication_style', 'attention_focus', 'conversation_role'],
        category: 'communication_preferences'
    },

    {
        id: 'GD026',
        scenario: 'When your group is having a deep, serious conversation, you:',
        options: [
            { text: 'Contribute your own deep thoughts and experiences', domain: 'group_dynamics', pattern_type: 'depth_matcher' },
            { text: 'Listen and ask thoughtful questions', domain: 'group_dynamics', pattern_type: 'depth_facilitator' },
            { text: 'Feel privileged to witness their openness', domain: 'group_dynamics', pattern_type: 'honored_observer' },
            { text: 'Sometimes use humor to lighten heavy moments', domain: 'group_dynamics', pattern_type: 'tension_reliever' }
        ],
        reveals: ['depth_comfort', 'vulnerability_sharing', 'emotional_regulation'],
        category: 'deep_conversations'
    },

    // RESOURCE & FAIRNESS PATTERNS
    {
        id: 'GD027',
        scenario: 'Your group is splitting a bill and someone clearly can\'t afford their fair share. You:',
        options: [
            { text: 'Quietly offer to cover part of their portion', domain: 'group_dynamics', pattern_type: 'generous_helper' },
            { text: 'Suggest the group split it differently', domain: 'group_dynamics', pattern_type: 'fairness_negotiator' },
            { text: 'Stick to equal splits but feel bad about it', domain: 'group_dynamics', pattern_type: 'rule_follower_with_guilt' },
            { text: 'Pretend not to notice the situation', domain: 'group_dynamics', pattern_type: 'situation_avoider' }
        ],
        reveals: ['generosity_patterns', 'fairness_definitions', 'economic_sensitivity'],
        category: 'resource_sharing'
    },

    {
        id: 'GD028',
        scenario: 'Someone in your group always takes more than their fair share (food, time, attention). You:',
        options: [
            { text: 'Address it directly with them', domain: 'group_dynamics', pattern_type: 'direct_boundary_setter' },
            { text: 'Make jokes about it to hint at the problem', domain: 'group_dynamics', pattern_type: 'indirect_communicator' },
            { text: 'Compensate by taking less yourself', domain: 'group_dynamics', pattern_type: 'self_sacrificer' },
            { text: 'Feel resentful but don\'t say anything', domain: 'group_dynamics', pattern_type: 'silent_sufferer' }
        ],
        reveals: ['fairness_enforcement', 'confrontation_avoidance', 'resentment_patterns'],
        category: 'resource_hogging'
    },

    // LOYALTY & BETRAYAL PATTERNS
    {
        id: 'GD029',
        scenario: 'Someone in your group shares something negative about another group member with you. You:',
        options: [
            { text: 'Listen but don\'t engage with the negativity', domain: 'group_dynamics', pattern_type: 'neutral_receiver' },
            { text: 'Defend the person being talked about', domain: 'group_dynamics', pattern_type: 'loyal_defender' },
            { text: 'Ask why they\'re telling you this', domain: 'group_dynamics', pattern_type: 'purpose_questioner' },
            { text: 'Suggest they talk directly to that person', domain: 'group_dynamics', pattern_type: 'direct_communication_advocate' }
        ],
        reveals: ['gossip_participation', 'loyalty_patterns', 'triangulation_handling'],
        category: 'gossip_dynamics'
    },

    {
        id: 'GD030',
        scenario: 'Your group is talking negatively about someone who just left. You:',
        options: [
            { text: 'Change the subject', domain: 'group_dynamics', pattern_type: 'topic_redirector' },
            { text: 'Point out positive things about the person', domain: 'group_dynamics', pattern_type: 'balance_seeker' },
            { text: 'Stay quiet and feel uncomfortable', domain: 'group_dynamics', pattern_type: 'uncomfortable_observer' },
            { text: 'Leave the conversation', domain: 'group_dynamics', pattern_type: 'integrity_protector' }
        ],
        reveals: ['absent_party_loyalty', 'group_negativity_comfort', 'integrity_vs_belonging'],
        category: 'absent_party_discussion'
    }
];

// Pattern observations for exploration
const groupDynamicsPatterns = {
    // Leadership behaviors
    'natural_leader': { 
        observation: 'You tend to step up to lead when groups need direction', 
        exploration: 'What draws you to take charge? When do you prefer to let others lead?',
        growth_invitation: 'You might explore when leading serves the group vs when stepping back empowers others'
    },
    'reluctant_leader': { 
        observation: 'You often have good leadership ideas but hesitate to voice them', 
        exploration: 'What holds you back from sharing your leadership instincts?',
        growth_invitation: 'You might find it interesting to experiment with small leadership moments'
    },
    'facilitator': { 
        observation: 'You tend to help others shine rather than taking center stage', 
        exploration: 'What feels good about enabling others? When might direct leadership serve better?',
        growth_invitation: 'You could explore when your direct voice is exactly what the group needs'
    },
    
    // Conflict behaviors
    'conflict_avoider': { 
        observation: 'You usually prefer to keep things peaceful rather than rock the boat', 
        exploration: 'What does conflict feel like in your body? What would change if disagreement felt safer?',
        growth_invitation: 'You might discover that some conflicts actually strengthen relationships'
    },
    'peacemaker': { 
        observation: 'You often step in to smooth over tensions between others', 
        exploration: 'What drives you to heal rifts? How do others respond to your peacemaking?',
        growth_invitation: 'You could explore when letting others work through their own conflicts serves them better'
    },
    'direct_confronter': { 
        observation: 'You tend to address problems head-on when you see them', 
        exploration: 'What feels important about direct communication? How do others usually respond?',
        growth_invitation: 'You might experiment with timing and approach to maximize your impact'
    },
    
    // Social behaviors
    'harmony_keeper': { 
        observation: 'You often prioritize group harmony, sometimes over your own needs', 
        exploration: 'What happens inside you when there\'s group tension? What would it feel like to voice disagreement?',
        growth_invitation: 'You might find that your authentic voice actually strengthens group dynamics'
    },
    'authentic_boundary_setter': { 
        observation: 'You tend to stay true to yourself even when groups pressure you to conform', 
        exploration: 'What helps you maintain your authenticity? How do others respond to your boundaries?',
        growth_invitation: 'You could explore how your example might encourage others to be more authentic too'
    },
    'social_chameleon': { 
        observation: 'You naturally adapt your behavior to fit different group expectations', 
        exploration: 'Which groups get your most authentic self? What drives the adaptation?',
        growth_invitation: 'You might discover which relationships deserve your full authenticity'
    },
    
    // Communication behaviors
    'active_listener': { 
        observation: 'You tend to focus more on understanding others than being understood', 
        exploration: 'What do you love about deep listening? When do you most want to be heard?',
        growth_invitation: 'You could experiment with sharing your own perspectives more often'
    },
    'conversation_facilitator': { 
        observation: 'You often help conversations flow and include everyone', 
        exploration: 'What feels good about helping others communicate? When do you want the spotlight?',
        growth_invitation: 'You might find that your own voice adds as much value as facilitating others'
    },
    'story_contributor': { 
        observation: 'You like to share experiences and stories to connect with others', 
        exploration: 'What role do stories play in how you connect? How do you feel when others share?',
        growth_invitation: 'You could explore balancing your storytelling with curious questioning'
    }
};

export { groupDynamicsQuestions, groupDynamicsPatterns };