// THRIVE Assessment Engine
// Pattern recognition across 6 dimensions

const dimensions = {
    time: {
        name: 'TIME',
        description: 'Rhythm, balance, and boundaries',
        questions: [
            {
                id: 't1',
                text: 'How would you describe your typical Monday morning?',
                type: 'multiple-choice',
                options: [
                    { value: 'energized', text: 'Energized and ready for the week' },
                    { value: 'neutral', text: 'Just another day, no strong feelings' },
                    { value: 'anxious', text: 'A bit anxious about the week ahead' },
                    { value: 'dread', text: 'I often feel a sense of dread' }
                ],
                ocean_indicators: { N: 'inverse' }, // Neuroticism
                behavioral_category: 'work_anticipation'
            },
            {
                id: 't2',
                text: 'Do you have consistent daily routines, or does each day look different?',
                type: 'multiple-choice',
                options: [
                    { value: 'very_consistent', text: 'Very consistent routines I stick to' },
                    { value: 'mostly_consistent', text: 'Generally consistent with some flexibility' },
                    { value: 'variable', text: 'It varies depending on the day' },
                    { value: 'chaotic', text: 'Every day is completely different' }
                ],
                ocean_indicators: { C: 'direct' }, // Conscientiousness
                behavioral_category: 'structure'
            },
            {
                id: 't3',
                text: 'When do you typically check work messages for the first time each day?',
                type: 'multiple-choice',
                options: [
                    { value: 'immediately', text: 'Within minutes of waking' },
                    { value: 'morning_routine', text: 'After my morning routine' },
                    { value: 'work_start', text: 'When I officially start work' },
                    { value: 'varies', text: 'It varies widely' }
                ],
                ocean_indicators: { N: 'direct', C: 'inverse' },
                behavioral_category: 'boundaries'
            },
            {
                id: 't4',
                text: 'How often do you feel in control of your time?',
                type: 'scale',
                scale: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
                ocean_indicators: { C: 'direct', N: 'inverse' },
                behavioral_category: 'autonomy'
            },
            {
                id: 't5',
                text: 'Do you often find yourself rushing from one thing to the next?',
                type: 'multiple-choice',
                options: [
                    { value: 'never', text: 'Never - I pace myself well' },
                    { value: 'occasionally', text: 'Occasionally when things are busy' },
                    { value: 'frequently', text: 'Frequently throughout the week' },
                    { value: 'constantly', text: 'Constantly - it\'s my normal pace' }
                ],
                ocean_indicators: { N: 'direct' },
                behavioral_category: 'pace'
            },
            {
                id: 't6',
                text: 'How clear are the boundaries between your work and personal time?',
                type: 'scale',
                scale: ['Non-existent', 'Blurry', 'Somewhat clear', 'Clear', 'Very clear'],
                ocean_indicators: { C: 'direct' },
                behavioral_category: 'boundaries'
            },
            {
                id: 't7',
                text: 'When plans change unexpectedly, how do you typically respond?',
                type: 'multiple-choice',
                options: [
                    { value: 'adaptable', text: 'I adapt easily and go with the flow' },
                    { value: 'minor_stress', text: 'Slightly stressed but I manage' },
                    { value: 'significant_stress', text: 'It significantly stresses me out' },
                    { value: 'depends', text: 'It depends on the situation' }
                ],
                ocean_indicators: { O: 'direct', N: 'inverse' },
                behavioral_category: 'flexibility'
            },
            {
                id: 't8',
                text: 'Do you regularly take breaks during your workday?',
                type: 'multiple-choice',
                options: [
                    { value: 'scheduled', text: 'Yes, I have scheduled breaks' },
                    { value: 'natural', text: 'Yes, when I naturally need them' },
                    { value: 'forced', text: 'Only when forced to' },
                    { value: 'rarely', text: 'Rarely - I power through' }
                ],
                ocean_indicators: { C: 'direct' },
                behavioral_category: 'self_care'
            },
            {
                id: 't9',
                text: 'How would you describe your relationship with deadlines?',
                type: 'multiple-choice',
                options: [
                    { value: 'early', text: 'I usually finish well before deadlines' },
                    { value: 'on_time', text: 'I meet them comfortably' },
                    { value: 'last_minute', text: 'I often work right up to the deadline' },
                    { value: 'struggle', text: 'I frequently struggle with deadlines' }
                ],
                ocean_indicators: { C: 'direct', N: 'direct' },
                behavioral_category: 'time_management'
            },
            {
                id: 't10',
                text: 'At the end of a typical day, how do you feel about what you accomplished?',
                type: 'multiple-choice',
                options: [
                    { value: 'satisfied', text: 'Satisfied with my progress' },
                    { value: 'mixed', text: 'Mixed - some wins, some misses' },
                    { value: 'disappointed', text: 'Often disappointed I didn\'t do more' },
                    { value: 'overwhelmed', text: 'Overwhelmed by what\'s still left to do' }
                ],
                ocean_indicators: { N: 'inverse' },
                behavioral_category: 'satisfaction'
            }
        ]
    },
    
    health: {
        name: 'HEALTH',
        description: 'Energy, sleep, and physical vitality',
        questions: [
            {
                id: 'h1',
                text: 'Would you describe your sleep as restorative?',
                type: 'multiple-choice',
                options: [
                    { value: 'very', text: 'Yes, I wake up refreshed' },
                    { value: 'mostly', text: 'Most nights are good' },
                    { value: 'sometimes', text: 'Sometimes yes, sometimes no' },
                    { value: 'rarely', text: 'Rarely - I often wake tired' }
                ],
                ocean_indicators: { N: 'inverse' },
                behavioral_category: 'sleep_quality'
            },
            // Add remaining 9 health questions...
        ]
    },
    
    relationships: {
        name: 'RELATIONSHIPS',
        description: 'Connection, support, and belonging',
        questions: [
            {
                id: 'r1',
                text: 'After social interactions at work, do you feel energized or drained?',
                type: 'scale',
                scale: ['Very drained', 'Somewhat drained', 'Neutral', 'Somewhat energized', 'Very energized'],
                ocean_indicators: { E: 'direct' },
                behavioral_category: 'social_energy'
            },
            // Add remaining 9 relationship questions...
        ]
    },
    
    identity: {
        name: 'IDENTITY',
        description: 'Purpose, values, and authentic self',
        questions: [
            {
                id: 'i1',
                text: 'How often do you feel you\'re being your authentic self at work?',
                type: 'scale',
                scale: ['Never', 'Rarely', 'Sometimes', 'Often', 'Always'],
                ocean_indicators: { O: 'direct', N: 'inverse' },
                behavioral_category: 'authenticity'
            },
            // Add remaining 9 identity questions...
        ]
    },
    
    vitality: {
        name: 'VITALITY',
        description: 'Growth, learning, and what energizes you',
        questions: [
            {
                id: 'v1',
                text: 'When was the last time you felt genuinely excited about learning something new?',
                type: 'multiple-choice',
                options: [
                    { value: 'this_week', text: 'This week' },
                    { value: 'this_month', text: 'This month' },
                    { value: 'few_months', text: 'A few months ago' },
                    { value: 'cant_remember', text: 'I can\'t remember' }
                ],
                ocean_indicators: { O: 'direct' },
                behavioral_category: 'learning_enthusiasm'
            },
            // Add remaining 9 vitality questions...
        ]
    },
    
    environment: {
        name: 'ENVIRONMENT',
        description: 'Spaces, culture, and conditions',
        questions: [
            {
                id: 'e1',
                text: 'How would you describe your primary workspace?',
                type: 'multiple-choice',
                options: [
                    { value: 'inspiring', text: 'Inspiring and energizing' },
                    { value: 'functional', text: 'Functional and adequate' },
                    { value: 'tolerable', text: 'Tolerable but not ideal' },
                    { value: 'draining', text: 'Draining or depressing' }
                ],
                ocean_indicators: { N: 'inverse' },
                behavioral_category: 'physical_environment'
            },
            // Add remaining 9 environment questions...
        ]
    }
};

