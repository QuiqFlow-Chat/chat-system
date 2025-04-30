import { InputController } from '../../../atoms/Input/index.js';

export function setupEmailValidation() {
  const emailElement = document.getElementById('email');
  const controller = new InputController(emailElement);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateEmail() {
    const emailValue = controller.getValue().trim();
    const emailField = emailElement.closest('[data-email-field]');
    const errorElement = emailField.querySelector('.invalid-feedback');

    if (!emailValue) {
      showError(emailField, errorElement, 'Email is required');
      controller.setValid(false);
      return false;
    }

    if (!emailRegex.test(emailValue)) {
      showError(emailField, errorElement, 'Please enter a valid email address');
      controller.setValid(false);
      return false;
    }

    showSuccess(emailField);
    controller.setValid(true);
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
    controller 
  };
}
