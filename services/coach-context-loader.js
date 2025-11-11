/**
 * Coach Context Loader
 *
 * Loads OCEAN assessment results and formats them for AI coach consumption.
 * Provides a clean interface for chat/coach pages to access user's personality data.
 */

import resultsCaptureService from './results-capture-service.js';

class CoachContextLoader {
    constructor() {
        this.currentContext = null;
    }

    /**
     * Load latest OCEAN results for coaching context
     * @returns {Promise<Object>} - Coach-ready context object
     */
    async loadContext() {
        try {
            const results = await resultsCaptureService.getLatestResults();

            if (!results) {
                return {
                    available: false,
                    message: 'No OCEAN assessment results found'
                };
            }

            this.currentContext = results.coachContext;

            return {
                available: true,
                context: this.currentContext,
                timestamp: results.timestamp,
                assessmentType: results.assessmentType
            };
        } catch (error) {
            console.error('Failed to load coach context:', error);
            return {
                available: false,
                message: 'Error loading assessment results',
                error: error.message
            };
        }
    }

    /**
     * Generate system prompt for AI coach
     * This is what you'd send to Claude/GPT to give them personality context
     */
    generateSystemPrompt() {
        if (!this.currentContext) {
            return null;
        }

        const ctx = this.currentContext;

        let prompt = `# User's Personality Profile (OCEAN Assessment)

## Quick Summary
${ctx.summary}

## Detailed Position
`;

        // Add each OCEAN dimension
        Object.entries(ctx.positions).forEach(([dim, position]) => {
            prompt += `
### ${position.dimension}
- **Percentile:** ${position.percentile}/100 (${position.level})
- **Description:** ${position.description}
`;
        });

        // Add dominant patterns
        if (ctx.dominantPatterns && ctx.dominantPatterns.length > 0) {
            prompt += `\n## Dominant Behavioral Patterns\n`;
            ctx.dominantPatterns.forEach(pattern => {
                prompt += `- **${pattern.pattern}** (frequency: ${pattern.frequency})\n`;
            });
        }

        // Add current challenges
        if (ctx.challenges && ctx.challenges.length > 0) {
            prompt += `\n## Current Challenges\n`;
            ctx.challenges.forEach(challenge => {
                prompt += `- **${challenge.area}** (${challenge.priority} priority): ${challenge.description}\n`;
            });
        }

        // Add adjustment goals if present
        if (ctx.goals && ctx.goals.length > 0) {
            prompt += `\n## Active Adjustment Goals\n`;
            ctx.goals.forEach(goal => {
                prompt += `- **${goal.dimension}:** Moving from ${goal.current}/100 → ${goal.target}/100 (${goal.direction})\n`;
                prompt += `  - Reason: ${goal.reason}\n`;
                prompt += `  - Timeline: ${goal.timeline}\n`;
            });
        }

        // Add coaching approach recommendations
        if (ctx.coachingApproach) {
            prompt += `\n## Recommended Coaching Approach\n`;

            if (ctx.coachingApproach.communicationStyle) {
                prompt += `\n**Communication Style:** ${ctx.coachingApproach.communicationStyle}\n`;
            }

            if (ctx.coachingApproach.supportNeeds?.length > 0) {
                prompt += `\n**Support Needs:**\n`;
                ctx.coachingApproach.supportNeeds.forEach(need => {
                    prompt += `- ${need}\n`;
                });
            }

            if (ctx.coachingApproach.focusAreas?.length > 0) {
                prompt += `\n**Focus Areas:**\n`;
                ctx.coachingApproach.focusAreas.forEach(area => {
                    prompt += `- ${area}\n`;
                });
            }
        }

        prompt += `\n---\n\nUse this personality profile to personalize your coaching approach. Adapt your communication style, recommendations, and support strategies based on this person's unique patterns and goals.\n`;

        return prompt;
    }

    /**
     * Generate concise context for inline display
     * (e.g., show in chat sidebar: "Your profile: High openness, working on boundaries")
     */
    generateInlineContext() {
        if (!this.currentContext) {
            return null;
        }

        const ctx = this.currentContext;

        // Extract key info
        const topDimensions = Object.entries(ctx.positions)
            .filter(([_, pos]) => pos.level === 'high' || pos.level === 'low')
            .map(([dim, pos]) => `${pos.level} ${pos.dimension.toLowerCase()}`)
            .slice(0, 2)
            .join(', ');

        const activeGoals = ctx.goals?.length > 0
            ? `Working on: ${ctx.goals.map(g => g.dimension).join(', ')}`
            : null;

        const topChallenge = ctx.challenges?.[0]
            ? `Focus: ${ctx.challenges[0].area}`
            : null;

        return {
            summary: ctx.summary,
            traits: topDimensions || 'Balanced profile',
            goals: activeGoals,
            focus: topChallenge
        };
    }

