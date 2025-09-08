// THRIVE Website Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeNavigation();
    initializeScrollEffects();
    initializeDomainCards();
    fetchCommitHash();
    // initializePreciseBrainPositioning(); // Disabled - using centered CSS approach
    
    // Initialize thought transformation
    setTimeout(() => {
        console.log('🔍 Attempting to initialize thought transformation...');
        initializeThoughtTransformation();
    }, 1000);
});

// Initialize floating particles
function initializeParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    // Create 50 particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize navigation functionality
function initializeNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Create and add backdrop element
    let navBackdrop = document.querySelector('.nav-backdrop');
    if (!navBackdrop) {
        navBackdrop = document.createElement('div');
        navBackdrop.className = 'nav-backdrop';
        document.body.appendChild(navBackdrop);
    }
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navBackdrop.classList.toggle('active');
        });
        
        // Close menu when clicking backdrop
        navBackdrop.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navBackdrop.classList.remove('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navBackdrop.classList.remove('active');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    navBackdrop.classList.remove('active');
                }
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'var(--glass-white-strong)';
        } else {
            navbar.style.background = 'var(--glass-white)';
        }
    });
}

// Initialize scroll effects
function initializeScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.step, .domain-card, .difference, .testimonial');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Stagger animations for groups
    const stepElements = document.querySelectorAll('.step');
    stepElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.2}s`;
    });
    
    const domainElements = document.querySelectorAll('.domain-card');
    domainElements.forEach((el, index) => {
        el.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Initialize domain card interactions
function initializeDomainCards() {
    const domainCards = document.querySelectorAll('.domain-card');
    
    domainCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle pulse animation to icon
            const icon = this.querySelector('.domain-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.domain-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
        
        // Click to navigate
        card.addEventListener('click', function() {
            const link = this.querySelector('.domain-link');
            if (link) {
                window.location.href = link.href;
            }
        });
    });
}

// Utility function for smooth scrolling
function smoothScrollTo(targetPosition, duration = 1000) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    requestAnimationFrame(animation);
}

// Add event listeners for CTA buttons
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button') || e.target.closest('.cta-button')) {
        // Add click animation
        const button = e.target.classList.contains('cta-button') ? e.target : e.target.closest('.cta-button');
        button.style.transform = 'translateY(-2px) scale(0.98)';
        setTimeout(() => {
            button.style.transform = 'translateY(-2px) scale(1)';
        }, 150);
    }
});

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-yellow), var(--primary-yellow-bright));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress on load
addScrollProgress();

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate hero elements in sequence
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroCTA = document.querySelector('.hero-cta');
    const heroVisual = document.querySelector('.hero-visual');
    
    const elements = [heroTitle, heroSubtitle, heroDescription, heroCTA, heroVisual];
    
    elements.forEach((el, index) => {
        if (el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200 + 300);
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        const navBackdrop = document.querySelector('.nav-backdrop');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            if (navBackdrop) navBackdrop.classList.remove('active');
        }
    }
});

// Mobile menu styles are now handled in main.css

// Automatically fetch and display current commit hash
async function fetchCommitHash() {
    const commitDisplay = document.getElementById('commit-display');
    if (!commitDisplay) return;
    
    try {
        // Try GitHub API first
        const response = await fetch('https://api.github.com/repos/thomascassidyzm/thrive-work/commits/main');
        const data = await response.json();
        const shortHash = data.sha.substring(0, 7);
        commitDisplay.textContent = `Commit: ${shortHash}`;
        
        // Also show last commit time for extra info
        const commitDate = new Date(data.commit.author.date);
        const timeAgo = getTimeAgo(commitDate);
        commitDisplay.title = `Last commit: ${timeAgo} - ${data.commit.message.split('\n')[0]}`;
    } catch (error) {
        // Fallback - just show that we tried
        commitDisplay.textContent = 'Commit: Live';
        commitDisplay.title = 'Unable to fetch commit info';
        console.log('Could not fetch commit info:', error);
    }
}

// Helper function to show time ago
function getTimeAgo(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
}

// PRECISE BRAIN POSITIONING - JavaScript measurement for pixel-perfect alignment
function initializePreciseBrainPositioning() {
    // DISABLED: Let CSS handle all positioning
    return;
}

function positionBrainPrecisely() {
    // DISABLED: Let CSS handle positioning instead
    return;
    const brainElement = document.querySelector('.brain-center');
    const textElement = document.querySelector('.brain-brand-name');
    const brainContainer = document.querySelector('.brain-logo-container');
    
    if (!brainElement || !textElement || !brainContainer) return;
    
    // MORE PRECISE METHOD: Create invisible measuring elements for each character
    const text = "THRiVE";
    const computedStyle = getComputedStyle(textElement);
    
    // Create a temporary container to measure individual characters
    const measureDiv = document.createElement('div');
    measureDiv.style.cssText = `
        position: absolute;
        visibility: hidden;
        font-family: ${computedStyle.fontFamily};
        font-size: ${computedStyle.fontSize};
        font-weight: ${computedStyle.fontWeight};
        letter-spacing: ${computedStyle.letterSpacing};
        line-height: ${computedStyle.lineHeight};
        white-space: nowrap;
    `;
    document.body.appendChild(measureDiv);
    
    // Measure up to the 'i' position
    measureDiv.textContent = "THR"; // Everything before 'i'
    const beforeIWidth = measureDiv.offsetWidth;
    
    measureDiv.textContent = "THRi"; // Everything including 'i'
    const includeIWidth = measureDiv.offsetWidth;
    
    const iWidth = includeIWidth - beforeIWidth;
    const iCenterOffset = beforeIWidth + (iWidth / 2);
    
    // Clean up measuring element
    document.body.removeChild(measureDiv);
    
    // Get container and text bounds
    const textBounds = textElement.getBoundingClientRect();
    const containerBounds = brainContainer.getBoundingClientRect();
    
    // Calculate exact 'i' center position
    const iAbsoluteX = textBounds.left + iCenterOffset;
    const iRelativeX = iAbsoluteX - containerBounds.left;
    
    // Position brain so its center (and stem) aligns with 'i' center
    const brainWidth = 280;
    const brainLeft = iRelativeX - (brainWidth / 2);
    
    // Position brain above text with stem connecting to 'i' dot
    const textTop = textBounds.top - containerBounds.top;
    const brainTop = textTop - 280 - 20; // Brain height + gap for stem connection
    
    // Apply positioning
    brainElement.style.left = brainLeft + 'px';
    brainElement.style.top = brainTop + 'px';
    brainElement.style.transform = 'none'; // Remove transform to use exact positioning
    
    // Also update thought waves to center on new brain position
    const thoughtWaves = document.querySelectorAll('.thought-wave');
    thoughtWaves.forEach(wave => {
        wave.style.left = (iRelativeX - 20) + 'px'; // Center on brain
        wave.style.top = (brainTop + 140) + 'px'; // Center of brain
        wave.style.transform = 'none';
    });
    
    console.log(`PRECISE: Brain positioned at left=${brainLeft}px, top=${brainTop}px`);
    console.log(`PRECISE: 'i' center measured at ${iRelativeX}px from container left`);
    console.log(`PRECISE: 'i' width=${iWidth}px, offset from text start=${iCenterOffset}px`);
    
    // Initialize thought word transformation after positioning is done
    setTimeout(initializeThoughtTransformation, 500);
}

// Also initialize on regular page load (not just after brain positioning)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize thought transformations immediately for pages without brain positioning
    setTimeout(() => {
        const thoughtWords = document.querySelectorAll('.thought-word');
        if (thoughtWords.length > 0 && !window.thoughtTransformationStarted) {
            console.log('🧠 Initializing thought transformation from DOMContentLoaded');
            initializeThoughtTransformation();
        }
    }, 1000);
}

// Thought word transformation cycle - negative to positive and back
function initializeThoughtTransformation() {
    const thoughtWords = document.querySelectorAll('.thought-word');
    if (thoughtWords.length === 0) return;
    
    // Prevent double initialization
    if (window.thoughtTransformationStarted) return;
    window.thoughtTransformationStarted = true;
    
    console.log(`🧠 Starting thought transformation cycle for ${thoughtWords.length} words`);
    
    // Start transformation cycle for each word with staggered timing
    thoughtWords.forEach((word, index) => {
        // Each word transforms on its own 10-second cycle, staggered by 1 second
        const delay = index * 1000; // 1 second stagger between words
        
        setTimeout(() => {
            startWordTransformationCycle(word);
        }, delay);
    });
}

function startWordTransformationCycle(wordElement) {
    const negativeWord = wordElement.getAttribute('data-negative');
    const positiveWord = wordElement.getAttribute('data-positive');
    
    console.log(`🔄 Starting cycle for word: ${negativeWord} -> ${positiveWord}`);
    
    function transformCycle() {
        // Start with negative word (0-5 seconds)
        console.log(`📝 Setting negative word: ${negativeWord}`);
        wordElement.textContent = negativeWord;
        wordElement.classList.remove('positive');
        
        // Transform to positive word at 5 seconds
        setTimeout(() => {
            console.log(`✨ Transforming to positive word: ${positiveWord}`);
            wordElement.textContent = positiveWord;
            wordElement.classList.add('positive');
        }, 5000);
        
        // Repeat cycle every 10 seconds
        setTimeout(transformCycle, 10000);
    }
    
    // Start the cycle
    transformCycle();
}