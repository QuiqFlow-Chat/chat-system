import { InputController } from '../../../atoms/Input/index.js';

export function setupPasswordValidation() {
  const passwordElement = document.getElementById('password');
  const toggleBtn = document.querySelector('[data-toggle-btn]');

  if (!passwordElement) {
    return {
      validatePassword: () => true,
      controller: null
    };
  }

  const controller = new InputController(passwordElement);
  const field = passwordElement.closest('[data-password-field]');
  const errorElement = field?.querySelector('.invalid-feedback');


  const MIN_LENGTH_REGEX = /^.{8,}$/; 
  const CONTAINS_LETTER_REGEX = /[A-Za-z]/; 
  const CONTAINS_NUMBER_REGEX = /\d/; 
  const CONTAINS_SPECIAL_CHAR_REGEX = /[@$!%*#?&]/; 

  controller.on('custom-input', validatePassword);

  // Toggle password visibility
  toggleBtn?.addEventListener('click', function () {
    const icon = this.querySelector('i');
    const isPassword = controller.getValue() && controller.input.type === 'password';

    controller.setType(isPassword ? 'text' : 'password');
    icon?.classList.toggle('fa-eye');
    icon?.classList.toggle('fa-eye-slash');

    this.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });

  function validatePassword() {
    const value = controller.getValue().trim();

    hideError();
    controller.setValid(null); // Reset any previous state

    if (!value) {
      showError('Password is required');
      controller.setValid(false);
      return false;
    }

    if (!MIN_LENGTH_REGEX.test(value)) {
      showError('Password must be at least 8 characters long');
      controller.setValid(false);
      return false;
    }

    if (!CONTAINS_LETTER_REGEX.test(value)) {
      showError('Password must contain at least one letter');
      controller.setValid(false);
      return false;
    }

    if (!CONTAINS_NUMBER_REGEX.test(value)) {
      showError('Password must contain at least one number');
      controller.setValid(false);
      return false;
    }

    if (!CONTAINS_SPECIAL_CHAR_REGEX.test(value)) {
      showError('Password must contain at least one special character (@$!%*#?&)');
      controller.setValid(false);
      return false;
    }

    controller.setValid(true);
    return true;
  }

  function showError(message) {
    field?.classList.add('error');
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
  }

  function hideError() {
    field?.classList.remove('error');
    if (errorElement) {
      errorElement.style.display = 'none';
    }
  }

  return {
    validatePassword,
    controller
  };
}
