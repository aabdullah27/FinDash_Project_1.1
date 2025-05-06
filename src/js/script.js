document.addEventListener('DOMContentLoaded', () => {
    // --- Authentication Elements ---
    const loginNavLink = document.getElementById('login-nav-link');
    const dashboardNavLink = document.getElementById('dashboard-nav-link');
    const logoutButton = document.getElementById('logout-button');
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    // --- Handle Navigation Display ---
    function updateNavigation() {
        if (loggedInUser) {
            loginNavLink && (loginNavLink.style.display = 'none');
            dashboardNavLink && (dashboardNavLink.style.display = 'inline-block');
            logoutButton && (logoutButton.style.display = 'inline-block');
        } else {
            dashboardNavLink && (dashboardNavLink.style.display = 'none');
            logoutButton && (logoutButton.style.display = 'none');
        }
    }
    
    updateNavigation();

    // --- Setup Logout ---
    logoutButton && logoutButton.addEventListener('click', () => {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'index.html';
    });

    // --- Handle Current Page ---
    const currentPage = window.location.pathname.split('/').pop();

    // --- Login Page Logic ---
    if (currentPage === 'login.html') {
        setupLoginPage();
    }
    
    // --- Dashboard Logic ---
    if (currentPage === 'dashboard.html') {
        setupDashboard();
    }
    
    // --- Update Active Navigation ---
    highlightCurrentPage();
    
    // --- Helper Functions ---
    
    function setupLoginPage() {
        // Get elements
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const loginContainer = document.getElementById('login-form-container');
        const signupContainer = document.getElementById('signup-form-container');
        const showSignup = document.getElementById('show-signup');
        const showLogin = document.getElementById('show-login');
        const loginMessage = document.getElementById('login-message');
        const signupMessage = document.getElementById('signup-message');
        
        // Form toggle buttons
        showSignup && showSignup.addEventListener('click', (e) => {
            e.preventDefault();
            loginContainer.style.display = 'none';
            signupContainer.style.display = 'block';
            loginMessage.textContent = '';
        });
        
        showLogin && showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            loginContainer.style.display = 'block';
            signupContainer.style.display = 'none';
            signupMessage.textContent = '';
        });
        
        // Signup form
        signupForm && signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('signup-username').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const password = document.getElementById('signup-password').value;
            
            // Validate
            if (!username || !email || !password) {
                showMessage(signupMessage, 'Please fill in all fields.', 'error');
                return;
            }
            
            if (localStorage.getItem(username)) {
                showMessage(signupMessage, 'Username already exists.', 'error');
                return;
            }
            
            // Save user
            localStorage.setItem(username, JSON.stringify({ email, password }));
            showMessage(signupMessage, 'Account created! You can now log in.', 'success');
            signupForm.reset();
            
            // Switch to login
            setTimeout(() => {
                loginContainer.style.display = 'block';
                signupContainer.style.display = 'none';
            }, 1500);
        });
        
        // Login form
        loginForm && loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('login-username').value.trim();
            const password = document.getElementById('login-password').value;
            
            // Validate
            if (!username || !password) {
                showMessage(loginMessage, 'Please enter username and password.', 'error');
                return;
            }
            
            // Check user
            const userData = localStorage.getItem(username);
            if (!userData) {
                showMessage(loginMessage, 'Username not found.', 'error');
                return;
            }
            
            // Verify password
            const user = JSON.parse(userData);
            if (user.password === password) {
                sessionStorage.setItem('loggedInUser', username);
                showMessage(loginMessage, 'Login successful!', 'success');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                showMessage(loginMessage, 'Incorrect password.', 'error');
            }
        });
    }
    
    function setupDashboard() {
        const content = document.getElementById('dashboard-content');
        const authMessage = document.getElementById('auth-message');
        const usernameSpan = document.getElementById('dashboard-username');
        
        if (loggedInUser) {
            content && (content.style.display = 'block');
            authMessage && (authMessage.style.display = 'none');
            usernameSpan && (usernameSpan.textContent = loggedInUser);
        } else {
            content && (content.style.display = 'none');
            authMessage && (authMessage.style.display = 'flex');
        }
    }
    
    function highlightCurrentPage() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            
            // Check if link matches current page
            if (link.href.includes(currentPage)) {
                link.classList.add('active');
            }
            
            // Special case for home page
            if ((currentPage === '' || currentPage === 'index.html') && 
                link.href.includes('index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    function showMessage(element, message, type) {
        element.textContent = message;
        element.className = `form-message ${type}`;
    }
});