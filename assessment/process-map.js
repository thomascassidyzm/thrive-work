// THRIVE Assessment Process Map Visualization
// Interactive map showing AI conditional logic flow

class ProcessMapVisualization {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentPhase = 'entry';
        this.confidence = { max: 0, dimensions: {} };
        this.questionCount = 0;
        this.initializeVisualization();
    }

    initializeVisualization() {
        if (!this.container) return;

        this.container.innerHTML = `
            <div class="process-map">
                <div class="process-header">
                    <h3>AI Diagnostic Process</h3>
                    <div class="process-subtitle">Real-time conditional logic visualization</div>
                </div>

                <div class="process-flow">
                    <!-- Phase 1: Entry Questions -->
                    <div class="process-phase entry-phase active" id="entry-phase">
                        <div class="phase-number">1</div>
                        <div class="phase-content">
                            <div class="phase-title">Entry Screening</div>
                            <div class="phase-description">10 comprehensive questions covering all diagnostic frameworks</div>
                            <div class="phase-progress">
                                <div class="phase-progress-bar">
                                    <div class="phase-progress-fill" id="entry-progress"></div>
                                </div>
                                <div class="phase-questions" id="entry-questions">0 / 10</div>
                            </div>
                        </div>
                        <div class="phase-arrow">→</div>
                    </div>

                    <!-- Phase 2: Pattern Recognition -->
                    <div class="process-phase pattern-phase" id="pattern-phase">
                        <div class="phase-number">2</div>
                        <div class="phase-content">
                            <div class="phase-title">Pattern Recognition</div>
                            <div class="phase-description">AI builds confidence across 8 diagnostic dimensions</div>
                            <div class="confidence-grid" id="confidence-grid">
                                <!-- Confidence indicators will be populated here -->
                            </div>
                        </div>
                        <div class="phase-arrow">→</div>
                    </div>

                    <!-- Phase 3: Adaptive Branching -->
                    <div class="process-phase branching-phase" id="branching-phase">
                        <div class="phase-number">3</div>
                        <div class="phase-content">
                            <div class="phase-title">Adaptive Branching</div>
                            <div class="phase-description">Targeted questions based on uncertainty areas</div>
                            <div class="branching-indicator" id="branching-indicator">
                                <div class="uncertainty-focus">Analyzing patterns...</div>
                            </div>
                        </div>
                        <div class="phase-arrow">→</div>
                    </div>

                    <!-- Phase 4: Intervention Routing -->
                    <div class="process-phase routing-phase" id="routing-phase">
                        <div class="phase-number">4</div>
                        <div class="phase-content">
                            <div class="phase-title">Intervention Routing</div>
                            <div class="phase-description">Source attribution and intervention recommendation</div>
                            <div class="routing-result" id="routing-result">
                                <div class="result-pending">Waiting for completion...</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Real-time Diagnostic Dashboard -->
                <div class="diagnostic-dashboard">
                    <div class="dashboard-header">
                        <h4>Live Diagnostic Analysis</h4>
                        <div class="analysis-confidence" id="analysis-confidence">0% confidence</div>
                    </div>

                    <div class="diagnostic-dimensions" id="diagnostic-dimensions">
                        <!-- Diagnostic dimension bars will be populated here -->
                    </div>

                    <div class="signal-flow" id="signal-flow">
                        <div class="signal-header">Current Question Signals</div>
                        <div class="signal-indicators" id="signal-indicators">
                            <!-- Signal strength indicators -->
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.initializeDiagnosticDimensions();
        this.addInteractiveStyles();
    }

    initializeDiagnosticDimensions() {
        const dimensions = [
            { key: 'structuralBarriers', name: 'Structural Barriers', color: '#ff6b6b' },
            { key: 'individualStress', name: 'Individual Stress', color: '#4ecdc4' },
            { key: 'organizationalDysfunction', name: 'Organizational Issues', color: '#45b7d1' },
            { key: 'workLifeIntegration', name: 'Work-Life Integration', color: '#96ceb4' },
            { key: 'meetingCulture', name: 'Meeting Culture', color: '#feca57' },
            { key: 'psychologicalSafety', name: 'Psychological Safety', color: '#ff9ff3' },
            { key: 'departmentalIssues', name: 'Team Dynamics', color: '#54a0ff' },
            { key: 'roleClarity', name: 'Role Clarity', color: '#5f27cd' }
        ];

        const dimensionsContainer = document.getElementById('diagnostic-dimensions');
        if (!dimensionsContainer) return;

        dimensionsContainer.innerHTML = dimensions.map(dim => `
            <div class="dimension-indicator" data-dimension="${dim.key}">
                <div class="dimension-name">${dim.name}</div>
                <div class="dimension-bar">
                    <div class="dimension-fill" style="background-color: ${dim.color}; width: 0%"></div>
                </div>
                <div class="dimension-confidence">0%</div>
            </div>
        `).join('');

        // Initialize confidence grid for pattern phase
        const confidenceGrid = document.getElementById('confidence-grid');
        if (confidenceGrid) {
            confidenceGrid.innerHTML = dimensions.slice(0, 4).map(dim => `
                <div class="confidence-cell" data-dimension="${dim.key}">
                    <div class="cell-name">${dim.name.split(' ')[0]}</div>
                    <div class="cell-confidence">0%</div>
                </div>
            `).join('');
        }
    }

    updateProgress(diagnosticState, currentQuestion) {
        this.questionCount = diagnosticState.evidence ? diagnosticState.evidence.length : 0;
        this.confidence.dimensions = diagnosticState.diagnosticVector || {};
        this.confidence.max = Math.max(...Object.values(this.confidence.dimensions));

        this.updatePhaseProgress();
        this.updateDiagnosticBars();
        this.updateCurrentPhase();
        this.updateSignalFlow(currentQuestion);
    }

    updatePhaseProgress() {
        // Update entry phase progress
        const entryProgress = document.getElementById('entry-progress');
        const entryQuestions = document.getElementById('entry-questions');

        if (entryProgress && entryQuestions) {
            const entryComplete = Math.min(this.questionCount / 6, 1);
            entryProgress.style.width = `${entryComplete * 100}%`;
            entryQuestions.textContent = `${this.questionCount} / 10`;
        }

        // Update overall confidence
        const analysisConfidence = document.getElementById('analysis-confidence');
        if (analysisConfidence) {
            analysisConfidence.textContent = `${Math.round(this.confidence.max * 100)}% confidence`;
        }
    }

    updateDiagnosticBars() {
        Object.entries(this.confidence.dimensions).forEach(([dimension, confidence]) => {
            const indicator = document.querySelector(`[data-dimension="${dimension}"]`);
            if (indicator) {
                const fill = indicator.querySelector('.dimension-fill');
                const confidenceText = indicator.querySelector('.dimension-confidence');

                if (fill) fill.style.width = `${confidence * 100}%`;
                if (confidenceText) confidenceText.textContent = `${Math.round(confidence * 100)}%`;
            }

            // Update confidence grid cells
            const cell = document.querySelector(`.confidence-cell[data-dimension="${dimension}"]`);
            if (cell) {
                const cellConfidence = cell.querySelector('.cell-confidence');
                if (cellConfidence) {
                    cellConfidence.textContent = `${Math.round(confidence * 100)}%`;
                    cell.style.opacity = Math.max(0.3, confidence);
                }
            }
        });
    }

    updateCurrentPhase() {
        // Determine current phase based on progress
        let newPhase = 'entry';

        if (this.questionCount >= 6) {
            newPhase = 'pattern';
        }

        if (this.confidence.max > 0.4) {
            newPhase = 'branching';
        }

        if (this.confidence.max > 0.75) {
            newPhase = 'routing';
        }

        if (newPhase !== this.currentPhase) {
            this.activatePhase(newPhase);
            this.currentPhase = newPhase;
        }
    }

    activatePhase(phaseName) {
        // Remove active class from all phases
        document.querySelectorAll('.process-phase').forEach(phase => {
            phase.classList.remove('active');
        });

        // Add active class to current phase
        const currentPhase = document.getElementById(`${phaseName}-phase`);
        if (currentPhase) {
            currentPhase.classList.add('active');
        }

        // Update branching indicator
        if (phaseName === 'branching') {
            this.updateBranchingIndicator();
        }
    }

    updateBranchingIndicator() {
        const branchingIndicator = document.getElementById('branching-indicator');
        if (!branchingIndicator) return;

        // Find highest uncertainty dimension
        const uncertainties = Object.entries(this.confidence.dimensions)
            .map(([key, conf]) => ({ key, uncertainty: Math.abs(conf - 0.5) }))
            .sort((a, b) => a.uncertainty - b.uncertainty);

        if (uncertainties.length > 0) {
            const focusArea = uncertainties[0].key;
            const dimensionName = this.getDimensionDisplayName(focusArea);

            branchingIndicator.innerHTML = `
                <div class="uncertainty-focus">
                    <div class="focus-label">Focusing on:</div>
                    <div class="focus-area">${dimensionName}</div>
                    <div class="focus-reason">Highest uncertainty area</div>
                </div>
            `;
        }
    }

    updateSignalFlow(currentQuestion) {
        const signalIndicators = document.getElementById('signal-indicators');
        if (!signalIndicators || !currentQuestion) return;

        const signals = currentQuestion.signals || {};
        const signalElements = Object.entries(signals).map(([category, categorySignals]) => {
            const signalCount = Object.keys(categorySignals).length;
            return `
                <div class="signal-category">
                    <div class="signal-name">${this.formatCategoryName(category)}</div>
                    <div class="signal-strength">
                        ${'●'.repeat(signalCount)}${'○'.repeat(3 - signalCount)}
                    </div>
                </div>
            `;
        }).join('');

        signalIndicators.innerHTML = signalElements || '<div class="no-signals">No active signals</div>';
    }

    getDimensionDisplayName(key) {
        const names = {
            structuralBarriers: 'Structural Barriers',
            individualStress: 'Individual Stress',
            organizationalDysfunction: 'Organizational Issues',
            workLifeIntegration: 'Work-Life Integration',
            meetingCulture: 'Meeting Culture',
            psychologicalSafety: 'Psychological Safety',
            departmentalIssues: 'Team Dynamics',
            roleClarity: 'Role Clarity'
        };
        return names[key] || key;
    }

    formatCategoryName(category) {
        return category.charAt(0).toUpperCase() +
               category.slice(1).replace(/([A-Z])/g, ' $1');
    }

    addInteractiveStyles() {
        if (document.getElementById('process-map-styles')) return;

        const styles = document.createElement('style');
        styles.id = 'process-map-styles';
        styles.textContent = `
            .process-map {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 15px;
                padding: 1.5rem;
                margin: 2rem 0;
                border: 1px solid rgba(255, 215, 0, 0.2);
            }

            .process-header {
                text-align: center;
                margin-bottom: 2rem;
            }

            .process-header h3 {
                color: var(--primary-yellow);
                margin-bottom: 0.5rem;
            }

            .process-subtitle {
                color: var(--text-light);
                font-size: 0.9rem;
            }

            .process-flow {
                display: flex;
                align-items: center;
                margin-bottom: 2rem;
                overflow-x: auto;
                padding: 1rem 0;
            }

            .process-phase {
                display: flex;
                align-items: center;
                min-width: 200px;
                padding: 1rem;
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.03);
                border: 2px solid rgba(255, 255, 255, 0.1);
                transition: all 0.3s ease;
                opacity: 0.6;
            }

            .process-phase.active {
                opacity: 1;
                border-color: var(--primary-yellow);
                background: rgba(255, 215, 0, 0.1);
            }

            .phase-number {
                background: rgba(255, 255, 255, 0.2);
                color: var(--text-white);
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: bold;
                margin-right: 1rem;
                font-size: 0.9rem;
            }

            .process-phase.active .phase-number {
                background: var(--primary-yellow);
                color: #000;
            }

            .phase-content {
                flex: 1;
            }

            .phase-title {
                color: var(--text-white);
                font-weight: bold;
                margin-bottom: 0.3rem;
                font-size: 0.9rem;
            }

            .phase-description {
                color: var(--text-light);
                font-size: 0.8rem;
                line-height: 1.3;
                margin-bottom: 0.5rem;
            }

            .phase-progress-bar {
                background: rgba(255, 255, 255, 0.1);
                height: 4px;
                border-radius: 2px;
                overflow: hidden;
                margin-bottom: 0.3rem;
            }

            .phase-progress-fill {
                background: var(--primary-yellow);
                height: 100%;
                transition: width 0.5s ease;
                width: 0%;
            }

            .phase-questions {
                font-size: 0.7rem;
                color: var(--text-medium);
            }

            .phase-arrow {
                color: var(--primary-yellow);
                font-size: 1.5rem;
                margin: 0 1rem;
                opacity: 0.5;
            }

            .process-phase.active + .process-phase .phase-arrow {
                opacity: 1;
            }

            .confidence-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.5rem;
                margin-top: 0.5rem;
            }

            .confidence-cell {
                background: rgba(255, 255, 255, 0.05);
                padding: 0.5rem;
                border-radius: 5px;
                text-align: center;
                transition: opacity 0.3s ease;
            }

            .cell-name {
                font-size: 0.7rem;
                color: var(--text-light);
                margin-bottom: 0.2rem;
            }

            .cell-confidence {
                font-size: 0.8rem;
                color: var(--primary-yellow);
                font-weight: bold;
            }

            .diagnostic-dashboard {
                background: rgba(255, 255, 255, 0.03);
                border-radius: 10px;
                padding: 1rem;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }

            .dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }

            .dashboard-header h4 {
                color: var(--text-white);
                margin: 0;
                font-size: 1rem;
            }

            .analysis-confidence {
                color: var(--primary-yellow);
                font-weight: bold;
                font-size: 0.9rem;
            }

            .diagnostic-dimensions {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 0.8rem;
                margin-bottom: 1rem;
            }

            .dimension-indicator {
                display: flex;
                align-items: center;
                gap: 0.8rem;
            }

            .dimension-name {
                color: var(--text-white);
                font-size: 0.8rem;
                min-width: 80px;
            }

            .dimension-bar {
                flex: 1;
                background: rgba(255, 255, 255, 0.1);
                height: 6px;
                border-radius: 3px;
                overflow: hidden;
            }

            .dimension-fill {
                height: 100%;
                transition: width 0.5s ease;
                border-radius: 3px;
            }

            .dimension-confidence {
                color: var(--text-light);
                font-size: 0.7rem;
                min-width: 30px;
                text-align: right;
            }

            .signal-flow {
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                padding-top: 1rem;
            }

            .signal-header {
                color: var(--text-white);
                font-size: 0.9rem;
                margin-bottom: 0.5rem;
            }

            .signal-indicators {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }

            .signal-category {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                background: rgba(255, 255, 255, 0.05);
                padding: 0.3rem 0.8rem;
                border-radius: 15px;
            }

            .signal-name {
                color: var(--text-light);
                font-size: 0.8rem;
            }

            .signal-strength {
                color: var(--primary-yellow);
                font-size: 0.7rem;
            }

            @media (max-width: 768px) {
                .process-flow {
                    flex-direction: column;
                    align-items: stretch;
                }

                .phase-arrow {
                    transform: rotate(90deg);
                    margin: 0.5rem 0;
                }

                .diagnostic-dimensions {
                    grid-template-columns: 1fr;
                }
            }
        `;

        document.head.appendChild(styles);
    }

    showInterventionResult(result) {
        const routingResult = document.getElementById('routing-result');
        if (!routingResult) return;

        const primary = result.primaryDysfunction || { primary: 'unknown', confidence: 0 };
        const intervention = result.recommendedIntervention || { type: 'assessment', description: 'Continue assessment' };

        routingResult.innerHTML = `
            <div class="routing-complete">
                <div class="primary-finding">
                    <div class="finding-label">Primary Pattern:</div>
                    <div class="finding-name">${this.getDimensionDisplayName(primary.primary)}</div>
                    <div class="finding-confidence">${Math.round(primary.confidence * 100)}% confidence</div>
                </div>
                <div class="intervention-rec">
                    <div class="intervention-type">${intervention.type.replace(/_/g, ' ')}</div>
                    <div class="intervention-desc">${intervention.description}</div>
                </div>
            </div>
        `;

        this.activatePhase('routing');
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProcessMapVisualization;
} else {
    window.ProcessMapVisualization = ProcessMapVisualization;
}