document.getElementById('navbar-toggler').addEventListener('click', function() {
    const navbar = document.getElementById('collapsibleNavbar');
    navbar.classList.toggle('show');
});

// Alert messages for buttons
document.getElementById('contactBtn').addEventListener('click', function() {
    alert('For more information, contact us at toluchicks001@gmail.com or call 0701225572');
});

document.getElementById('seeMoreBtn').addEventListener('click', function() {
    alert('More diseases coming soon! Stay tuned.');
});

// Form validation
document.getElementById('submitBtn').addEventListener('click', function(event) {
    event.preventDefault();
    const email = document.getElementById('emailInput').value;
    const question = document.getElementById('questionInput').value;

    if (!email || !question) {
        alert('Please provide both your email and a question.');
        return;
    }
    // Submit or process the form data
    alert('Thank you! We have received your question.');
});

// Subscription form submission
document.getElementById('subscribeForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const subscribeEmail = document.getElementById('subscribeEmail').value;

    if (!subscribeEmail) {
        alert('Please enter a valid email address.');
        return;
    }
    alert('Thank you for subscribing!');
});