# FinDash JavaScript Documentation

This document explains the JavaScript code used in the FinDash application. The code structure follows a modular approach with clear separation of concerns.

## Overview

The main JavaScript file (`script.js`) handles several key aspects of the application:

1. User Authentication
2. Navigation Management
3. Login/Signup System
4. Dashboard Access Control
5. UI Feedback

All code is executed when the DOM is fully loaded through the `DOMContentLoaded` event listener.

## Core Components

### Authentication System

The authentication system uses browser storage to maintain user accounts and login state:

- **LocalStorage**: Stores user account information (persists even when browser is closed)
- **SessionStorage**: Maintains the current login session (cleared when browser is closed)

```javascript
// Check if user is logged in
const loggedInUser = sessionStorage.getItem('loggedInUser');

// Log out user
logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
});
```

### Navigation Display

The application shows different navigation options depending on whether a user is logged in:

- When logged in: Shows Dashboard link and Logout button, hides Login link
- When logged out: Shows Login link, hides Dashboard link and Logout button

```javascript
function updateNavigation() {
    if (loggedInUser) {
        loginNavLink.style.display = 'none';
        dashboardNavLink.style.display = 'inline-block';
        logoutButton.style.display = 'inline-block';
    } else {
        dashboardNavLink.style.display = 'none';
        logoutButton.style.display = 'none';
    }
}
```

### Login & Signup System

The login page features two forms: one for returning users to log in and another for new users to sign up.

#### Form Toggling

Users can switch between login and signup forms using links provided:

```javascript
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    signupContainer.style.display = 'block';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'block';
    signupContainer.style.display = 'none';
});
```

#### Sign Up Process

When a new user signs up:

1. Basic validation checks ensure all fields are filled
2. System verifies the username doesn't already exist
3. User data is stored in LocalStorage
4. Success message is displayed
5. Form switches back to login after a delay

```javascript
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value;
    
    // Validate & store user data
    if (!username || !email || !password) {
        // Show error message
        return;
    }
    
    // Store user data
    localStorage.setItem(username, JSON.stringify({ email, password }));
    
    // Show success message & switch to login
    // ...
});
```

#### Login Process

When a user attempts to log in:

1. System validates form input
2. Checks if username exists in LocalStorage
3. Verifies password matches stored credentials
4. Creates session and redirects to dashboard on success
5. Shows error message on failure

```javascript
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get login credentials
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;
    
    // Validate & check credentials
    // ...
    
    if (user.password === password) {
        // Set session and redirect
        sessionStorage.setItem('loggedInUser', username);
        window.location.href = 'dashboard.html';
    } else {
        // Show error message
    }
});
```

### Dashboard Access

The dashboard page implements access control:

```javascript
function setupDashboard() {
    if (loggedInUser) {
        // Show dashboard content to logged-in users
        content.style.display = 'block';
        authMessage.style.display = 'none';
        usernameSpan.textContent = loggedInUser;
    } else {
        // Show auth required message to non-logged-in users
        content.style.display = 'none';
        authMessage.style.display = 'flex';
    }
}
```

### Navigation Highlighting

The script adds the `active` class to the current page's navigation link:

```javascript
function highlightCurrentPage() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        // Remove active class from all links first
        link.classList.remove('active');
        
        // Add active class if link matches current page
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
```

## Code Organization

The code follows a functional organization pattern:

1. **Main Setup**: Element selection and initial state setup
2. **Event Handlers**: Functions that respond to user interactions
3. **Helper Functions**: Reusable functions for common tasks

### Error Handling Patterns

The code uses early returns to handle validation errors:

```javascript
if (!username || !email || !password) {
    showMessage(signupMessage, 'Please fill in all fields.', 'error');
    return;
}
```

### UI Feedback

The application provides feedback through message elements:

```javascript
function showMessage(element, message, type) {
    element.textContent = message;
    element.className = `form-message ${type}`;
}
```

## Security Considerations

This is a front-end only implementation with several security limitations:

1. Passwords are stored in plain text (would need hashing in production)
2. Client-side storage can be tampered with
3. No CSRF or XSS protection is implemented

For a production application, server-side authentication would be required with proper security measures.

## Code Simplification Techniques

The code has been simplified using several techniques:

1. **Shorter conditional checks**: Using `&&` for conditional execution
   ```javascript
   element && (element.style.display = 'block');  // Only runs if element exists
   ```

2. **Function modularity**: Breaking code into focused functions that handle specific tasks

3. **Helper functions**: Creating reusable functions like `showMessage()` to reduce repeated code

4. **Concise property access**: Using modern JavaScript shorthand for object properties
   ```javascript
   localStorage.setItem(username, JSON.stringify({ email, password }));
   