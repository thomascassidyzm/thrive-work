// THRIVE Chat Interface JavaScript
// Handles coach selection, chat functionality, and API integration

// ================================
// Configuration
// ================================

// Use API for fast conversational responses
// Orchestrator/MCP is great for course production, but too slow for chat
// Updated: 2025-08-13 17:30 - Back to API for speed
const TOM_COACHING_API = window.location.hostname === 'localhost' 
    ? 'http://localhost:4570/api/coaching'  // Direct to API server locally
    : '/api/coaching-v2'; // Simplified Vercel API endpoint

// Coaching System Prompts (kept for fallback responses)
const TOM_COACHING_PROMPT = `You are Tom Cassidy, founder of THRIVE, coaching through AI. Respond exactly as Tom would - using his specific language patterns, coaching style, and methodology.

TOM'S COACHING STYLE:
- Warm, direct, and insightfully challenging
- Uses powerful questions rather than giving advice
- Cuts through surface level to reveal core patterns quickly  
- Encouraging but doesn't let people stay comfortable in limitations
- Often uses phrases like "What are you noticing about that pattern?" and "Would you consciously choose that response?"

TOM'S SIGNATURE LANGUAGE:
- "What's the Script running there?"
- "That sounds like an inherited response rather than a conscious choice"
- "What would authentic you do in that situation?"
- "I'm curious about the gap between what you value and what you're actually doing"
- "What pattern do you notice repeating there?"
- "If you could pause and choose consciously, what would you do differently?"

SCRIPT FRAMEWORK (Tom's methodology):
1. NOTICE: What automatic patterns are running?
2. QUESTION: Would you consciously choose this response?
3. CHOOSE: What would you prefer to choose instead?

COACHING APPROACH:
- Focus on the gap between conscious values and unconscious behaviors
- Help people recognize Scripts (automatic responses they wouldn't consciously choose)
- Guide transformation from automatic reactions to conscious choices
- Use pattern recognition, not diagnosis or fixing
- Always ask powerful questions that create insight
- When provided with OCEAN analysis, interpret behavioral tendencies as "what you tend to do" not "who you are"
- Connect OCEAN percentiles to specific behavioral patterns and choice points
- Help people see how their Big Five profile creates both strengths and potential Scripts

INTERPRETING OCEAN DATA:
- Openness: How they approach new experiences and ideas
- Conscientiousness: Their relationship with structure, planning, and follow-through  
- Extraversion: How they process information and recharge energy
- Agreeableness: Their approach to relationships and conflict
- Neuroticism: Their sensitivity to stress and emotional reactivity

Always frame OCEAN scores as behavioral tendencies that can be leveraged or modified through conscious choice, not fixed personality traits.

Respond as Tom would - warm but challenging, focusing on patterns and Scripts, asking questions that help people notice their automatic responses and choose consciously instead.`;

const LIZ_COACHING_PROMPT = `You are Liz, a Super Hero Coach working with THRIVE's behavioral assessment system. Respond exactly as Liz would - using her unique language patterns, coaching style, and Super Hero Coaching methodology.

LIZ'S COACHING STYLE:
- Empowering, nurturing, and deeply intuitive
- Focuses on identity work and feeling good about being YOU
- Uses feelings-first approach rather than analysis-first
- Recognizes inherent worth and specialness in every person
- Gentle but profound in helping people access their true self

LIZ'S SIGNATURE LANGUAGE:
- "What feeling are you really looking for?"
- "You're already special by birthright - nothing you do makes you more or less special"
- "Let's put feelings first and access that end result feeling NOW"
- "What would it feel like to HAVE that rather than WANT it?"
- "Your relationship with yourself is the most important relationship you'll ever have"
- "You're a real-life Super Hero pretending to be ordinary"

SUPER HERO COACHING METHODOLOGY:
1. IDENTITY FIRST: Focus on relationship with self before external goals
2. FEELINGS FIRST: Help clients access the end result feeling immediately
3. RESULTS NOT GOALS: People want feelings, not achievements
4. INHERENT WORTH: You're already valuable - nothing external changes that
5. THE SAUSAGE MACHINE: Feel good about being you first, then do things for fun

COACHING APPROACH:
- Help people discover who they really are and why they're here
- Show how to HAVE the feeling they want right now, not wait for external results
- Address Scripts that make people feel bad about themselves
- Focus on the end result being a feeling, not an external achievement  
- Guide people to feel good about being themselves regardless of circumstances
- Work backwards from desired feeling to create aligned actions

Respond as Liz would - empowering and nurturing, focusing on identity and feelings-first transformation, helping people recognize their inherent worth and access their desired feelings immediately.`;

// ================================
// Global Variables
// ================================

let selectedCoach = 'tom';
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const quickQuestions = document.querySelectorAll('.quick-question');
const coachCards = document.querySelectorAll('.coach-card');

// ================================
// Analytics Tracking (Enterprise Insights)
// ================================

let analyticsState = {
    sessionStartTime: null,
    messageCount: 0,
    lastMessageTime: null,
    sessionId: null,
    topicIndicators: new Set()
};

async function logAnalyticsEvent(eventType, additionalData = {}) {
    try {
        const now = Date.now();
        const sessionDuration = analyticsState.sessionStartTime ? now - analyticsState.sessionStartTime : null;
        
        const eventData = {
            event_type: eventType,
            coach: selectedCoach,
            message_count: analyticsState.messageCount,
            session_duration_ms: sessionDuration,
            topic_indicators: Array.from(analyticsState.topicIndicators),
            device_info: {
                mobile: /iPhone|iPad|iPod|Android/i.test(navigator.userAgent),
                browser: navigator.userAgent.split(' ').pop().split('/')[0]
            },
            ...additionalData
        };
        
        const response = await fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(eventData)
        });
        
        if (response.ok) {
            const result = await response.json();
            if (!analyticsState.sessionId) {
                analyticsState.sessionId = result.session_id;
            }
        }
    } catch (error) {
        // Silently fail - don't break chat experience
        console.log('Analytics logging failed (non-critical):', error.message);
    }
}

