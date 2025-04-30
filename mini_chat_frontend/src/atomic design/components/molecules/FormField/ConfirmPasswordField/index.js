import { InputController } from '../../../atoms/Input/index.js';

export function setupConfirmPasswordValidation(passwordController) {
  const confirmPasswordElement = document.getElementById('confirm-password');

  if (!confirmPasswordElement) {
    return {
      validateConfirmPassword: () => true,
      controller: null
    };
  }

  const confirmController = new InputController(confirmPasswordElement);
  const confirmPasswordField = confirmPasswordElement.closest('[data-confirm-password-field]');
  const errorElement = confirmPasswordField?.querySelector('.invalid-feedback');

  function validateConfirmPassword() {
    const confirmPasswordValue = confirmController.getValue().trim();
    const passwordValue = passwordController.getValue().trim();

    hideError();

    if (!confirmPasswordValue) {
      showError('Confirm password is required');
      confirmController.setValid(false);
      return false;
    }

    if (confirmPasswordValue !== passwordValue) {
      showError('Passwords do not match');
      confirmController.setValid(false);
      return false;
    }

    confirmController.setValid(true);
    return true;
  }

  function showError(message) {
    confirmPasswordField?.classList.add('error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  function hideError() {
    confirmPasswordField?.classList.remove('error');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  return {
    validateConfirmPassword,
    controller: confirmController
  };
}
