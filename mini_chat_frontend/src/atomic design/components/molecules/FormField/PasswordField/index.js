// Password Validation Module
export function setupPasswordValidation() {
  const passwordInput = document.getElementById('password');
  const passwordToggleBtn = document.querySelector('[data-toggle-btn]');
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

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

  function showError(field, errorElement, message) {
      field.classList.add('error');
      errorElement.textContent = message;
      errorElement.style.display = 'block';
  }

  function showSuccess(field) {
      field.classList.remove('error');
      const errorElement = field.querySelector('.invalid-feedback');
      errorElement.style.display = 'none';
  }

  return {
      validatePassword,
      passwordInput
  };
}