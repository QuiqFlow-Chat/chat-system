import { InputController } from '../../../atoms/Input/index.js';

export function setupEmailValidation() {
  const emailElement = document.getElementById('email');
  const controller = new InputController(emailElement);

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailField = emailElement.closest('[data-email-field]');
  const errorElement = emailField?.querySelector('.invalid-feedback');

  controller.on('custom-input', validateEmail);

  function validateEmail() {
    const emailValue = controller.getValue().trim();

    if (!emailValue) {
      showError('Email is required');
      controller.setValid(false);
      return false;
    }

    if (!EMAIL_REGEX.test(emailValue)) {
      showError('Please enter a valid email address');
      controller.setValid(false);
      return false;
    }

    showSuccess();
    controller.setValid(true);
    return true;
  }

  function showError(message) {
    emailField?.classList.add('error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  function showSuccess() {
    emailField?.classList.remove('error');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  return {
    validateEmail,
    controller
  };
}
