document.addEventListener('DOMContentLoaded', function() {
    console.log('HomeHaven is ready!');

    // Booking form submission handler
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Collect form data
            const formData = new FormData(bookingForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const checkIn = formData.get('check-in');
            const checkOut = formData.get('check-out');
            const guests = formData.get('guests');
            const listing = formData.get('listing');

            // Validate form data
            if (!name || !email || !checkIn || !checkOut || !guests || !listing) {
                alert('Please fill out all fields.');
                return;
            }

            if (!validateEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            if (new Date(checkIn) >= new Date(checkOut)) {
                alert('Check-out date must be after check-in date.');
                return;
            }

            if (guests <= 0) {
                alert('Please enter a valid number of guests.');
                return;
            }

            // Create a booking object
            const booking = {
                name: name,
                email: email,
                checkIn: checkIn,
                checkOut: checkOut,
                guests: guests,
                listing: listing
            };

            // Store booking in local storage
            let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
            bookings.push(booking);
            localStorage.setItem('bookings', JSON.stringify(bookings));

            // Display confirmation message
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.textContent = `Booking Confirmed! Name: ${name}, Email: ${email}, Check-in: ${checkIn}, Check-out: ${checkOut}, Guests: ${guests}, Listing: ${listing}`;
                successMessage.style.display = 'block';
            }

            // Clear the form
            bookingForm.reset();
        });
    }
});

// Helper function to validate email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
