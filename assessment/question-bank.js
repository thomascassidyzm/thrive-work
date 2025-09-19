// THRIVE Diagnostic Question Bank
// AI-weighted questions for probabilistic assessment

class QuestionBank {
    constructor() {
        this.questions = this.initializeQuestions();
        this.usedQuestions = new Set();
    }

    initializeQuestions() {
        return [
            // Entry Questions - Comprehensive Diagnostic Screening
            {
                id: 'wp001',
                type: 'entry',
                category: 'weekly_prep',
                text: 'Thinking about this upcoming work week, how prepared do you feel?',
                options: [
                    { value: 1, text: 'Completely unprepared, dreading it' },
                    { value: 2, text: 'Somewhat unprepared, feeling anxious' },
                    { value: 3, text: 'Well prepared, feeling confident' },
                    { value: 4, text: 'Completely prepared, excited to start' }
                ],
                signals: {
                    structural: { planning_barriers: 'inverse' },
                    individual: { anxiety_level: 'direct' },
                    organizational: { predictability: 'inverse' }
                }
            },

            {
                id: 'wp002',
                type: 'entry',
                category: 'weekly_prep',
                text: 'Do you feel organized and structured going into next week?',
                options: [
                    { value: 1, text: 'Not at all - complete chaos' },
                    { value: 2, text: 'Barely organized, struggling' },
                    { value: 3, text: 'Well organized, clear structure' },
                    { value: 4, text: 'Extremely organized, everything planned' }
                ],
                signals: {
                    structural: { resource_constraints: 'inverse', process_clarity: 'direct' },
                    individual: { organization_skills: 'direct' }
                }
            },

            {
                id: 'wp003',
                type: 'entry',
                category: 'weekly_prep',
                text: 'Do you feel enabled to determine positive outcomes for your week?',
                options: [
                    { value: 1, text: 'Not at all - everything happens to me' },
                    { value: 2, text: 'Limited control over outcomes' },
                    { value: 3, text: 'Good control over most outcomes' },
                    { value: 4, text: 'Complete agency over my week' }
                ],
                signals: {
                    structural: { autonomy_level: 'direct' },
                    organizational: { empowerment_culture: 'direct' },
                    roleClarity: { expectation_clarity: 'direct' }
                }
            },

            // Entry Question 4 - Meeting Culture Initial Screen
            {
                id: 'wp004',
                type: 'entry',
                category: 'meetings_entry',
                text: 'When you think about your meetings this week, what\'s your immediate reaction?',
                options: [
                    { value: 1, text: 'Dread - mostly pointless time wasters' },
                    { value: 2, text: 'Frustration - some value but too many' },
                    { value: 3, text: 'Positive - generally productive' },
                    { value: 4, text: 'Excited - great collaboration time' }
                ],
                signals: {
                    meetingCulture: { meeting_satisfaction: 'direct', time_waste_perception: 'inverse' },
                    organizational: { meeting_governance: 'direct' },
                    psychologicalSafety: { participation_comfort: 'direct' }
                }
            },

            // Entry Question 5 - Energy Pattern Recognition
            {
                id: 'wp005',
                type: 'entry',
                category: 'energy_entry',
                text: 'How would you describe your energy levels throughout a typical work week?',
                options: [
                    { value: 1, text: 'Consistently low - always drained' },
                    { value: 2, text: 'Start okay, decline quickly' },
                    { value: 3, text: 'Generally stable with minor dips' },
                    { value: 4, text: 'Strong and sustained throughout' }
                ],
                signals: {
                    individual: { energy_management: 'direct', burnout_risk: 'inverse' },
                    workLifeIntegration: { sustainability: 'direct' },
                    structural: { workload_balance: 'direct' }
                }
            },

            // Entry Question 6 - Voice and Safety Initial Screen
            {
                id: 'wp006',
                type: 'entry',
                category: 'voice_entry',
                text: 'When you have concerns or ideas at work, how comfortable do you feel expressing them?',
                options: [
                    { value: 1, text: 'Very uncomfortable - I keep quiet' },
                    { value: 2, text: 'Somewhat uncomfortable - I hesitate' },
                    { value: 3, text: 'Generally comfortable speaking up' },
                    { value: 4, text: 'Very comfortable - I speak freely' }
                ],
                signals: {
                    psychologicalSafety: { voice_safety: 'direct', speak_up_comfort: 'direct' },
                    organizational: { openness_culture: 'direct' },
                    departmentalIssues: { team_communication: 'direct' }
                }
            },

            // Entry Question 7 - Values-Choice Alignment
            {
                id: 'wp007',
                type: 'entry',
                category: 'values_entry',
                text: 'How often do your daily work choices align with your personal values and priorities?',
                options: [
                    { value: 1, text: 'Rarely - constant conflict' },
                    { value: 2, text: 'Sometimes - significant misalignment' },
                    { value: 3, text: 'Usually - good alignment' },
                    { value: 4, text: 'Almost always - strong alignment' }
                ],
                signals: {
                    roleClarity: { values_alignment: 'direct', role_fit: 'direct' },
                    individual: { authenticity_comfort: 'direct' },
                    organizational: { culture_values_match: 'direct' }
                }
            },

            // Entry Question 8 - Weekend Restoration Quality
            {
                id: 'wp008',
                type: 'entry',
                category: 'restoration_entry',
                text: 'How do you typically feel on Sunday evening thinking about Monday morning?',
                options: [
                    { value: 1, text: 'Anxious dread - "Sunday scaries"' },
                    { value: 2, text: 'Mild anxiety and reluctance' },
                    { value: 3, text: 'Ready and reasonably positive' },
                    { value: 4, text: 'Excited and energized for the week' }
                ],
                signals: {
                    workLifeIntegration: { weekend_restoration: 'direct', work_dread: 'inverse' },
                    individual: { job_satisfaction: 'direct' },
                    organizational: { workplace_toxicity: 'inverse' }
                }
            },

            // Entry Question 9 - Decision-Making Autonomy
            {
                id: 'wp009',
                type: 'entry',
                category: 'autonomy_entry',
                text: 'How much influence do you have over how you do your work?',
                options: [
                    { value: 1, text: 'None - everything is prescribed' },
                    { value: 2, text: 'Very little - minimal flexibility' },
                    { value: 3, text: 'Quite a bit - good flexibility' },
                    { value: 4, text: 'Complete - full creative control' }
                ],
                signals: {
                    structural: { autonomy_level: 'direct', micromanagement: 'inverse' },
                    roleClarity: { role_boundaries: 'direct' },
                    organizational: { trust_culture: 'direct' }
                }
            },

            // Entry Question 10 - Team Communication Satisfaction
            {
                id: 'wp010',
                type: 'entry',
                category: 'team_entry',
                text: 'How would you rate the communication within your immediate work team?',
                options: [
                    { value: 1, text: 'Poor - lots of confusion and conflict' },
                    { value: 2, text: 'Below average - some significant issues' },
                    { value: 3, text: 'Good - clear and mostly effective' },
                    { value: 4, text: 'Excellent - transparent and seamless' }
                ],
                signals: {
                    departmentalIssues: { team_communication: 'direct', collaboration_quality: 'direct' },
                    psychologicalSafety: { communication_safety: 'direct' },
                    organizational: { communication_effectiveness: 'direct' }
                }
            },

            // ============================================================================
            // EXPANDED TARGETED QUESTIONS - COMPREHENSIVE DIAGNOSTIC DEEP DIVE
            // ============================================================================

            // Meeting Culture Questions - Expanded (12 questions)
            {
                id: 'mt001',
                type: 'targeted',
                category: 'meetings',
                text: 'How many hours per week do you spend in meetings?',
                options: [
                    { value: 5, text: 'Less than 5 hours' },
                    { value: 10, text: '5-10 hours' },
                    { value: 15, text: '11-15 hours' },
                    { value: 20, text: '16-20 hours' },
                    { value: 25, text: 'More than 20 hours' }
                ],
                signals: {
                    meetingCulture: {
                        meeting_hours: 'direct',
                        time_management_stress: 'direct'
                    },
                    structural: { meeting_efficiency: 'inverse' }
                }
            },

            {
                id: 'mt003',
                type: 'targeted',
                category: 'meetings',
                text: 'When a meeting runs 15 minutes over, what do you typically do?',
                options: [
                    { value: 1, text: 'Stay silent, even if I have another commitment' },
                    { value: 2, text: 'Feel frustrated but rarely speak up' },
                    { value: 3, text: 'Politely ask about wrapping up' },
                    { value: 4, text: 'Confidently suggest rescheduling or ending' }
                ],
                signals: {
                    psychologicalSafety: { speak_up_comfort: 'direct', boundary_assertion: 'direct' },
                    meetingCulture: { time_respect: 'direct' },
                    individual: { assertiveness: 'direct' }
                }
            },

            {
                id: 'mt004',
                type: 'targeted',
                category: 'meetings',
                text: 'In team brainstorming sessions, you typically:',
                options: [
                    { value: 1, text: 'Listen but rarely contribute ideas' },
                    { value: 2, text: 'Share safe, conventional suggestions' },
                    { value: 3, text: 'Actively participate with creative ideas' },
                    { value: 4, text: 'Often lead the creative direction' }
                ],
                signals: {
                    individual: { creativity_expression: 'direct', introversion: 'inverse' },
                    psychologicalSafety: { creative_safety: 'direct' },
                    meetingCulture: { participation_culture: 'direct' }
                }
            },

            {
                id: 'mt005',
                type: 'targeted',
                category: 'meetings',
                text: 'When someone presents an idea you strongly disagree with, you:',
                options: [
                    { value: 1, text: 'Keep quiet to avoid conflict' },
                    { value: 2, text: 'Express concerns privately after the meeting' },
                    { value: 3, text: 'Respectfully present alternative viewpoints' },
                    { value: 4, text: 'Challenge ideas directly and constructively' }
                ],
                signals: {
                    individual: { conflict_tolerance: 'direct', agreeableness: 'inverse' },
                    psychologicalSafety: { dissent_safety: 'direct' },
                    organizational: { debate_culture: 'direct' }
                }
            },

            {
                id: 'mt006',
                type: 'targeted',
                category: 'meetings',
                text: 'Your energy level during back-to-back meetings typically:',
                options: [
                    { value: 1, text: 'Depletes rapidly, feeling drained' },
                    { value: 2, text: 'Gradually decreases throughout the day' },
                    { value: 3, text: 'Remains relatively stable' },
                    { value: 4, text: 'Actually energizes me through interaction' }
                ],
                signals: {
                    individual: { introversion: 'inverse', energy_management: 'direct' },
                    structural: { meeting_scheduling: 'inverse' },
                    meetingCulture: { meeting_intensity: 'direct' }
                }
            },

            {
                id: 'mt007',
                type: 'targeted',
                category: 'meetings',
                text: 'When meeting agendas are unclear or missing, you:',
                options: [
                    { value: 1, text: 'Attend anyway, hope for the best' },
                    { value: 2, text: 'Feel frustrated but don\'t address it' },
                    { value: 3, text: 'Request agenda before attending' },
                    { value: 4, text: 'Decline meetings without clear purpose' }
                ],
                signals: {
                    individual: { conscientiousness: 'direct', boundary_setting: 'direct' },
                    structural: { meeting_governance: 'inverse' },
                    organizational: { process_discipline: 'inverse' }
                }
            },

            {
                id: 'mt008',
                type: 'targeted',
                category: 'meetings',
                text: 'In meetings with senior leadership, you feel:',
                options: [
                    { value: 1, text: 'Intimidated and rarely speak' },
                    { value: 2, text: 'Cautious about what to say' },
                    { value: 3, text: 'Confident sharing your perspective' },
                    { value: 4, text: 'Completely comfortable challenging ideas' }
                ],
                signals: {
                    psychologicalSafety: { hierarchy_comfort: 'direct' },
                    individual: { status_sensitivity: 'inverse', confidence: 'direct' },
                    organizational: { power_distance: 'inverse' }
                }
            },

            {
                id: 'mt009',
                type: 'targeted',
                category: 'meetings',
                text: 'When technical discussions go over your head, you:',
                options: [
                    { value: 1, text: 'Pretend to understand to avoid embarrassment' },
                    { value: 2, text: 'Stay quiet and research later' },
                    { value: 3, text: 'Request a brief explanation openly' },
                    { value: 4, text: 'Confidently ask others to explain concepts' }
                ],
                signals: {
                    psychologicalSafety: { learning_safety: 'direct', vulnerability_comfort: 'direct' },
                    individual: { intellectual_humility: 'direct', openness: 'direct' },
                    organizational: { learning_culture: 'direct' }
                }
            },

            {
                id: 'mt002',
                type: 'targeted',
                category: 'meetings',
                text: 'When you\'re in a meeting and someone asks an open question, how likely are you to respond?',
                options: [
                    { value: 1, text: 'Never - I stay silent' },
                    { value: 2, text: 'Rarely - only when directly asked' },
                    { value: 3, text: 'Often - I contribute regularly' },
                    { value: 4, text: 'Always - I\'m very vocal' }
                ],
                signals: {
                    meetingCulture: {
                        speak_up: 'direct',
                        participation_comfort: 'direct'
                    },
                    psychologicalSafety: {
                        speak_up_comfort: 'direct',
                        voice_safety: 'direct'
                    },
                    individual: { extraversion: 'direct' }
                }
            },

            {
                id: 'mt010',
                type: 'targeted',
                category: 'meetings',
                text: 'When meetings end without clear next steps, you typically:',
                options: [
                    { value: 1, text: 'Leave confused but don\'t follow up' },
                    { value: 2, text: 'Hope someone else will clarify later' },
                    { value: 3, text: 'Proactively seek clarity from the organizer' },
                    { value: 4, text: 'Send a follow-up email summarizing action items' }
                ],
                signals: {
                    individual: { conscientiousness: 'direct', initiative: 'direct' },
                    structural: { meeting_governance: 'inverse' },
                    meetingCulture: { follow_through: 'direct' }
                }
            },

            {
                id: 'mt011',
                type: 'targeted',
                category: 'meetings',
                text: 'In virtual meetings, you find yourself:',
                options: [
                    { value: 1, text: 'Multitasking frequently, half-listening' },
                    { value: 2, text: 'Occasionally distracted by other tasks' },
                    { value: 3, text: 'Fully engaged most of the time' },
                    { value: 4, text: 'More focused than in-person meetings' }
                ],
                signals: {
                    individual: { attention_regulation: 'direct', conscientiousness: 'direct' },
                    meetingCulture: { virtual_engagement: 'direct' },
                    structural: { remote_effectiveness: 'direct' }
                }
            },

            {
                id: 'mt012',
                type: 'targeted',
                category: 'meetings',
                text: 'When someone dominates meeting discussions, you:',
                options: [
                    { value: 1, text: 'Stay quiet and let them continue' },
                    { value: 2, text: 'Feel frustrated but don\'t intervene' },
                    { value: 3, text: 'Politely redirect to include others' },
                    { value: 4, text: 'Directly address the imbalance' }
                ],
                signals: {
                    individual: { assertiveness: 'direct', leadership: 'direct' },
                    psychologicalSafety: { intervention_comfort: 'direct' },
                    meetingCulture: { participation_equity: 'direct' }
                }
            },

            // Work-Life Integration Questions - Expanded (12 questions)
            {
                id: 'wl001',
                type: 'targeted',
                category: 'worklife',
                text: 'How easily can you switch from work mode to family/recreation mode?',
                options: [
                    { value: 1, text: 'Very difficult - work thoughts dominate' },
                    { value: 2, text: 'Somewhat difficult - takes hours to switch' },
                    { value: 3, text: 'Pretty easy - switch within 30 minutes' },
                    { value: 4, text: 'Very easy - immediate transition' }
                ],
                signals: {
                    workLifeIntegration: {
                        transition_ease: 'direct',
                        mental_boundaries: 'direct'
                    },
                    individual: {
                        stress_regulation: 'direct',
                        compartmentalization: 'direct',
                        conscientiousness: 'inverse'
                    }
                }
            },

            {
                id: 'wl002',
                type: 'targeted',
                category: 'worklife',
                text: 'Is there a specific day when you consistently feel exhausted?',
                options: [
                    { value: 1, text: 'Every day - constant exhaustion' },
                    { value: 2, text: 'Most days - rarely feel energized' },
                    { value: 3, text: 'End of week - Friday burnout' },
                    { value: 4, text: 'No pattern - energy levels vary' }
                ],
                signals: {
                    individual: {
                        energy_management: 'inverse',
                        burnout_risk: 'direct',
                        neuroticism: 'direct'
                    },
                    structural: {
                        workload_distribution: 'inverse'
                    }
                }
            },

            {
                id: 'wl003',
                type: 'targeted',
                category: 'worklife',
                text: 'How restorative do you find your weekends?',
                options: [
                    { value: 1, text: 'Not at all - dread Monday' },
                    { value: 2, text: 'Slightly - still feel drained' },
                    { value: 3, text: 'Very - feel recharged' },
                    { value: 4, text: 'Completely - excited for the week' }
                ],
                signals: {
                    workLifeIntegration: {
                        weekend_restoration: 'direct',
                        work_intrusion: 'inverse'
                    },
                    individual: {
                        recovery_ability: 'direct',
                        job_satisfaction: 'direct'
                    }
                }
            },

            {
                id: 'wl004',
                type: 'targeted',
                category: 'worklife',
                text: 'When work emergencies arise during personal time, you:',
                options: [
                    { value: 1, text: 'Always drop everything to respond immediately' },
                    { value: 2, text: 'Usually respond quickly, feeling guilty if I don\'t' },
                    { value: 3, text: 'Respond only if truly critical' },
                    { value: 4, text: 'Maintain boundaries unless life-threatening' }
                ],
                signals: {
                    workLifeIntegration: { boundary_setting: 'direct', work_urgency_addiction: 'inverse' },
                    individual: { conscientiousness: 'direct', agreeableness: 'inverse' },
                    organizational: { boundary_respect: 'inverse' }
                }
            },

            {
                id: 'wl005',
                type: 'targeted',
                category: 'worklife',
                text: 'Your partner/family complains that you:',
                options: [
                    { value: 1, text: 'Are always thinking about work' },
                    { value: 2, text: 'Check work messages during personal time' },
                    { value: 3, text: 'Occasionally bring work topics into conversations' },
                    { value: 4, text: 'Keep work and personal life completely separate' }
                ],
                signals: {
                    workLifeIntegration: { work_intrusion: 'direct', relationship_impact: 'direct' },
                    individual: { compartmentalization: 'inverse', conscientiousness: 'direct' },
                    organizational: { workload_sustainability: 'inverse' }
                }
            },

            {
                id: 'wl006',
                type: 'targeted',
                category: 'worklife',
                text: 'When taking vacation days, you typically:',
                options: [
                    { value: 1, text: 'Check email constantly and respond to urgent items' },
                    { value: 2, text: 'Check in once daily to stay informed' },
                    { value: 3, text: 'Check only for true emergencies' },
                    { value: 4, text: 'Completely disconnect from work communications' }
                ],
                signals: {
                    workLifeIntegration: { vacation_boundaries: 'direct', disconnection_ability: 'direct' },
                    individual: { control_needs: 'inverse', conscientiousness: 'direct', anxiety: 'inverse' },
                    organizational: { trust_culture: 'direct' }
                }
            },

            {
                id: 'wl007',
                type: 'targeted',
                category: 'worklife',
                text: 'Your ideal work schedule would be:',
                options: [
                    { value: 1, text: 'Traditional 9-5, clear boundaries' },
                    { value: 2, text: 'Flexible hours but consistent daily routine' },
                    { value: 3, text: 'Compressed work week (4x10 hours)' },
                    { value: 4, text: 'Completely flexible, work when most productive' }
                ],
                signals: {
                    individual: { chronotype_preference: 'direct', autonomy_needs: 'direct', conscientiousness: 'mixed' },
                    workLifeIntegration: { schedule_preference: 'direct' },
                    structural: { flexibility_needs: 'direct' }
                }
            },

            {
                id: 'wl008',
                type: 'targeted',
                category: 'worklife',
                text: 'When you\'re physically ill but can work from home, you:',
                options: [
                    { value: 1, text: 'Work full hours to avoid falling behind' },
                    { value: 2, text: 'Work reduced hours but stay connected' },
                    { value: 3, text: 'Take sick leave but check in occasionally' },
                    { value: 4, text: 'Take full sick leave without working' }
                ],
                signals: {
                    individual: { self_care: 'direct', conscientiousness: 'inverse', boundary_setting: 'direct' },
                    workLifeIntegration: { health_prioritization: 'direct' },
                    organizational: { sick_leave_culture: 'direct' }
                }
            },

            // Psychological Safety Questions - Expanded (15 questions)
            {
                id: 'ps001',
                type: 'targeted',
                category: 'psychological_safety',
                text: 'When you make a mistake at work, how comfortable are you admitting it?',
                options: [
                    { value: 1, text: 'Very uncomfortable - I hide mistakes' },
                    { value: 2, text: 'Uncomfortable - I minimize mistakes' },
                    { value: 3, text: 'Comfortable - I usually admit mistakes' },
                    { value: 4, text: 'Very comfortable - I openly discuss mistakes' }
                ],
                signals: {
                    psychologicalSafety: {
                        admit_mistakes: 'direct',
                        vulnerability_comfort: 'direct'
                    },
                    organizational: {
                        blame_culture: 'inverse',
                        learning_culture: 'direct'
                    },
                    individual: { neuroticism: 'inverse', openness: 'direct' }
                }
            },

            {
                id: 'ps002',
                type: 'targeted',
                category: 'psychological_safety',
                text: 'How comfortable do you feel asking for help when you need it?',
                options: [
                    { value: 1, text: 'Very uncomfortable - I struggle alone' },
                    { value: 2, text: 'Uncomfortable - I rarely ask for help' },
                    { value: 3, text: 'Comfortable - I ask for help when needed' },
                    { value: 4, text: 'Very comfortable - I actively seek support' }
                ],
                signals: {
                    psychologicalSafety: {
                        ask_for_help: 'direct'
                    },
                    individual: {
                        self_sufficiency_pressure: 'inverse',
                        vulnerability_tolerance: 'direct',
                        agreeableness: 'direct'
                    }
                }
            },

            {
                id: 'ps003',
                type: 'targeted',
                category: 'psychological_safety',
                text: 'When you disagree with a popular decision in a team meeting, you:',
                options: [
                    { value: 1, text: 'Stay silent to avoid being seen as difficult' },
                    { value: 2, text: 'Voice mild concerns but don\'t push back' },
                    { value: 3, text: 'Share your perspective respectfully' },
                    { value: 4, text: 'Advocate strongly for your viewpoint' }
                ],
                signals: {
                    psychologicalSafety: { dissent_safety: 'direct', groupthink_resistance: 'direct' },
                    individual: { agreeableness: 'inverse', conscientiousness: 'direct' },
                    organizational: { diversity_of_thought: 'direct' }
                }
            },

            {
                id: 'ps004',
                type: 'targeted',
                category: 'psychological_safety',
                text: 'If you witnessed unethical behavior by a colleague, you would:',
                options: [
                    { value: 1, text: 'Stay quiet to avoid conflict' },
                    { value: 2, text: 'Discuss concerns privately with trusted colleagues' },
                    { value: 3, text: 'Address it directly with the colleague first' },
                    { value: 4, text: 'Report it through proper channels immediately' }
                ],
                signals: {
                    psychologicalSafety: { whistleblowing_safety: 'direct' },
                    individual: { moral_courage: 'direct', conscientiousness: 'direct' },
                    organizational: { ethical_culture: 'direct' }
                }
            },

            // ============================================================================
            // OCEAN BEHAVIORAL SCENARIOS - INTEGRATED PERSONALITY ASSESSMENT
            // ============================================================================

            {
                id: 'oc001',
                type: 'targeted',
                category: 'ocean_openness',
                text: 'Your Saturday afternoon free time: art gallery opening, sports bar with friends, new cooking class, or staying home organizing?',
                options: [
                    { value: 1, text: 'Sports bar - familiar environment with friends' },
                    { value: 2, text: 'Staying home organizing - productive and satisfying' },
                    { value: 3, text: 'Art gallery - drawn to new cultural experiences' },
                    { value: 4, text: 'Cooking class - love learning creative skills' }
                ],
                signals: {
                    individual: {
                        openness: 'direct',
                        novelty_seeking: 'direct',
                        aesthetic_appreciation: 'direct',
                        conscientiousness: 'mixed'
                    },
                    workLifeIntegration: { weekend_preferences: 'direct' }
                }
            },

            {
                id: 'oc002',
                type: 'targeted',
                category: 'ocean_conscientiousness',
                text: 'It\'s 11 PM, you have work tomorrow, but there\'s a Netflix series everyone\'s talking about. You:',
                options: [
                    { value: 1, text: 'Binge-watch several episodes despite tomorrow\'s schedule' },
                    { value: 2, text: 'Watch one episode, then get sucked into two more' },
                    { value: 3, text: 'Save it for the weekend when you have more time' },
                    { value: 4, text: 'Add it to your list but stick to your bedtime routine' }
                ],
                signals: {
                    individual: {
                        conscientiousness: 'direct',
                        impulse_control: 'direct',
                        delayed_gratification: 'direct'
                    },
                    workLifeIntegration: { evening_discipline: 'direct' }
                }
            },

            {
                id: 'oc003',
                type: 'targeted',
                category: 'ocean_extraversion',
                text: 'After a challenging work week, what genuinely restores your energy?',
                options: [
                    { value: 1, text: 'Quiet evening alone with a book or hobby' },
                    { value: 2, text: 'Small dinner with one or two close friends' },
                    { value: 3, text: 'Going out with a group of friends' },
                    { value: 4, text: 'Big social event or party with lots of people' }
                ],
                signals: {
                    individual: {
                        extraversion: 'direct',
                        social_energy: 'direct',
                        introversion: 'inverse'
                    },
                    workLifeIntegration: { energy_restoration_preference: 'direct' }
                }
            },

            {
                id: 'oc004',
                type: 'targeted',
                category: 'ocean_agreeableness',
                text: 'A colleague asks to borrow a significant amount of money for a personal emergency. You:',
                options: [
                    { value: 1, text: 'Decline politely - too risky regardless of relationship' },
                    { value: 2, text: 'Ask detailed questions about repayment timeline' },
                    { value: 3, text: 'Lend it if you trust them, with clear terms' },
                    { value: 4, text: 'Give it without expecting it back if they\'re struggling' }
                ],
                signals: {
                    individual: {
                        agreeableness: 'direct',
                        trust: 'direct',
                        altruism: 'direct',
                        financial_boundaries: 'inverse'
                    },
                    psychologicalSafety: { interpersonal_trust: 'direct' }
                }
            },

            {
                id: 'oc005',
                type: 'targeted',
                category: 'ocean_neuroticism',
                text: 'You\'re stuck in unexpected heavy traffic when you have an important meeting. Your immediate reaction:',
                options: [
                    { value: 1, text: 'Panic, call everyone, catastrophize about consequences' },
                    { value: 2, text: 'Feel very stressed, worried about how this looks' },
                    { value: 3, text: 'Annoyed but call ahead and stay calm' },
                    { value: 4, text: 'Accept it calmly, use time to prepare mentally' }
                ],
                signals: {
                    individual: {
                        neuroticism: 'inverse',
                        stress_response: 'inverse',
                        emotional_regulation: 'direct',
                        anxiety: 'inverse'
                    },
                    structural: { schedule_pressure: 'direct' }
                }
            },

            // ============================================================================
            // COMPANY vs INDIVIDUAL PAIN POINT DISAMBIGUATION
            // ============================================================================

            {
                id: 'cp001',
                type: 'targeted',
                category: 'company_pain_analysis',
                text: 'When you feel overwhelmed at work, it\'s usually because:',
                options: [
                    { value: 1, text: 'Personal life stress affects my work focus' },
                    { value: 2, text: 'I struggle with time management and organization' },
                    { value: 3, text: 'Workload exceeds what\'s reasonable for one person' },
                    { value: 4, text: 'Constant interruptions and poor meeting culture' }
                ],
                signals: {
                    individual: { personal_effectiveness: 'mixed', stress_source: 'mixed' },
                    structural: { workload_management: 'inverse', priority_clarity: 'inverse' },
                    organizational: { workflow_efficiency: 'inverse' }
                }
            },

            {
                id: 'cp002',
                type: 'targeted',
                category: 'company_pain_analysis',
                text: 'Your biggest barrier to doing great work is:',
                options: [
                    { value: 1, text: 'My own skill gaps or knowledge limitations' },
                    { value: 2, text: 'Lack of clear feedback on what\'s expected' },
                    { value: 3, text: 'Too many conflicting priorities and deadlines' },
                    { value: 4, text: 'Bureaucracy and inefficient approval processes' }
                ],
                signals: {
                    individual: { skill_adequacy: 'mixed', development_needs: 'mixed' },
                    roleClarity: { expectation_clarity: 'inverse' },
                    structural: { resource_adequacy: 'inverse', process_efficiency: 'inverse' },
                    organizational: { bureaucracy: 'direct' }
                }
            },

            // ============================================================================
            // ROOT CAUSE ANALYSIS & INTERVENTION ROUTING
            // ============================================================================

            {
                id: 'rc001',
                type: 'targeted',
                category: 'root_cause_analysis',
                text: 'If you could change ONE thing to dramatically improve your work experience, it would be:',
                options: [
                    { value: 1, text: 'Better work-life balance and personal boundaries' },
                    { value: 2, text: 'Clearer communication and expectations from leadership' },
                    { value: 3, text: 'Better team dynamics and psychological safety' },
                    { value: 4, text: 'Personal skill development and career growth opportunities' }
                ],
                signals: {
                    workLifeIntegration: { primary_concern: 'mixed' },
                    organizational: { leadership_clarity: 'mixed', process_efficiency: 'mixed' },
                    psychologicalSafety: { team_dynamics: 'mixed' },
                    individual: { development_priority: 'mixed' }
                }
            },

            {
                id: 'rc002',
                type: 'targeted',
                category: 'intervention_routing',
                text: 'What type of support would be most valuable to you right now?',
                options: [
                    { value: 1, text: 'Personal coaching on stress management and resilience' },
                    { value: 2, text: 'Skills training to improve my effectiveness' },
                    { value: 3, text: 'Leadership intervention to address systemic issues' },
                    { value: 4, text: 'Organizational assessment to identify culture problems' }
                ],
                signals: {
                    individual: { support_preference: 'direct', intervention_readiness: 'direct' },
                    departmentalIssues: { team_intervention_need: 'mixed' },
                    organizational: { systemic_intervention_need: 'mixed' }
                }
            },

            // Structural/Organizational Questions
            {
                id: 'st001',
                type: 'targeted',
                category: 'structural',
                text: 'Do you have a clear plan that you\'re allowed to execute?',
                options: [
                    { value: 1, text: 'No plan and no permission to create one' },
                    { value: 2, text: 'Vague plan, limited execution authority' },
                    { value: 3, text: 'Clear plan, mostly free to execute' },
                    { value: 4, text: 'Clear plan, complete execution freedom' }
                ],
                signals: {
                    structural: {
                        planning_barriers: 'inverse',
                        autonomy_level: 'direct',
                        resource_access: 'direct'
                    },
                    roleClarity: {
                        expectation_clarity: 'direct'
                    }
                }
            },

            {
                id: 'st002',
                type: 'targeted',
                category: 'structural',
                text: 'What specific factors make you feel unprepared for your work week?',
                options: [
                    { value: 1, text: 'Constantly changing priorities' },
                    { value: 2, text: 'Lack of information or resources' },
                    { value: 3, text: 'Personal time management issues' },
                    { value: 4, text: 'External factors beyond work control' }
                ],
                signals: {
                    structural: {
                        priority_stability: 'inverse',
                        resource_constraints: 'direct',
                        leadership_clarity: 'inverse'
                    },
                    individual: {
                        time_management: 'inverse',
                        external_stressors: 'direct'
                    }
                }
            },

            // Role Clarity & Values Alignment
            {
                id: 'rc001',
                type: 'targeted',
                category: 'role_clarity',
                text: 'When work social events conflict with family time, what influences your choice?',
                options: [
                    { value: 1, text: 'Work pressure - I feel I must attend' },
                    { value: 2, text: 'Career concerns - attendance affects advancement' },
                    { value: 3, text: 'Family priority - I choose family unless critical' },
                    { value: 4, text: 'Personal values - I follow my priorities' }
                ],
                signals: {
                    worklife: {
                        boundary_clarity: 'direct',
                        values_alignment: 'direct'
                    },
                    organizational: {
                        culture_pressure: 'inverse',
                        work_life_respect: 'direct'
                    }
                }
            },

            // Departmental Dynamics
            {
                id: 'dd001',
                type: 'targeted',
                category: 'departmental',
                text: 'How would you describe the communication within your immediate team?',
                options: [
                    { value: 1, text: 'Poor - lots of misunderstandings' },
                    { value: 2, text: 'Below average - some communication issues' },
                    { value: 3, text: 'Good - clear and effective most of the time' },
                    { value: 4, text: 'Excellent - transparent and open' }
                ],
                signals: {
                    departmental: {
                        team_communication: 'direct',
                        collaboration_quality: 'direct'
                    },
                    psychologicalSafety: {
                        communication_safety: 'direct'
                    }
                }
            },

            // Broad Exploratory Questions
            {
                id: 'br001',
                type: 'broad',
                category: 'general',
                text: 'What typically happens to your energy levels throughout the work week?',
                options: [
                    { value: 1, text: 'Start low, stay low throughout' },
                    { value: 2, text: 'Start okay, decline rapidly' },
                    { value: 3, text: 'Generally stable with minor dips' },
                    { value: 4, text: 'Start high, maintain or improve' }
                ],
                signals: {
                    individual: {
                        energy_pattern: 'direct',
                        sustainability: 'direct'
                    },
                    structural: {
                        workload_balance: 'direct'
                    }
                }
            },

            {
                id: 'br002',
                type: 'broad',
                category: 'general',
                text: 'How often do you feel your skills and abilities match what your role requires?',
                options: [
                    { value: 1, text: 'Never - constantly struggling' },
                    { value: 2, text: 'Rarely - often feel inadequate' },
                    { value: 3, text: 'Usually - generally well-matched' },
                    { value: 4, text: 'Always - perfect fit for my role' }
                ],
                signals: {
                    roleClarity: {
                        skill_match: 'direct',
                        competence_confidence: 'direct'
                    },
                    individual: {
                        imposter_syndrome: 'inverse'
                    }
                }
            }
            // Additional Structural Barriers Questions
            {
                id: 'st003',
                type: 'targeted',
                category: 'structural',
                text: 'How often do you have the tools and systems you need to do your job well?',
                options: [
                    { value: 1, text: 'Rarely - constantly working around limitations' },
                    { value: 2, text: 'Sometimes - missing key tools regularly' },
                    { value: 3, text: 'Usually - have most of what I need' },
                    { value: 4, text: 'Always - well-equipped for my role' }
                ],
                signals: {
                    structural: { resource_adequacy: 'direct', tool_availability: 'direct' },
                    organizational: { investment_in_staff: 'direct' }
                }
            },

            {
                id: 'st004',
                type: 'targeted',
                category: 'structural',
                text: 'When you need approval for something, how straightforward is the process?',
                options: [
                    { value: 1, text: 'Very complex - involves many people and steps' },
                    { value: 2, text: 'Somewhat complex - takes longer than it should' },
                    { value: 3, text: 'Reasonable - clear process that works' },
                    { value: 4, text: 'Simple - quick and straightforward' }
                ],
                signals: {
                    structural: { bureaucracy: 'inverse', process_efficiency: 'direct' },
                    organizational: { decision_speed: 'direct' }
                }
            },

            {
                id: 'st005',
                type: 'targeted',
                category: 'structural',
                text: 'How often do conflicting priorities make your work difficult?',
                options: [
                    { value: 1, text: 'Constantly - always juggling competing demands' },
                    { value: 2, text: 'Frequently - often pulled in different directions' },
                    { value: 3, text: 'Occasionally - sometimes conflicting priorities' },
                    { value: 4, text: 'Rarely - priorities are usually clear and aligned' }
                ],
                signals: {
                    structural: { priority_alignment: 'inverse', competing_demands: 'direct' },
                    roleClarity: { expectation_clarity: 'inverse' }
                }
            },

            {
                id: 'st006',
                type: 'targeted',
                category: 'structural',
                text: 'How well does information flow between different parts of your organization?',
                options: [
                    { value: 1, text: 'Poorly - departments work in silos' },
                    { value: 2, text: 'Inconsistently - some areas communicate well, others don\'t' },
                    { value: 3, text: 'Generally well - most information gets shared' },
                    { value: 4, text: 'Excellently - seamless information flow' }
                ],
                signals: {
                    structural: { information_flow: 'direct', organizational_silos: 'inverse' },
                    organizational: { collaboration_systems: 'direct' }
                }
            },

            // Additional Role Clarity Questions
            {
                id: 'rc003',
                type: 'targeted',
                category: 'role_clarity',
                text: 'How often do you wonder if you\'re focusing on the right things?',
                options: [
                    { value: 1, text: 'Constantly - unsure what matters most' },
                    { value: 2, text: 'Often - second-guessing my priorities' },
                    { value: 3, text: 'Occasionally - mostly clear on priorities' },
                    { value: 4, text: 'Rarely - very clear on what\'s important' }
                ],
                signals: {
                    roleClarity: { priority_clarity: 'inverse', role_confidence: 'inverse' },
                    individual: { decision_confidence: 'inverse' }
                }
            },

            {
                id: 'rc004',
                type: 'targeted',
                category: 'role_clarity',
                text: 'How clear are you about what success looks like in your role?',
                options: [
                    { value: 1, text: 'Very unclear - unsure how I\'m being evaluated' },
                    { value: 2, text: 'Somewhat unclear - general idea but not specific' },
                    { value: 3, text: 'Mostly clear - understand most expectations' },
                    { value: 4, text: 'Very clear - know exactly what success means' }
                ],
                signals: {
                    roleClarity: { success_metrics: 'direct', performance_clarity: 'direct' },
                    organizational: { feedback_systems: 'direct' }
                }
            },

            {
                id: 'rc005',
                type: 'targeted',
                category: 'role_clarity',
                text: 'How often do you take on tasks that probably aren\'t your responsibility?',
                options: [
                    { value: 1, text: 'Very often - constantly doing others\' work' },
                    { value: 2, text: 'Fairly often - hard to say no to requests' },
                    { value: 3, text: 'Occasionally - sometimes help out' },
                    { value: 4, text: 'Rarely - clear boundaries on my role' }
                ],
                signals: {
                    roleClarity: { boundary_clarity: 'inverse', role_definition: 'inverse' },
                    individual: { boundary_setting: 'inverse', agreeableness: 'direct' }
                }
            },

            // Additional Work-Life Integration Questions
            {
                id: 'wl009',
                type: 'targeted',
                category: 'worklife',
                text: 'How often do you think about work when you\'re trying to relax?',
                options: [
                    { value: 1, text: 'Constantly - can\'t switch off' },
                    { value: 2, text: 'Often - work thoughts intrude regularly' },
                    { value: 3, text: 'Sometimes - occasional work thoughts' },
                    { value: 4, text: 'Rarely - able to fully disconnect' }
                ],
                signals: {
                    workLifeIntegration: { mental_separation: 'inverse', work_intrusion: 'direct' },
                    individual: { rumination: 'direct', stress_regulation: 'inverse' }
                }
            },

            {
                id: 'wl010',
                type: 'targeted',
                category: 'worklife',
                text: 'How do you feel about your current work schedule flexibility?',
                options: [
                    { value: 1, text: 'Very frustrated - no flexibility at all' },
                    { value: 2, text: 'Somewhat frustrated - limited flexibility' },
                    { value: 3, text: 'Generally satisfied - reasonable flexibility' },
                    { value: 4, text: 'Very satisfied - excellent flexibility' }
                ],
                signals: {
                    workLifeIntegration: { schedule_flexibility: 'direct', autonomy: 'direct' },
                    structural: { flexibility_policies: 'direct' }
                }
            },

            {
                id: 'wl011',
                type: 'targeted',
                category: 'worklife',
                text: 'How often does work prevent you from doing things that matter to you personally?',
                options: [
                    { value: 1, text: 'Very often - work always comes first' },
                    { value: 2, text: 'Often - frequently miss personal activities' },
                    { value: 3, text: 'Sometimes - occasional conflicts' },
                    { value: 4, text: 'Rarely - good balance between work and personal' }
                ],
                signals: {
                    workLifeIntegration: { personal_sacrifice: 'direct', life_balance: 'inverse' },
                    structural: { workload_sustainability: 'inverse' }
                }
            },

            // Reverse-Coded Validation Questions
            {
                id: 'val001',
                type: 'validation',
                category: 'consistency_check',
                text: 'How often do you feel completely stress-free at work?',
                options: [
                    { value: 1, text: 'Never - always feel some stress' },
                    { value: 2, text: 'Rarely - occasional stress-free moments' },
                    { value: 3, text: 'Sometimes - regularly feel relaxed' },
                    { value: 4, text: 'Very often - usually stress-free' }
                ],
                signals: {
                    individual: { stress_level: 'inverse', self_awareness: 'mixed' },
                    validation: { stress_consistency: 'reverse_coded' }
                },
                validationPair: 'stress_related_questions'
            },

            {
                id: 'val002',
                type: 'validation',
                category: 'consistency_check',
                text: 'I never have any conflicts with colleagues',
                options: [
                    { value: 1, text: 'Completely false - I have regular conflicts' },
                    { value: 2, text: 'Mostly false - I have occasional conflicts' },
                    { value: 3, text: 'Mostly true - very few conflicts' },
                    { value: 4, text: 'Completely true - never any conflicts' }
                ],
                signals: {
                    psychologicalSafety: { conflict_admission: 'inverse' },
                    validation: { social_desirability: 'direct', honesty_check: 'inverse' }
                },
                validationPair: 'team_dynamics'
            },

            {
                id: 'val003',
                type: 'validation',
                category: 'social_desirability',
                text: 'How often do you check personal messages during work hours?',
                options: [
                    { value: 1, text: 'Never - completely focused on work' },
                    { value: 2, text: 'Rarely - only for urgent matters' },
                    { value: 3, text: 'Sometimes - brief checks throughout the day' },
                    { value: 4, text: 'Often - regularly check personal messages' }
                ],
                signals: {
                    individual: { honesty_indicator: 'direct', self_awareness: 'direct' },
                    validation: { social_desirability_bias: 'inverse' }
                },
                validationPair: 'honesty_baseline'
            },

            // Additional OCEAN Behavioral Scenarios
            {
                id: 'oc006',
                type: 'targeted',
                category: 'ocean_conscientiousness',
                text: 'You\'re running late for a meeting because the previous one overran. You:',
                options: [
                    { value: 1, text: 'Slip in quietly and hope nobody notices' },
                    { value: 2, text: 'Send a quick message explaining the delay' },
                    { value: 3, text: 'Apologize briefly to the group when you arrive' },
                    { value: 4, text: 'Stay late to make up for the lost time later' }
                ],
                signals: {
                    individual: { conscientiousness: 'mixed', accountability: 'direct' },
                    psychologicalSafety: { mistake_handling: 'direct' }
                }
            },

            {
                id: 'oc007',
                type: 'targeted',
                category: 'ocean_openness',
                text: 'Your company is implementing a new software system. Your first reaction is:',
                options: [
                    { value: 1, text: 'Worry about learning curve and potential problems' },
                    { value: 2, text: 'Wait to see how others adapt before trying it' },
                    { value: 3, text: 'Feel curious about new features and possibilities' },
                    { value: 4, text: 'Get excited and volunteer to be an early adopter' }
                ],
                signals: {
                    individual: { openness: 'direct', change_tolerance: 'direct', neophobia: 'inverse' },
                    organizational: { change_adaptation: 'direct' }
                }
            }

        ];
    }

