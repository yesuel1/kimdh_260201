// Supabase Authentication Module

let supabaseClient;

// Initialize Supabase
function initSupabase() {
    const { createClient } = window.supabase;
    return createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
}

// Show auth modal
function showAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('show');
}

// Hide auth modal
function hideAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.remove('show');
    clearAuthMessage();
}

// Show auth message
function showAuthMessage(message, isError = false) {
    const messageEl = document.getElementById('auth-message');
    messageEl.textContent = message;
    messageEl.className = isError ? 'error' : 'success';
}

// Clear auth message
function clearAuthMessage() {
    const messageEl = document.getElementById('auth-message');
    messageEl.textContent = '';
    messageEl.className = '';
}

// Update UI based on auth state
function updateAuthUI(user) {
    const authPrompt = document.getElementById('auth-prompt');
    const lottoContent = document.getElementById('lotto-content');
    const userInfo = document.getElementById('user-info');
    const userEmail = document.getElementById('user-email');

    if (user) {
        authPrompt.style.display = 'none';
        lottoContent.style.display = 'block';
        userInfo.style.display = 'flex';
        userEmail.textContent = user.email;
    } else {
        authPrompt.style.display = 'block';
        lottoContent.style.display = 'none';
        userInfo.style.display = 'none';
    }
}

// Sign up function
async function signUp(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password
        });

        if (error) throw error;

        showAuthMessage('Account created! Please check your email to verify your account.');
        setTimeout(() => {
            hideAuthModal();
        }, 2000);
    } catch (error) {
        showAuthMessage(error.message, true);
    }
}

// Sign in function
async function signIn(email, password) {
    try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) throw error;

        showAuthMessage('Sign in successful!');
        setTimeout(() => {
            hideAuthModal();
        }, 1000);
    } catch (error) {
        showAuthMessage(error.message, true);
    }
}

// Sign out function
async function signOut() {
    try {
        const { error } = await supabaseClient.auth.signOut();
        if (error) throw error;
    } catch (error) {
        console.error('Error signing out:', error.message);
    }
}

// Initialize auth
async function initAuth() {
    supabaseClient = initSupabase();

    // Check current session
    const { data: { session } } = await supabaseClient.auth.getSession();
    updateAuthUI(session?.user);

    // Listen for auth changes
    supabaseClient.auth.onAuthStateChange((event, session) => {
        updateAuthUI(session?.user);
    });

    // Modal close button
    document.querySelector('.close').addEventListener('click', hideAuthModal);

    // Close modal on outside click
    document.getElementById('auth-modal').addEventListener('click', (e) => {
        if (e.target.id === 'auth-modal') {
            hideAuthModal();
        }
    });

    // Show modal links
    document.getElementById('signin-link').addEventListener('click', (e) => {
        e.preventDefault();
        showAuthModal();
    });

    // Toggle between sign in and sign up forms
    document.getElementById('show-signup').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('signin-form').style.display = 'none';
        document.getElementById('signup-form').style.display = 'block';
        document.getElementById('auth-title').textContent = 'Sign Up';
        clearAuthMessage();
    });

    document.getElementById('show-signin').addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('signup-form').style.display = 'none';
        document.getElementById('signin-form').style.display = 'block';
        document.getElementById('auth-title').textContent = 'Sign In';
        clearAuthMessage();
    });

    // Sign in form submit
    document.getElementById('signin-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;
        await signIn(email, password);
    });

    // Sign up form submit
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;

        if (password !== confirm) {
            showAuthMessage('Passwords do not match!', true);
            return;
        }

        await signUp(email, password);
    });

    // Sign out button
    document.getElementById('signout-btn').addEventListener('click', async () => {
        await signOut();
    });
}
