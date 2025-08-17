// THRIVE Work - Authentication with Supabase
// OTP-first approach for frictionless onboarding

// Initialize Supabase client
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your instance
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your anon key

// Import Supabase via CDN (add to HTML)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

let supabase;

// Initialize Supabase
function initSupabase() {
    if (typeof window !== 'undefined' && window.supabase) {
        supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // Check for existing session
        checkAuth();
        
        // Listen for auth changes
        supabase.auth.onAuthStateChange((event, session) => {
            handleAuthChange(event, session);
        });
    }
}

// Auth state management
const authState = {
    user: null,
    profile: null,
    company: null
};

// Check current auth status
async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        authState.user = user;
        await loadUserProfile(user.id);
        updateUIForAuthenticatedUser();
    } else {
        updateUIForUnauthenticatedUser();
    }
}

// OTP Sign In/Up (combined flow)
async function signInWithOTP(email, isCompanySignup = false, companyData = null) {
    try {
        // Show loading state
        showLoading('Sending magic link...');
        
        // Store signup intent in localStorage
        if (isCompanySignup && companyData) {
            localStorage.setItem('signupIntent', JSON.stringify({
                type: 'company',
                data: companyData,
                email: email
            }));
        } else {
            localStorage.setItem('signupIntent', JSON.stringify({
                type: 'individual',
                email: email
            }));
        }
        
        // Send OTP
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: window.location.origin + '/auth/callback',
                data: {
                    signup_type: isCompanySignup ? 'company' : 'individual',
                    company_name: companyData?.companyName
                }
            }
        });
        
        if (error) throw error;
        
        // Show success message
        showSuccess(`Check your email (${email}) for the magic link!`);
        
        // Store email for later
        localStorage.setItem('pendingAuthEmail', email);
        
        return { success: true };
        
    } catch (error) {
        console.error('OTP error:', error);
        showError(error.message);
        return { success: false, error: error.message };
    }
}

// Handle auth callback (when user clicks magic link)
async function handleAuthCallback() {
    // Check if we're on the callback page
    if (window.location.pathname === '/auth/callback') {
        showLoading('Signing you in...');
        
        // Get the signup intent
        const signupIntent = JSON.parse(localStorage.getItem('signupIntent') || '{}');
        
        // Wait for Supabase to process the magic link
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
            showError('Invalid or expired link. Please try again.');
            window.location.href = '/';
            return;
        }
        
        if (user) {
            // First time user - create profile
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            
            if (!profile) {
                // New user - create profile
                await createUserProfile(user, signupIntent);
            }
            
            // Handle company signup if needed
            if (signupIntent.type === 'company' && signupIntent.data) {
                await createCompany(user.id, signupIntent.data);
            }
            
            // Clear signup intent
            localStorage.removeItem('signupIntent');
            localStorage.removeItem('pendingAuthEmail');
            
            // Redirect based on user type
            if (signupIntent.type === 'company') {
                window.location.href = '/dashboard/';
            } else {
                // Continue assessment where they left off
                const assessmentState = localStorage.getItem('thriveAssessment');
                if (assessmentState) {
                    window.location.href = '/assessment/';
                } else {
                    window.location.href = '/';
                }
            }
        }
    }
}

// Create user profile
async function createUserProfile(user, signupIntent) {
    const { data, error } = await supabase
        .from('profiles')
        .insert({
            id: user.id,
            email: user.email,
            created_at: new Date().toISOString(),
            user_type: signupIntent.type || 'individual',
            onboarding_completed: false
        });
    
    if (error) {
        console.error('Profile creation error:', error);
    }
    
    return data;
}

// Create company
async function createCompany(userId, companyData) {
    const { data, error } = await supabase
        .from('companies')
        .insert({
            name: companyData.companyName,
            admin_id: userId,
            employee_count: companyData.employeeCount,
            industry: companyData.industry,
            created_at: new Date().toISOString()
        })
        .select()
        .single();
    
    if (!error && data) {
        // Update user profile with company_id
        await supabase
            .from('profiles')
            .update({ company_id: data.id })
            .eq('id', userId);
    }
    
    return data;
}

// Load user profile
async function loadUserProfile(userId) {
    const { data: profile } = await supabase
        .from('profiles')
        .select('*, companies(*)')
        .eq('id', userId)
        .single();
    
    if (profile) {
        authState.profile = profile;
        authState.company = profile.companies;
    }
}

// Sign out
async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (!error) {
        authState.user = null;
        authState.profile = null;
        authState.company = null;
        window.location.href = '/';
    }
}

// Handle auth state changes
function handleAuthChange(event, session) {
    console.log('Auth event:', event);
    
    if (event === 'SIGNED_IN') {
        checkAuth();
    } else if (event === 'SIGNED_OUT') {
        authState.user = null;
        authState.profile = null;
        updateUIForUnauthenticatedUser();
    }
}

// UI Updates
function updateUIForAuthenticatedUser() {
    // Hide sign-in prompts
    document.querySelectorAll('.auth-prompt').forEach(el => {
        el.style.display = 'none';
    });
    
    // Show user menu
    const userMenu = document.getElementById('user-menu');
    if (userMenu && authState.user) {
        userMenu.innerHTML = `
            <span class="user-email">${authState.user.email}</span>
            <button onclick="signOut()" class="sign-out-btn">Sign Out</button>
        `;
        userMenu.style.display = 'flex';
    }
    
    // Show protected content
    document.querySelectorAll('.authenticated-only').forEach(el => {
        el.style.display = 'block';
    });
}

function updateUIForUnauthenticatedUser() {
    // Show sign-in prompts
    document.querySelectorAll('.auth-prompt').forEach(el => {
        el.style.display = 'block';
    });
    
    // Hide user menu
    const userMenu = document.getElementById('user-menu');
    if (userMenu) {
        userMenu.style.display = 'none';
    }
    
    // Hide protected content
    document.querySelectorAll('.authenticated-only').forEach(el => {
        el.style.display = 'none';
    });
}

// Utility functions
function showLoading(message) {
    const loader = document.getElementById('auth-loader');
    if (loader) {
        loader.textContent = message;
        loader.style.display = 'block';
    }
}

function hideLoading() {
    const loader = document.getElementById('auth-loader');
    if (loader) {
        loader.style.display = 'none';
    }
}

function showSuccess(message) {
    hideLoading();
    const successEl = document.getElementById('auth-success');
    if (successEl) {
        successEl.textContent = message;
        successEl.style.display = 'block';
    }
}

function showError(message) {
    hideLoading();
    const errorEl = document.getElementById('auth-error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initSupabase();
    handleAuthCallback();
});