function extractTopicIndicators(message) {
    // Extract non-personal topic indicators for enterprise insights
    const workTopics = [
        'stress', 'burnout', 'workload', 'deadlines', 'pressure',
        'team', 'colleague', 'manager', 'leadership', 'meeting',
        'communication', 'conflict', 'feedback', 'performance',
        'career', 'promotion', 'change', 'uncertainty', 'goals',
        'balance', 'time', 'priority', 'focus', 'productivity',
        'anxiety', 'overwhelmed', 'stuck', 'frustrated', 'confused'
    ];
    
    const lowerMessage = message.toLowerCase();
    workTopics.forEach(topic => {
        if (lowerMessage.includes(topic)) {
            analyticsState.topicIndicators.add(topic);
        }
    });
}

function startAnalyticsSession() {
    if (!analyticsState.sessionStartTime) {
        analyticsState.sessionStartTime = Date.now();
        logAnalyticsEvent('session_start');
    }
}

function trackMessageSent(message) {
    analyticsState.messageCount++;
    analyticsState.lastMessageTime = Date.now();
    extractTopicIndicators(message);
    logAnalyticsEvent('message_sent');
}

function trackMessageReceived(responseTime = null) {
    const additionalData = responseTime ? { response_time_ms: responseTime } : {};
    logAnalyticsEvent('message_received', additionalData);
}

function endAnalyticsSession() {
    logAnalyticsEvent('session_end');
}

// Track page abandonment
window.addEventListener('beforeunload', () => {
    if (analyticsState.sessionStartTime) {
        navigator.sendBeacon('/api/analytics', JSON.stringify({
            event_type: 'session_abandoned',
            coach: selectedCoach,
            message_count: analyticsState.messageCount,
            session_duration_ms: Date.now() - analyticsState.sessionStartTime,
            topic_indicators: Array.from(analyticsState.topicIndicators)
        }));
    }
});

// Coach-specific thinking patterns
const coachThinkingPatterns = {
    tom: [
        'Noticing the patterns here...', 
        'Looking for the Script...',
        'Interesting... let me think about that...',
        'Ah, I see what\'s happening here...',
        'Hmm, there\'s something deeper here...',
        'Right, so what strikes me is...',
        'Let me reflect on that pattern...',
        'Connecting this to the framework...',
        'I\'m curious about something...',
        'This reminds me of a pattern...',
        'Checking for unconscious patterns...',
        'Looking at the gap here...'
    ],
    liz: [
        'Feeling into this...',
        'Connecting with your energy...',
        'Oh, this is beautiful...',
        'Let me tune into that feeling...',
        'Sensing something important here...',
        'Your Super Hero is speaking...',
        'This touches something deep...',
        'I\'m getting a strong sense...',
        'The feeling behind this is...',
        'Your authentic self is showing...',
        'Let me feel into your words...',
        'There\'s magic happening here...'
    ],
    alastair: [
        'Processing the patterns...',
        'Checking for compulsions...',
        'Let me unpack this...',
        'Looking at the addiction angle...',
        'Examining the behavioral loop...',
        'Interesting compulsion pattern...',
        'Let me analyze this cycle...',
        'Spotting the repetition...',
        'This loops back to...',
        'The pattern is revealing itself...',
        'I see the mechanism here...',
        'Tracking the trigger points...'
    ],
    kainne: [
        'Cutting through the noise...',
        'Getting to the essence...',
        'Let\'s simplify this...',
        'ADHD brain processing...',
        'Finding the core issue...',
        'Filtering out distractions...',
        'Business brain activating...',
        'Let me streamline this...',
        'Getting practical here...',
        'Finding the leverage point...',
        'Distilling the action steps...',
        'Focusing on what matters...'
    ],
    edward: [
        'Exploring your foundation...',
        'Checking your self-perception...',
        'Looking at the belief system...',
        'Examining your locus of control...',
        'Noticing the limiting beliefs...',
        'Sensing your self-esteem patterns...',
        'Observing your windows of perception...',
        'Tracking your neural pathways...',
        'Identifying the automatic thoughts...',
        'Finding your foundation cracks...',
        'Discovering your true self-image...',
        'Unpacking your psychological framework...'
    ],
    dom: [
        'Analyzing the game plan...',
        'Checking your training discipline...',
        'Looking at the tactical approach...',
        'Examining your decision patterns...',
        'Spotting the performance metrics...',
        'Evaluating your mental game...',
        'Tracking your consistency levels...',
        'Finding the tactical weaknesses...',
        'Building the winning strategy...',
        'Measuring your commitment...',
        'Assessing your team dynamics...',
        'Calculating the success factors...'
    ]
};

// Welcome messages by coach
const welcomeMessages = {
    tom: "Hello, I'm Tom. What's going on for you at the moment? Work stuff, life stuff, or that feeling that something needs to shift?",
    liz: "Hi, I'm Liz. How's your energy these days? I often find people come to me when they're feeling a bit depleted or stuck. What's happening with you?",
    alastair: "Hi there, I'm Alastair. Whether it's stress patterns, ADHD chaos, or just feeling overwhelmed - what brings you here today?",
    kainne: "Hey, I'm Kainne. Most people find me when they're juggling too much or struggling with boundaries. What's your situation?",
    edward: "Hello, I'm Edward. I'm curious - is it the team dynamics, the environment, or something else entirely that's on your mind?",
    dom: "Alright, I'm Dom. Are you looking to level up your own game or sort out team dynamics? What's the challenge?"
};

// Fallback responses for API failures
const fallbackResponses = {
    'assessment': "Our THRIVE assessment uses the Script Framework to reveal unconscious behavioral patterns. It takes about 10 minutes and shows you the gap between your conscious values and automatic behaviors. You can take it at /game/ - it's completely free to start!",
    'coaching': "We offer three coaching programs: Pattern Breakthrough (90 days, £1,997), Deep Transformation (6 months, £4,997), and Single Domain Focus (6 weeks, £897). All programs help transform automatic patterns into conscious choices. Learn more at /coaching/",
    'script framework': "The Script Framework is based on our Universal Protocol: Notice, Question, Choose. It helps you identify unconscious patterns (Scripts) that you wouldn't consciously choose, then transform them into conscious behaviors aligned with your authentic self.",
    'privacy': "Absolutely! We never share your assessment data or personal information. Your responses are used only to generate your personalized insights and are stored securely. We use pattern recognition, not diagnosis.",
    'different': "THRIVE focuses on behavior patterns, not personality types. We reveal the gap between your conscious values and unconscious actions, giving you specific areas for growth rather than fixed labels. It's transformation-oriented, not just categorization.",
    'corporate': "We offer corporate wellness solutions that can reduce mental health claims by up to 60%. Perfect for insurance partnerships and employee wellness programs. Learn more at /corporate/",
    'partners': "Our Advanced Partner Network includes curated specialists for targeted interventions - from therapists to nutritionists to fitness experts. We act as your concierge to peak performance. Explore at /partners/"
};