// Assessment state
let assessmentState = {
    currentDimension: null,
    currentQuestionIndex: 0,
    responses: {},
    completedDimensions: [],
    oceanScores: { O: 0, C: 0, E: 0, A: 0, N: 0 },
    behavioralPatterns: {}
};

// Initialize assessment
function initAssessment() {
    // Check URL params for starting dimension
    const params = new URLSearchParams(window.location.search);
    const startDimension = params.get('dimension') || 'time';
    
    // Load saved state from localStorage
    const savedState = localStorage.getItem('thriveAssessment');
    if (savedState) {
        assessmentState = JSON.parse(savedState);
    }
    
    // Start with requested dimension
    if (!assessmentState.currentDimension) {
        startDimension(startDimension);
    } else {
        displayCurrentQuestion();
    }
    
    updateProgress();
}

// Start a dimension
function startDimension(dimensionKey) {
    assessmentState.currentDimension = dimensionKey;
    assessmentState.currentQuestionIndex = 0;
    displayCurrentQuestion();
    updateProgress();
}

// Display current question
function displayCurrentQuestion() {
    const dimension = dimensions[assessmentState.currentDimension];
    const question = dimension.questions[assessmentState.currentQuestionIndex];
    
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('current-question').textContent = assessmentState.currentQuestionIndex + 1;
    
    // Build answer options based on question type
    const optionsContainer = document.getElementById('answer-options');
    optionsContainer.innerHTML = '';
    
    if (question.type === 'multiple-choice') {
        question.options.forEach(option => {
            const button = document.createElement('button');
            button.className = 'answer-option glass-card';
            button.style.cssText = 'width: 100%; padding: 1rem; margin: 0.5rem 0; text-align: left; cursor: pointer;';
            button.textContent = option.text;
            button.onclick = () => selectAnswer(option.value);
            optionsContainer.appendChild(button);
        });
    } else if (question.type === 'scale') {
        const scaleContainer = document.createElement('div');
        scaleContainer.style.cssText = 'display: flex; justify-content: space-between; gap: 1rem;';
        
        question.scale.forEach((label, index) => {
            const button = document.createElement('button');
            button.className = 'scale-option glass-card';
            button.style.cssText = 'flex: 1; padding: 1rem; text-align: center; cursor: pointer;';
            button.textContent = label;
            button.onclick = () => selectAnswer(index);
            scaleContainer.appendChild(button);
        });
        
        optionsContainer.appendChild(scaleContainer);
    }
}

