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

### ANOTHER EXPLANATION:

1.  **`document.addEventListener('DOMContentLoaded', () => { ... });`**
    *   **`document`**: Represents the entire HTML document loaded in the browser tab.
    *   **`addEventListener`**: This is a standard way to tell the browser: "Hey, when a specific *event* happens on this *element* (here, the `document`), please run this *function*."
    *   **`'DOMContentLoaded'`**: This is the specific *event* we're listening for. It fires when the initial HTML document has been completely loaded and parsed by the browser. It's important because it means all the HTML elements (like buttons, forms, links with IDs) are ready to be found and manipulated by our JavaScript. We *don't* want to try finding an element (`getElementById`) before it exists in the HTML.
    *   **`() => { ... }`**: This is an arrow function. It's the *function* that will run *after* the `DOMContentLoaded` event occurs. All the code inside these curly braces `{}` will execute once the HTML is ready.

2.  **`// --- Authentication Elements ---`**
    *   This is just a comment to help organize the code.
    *   **`const loginNavLink = document.getElementById('login-nav-link');`**:
        *   `const loginNavLink`: Declares a constant variable named `loginNavLink`. `const` means its value (the reference to the HTML element) cannot be reassigned later.
        *   `document.getElementById('login-nav-link')`: This searches the entire HTML document for an element that has the specific `id="login-nav-link"`. It's assumed there's an HTML tag like `<a id="login-nav-link" href="login.html">Login</a>` somewhere in your HTML. The result (a reference to that HTML element) is stored in the `loginNavLink` variable.
    *   **`const dashboardNavLink = ...`** and **`const logoutButton = ...`**: These do the same thing, finding elements with `id="dashboard-nav-link"` and `id="logout-button"` respectively.
    *   **`const loggedInUser = sessionStorage.getItem('loggedInUser');`**:
        *   **`sessionStorage`**: This is a built-in browser storage mechanism. Data stored in `sessionStorage` lasts only for the duration of the *browser session* (i.e., until the browser tab is closed). It's separate for each tab.
        *   **`getItem('loggedInUser')`**: This tries to retrieve a value from `sessionStorage` that was previously stored with the key `'loggedInUser'`.
        *   If a user *is* logged in (we'll see how later), this variable will hold their username (e.g., "Alice").
        *   If no user is logged in, or the tab was just opened, `sessionStorage.getItem('loggedInUser')` will return `null`. JavaScript treats `null` as "falsy" in conditions (like `if` statements).

3.  **`// --- Handle Navigation Display ---`**
    *   **`function updateNavigation() { ... }`**: Defines a reusable function named `updateNavigation`. Its job is to show or hide the Login, Dashboard, and Logout links/buttons based on the login status.
    *   **`if (loggedInUser)`**: Checks if the `loggedInUser` variable has a "truthy" value (meaning, it's not `null`, `undefined`, `0`, `false`, or an empty string). If it holds a username, this condition is true.
        *   **`loginNavLink && (loginNavLink.style.display = 'none');`**:
            *   **`loginNavLink && ...`**: This is a common JavaScript shortcut called "short-circuiting". It first checks if `loginNavLink` actually exists (i.e., if `getElementById` found the element). If `loginNavLink` is `null` (element not found), the rest of the line is skipped, preventing an error.
            *   **`loginNavLink.style.display = 'none'`**: If `loginNavLink` exists, this line sets its CSS `display` property to `'none'`, effectively hiding the Login link from the page.
        *   **`dashboardNavLink && (dashboardNavLink.style.display = 'inline-block');`**: If the Dashboard link exists, show it. (`inline-block` makes it visible and flow like text but allows setting width/height/margins).
        *   **`logoutButton && (logoutButton.style.display = 'inline-block');`**: If the Logout button exists, show it.
    *   **`else { ... }`**: This block runs if `loggedInUser` is "falsy" (i.e., `null` - meaning no one is logged in).
        *   **`dashboardNavLink && (dashboardNavLink.style.display = 'none');`**: Hide the Dashboard link.
        *   **`logoutButton && (logoutButton.style.display = 'none');`**: Hide the Logout button.
        *   *(Note: The Login link is implicitly shown because its default display style in the HTML/CSS is likely not 'none').*
    *   **`updateNavigation();`**: This line *calls* the `updateNavigation` function immediately after defining it, so the navigation visibility is set correctly as soon as the page loads.

4.  **`// --- Setup Logout ---`**
    *   **`logoutButton && logoutButton.addEventListener('click', () => { ... });`**:
        *   Again, the `logoutButton &&` check ensures we only add the listener if the button was found in the HTML.
        *   **`addEventListener('click', ...)`**: Attaches a function to run *only* when the Logout button is clicked.
        *   **`() => { ... }`**: The arrow function that executes on click.
        *   **`sessionStorage.removeItem('loggedInUser');`**: Removes the `'loggedInUser'` item from `sessionStorage`. This effectively logs the user out for this browser tab session.
        *   **`window.location.href = 'index.html';`**: Redirects the browser to the `index.html` page immediately after logging out. `window.location.href` controls the URL the browser is currently displaying.

5.  **`// --- Handle Current Page ---`**
    *   **`const currentPage = window.location.pathname.split('/').pop();`**:
        *   **`window.location.pathname`**: Gets the path part of the current URL (e.g., `/project/login.html` or `/dashboard.html`).
        *   **`.split('/')`**: Splits the path string into an array of strings, using `/` as the separator (e.g., `['', 'project', 'login.html']` or `['', 'dashboard.html']`).
        *   **`.pop()`**: Takes the *last* element from that array. This is usually the filename (e.g., `'login.html'` or `'dashboard.html'`). If the URL is just the root (like `http://example.com/`), `pathname` might be `/` and `pop()` might return an empty string `''`.
        *   This line effectively figures out the name of the HTML file currently being viewed.

6.  **`// --- Login Page Logic ---`**
    *   **`if (currentPage === 'login.html') { setupLoginPage(); }`**: If the current page's filename is exactly `'login.html'`, then call the `setupLoginPage` function (defined below).

7.  **`// --- Dashboard Logic ---`**
    *   **`if (currentPage === 'dashboard.html') { setupDashboard(); }`**: If the current page's filename is exactly `'dashboard.html'`, then call the `setupDashboard` function (defined below).

8.  **`// --- Update Active Navigation ---`**
    *   **`highlightCurrentPage();`**: Calls the `highlightCurrentPage` function (defined below) to visually mark the current page's link in the navigation bar. This runs on *every* page load where this script is included.

9.  **`// --- Helper Functions ---`**
    *   These are functions defined to handle specific tasks, making the main part of the script cleaner.

10. **`function setupLoginPage() { ... }`**: This function contains all the logic specific to the `login.html` page.
    *   **Gets Elements**: Finds all the necessary HTML elements within the login/signup forms using `getElementById`.
    *   **Form Toggle Buttons**:
        *   Adds click listeners to the "Show Signup" and "Show Login" links/buttons.
        *   `e.preventDefault();`: When you click a link (`<a>` tag), the browser's default action is to navigate to the `href`. `preventDefault()` stops this default behaviour, allowing us to handle the click purely with JavaScript (in this case, just showing/hiding form containers).
        *   Changes the `display` style of the `loginContainer` and `signupContainer` divs to show one and hide the other.
        *   Clears any previous messages (`loginMessage.textContent = '';`).
    *   **Signup Form**:
        *   Adds a listener for the `'submit'` event on the signup form.
        *   `e.preventDefault();`: Prevents the default form submission behaviour, which would normally cause a full page reload. We want to handle it with JavaScript instead.
        *   Gets the `value` from the input fields (`username`, `email`, `password`). `.trim()` removes any leading/trailing whitespace from the username and email.
        *   **Validation**:
            *   Checks if any field is empty. If so, calls `showMessage` and stops (`return`).
            *   Checks if the username already exists in `localStorage`.
                *   **`localStorage`**: Another browser storage mechanism. Unlike `sessionStorage`, data in `localStorage` *persists* even after the browser is closed and reopened. It's shared across all tabs/windows from the same origin (website).
                *   **`localStorage.getItem(username)`**: Tries to retrieve data stored with the entered username as the key. If it finds something, the username is taken.
        *   **Save User**:
            *   **`localStorage.setItem(username, JSON.stringify({ email, password }));`**:
                *   `setItem(key, value)`: Stores data in `localStorage`.
                *   `username`: The key under which the user data is stored.
                *   `{ email, password }`: Creates a JavaScript object containing the email and password. (This is shorthand for `{ email: email, password: password }`).
                *   **`JSON.stringify(...)`**: `localStorage` can only store *strings*. This converts the JavaScript object into a JSON string format (e.g., `'{"email":"test@example.com","password":"123"}'`) so it can be stored correctly.
            *   Shows a success message using `showMessage`.
            *   `signupForm.reset();`: Clears the input fields of the signup form.
            *   **`setTimeout(() => { ... }, 1500);`**: Waits for 1500 milliseconds (1.5 seconds) and *then* executes the code inside the arrow function, which switches the view back to the login form. This gives the user time to read the success message.
    *   **Login Form**:
        *   Adds a listener for the `'submit'` event on the login form.
        *   `e.preventDefault();`: Prevents the default page reload on submission.
        *   Gets username and password values.
        *   **Validation**: Checks for empty fields.
        *   **Check User**:
            *   `const userData = localStorage.getItem(username);`: Tries to retrieve the stored user data string from `localStorage` using the entered username.
            *   If `!userData` (meaning `localStorage.getItem` returned `null`), the username wasn't found. Show error message.
        *   **Verify Password**:
            *   **`const user = JSON.parse(userData);`**: If `userData` was found (it's a JSON string), `JSON.parse` converts it back into a JavaScript object (e.g., `{ email: '...', password: '...' }`).
            *   `if (user.password === password)`: Compares the `password` property from the retrieved `user` object with the `password` entered in the login form.
            *   **Success**:
                *   **`sessionStorage.setItem('loggedInUser', username);`**: Stores the logged-in `username` in `sessionStorage`. This is the crucial step that marks the user as logged in for this session.
                *   Shows a success message.
                *   **`setTimeout(() => { ... }, 1000);`**: Waits 1 second (1000ms) for the user to see the success message.
                *   **`window.location.href = 'dashboard.html';`**: Redirects the user to the dashboard page.
            *   **Failure**: Shows an "Incorrect password" message.

11. **`function setupDashboard() { ... }`**: This function contains logic specific to the `dashboard.html` page.
    *   Gets references to the main content area (`dashboard-content`), an authentication message placeholder (`auth-message`), and a span to display the username (`dashboard-username`).
    *   **`if (loggedInUser)`**: Checks if the `loggedInUser` variable (retrieved from `sessionStorage` at the start of the script) has a value.
        *   If logged in: Shows the main content (`content.style.display = 'block'`), hides the "please log in" message (`authMessage.style.display = 'none'`), and sets the text content of the `usernameSpan` to the logged-in username.
    *   **`else`**: If not logged in (`loggedInUser` is `null`).
        *   Hides the main content (`content.style.display = 'none'`) and shows the authentication message (`authMessage.style.display = 'flex'`). (`flex` is likely used for styling/centering the message).

12. **`function highlightCurrentPage() { ... }`**: This function styles the navigation links to show which page is currently active.
    *   **`const navLinks = document.querySelectorAll('.nav-links a');`**:
        *   `document.querySelectorAll`: Selects *all* elements in the document that match the CSS selector `.nav-links a`. This likely selects all `<a>` (anchor/link) tags that are descendants of an element with the class `nav-links`. It returns a NodeList (similar to an array) of these elements.
    *   **`navLinks.forEach(link => { ... });`**: Loops through each `link` element found by `querySelectorAll`.
    *   **`link.classList.remove('active');`**: Removes the CSS class `active` from the link, ensuring no links start highlighted incorrectly.
    *   **`if (link.href.includes(currentPage))`**:
        *   `link.href`: Gets the full URL the link points to (e.g., `http://example.com/project/login.html`).
        *   `.includes(currentPage)`: Checks if the link's `href` string contains the `currentPage` filename string (e.g., does `"http://.../login.html"` include `"login.html"`?).
        *   If it matches, `link.classList.add('active');` adds the `active` class to that specific link. CSS rules associated with the `.active` class (defined in your CSS file) would then visually highlight it (e.g., change color, make bold).
    *   **Special Case for Home Page**:
        *   `if ((currentPage === '' || currentPage === 'index.html') && link.href.includes('index.html'))`: This handles the case where the user is on the home page. The `currentPage` might be `''` (if the URL is just `/`) or `'index.html'`. It checks if the current page is one of these *and* the link's `href` specifically points to `index.html`, and adds the `active` class if both are true.

13. **`function showMessage(element, message, type) { ... }`**: A utility function to display messages (like errors or successes) in a designated HTML element.
    *   **`element`**: The HTML element where the message should be displayed (passed in when calling the function, e.g., `loginMessage` or `signupMessage`).
    *   **`message`**: The text content of the message to show.
    *   **`type`**: A string ('error' or 'success') used to set a CSS class for styling.
    *   **`element.textContent = message;`**: Sets the text inside the `element`.
    *   **`element.className = \`form-message ${type}\`;`**: Sets the CSS classes for the `element`. It always gets the `form-message` class, plus either the `error` or `success` class based on the `type` argument. This allows styling errors (e.g., red text) differently from successes (e.g., green text) using CSS rules like `.form-message.error { color: red; }`.
