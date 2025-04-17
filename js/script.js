document.addEventListener('DOMContentLoaded', () => {

    // --- Global Elements ---
    const loginNavLink = document.getElementById('login-nav-link');
    const dashboardNavLink = document.getElementById('dashboard-nav-link');
    const logoutButton = document.getElementById('logout-button');

    // --- Check Login Status on Load ---
    const loggedInUser = sessionStorage.getItem('loggedInUser'); // Use sessionStorage

    if (loggedInUser) {
        if (loginNavLink) loginNavLink.style.display = 'none';
        if (dashboardNavLink) dashboardNavLink.style.display = 'inline-block'; // Show dashboard link
        if (logoutButton) logoutButton.style.display = 'inline-block'; // Show logout button
    } else {
        // Ensure dashboard/logout are hidden if not logged in
        if (dashboardNavLink) dashboardNavLink.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'none';
    }

    // --- Logout Functionality ---
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('loggedInUser'); // Clear session storage
            // Optionally clear relevant local storage if needed, but usually not for logout
            window.location.href = 'index.html'; // Redirect to home
        });
    }


    // --- Page Specific Logic ---
    const currentPage = window.location.pathname.split('/').pop(); // Get the current HTML file name

    // --- Login/Sign Up Page Logic ---
    if (currentPage === 'login.html') {
        const loginFormContainer = document.getElementById('login-form-container');
        const signupFormContainer = document.getElementById('signup-form-container');
        const showSignupLink = document.getElementById('show-signup');
        const showLoginLink = document.getElementById('show-login');

        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const loginMessage = document.getElementById('login-message');
        const signupMessage = document.getElementById('signup-message');

        // Toggle between Login and Sign Up forms
        if (showSignupLink) {
            showSignupLink.addEventListener('click', (e) => {
                e.preventDefault();
                loginFormContainer.style.display = 'none';
                signupFormContainer.style.display = 'block';
                loginMessage.textContent = ''; // Clear messages
                signupMessage.textContent = '';
            });
        }
         if (showLoginLink) {
            showLoginLink.addEventListener('click', (e) => {
                e.preventDefault();
                loginFormContainer.style.display = 'block';
                signupFormContainer.style.display = 'none';
                 loginMessage.textContent = ''; // Clear messages
                 signupMessage.textContent = '';
            });
        }

        // Sign Up Form Submission
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Prevent actual form submission
                const username = document.getElementById('signup-username').value.trim();
                const email = document.getElementById('signup-email').value.trim();
                const password = document.getElementById('signup-password').value;

                signupMessage.textContent = ''; // Clear previous messages
                signupMessage.classList.remove('success', 'error');

                if (!username || !email || !password) {
                    signupMessage.textContent = 'Please fill in all fields.';
                    signupMessage.classList.add('error');
                    return;
                }
                 if (password.length < 6) {
                    signupMessage.textContent = 'Password must be at least 6 characters long.';
                    signupMessage.classList.add('error');
                    return;
                }

                // Check if username already exists in Local Storage
                if (localStorage.getItem(username)) {
                    signupMessage.textContent = 'Username already exists. Please choose another.';
                    signupMessage.classList.add('error');
                } else {
                    // Store user data (username as key, object with email/password as value)
                    const userData = { email: email, password: password }; // In a real app, hash the password!
                    localStorage.setItem(username, JSON.stringify(userData));

                    signupMessage.textContent = 'Sign up successful! You can now log in.';
                    signupMessage.classList.add('success');
                    signupForm.reset(); // Clear the form

                    // Optionally switch to login form after successful signup
                     setTimeout(() => {
                         loginFormContainer.style.display = 'block';
                         signupFormContainer.style.display = 'none';
                         signupMessage.textContent = '';
                     }, 2000); // Switch after 2 seconds
                }
            });
        }

        // Login Form Submission
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const username = document.getElementById('login-username').value.trim();
                const password = document.getElementById('login-password').value;

                loginMessage.textContent = ''; // Clear previous messages
                loginMessage.classList.remove('success', 'error');

                 if (!username || !password) {
                    loginMessage.textContent = 'Please enter username and password.';
                    loginMessage.classList.add('error');
                    return;
                }

                // Retrieve user data from Local Storage
                const storedUserDataString = localStorage.getItem(username);

                if (storedUserDataString) {
                    const storedUserData = JSON.parse(storedUserDataString);
                    // IMPORTANT: Compare plain text passwords - NEVER do this in production! Hash passwords.
                    if (storedUserData.password === password) {
                        loginMessage.textContent = 'Login successful! Redirecting...';
                        loginMessage.classList.add('success');

                        // Set logged-in status using Session Storage
                        sessionStorage.setItem('loggedInUser', username);

                        // Redirect to dashboard after a short delay
                        setTimeout(() => {
                            window.location.href = 'dashboard.html';
                        }, 1000);

                    } else {
                        loginMessage.textContent = 'Incorrect password.';
                        loginMessage.classList.add('error');
                    }
                } else {
                    loginMessage.textContent = 'Username not found.';
                    loginMessage.classList.add('error');
                }
            });
        }
    }

    // --- Dashboard Page Logic ---
    if (currentPage === 'dashboard.html') {
        const dashboardContent = document.getElementById('dashboard-content');
        const authMessage = document.getElementById('auth-message');
        const dashboardUsernameSpan = document.getElementById('dashboard-username');

        if (loggedInUser) {
            // User is logged in, show dashboard content
            if (dashboardContent) dashboardContent.style.display = 'block';
            if (authMessage) authMessage.style.display = 'none';
            if (dashboardUsernameSpan) dashboardUsernameSpan.textContent = loggedInUser; // Display username
            
            // --- Dashboard Animation Control ---
            const fadeElements = document.querySelectorAll('.fade-in');
            if (fadeElements.length > 0) {
                setTimeout(() => {
                    fadeElements.forEach((element, index) => {
                        setTimeout(() => {
                            element.classList.add('visible');
                        }, 100 * index); // Staggered animation
                    });
                }, 300); // Start after page load
            }
            
            // Current date is handled in the dashboard.html script
        } else {
            // User is not logged in, show auth message
            if (dashboardContent) dashboardContent.style.display = 'none';
            if (authMessage) authMessage.style.display = 'flex';
        }
    }


    // --- Active Navigation Link Highlighting ---
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPath = window.location.pathname;

    navLinks.forEach(link => {
        // Normalize paths for comparison (remove trailing slash if present)
        const linkPath = new URL(link.href).pathname;
        const normalizedCurrentPath = currentPath.endsWith('/') ? currentPath.slice(0, -1) : currentPath;
        const normalizedLinkPath = linkPath.endsWith('/') ? linkPath.slice(0, -1) : linkPath;

         // Check if the current page path ends with the link's path segment
         // Handles cases like /folder/index.html matching index.html link
         // Ensure it's not just matching the root "/"
         const linkFileName = normalizedLinkPath.split('/').pop();
         if (linkFileName && normalizedCurrentPath.endsWith(linkFileName)) {
             // Remove active class from all links first
             navLinks.forEach(l => l.classList.remove('active'));
             // Add active class to the matching link
             link.classList.add('active');
         } else if (normalizedLinkPath === '/' && (normalizedCurrentPath === '/' || normalizedCurrentPath.endsWith('/index.html'))) {
             // Special case for root matching index.html or just /
             navLinks.forEach(l => l.classList.remove('active'));
             link.classList.add('active');
         }
         else {
             // Only remove active if it wasn't matched above
             if (!link.classList.contains('active')) {
                link.classList.remove('active');
             }
         }
    });
    // Re-apply active specifically for login/dashboard if they were hidden/shown
    if (loggedInUser) {
        if(dashboardNavLink && currentPath.includes('dashboard.html')) {
             navLinks.forEach(l => l.classList.remove('active')); // Clear others first
             dashboardNavLink.classList.add('active');
        }
        if(loginNavLink) loginNavLink.classList.remove('active');
    } else {
         if(loginNavLink && currentPath.includes('login.html')) {
             navLinks.forEach(l => l.classList.remove('active')); // Clear others first
             loginNavLink.classList.add('active');
         }
         if(dashboardNavLink) dashboardNavLink.classList.remove('active');
    }
    // Ensure Home is active if no other match and on index.html
    const isActiveSet = Array.from(navLinks).some(l => l.classList.contains('active'));
    if (!isActiveSet && (currentPath === '/' || currentPath.endsWith('/index.html'))) {
        const homeLink = document.querySelector('.nav-links a[href="index.html"]');
        if (homeLink) {
            navLinks.forEach(l => l.classList.remove('active')); // Clear others first
            homeLink.classList.add('active');
        }
    }


    // --- Hero Parallax Effect ---
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            // Adjust the '0.3' factor to control the speed of the parallax effect
            hero.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
        });
    }

});