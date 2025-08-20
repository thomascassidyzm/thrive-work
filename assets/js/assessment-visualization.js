// THRIVE Assessment Progressive Visualization
// Shows increasing understanding and confidence as questions are completed

class AssessmentVisualization {
    constructor() {
        this.questionCount = 0;
        this.dimensions = {
            time: { questions: 0, patterns: [], confidence: 0 },
            health: { questions: 0, patterns: [], confidence: 0 },
            relationships: { questions: 0, patterns: [], confidence: 0 },
            identity: { questions: 0, patterns: [], confidence: 0 },
            vitality: { questions: 0, patterns: [], confidence: 0 },
            environment: { questions: 0, patterns: [], confidence: 0 }
        };
        this.oceanProfile = {
            O: { value: 0, confidence: 0 },
            C: { value: 0, confidence: 0 },
            E: { value: 0, confidence: 0 },
            A: { value: 0, confidence: 0 },
            N: { value: 0, confidence: 0 }
        };
    }

    // Update after each question
    updateProgress(dimension, response) {
        this.questionCount++;
        this.dimensions[dimension].questions++;
        
        // Calculate confidence based on questions answered
        const confidenceLevel = this.calculateConfidence(this.questionCount);
        
        // Update dimension confidence
        this.dimensions[dimension].confidence = Math.min(
            100,
            this.dimensions[dimension].questions * 10
        );
        
        // Update OCEAN profile if applicable
        if (response.ocean) {
            this.updateOceanProfile(response.ocean, confidenceLevel);
        }
        
        // Return current state for visualization
        return this.getCurrentState();
    }

    calculateConfidence(questions) {
        // Confidence intervals decrease with more questions
        if (questions <= 10) return 30; // ±30% confidence
        if (questions <= 20) return 20; // ±20% confidence
        if (questions <= 30) return 10; // ±10% confidence
        return 5; // ±5% confidence after 30+ questions
    }

    updateOceanProfile(oceanScores, confidence) {
        Object.keys(oceanScores).forEach(trait => {
            const currentValue = this.oceanProfile[trait].value;
            const newValue = oceanScores[trait];
            
            // Weighted average with increasing weight for new data
            const weight = this.questionCount / (this.questionCount + 10);
            this.oceanProfile[trait].value = currentValue * (1 - weight) + newValue * weight;
            this.oceanProfile[trait].confidence = 100 - confidence;
        });
    }

    getCurrentState() {
        return {
            questionCount: this.questionCount,
            completionPercentage: Math.min(100, (this.questionCount / 30) * 100),
            confidenceLevel: 100 - this.calculateConfidence(this.questionCount),
            dimensions: this.dimensions,
            oceanProfile: this.oceanProfile,
            stage: this.getStage()
        };
    }

    getStage() {
        if (this.questionCount < 10) return 'emerging';
        if (this.questionCount < 20) return 'developing';
        if (this.questionCount < 30) return 'clarifying';
        return 'complete';
    }

    // Generate insight messages for different stages
    getInsightMessage() {
        const stage = this.getStage();
        const messages = {
            emerging: [
                "Initial patterns emerging...",
                "Beginning to understand your workplace dynamics...",
                "Early insights forming..."
            ],
            developing: [
                "Your profile is taking shape...",
                "Deeper patterns becoming visible...",
                "Understanding strengthening..."
            ],
            clarifying: [
                "Clear picture emerging...",
                "Strong patterns identified...",
                "Nearly complete understanding..."
            ],
            complete: [
                "Complete profile ready!",
                "Full analysis available",
                "Your personalized insights are ready"
            ]
        };
        
        const stageMessages = messages[stage];
        return stageMessages[Math.floor(Math.random() * stageMessages.length)];
    }

    // Create visual representation
    createVisualization(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const state = this.getCurrentState();
        
        // Create neural network visualization
        const html = `
            <div class="assessment-viz-container">
                <div class="viz-header">
                    <h3>${state.questionCount} Questions Completed</h3>
                    <p class="insight-message">${this.getInsightMessage()}</p>
                </div>
                
                <div class="confidence-indicator">
                    <div class="confidence-bar">
                        <div class="confidence-fill" style="width: ${state.confidenceLevel}%"></div>
                    </div>
                    <p class="confidence-label">
                        Confidence: ${state.confidenceLevel}% 
                        <span class="confidence-range">(±${this.calculateConfidence(this.questionCount)}%)</span>
                    </p>
                </div>
                
                <div class="neural-map">
                    ${this.createNeuralMap(state)}
                </div>
                
                ${this.questionCount >= 30 ? this.createSignupPrompt() : ''}
            </div>
        `;
        
        container.innerHTML = html;
    }

