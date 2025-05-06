import { setupFullNameValidation } from '../../molecules/FormField/FullNameField/index.js';
import { setupEmailValidation } from '../../molecules/FormField/EmailField/index.js';
import { setupPasswordValidation } from '../../molecules/FormField/PasswordField/index.js';
import { setupConfirmPasswordValidation } from '../../molecules/FormField/ConfirmPasswordField/index.js';

document.addEventListener('DOMContentLoaded', function () {
  const page = document.createElement('div');
  page.className = 'register-page';
  page.id = 'signUp';

  page.innerHTML = `
    <img class="primary-logo" width="461" height="90" src="https://quiqflow.com/wp-content/uploads/2024/01/logo.png" alt="quiqflow-logo">

    <div class="register-container">
      <header class="register-header">
        <h1 class="register-title">Sign Up</h1>
      </header>

      <form id="registerForm" novalidate>
        <div class="form-group" data-fullname-field>
          <label for="fullName" class="label">Full Name</label>
          <input type="text" id="fullName" class="input auth-input" placeholder="Enter your full name" required>
          <p class="invalid-feedback">Please enter a valid name</p>
        </div>

        <div class="form-group" data-email-field>
          <label for="email" class="label">Email</label>
          <input type="email" id="email" class="input auth-input" placeholder="Enter your email" required>
          <p class="invalid-feedback">Please enter a valid email address</p>
        </div>

        <div class="form-group" data-password-field>
          <label for="password" class="label">Password</label>
          <div class="password-wrapper">
            <input type="password" id="password" class="input auth-input" placeholder="Enter your password" required minlength="8">
            <button type="button" class="password-toggle" aria-label="Toggle password visibility" data-toggle-btn>
              <i class="fa-regular fa-eye-slash"></i>
            </button>
          </div>
          <p class="invalid-feedback">Password must be at least 8 characters</p>
        </div>

        <div class="form-group" data-confirm-password-field>
          <label for="confirm-password" class="label">Confirm Password</label>
          <div class="password-wrapper">
            <input type="password" id="confirm-password" class="input auth-input" placeholder="Re-enter your password" required minlength="8">
          </div>
          <p class="invalid-feedback">Passwords do not match</p>
          <p class="password-hint password-sign-up-hint">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
        </div>

        <div class="button-container">
          <button type="submit" class="button button-primary" id="submitButton">Sign Up</button>
        </div>

        <p class="register-subtext">
          Already have an account? <a href="#" class="register-link">Log in</a>
        </p>
      </form>
    </div>
  `;

  document.body.appendChild(page);

  // جلب عناصر النموذج
  const registerForm = document.getElementById('registerForm');
  const submitButton = document.getElementById('submitButton');

  // إعداد التحقق
  const { validateFullName, fullNameInput } = setupFullNameValidation();
  const { validateEmail, emailInput } = setupEmailValidation();
  const { validatePassword, passwordInput } = setupPasswordValidation();
  const { validateConfirmPassword, confirmPasswordInput } = setupConfirmPasswordValidation(passwordInput);

  let hasSubmitted = false;

  function activateRealTimeValidation() {
    if (!hasSubmitted) {
      fullNameInput?.addEventListener('input', validateFullName);
      fullNameInput?.addEventListener('blur', validateFullName);
      emailInput?.addEventListener('input', validateEmail);
      emailInput?.addEventListener('blur', validateEmail);
      passwordInput?.addEventListener('input', validatePassword);
      passwordInput?.addEventListener('blur', validatePassword);
      confirmPasswordInput?.addEventListener('input', validateConfirmPassword);
      confirmPasswordInput?.addEventListener('blur', validateConfirmPassword);
      hasSubmitted = true;
    }
  }

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // مسح الأخطاء السابقة
    document.querySelectorAll('.invalid-feedback').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // التحقق من صحة الحقول
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isFullNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      submitButton.disabled = true;
      submitButton.textContent = 'Signing up...';

      setTimeout(() => {
        alert('Registration successful! (Demo)');
        submitButton.disabled = false;
        submitButton.textContent = 'Sign Up';
        registerForm.reset();
      }, 1500);
    } else {
      activateRealTimeValidation();
    }
  });
});
