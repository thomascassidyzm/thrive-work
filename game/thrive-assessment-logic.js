// THRIVE Assessment Logic - Domain tracking and OCEAN calculation

// Track completed domains and OCEAN scores
const assessmentState = {
    completedDomains: [],
    currentDomain: null,
    allResponses: [],
    oceanScores: {
        O: [], // Openness
        C: [], // Conscientiousness
        E: [], // Extraversion
        A: [], // Agreeableness
        N: []  // Neuroticism
    },
    domainSummaries: {}
};

// Domain order for navigation
const DOMAIN_ORDER = ['time', 'health', 'relationships', 'identity', 'vitality', 'environment'];

// Calculate OCEAN scores from responses
function calculateOceanScores(responses) {
    const scores = { O: [], C: [], E: [], A: [], N: [] };
    
    responses.forEach(response => {
        if (response.option && response.option.ocean) {
            Object.keys(response.option.ocean).forEach(trait => {
                if (scores[trait]) {
                    scores[trait].push(response.option.ocean[trait]);
                }
            });
        }
    });
    
    // Calculate averages
    const averages = {};
    Object.keys(scores).forEach(trait => {
        if (scores[trait].length > 0) {
            const sum = scores[trait].reduce((a, b) => a + b, 0);
            averages[trait] = sum / scores[trait].length;
        } else {
            averages[trait] = 0;
        }
    });
    
    return averages;
}

// Get OCEAN tendency description based on score
function getOceanTendency(trait, score) {
    const tendencies = {
        O: {
            high: { level: 'High Openness', desc: 'Creative, curious, and open to new experiences' },
            moderate: { level: 'Moderate Openness', desc: 'Balanced between tradition and innovation' },
            low: { level: 'Practical Focus', desc: 'Prefer familiar approaches and proven methods' }
        },
        C: {
            high: { level: 'High Conscientiousness', desc: 'Organized, disciplined, and goal-oriented' },
            moderate: { level: 'Balanced Structure', desc: 'Flexible between planning and spontaneity' },
            low: { level: 'Flexible Approach', desc: 'Adaptable and comfortable with ambiguity' }
        },
        E: {
            high: { level: 'Extraverted', desc: 'Energized by social interaction and external stimulation' },
            moderate: { level: 'Ambiverted', desc: 'Comfortable in both social and solitary settings' },
            low: { level: 'Introverted', desc: 'Prefer quiet reflection and deeper connections' }
        },
        A: {
            high: { level: 'Highly Agreeable', desc: 'Cooperative, trusting, and team-oriented' },
            moderate: { level: 'Balanced Cooperation', desc: 'Collaborative while maintaining boundaries' },
            low: { level: 'Independent', desc: 'Direct, competitive, and self-reliant' }
        },
        N: {
            high: { level: 'Emotionally Sensitive', desc: 'Experience emotions deeply, may be prone to stress' },
            moderate: { level: 'Emotionally Balanced', desc: 'Generally stable with normal stress responses' },
            low: { level: 'Emotionally Stable', desc: 'Resilient and calm under pressure' }
        }
    };
    
    // Determine level based on score
    let level;
    if (score > 0.6) level = 'high';
    else if (score > 0.3) level = 'moderate';
    else if (score > -0.3) level = 'moderate';
    else if (score > -0.6) level = 'low';
    else level = 'low';
    
    // Special handling for Neuroticism (reverse interpretation)
    if (trait === 'N') {
        if (score > 0.5) level = 'high';
        else if (score > 0.2) level = 'moderate';
        else level = 'low';
    }
    
    return tendencies[trait][level];
}

// Analyze domain-specific patterns
function analyzeDomainPatterns(domain, responses) {
    const patterns = {
        time: {
            overcommitted: 0,
            balanced: 0,
            boundaries: 0
        },
        health: {
            stressed: 0,
            resilient: 0,
            neglecting: 0
        },
        relationships: {
            connected: 0,
            isolated: 0,
            conflicted: 0
        },
        identity: {
            aligned: 0,
            searching: 0,
            conflicted: 0
        },
        vitality: {
            energized: 0,
            depleted: 0,
            burnout_risk: 0
        },
        environment: {
            supported: 0,
            toxic: 0,
            mismatched: 0
        }
    };
    
    // Analyze responses for patterns
    responses.forEach(response => {
        const patternType = response.option.pattern_type;
        
        // Map pattern types to simplified categories
        if (domain === 'time') {
            if (patternType.includes('overcommitted') || patternType.includes('always_connected')) {
                patterns.time.overcommitted++;
            } else if (patternType.includes('balanced') || patternType.includes('boundary')) {
                patterns.time.balanced++;
            }
        } else if (domain === 'health') {
            if (patternType.includes('stressed') || patternType.includes('anxious')) {
                patterns.health.stressed++;
            } else if (patternType.includes('resilient') || patternType.includes('healthy')) {
                patterns.health.resilient++;
            }
        } else if (domain === 'vitality') {
            if (patternType.includes('burnout') || patternType.includes('depleted')) {
                patterns.vitality.burnout_risk++;
            } else if (patternType.includes('energized') || patternType.includes('motivated')) {
                patterns.vitality.energized++;
            }
        }
        // Add more pattern analysis as needed
    });
    
    return patterns[domain] || {};
}

// Get next domain to assess
function getNextDomain(currentDomain) {
    const currentIndex = DOMAIN_ORDER.indexOf(currentDomain);
    if (currentIndex === -1 || currentIndex >= DOMAIN_ORDER.length - 1) {
        return null;
    }
    return DOMAIN_ORDER[currentIndex + 1];
}

// Check if should show OCEAN analysis (after 3 domains / 30 questions)
function shouldShowOceanAnalysis() {
    return assessmentState.completedDomains.length === 3;
}

// Generate domain completion summary
function generateDomainSummary(domain, responses) {
    const oceanScores = calculateOceanScores(responses);
    const patterns = analyzeDomainPatterns(domain, responses);
    
    const domainDescriptions = {
        time: 'time management and work-life balance',
        health: 'physical and mental wellbeing',
        relationships: 'workplace connections and communication',
        identity: 'purpose and values alignment',
        vitality: 'energy and motivation levels',
        environment: 'workplace culture and environment'
    };
    
    return {
        domain: domain,
        description: domainDescriptions[domain],
        responseCount: responses.length,
        oceanScores: oceanScores,
        patterns: patterns,
        timestamp: new Date().toISOString()
    };
}

// Generate OCEAN analysis summary (after 30 questions)
function generateOceanSummary() {
    const allScores = calculateOceanScores(assessmentState.allResponses);
    
    // Identify strongest traits
    const traits = Object.entries(allScores)
        .sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]))
        .slice(0, 3);
    
    // Check for concerning patterns
    const concerns = [];
    if (allScores.N > 0.6) {
        concerns.push('High stress indicators detected');
    }
    if (allScores.C < -0.4) {
        concerns.push('Potential organization challenges');
    }
    if (allScores.E < -0.5 && allScores.A < -0.3) {
        concerns.push('Risk of workplace isolation');
    }
    
    return {
        scores: allScores,
        strongestTraits: traits,
        concerns: concerns,
        questionCount: assessmentState.allResponses.length,
        domainsCompleted: assessmentState.completedDomains.length
    };
}

// Export for use in main game
window.THRIVEAssessment = {
    state: assessmentState,
    calculateOceanScores,
    getOceanTendency,
    analyzeDomainPatterns,
    getNextDomain,
    shouldShowOceanAnalysis,
    generateDomainSummary,
    generateOceanSummary,
    DOMAIN_ORDER
};