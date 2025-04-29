document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordToggleBtn = document.querySelector('[data-toggle-btn]');
    const submitButton = document.getElementById('submitButton');
    
    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  
    // Track if form has been submitted at least once
    let hasSubmitted = false;
  
    // Toggle password visibility
    passwordToggleBtn.addEventListener('click', function() {
      const icon = this.querySelector('i');
      const isPassword = passwordInput.type === 'password';
      
      passwordInput.type = isPassword ? 'text' : 'password';
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
      
      this.setAttribute('aria-label', 
        isPassword ? 'Hide password' : 'Show password');
    });
  
    // Validate email field
    function validateEmail() {
      const emailValue = emailInput.value.trim();
      const emailField = emailInput.closest('[data-email-field]');
      const errorElement = emailField.querySelector('.invalid-feedback');
      
      if (!emailValue) {
        showError(emailField, errorElement, 'Email is required');
        return false;
      }
      
      if (!emailRegex.test(emailValue)) {
        showError(emailField, errorElement, 'Please enter a valid email address');
        return false;
      }
      
      showSuccess(emailField);
      return true;
    }
  
    // Validate password field
    function validatePassword() {
      const passwordValue = passwordInput.value.trim();
      const passwordField = passwordInput.closest('[data-password-field]');
      const errorElement = passwordField.querySelector('.invalid-feedback');
      
      if (!passwordValue) {
        showError(passwordField, errorElement, 'Password is required');
        return false;
      }
      
      if (passwordValue.length < 8) {
        showError(passwordField, errorElement, 'Password must be at least 8 characters');
        return false;
      }
      
      showSuccess(passwordField);
      return true;
    }
  
    // Show error message
    function showError(field, errorElement, message) {
      field.classList.add('error');
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  
    // Show success state
    function showSuccess(field) {
      field.classList.remove('error');
      const errorElement = field.querySelector('.invalid-feedback');
      errorElement.style.display = 'none';
    }
  
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