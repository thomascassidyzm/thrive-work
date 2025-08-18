// AUTHORITY RELATIONSHIPS QUESTION BANK
// 34+ scenarios that reveal how people actually respond to power, hierarchy, and authority
// vs how they think they respond

const authorityRelationshipsQuestions = [
    // WORKPLACE HIERARCHY PATTERNS
    {
        id: 'AR001',
        scenario: 'Your boss asks you to do something that goes against your personal principles but isn\'t illegal. You:',
        options: [
            { text: 'Do it without question - they\'re the boss', domain: 'authority', pattern_type: 'compliant_follower' },
            { text: 'Express your concerns but do it anyway', domain: 'authority', pattern_type: 'reluctant_complier' },
            { text: 'Refuse and explain why you can\'t do it', domain: 'authority', pattern_type: 'principled_resistor' },
            { text: 'Ask if there\'s another way to achieve the same goal', domain: 'authority', pattern_type: 'collaborative_problem_solver' }
        ],
        reveals: ['authority_deference', 'principle_vs_security', 'workplace_courage'],
        ipip_neo_relevance: ['agreeableness_compliance', 'conscientiousness_dutifulness', 'openness_values'],
        category: 'workplace_authority'
    },

    {
        id: 'AR002',
        scenario: 'Your manager consistently takes credit for your team\'s work in meetings. You:',
        options: [
            { text: 'Accept it as part of hierarchy - that\'s how it works', domain: 'authority', pattern_type: 'hierarchy_accepter' },
            { text: 'Speak up in the meeting: "Actually, my team did that work"', domain: 'authority', pattern_type: 'public_corrector' },
            { text: 'Address it privately with them after the meeting', domain: 'authority', pattern_type: 'private_advocate' },
            { text: 'Document everything and escalate to their boss', domain: 'authority', pattern_type: 'system_user' }
        ],
        reveals: ['credit_advocacy', 'confrontation_with_authority', 'fairness_expectations'],
        ipip_neo_relevance: ['extraversion_assertiveness', 'agreeableness_straightforwardness', 'conscientiousness_dutifulness'],
        category: 'workplace_recognition'
    },

    {
        id: 'AR003',
        scenario: 'Your CEO sends an email with a policy you think is terrible for employees. You:',
        options: [
            { text: 'Keep your opinions to yourself', domain: 'authority', pattern_type: 'silent_dissenter' },
            { text: 'Discuss concerns with your immediate manager', domain: 'authority', pattern_type: 'chain_of_command_user' },
            { text: 'Reply-all with thoughtful concerns', domain: 'authority', pattern_type: 'bold_challenger' },
            { text: 'Organize informal discussions with colleagues first', domain: 'authority', pattern_type: 'grassroots_organizer' }
        ],
        reveals: ['executive_authority_response', 'risk_taking_with_power', 'change_advocacy'],
        ipip_neo_relevance: ['openness_actions', 'extraversion_assertiveness', 'conscientiousness_deliberation'],
        category: 'executive_authority'
    },

    // PROFESSIONAL SERVICE AUTHORITY
    {
        id: 'AR004',
        scenario: 'Your doctor dismisses your health concerns without proper examination. You:',
        options: [
            { text: 'Accept their judgment - they\'re the expert', domain: 'authority', pattern_type: 'expert_deferrer' },
            { text: 'Insist they take your concerns seriously', domain: 'authority', pattern_type: 'self_advocate' },
            { text: 'Seek a second opinion from another doctor', domain: 'authority', pattern_type: 'authority_shopper' },
            { text: 'Research your symptoms and return with evidence', domain: 'authority', pattern_type: 'informed_challenger' }
        ],
        reveals: ['medical_authority_trust', 'self_advocacy_with_experts', 'health_responsibility'],
        ipip_neo_relevance: ['agreeableness_compliance', 'conscientiousness_competence', 'openness_ideas'],
        category: 'medical_authority'
    },

    {
        id: 'AR005',
        scenario: 'A financial advisor recommends investments that don\'t feel right to you. You:',
        options: [
            { text: 'Follow their advice - they know better than me', domain: 'authority', pattern_type: 'financial_deferrer' },
            { text: 'Ask detailed questions until you understand', domain: 'authority', pattern_type: 'informed_decision_maker' },
            { text: 'Politely decline and look for other options', domain: 'authority', pattern_type: 'autonomous_chooser' },
            { text: 'Go along but feel anxious about it', domain: 'authority', pattern_type: 'reluctant_trustor' }
        ],
        reveals: ['financial_authority_trust', 'decision_autonomy', 'expertise_vs_intuition'],
        ipip_neo_relevance: ['conscientiousness_deliberation', 'neuroticism_anxiety', 'openness_actions'],
        category: 'financial_authority'
    },

    {
        id: 'AR006',
        scenario: 'A mechanic tells you your car needs expensive repairs that seem unnecessary. You:',
        options: [
            { text: 'Agree to the repairs - they\'re the expert', domain: 'authority', pattern_type: 'service_trustor' },
            { text: 'Ask for a detailed explanation of what\'s wrong', domain: 'authority', pattern_type: 'informed_consumer' },
            { text: 'Get a second opinion from another mechanic', domain: 'authority', pattern_type: 'verification_seeker' },
            { text: 'Research the issues online before deciding', domain: 'authority', pattern_type: 'independent_researcher' }
        ],
        reveals: ['service_authority_skepticism', 'consumer_advocacy', 'technical_authority_trust'],
        ipip_neo_relevance: ['agreeableness_trust', 'conscientiousness_competence', 'openness_ideas'],
        category: 'service_authority'
    },

    // LAW ENFORCEMENT & LEGAL AUTHORITY
    {
        id: 'AR007',
        scenario: 'A police officer pulls you over for something you didn\'t do. You:',
        options: [
            { text: 'Accept the ticket and deal with it later', domain: 'authority', pattern_type: 'law_enforcement_complier' },
            { text: 'Politely explain what actually happened', domain: 'authority', pattern_type: 'respectful_corrector' },
            { text: 'Firmly assert your innocence and demand proof', domain: 'authority', pattern_type: 'rights_asserter' },
            { text: 'Comply but ask for badge number and details', domain: 'authority', pattern_type: 'documentation_seeker' }
        ],
        reveals: ['law_enforcement_deference', 'injustice_response', 'rights_consciousness'],
        ipip_neo_relevance: ['agreeableness_compliance', 'extraversion_assertiveness', 'conscientiousness_dutifulness'],
        category: 'law_enforcement'
    },

    {
        id: 'AR008',
        scenario: 'You witness a police officer treating someone unfairly. You:',
        options: [
            { text: 'Stay out of it - not your business', domain: 'authority', pattern_type: 'non_interventionist' },
            { text: 'Quietly record the interaction on your phone', domain: 'authority', pattern_type: 'silent_documenter' },
            { text: 'Speak up and ask if everything is okay', domain: 'authority', pattern_type: 'brave_intervener' },
            { text: 'Call attention to other witnesses present', domain: 'authority', pattern_type: 'community_mobilizer' }
        ],
        reveals: ['bystander_intervention', 'authority_challenging', 'social_justice_action'],
        ipip_neo_relevance: ['agreeableness_altruism', 'extraversion_assertiveness', 'openness_values'],
        category: 'authority_witnessing'
    },

    // INSTITUTIONAL AUTHORITY
    {
        id: 'AR009',
        scenario: 'A government agency gives you the runaround on something you\'re entitled to. You:',
        options: [
            { text: 'Give up - fighting the system isn\'t worth it', domain: 'authority', pattern_type: 'system_accepter' },
            { text: 'Persistently work through proper channels', domain: 'authority', pattern_type: 'process_follower' },
            { text: 'Escalate to supervisors and demand action', domain: 'authority', pattern_type: 'system_challenger' },
            { text: 'Contact elected representatives for help', domain: 'authority', pattern_type: 'political_leverager' }
        ],
        reveals: ['bureaucratic_persistence', 'system_navigation', 'entitlement_advocacy'],
        ipip_neo_relevance: ['conscientiousness_achievement_striving', 'extraversion_assertiveness', 'openness_actions'],
        category: 'bureaucratic_authority'
    },

    {
        id: 'AR010',
        scenario: 'A judge makes a ruling in your case that seems clearly wrong. You:',
        options: [
            { text: 'Accept it - the judge knows the law better', domain: 'authority', pattern_type: 'judicial_deferrer' },
            { text: 'Appeal the decision through proper legal channels', domain: 'authority', pattern_type: 'legal_system_user' },
            { text: 'Research similar cases to understand the ruling', domain: 'authority', pattern_type: 'legal_researcher' },
            { text: 'Feel frustrated but assume they had good reasons', domain: 'authority', pattern_type: 'authority_trustor' }
        ],
        reveals: ['judicial_authority_acceptance', 'legal_system_trust', 'injustice_persistence'],
        ipip_neo_relevance: ['agreeableness_compliance', 'conscientiousness_deliberation', 'openness_ideas'],
        category: 'judicial_authority'
    },

    // EDUCATIONAL AUTHORITY
    {
        id: 'AR011',
        scenario: 'A teacher/professor marks your work unfairly despite clear evidence you\'re right. You:',
        options: [
            { text: 'Accept the grade - they\'re the authority', domain: 'authority', pattern_type: 'academic_complier' },
            { text: 'Respectfully request they review your work again', domain: 'authority', pattern_type: 'grade_advocate' },
            { text: 'Escalate to department head or administration', domain: 'authority', pattern_type: 'academic_appealer' },
            { text: 'Gather evidence and present a formal challenge', domain: 'authority', pattern_type: 'systematic_challenger' }
        ],
        reveals: ['academic_authority_deference', 'fairness_pursuit', 'educational_advocacy'],
        ipip_neo_relevance: ['conscientiousness_achievement_striving', 'agreeableness_compliance', 'openness_ideas'],
        category: 'academic_authority'
    },

    // PARENTAL/FAMILY AUTHORITY
    {
        id: 'AR012',
        scenario: 'Your parents strongly disapprove of a major life decision you want to make. You:',
        options: [
            { text: 'Change your plans to keep them happy', domain: 'authority', pattern_type: 'parental_pleaser' },
            { text: 'Do what you want but try to minimize conflict', domain: 'authority', pattern_type: 'autonomous_harmony_seeker' },
            { text: 'Stand firm and accept their disappointment', domain: 'authority', pattern_type: 'independent_decider' },
            { text: 'Try to convince them why your choice is right', domain: 'authority', pattern_type: 'approval_seeker' }
        ],
        reveals: ['parental_authority_influence', 'autonomy_vs_approval', 'family_harmony_priority'],
        ipip_neo_relevance: ['agreeableness_compliance', 'extraversion_assertiveness', 'openness_values'],
        category: 'family_authority'
    },

    {
        id: 'AR013',
        scenario: 'Your adult siblings expect you to defer to the oldest child in family decisions. You:',
        options: [
            { text: 'Go along with family tradition', domain: 'authority', pattern_type: 'tradition_follower' },
            { text: 'Suggest decisions should be made democratically', domain: 'authority', pattern_type: 'equality_advocate' },
            { text: 'Assert your right to equal input', domain: 'authority', pattern_type: 'sibling_equality_demander' },
            { text: 'Pick your battles - only fight on things that matter', domain: 'authority', pattern_type: 'strategic_challenger' }
        ],
        reveals: ['family_hierarchy_acceptance', 'birth_order_deference', 'family_democracy_preference'],
        ipip_neo_relevance: ['agreeableness_compliance', 'openness_values', 'conscientiousness_deliberation'],
        category: 'family_hierarchy'
    },

    // RELIGIOUS/SPIRITUAL AUTHORITY
    {
        id: 'AR014',
        scenario: 'A religious leader teaches something that conflicts with your personal experience or research. You:',
        options: [
            { text: 'Accept their teaching - they have divine authority', domain: 'authority', pattern_type: 'religious_submitter' },
            { text: 'Study scripture/texts to understand better', domain: 'authority', pattern_type: 'theological_researcher' },
            { text: 'Discuss your concerns with the leader privately', domain: 'authority', pattern_type: 'faithful_questioner' },
            { text: 'Trust your own spiritual discernment', domain: 'authority', pattern_type: 'spiritual_autonomist' }
        ],
        reveals: ['religious_authority_deference', 'spiritual_autonomy', 'faith_vs_reason'],
        ipip_neo_relevance: ['agreeableness_compliance', 'openness_values', 'openness_ideas'],
        category: 'religious_authority'
    },

    // EXPERT/CELEBRITY AUTHORITY
    {
        id: 'AR015',
        scenario: 'A famous expert in a field you care about promotes a view you disagree with. You:',
        options: [
            { text: 'Reconsider your position - they must know better', domain: 'authority', pattern_type: 'celebrity_deferrer' },
            { text: 'Research the evidence behind both positions', domain: 'authority', pattern_type: 'evidence_evaluator' },
            { text: 'Stick with your view - expertise doesn\'t mean infallibility', domain: 'authority', pattern_type: 'expert_skeptic' },
            { text: 'Look for other experts who share your view', domain: 'authority', pattern_type: 'authority_shopper' }
        ],
        reveals: ['expert_authority_influence', 'celebrity_vs_evidence', 'independent_thinking'],
        ipip_neo_relevance: ['openness_ideas', 'conscientiousness_deliberation', 'agreeableness_trust'],
        category: 'expert_authority'
    },

    // SOCIAL MEDIA/DIGITAL AUTHORITY
    {
        id: 'AR016',
        scenario: 'A platform moderator removes your content for "violations" you don\'t understand. You:',
        options: [
            { text: 'Accept it and move on - their platform, their rules', domain: 'authority', pattern_type: 'platform_accepter' },
            { text: 'Appeal the decision through proper channels', domain: 'authority', pattern_type: 'system_challenger' },
            { text: 'Post about it on other platforms to call it out', domain: 'authority', pattern_type: 'public_protester' },
            { text: 'Study their terms of service to understand better', domain: 'authority', pattern_type: 'rule_researcher' }
        ],
        reveals: ['digital_authority_acceptance', 'platform_power_resistance', 'terms_compliance'],
        ipip_neo_relevance: ['agreeableness_compliance', 'extraversion_assertiveness', 'conscientiousness_deliberation'],
        category: 'digital_authority'
    },

    // PEER AUTHORITY
    {
        id: 'AR017',
        scenario: 'In your hobby group, someone with more experience consistently dismisses your ideas. You:',
        options: [
            { text: 'Defer to their experience and stay quiet', domain: 'authority', pattern_type: 'experience_deferrer' },
            { text: 'Continue sharing ideas despite their dismissiveness', domain: 'authority', pattern_type: 'persistent_contributor' },
            { text: 'Ask them to explain why they think your ideas won\'t work', domain: 'authority', pattern_type: 'learning_oriented' },
            { text: 'Find a different group where your input is valued', domain: 'authority', pattern_type: 'environment_changer' }
        ],
        reveals: ['peer_expertise_deference', 'idea_persistence', 'respect_expectations'],
        ipip_neo_relevance: ['agreeableness_compliance', 'extraversion_assertiveness', 'openness_actions'],
        category: 'peer_authority'
    },

    // CUSTOMER SERVICE AUTHORITY
    {
        id: 'AR018',
        scenario: 'A customer service representative says they "can\'t" help with something you know they can do. You:',
        options: [
            { text: 'Accept their answer and give up', domain: 'authority', pattern_type: 'service_accepter' },
            { text: 'Politely ask to speak with a supervisor', domain: 'authority', pattern_type: 'escalation_seeker' },
            { text: 'Explain that you know it\'s possible and how', domain: 'authority', pattern_type: 'informed_challenger' },
            { text: 'Thank them and call back to get someone else', domain: 'authority', pattern_type: 'rep_shopper' }
        ],
        reveals: ['service_authority_persistence', 'system_navigation', 'consumer_advocacy'],
        ipip_neo_relevance: ['conscientiousness_achievement_striving', 'extraversion_assertiveness', 'agreeableness_compliance'],
        category: 'service_authority'
    },

    // TRAFFIC/PARKING AUTHORITY
    {
        id: 'AR019',
        scenario: 'You get a parking ticket that you believe is issued incorrectly. You:',
        options: [
            { text: 'Pay it - fighting isn\'t worth the hassle', domain: 'authority', pattern_type: 'citation_accepter' },
            { text: 'Contest it through the proper appeal process', domain: 'authority', pattern_type: 'systematic_fighter' },
            { text: 'Gather evidence and photos to support your case', domain: 'authority', pattern_type: 'evidence_builder' },
            { text: 'Pay it but complain about unfair enforcement', domain: 'authority', pattern_type: 'reluctant_payer' }
        ],
        reveals: ['municipal_authority_resistance', 'bureaucratic_persistence', 'injustice_tolerance'],
        ipip_neo_relevance: ['conscientiousness_achievement_striving', 'agreeableness_compliance', 'neuroticism_angry_hostility'],
        category: 'municipal_authority'
    },

    // SOCIAL AUTHORITY/INFLUENCERS
    {
        id: 'AR020',
        scenario: 'A popular influencer you follow promotes a product/idea that seems questionable. You:',
        options: [
            { text: 'Trust their recommendation - they wouldn\'t promote something bad', domain: 'authority', pattern_type: 'influencer_truster' },
            { text: 'Research the product/idea independently before deciding', domain: 'authority', pattern_type: 'independent_verifier' },
            { text: 'Ask critical questions in the comments', domain: 'authority', pattern_type: 'public_questioner' },
            { text: 'Unfollow them - this breaks your trust', domain: 'authority', pattern_type: 'trust_withdrawer' }
        ],
        reveals: ['social_authority_influence', 'parasocial_trust', 'critical_thinking_with_popularity'],
        ipip_neo_relevance: ['agreeableness_trust', 'openness_ideas', 'conscientiousness_deliberation'],
        category: 'social_media_authority'
    },

    // AGE/SENIORITY AUTHORITY
    {
        id: 'AR021',
        scenario: 'An elderly person in your community insists on outdated practices that don\'t work well anymore. You:',
        options: [
            { text: 'Respect their wisdom and follow their way', domain: 'authority', pattern_type: 'elder_deferrer' },
            { text: 'Gently suggest more modern approaches', domain: 'authority', pattern_type: 'diplomatic_updater' },
            { text: 'Do things your way while respecting their experience', domain: 'authority', pattern_type: 'parallel_operator' },
            { text: 'Directly explain why the old way isn\'t optimal', domain: 'authority', pattern_type: 'progress_advocate' }
        ],
        reveals: ['age_authority_deference', 'tradition_vs_progress', 'elder_respect_patterns'],
        ipip_neo_relevance: ['agreeableness_compliance', 'openness_actions', 'conscientiousness_deliberation'],
        category: 'age_authority'
    },

    // UNION/ORGANIZATIONAL AUTHORITY
    {
        id: 'AR022',
        scenario: 'Your union representative tells you to support a position you personally disagree with. You:',
        options: [
            { text: 'Support it - union solidarity is important', domain: 'authority', pattern_type: 'collective_loyalist' },
            { text: 'Voice your concerns at the next union meeting', domain: 'authority', pattern_type: 'internal_dissenter' },
            { text: 'Quietly refuse to actively support the position', domain: 'authority', pattern_type: 'passive_resistor' },
            { text: 'Openly disagree while remaining a member', domain: 'authority', pattern_type: 'loyal_opposition' }
        ],
        reveals: ['collective_authority_deference', 'group_vs_individual_conscience', 'organizational_loyalty'],
        ipip_neo_relevance: ['agreeableness_compliance', 'openness_values', 'conscientiousness_dutifulness'],
        category: 'collective_authority'
    },

    // EMERGENCY/SAFETY AUTHORITY
    {
        id: 'AR023',
        scenario: 'During an emergency, an official gives instructions that seem wrong to you. You:',
        options: [
            { text: 'Follow instructions - they know the situation better', domain: 'authority', pattern_type: 'emergency_complier' },
            { text: 'Ask questions to understand their reasoning', domain: 'authority', pattern_type: 'clarification_seeker' },
            { text: 'Follow your own judgment while staying safe', domain: 'authority', pattern_type: 'autonomous_safety_seeker' },
            { text: 'Point out potential problems with their approach', domain: 'authority', pattern_type: 'safety_challenger' }
        ],
        reveals: ['emergency_authority_trust', 'safety_vs_compliance', 'crisis_decision_making'],
        ipip_neo_relevance: ['agreeableness_compliance', 'conscientiousness_deliberation', 'neuroticism_anxiety'],
        category: 'emergency_authority'
    }
];

