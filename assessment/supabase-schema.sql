-- THRIVE Workplace Diagnostic Assessment Schema
-- Supabase PostgreSQL Schema for AI-powered assessment system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (may already exist in your Supabase)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    -- Additional user fields as needed
    first_name TEXT,
    last_name TEXT,
    company TEXT,
    role TEXT
);

-- Assessment sessions
CREATE TABLE assessment_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- Session metadata
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    -- Assessment progress
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    current_question_index INTEGER DEFAULT 0,
    total_questions_answered INTEGER DEFAULT 0,

    -- Session configuration
    min_questions INTEGER DEFAULT 20,
    max_questions INTEGER DEFAULT 35,
    deep_analysis_mode BOOLEAN DEFAULT FALSE,

    -- Diagnostic state (JSON for flexibility)
    diagnostic_vector JSONB DEFAULT '{}',
    confidence_thresholds JSONB DEFAULT '{"high": 0.85, "medium": 0.65, "low": 0.30}',

    -- Final results (populated on completion)
    primary_dysfunction TEXT,
    primary_confidence DECIMAL(3,2),
    secondary_dysfunction TEXT,
    secondary_confidence DECIMAL(3,2),
    recommended_intervention JSONB,

    -- Metadata
    user_agent TEXT,
    ip_address INET,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Individual question responses
CREATE TABLE assessment_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,

    -- Question details
    question_id TEXT NOT NULL,
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('entry', 'targeted', 'broad', 'confirmatory')),
    question_category TEXT NOT NULL,
    question_index INTEGER NOT NULL,

    -- Response details
    selected_option JSONB NOT NULL, -- {value: 1, text: "..."}
    response_time_ms INTEGER, -- Time taken to answer

    -- AI processing results
    signals JSONB NOT NULL DEFAULT '{}', -- Calculated signals from this response
    processing_result JSONB, -- Result from diagnostic engine

    -- Timestamps
    answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Final diagnostic results (denormalized for easy querying)