    getNextQuestion(diagnosticEngine, questionType = 'auto') {
        const state = diagnosticEngine.getState();

        if (questionType === 'auto') {
            questionType = this.determineQuestionType(diagnosticEngine);
        }

        console.log('Question type determined:', questionType);
        console.log('Evidence length:', state.evidence.length);
        console.log('Used questions:', Array.from(this.usedQuestions));

        let candidateQuestions;

        if (questionType === 'entry' && state.evidence.length < 6) {
            candidateQuestions = this.questions.filter(q =>
                q.type === 'entry' && !this.usedQuestions.has(q.id)
            );
        } else if (questionType === 'targeted') {
            const focusArea = diagnosticEngine.getHighestUncertaintyDimension();
            candidateQuestions = this.getTargetedQuestionsFor(focusArea);
        } else if (questionType === 'broad') {
            candidateQuestions = this.questions.filter(q =>
                q.type === 'broad' && !this.usedQuestions.has(q.id)
            );
        } else {
            // Default to any unused question
            candidateQuestions = this.questions.filter(q =>
                !this.usedQuestions.has(q.id)
            );
        }

        console.log('Candidate questions found:', candidateQuestions.length);

        if (candidateQuestions.length === 0) {
            console.log('No candidate questions available');
            return null; // No more questions
        }

        // Select question with highest expected information gain
        const selectedQuestion = this.selectOptimalQuestion(candidateQuestions, diagnosticEngine);
        this.usedQuestions.add(selectedQuestion.id);

        console.log('Selected question:', selectedQuestion);
        return selectedQuestion;
    }