// Authority behavior observations for exploration
const authorityPatterns = {
    // Compliance behaviors
    'compliant_follower': { 
        observation: 'You tend to naturally follow authority figures without much questioning', 
        exploration: 'What feels safe about deferring to authority? When has this served you well?',
        growth_invitation: 'You might explore when your own judgment deserves equal weight with authority'
    },
    'principled_resistor': { 
        observation: 'You usually stand firm on your principles even when authority figures pressure you', 
        exploration: 'What principles matter most to you? How do you handle the tension this creates?',
        growth_invitation: 'You could explore when flexibility might serve your principles even better'
    },
    'strategic_challenger': { 
        observation: 'You tend to pick your battles carefully when challenging authority', 
        exploration: 'How do you decide which battles are worth fighting? What guides your timing?',
        growth_invitation: 'You might trust your instincts to challenge more often - they seem quite good'
    },
    
    // Trust behaviors
    'expert_deferrer': { 
        observation: 'You often trust people with expertise and credentials over your own judgment', 
        exploration: 'What draws you to trust experts? When has your own judgment proven valuable?',
        growth_invitation: 'You might discover that experts and your intuition can inform each other'
    },
    'evidence_evaluator': { 
        observation: 'You like to verify authority claims independently before accepting them', 
        exploration: 'What drives your need for independent verification? How do others respond to this?',
        growth_invitation: 'You could explore when acting without complete information serves you better'
    },
    'authority_skeptic': { 
        observation: 'You naturally question authority claims and credentials', 
        exploration: 'What experiences shaped your skepticism? When do you find authority genuinely helpful?',
        growth_invitation: 'You might balance your skepticism with openness to genuine expertise'
    },
    
    // Advocacy behaviors
    'self_advocate': { 
        observation: 'You actively stand up for your rights and needs with authority figures', 
        exploration: 'What gives you the confidence to advocate for yourself? How do others respond?',
        growth_invitation: 'You could explore balancing your advocacy with relationship building'
    },
    'system_user': { 
        observation: 'You prefer to work within established systems to create change', 
        exploration: 'What appeals to you about working within systems? When do you feel most effective?',
        growth_invitation: 'You might explore when systems themselves need to be questioned or changed'
    },
    'public_challenger': { 
        observation: 'You\'re willing to openly confront authority figures when needed', 
        exploration: 'What motivates you to challenge publicly? How do you handle the reactions?',
        growth_invitation: 'You could explore when private challenges might be more effective'
    },
    
    // Hierarchy behaviors
    'hierarchy_accepter': { 
        observation: 'You seem comfortable with power structures and tend to work within them', 
        exploration: 'What works well for you about hierarchies? When do they feel limiting?',
        growth_invitation: 'You might explore whether all hierarchies serve everyone fairly'
    },
    'equality_advocate': { 
        observation: 'You prefer flat, democratic approaches to power and decision-making', 
        exploration: 'What feels right about equality? How do you handle situations that need quick decisions?',
        growth_invitation: 'You could explore when some hierarchy might actually serve your equality values'
    },
    'power_balancer': { 
        observation: 'You often work to distribute power more evenly in situations', 
        exploration: 'What drives you to balance power? How do you decide when power is imbalanced?',
        growth_invitation: 'You might explore when concentrated authority actually serves the greater good'
    }
};

export { authorityRelationshipsQuestions, authorityPatterns };