// Define constants for EmailJS configuration
const EMAILJS_SERVICE_ID = "service_f00gaoq";
const EMAILJS_TEMPLATE_ID = "template_zwvrnty";
const EMAILJS_USER_ID = "b4FSN9vgnS_3HuzsV";

// Function to send email
function sendEmail(e) {
    e.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Show loading indicator
    const submitButton = document.querySelector('#contactForm button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = 'Sending...';
    submitButton.disabled = true;

    // Prepare email parameters
    const templateParams = {
        from_name: name,
        from_email: email,
        subject: subject,
        message: message,
        to_email: 'gc.abdullah.nauman@gmail.com'
    };

    // Send email using EmailJS
    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, e.target, EMAILJS_USER_ID)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            // Show success message
            document.getElementById('contactForm').innerHTML = 
                '<div class="success-message"><h3>Message Sent!</h3>' + 
                '<p>Thank you for contacting us. We\'ll respond shortly.</p></div>';
        })
        .catch(function(error) {
            console.log('FAILED...', error);
            // Show error message
            alert('Failed to send message. Please try again later.');
            // Reset button
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        });
}

// Add event listener to the contact form
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
    }
}); 