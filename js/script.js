// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check for login status
    const username = localStorage.getItem('financeAppUsername');
    
    // Handle user greeting on home page
    if (isHomePage()) {
        displayUserGreeting(username);
    }
    
    // Update navigation menu based on login status
    updateNavigation(username);
    
    // Initialize forms and UI enhancements
    initForms();
    initUIEnhancements();
});

// Check if current page is home page
function isHomePage() {
    return window.location.pathname.endsWith('index.html') || 
           window.location.pathname.endsWith('/');
}

// Display user greeting if logged in
function displayUserGreeting(username) {
    const userGreeting = document.getElementById('userGreeting');
    const usernameSpan = document.getElementById('username');
    
    if (username && userGreeting && usernameSpan) {
        usernameSpan.textContent = username;
        userGreeting.style.display = 'block';
    }
}

// Update navigation menu based on login status
function updateNavigation(username) {
    const loginLink = document.querySelector('.login-btn');
    
    if (username && loginLink) {
        loginLink.textContent = 'Logout';
        loginLink.addEventListener('click', function(e) {
            if (loginLink.textContent === 'Logout') {
                e.preventDefault();
                localStorage.removeItem('financeAppUsername');
                window.location.href = 'index.html';
            }
        });
    }
}

// Initialize form handling
function initForms() {
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (validateForm([
                { id: 'username', value: username, error: 'Username is required' },
                { id: 'password', value: password, error: 'Password is required', 
                  extraCheck: () => password.length < 6 ? 'Password must be at least 6 characters' : null }
            ])) {
                localStorage.setItem('financeAppUsername', username);
                window.location.href = 'index.html';
            }
        });
    }
    
    // Contact form handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (validateForm([
                { id: 'name', value: name, error: 'Name is required' },
                { id: 'email', value: email, error: 'Email is required', 
                  extraCheck: () => !isValidEmail(email) ? 'Please enter a valid email address' : null },
                { id: 'subject', value: subject, error: 'Subject is required' },
                { id: 'message', value: message, error: 'Message is required' }
            ])) {
                contactForm.innerHTML = '<div class="success-message"><h3>Message Sent!</h3>' + 
                                        '<p>Thank you for contacting us. We\'ll respond shortly.</p></div>';
            }
        });
    }
}

// Generic form validation
function validateForm(fields) {
    clearFormErrors();
    let isValid = true;
    
    fields.forEach(field => {
        if (field.value === '') {
            showError(field.id, field.error);
            isValid = false;
        } else if (field.extraCheck) {
            const extraError = field.extraCheck();
            if (extraError) {
                showError(field.id, extraError);
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Check if email is valid
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Display error message for a form field
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.classList.add('invalid');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    }
}

// Clear all form error messages
function clearFormErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.invalid').forEach(field => field.classList.remove('invalid'));
}

// Initialize UI enhancements
function initUIEnhancements() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Form field focus effects
    document.querySelectorAll('input, textarea').forEach(field => {
        field.addEventListener('focus', () => field.parentElement.classList.add('focused'));
        field.addEventListener('blur', () => field.parentElement.classList.remove('focused'));
    });
}

