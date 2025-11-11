/**
 * Results Capture Service
 *
 * Client-side service for capturing and storing OCEAN assessment results
 * in IndexedDB for use by AI coach and other components.
 *
 * No server-side storage - all data remains in user's browser.
 */

class ResultsCaptureService {
    constructor() {
        this.dbName = 'ThriveOceanResults';
        this.dbVersion = 1;
        this.storeName = 'assessmentResults';
        this.db = null;
    }

    /**
     * Initialize IndexedDB connection
     */
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = () => {
                reject(new Error('Failed to open IndexedDB'));
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // Create object store for assessment results
                if (!db.objectStoreNames.contains(this.storeName)) {
                    const objectStore = db.createObjectStore(this.storeName, {
                        keyPath: 'id',
                        autoIncrement: true
                    });

                    // Create indexes for efficient querying
                    objectStore.createIndex('timestamp', 'timestamp', { unique: false });
                    objectStore.createIndex('assessmentType', 'assessmentType', { unique: false });
                }
            };
        });
    }

    /**
     * Capture and store OCEAN assessment results
     * @param {Object} results - Full OCEAN analysis results
     * @param {Array} responses - User's raw responses
     * @param {Object} adjustmentPlan - Optional adjustment plan
     * @returns {Promise<string>} - Results ID for retrieval
     */
    async captureOceanResults(results, responses, adjustmentPlan = null) {
        if (!this.db) {
            await this.init();
        }

        const resultsPackage = {
            assessmentType: 'OCEAN',
            timestamp: new Date().toISOString(),

            // Core OCEAN data
            oceanPercentiles: results.oceanPercentiles,

            // Behavioral patterns
            patterns: {
                all: results.patternBreakdown?.all || {},
                workplace: results.patternBreakdown?.workplace || {},
                personal: results.patternBreakdown?.personal || {}
            },

            // Home-work influence
            homeWorkInfluence: results.homeWorkInfluence || null,

            // Predictions and action plans
            predictions: results.behavioralPredictions || {},
            actionPlan: results.actionAlgorithms || [],

            // Pattern adjustment goals (if any)
            adjustmentPlan: adjustmentPlan,

            // Metadata
            questionCount: responses?.length || 0,
            completionTime: this._calculateCompletionTime(responses),

            // Coach-ready summary
            coachContext: this._generateCoachContext(results, adjustmentPlan)
        };

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.add(resultsPackage);

            request.onsuccess = () => {
                const resultsId = request.result;

                // Also store in localStorage for quick access
                localStorage.setItem('latestOceanResultsId', resultsId);
                localStorage.setItem('latestOceanResults', JSON.stringify(resultsPackage));

                resolve(resultsId);
            };

            request.onerror = () => {
                reject(new Error('Failed to store results'));
            };
        });
    }

    /**
     * Retrieve results by ID
     */
    async getResults(id) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.get(id);

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(new Error('Failed to retrieve results'));
            };
        });
    }

    /**
     * Get latest results (for coach access)
     */
    async getLatestResults() {
        // Try localStorage first (faster)
        const cachedResults = localStorage.getItem('latestOceanResults');
        if (cachedResults) {
            return JSON.parse(cachedResults);
        }

        // Fallback to IndexedDB
        const latestId = localStorage.getItem('latestOceanResultsId');
        if (latestId) {
            return await this.getResults(parseInt(latestId));
        }

        return null;
    }

    /**
     * Get all results (for history view)
     */
    async getAllResults() {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.getAll();

            request.onsuccess = () => {
                resolve(request.result);
            };

            request.onerror = () => {
                reject(new Error('Failed to retrieve all results'));
            };
        });
    }

    /**
     * Generate coach-ready context from results
     * This formats the data for easy consumption by AI coach
     */
    _generateCoachContext(results, adjustmentPlan) {
        const context = {
            // Summary line for quick reference
            summary: this._generateSummaryLine(results.oceanPercentiles),

            // Detailed position for each dimension
            positions: {},

            // Key patterns
            dominantPatterns: this._extractDominantPatterns(results.patternBreakdown),

            // Current challenges (from high N or low scores)
            challenges: this._identifyChallenges(results),

            // Adjustment goals (if any)
            goals: adjustmentPlan ? this._extractAdjustmentGoals(adjustmentPlan) : null,

            // Coaching recommendations
            coachingApproach: this._generateCoachingApproach(results, adjustmentPlan)
        };

        // Build detailed positions
        const dimensionInfo = {
            O: { name: 'Openness', short: 'Openness' },
            C: { name: 'Conscientiousness', short: 'Conscientiousness' },
            E: { name: 'Extraversion', short: 'Extraversion' },
            A: { name: 'Agreeableness', short: 'Agreeableness' },
            N: { name: 'Neuroticism', short: 'Emotional Stability' }
        };

        Object.entries(results.oceanPercentiles).forEach(([dim, value]) => {
            context.positions[dim] = {
                dimension: dimensionInfo[dim].name,
                percentile: value,
                description: this._getPositionDescription(dim, value),
                level: this._getLevel(value)
            };
        });

        return context;
    }

    /**
     * Generate one-line summary
     */
    _generateSummaryLine(percentiles) {
        const highest = Object.entries(percentiles)
            .sort(([,a], [,b]) => b - a)[0];
        const lowest = Object.entries(percentiles)
            .sort(([,a], [,b]) => a - b)[0];

        const dimNames = {
            O: 'open to new experiences',
            C: 'organized and disciplined',
            E: 'socially engaged',
            A: 'harmony-seeking',
            N: 'emotionally reactive'
        };

        return `Most ${dimNames[highest[0]]} (${highest[1]}/100), least ${dimNames[lowest[0]]} (${lowest[1]}/100)`;
    }

    /**
     * Extract dominant behavioral patterns
     */
    _extractDominantPatterns(patternBreakdown) {
        if (!patternBreakdown?.all) return [];

        return Object.entries(patternBreakdown.all)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([pattern, count]) => ({
                pattern: this._formatPatternName(pattern),
                frequency: count
            }));
    }

    /**
     * Identify current challenges from profile
     */
    _identifyChallenges(results) {
        const challenges = [];
        const percentiles = results.oceanPercentiles;

        // High Neuroticism = emotional regulation challenges
        if (percentiles.N >= 70) {
            challenges.push({
                area: 'Emotional Regulation',
                description: 'Experiences stress and emotional intensity more than most',
                priority: 'high'
            });
        }

        // Low Conscientiousness = organization challenges
        if (percentiles.C <= 35) {
            challenges.push({
                area: 'Organization & Follow-through',
                description: 'May struggle with structure and task completion',
                priority: 'medium'
            });
        }

        // High Agreeableness = boundary challenges
        if (percentiles.A >= 85) {
            challenges.push({
                area: 'Boundaries & Self-advocacy',
                description: 'May over-accommodate others at own expense',
                priority: 'medium'
            });
        }

        // Low Extraversion = social energy challenges
        if (percentiles.E <= 30) {
            challenges.push({
                area: 'Social Energy',
                description: 'Finds social interaction draining, needs alone time',
                priority: 'low'
            });
        }

        return challenges;
    }

    /**
     * Extract adjustment goals from plan
     */
    _extractAdjustmentGoals(plan) {
        if (!plan?.plans) return [];

        return Object.entries(plan.plans).map(([dimension, dimensionPlan]) => ({
            dimension: this._getDimensionName(dimension),
            current: dimensionPlan.currentValue,
            target: dimensionPlan.targetValue,
            direction: dimensionPlan.direction,
            reason: dimensionPlan.motivation?.title || 'Behavioral adjustment',
            timeline: `${dimensionPlan.timeline.estimatedWeeks} weeks`
        }));
    }

    /**
     * Generate coaching approach recommendations
     */
    _generateCoachingApproach(results, adjustmentPlan) {
        const approach = {
            communicationStyle: this._recommendCommunicationStyle(results.oceanPercentiles),
            focusAreas: [],
            supportNeeds: []
        };

        const p = results.oceanPercentiles;

        // High N: needs emotional validation
        if (p.N >= 65) {
            approach.supportNeeds.push('Validate emotions before problem-solving');
            approach.focusAreas.push('Stress management and emotional regulation');
        }

        // Low C: needs structure support
        if (p.C <= 40) {
            approach.supportNeeds.push('Break tasks into small, concrete steps');
            approach.focusAreas.push('Building sustainable systems and routines');
        }

        // High A: needs permission for boundaries
        if (p.A >= 80) {
            approach.supportNeeds.push('Give explicit permission to prioritize own needs');
            approach.focusAreas.push('Boundary-setting and self-advocacy');
        }

        // Low E: respect energy limits
        if (p.E <= 35) {
            approach.supportNeeds.push('Respect need for processing time and solitude');
        }

        // High O: appreciates complexity
        if (p.O >= 70) {
            approach.supportNeeds.push('Can handle nuanced, complex concepts');
        }

        // If adjustment plan exists, prioritize those goals
        if (adjustmentPlan?.plans) {
            const goals = Object.keys(adjustmentPlan.plans);
            approach.focusAreas.unshift(`Active adjustment goals: ${goals.join(', ')}`);
        }

        return approach;
    }

    /**
     * Recommend communication style based on profile
     */
    _recommendCommunicationStyle(percentiles) {
        const styles = [];

        if (percentiles.O >= 65) styles.push('Conceptual and exploratory');
        else styles.push('Concrete and practical');

        if (percentiles.E >= 65) styles.push('Conversational and interactive');
        else styles.push('Reflective with pauses');

        if (percentiles.N >= 65) styles.push('Validating and reassuring');
        else styles.push('Direct and solution-focused');

        return styles.join(', ');
    }

    /**
     * Helper: Calculate completion time from responses
     */
    _calculateCompletionTime(responses) {
        if (!responses || responses.length < 2) return null;

        const first = new Date(responses[0].timestamp);
        const last = new Date(responses[responses.length - 1].timestamp);
        const minutes = Math.round((last - first) / 1000 / 60);

        return `${minutes} minutes`;
    }

    /**
     * Helper: Format pattern name for display
     */
    _formatPatternName(pattern) {
        return pattern.split('_').map(word =>
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    /**
     * Helper: Get dimension full name
     */
    _getDimensionName(dim) {
        const names = {
            O: 'Openness',
            C: 'Conscientiousness',
            E: 'Extraversion',
            A: 'Agreeableness',
            N: 'Emotional Stability'
        };
        return names[dim] || dim;
    }

    /**
     * Helper: Get position description
     */
    _getPositionDescription(dimension, value) {
        const descriptions = {
            O: value >= 65 ? 'Highly curious and open to new experiences' :
               value <= 35 ? 'Prefers familiar and conventional approaches' :
               'Balanced between novelty and familiarity',

            C: value >= 65 ? 'Highly organized and disciplined' :
               value <= 35 ? 'Flexible and spontaneous' :
               'Balanced structure and flexibility',

            E: value >= 65 ? 'Highly social and energized by interaction' :
               value <= 35 ? 'Reserved and energized by solitude' :
               'Balanced social engagement',

            A: value >= 65 ? 'Highly cooperative and harmony-seeking' :
               value <= 35 ? 'Direct and boundaries-focused' :
               'Balanced cooperation and assertion',

            N: value >= 65 ? 'More emotionally reactive than most' :
               value <= 35 ? 'Highly emotionally stable' :
               'Moderate emotional reactivity'
        };

        return descriptions[dimension] || '';
    }

    /**
     * Helper: Get level (low/moderate/high)
     */
    _getLevel(value) {
        if (value <= 35) return 'low';
        if (value >= 65) return 'high';
        return 'moderate';
    }

    /**
     * Clear all results (for testing or user request)
     */
    async clearAllResults() {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const objectStore = transaction.objectStore(this.storeName);
            const request = objectStore.clear();

            request.onsuccess = () => {
                localStorage.removeItem('latestOceanResultsId');
                localStorage.removeItem('latestOceanResults');
                resolve();
            };

            request.onerror = () => {
                reject(new Error('Failed to clear results'));
            };
        });
    }

    /**
     * Export results for sharing (returns coach-ready context only)
     */
    async exportCoachContext() {
        const results = await this.getLatestResults();
        if (!results) return null;

        return {
            coachContext: results.coachContext,
            timestamp: results.timestamp,
            assessmentType: results.assessmentType
        };
    }
}

// Export singleton instance
const resultsCaptureService = new ResultsCaptureService();
export default resultsCaptureService;