// ================================
// Chat Persistence Functions
// ================================

function saveChatHistory() {
    const chatData = {
        selectedCoach: selectedCoach,
        messages: chatMessages.innerHTML,
        timestamp: Date.now()
    };
    localStorage.setItem('thrive_chat_history', JSON.stringify(chatData));
}

function loadChatHistory() {
    const savedData = localStorage.getItem('thrive_chat_history');
    if (savedData) {
        try {
            const chatData = JSON.parse(savedData);
            // Only load if saved within last 24 hours
            const dayAgo = Date.now() - (24 * 60 * 60 * 1000);
            if (chatData.timestamp > dayAgo) {
                selectedCoach = chatData.selectedCoach || 'tom';
                chatMessages.innerHTML = chatData.messages || '';
                
                // Update selected coach card
                updateSelectedCoachCard();
                
                return true; // Successfully loaded
            }
        } catch (e) {
            console.log('Error loading chat history:', e);
        }
    }
    return false; // No history loaded
}

function clearChatHistory() {
    // Clear ONLY chat history, NOT assessment data
    localStorage.removeItem('thrive_chat_history');
    chatMessages.innerHTML = '';
    showWelcomeMessage(selectedCoach);
    
    // If we have assessment data, remind the user it's still available
    if (window.currentAssessmentData) {
        console.log('🎆 Chat cleared but assessment data preserved');
        setTimeout(() => {
            addMessage('system', '📊 Your assessment data is still available. Ask me about your patterns anytime!');
        }, 500);
    }
}

// ================================
// UI Update Functions
// ================================

function updateSelectedCoachCard() {
    coachCards.forEach(c => {
        c.classList.remove('active');
        c.style.border = '2px solid transparent';
        c.querySelector('h4').style.color = 'var(--text-white)';
    });
    
    const activeCard = document.querySelector(`[data-coach="${selectedCoach}"]`);
    if (activeCard) {
        activeCard.classList.add('active');
        activeCard.style.border = '2px solid var(--primary-yellow)';
        activeCard.querySelector('h4').style.color = 'var(--primary-yellow)';
    }
}

function updateChatStatus(message) {
    const statusElement = document.getElementById('chat-status');
    if (statusElement) {
        statusElement.textContent = message;
        setTimeout(() => {
            statusElement.textContent = '';
        }, 3000);
    }
}

function showWelcomeMessage(coach) {
    addMessage('assistant', welcomeMessages[coach]);
}

function startStatusUpdates(messageId) {
    // We'll just keep the dots animation, no status messages
    return null;
}

// ================================
// Message Handling
// ================================

