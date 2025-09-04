// THRIVE Website Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeNavigation();
    initializeScrollEffects();
    initializeDomainCards();
    fetchCommitHash();
    initializePreciseBrainPositioning();
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
    const brainElement = document.querySelector('.brain-center');
    const textElement = document.querySelector('.brain-brand-name');
    const brainContainer = document.querySelector('.brain-logo-container');
    
    if (!brainElement || !textElement || !brainContainer) return;
    
    // Wait for fonts to load and elements to render
    setTimeout(() => {
        positionBrainPrecisely();
    }, 100);
    
    // Also reposition on resize
    window.addEventListener('resize', () => {
        positionBrainPrecisely();
    });
}

function positionBrainPrecisely() {
    const brainElement = document.querySelector('.brain-center');
    const textElement = document.querySelector('.brain-brand-name');
    const brainContainer = document.querySelector('.brain-logo-container');
    
    if (!brainElement || !textElement || !brainContainer) return;
    
    // Get the text bounds
    const textBounds = textElement.getBoundingClientRect();
    const containerBounds = brainContainer.getBoundingClientRect();
    
    // Calculate the position of the 'i' in "THRiVE"
    const text = textElement.textContent || "THRiVE";
    const fontSize = parseFloat(getComputedStyle(textElement).fontSize);
    const letterSpacing = parseFloat(getComputedStyle(textElement).letterSpacing) || 0;
    
    // Approximate width per character (this varies by font but gives us a baseline)
    const charWidth = fontSize * 0.6; // Rough estimate for most fonts
    
    // Position of 'i' (4th character: T-H-R-i)
    const iIndex = 3; // 0-based index
    const iOffsetFromLeft = (iIndex * (charWidth + letterSpacing)) + (charWidth * 0.5);
    
    // Calculate exact pixel position
    const iAbsoluteX = textBounds.left + iOffsetFromLeft;
    const iRelativeX = iAbsoluteX - containerBounds.left;
    
    // Position brain so its center (and stem) aligns with 'i' dot
    const brainWidth = 280;
    const brainLeft = iRelativeX - (brainWidth / 2);
    
    // Position brain above text with stem connecting to 'i' dot
    const textTop = textBounds.top - containerBounds.top;
    const brainTop = textTop - 280 - 10; // Brain height + small gap
    
    // Apply positioning with CSS custom properties for precision
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
    
    console.log(`Brain positioned: left=${brainLeft}px, top=${brainTop}px`);
    console.log(`'i' calculated at: ${iRelativeX}px from container left`);
}