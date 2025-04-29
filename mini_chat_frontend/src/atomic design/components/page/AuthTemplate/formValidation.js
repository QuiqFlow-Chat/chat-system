import { setupEmailValidation } from '../../molecules/FormField/EmailField/index.js';
import { setupPasswordValidation } from '../../molecules/FormField/PasswordField/index.js';

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const submitButton = document.getElementById('submitButton');
    
    // Setup validation modules
    const { validateEmail, emailInput } = setupEmailValidation();
    const { validatePassword, passwordInput } = setupPasswordValidation();
    
    // Track if form has been submitted at least once
    let hasSubmitted = false;
    
    // Activate real-time validation after first submission
    function activateRealTimeValidation() {
        if (!hasSubmitted) {
            emailInput.addEventListener('input', validateEmail);
            passwordInput.addEventListener('input', validatePassword);
            emailInput.addEventListener('blur', validateEmail);
            passwordInput.addEventListener('blur', validatePassword);
            hasSubmitted = true;
        }
    }
    
    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear any existing errors first
        const errorMessages = document.querySelectorAll('.invalid-feedback');
        errorMessages.forEach(msg => msg.style.display = 'none');
        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach(field => field.classList.remove('error'));
        
        // Validate all fields
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isEmailValid && isPasswordValid) {
            // Form is valid - you can submit data to server here
            submitButton.disabled = true;
            submitButton.textContent = 'Logging in...';
            
            // Simulate API call
            setTimeout(() => {
                alert('Login successful! (This is a demo)');
                submitButton.disabled = false;
                submitButton.textContent = 'Log In';
                loginForm.reset();
            }, 1500);
        } else {
            // Activate real-time validation after first failed submission
            activateRealTimeValidation();
        }
    });
});