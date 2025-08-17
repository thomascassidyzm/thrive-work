// THRIVE Work - Main JavaScript

// Start assessment from homepage
function startAssessment(dimension) {
    window.location.href = `/assessment/?dimension=${dimension}`;
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Update progress indicators if on homepage
    if (window.location.pathname === '/') {
        updateHomepageProgress();
    }
});

// Update homepage progress from saved state
function updateHomepageProgress() {
    const savedState = localStorage.getItem('thriveAssessment');
    if (savedState) {
        const state = JSON.parse(savedState);
        const totalAnswered = Object.keys(state.responses).length;
        
        // Update progress bar
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        if (progressFill) {
            progressFill.style.width = (totalAnswered / 60 * 100) + '%';
        }
        if (progressText) {
            progressText.textContent = `${totalAnswered} of 60 questions completed`;
        }
        
        // Update dimension cards to show completion
        state.completedDimensions.forEach(dim => {
            const card = document.querySelector(`[data-dimension="${dim}"]`);
            if (card) {
                card.classList.add('completed');
                const button = card.querySelector('button');
                if (button) {
                    button.textContent = '✓ Complete';
                    button.classList.add('completed');
                }
            }
        });
    }
}