CREATE TABLE diagnostic_results (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- Diagnostic vector breakdown
    structural_barriers DECIMAL(4,3) DEFAULT 0,
    individual_stress DECIMAL(4,3) DEFAULT 0,
    organizational_dysfunction DECIMAL(4,3) DEFAULT 0,
    work_life_integration DECIMAL(4,3) DEFAULT 0,
    meeting_culture DECIMAL(4,3) DEFAULT 0,
    psychological_safety DECIMAL(4,3) DEFAULT 0,
    departmental_issues DECIMAL(4,3) DEFAULT 0,
    role_clarity DECIMAL(4,3) DEFAULT 0,

    -- Summary results
    primary_dysfunction TEXT NOT NULL,
    primary_confidence DECIMAL(4,3) NOT NULL,
    secondary_dysfunction TEXT,
    secondary_confidence DECIMAL(4,3),

    -- Intervention routing
    recommended_intervention_type TEXT,
    intervention_provider TEXT,
    intervention_urgency TEXT CHECK (intervention_urgency IN ('low', 'medium', 'high')),
    intervention_description TEXT,

    -- OCEAN personality insights (if available)
    openness_score DECIMAL(3,2),
    conscientiousness_score DECIMAL(3,2),
    extraversion_score DECIMAL(3,2),
    agreeableness_score DECIMAL(3,2),
    neuroticism_score DECIMAL(3,2),

    -- Assessment metadata
    total_questions INTEGER NOT NULL,
    assessment_duration_minutes INTEGER,
    entropy_score DECIMAL(4,3), -- Uncertainty measure

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment analytics and insights
CREATE TABLE assessment_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,

    -- Question flow analytics
    question_path JSONB, -- Array of question IDs taken
    branch_points JSONB, -- AI decision points and reasoning
    confidence_progression JSONB, -- How confidence changed over time

    -- Performance metrics
    average_response_time_ms INTEGER,
    total_session_time_ms INTEGER,
    questions_revisited INTEGER DEFAULT 0,

    -- AI effectiveness
    early_termination_attempts INTEGER DEFAULT 0,
    final_entropy DECIMAL(4,3),
    diagnostic_stability_score DECIMAL(3,2), -- How consistent were the results

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Coaching handoff data
CREATE TABLE coaching_handoffs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES assessment_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,

    -- Handoff details
    coaching_type TEXT NOT NULL CHECK (coaching_type IN ('chat', 'scheduled', 'intervention')),
    handoff_data JSONB NOT NULL, -- Complete assessment context for coach

    -- Status tracking
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed')),
    coach_id UUID REFERENCES users(id),

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    accepted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_assessment_sessions_user_id ON assessment_sessions(user_id);
CREATE INDEX idx_assessment_sessions_status ON assessment_sessions(status);
CREATE INDEX idx_assessment_responses_session_id ON assessment_responses(session_id);
CREATE INDEX idx_assessment_responses_question_id ON assessment_responses(question_id);
CREATE INDEX idx_diagnostic_results_user_id ON diagnostic_results(user_id);
CREATE INDEX idx_diagnostic_results_primary_dysfunction ON diagnostic_results(primary_dysfunction);
CREATE INDEX idx_coaching_handoffs_user_id ON coaching_handoffs(user_id);
CREATE INDEX idx_coaching_handoffs_status ON coaching_handoffs(status);

-- Row Level Security (RLS) policies
ALTER TABLE assessment_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaching_handoffs ENABLE ROW LEVEL SECURITY;

-- Users can only access their own data
CREATE POLICY "Users can access own assessment sessions" ON assessment_sessions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can access own assessment responses" ON assessment_responses
    FOR ALL USING (auth.uid() IN (
        SELECT user_id FROM assessment_sessions WHERE id = session_id
    ));

CREATE POLICY "Users can access own diagnostic results" ON diagnostic_results
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can access own assessment analytics" ON assessment_analytics
    FOR ALL USING (auth.uid() IN (
        SELECT user_id FROM assessment_sessions WHERE id = session_id
    ));

CREATE POLICY "Users can access own coaching handoffs" ON coaching_handoffs
    FOR ALL USING (auth.uid() = user_id);

-- Coaches can access handoffs assigned to them
CREATE POLICY "Coaches can access assigned handoffs" ON coaching_handoffs
    FOR SELECT USING (auth.uid() = coach_id);

-- Functions for common operations
CREATE OR REPLACE FUNCTION update_assessment_session_activity()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE assessment_sessions
    SET
        last_activity_at = NOW(),
        updated_at = NOW(),
        total_questions_answered = (
            SELECT COUNT(*) FROM assessment_responses
            WHERE session_id = NEW.session_id
        )
    WHERE id = NEW.session_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update session activity when responses are added
CREATE TRIGGER update_session_activity_trigger
    AFTER INSERT ON assessment_responses
    FOR EACH ROW
    EXECUTE FUNCTION update_assessment_session_activity();

-- Function to complete assessment session
CREATE OR REPLACE FUNCTION complete_assessment_session(
    p_session_id UUID,
    p_diagnostic_vector JSONB,
    p_primary_dysfunction TEXT,
    p_primary_confidence DECIMAL,
    p_secondary_dysfunction TEXT DEFAULT NULL,
    p_secondary_confidence DECIMAL DEFAULT NULL,
    p_intervention JSONB DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    result_id UUID;
    session_user_id UUID;
    question_count INTEGER;
    duration_minutes INTEGER;
BEGIN
    -- Get session details
    SELECT user_id, total_questions_answered,
           EXTRACT(EPOCH FROM (NOW() - started_at))/60
    INTO session_user_id, question_count, duration_minutes
    FROM assessment_sessions
    WHERE id = p_session_id;

    -- Update session as completed
    UPDATE assessment_sessions
    SET
        status = 'completed',
        completed_at = NOW(),
        updated_at = NOW(),
        primary_dysfunction = p_primary_dysfunction,
        primary_confidence = p_primary_confidence,
        secondary_dysfunction = p_secondary_dysfunction,
        secondary_confidence = p_secondary_confidence,
        recommended_intervention = p_intervention,
        diagnostic_vector = p_diagnostic_vector
    WHERE id = p_session_id;

    -- Create diagnostic result record
    INSERT INTO diagnostic_results (
        session_id, user_id, primary_dysfunction, primary_confidence,
        secondary_dysfunction, secondary_confidence,
        structural_barriers, individual_stress, organizational_dysfunction,
        work_life_integration, meeting_culture, psychological_safety,
        departmental_issues, role_clarity,
        total_questions, assessment_duration_minutes,
        recommended_intervention_type, intervention_provider, intervention_urgency, intervention_description
    )
    VALUES (
        p_session_id, session_user_id, p_primary_dysfunction, p_primary_confidence,
        p_secondary_dysfunction, p_secondary_confidence,
        COALESCE((p_diagnostic_vector->>'structuralBarriers')::DECIMAL, 0),
        COALESCE((p_diagnostic_vector->>'individualStress')::DECIMAL, 0),
        COALESCE((p_diagnostic_vector->>'organizationalDysfunction')::DECIMAL, 0),
        COALESCE((p_diagnostic_vector->>'workLifeIntegration')::DECIMAL, 0),
        COALESCE((p_diagnostic_vector->>'meetingCulture')::DECIMAL, 0),
        COALESCE((p_diagnostic_vector->>'psychologicalSafety')::DECIMAL, 0),
        COALESCE((p_diagnostic_vector->>'departmentalIssues')::DECIMAL, 0),
        COALESCE((p_diagnostic_vector->>'roleClarity')::DECIMAL, 0),
        question_count, duration_minutes,
        p_intervention->>'type', p_intervention->>'provider',
        p_intervention->>'urgency', p_intervention->>'description'
    )
    RETURNING id INTO result_id;

    RETURN result_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant appropriate permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;