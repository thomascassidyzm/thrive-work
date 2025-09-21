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
            },

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
            },

            // Organizational Alignment Questions
            {
                id: 'org001',
                type: 'targeted',
                category: 'organizational',
                text: 'How well do your company\'s stated values match what actually happens day-to-day?',
                options: [
                    { value: 1, text: 'Very poorly - values are just words on the wall' },
                    { value: 2, text: 'Somewhat poorly - significant gaps between values and reality' },
                    { value: 3, text: 'Reasonably well - values are mostly reflected in practice' },
                    { value: 4, text: 'Very well - values genuinely guide daily decisions' }
                ],
                signals: {
                    organizationalAlignment: { values_authenticity: 'direct', culture_integrity: 'direct' },
                    individual: { cynicism: 'inverse', values_alignment: 'direct' }
                }
            },

            {
                id: 'org002',
                type: 'targeted',
                category: 'organizational',
                text: 'When senior leadership makes decisions, how well do they explain the reasoning?',
                options: [
                    { value: 1, text: 'Very poorly - decisions seem arbitrary and unexplained' },
                    { value: 2, text: 'Somewhat poorly - limited explanation, unclear reasoning' },
                    { value: 3, text: 'Reasonably well - usually understand the rationale' },
                    { value: 4, text: 'Very well - transparent reasoning and clear communication' }
                ],
                signals: {
                    organizationalAlignment: { leadership_transparency: 'direct', trust_in_leadership: 'direct' },
                    psychologicalSafety: { information_safety: 'direct' }
                }
            },

            {
                id: 'org003',
                type: 'targeted',
                category: 'organizational',
                text: 'How confident are you that your company will still be thriving in 5 years?',
                options: [
                    { value: 1, text: 'Not confident - worried about the future' },
                    { value: 2, text: 'Somewhat uncertain - mixed feelings about prospects' },
                    { value: 3, text: 'Reasonably confident - generally optimistic' },
                    { value: 4, text: 'Very confident - excited about the future' }
                ],
                signals: {
                    organizationalAlignment: { future_confidence: 'direct', organizational_stability: 'direct' },
                    individual: { job_security: 'direct', optimism: 'direct' }
                }
            },

            {
                id: 'org004',
                type: 'targeted',
                category: 'organizational',
                text: 'How fairly do you think promotions and opportunities are distributed?',
                options: [
                    { value: 1, text: 'Very unfairly - based on politics not merit' },
                    { value: 2, text: 'Somewhat unfairly - some bias in decision-making' },
                    { value: 3, text: 'Fairly well - generally merit-based with some exceptions' },
                    { value: 4, text: 'Very fairly - consistently merit-based and transparent' }
                ],
                signals: {
                    organizationalAlignment: { fairness_perception: 'direct', meritocracy: 'direct' },
                    psychologicalSafety: { advancement_safety: 'direct' }
                }
            },

            {
                id: 'org005',
                type: 'targeted',
                category: 'organizational',
                text: 'When your company faces challenges, how honest is leadership about the situation?',
                options: [
                    { value: 1, text: 'Very dishonest - information is hidden or sugar-coated' },
                    { value: 2, text: 'Somewhat dishonest - partial truth, some spin' },
                    { value: 3, text: 'Generally honest - truthful with minor omissions' },
                    { value: 4, text: 'Very honest - transparent about challenges and plans' }
                ],
                signals: {
                    organizationalAlignment: { crisis_transparency: 'direct', leadership_honesty: 'direct' },
                    psychologicalSafety: { truth_telling_safety: 'direct' }
                }
            },

            // More Validation Questions (Reverse-Coded)
            {
                id: 'val004',
                type: 'validation',
                category: 'consistency_check',
                text: 'I always feel perfectly organized and on top of everything at work',
                options: [
                    { value: 1, text: 'Completely false - I often feel overwhelmed' },
                    { value: 2, text: 'Mostly false - I sometimes struggle with organization' },
                    { value: 3, text: 'Mostly true - I\'m usually well-organized' },
                    { value: 4, text: 'Completely true - I\'m always perfectly organized' }
                ],
                signals: {
                    individual: { organization_honesty: 'mixed', self_awareness: 'direct' },
                    validation: { perfectionism_check: 'direct', honesty_indicator: 'inverse' }
                },
                validationPair: 'organization_questions'
            },

            {
                id: 'val005',
                type: 'validation',
                category: 'social_desirability',
                text: 'How often do you privately disagree with decisions your manager makes?',
                options: [
                    { value: 1, text: 'Never - I always agree with my manager' },
                    { value: 2, text: 'Rarely - occasional minor disagreements' },
                    { value: 3, text: 'Sometimes - regular disagreements on some issues' },
                    { value: 4, text: 'Often - frequently disagree with their approach' }
                ],
                signals: {
                    individual: { honesty_about_authority: 'direct', independence: 'direct' },
                    validation: { authority_deference_bias: 'inverse' },
                    psychologicalSafety: { dissent_comfort: 'mixed' }
                },
                validationPair: 'authority_relationship'
            },

            {
                id: 'val006',
                type: 'validation',
                category: 'consistency_check',
                text: 'I never make any mistakes in my work',
                options: [
                    { value: 1, text: 'Completely false - I make mistakes like everyone' },
                    { value: 2, text: 'Mostly false - I make occasional mistakes' },
                    { value: 3, text: 'Mostly true - I very rarely make mistakes' },
                    { value: 4, text: 'Completely true - I never make mistakes' }
                ],
                signals: {
                    individual: { mistake_honesty: 'inverse', self_awareness: 'inverse' },
                    validation: { perfectionism_bias: 'direct', social_desirability: 'direct' }
                },
                validationPair: 'mistake_admission'
            },

            // More OCEAN Behavioral Scenarios
            {
                id: 'oc008',
                type: 'targeted',
                category: 'ocean_extraversion',
                text: 'You\'ve been asked to present to the board of directors. Your immediate feeling is:',
                options: [
                    { value: 1, text: 'Dread - worried about being the center of attention' },
                    { value: 2, text: 'Nervous - anxious but will manage' },
                    { value: 3, text: 'Excited - looking forward to the opportunity' },
                    { value: 4, text: 'Thrilled - love high-stakes presentations' }
                ],
                signals: {
                    individual: { extraversion: 'direct', status_comfort: 'direct', presentation_anxiety: 'inverse' },
                    psychologicalSafety: { hierarchy_comfort: 'direct' }
                }
            },

            {
                id: 'oc009',
                type: 'targeted',
                category: 'ocean_agreeableness',
                text: 'A colleague takes credit for your idea in a meeting. You:',
                options: [
                    { value: 1, text: 'Let it slide to avoid making them look bad' },
                    { value: 2, text: 'Mention it privately to them afterward' },
                    { value: 3, text: 'Politely clarify the origin in the meeting' },
                    { value: 4, text: 'Call it out directly and assertively' }
                ],
                signals: {
                    individual: { agreeableness: 'inverse', assertiveness: 'direct', conflict_tolerance: 'direct' },
                    psychologicalSafety: { self_advocacy: 'direct' }
                }
            },

            {
                id: 'oc010',
                type: 'targeted',
                category: 'ocean_neuroticism',
                text: 'You receive an email marked "urgent" from your boss at 6pm on Friday. You:',
                options: [
                    { value: 1, text: 'Drop everything and respond immediately, feeling stressed' },
                    { value: 2, text: 'Read it but wait until Monday unless truly critical' },
                    { value: 3, text: 'Quickly check if it needs immediate attention' },
                    { value: 4, text: 'Ignore it completely until Monday morning' }
                ],
                signals: {
                    individual: { neuroticism: 'mixed', anxiety_response: 'mixed', boundary_setting: 'mixed' },
                    workLifeIntegration: { weekend_boundaries: 'mixed' }
                }
            },

            // Speed/Attention Validation Questions
            {
                id: 'val007',
                type: 'validation',
                category: 'attention_check',
                text: 'For this question, please select "Sometimes - brief checks throughout the day" to show you\'re reading carefully',
                options: [
                    { value: 1, text: 'Never - completely focused' },
                    { value: 2, text: 'Rarely - only urgent matters' },
                    { value: 3, text: 'Sometimes - brief checks throughout the day' },
                    { value: 4, text: 'Often - regularly check messages' }
                ],
                signals: {
                    validation: { attention_check: 'direct', response_quality: 'direct' }
                },
                validationPair: 'attention_validation'
            },

            // Additional Structural Questions
            {
                id: 'st007',
                type: 'targeted',
                category: 'structural',
                text: 'How often do you feel like you\'re working harder, not smarter, due to poor systems?',
                options: [
                    { value: 1, text: 'Constantly - systems create unnecessary work' },
                    { value: 2, text: 'Often - inefficient processes slow me down' },
                    { value: 3, text: 'Sometimes - occasional system frustrations' },
                    { value: 4, text: 'Rarely - systems generally support efficiency' }
                ],
                signals: {
                    structural: { system_efficiency: 'inverse', process_frustration: 'direct' },
                    individual: { work_smart_ability: 'inverse' }
                }
            },

            {
                id: 'st008',
                type: 'targeted',
                category: 'structural',
                text: 'When you need to collaborate across departments, how smooth is the process?',
                options: [
                    { value: 1, text: 'Very difficult - departments don\'t work well together' },
                    { value: 2, text: 'Somewhat difficult - some friction and delays' },
                    { value: 3, text: 'Generally smooth - minor occasional issues' },
                    { value: 4, text: 'Very smooth - seamless cross-department work' }
                ],
                signals: {
                    structural: { cross_department_collaboration: 'direct', organizational_silos: 'inverse' },
                    organizationalAlignment: { department_integration: 'direct' }
                }
            },

            // Additional Role Clarity Questions
            {
                id: 'rc006',
                type: 'targeted',
                category: 'role_clarity',
                text: 'How often do you get conflicting instructions from different people?',
                options: [
                    { value: 1, text: 'Very often - constantly managing competing demands' },
                    { value: 2, text: 'Often - regular conflicts in direction' },
                    { value: 3, text: 'Sometimes - occasional mixed messages' },
                    { value: 4, text: 'Rarely - clear, consistent direction' }
                ],
                signals: {
                    roleClarity: { instruction_consistency: 'inverse', authority_clarity: 'inverse' },
                    structural: { command_structure: 'inverse' }
                }
            },

            {
                id: 'rc007',
                type: 'targeted',
                category: 'role_clarity',
                text: 'How well do you understand how your work contributes to company goals?',
                options: [
                    { value: 1, text: 'Very poorly - unclear how my work matters' },
                    { value: 2, text: 'Somewhat poorly - vague sense of contribution' },
                    { value: 3, text: 'Generally well - understand most connections' },
                    { value: 4, text: 'Very well - clear line from my work to company success' }
                ],
                signals: {
                    roleClarity: { purpose_clarity: 'direct', impact_understanding: 'direct' },
                    individual: { meaning_in_work: 'direct' },
                    organizationalAlignment: { goal_connection: 'direct' }
                }
            },

            // More Validation Questions - Social Desirability & Consistency
            {
                id: 'val008',
                type: 'validation',
                category: 'social_desirability',
                text: 'How often do you arrive exactly on time (not early, not late) for meetings?',
                options: [
                    { value: 1, text: 'Never - I\'m usually early or running late' },
                    { value: 2, text: 'Rarely - timing varies quite a bit' },
                    { value: 3, text: 'Sometimes - occasionally hit it exactly' },
                    { value: 4, text: 'Always - I\'m perfectly punctual every time' }
                ],
                signals: {
                    individual: { punctuality_honesty: 'mixed', self_awareness: 'direct' },
                    validation: { perfectionism_bias: 'direct', social_desirability: 'mixed' }
                },
                validationPair: 'time_management'
            },

            {
                id: 'val009',
                type: 'validation',
                category: 'consistency_check',
                text: 'I am completely satisfied with every aspect of my current role',
                options: [
                    { value: 1, text: 'Completely false - several areas need improvement' },
                    { value: 2, text: 'Mostly false - some significant dissatisfactions' },
                    { value: 3, text: 'Mostly true - generally satisfied with minor issues' },
                    { value: 4, text: 'Completely true - everything is perfect' }
                ],
                signals: {
                    individual: { job_satisfaction_honesty: 'mixed', self_awareness: 'direct' },
                    validation: { satisfaction_exaggeration: 'direct', honesty_check: 'inverse' }
                },
                validationPair: 'job_satisfaction'
            },

            {
                id: 'val010',
                type: 'validation',
                category: 'response_pattern',
                text: 'How often do you feel energized by challenging work tasks?',
                options: [
                    { value: 1, text: 'Never - I prefer routine, predictable work' },
                    { value: 2, text: 'Rarely - challenges usually stress me out' },
                    { value: 3, text: 'Often - I enjoy most challenging situations' },
                    { value: 4, text: 'Always - I thrive on any type of challenge' }
                ],
                signals: {
                    individual: { challenge_preference: 'direct', growth_mindset: 'direct' },
                    validation: { response_consistency: 'mixed', engagement_honesty: 'direct' }
                },
                validationPair: 'challenge_response'
            },

            // Additional Departmental Dynamics Questions
            {
                id: 'dd002',
                type: 'targeted',
                category: 'departmental',
                text: 'How would you describe your manager\'s leadership style?',
                options: [
                    { value: 1, text: 'Micromanaging - closely controls most decisions' },
                    { value: 2, text: 'Directive - gives clear instructions and expectations' },
                    { value: 3, text: 'Collaborative - involves team in decision-making' },
                    { value: 4, text: 'Hands-off - trusts team to work independently' }
                ],
                signals: {
                    departmentalDynamics: { management_style: 'mixed', autonomy_level: 'mixed' },
                    psychologicalSafety: { management_trust: 'mixed' },
                    individual: { autonomy_preference: 'mixed' }
                }
            },

            {
                id: 'dd003',
                type: 'targeted',
                category: 'departmental',
                text: 'When your team faces a problem, what typically happens?',
                options: [
                    { value: 1, text: 'People blame each other or avoid responsibility' },
                    { value: 2, text: 'One person usually takes charge and fixes it' },
                    { value: 3, text: 'We discuss it but solutions take time to emerge' },
                    { value: 4, text: 'We collaborate effectively to solve it quickly' }
                ],
                signals: {
                    departmentalDynamics: { problem_solving_culture: 'direct', blame_culture: 'inverse' },
                    psychologicalSafety: { collective_responsibility: 'direct' },
                    organizationalAlignment: { team_effectiveness: 'direct' }
                }
            },

            {
                id: 'dd004',
                type: 'targeted',
                category: 'departmental',
                text: 'How fairly is workload distributed among your team members?',
                options: [
                    { value: 1, text: 'Very unfairly - some people carry much more than others' },
                    { value: 2, text: 'Somewhat unfairly - noticeable imbalances' },
                    { value: 3, text: 'Generally fairly - minor variations in workload' },
                    { value: 4, text: 'Very fairly - everyone contributes equally' }
                ],
                signals: {
                    departmentalDynamics: { workload_equity: 'direct', team_fairness: 'direct' },
                    psychologicalSafety: { fairness_perception: 'direct' },
                    structural: { resource_allocation: 'direct' }
                }
            },

            // More OCEAN Behavioral Scenarios
            {
                id: 'oc011',
                type: 'targeted',
                category: 'ocean_conscientiousness',
                text: 'You discover a small error in a report you submitted last week. You:',
                options: [
                    { value: 1, text: 'Hope nobody notices and don\'t mention it' },
                    { value: 2, text: 'Fix it quietly in future versions' },
                    { value: 3, text: 'Send a correction to everyone who received it' },
                    { value: 4, text: 'Immediately alert everyone and apologize for the mistake' }
                ],
                signals: {
                    individual: { conscientiousness: 'direct', integrity: 'direct', perfectionism: 'mixed' },
                    psychologicalSafety: { mistake_handling: 'direct' }
                }
            },

            {
                id: 'oc012',
                type: 'targeted',
                category: 'ocean_openness',
                text: 'Your industry is facing major technological disruption. Your reaction is:',
                options: [
                    { value: 1, text: 'Anxious - prefer things to stay as they are' },
                    { value: 2, text: 'Cautious - wait to see which changes stick' },
                    { value: 3, text: 'Interested - curious about new possibilities' },
                    { value: 4, text: 'Excited - love being at the forefront of change' }
                ],
                signals: {
                    individual: { openness: 'direct', change_tolerance: 'direct', innovation_comfort: 'direct' },
                    organizationalAlignment: { change_readiness: 'direct' }
                }
            },

            {
                id: 'oc013',
                type: 'targeted',
                category: 'ocean_extraversion',
                text: 'In team brainstorming sessions, you typically:',
                options: [
                    { value: 1, text: 'Listen quietly and contribute ideas in writing later' },
                    { value: 2, text: 'Share a few ideas when directly asked' },
                    { value: 3, text: 'Actively participate and build on others\' ideas' },
                    { value: 4, text: 'Generate lots of ideas and encourage others to contribute' }
                ],
                signals: {
                    individual: { extraversion: 'direct', idea_generation: 'direct', group_facilitation: 'direct' },
                    meetingCultureOptimization: { participation_style: 'direct' }
                }
            },

            {
                id: 'oc014',
                type: 'targeted',
                category: 'ocean_agreeableness',
                text: 'A team member consistently misses deadlines affecting your work. You:',
                options: [
                    { value: 1, text: 'Work around it without saying anything to avoid conflict' },
                    { value: 2, text: 'Mention it casually in a group setting' },
                    { value: 3, text: 'Have a direct but friendly conversation with them' },
                    { value: 4, text: 'Escalate to management immediately' }
                ],
                signals: {
                    individual: { agreeableness: 'mixed', conflict_avoidance: 'mixed', assertiveness: 'mixed' },
                    psychologicalSafety: { feedback_comfort: 'mixed' }
                }
            },

            // More Entry-Level Questions
            {
                id: 'wp011',
                type: 'entry',
                category: 'feedback_culture',
                text: 'How comfortable do you feel giving honest feedback to your colleagues?',
                options: [
                    { value: 1, text: 'Very uncomfortable - I avoid giving feedback' },
                    { value: 2, text: 'Somewhat uncomfortable - only when absolutely necessary' },
                    { value: 3, text: 'Generally comfortable - depends on the person and situation' },
                    { value: 4, text: 'Very comfortable - I regularly give constructive feedback' }
                ],
                signals: {
                    psychologicalSafety: { feedback_comfort: 'direct', peer_feedback_safety: 'direct' },
                    individual: { assertiveness: 'direct', conflict_tolerance: 'direct' },
                    organizationalAlignment: { feedback_culture: 'direct' }
                }
            },

            {
                id: 'wp012',
                type: 'entry',
                category: 'decision_making',
                text: 'How often are you involved in decisions that affect your daily work?',
                options: [
                    { value: 1, text: 'Never - decisions are made without my input' },
                    { value: 2, text: 'Rarely - occasionally asked for input' },
                    { value: 3, text: 'Often - regularly consulted on relevant decisions' },
                    { value: 4, text: 'Always - actively involved in all decisions affecting me' }
                ],
                signals: {
                    structural: { decision_participation: 'direct', autonomy_level: 'direct' },
                    psychologicalSafety: { voice_in_decisions: 'direct' },
                    organizationalAlignment: { inclusive_culture: 'direct' }
                }
            },

            // Additional Work-Life Integration Questions
            {
                id: 'wl012',
                type: 'targeted',
                category: 'worklife',
                text: 'How often do you feel guilty about not working when you\'re not at work?',
                options: [
                    { value: 1, text: 'Very often - I feel guilty during most personal time' },
                    { value: 2, text: 'Often - guilt intrudes regularly during off-hours' },
                    { value: 3, text: 'Sometimes - occasional guilt about work' },
                    { value: 4, text: 'Rarely - I don\'t feel guilty about personal time' }
                ],
                signals: {
                    workLifeIntegration: { work_guilt: 'direct', mental_separation: 'inverse' },
                    individual: { perfectionism: 'direct', anxiety: 'direct' },
                    organizational: { work_pressure_culture: 'direct' }
                }
            },

            {
                id: 'wl013',
                type: 'targeted',
                category: 'worklife',
                text: 'How easy is it for you to take time off when you need it?',
                options: [
                    { value: 1, text: 'Very difficult - feel pressured not to take time off' },
                    { value: 2, text: 'Somewhat difficult - some barriers or guilt' },
                    { value: 3, text: 'Generally easy - minor logistical challenges' },
                    { value: 4, text: 'Very easy - no barriers to taking needed time off' }
                ],
                signals: {
                    workLifeIntegration: { time_off_accessibility: 'direct', vacation_pressure: 'inverse' },
                    organizational: { time_off_culture: 'direct', workload_sustainability: 'direct' },
                    structural: { coverage_systems: 'direct' }
                }
            },

            // More Validation - Speed Traps
            {
                id: 'val011',
                type: 'validation',
                category: 'speed_check',
                text: 'Please read this carefully: For quality assurance, select "Often - regular disagreements on some issues" for this question about workplace disagreements.',
                options: [
                    { value: 1, text: 'Never - I always agree with everyone' },
                    { value: 2, text: 'Rarely - occasional minor disagreements' },
                    { value: 3, text: 'Often - regular disagreements on some issues' },
                    { value: 4, text: 'Constantly - I disagree with most decisions' }
                ],
                signals: {
                    validation: { reading_attention: 'direct', instruction_following: 'direct' }
                },
                validationPair: 'attention_validation_2'
            },

            // Additional Psychological Safety Questions
            {
                id: 'ps005',
                type: 'targeted',
                category: 'psychological_safety',
                text: 'How comfortable would you feel admitting you don\'t understand something in a team meeting?',
                options: [
                    { value: 1, text: 'Very uncomfortable - would pretend to understand' },
                    { value: 2, text: 'Somewhat uncomfortable - might ask privately later' },
                    { value: 3, text: 'Generally comfortable - would ask for clarification' },
                    { value: 4, text: 'Very comfortable - regularly ask questions when unclear' }
                ],
                signals: {
                    psychologicalSafety: { learning_safety: 'direct', vulnerability_comfort: 'direct' },
                    individual: { intellectual_humility: 'direct', status_anxiety: 'inverse' }
                }
            },

            {
                id: 'ps006',
                type: 'targeted',
                category: 'psychological_safety',
                text: 'If you saw a colleague struggling with their workload, you would:',
                options: [
                    { value: 1, text: 'Do nothing - not my place to get involved' },
                    { value: 2, text: 'Mention it privately to them' },
                    { value: 3, text: 'Offer specific help if you can provide it' },
                    { value: 4, text: 'Proactively suggest team solutions or raise with manager' }
                ],
                signals: {
                    psychologicalSafety: { helping_behavior: 'direct', collective_care: 'direct' },
                    individual: { empathy: 'direct', prosocial_behavior: 'direct' },
                    organizationalAlignment: { supportive_culture: 'direct' }
                }
            },

            // Final Validation Questions - Complete the Suite
            {
                id: 'val012',
                type: 'validation',
                category: 'consistency_check',
                text: 'I never experience any stress or pressure at work',
                options: [
                    { value: 1, text: 'Completely false - I experience regular stress' },
                    { value: 2, text: 'Mostly false - I have some stressful periods' },
                    { value: 3, text: 'Mostly true - very little stress in my role' },
                    { value: 4, text: 'Completely true - absolutely no stress ever' }
                ],
                signals: {
                    individual: { stress_honesty: 'inverse', self_awareness: 'inverse' },
                    validation: { stress_denial: 'direct', perfectionism_bias: 'direct' }
                },
                validationPair: 'stress_consistency'
            },

            {
                id: 'val013',
                type: 'validation',
                category: 'social_desirability',
                text: 'How often do you daydream or lose focus during meetings?',
                options: [
                    { value: 1, text: 'Never - I\'m always completely focused' },
                    { value: 2, text: 'Rarely - only when meetings are very long' },
                    { value: 3, text: 'Sometimes - depends on the topic and format' },
                    { value: 4, text: 'Often - I struggle to stay engaged in most meetings' }
                ],
                signals: {
                    individual: { attention_honesty: 'direct', meeting_engagement: 'mixed' },
                    validation: { focus_perfectionism: 'inverse', honesty_indicator: 'direct' }
                },
                validationPair: 'attention_honesty'
            },

            {
                id: 'val014',
                type: 'validation',
                category: 'response_speed',
                text: 'How often do you procrastinate on tasks you find boring or difficult?',
                options: [
                    { value: 1, text: 'Never - I always tackle tasks immediately' },
                    { value: 2, text: 'Rarely - only on particularly unpleasant tasks' },
                    { value: 3, text: 'Sometimes - depends on my mood and workload' },
                    { value: 4, text: 'Often - I regularly put off challenging work' }
                ],
                signals: {
                    individual: { procrastination_honesty: 'direct', conscientiousness: 'mixed' },
                    validation: { behavioral_honesty: 'direct', social_desirability: 'inverse' }
                },
                validationPair: 'work_behavior_honesty'
            },

            {
                id: 'val015',
                type: 'validation',
                category: 'attention_check',
                text: 'This is an attention check. Please select "Generally comfortable - would ask for clarification" to continue.',
                options: [
                    { value: 1, text: 'Very uncomfortable - would avoid asking' },
                    { value: 2, text: 'Somewhat uncomfortable - might ask privately' },
                    { value: 3, text: 'Generally comfortable - would ask for clarification' },
                    { value: 4, text: 'Very comfortable - always ask questions' }
                ],
                signals: {
                    validation: { attention_check_2: 'direct', instruction_following: 'direct' }
                },
                validationPair: 'attention_validation_3'
            },

            // Additional OCEAN Scenarios - Complete the Suite
            {
                id: 'oc015',
                type: 'targeted',
                category: 'ocean_neuroticism',
                text: 'Your team\'s project deadline has been moved up by two weeks. Your immediate reaction is:',
                options: [
                    { value: 1, text: 'Panic - feel overwhelmed and stressed about impossible timeline' },
                    { value: 2, text: 'Worry - concerned about quality with rushed schedule' },
                    { value: 3, text: 'Focus - immediately start planning how to adapt' },
                    { value: 4, text: 'Energize - thrive on the challenge and urgency' }
                ],
                signals: {
                    individual: { neuroticism: 'inverse', stress_response: 'inverse', challenge_response: 'direct' },
                    structural: { deadline_pressure: 'mixed' }
                }
            },

            {
                id: 'oc016',
                type: 'targeted',
                category: 'ocean_openness',
                text: 'You\'re invited to join a cross-functional project in an area you know nothing about. You:',
                options: [
                    { value: 1, text: 'Decline - prefer to stick to what I know well' },
                    { value: 2, text: 'Hesitate - worried about being out of my depth' },
                    { value: 3, text: 'Accept cautiously - willing to learn but nervous' },
                    { value: 4, text: 'Jump at the chance - love learning new domains' }
                ],
                signals: {
                    individual: { openness: 'direct', learning_orientation: 'direct', comfort_zone_expansion: 'direct' },
                    organizational: { cross_functional_collaboration: 'direct' }
                }
            },

            {
                id: 'oc017',
                type: 'targeted',
                category: 'ocean_extraversion',
                text: 'At a company social event, you typically:',
                options: [
                    { value: 1, text: 'Stay briefly then leave early - these events drain me' },
                    { value: 2, text: 'Find one person I know and stick with them' },
                    { value: 3, text: 'Mingle with several people throughout the event' },
                    { value: 4, text: 'Work the room, meeting as many people as possible' }
                ],
                signals: {
                    individual: { extraversion: 'direct', social_energy: 'direct', networking_comfort: 'direct' },
                    organizationalAlignment: { social_integration: 'direct' }
                }
            },

            // Additional Entry Questions
            {
                id: 'wp013',
                type: 'entry',
                category: 'learning_culture',
                text: 'How supported do you feel when you need to learn new skills for your role?',
                options: [
                    { value: 1, text: 'Not supported - expected to figure it out alone' },
                    { value: 2, text: 'Minimally supported - limited resources available' },
                    { value: 3, text: 'Well supported - good resources and guidance' },
                    { value: 4, text: 'Excellently supported - comprehensive learning opportunities' }
                ],
                signals: {
                    organizationalAlignment: { learning_support: 'direct', development_investment: 'direct' },
                    structural: { training_resources: 'direct' },
                    individual: { growth_opportunity: 'direct' }
                }
            },

            {
                id: 'wp014',
                type: 'entry',
                category: 'recognition_culture',
                text: 'How often do you receive recognition for good work?',
                options: [
                    { value: 1, text: 'Never - good work goes unnoticed' },
                    { value: 2, text: 'Rarely - occasional acknowledgment' },
                    { value: 3, text: 'Regularly - consistent recognition for contributions' },
                    { value: 4, text: 'Frequently - strong culture of appreciation' }
                ],
                signals: {
                    organizationalAlignment: { recognition_culture: 'direct', appreciation_frequency: 'direct' },
                    individual: { motivation: 'direct', job_satisfaction: 'direct' },
                    psychologicalSafety: { contribution_visibility: 'direct' }
                }
            },

            {
                id: 'wp015',
                type: 'entry',
                category: 'innovation_culture',
                text: 'How comfortable do you feel suggesting new ways of doing things?',
                options: [
                    { value: 1, text: 'Very uncomfortable - stick to established methods' },
                    { value: 2, text: 'Somewhat uncomfortable - only suggest safe improvements' },
                    { value: 3, text: 'Generally comfortable - share ideas when appropriate' },
                    { value: 4, text: 'Very comfortable - regularly propose innovations' }
                ],
                signals: {
                    psychologicalSafety: { innovation_safety: 'direct', idea_sharing_comfort: 'direct' },
                    organizationalAlignment: { innovation_culture: 'direct' },
                    individual: { creativity_expression: 'direct' }
                }
            },

            // Additional Meeting Culture Questions
            {
                id: 'mt013',
                type: 'targeted',
                category: 'meetings',
                text: 'How often do meetings you attend actually accomplish their stated purpose?',
                options: [
                    { value: 1, text: 'Rarely - most meetings feel pointless' },
                    { value: 2, text: 'Sometimes - about half are effective' },
                    { value: 3, text: 'Usually - most meetings achieve their goals' },
                    { value: 4, text: 'Almost always - meetings are consistently productive' }
                ],
                signals: {
                    meetingCultureOptimization: { meeting_effectiveness: 'direct', purpose_achievement: 'direct' },
                    structural: { meeting_governance: 'direct' },
                    organizationalAlignment: { process_efficiency: 'direct' }
                }
            },

            {
                id: 'mt014',
                type: 'targeted',
                category: 'meetings',
                text: 'When someone joins a meeting late, what typically happens?',
                options: [
                    { value: 1, text: 'We stop everything to catch them up' },
                    { value: 2, text: 'Someone briefly summarizes what they missed' },
                    { value: 3, text: 'They quietly catch up on their own' },
                    { value: 4, text: 'We continue without disruption' }
                ],
                signals: {
                    meetingCultureOptimization: { meeting_discipline: 'mixed', interruption_tolerance: 'mixed' },
                    organizationalAlignment: { time_respect: 'mixed' }
                }
            },

            // Additional Structural Questions
            {
                id: 'st009',
                type: 'targeted',
                category: 'structural',
                text: 'How clear are the processes for getting things done in your organization?',
                options: [
                    { value: 1, text: 'Very unclear - I often don\'t know how to proceed' },
                    { value: 2, text: 'Somewhat unclear - requires asking around for guidance' },
                    { value: 3, text: 'Generally clear - most processes are documented' },
                    { value: 4, text: 'Very clear - comprehensive and accessible process guides' }
                ],
                signals: {
                    structural: { process_clarity: 'direct', documentation_quality: 'direct' },
                    organizationalAlignment: { operational_efficiency: 'direct' },
                    individual: { navigation_ease: 'direct' }
                }
            },

            {
                id: 'st010',
                type: 'targeted',
                category: 'structural',
                text: 'How often do you encounter technical problems that slow down your work?',
                options: [
                    { value: 1, text: 'Daily - constant technical frustrations' },
                    { value: 2, text: 'Weekly - regular technical barriers' },
                    { value: 3, text: 'Monthly - occasional technical issues' },
                    { value: 4, text: 'Rarely - technology supports my work well' }
                ],
                signals: {
                    structural: { technical_infrastructure: 'inverse', system_reliability: 'inverse' },
                    individual: { technical_frustration: 'direct' },
                    organizationalAlignment: { technology_investment: 'inverse' }
                }
            },

            // More Complex Psychological Safety Questions
            {
                id: 'ps007',
                type: 'targeted',
                category: 'psychological_safety',
                text: 'If you had a personal emergency during work hours, how comfortable would you feel telling your manager?',
                options: [
                    { value: 1, text: 'Very uncomfortable - would try to handle it secretly' },
                    { value: 2, text: 'Somewhat uncomfortable - only if absolutely necessary' },
                    { value: 3, text: 'Generally comfortable - would explain the situation' },
                    { value: 4, text: 'Very comfortable - confident in understanding and support' }
                ],
                signals: {
                    psychologicalSafety: { personal_safety: 'direct', vulnerability_comfort: 'direct' },
                    organizationalAlignment: { human_understanding: 'direct' },
                    workLifeIntegration: { personal_priority_acceptance: 'direct' }
                }
            },

            {
                id: 'ps008',
                type: 'targeted',
                category: 'psychological_safety',
                text: 'How comfortable would you feel disagreeing with a decision your team has already committed to?',
                options: [
                    { value: 1, text: 'Very uncomfortable - wouldn\'t want to rock the boat' },
                    { value: 2, text: 'Somewhat uncomfortable - might express concerns privately' },
                    { value: 3, text: 'Generally comfortable - would voice thoughtful objections' },
                    { value: 4, text: 'Very comfortable - important to speak up about concerns' }
                ],
                signals: {
                    psychologicalSafety: { post_decision_dissent: 'direct', commitment_vs_safety: 'mixed' },
                    individual: { conviction_strength: 'direct' },
                    organizationalAlignment: { dissent_tolerance: 'direct' }
                }
            },

            // Additional Role Clarity Questions
            {
                id: 'rc008',
                type: 'targeted',
                category: 'role_clarity',
                text: 'How well does your actual daily work match your official job description?',
                options: [
                    { value: 1, text: 'Very poorly - completely different from job description' },
                    { value: 2, text: 'Somewhat poorly - significant differences' },
                    { value: 3, text: 'Generally well - mostly aligned with some variations' },
                    { value: 4, text: 'Very well - job description accurately reflects my work' }
                ],
                signals: {
                    roleClarity: { role_accuracy: 'direct', job_description_relevance: 'direct' },
                    structural: { role_definition_quality: 'direct' },
                    organizationalAlignment: { role_management: 'direct' }
                }
            },

            // Final Validation Questions
            {
                id: 'val016',
                type: 'validation',
                category: 'consistency_check',
                text: 'My workload is always perfectly manageable and never overwhelming',
                options: [
                    { value: 1, text: 'Completely false - often feel overwhelmed' },
                    { value: 2, text: 'Mostly false - sometimes struggle with workload' },
                    { value: 3, text: 'Mostly true - generally manageable with busy periods' },
                    { value: 4, text: 'Completely true - never feel overwhelmed ever' }
                ],
                signals: {
                    individual: { workload_honesty: 'mixed', self_awareness: 'direct' },
                    validation: { workload_perfectionism: 'direct', stress_denial: 'mixed' }
                },
                validationPair: 'workload_consistency'
            },

            {
                id: 'val017',
                type: 'validation',
                category: 'social_desirability',
                text: 'How often do you check social media or news websites during work hours?',
                options: [
                    { value: 1, text: 'Never - I never visit non-work websites during work' },
                    { value: 2, text: 'Rarely - only during breaks or lunch' },
                    { value: 3, text: 'Occasionally - brief checks when work is slow' },
                    { value: 4, text: 'Regularly - several times throughout the day' }
                ],
                signals: {
                    individual: { digital_behavior_honesty: 'direct', self_control: 'mixed' },
                    validation: { social_desirability_extreme: 'inverse', behavioral_honesty: 'direct' }
                },
                validationPair: 'digital_behavior_honesty'
            },

            // Final Comprehensive Questions - Bringing us to 122+
            {
                id: 'struct003',
                type: 'targeted',
                category: 'structural',
                text: 'When you need approval for something, how clear is the process?',
                options: [
                    { value: 1, text: 'Very unclear - have to guess who to ask' },
                    { value: 2, text: 'Somewhat unclear - unclear chain of command' },
                    { value: 3, text: 'Mostly clear - generally know the right path' },
                    { value: 4, text: 'Very clear - straightforward approval process' }
                ],
                signals: {
                    structuralEfficiency: { approval_clarity: 'direct', process_transparency: 'direct' },
                    organizational: { hierarchy_clarity: 'direct' }
                }
            },

            {
                id: 'team006',
                type: 'targeted',
                category: 'team_dynamics',
                text: 'How comfortable are you sharing personal challenges that might affect your work?',
                options: [
                    { value: 1, text: 'Very uncomfortable - keep personal life completely separate' },
                    { value: 2, text: 'Somewhat uncomfortable - only share when absolutely necessary' },
                    { value: 3, text: 'Mostly comfortable - share relevant challenges' },
                    { value: 4, text: 'Very comfortable - open about personal circumstances' }
                ],
                signals: {
                    psychologicalSafety: { personal_disclosure: 'direct', vulnerability_comfort: 'direct' },
                    individual: { boundary_permeability: 'direct', openness: 'direct' }
                }
            },

            {
                id: 'dept004',
                type: 'targeted',
                category: 'departmental',
                text: 'How often does your department celebrate successes, even small ones?',
                options: [
                    { value: 1, text: 'Never - successes go unnoticed' },
                    { value: 2, text: 'Rarely - only major achievements get recognition' },
                    { value: 3, text: 'Sometimes - occasional recognition for good work' },
                    { value: 4, text: 'Often - regular celebration of wins big and small' }
                ],
                signals: {
                    departmentalDynamics: { celebration_culture: 'direct', recognition_frequency: 'direct' },
                    individual: { motivation_external: 'direct' }
                }
            },

            {
                id: 'wl011',
                type: 'targeted',
                category: 'worklife',
                text: 'How easy is it to take time off when you need it?',
                options: [
                    { value: 1, text: 'Very difficult - guilt or pressure prevents taking time off' },
                    { value: 2, text: 'Somewhat difficult - hesitate due to workload concerns' },
                    { value: 3, text: 'Mostly easy - can usually arrange time off' },
                    { value: 4, text: 'Very easy - no barriers to taking needed time off' }
                ],
                signals: {
                    workLifeIntegration: { time_off_accessibility: 'direct', recovery_support: 'direct' },
                    organizational: { time_off_culture: 'direct' }
                }
            },

            {
                id: 'val017',
                type: 'validation',
                category: 'attention_check',
                text: 'To ensure you\'re reading carefully, please select "Sometimes - depends on the situation"',
                options: [
                    { value: 1, text: 'Never - completely disagree' },
                    { value: 2, text: 'Sometimes - depends on the situation' },
                    { value: 3, text: 'Often - mostly agree' },
                    { value: 4, text: 'Always - completely agree' }
                ],
                signals: {
                    validation: { attention_check: 'attention', reading_compliance: 'attention' }
                },
                validationPair: 'attention_check_final'
            },

            {
                id: 'oc011',
                type: 'targeted',
                category: 'ocean_neuroticism',
                text: 'When facing a tight deadline with unclear requirements, you typically:',
                options: [
                    { value: 1, text: 'Feel overwhelmed and struggle to start' },
                    { value: 2, text: 'Feel stressed but push through methodically' },
                    { value: 3, text: 'Feel energized by the challenge' },
                    { value: 4, text: 'Thrive under pressure and work best this way' }
                ],
                signals: {
                    individual: { neuroticism: 'inverse', stress_tolerance: 'direct', pressure_performance: 'direct' },
                    structuralEfficiency: { ambiguity_tolerance: 'direct' }
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

        const diagnosticValues = Object.values(state.optimizationVector || {});
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