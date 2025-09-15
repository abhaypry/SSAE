document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation ---
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Adjusting the scroll position to account for the fixed header
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Rating System for Enquiry Form ---
    const ratingContainer = document.querySelector('.rating-stars');
    let userRating = 0;

    // Create 5 star icons
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.classList.add('far', 'fa-star'); // 'far' is for an empty star icon
        star.dataset.rating = i;
        ratingContainer.appendChild(star);
    }

    // Add click and hover events to stars
    ratingContainer.addEventListener('mouseover', (event) => {
        const stars = ratingContainer.querySelectorAll('i');
        const hoverRating = event.target.dataset.rating;
        stars.forEach(star => {
            star.classList.remove('fas'); // 'fas' is for a filled star icon
            if (star.dataset.rating <= hoverRating) {
                star.classList.add('fas');
            }
        });
    });

    ratingContainer.addEventListener('mouseout', () => {
        const stars = ratingContainer.querySelectorAll('i');
        stars.forEach(star => {
            star.classList.remove('fas');
            if (star.dataset.rating <= userRating) {
                star.classList.add('fas');
            }
        });
    });

    ratingContainer.addEventListener('click', (event) => {
        userRating = event.target.dataset.rating;
        const stars = ratingContainer.querySelectorAll('i');
        stars.forEach(star => {
            star.classList.remove('fas');
            if (star.dataset.rating <= userRating) {
                star.classList.add('fas');
            }
        });
    });

    // --- Enquiry Form Submission ---
    const enquiryForm = document.getElementById('enquiry-form');
    enquiryForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents the form from refreshing the page
        const name = document.getElementById('feedbackName').value;
        const feedback = document.getElementById('feedbackMessage').value;

        if (name && feedback && userRating > 0) {
            // For a real website, this is where you would send data to a backend.
            // Here, we'll simulate a successful submission with a message.
            alert(`Thank you for your feedback, ${name}!\nYou rated us ${userRating} stars.\nYour message: "${feedback}"`);
            enquiryForm.reset();
            userRating = 0;
            const stars = ratingContainer.querySelectorAll('i');
            stars.forEach(star => star.classList.remove('fas'));
        } else {
            alert('Please fill out all fields and select a rating.');
        }
    });

    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents the form from refreshing the page
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && mobile && email && message) {
            // Simulate sending the message
            alert(`Message Sent!\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nMessage: "${message}"`);
            contactForm.reset();
        } else {
            alert('Please fill out all contact details.');
        }
    });
});