// Email Validation Module
export function setupEmailValidation() {
  const emailInput = document.getElementById('email');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
      validateEmail,
      emailInput
  };
}