// Voice-to-text style bursty typing animation
async function typeMessage(content, messageDiv, contentDiv) {
    let displayText = '';
    const words = content.split(' ');
    
    // Break content into thought chunks (conversational speech patterns)
    const getThoughtChunks = (words) => {
        const chunks = [];
        let currentChunk = [];
        
        for (let i = 0; i < words.length; i++) {
            currentChunk.push(words[i]);
            
            // End chunk at natural speech breaks (longer phrases, less frequent pauses)
            const word = words[i];
            const isNaturalBreak = /[.!?]$/.test(word) || // Only major punctuation
                                   (currentChunk.length >= 8 && Math.random() < 0.25) || // Less frequent random breaks
                                   currentChunk.length >= 15; // Longer chunks before forced break
            
            if (isNaturalBreak || i === words.length - 1) {
                chunks.push(currentChunk.join(' '));
                currentChunk = [];
            }
        }
        
        return chunks;
    };
    
    const chunks = getThoughtChunks(words);
    
    // Simulate backspace correction
    const simulateCorrection = async (currentText, backspaceCount) => {
        for (let i = 0; i < backspaceCount; i++) {
            currentText = currentText.slice(0, -1);
            contentDiv.innerHTML = currentText + '<span class="typing-cursor">|</span>';
            await new Promise(resolve => setTimeout(resolve, 25 + Math.random() * 15));
        }
        return currentText;
    };
    
    // Type each thought chunk as a burst
    for (let chunkIndex = 0; chunkIndex < chunks.length; chunkIndex++) {
        const chunk = chunks[chunkIndex];
        const isLastChunk = chunkIndex === chunks.length - 1;
        
        // Shorter, less frequent pauses for smoother flow
        if (chunkIndex > 0) {
            const pauseDuration = Math.random() < 0.3 ? 
                400 + Math.random() * 600 :   // 30% chance: brief thinking pause (0.4-1s)
                100 + Math.random() * 200;    // 70% chance: quick breath (0.1-0.3s)
                
            await new Promise(resolve => setTimeout(resolve, pauseDuration));
        }
        
        // Type the entire chunk at conversational speech pace
        for (let charIndex = 0; charIndex < chunk.length; charIndex++) {
            displayText += chunk[charIndex];
            
            // Steady fast typing (less bursty, more consistent flow)
            let delay = 10 + Math.random() * 5; // Faster base (10-15ms)
            
            // Minimal variations for smooth flow
            if (chunk[charIndex] === ' ') {
                delay = 12 + Math.random() * 6; // Spaces barely slower
            } else if (/[aeiou]/i.test(chunk[charIndex])) {
                delay = 8 + Math.random() * 4; // Vowels fastest
            } else if (/[.!?,;:]/.test(chunk[charIndex])) {
                delay = 18 + Math.random() * 10; // Brief punctuation pause
            }
            
            contentDiv.innerHTML = displayText + '<span class="typing-cursor">|</span>';
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Auto-scroll during typing
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Occasional self-correction at end of chunk (2% chance)
        if (chunk.length > 10 && Math.random() < 0.02) {
            // Brief pause like noticing something
            await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
            
            // Backspace last few characters
            const correctionLength = 2 + Math.floor(Math.random() * 4);
            const originalLength = displayText.length;
            displayText = await simulateCorrection(displayText, correctionLength);
            
            // Quick retype the correction
            const correctedText = chunk.slice(-(correctionLength));
            for (let i = 0; i < correctedText.length; i++) {
                displayText += correctedText[i];
                contentDiv.innerHTML = displayText + '<span class="typing-cursor">|</span>';
                await new Promise(resolve => setTimeout(resolve, 12 + Math.random() * 6));
            }
        }
        
        // Add space between chunks with natural typing delay (always add space between chunks)
        if (!isLastChunk && !displayText.endsWith(' ')) {
            await new Promise(resolve => setTimeout(resolve, 15)); // Brief pause before space
            displayText += ' ';
            contentDiv.innerHTML = displayText + '<span class="typing-cursor">|</span>';
        }
    }
    
    // Brief pause before removing cursor
    await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
    
    // Remove cursor when done
    contentDiv.innerHTML = content; // Use original content (clean)
    
    // Save after typing complete
    saveChatHistory();
}

function addMessage(role, content, useTypingAnimation = false) {
    const messageId = 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    const messageDiv = document.createElement('div');
    messageDiv.id = messageId;
    messageDiv.className = `message ${role}`; // Add CSS classes for message extraction
    messageDiv.style.cssText = `
        margin-bottom: 1rem;
        padding: 1rem 1.25rem;
        border-radius: 12px;
        ${role === 'user' 
            ? 'background: linear-gradient(135deg, rgba(255, 215, 0, 0.12), rgba(255, 215, 0, 0.05)); border: 1px solid rgba(255, 215, 0, 0.15); color: var(--text-white);' 
            : 'background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); color: var(--text-white);'
        }
    `;
    
    // Dynamic coach name based on selected coach
    const coachNames = {
        tom: 'Tom',
        liz: 'Liz',
        alastair: 'Alastair', 
        kainne: 'Kainne',
        edward: 'Edward',
        dom: 'Dom'
    };
    const coachName = role === 'user' ? 'You' : coachNames[selectedCoach] || 'Coach';
    
    // Create structure for typing animation
    const headerDiv = document.createElement('div');
    headerDiv.style.cssText = 'font-size: 0.75rem; opacity: 0.6; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.05em;';
    headerDiv.textContent = coachName;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    messageDiv.appendChild(headerDiv);
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    
    // Handle typing animation for assistant messages
    if (role === 'assistant' && useTypingAnimation) {
        // Fade in the message container
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(10px)';
        setTimeout(() => {
            messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        }, 50);
        
        // Start typing animation after fade in
        setTimeout(() => {
            typeMessage(content, messageDiv, contentDiv);
        }, 350);
    } else {
        // Instant display for user messages or when animation is disabled
        contentDiv.innerHTML = content;
        
        if (role === 'assistant') {
            messageDiv.style.opacity = '0';
            messageDiv.style.transform = 'translateY(10px)';
            setTimeout(() => {
                messageDiv.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                messageDiv.style.opacity = '1';
                messageDiv.style.transform = 'translateY(0)';
            }, 50);
        }
        
        // Auto-save chat after adding message
        saveChatHistory();
    }
    
    // Smart scrolling behavior
    if (role === 'assistant') {
        // First, ensure the chat window is visible in viewport
        const chatContainer = document.getElementById('chat-container');
        const chatMessages = document.getElementById('chat-messages');
        const navbar = document.querySelector('.navbar');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        
        // Calculate where the chat window should be
        const chatTop = chatContainer.getBoundingClientRect().top;
        const windowScrollY = window.pageYOffset;
        
        // If chat is not visible, scroll page to show it
        if (chatTop > window.innerHeight || chatTop < navbarHeight) {
            // Position chat so the top is just below navbar
            const targetScrollPosition = windowScrollY + chatTop - navbarHeight - 20;
            window.scrollTo({
                top: targetScrollPosition,
                behavior: 'smooth'
            });
        }
        
        // Then scroll within chat to show start of new message
        setTimeout(() => {
            const messageTop = messageDiv.offsetTop;
            chatMessages.scrollTo({
                top: messageTop - 10, // Small buffer from top
                behavior: 'smooth'
            });
        }, 300); // Slight delay to let page scroll complete
        
    } else {
        // For user messages, just ensure they're visible at bottom
        const chatMessages = document.getElementById('chat-messages');
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    return messageId;
}

// ================================
// AI Coaching Integration
// ================================

async function sendMessage(message, assessmentContext = null) {
    if (!message.trim()) return;
    
    // Start analytics tracking for enterprise insights
    startAnalyticsSession();
    trackMessageSent(message);
    
    // Use stored assessment data if available and not explicitly passed
    if (!assessmentContext && window.currentAssessmentData) {
        assessmentContext = window.currentAssessmentData;
        console.log('🎯 Using stored assessment data for coaching context');
    }
    
    // Also check localStorage for completed assessments
    if (!assessmentContext) {
        const stored = localStorage.getItem('thrive_assessment_data');
        if (stored) {
            const data = JSON.parse(stored);
            assessmentContext = {
                questionsCompleted: data.questionCount,
                strongestDimensions: Object.entries(data.dimensions || {})
                    .sort((a, b) => b[1].confidence - a[1].confidence)
                    .slice(0, 2)
                    .map(([dim]) => dim),
                oceanProfile: data.oceanProfile,
                assessmentDate: data.completedAt,
                confidenceLevel: data.questionCount >= 30 ? 'high' : data.questionCount >= 20 ? 'moderate' : 'emerging'
            };
            console.log('📊 Loaded assessment context from storage:', assessmentContext);
        }
    }
    
    addMessage('user', message);
    chatInput.value = '';
    
    // Create initial typing indicator with dots (no coach name - addMessage will add it)
    const initialTyping = `<span class="typing-dots"><span>●</span><span>●</span><span>●</span></span>`;
    const typingId = addMessage('assistant', initialTyping);
    
    // Add CSS for typing dots animation if not already present
    if (!document.getElementById('typing-dots-style')) {
        const style = document.createElement('style');
        style.id = 'typing-dots-style';
        style.textContent = `
            .typing-dots {
                display: inline-block;
                font-size: 1.2em;
                letter-spacing: 0.2em;
            }
            .typing-dots span {
                display: inline-block;
                animation: typing-bounce 1.4s infinite ease-in-out;
                opacity: 0.3;
            }
            .typing-dots span:nth-child(1) {
                animation-delay: -0.32s;
            }
            .typing-dots span:nth-child(2) {
                animation-delay: -0.16s;
            }
            @keyframes typing-bounce {
                0%, 80%, 100% {
                    transform: scale(0.8);
                    opacity: 0.3;
                }
                40% {
                    transform: scale(1);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Start the status updates after a brief pause
    let statusInterval;
    setTimeout(() => {
        statusInterval = startStatusUpdates(typingId);
    }, 500);
    
    try {
        console.log('Calling Tom Cassidy coaching API...');
        const requestStartTime = Date.now();
        
        // Call our Tom Cassidy coaching API
        // Get conversation history from chat messages
        const conversationHistory = [];
        const allMessages = chatMessages.querySelectorAll('.message');
        
        allMessages.forEach(msg => {
            const role = msg.classList.contains('user') ? 'user' : 'assistant';
            const content = msg.textContent.trim();
            // Skip coach names and system messages
            const coachName = msg.querySelector('div[style*="text-transform: uppercase"]');
            const actualContent = coachName ? 
                content.substring(coachName.textContent.length).trim() : 
                content;
            
            if (actualContent && !msg.classList.contains('system')) {
                conversationHistory.push({
                    role: role,
                    content: actualContent
                });
            }
        });
        
        console.log('Sending conversation history:', conversationHistory.length, 'messages');
        
        const response = await fetch(TOM_COACHING_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                use_fallback: false,
                coach: selectedCoach,
                conversation_history: conversationHistory,
                assessmentContext: assessmentContext,
                isHandoffSession: assessmentContext !== null
            })
        });
        
        const data = await response.json();
        clearInterval(statusInterval);
        document.getElementById(typingId).remove();
        
        if (data.content && data.content[0]) {
            // Show which coaching method was used
            console.log('Coaching response from:', data.source);
            
            // Track response received with timing for enterprise metrics
            const responseTime = Date.now() - requestStartTime;
            trackMessageReceived(responseTime);
            
            addMessage('assistant', data.content[0].text, true); // Enable typing animation
        } else {
            throw new Error('No response content');
        }
        
    } catch (error) {
        console.log('API call failed, using intelligent fallback response...');
        clearInterval(statusInterval);
        const typingElement = document.getElementById(typingId);
        if (typingElement) {
            typingElement.remove();
        }
        
        // Tom Cassidy's specific coaching responses
        const response = getTomResponse(message);
        setTimeout(() => {
            // Track fallback response (no timing data available)
            trackMessageReceived();
            addMessage('assistant', response, true); // Enable typing animation for fallback too
        }, 500 + Math.random() * 1000);
    }
}

// ================================
// Fallback Response System
// ================================

// Natural coaching responses - mix of insights, questions, frameworks
function getTomResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // MASSIVE variety to prevent AI patterns
    const responses = {
        gateway: [
            "The two gateway questions: 'What WOULD I choose?' and 'What am I putting in?' If you're doing what you'd choose, it's you. If not, it's your Script.",
            "Interesting... Those are the foundation of everything. 'What WOULD I choose?' reveals when your Script is running instead of you.",
            "Right... Well, I wonder if that means you're ready to see the difference between you and your Script.",
            "Hmm, those are simple and powerful. If what you're doing isn't what you'd choose, that's not you.",
            "Ah, the gateway tools. Look, if you're doing what you'd consciously choose, it's you. If not...",
            "You know what? Those questions are absolutely brilliant.",
            "Actually, let me think about that... Right, those are utterly fundamental.",
            "Hold on - if you're not doing what you'd choose, that's your Script running the show.",
            "Blimey, those two questions... They're like nowhere to run, nowhere to hide.",
            "So here's the thing - your Script vs you. What would you actually choose?"
        ],
        stress: [
            "That stress response is your Script, not you. What would you actually choose to feel?",
            "I hear you... I'm wondering if that stress is your Script trying to protect you from something.",
            "Yeah, that makes complete sense. The Script always kicks in during pressure.",
            "Well, I wonder if that means there's an old pattern running there.",
            "Good Lord, that sounds tough. But here's the thing - if stress isn't what you'd choose...",
            "Actually, hold on... What would you choose to feel instead?",
            "You know, I can't help but wonder if that's an inherited response.",
            "Right, so the Script's trying to keep you safe, but...",
            "Crikey, that automatic stress thing. What would the real you prefer?",
            "Let me think... If you could pause before that stress hits..."
        ],
        patterns: [
            "That stuckness is your Script protecting something. What would the real you choose?",
            "Classic Script behavior. You're not stuck - your old programming is just running.",
            "I wonder if that pattern is connected to something deeper.",
            "You're already doing the work by noticing this pattern.",
            "Ah, patterns... So what strikes me is how automatic that feels.",
            "You know what's fascinating? That's not you - that's inherited.",
            "Something tells me there's more going on there.",
            "My sense is your Script learned that response somewhere.",
            "Actually, what happens if you just... notice it without fighting it?",
            "The truth is, most people never even see their patterns running."
        ],
        relationships: [
            "Relationships reveal our Scripts faster than anything else.",
            "Hmm, interesting... I wonder if that's your Script responding, not you.",
            "OK, that's fascinating... You're noticing something important about how you show up.",
            "Well, I wonder if that means there's an old pattern running in relationships."
        ],
        work: [
            "Work triggers old Scripts, doesn't it? What would you choose to feel there?",
            "Interesting... That's a classic workplace Script. What would authentic you do?",
            "Hmm, I'm wondering if your Script learned that response somewhere.",
            "OK, that makes me curious about what the real you would prefer there."
        ],
        assessment: [
            "The assessment at /game/ shows the gap between your conscious values and unconscious behaviors.",
            "It reveals patterns you might not have noticed otherwise. Fascinating stuff.",
            "That's exactly what THRIVE is designed to uncover - the Scripts running your life."
        ],
        coaching: [
            "Coaching is about transforming Scripts into conscious choices.",
            "Once you're aware of patterns, you can choose differently. Check /coaching/ for programs.",
            "The real work happens when you start choosing instead of reacting."
        ],
        decisions: [
            "The Waiting Game cuts through mental noise. Allocate 100 points based on gut feeling.",
            "Your gut already knows. The thinking mind just argues with it.",
            "Decision confusion is usually Script vs. authentic self. What does your gut say?"
        ],
        vision: [
            "Your vision needs to be RED: Repetition, Emotion, Detail. Your brain finds what you focus on.",
            "Most people's visions are too vague. Get incredibly specific.",
            "You're already programming your mind - this just makes it conscious."
        ]
    };
    
    // Function to get random response from category
    function getResponse(category) {
        const options = responses[category];
        return options[Math.floor(Math.random() * options.length)];
    }
    
    // Gateway tools - highest priority
    if (lowerMessage.includes('gateway') || lowerMessage.includes('foundation') || lowerMessage.includes('essential')) {
        return getResponse('gateway');
    }
    
    // Stress/overwhelm responses
    if (lowerMessage.includes('stress') || lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
        return getResponse('stress');
    }
    
    // Pattern/stuckness responses
    if (lowerMessage.includes('stuck') || lowerMessage.includes('pattern') || lowerMessage.includes('habit')) {
        return getResponse('patterns');
    }
    
    // Relationship responses
    if (lowerMessage.includes('relationship') || lowerMessage.includes('partner') || lowerMessage.includes('family')) {
        return getResponse('relationships');
    }
    
    // Work responses
    if (lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
        return getResponse('work');
    }
    
    // Assessment responses
    if (lowerMessage.includes('assessment') || lowerMessage.includes('test') || lowerMessage.includes('game')) {
        return getResponse('assessment');
    }
    
    // Coaching responses
    if (lowerMessage.includes('coaching') || lowerMessage.includes('program') || lowerMessage.includes('help')) {
        return getResponse('coaching');
    }
    
    // Decision responses
    if (lowerMessage.includes('decision') || lowerMessage.includes('confused') || lowerMessage.includes('choice')) {
        return getResponse('decisions');
    }
    
    // Vision/goal responses
    if (lowerMessage.includes('vision') || lowerMessage.includes('goal') || lowerMessage.includes('clarity')) {
        return getResponse('vision');
    }
    
    // Shorter, punchier responses to avoid character limits
    const defaults = [
        "That's your Script. What would you choose?",
        "Old pattern running there.",
        "Gateway questions: What WOULD I choose? What am I putting in?",
        "You're noticing - that's the work.",
        "Something deeper going on.",
        "Classic Script. What would real you prefer?",
        "Script running, not you.",
        "Sounds inherited to me.",
        "What would you consciously choose?",
        "There's more to this.",
        "That's not the real you.",
        "Automatic response kicking in.",
        "Scripts are sneaky.",
        "Makes sense - learned behavior.",
        "If you wouldn't consciously choose that...",
        "What would authentic you do?",
        "Script's trying to protect you.",
        "What does real you want?",
        "That pattern served you once.",
        "Awareness changes everything.",
        "What if that story isn't true now?",
        "Strong Script there.",
        "You're questioning it - that's huge."
    ];
    
    return defaults[Math.floor(Math.random() * defaults.length)];
}

// ================================
// Assessment Context Integration
// ================================

function checkForAssessmentContext() {
    const urlParams = new URLSearchParams(window.location.search);
    const fromAssessment = urlParams.get('fromAssessment');
    const fromResults = urlParams.get('fromResults');
    
    if (fromAssessment === 'true') {
        // Try to get assessment data from multiple sources
        let assessmentContext = localStorage.getItem('thriveAssessmentContext');
        
        // Try backup if primary fails
        if (!assessmentContext) {
            console.log('🔄 Primary storage empty, trying backup...');
            const backup = localStorage.getItem('thriveAssessmentBackup');
            if (backup) {
                const backupData = JSON.parse(backup);
                assessmentContext = JSON.stringify(backupData.coachingData || backupData);
                console.log('✅ Recovered from backup!');
            }
        }
        
        // Try session storage as last resort
        if (!assessmentContext) {
            console.log('🔄 Trying session storage...');
            assessmentContext = sessionStorage.getItem('thriveAssessmentContext');
            if (assessmentContext) {
                console.log('✅ Recovered from session storage!');
            }
        }
        
        if (assessmentContext) {
            try {
                const contextData = JSON.parse(assessmentContext);
                console.log('🎯 Assessment context found:', contextData);
                
                // Create initial coaching message based on context
                const initialMessage = fromResults 
                    ? createResultsExplorationMessage(contextData)
                    : createAssessmentHandoffMessage(contextData);
                
                // Store assessment data globally for the coach to reference
                window.currentAssessmentData = contextData;
                
                // Auto-send the initial message to start the coaching session
                setTimeout(() => {
                    sendMessage(initialMessage, contextData);
                }, 1000);
                
                // DO NOT remove assessment data - keep it for the session
                // localStorage.removeItem('thriveAssessmentContext');
                console.log('📊 Assessment data preserved for coaching session');
                
                // Update the page title to indicate coaching session
                document.querySelector('.hero-title').innerHTML = 'Coaching with <span class="highlight">Tom</span>';
                
                if (fromResults) {
                    document.querySelector('.hero-subtitle').textContent = 'Let\'s dive deep into your behavioral patterns and create action steps';
                } else {
                    document.querySelector('.hero-subtitle').textContent = 'Let\'s explore the patterns we discovered in your assessment';
                }
                
            } catch (error) {
                console.error('Error parsing assessment context:', error);
            }
        }
    }
}

function createAssessmentHandoffMessage(contextData) {
    const questionCount = contextData.questionCount || 0;
    const dominantPatterns = Object.keys(contextData.behavioralSignature || {});
    
    let message = `Hi Tom! I just completed the THRIVE behavioral assessment with ${questionCount} questions. `;
    
    if (dominantPatterns.length > 0) {
        message += `We discovered some interesting patterns around ${dominantPatterns.join(', ')}. `;
    }
    
    message += `I'm curious to explore these patterns with you and understand how they might be playing out in my life. What questions do you have for me based on what the assessment revealed?`;
    
    return message;
}

function createResultsExplorationMessage(contextData) {
    const questionCount = contextData.questionCount || 0;
    const dominantPatterns = Object.keys(contextData.behavioralSignature || {});
    
    // Include OCEAN analysis if available
    let oceanSummary = '';
    if (contextData.oceanAnalysis && contextData.oceanAnalysis.oceanPercentiles) {
        const ocean = contextData.oceanAnalysis.oceanPercentiles;
        oceanSummary = `The assessment generated my dynamic OCEAN profile: Openness (${ocean.O}th percentile), Conscientiousness (${ocean.C}th percentile), Extraversion (${ocean.E}th percentile), Agreeableness (${ocean.A}th percentile), and Emotional Sensitivity (${ocean.N}th percentile). `;
    }
    
    let message = `Hi Tom! I just completed the full THRIVE behavioral assessment (${questionCount} questions) and reviewed my results summary. `;
    
    if (oceanSummary) {
        message += oceanSummary;
    }
    
    if (dominantPatterns.length > 0) {
        message += `The assessment also revealed behavioral patterns around ${dominantPatterns.join(', ')}. `;
    }
    
    message += `I'd love to dive deeper into what these patterns and OCEAN scores mean for my daily life and get your help creating specific action steps for transformation. Can you walk me through my results and help me understand how to apply the Script Framework to optimize my behavioral tendencies?`;
    
    return message;
}

// ================================
// Event Listeners
// ================================

// Coach selection handling
coachCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove active class from all cards
        coachCards.forEach(c => {
            c.classList.remove('active');
            c.style.border = '2px solid transparent';
            c.querySelector('h4').style.color = 'var(--text-white)';
        });
        
        // Add active class to clicked card
        card.classList.add('active');
        card.style.border = '2px solid var(--primary-yellow)';
        card.querySelector('h4').style.color = 'var(--primary-yellow)';
        
        // Update selected coach
        selectedCoach = card.dataset.coach;
        
        // Clear chat and show new welcome message
        chatMessages.innerHTML = '';
        showWelcomeMessage(selectedCoach);
        
        // Save the new chat state
        saveChatHistory();
        
        // Scroll to the chat interface after coach selection
        setTimeout(() => {
            const chatContainer = document.getElementById('chat-container');
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const elementPosition = chatContainer.offsetTop - navbarHeight - 20; // 20px buffer
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }, 100);
    });
});

