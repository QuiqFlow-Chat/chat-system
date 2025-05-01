import { InputController } from '../../../atoms/Input/index.js';

export function setupConfirmPasswordValidation(passwordInputController) {
  // Get the confirm password input element from DOM using getElementById
  const confirmPasswordElement = document.getElementById('confirm-password');
  const controller = new InputController(confirmPasswordElement);

  const confirmPasswordField = confirmPasswordElement.closest('[data-confirm-password-field]');
  const errorMessage = confirmPasswordField?.querySelector('.invalid-feedback');

  // If the element is not found, return empty functions
  if (!confirmPasswordElement || !errorMessage || !passwordInputController) {
    return {
      validateConfirmPassword: () => true,
      confirmPasswordInput: null
    };
  }

  // Validation function
  function validateConfirmPassword() {
    const confirmPasswordValue = controller.getValue().trim();
    const passwordValue = passwordInputController.getValue().trim();

    let isValid = true;

    // Check if confirm password is empty
    if (!confirmPasswordValue) {
      showError('Please confirm your password');
      controller.setValid(false);
      isValid = false;
    }
    // Check if passwords match
    else if (confirmPasswordValue !== passwordValue) {
      showError('Passwords do not match');
      controller.setValid(false);
      isValid = false;
    } else {
      showSuccess();
      controller.setValid(true);
    }

    return isValid;
  }

  function showError(message) {
    confirmPasswordField?.classList.add('error');
    if (errorMessage) {
      errorMessage.textContent = message;
      errorMessage.style.display = 'block';
    }
  }

  function showSuccess() {
    confirmPasswordField?.classList.remove('error');
    if (errorMessage) {
      errorMessage.style.display = 'none';
    }
  }

  // Add event listeners for input and blur
  confirmPasswordElement.addEventListener('input', validateConfirmPassword);
  confirmPasswordElement.addEventListener('blur', validateConfirmPassword);
  passwordInputController.input.addEventListener('input', validateConfirmPassword);

  // Cleanup function
  function cleanup() {
    confirmPasswordElement.removeEventListener('input', validateConfirmPassword);
    confirmPasswordElement.removeEventListener('blur', validateConfirmPassword);
    passwordInputController.input.removeEventListener('input', validateConfirmPassword);
  }

  // Return the validation function and input controller
  return {
    validateConfirmPassword,
    controller,
    cleanup
  };
}