    determineQuestionType(diagnosticEngine) {
        const state = diagnosticEngine.getState();

        if (state.evidence.length < 6) {
            return 'entry';
        }

        const diagnosticValues = Object.values(state.diagnosticVector);
        const maxConfidence = diagnosticValues.length > 0 ? Math.max(...diagnosticValues) : 0;

        if (maxConfidence > 0.4) {
            return 'targeted';
        } else {
            return 'broad';
        }
    }

    getTargetedQuestionsFor(focusArea) {
        const categoryMap = {
            structuralBarriers: 'structural',
            meetingCulture: 'meetings',
            workLifeIntegration: 'worklife',
            psychologicalSafety: 'psychological_safety',
            departmentalIssues: 'departmental',
            roleClarity: 'role_clarity'
        };

        const targetCategory = categoryMap[focusArea];

        return this.questions.filter(q =>
            (q.category === targetCategory ||
             (q.signals && Object.keys(q.signals).includes(focusArea))) &&
            !this.usedQuestions.has(q.id)
        );
    }

    selectOptimalQuestion(candidates, diagnosticEngine) {
        // For now, select randomly from candidates
        // TODO: Implement expected information gain calculation
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    processResponse(question, selectedOption, diagnosticEngine) {
        const response = {
            questionId: question.id,
            question: question.text,
            selectedOption: selectedOption,
            category: question.category,
            signals: this.calculateSignals(question, selectedOption)
        };

        return diagnosticEngine.processResponse(response);
    }

    calculateSignals(question, selectedOption) {
        const signals = {};

        if (question.signals) {
            Object.entries(question.signals).forEach(([category, categorySignals]) => {
                signals[category] = {};

                Object.entries(categorySignals).forEach(([signal, direction]) => {
                    let value = selectedOption.value;

                    // Determine the scale based on question options
                    const maxValue = Math.max(...question.options.map(opt => opt.value));
                    const minValue = Math.min(...question.options.map(opt => opt.value));
                    const scaleMidpoint = (maxValue + minValue) / 2;

                    // Apply signal direction transformation
                    if (direction === 'inverse') {
                        value = maxValue + minValue - value; // Invert based on actual scale
                    }

                    // Normalize to -1.2 to +1.2 range for sigmoid function
                    // Adjust for 4-option scale (1-4) vs 5-option scale (1-5) vs other scales
                    signals[category][signal] = (value - scaleMidpoint) * (2.4 / (maxValue - minValue));
                });
            });
        }

        return signals;
    }

    // Get questions for testing/debugging
    getAllQuestions() {
        return this.questions;
    }

    reset() {
        this.usedQuestions.clear();
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuestionBank;
} else {
    window.QuestionBank = QuestionBank;
}