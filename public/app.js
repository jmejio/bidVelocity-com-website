

const submitBtn = document.getElementById("submitBtn");
const btnSpinner = document.getElementById("btn-spinner");
const btnDescription = document.getElementById("btn-description");

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    if (document.getElementById('honeypot').value) {
        return; // Honeypot check: abort if filled
    }

    submitBtn.disabled = true;
    document.getElementById("btn-spinner").classList.remove("d-none");

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value,
        honeypot: document.getElementById('honeypot').value,
    };

    const url = 'https://script.google.com/macros/s/AKfycbz9RsqQg-PrUmtYhHoQEEz5ej7BcL2J2UZgdLdq9wF4ZFb7ywFS6KnDvHEdwN5pBsZe/exec';

    fetch(url, { 
        method: 'POST',
        mode: 'no-cors', // Necessary due to Apps Script behavior
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(() => {
        // alert('Thank you! Your message has been sent.');
        var form = document.getElementById("contactForm")
        console.log(form)
        form.reset();
        var formElements = form.querySelector(".form-elements")
            if (formElements) {
              formElements.style.display = "none"; // hide form
            }
            var thankYouMessage = form.querySelector(".thankyou_message");
            if (thankYouMessage) {
              thankYouMessage.style.display = "block";
            }
            // When finish processing...
            document.getElementById("btn-spinner").classList.add("d-none");
            document.getElementById("btn-description").innerText = 'Request Received';
    })
    .catch(() => {
        alert('Oops! Something went wrong.');
    });
});