    createNeuralMap(state) {
        // Create a visual representation of dimensions as connected nodes
        const dimensions = Object.keys(this.dimensions);
        const centerX = 150;
        const centerY = 150;
        const radius = 100;
        
        let svg = `<svg width="300" height="300" class="neural-svg">`;
        
        // Draw connections between dimensions based on confidence
        dimensions.forEach((dim1, i) => {
            dimensions.forEach((dim2, j) => {
                if (i < j) {
                    const angle1 = (i * 2 * Math.PI) / dimensions.length;
                    const angle2 = (j * 2 * Math.PI) / dimensions.length;
                    const x1 = centerX + radius * Math.cos(angle1);
                    const y1 = centerY + radius * Math.sin(angle1);
                    const x2 = centerX + radius * Math.cos(angle2);
                    const y2 = centerY + radius * Math.sin(angle2);
                    
                    const opacity = (this.dimensions[dim1].confidence + this.dimensions[dim2].confidence) / 200;
                    
                    svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" 
                            stroke="rgba(255, 215, 0, ${opacity})" 
                            stroke-width="1"/>`;
                }
            });
        });
        
        // Draw dimension nodes
        dimensions.forEach((dim, i) => {
            const angle = (i * 2 * Math.PI) / dimensions.length;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const confidence = this.dimensions[dim].confidence;
            const size = 10 + (confidence / 10);
            
            svg += `
                <circle cx="${x}" cy="${y}" r="${size}" 
                        fill="rgba(255, 215, 0, ${confidence / 100})"
                        stroke="#FFD700" stroke-width="2"/>
                <text x="${x}" y="${y - size - 5}" 
                      text-anchor="middle" 
                      fill="#FFD700" 
                      font-size="12">
                    ${dim.charAt(0).toUpperCase()}
                </text>
            `;
        });
        
        // Central profile indicator
        if (state.questionCount >= 10) {
            const profileStrength = state.confidenceLevel / 100;
            svg += `
                <circle cx="${centerX}" cy="${centerY}" r="20" 
                        fill="rgba(255, 215, 0, ${profileStrength * 0.3})"
                        stroke="#FFD700" stroke-width="2"/>
                <text x="${centerX}" y="${centerY + 5}" 
                      text-anchor="middle" 
                      fill="#FFD700" 
                      font-size="14" 
                      font-weight="bold">
                    ${Math.round(state.completionPercentage)}%
                </text>
            `;
        }
        
        svg += `</svg>`;
        return svg;
    }

    createSignupPrompt() {
        return `
            <div class="signup-prompt">
                <h3>Your Assessment is Ready!</h3>
                <p>Sign up to:</p>
                <ul>
                    <li>Get your complete personalized report</li>
                    <li>Access AI coaching based on your profile</li>
                    <li>Track your progress over time</li>
                </ul>
                <button class="cta-button primary" onclick="showSignupModal()">
                    Get Your Full Report
                </button>
            </div>
        `;
    }

    // Store data for AI coach access
    saveForCoaching() {
        const assessmentData = {
            questionCount: this.questionCount,
            dimensions: this.dimensions,
            oceanProfile: this.oceanProfile,
            completedAt: new Date().toISOString()
        };
        
        // Store in localStorage for now
        localStorage.setItem('thrive_assessment_data', JSON.stringify(assessmentData));
        
        // This will be sent to the coaching API when they start a chat
        return assessmentData;
    }

    // Retrieve assessment data for coaching context
    static getAssessmentContext() {
        const stored = localStorage.getItem('thrive_assessment_data');
        if (!stored) return null;
        
        const data = JSON.parse(stored);
        
        // Create a summary for the AI coach
        return {
            questionsCompleted: data.questionCount,
            strongestDimensions: Object.entries(data.dimensions)
                .sort((a, b) => b[1].confidence - a[1].confidence)
                .slice(0, 2)
                .map(([dim]) => dim),
            oceanProfile: data.oceanProfile,
            assessmentDate: data.completedAt
        };
    }
}

// CSS for the visualization
const vizStyles = `
<style>
.assessment-viz-container {
    background: var(--glass-white);
    border-radius: 20px;
    padding: 2rem;
    margin: 2rem 0;
}

.viz-header {
    text-align: center;
    margin-bottom: 2rem;
}

.insight-message {
    color: var(--primary-yellow);
    font-style: italic;
    margin-top: 0.5rem;
}

.confidence-indicator {
    margin: 2rem 0;
}

.confidence-bar {
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid var(--primary-yellow);
}

.confidence-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary-yellow), var(--primary-yellow-bright));
    transition: width 0.5s ease;
}

.confidence-label {
    text-align: center;
    margin-top: 0.5rem;
    color: var(--text-light);
}

.confidence-range {
    opacity: 0.7;
    font-size: 0.9em;
}

.neural-map {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
}

.neural-svg {
    filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
}

.signup-prompt {
    background: rgba(255, 215, 0, 0.1);
    border: 2px solid var(--primary-yellow);
    border-radius: 15px;
    padding: 2rem;
    text-align: center;
    margin-top: 2rem;
}

.signup-prompt ul {
    list-style: none;
    padding: 1rem 0;
}

.signup-prompt li {
    padding: 0.5rem 0;
    color: var(--text-light);
}

.signup-prompt li:before {
    content: "✓ ";
    color: var(--primary-yellow);
    font-weight: bold;
}
</style>
`;

// Export for use in assessment
window.AssessmentVisualization = AssessmentVisualization;