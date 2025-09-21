// THRIVE Assessment Supabase Integration
// Handles persistent storage and real-time updates for diagnostic assessment

class AssessmentStorage {
    constructor(supabaseClient) {
        this.supabase = supabaseClient;
        this.currentSessionId = null;
        this.userId = null;
    }

    // Initialize storage for authenticated user
    async initialize() {
        const { data: { user } } = await this.supabase.auth.getUser();
        if (user) {
            this.userId = user.id;
            console.log('Assessment storage initialized for user:', user.id);
            return true;
        }
        console.warn('No authenticated user found');
        return false;
    }

    // Start new assessment session
    async startSession(config = {}) {
        if (!this.userId) {
            throw new Error('User must be authenticated to start assessment');
        }

        try {
            const sessionData = {
                user_id: this.userId,
                min_questions: config.minQuestions || 20,
                max_questions: config.maxQuestions || 35,
                deep_analysis_mode: config.deepAnalysisMode || false,
                user_agent: navigator.userAgent,
                ...config
            };

            const { data, error } = await this.supabase
                .from('assessment_sessions')
                .insert(sessionData)
                .select()
                .single();

            if (error) throw error;

            this.currentSessionId = data.id;
            console.log('Assessment session started:', data.id);
            return data;
        } catch (error) {
            console.error('Error starting assessment session:', error);
            throw error;
        }
    }

    // Save individual question response
    async saveResponse(questionData, selectedOption, signals, processingResult) {
        if (!this.currentSessionId) {
            throw new Error('No active assessment session');
        }

        try {
            const responseData = {
                session_id: this.currentSessionId,
                question_id: questionData.id,
                question_text: questionData.text,
                question_type: questionData.type,
                question_category: questionData.category,
                question_index: processingResult?.totalQuestions || 0,
                selected_option: selectedOption,
                signals: signals,
                processing_result: processingResult,
                response_time_ms: Date.now() - (this.lastQuestionTime || Date.now())
            };

            const { data, error } = await this.supabase
                .from('assessment_responses')
                .insert(responseData)
                .select()
                .single();

            if (error) throw error;

            // Update session diagnostic vector
            await this.updateSessionProgress(processingResult);

            this.lastQuestionTime = Date.now();
            return data;
        } catch (error) {
            console.error('Error saving response:', error);
            throw error;
        }
    }

