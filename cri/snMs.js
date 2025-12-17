// Add simple shake animation for invalid inputs
function shakeField(field) {
    field.classList.add('shake');
    setTimeout(() => field.classList.remove('shake'), 500);
}

// Simple email format check
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// send message with validation
function sendMessage(e) {
    e.preventDefault();
    const form = e.target;

    const fields = {
        name: form[0],
        email: form[1],
        subject: form[2],
        message: form[3]
    };

    // Validation
    let valid = true;

    Object.values(fields).forEach(field => {
        if (!field.value.trim()) {
            shakeField(field);
            valid = false;
        } else {
            field.classList.add('valid-field');
            setTimeout(() => field.classList.remove('valid-field'), 1000);
        }
    });

    // Email format check
    if (!isValidEmail(fields.email.value)) {
        shakeField(fields.email);
        valid = false;
    }

    if (!valid) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops!',
            text: 'Please fix the highlighted fields before sending.',
            confirmButtonColor: '#ff7a18'
        });
        return;
    }

    // Call your existing sendMessage logic here if valid
    sendEmail(fields, form);
}

// Separate function to send the email (your SweetAlert code)
function sendEmail(fields, form) {
    const data = {
        name: fields.name.value,
        email: fields.email.value,
        subject: fields.subject.value,
        message: fields.message.value
    };

    Swal.fire({
        title: 'Sending your message...',
        html: 'Please wait <b></b>',
        allowOutsideClick: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector('b');
            let dots = 0;
            const interval = setInterval(() => {
                dots = (dots + 1) % 4;
                b.textContent = '.'.repeat(dots);
            }, 500);
            Swal.stopTimer = () => clearInterval(interval);
        }
    });

    fetch('http://localhost:8080/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) throw new Error('Failed to send message');
        return res.text();
    })
    .then(() => {
        Swal.fire({
            icon: 'success',
            title: 'Message Sent Successfully!',
            html: `
                <p>Thank you for contacting <b>MrSolidy</b> 👋</p>
                <p>I’ve received your message and will respond as soon as possible.</p>
            `,
            confirmButtonText: 'Great!',
            confirmButtonColor: '#ff7a18'
        });
        form.reset();
    })
    .catch(() => {
        Swal.fire({
            icon: 'error',
            title: 'Oops! Something went wrong',
            text: 'Your message could not be sent. Please try again later.',
            confirmButtonColor: '#ff7a18'
        });
    });
}