// Select answer
function selectAnswer(value) {
    const dimension = dimensions[assessmentState.currentDimension];
    const question = dimension.questions[assessmentState.currentQuestionIndex];
    
    // Store response
    assessmentState.responses[question.id] = {
        value: value,
        dimension: assessmentState.currentDimension,
        ocean_indicators: question.ocean_indicators,
        behavioral_category: question.behavioral_category
    };
    
    // Update OCEAN scores (simplified)
    if (question.ocean_indicators) {
        Object.entries(question.ocean_indicators).forEach(([trait, direction]) => {
            // This is simplified - you'd want more sophisticated scoring
            assessmentState.oceanScores[trait] += direction === 'direct' ? 1 : -1;
        });
    }
    
    // Save state
    localStorage.setItem('thriveAssessment', JSON.stringify(assessmentState));
    
    // Enable next button
    document.getElementById('next-btn').disabled = false;
}

// Navigate to next question
function nextQuestion() {
    const dimension = dimensions[assessmentState.currentDimension];
    
    if (assessmentState.currentQuestionIndex < dimension.questions.length - 1) {
        assessmentState.currentQuestionIndex++;
        displayCurrentQuestion();
    } else {
        // Dimension complete
        completeDimension();
    }
    
    updateProgress();
}

// Complete a dimension
function completeDimension() {
    assessmentState.completedDimensions.push(assessmentState.currentDimension);
    
    // Show dimension complete message
    alert(`${dimensions[assessmentState.currentDimension].name} dimension complete! Choose another dimension to continue.`);
    
    // Return to dimension selector or show results if all complete
    if (assessmentState.completedDimensions.length === 6) {
        showResults();
    } else {
        window.location.href = '/';
    }
}

// Update progress displays
function updateProgress() {
    const totalQuestions = 60;
    const answeredQuestions = Object.keys(assessmentState.responses).length;
    
    document.getElementById('questions-completed').textContent = answeredQuestions;
    document.getElementById('total-completed').textContent = answeredQuestions;
    
    const progressPercent = (answeredQuestions / totalQuestions) * 100;
    document.getElementById('overall-progress').style.width = progressPercent + '%';
}

// Show results
function showResults() {
    // Redirect to results page with state
    window.location.href = '/results/';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initAssessment);