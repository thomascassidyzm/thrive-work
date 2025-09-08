/**
 * REUSABLE COACHING ENHANCEMENT SYSTEM
 * 
 * Drop-in module that adds learning capabilities to any coaching/tutoring app.
 * Perfect for educational platforms, coaching apps, or AI tutoring systems.
 * 
 * Usage:
 * 1. Include this script in your project
 * 2. Initialize: const enhancer = new CoachingEnhancementSystem('YourAppName')
 * 3. Track sessions: enhancer.trackSession(sessionData)
 * 4. Get insights: const insights = await enhancer.getInsights(coach)
 * 5. Enhance prompts: const enhanced = enhancer.enhanceSystemPrompt(basePrompt, coach, insights)
 * 
 * Features:
 * - Local-first storage (privacy protected)
 * - Pattern recognition for effective teaching/coaching
 * - Automatic learning from successful sessions
 * - Easy export for analytics
 * - Reusable across different subject domains
 */

class CoachingEnhancementSystem {
    constructor(appName = 'CoachingApp', config = {}) {
        this.appName = appName;
        this.dbName = `${appName}CoachingFeedback`;
        this.dbVersion = 1;
        this.db = null;
        
        // Configurable thresholds
        this.config = {
            minEngagementThreshold: config.minEngagementThreshold || 5, // Messages for "high engagement"
            mediumEngagementThreshold: config.mediumEngagementThreshold || 3,
            maxPatternsToStore: config.maxPatternsToStore || 10,
            maxPatternsToInclude: config.maxPatternsToInclude || 3,
            syncUrl: config.syncUrl || '/api/sync-learnings',
            ...config
        };
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                console.log(`🎓 ${this.appName} Coaching Enhancement System initialized`);
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                if (!db.objectStoreNames.contains('sessions')) {
                    const sessionStore = db.createObjectStore('sessions', { keyPath: 'id', autoIncrement: true });
                    sessionStore.createIndex('coach', 'coach', { unique: false });
                    sessionStore.createIndex('timestamp', 'timestamp', { unique: false });
                    sessionStore.createIndex('engagement_level', 'engagement_level', { unique: false });
                    sessionStore.createIndex('subject', 'subject', { unique: false }); // For tutoring apps
                }
                
                if (!db.objectStoreNames.contains('patterns')) {
                    const patternStore = db.createObjectStore('patterns', { keyPath: 'id', autoIncrement: true });
                    patternStore.createIndex('coach', 'coach', { unique: false });
                    patternStore.createIndex('subject', 'subject', { unique: false });
                    patternStore.createIndex('effectiveness', 'effectiveness', { unique: false });
                }
                
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }
            };
        });
    }

    // CORE TRACKING FUNCTION - Call this after each coaching/tutoring interaction
    async trackSession(sessionData) {
        const session = {
            session_id: sessionData.session_id || `session_${Date.now()}`,
            coach: sessionData.coach || sessionData.tutor, // Works for both coaching and tutoring
            subject: sessionData.subject, // For tutoring apps (math, science, etc.)
            timestamp: new Date().toISOString(),
            message_count: sessionData.message_count || 0,
            conversation_depth: sessionData.conversation_depth || 0,
            session_duration: sessionData.session_duration || 0,
            engagement_level: this.calculateEngagement(sessionData.conversation_depth),
            user_satisfaction: sessionData.user_satisfaction,
            topics: sessionData.topics || [],
            learning_objectives: sessionData.learning_objectives || [], // For educational apps
            effective_responses: sessionData.effective_responses || [],
            user_progress: sessionData.user_progress, // Learning progress for tutoring
            difficulty_level: sessionData.difficulty_level // For educational content
        };
        
        const transaction = this.db.transaction(['sessions'], 'readwrite');
        const store = transaction.objectStore('sessions');
        return store.add(session);
    }

    // GET INSIGHTS FOR COACHING/TEACHING ENHANCEMENT
    async getCoachInsights(coach, subject = null) {
        const patterns = await this.identifyEffectivePatterns(subject);
        const coachPatterns = patterns[coach] || [];
        
        const recentPatterns = coachPatterns
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, this.config.maxPatternsToStore);
            
        return {
            total_sessions: await this.getSessionCount(coach, subject),
            effective_patterns: coachPatterns.length,
            recent_effective: recentPatterns.slice(0, this.config.maxPatternsToInclude),
            avg_engagement: await this.getAverageEngagement(coach, subject),
            top_topics: await this.getTopTopics(coach, subject),
            success_rate: await this.getSuccessRate(coach, subject)
        };
    }

    // ENHANCE SYSTEM PROMPTS WITH LEARNING INSIGHTS
    enhanceSystemPrompt(basePrompt, coach, insights) {
        if (!insights || !insights.recent_effective || insights.recent_effective.length === 0) {
            return basePrompt;
        }

        let enhancement = `\n\n🎓 LEARNING FROM SUCCESSFUL ${this.appName.toUpperCase()} SESSIONS:`;
        
        // Add effective patterns
        if (insights.recent_effective.length > 0) {
            enhancement += `\nRecent effective interactions that led to deep engagement:`;
            insights.recent_effective.forEach((pattern, i) => {
                enhancement += `\n${i+1}. Deep session (${pattern.conversation_depth} exchanges)`;
                if (pattern.subject) enhancement += ` in ${pattern.subject}`;
                if (pattern.topics && pattern.topics.length > 0) {
                    enhancement += ` on: ${pattern.topics.join(', ')}`;
                }
                if (pattern.effective_responses && pattern.effective_responses.length > 0) {
                    enhancement += `\n   Effective approach: "${pattern.effective_responses[0].substring(0, 120)}..."`;
                }
            });
        }
        
        // Add performance insights
        if (insights.avg_engagement && insights.avg_engagement > 0) {
            enhancement += `\n\nYour average engagement depth: ${insights.avg_engagement.toFixed(1)} exchanges`;
            if (insights.avg_engagement >= this.config.minEngagementThreshold) {
                enhancement += `\n✅ Excellent! You consistently create deep, engaging interactions.`;
            } else if (insights.avg_engagement >= this.config.mediumEngagementThreshold) {
                enhancement += `\n📈 Good engagement. Look for opportunities to go deeper with curious questions.`;
            } else {
                enhancement += `\n🎯 Focus on asking curious questions and encouraging elaboration to increase engagement.`;
            }
        }

        // Add subject-specific insights for tutoring apps
        if (insights.top_topics && insights.top_topics.length > 0) {
            enhancement += `\nMost engaging topics: ${insights.top_topics.slice(0, 3).map(t => t.topic).join(', ')}`;
        }
        
        enhancement += `\n\nUse these insights to replicate successful approaches while staying authentic to your ${this.appName.includes('tutor') ? 'teaching' : 'coaching'} style.`;
        
        return basePrompt + enhancement;
    }

    // ANALYTICS AND INSIGHTS
    async identifyEffectivePatterns(subject = null) {
        const transaction = this.db.transaction(['sessions'], 'readonly');
        const store = transaction.objectStore('sessions');
        const sessions = await this.getAllFromStore(store);
        
        // Filter by subject if specified (for tutoring apps)
        const filteredSessions = subject ? 
            sessions.filter(s => s.subject === subject) : 
            sessions;
        
        const effectiveSessions = filteredSessions.filter(session => 
            session.engagement_level === 'high' && 
            session.conversation_depth >= this.config.minEngagementThreshold
        );
        
        const patternsByCoach = {};
        effectiveSessions.forEach(session => {
            const coachKey = session.coach;
            if (!patternsByCoach[coachKey]) {
                patternsByCoach[coachKey] = [];
            }
            
            patternsByCoach[coachKey].push({
                conversation_depth: session.conversation_depth,
                subject: session.subject,
                topics: session.topics,
                learning_objectives: session.learning_objectives,
                effective_responses: session.effective_responses,
                timestamp: session.timestamp,
                user_progress: session.user_progress,
                difficulty_level: session.difficulty_level
            });
        });
        
        return patternsByCoach;
    }

    // EXPORT INSIGHTS (for analytics or migration to other systems)
    async exportInsights() {
        const patterns = await this.identifyEffectivePatterns();
        const coaches = Object.keys(patterns);
        
        const exportData = {
            app_name: this.appName,
            export_timestamp: new Date().toISOString(),
            total_sessions: await this.getTotalSessions(),
            coaches: await Promise.all(coaches.map(async (coach) => ({
                coach: coach,
                insights: await this.getCoachInsights(coach)
            }))),
            patterns: patterns,
            privacy_note: "All data anonymized - no personal information included"
        };
        
        return exportData;
    }

    // SYNC TO SERVER (optional, privacy-respecting)
    async syncToServer(anonymize = true) {
        const insights = await this.exportInsights();
        
        if (anonymize) {
            // Remove any potentially identifying information
            delete insights.patterns;
            insights.coaches = insights.coaches.map(coach => ({
                coach: coach.coach,
                effective_pattern_count: coach.insights.effective_patterns,
                avg_engagement: coach.insights.avg_engagement,
                top_topics: coach.insights.top_topics?.slice(0, 3) || []
            }));
        }
        
        try {
            const response = await fetch(this.config.syncUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(insights)
            });
            
            if (response.ok) {
                console.log(`✅ ${this.appName} insights synced successfully`);
                return await response.json();
            } else {
                throw new Error(`Sync failed: ${response.status}`);
            }
        } catch (error) {
            console.error('Sync error:', error);
            throw error;
        }
    }

    // HELPER METHODS
    calculateEngagement(conversationDepth) {
        if (conversationDepth >= this.config.minEngagementThreshold) return 'high';
        if (conversationDepth >= this.config.mediumEngagementThreshold) return 'medium';
        return 'low';
    }

    async getAllFromStore(store) {
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getSessionCount(coach, subject = null) {
        const transaction = this.db.transaction(['sessions'], 'readonly');
        const store = transaction.objectStore('sessions');
        const sessions = await this.getAllFromStore(store);
        
        return sessions.filter(s => 
            s.coach === coach && 
            (subject ? s.subject === subject : true)
        ).length;
    }

    async getAverageEngagement(coach, subject = null) {
        const transaction = this.db.transaction(['sessions'], 'readonly');
        const store = transaction.objectStore('sessions');
        const sessions = await this.getAllFromStore(store);
        
        const coachSessions = sessions.filter(s => 
            s.coach === coach && 
            (subject ? s.subject === subject : true)
        );
        
        if (coachSessions.length === 0) return 0;
        
        const totalDepth = coachSessions.reduce((sum, s) => sum + s.conversation_depth, 0);
        return totalDepth / coachSessions.length;
    }

    async getTopTopics(coach, subject = null) {
        const transaction = this.db.transaction(['sessions'], 'readonly');
        const store = transaction.objectStore('sessions');
        const sessions = await this.getAllFromStore(store);
        
        const coachSessions = sessions.filter(s => 
            s.coach === coach && 
            (subject ? s.subject === subject : true) &&
            s.engagement_level === 'high'
        );
        
        const topicCounts = {};
        coachSessions.forEach(session => {
            if (session.topics) {
                session.topics.forEach(topic => {
                    topicCounts[topic] = (topicCounts[topic] || 0) + 1;
                });
            }
        });
        
        return Object.entries(topicCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([topic, count]) => ({ topic, count }));
    }

    async getSuccessRate(coach, subject = null) {
        const transaction = this.db.transaction(['sessions'], 'readonly');
        const store = transaction.objectStore('sessions');
        const sessions = await this.getAllFromStore(store);
        
        const coachSessions = sessions.filter(s => 
            s.coach === coach && 
            (subject ? s.subject === subject : true)
        );
        
        if (coachSessions.length === 0) return 0;
        
        const successfulSessions = coachSessions.filter(s => s.engagement_level === 'high');
        return successfulSessions.length / coachSessions.length;
    }

    async getTotalSessions() {
        const transaction = this.db.transaction(['sessions'], 'readonly');
        const store = transaction.objectStore('sessions');
        return new Promise((resolve, reject) => {
            const request = store.count();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
}

// EASY SETUP FOR DIFFERENT PROJECT TYPES
class TutoriEnhancer extends CoachingEnhancementSystem {
    constructor(appName, subjects = []) {
        super(appName, {
            minEngagementThreshold: 4, // Tutoring might have shorter interactions
            syncUrl: '/api/sync-tutoring-insights'
        });
        this.subjects = subjects;
    }
    
    // Tutoring-specific enhancements
    enhanceForSubject(basePrompt, tutor, subject, insights) {
        const subjectInsights = insights?.[subject];
        if (!subjectInsights) return basePrompt;
        
        let enhancement = `\n\n📚 ${subject.toUpperCase()} TUTORING INSIGHTS:`;
        enhancement += `\nMost effective approaches in ${subject}:`;
        
        if (subjectInsights.recent_effective) {
            subjectInsights.recent_effective.forEach((pattern, i) => {
                enhancement += `\n${i+1}. ${pattern.difficulty_level} level: "${pattern.effective_responses?.[0]?.substring(0, 100)}..."`;
            });
        }
        
        return basePrompt + enhancement;
    }
}

// Export for different use cases
if (typeof window !== 'undefined') {
    window.CoachingEnhancementSystem = CoachingEnhancementSystem;
    window.TutoringEnhancer = TutoriEnhancer;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CoachingEnhancementSystem, TutoringEnhancer };
}