    // Simple form validation and password toggle
    document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    const submitButton = document.getElementById('submitbutton');

    // Toggle password visibility
    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('svg').style.stroke = type === 'password' ? 'currentColor' : 'var(--quiqflow-color-primary)';
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate form
        let isValid = true;
        const email = document.getElementById('email');
        const password = document.getElementById('password');

        if (!email.value || !email.validity.valid) {
            email.classList.add('is-invalid');
            isValid = false;
        } else {
            email.classList.remove('is-invalid');
        }

        if (!password.value || password.value.length < 8) {
            password.classList.add('is-invalid');
            isValid = false;
        } else {
            password.classList.remove('is-invalid');
        }

        if (isValid) {
            // Simulate form submission
            submitButton.disabled = true;
            submitButton.classList.add('button-loading');
            
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.classList.remove('button-loading');
                alert('Login successful!');
            }, 1500);
        }
    });

    // Password strength indicator (simplified)
    passwordInput.addEventListener('input', function() {
        const strengthBars = document.querySelectorAll('.strength-bar');
        const strength = Math.min(4, Math.floor(this.value.length / 2));
        
        strengthBars.forEach((bar, index) => {
            bar.classList.toggle('active', index < strength);
        });
    });
});