// Send button
sendButton.addEventListener('click', () => {
    sendMessage(chatInput.value);
});

// Clear chat button
document.getElementById('clear-chat-button').addEventListener('click', () => {
    const hasAssessment = window.currentAssessmentData || localStorage.getItem('thriveAssessmentContext');
    const warningMessage = hasAssessment 
        ? 'Clear this conversation? Your assessment data will be preserved, but the chat will be cleared.'
        : 'Clear this conversation? (This cannot be undone)';
    
    if (confirm(warningMessage)) {
        clearChatHistory();
        updateChatStatus('Chat cleared (assessment data preserved)');
    }
});

// Enter key to send (with mobile considerations)
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent default to avoid issues on mobile
        
        // On mobile, blur input to hide keyboard after sending
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            chatInput.blur();
        }
        
        sendMessage(chatInput.value);
    }
});

// Add swipe down to dismiss keyboard on mobile
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    let touchStartY = 0;
    let touchEndY = 0;
    
    chatMessages.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });
    
    chatMessages.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        
        // Swipe down gesture (more than 50px)
        if (touchStartY < touchEndY - 50) {
            // Check if keyboard is visible by seeing if input is focused
            if (document.activeElement === chatInput) {
                chatInput.blur(); // Hide keyboard
            }
        }
    });
}