    // Update session progress and diagnostic state
    async updateSessionProgress(processingResult) {
        if (!this.currentSessionId) return;

        try {
            const updateData = {
                current_question_index: processingResult.totalQuestions || 0,
                diagnostic_vector: processingResult.diagnosis || {},
                last_activity_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            const { error } = await this.supabase
                .from('assessment_sessions')
                .update(updateData)
                .eq('id', this.currentSessionId);

            if (error) throw error;
        } catch (error) {
            console.error('Error updating session progress:', error);
        }
    }

    // Complete assessment with final results
    async completeAssessment(finalResult) {
        if (!this.currentSessionId) {
            throw new Error('No active assessment session');
        }

        try {
            // Use the stored procedure for atomic completion
            const { data, error } = await this.supabase
                .rpc('complete_assessment_session', {
                    p_session_id: this.currentSessionId,
                    p_diagnostic_vector: finalResult.diagnosis,
                    p_primary_dysfunction: finalResult.primaryDysfunction?.primary,
                    p_primary_confidence: finalResult.primaryDysfunction?.confidence,
                    p_secondary_dysfunction: finalResult.primaryDysfunction?.secondary,
                    p_secondary_confidence: finalResult.primaryDysfunction?.secondaryConfidence,
                    p_intervention: finalResult.recommendedIntervention
                });

            if (error) throw error;

            console.log('Assessment completed successfully');
            return data;
        } catch (error) {
            console.error('Error completing assessment:', error);
            throw error;
        }
    }

    // Restore session from database
    async restoreSession(sessionId = null) {
        if (!this.userId) return null;

        try {
            let query = this.supabase
                .from('assessment_sessions')
                .select(`
                    *,
                    assessment_responses (
                        id, question_id, question_text, question_type,
                        selected_option, signals, answered_at
                    )
                `)
                .eq('user_id', this.userId)
                .eq('status', 'in_progress');

            if (sessionId) {
                query = query.eq('id', sessionId);
            } else {
                query = query.order('last_activity_at', { ascending: false }).limit(1);
            }

            const { data, error } = await query.single();

            if (error) {
                if (error.code === 'PGRST116') return null; // No session found
                throw error;
            }

            this.currentSessionId = data.id;
            console.log('Session restored:', data.id);
            return data;
        } catch (error) {
            console.error('Error restoring session:', error);
            return null;
        }
    }

    // Get user's assessment history
    async getAssessmentHistory(limit = 10) {
        if (!this.userId) return [];

        try {
            const { data, error } = await this.supabase
                .from('diagnostic_results')
                .select(`
                    *,
                    assessment_sessions (
                        started_at, completed_at, total_questions_answered
                    )
                `)
                .eq('user_id', this.userId)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('Error fetching assessment history:', error);
            return [];
        }
    }

    // Create coaching handoff
    async createCoachingHandoff(coachingType = 'chat', additionalData = {}) {
        if (!this.currentSessionId) {
            throw new Error('No active assessment session');
        }

        try {
            // Get complete session data for handoff
            const { data: sessionData, error: sessionError } = await this.supabase
                .from('assessment_sessions')
                .select(`
                    *,
                    assessment_responses (*),
                    diagnostic_results (*)
                `)
                .eq('id', this.currentSessionId)
                .single();

            if (sessionError) throw sessionError;

            const handoffData = {
                session_id: this.currentSessionId,
                user_id: this.userId,
                coaching_type: coachingType,
                handoff_data: {
                    ...sessionData,
                    ...additionalData,
                    handoff_timestamp: new Date().toISOString()
                }
            };

            const { data, error } = await this.supabase
                .from('coaching_handoffs')
                .insert(handoffData)
                .select()
                .single();

            if (error) throw error;

            console.log('Coaching handoff created:', data.id);
            return data;
        } catch (error) {
            console.error('Error creating coaching handoff:', error);
            throw error;
        }
    }

    // Analytics tracking
    async trackAnalytics(analyticsData) {
        if (!this.currentSessionId) return;

        try {
            const analytics = {
                session_id: this.currentSessionId,
                ...analyticsData
            };

            const { error } = await this.supabase
                .from('assessment_analytics')
                .insert(analytics);

            if (error) throw error;
        } catch (error) {
            console.error('Error tracking analytics:', error);
        }
    }

    // Real-time subscription for coaching handoffs
    subscribeToCoachingUpdates(callback) {
        if (!this.userId) return null;

        return this.supabase
            .channel('coaching_updates')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'coaching_handoffs',
                filter: `user_id=eq.${this.userId}`
            }, callback)
            .subscribe();
    }

    // Cleanup and session management
    async abandonSession(reason = 'user_exit') {
        if (!this.currentSessionId) return;

        try {
            await this.supabase
                .from('assessment_sessions')
                .update({
                    status: 'abandoned',
                    updated_at: new Date().toISOString()
                })
                .eq('id', this.currentSessionId);

            await this.trackAnalytics({
                session_abandoned: true,
                abandonment_reason: reason
            });

            this.currentSessionId = null;
        } catch (error) {
            console.error('Error abandoning session:', error);
        }
    }

    // Get current session ID
    getCurrentSessionId() {
        return this.currentSessionId;
    }

    // Check if user has authentication
    isAuthenticated() {
        return this.userId !== null;
    }
}

// Export for use in assessment system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AssessmentStorage;
} else {
    window.AssessmentStorage = AssessmentStorage;
}