    /**
     * Export full context as JSON (for debugging or API passing)
     */
    exportFullContext() {
        return this.currentContext;
    }

    /**
     * Check if context is available without loading
     */
    async hasContext() {
        const latestId = localStorage.getItem('latestOceanResultsId');
        return latestId !== null;
    }

    /**
     * Get dimension-specific guidance for coach
     * Useful when user asks dimension-specific questions
     */
    getDimensionGuidance(dimension) {
        if (!this.currentContext?.positions?.[dimension]) {
            return null;
        }

        const position = this.currentContext.positions[dimension];

        return {
            dimension: position.dimension,
            currentPosition: position.percentile,
            level: position.level,
            description: position.description,
            coachingTips: this._getCoachingTipsForDimension(dimension, position.level),
            relatedGoals: this.currentContext.goals?.filter(g =>
                g.dimension.startsWith(dimension)
            ) || []
        };
    }

    /**
     * Internal: Get coaching tips by dimension/level
     */
    _getCoachingTipsForDimension(dimension, level) {
        const tips = {
            O: {
                high: [
                    'Appreciates abstract concepts and big-picture thinking',
                    'Enjoys exploring novel ideas and perspectives',
                    'May benefit from structured frameworks to ground creativity'
                ],
                moderate: [
                    'Balances novelty and familiarity',
                    'Open to new ideas but also values proven approaches'
                ],
                low: [
                    'Prefers concrete, practical guidance',
                    'Values proven methods and established routines',
                    'May resist abstract or experimental suggestions'
                ]
            },
            C: {
                high: [
                    'Values structure, plans, and systematic approaches',
                    'Responds well to step-by-step action plans',
                    'May become stressed by ambiguity or lack of structure'
                ],
                moderate: [
                    'Can work with structure or flexibility as needed',
                    'Balances planning with spontaneity'
                ],
                low: [
                    'Prefers flexibility and spontaneity',
                    'May resist rigid schedules or detailed plans',
                    'Benefits from simple, flexible frameworks'
                ]
            },
            E: {
                high: [
                    'Energized by interaction and discussion',
                    'May think out loud and process through conversation',
                    'Can engage in back-and-forth coaching dialogue'
                ],
                moderate: [
                    'Balances social interaction with alone time',
                    'Flexible in coaching style preference'
                ],
                low: [
                    'Needs time to reflect before responding',
                    'Prefers written reflections over verbal processing',
                    'Values quiet contemplation and internal processing'
                ]
            },
            A: {
                high: [
                    'Highly attuned to maintaining harmony',
                    'May need explicit permission to prioritize own needs',
                    'Responds well to validation and gentle guidance',
                    'May struggle to assert boundaries without support'
                ],
                moderate: [
                    'Balances cooperation with self-advocacy',
                    'Generally comfortable with both harmony and boundaries'
                ],
                low: [
                    'Direct and comfortable with conflict',
                    'May benefit from softer approaches in relationships',
                    'Values straightforward, no-nonsense coaching'
                ]
            },
            N: {
                high: [
                    'Experiences emotions intensely',
                    'Needs validation before problem-solving',
                    'May catastrophize or anticipate worst outcomes',
                    'Benefits from grounding and regulation techniques'
                ],
                moderate: [
                    'Experiences normal range of emotional reactivity',
                    'Generally stable but can be stressed by major challenges'
                ],
                low: [
                    'Highly emotionally stable and resilient',
                    'May underestimate emotional impact on others',
                    'Can handle direct, solution-focused coaching'
                ]
            }
        };

        return tips[dimension]?.[level] || [];
    }

    /**
     * Generate conversation starter based on profile
     * Useful for coach to initiate relevant dialogue
     */
    generateConversationStarter() {
        if (!this.currentContext) {
            return 'How can I support you today?';
        }

        const ctx = this.currentContext;

        // If they have active goals, focus there
        if (ctx.goals?.length > 0) {
            const goal = ctx.goals[0];
            return `I see you're working on adjusting your ${goal.dimension} patterns. How has that been going?`;
        }

        // If they have high-priority challenges, address those
        const highPriorityChallenge = ctx.challenges?.find(c => c.priority === 'high');
        if (highPriorityChallenge) {
            return `I noticed ${highPriorityChallenge.area.toLowerCase()} might be a challenge area for you. Would you like to explore that together?`;
        }

        // Default to general check-in
        return `Based on your profile, I'm here to support you with personalized guidance. What would be most helpful to focus on today?`;
    }
}

// Export singleton instance
const coachContextLoader = new CoachContextLoader();
export default coachContextLoader;
