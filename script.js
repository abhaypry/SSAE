document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Navigation ---
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Product Enquiry via WhatsApp ---
    const enquiryButtons = document.querySelectorAll('.enquiry-btn');
    const phoneNumber = '919724484495'; // The business WhatsApp number

    enquiryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productName = button.dataset.productName;
            const productImage = button.dataset.productImage;
            const fullImageUrl = window.location.origin + '/' + productImage;

            const message = encodeURIComponent(`Hello, I would like to enquire about this product:\n\n*Product Name:* ${productName}\n*Product Photo:* ${fullImageUrl}`);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

            window.open(whatsappUrl, '_blank');
        });
    });

    // --- Rating System for Enquiry Form ---
    const ratingContainer = document.getElementById('enquiry-form').querySelector('.rating-stars');
    let userRating = 0;

    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('i');
        star.classList.add('far', 'fa-star');
        star.dataset.rating = i;
        ratingContainer.appendChild(star);
    }

    ratingContainer.addEventListener('mouseover', (event) => {
        const stars = ratingContainer.querySelectorAll('i');
        const hoverRating = event.target.dataset.rating;
        stars.forEach(star => {
            star.classList.remove('fas');
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
        event.preventDefault();
        const name = document.getElementById('feedbackName').value;
        const feedback = document.getElementById('feedbackMessage').value;

        if (name && feedback && userRating > 0) {
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
        event.preventDefault();
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && mobile && email && message) {
            alert(`Message Sent!\n\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nMessage: "${message}"`);
            contactForm.reset();
        } else {
            alert('Please fill out all contact details.');
        }
    });
});