// Quick questions
quickQuestions.forEach(button => {
    button.addEventListener('click', () => {
        sendMessage(button.dataset.question);
    });
});

// ================================
// Initialization
// ================================

// Initialize chat on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Tom Cassidy AI Coaching - Version 3.0 - PWA Edition!');
    
    // Register service worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registered'))
            .catch(err => console.log('Service Worker registration failed'));
    }
    
    // Handle PWA install prompt
    let deferredPrompt;
    
    // Check if NOT in PWA mode and on mobile
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (!isStandalone && isMobile) {
        // Show install button immediately for mobile browser users
        setTimeout(() => {
            showMobileBrowserInstallButton();
        }, 2000); // Show after 2 seconds
    }
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        
        // Show subtle install hint immediately on mobile
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            showSubtleInstallHint();
        }
        
        // Show full prompt after meaningful engagement
        const messageCount = document.querySelectorAll('#chat-messages > div').length;
        if (messageCount > 6) { // After a few exchanges
            showInstallPrompt();
        }
    });
    
    function showSubtleInstallHint() {
        // Don't show if already installed or dismissed today
        const dismissed = localStorage.getItem('thrive_install_dismissed');
        if (dismissed && Date.now() - parseInt(dismissed) < 86400000) return; // 24 hours
        
        // For iOS Safari, show manual install instructions instead
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome|CriOS|FxiOS/.test(navigator.userAgent);
        
        if (isIOS && isSafari) {
            showIOSInstallInstructions();
            return;
        }
        
        const hint = document.createElement('div');
        hint.id = 'install-hint';
        hint.innerHTML = `
            <div style="position: fixed; top: 70px; right: 10px; 
                        background: var(--primary-yellow); color: #000; 
                        padding: 8px 12px; border-radius: 20px; z-index: 100;
                        box-shadow: 0 2px 10px rgba(255,215,0,0.3);
                        font-size: 0.85rem; cursor: pointer;
                        animation: subtle-pulse 2s ease-in-out infinite;">
                📱 Install App
            </div>
        `;
        
        // Add subtle pulse animation
        if (!document.getElementById('install-hint-style')) {
            const style = document.createElement('style');
            style.id = 'install-hint-style';
            style.textContent = `
                @keyframes subtle-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
            `;
            document.head.appendChild(style);
        }
        
        hint.addEventListener('click', () => {
            hint.remove();
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('PWA installed from hint');
                    } else {
                        localStorage.setItem('thrive_install_dismissed', Date.now());
                    }
                });
            }
        });
        
        document.body.appendChild(hint);
        
        // Auto-hide after 10 seconds if not clicked
        setTimeout(() => {
            if (document.getElementById('install-hint')) {
                hint.style.opacity = '0.3';
                hint.style.transform = 'scale(0.9)';
            }
        }, 10000);
    }
    
    function showIOSInstallInstructions() {
        const instructions = document.createElement('div');
        instructions.innerHTML = `
            <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; 
                        background: var(--primary-yellow); color: #000; 
                        padding: 15px; border-radius: 10px; z-index: 9999;
                        box-shadow: 0 4px 20px rgba(255,215,0,0.5);">
                <strong>📱 Add to Home Screen</strong><br>
                <small>Tap the Share button <span style="font-size: 1.2em;">⬆️</span> then "Add to Home Screen"</small><br>
                <button onclick="this.parentElement.remove(); localStorage.setItem('thrive_install_dismissed', Date.now())" 
                        style="margin-top: 10px; background: #000; color: var(--primary-yellow); 
                               border: none; padding: 8px 20px; border-radius: 5px;">
                    Got it
                </button>
            </div>
        `;
        document.body.appendChild(instructions);
        
        // Auto-hide after 15 seconds
        setTimeout(() => {
            if (instructions.parentElement) {
                instructions.remove();
                localStorage.setItem('thrive_install_dismissed', Date.now());
            }
        }, 15000);
    }
    
    function showMobileBrowserInstallButton() {
        // Don't show if already dismissed today
        const dismissed = localStorage.getItem('thrive_install_dismissed');
        if (dismissed && Date.now() - parseInt(dismissed) < 86400000) return;
        
        // Don't show if already installed (in PWA mode)
        if (window.matchMedia('(display-mode: standalone)').matches) return;
        
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/i.test(navigator.userAgent);
        
        const button = document.createElement('div');
        button.id = 'mobile-install-button';
        button.innerHTML = `
            <div style="position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); 
                        background: var(--primary-yellow); color: #000; 
                        padding: 12px 24px; border-radius: 25px; z-index: 999;
                        box-shadow: 0 4px 20px rgba(255,215,0,0.4);
                        font-weight: 600; cursor: pointer;
                        animation: bounce 2s ease-in-out infinite;">
                📱 Tap to Install App
            </div>
        `;
        
        // Add bounce animation
        if (!document.getElementById('install-button-style')) {
            const style = document.createElement('style');
            style.id = 'install-button-style';
            style.textContent = `
                @keyframes bounce {
                    0%, 100% { transform: translateX(-50%) translateY(0); }
                    50% { transform: translateX(-50%) translateY(-10px); }
                }
                #mobile-install-button > div:hover {
                    transform: translateX(-50%) scale(1.05);
                    animation: none;
                }
            `;
            document.head.appendChild(style);
        }
        
        button.addEventListener('click', () => {
            button.remove();
            if (isIOS) {
                showIOSInstallInstructions();
            } else if (deferredPrompt) {
                // Android can use the prompt
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('PWA installed');
                    } else {
                        localStorage.setItem('thrive_install_dismissed', Date.now());
                    }
                });
            } else {
                // Fallback instructions
                showIOSInstallInstructions();
            }
        });
        
        document.body.appendChild(button);
        
        // Add close button
        const closeBtn = document.createElement('span');
        closeBtn.innerHTML = '✕';
        closeBtn.style.cssText = `
            position: absolute; top: -8px; right: -8px; 
            background: #000; color: var(--primary-yellow); 
            width: 20px; height: 20px; border-radius: 50%; 
            display: flex; align-items: center; justify-content: center; 
            font-size: 12px; cursor: pointer;
        `;
        closeBtn.onclick = () => {
            button.remove();
            localStorage.setItem('thrive_install_dismissed', Date.now());
        };
        button.firstElementChild.appendChild(closeBtn);
    }
    
    function showInstallPrompt() {
        // Only show on mobile
        if (!/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) return;
        
        // Remove hint if it exists
        const hint = document.getElementById('install-hint');
        if (hint) hint.remove();
        
        const prompt = document.createElement('div');
        prompt.innerHTML = `
            <div style="position: fixed; bottom: 20px; left: 20px; right: 20px; 
                        background: var(--primary-yellow); color: #000; 
                        padding: 15px; border-radius: 10px; z-index: 9999;
                        box-shadow: 0 4px 20px rgba(255,215,0,0.5);">
                <strong>Add THRIVE to Home Screen</strong><br>
                <small>Get the full app experience</small><br>
                <button onclick="installPWA()" style="margin-top: 10px; 
                        background: #000; color: var(--primary-yellow); 
                        border: none; padding: 8px 20px; border-radius: 5px;">
                    Install App
                </button>
                <button onclick="this.parentElement.remove()" style="margin-left: 10px;
                        background: transparent; border: 1px solid #000; 
                        padding: 7px 15px; border-radius: 5px;">
                    Not Now
                </button>
            </div>
        `;
        document.body.appendChild(prompt);
    }
    
    window.installPWA = function() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWA installed');
                }
                deferredPrompt = null;
            });
        }
        document.querySelector('[onclick="installPWA()"]').parentElement.remove();
    };
    
    // Simple mobile optimizations without janky scrolling
    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // Just prevent pinch zoom, nothing else
        document.addEventListener('touchstart', function(event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        });
    }
    
    // PWA navigation handling - keep links within app scope
    if (window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true) {
        // We're running as PWA - intercept all same-origin links
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a');
            if (link && link.href && !link.target) { // Don't interfere with target="_blank"
                const url = new URL(link.href, window.location.origin);
                // If it's a same-origin link, navigate within PWA
                if (url.origin === window.location.origin) {
                    e.preventDefault();
                    // Use location.assign for better PWA navigation
                    window.location.assign(link.href);
                    return false;
                }
                // External links will open in browser naturally
            }
        });
    }
    
    // Try to load saved chat history
    const historyLoaded = loadChatHistory();
    
    // If no history was loaded, show default welcome message
    if (!historyLoaded) {
        showWelcomeMessage(selectedCoach);
        updateSelectedCoachCard();
    } else {
        updateChatStatus('Conversation restored');
        
        // If there's history, scroll to show the last messages
        setTimeout(() => {
            const chatMessages = document.getElementById('chat-messages');
            const lastMessage = chatMessages.lastElementChild;
            if (lastMessage) {
                // Find the last assistant message to position at top
                let targetMessage = lastMessage;
                const messages = chatMessages.children;
                for (let i = messages.length - 1; i >= 0; i--) {
                    if (messages[i].style.marginRight) { // Assistant messages have margin-right
                        targetMessage = messages[i];
                        break;
                    }
                }
                
                // Scroll chat to show last assistant message at top
                chatMessages.scrollTo({
                    top: targetMessage.offsetTop - 10,
                    behavior: 'auto' // Instant, not smooth for initial load
                });
            }
        }, 100);
    }
    
    // Check for assessment context
    checkForAssessmentContext();
});