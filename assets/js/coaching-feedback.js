// THRIVE PWA Coaching Feedback System
// Local-first storage with optional sync for collective learning

class CoachingFeedbackDB {
    constructor() {
        this.dbName = 'ThriveCoachingFeedback';
        this.dbVersion = 1;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Store individual coaching sessions
                if (!db.objectStoreNames.contains('sessions')) {
                    const sessionStore = db.createObjectStore('sessions', { keyPath: 'id', autoIncrement: true });
                    sessionStore.createIndex('coach', 'coach', { unique: false });
                    sessionStore.createIndex('timestamp', 'timestamp', { unique: false });
                    sessionStore.createIndex('engagement_level', 'engagement_level', { unique: false });
                }
                
                // Store effective patterns identified locally
                if (!db.objectStoreNames.contains('patterns')) {
                    const patternStore = db.createObjectStore('patterns', { keyPath: 'id', autoIncrement: true });
                    patternStore.createIndex('coach', 'coach', { unique: false });
                    patternStore.createIndex('effectiveness', 'effectiveness', { unique: false });
                }
                
                // Store user preferences and settings
                if (!db.objectStoreNames.contains('settings')) {
                    db.createObjectStore('settings', { keyPath: 'key' });
                }
            };
        });
    }

    async logSession(sessionData) {
        const transaction = this.db.transaction(['sessions'], 'readwrite');
        const store = transaction.objectStore('sessions');
        
        const session = {
            session_id: sessionData.session_id || `session_${Date.now()}`,
            coach: sessionData.coach,
            timestamp: new Date().toISOString(),
            message_count: sessionData.message_count || 0,
            conversation_depth: sessionData.conversation_depth || 0,
            session_duration: sessionData.session_duration || 0,
            engagement_level: this.calculateEngagement(sessionData),
            user_satisfaction: sessionData.user_satisfaction, // Optional user feedback
            topics: sessionData.topics || [],
            effective_responses: sessionData.effective_responses || []
        };
        
        return store.add(session);
    }

    async identifyEffectivePatterns() {
        const transaction = this.db.transaction(['sessions'], 'readonly');
        const store = transaction.objectStore('sessions');
        const sessions = await this.getAllFromStore(store);
        
        // Find high-engagement sessions (5+ exchanges)
        const effectiveSessions = sessions.filter(session => 
            session.engagement_level === 'high' && 
            session.conversation_depth >= 5
        );
        
        // Group by coach and extract patterns
        const patternsByCoach = {};
        effectiveSessions.forEach(session => {
            if (!patternsByCoach[session.coach]) {
                patternsByCoach[session.coach] = [];
            }
            
            patternsByCoach[session.coach].push({
                conversation_depth: session.conversation_depth,
                topics: session.topics,
                effective_responses: session.effective_responses,
                timestamp: session.timestamp
            });
        });
        
        return patternsByCoach;
    }

    async getCoachInsights(coach) {
        const patterns = await this.identifyEffectivePatterns();
        const coachPatterns = patterns[coach] || [];
        
        // Get recent effective patterns (last 5)
        const recentPatterns = coachPatterns
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 5);
            
        return {
            total_sessions: await this.getSessionCount(coach),
            effective_patterns: coachPatterns.length,
            recent_effective: recentPatterns,
            avg_engagement: await this.getAverageEngagement(coach)
        };
    }

    async syncLearningsToServer() {
        const patterns = await this.identifyEffectivePatterns();
        const insights = await this.generateInsights(patterns);
        
        // Option 1: Post to GitHub (anonymized)
        await this.syncToGitHub(insights);
        
        // Option 2: Post to your server endpoint
        // await this.syncToServer(insights);
    }

    async syncToGitHub(insights) {
        // Anonymized learning insights posted as GitHub issue
        const anonymizedInsights = {
            timestamp: new Date().toISOString(),
            coaches: Object.keys(insights).map(coach => ({
                coach: coach,
                effective_pattern_count: insights[coach].length,
                avg_conversation_depth: this.calculateAverage(insights[coach], 'conversation_depth'),
                common_topics: this.extractCommonTopics(insights[coach])
            })),
            total_sessions: await this.getTotalSessions(),
            privacy_note: "All data anonymized - no personal information included"
        };
        
        // You could POST this to GitHub API or your webhook
        console.log('📊 Anonymized insights ready for sync:', anonymizedInsights);
        
        // For now, just log to console. In production:
        // fetch('/api/sync-learnings', { method: 'POST', body: JSON.stringify(anonymizedInsights) })
    }

    // Helper methods
    calculateEngagement(sessionData) {
        if (sessionData.conversation_depth >= 5) return 'high';
        if (sessionData.conversation_depth >= 3) return 'medium';
        return 'low';
    }

    async getAllFromStore(store) {
        return new Promise((resolve, reject) => {
            const request = store.getAll();
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getSessionCount(coach) {
        const transaction = this.db.transaction(['sessions'], 'readonly');
        const store = transaction.objectStore('sessions');
        const index = store.index('coach');
        return new Promise((resolve, reject) => {
            const request = index.count(coach);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async getAverageEngagement(coach) {
        const transaction = this.db.transaction(['sessions'], 'readonly');
        const store = transaction.objectStore('sessions');
        const sessions = await this.getAllFromStore(store);
        const coachSessions = sessions.filter(s => s.coach === coach);
        
        if (coachSessions.length === 0) return 0;
        
        const totalDepth = coachSessions.reduce((sum, s) => sum + s.conversation_depth, 0);
        return totalDepth / coachSessions.length;
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

    calculateAverage(array, property) {
        if (array.length === 0) return 0;
        const sum = array.reduce((acc, item) => acc + (item[property] || 0), 0);
        return sum / array.length;
    }

    extractCommonTopics(patterns) {
        const allTopics = patterns.flatMap(p => p.topics || []);
        const topicCounts = {};
        allTopics.forEach(topic => {
            topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        });
        
        return Object.entries(topicCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([topic, count]) => ({ topic, count }));
    }

    async generateInsights(patterns) {
        // Generate actionable insights from patterns
        const insights = {};
        
        for (const [coach, coachPatterns] of Object.entries(patterns)) {
            insights[coach] = {
                patterns: coachPatterns,
                insights: {
                    most_effective_depth: Math.max(...coachPatterns.map(p => p.conversation_depth)),
                    common_successful_topics: this.extractCommonTopics(coachPatterns),
                    pattern_count: coachPatterns.length
                }
            };
        }
        
        return insights;
    }
}

// Global instance
window.coachingFeedback = new CoachingFeedbackDB();

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await window.coachingFeedback.init();
        console.log('🧠 Coaching Feedback DB initialized');
        
        // Optionally sync learnings periodically (with user consent)
        // setInterval(() => window.coachingFeedback.syncLearningsToServer(), 24 * 60 * 60 * 1000); // Daily
    } catch (error) {
        console.error('Failed to initialize coaching feedback DB:', error);
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CoachingFeedbackDB };
}