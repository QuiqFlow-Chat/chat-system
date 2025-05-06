import { setupEmailValidation } from '../../molecules/FormField/EmailField/index.js';
import { setupPasswordValidation } from '../../molecules/FormField/PasswordField/index.js';

document.addEventListener('DOMContentLoaded', function () {
 
  const page = document.createElement('div');
  page.className = 'register-page';
  page.id = 'logIn';

  page.innerHTML = `
    <img class="primary-logo" width="461" height="90" src="https://quiqflow.com/wp-content/uploads/2024/01/logo.png" alt="quiqflow-logo">

    <div class="register-container">
      <header class="register-header">
        <h1 class="register-title">Log In</h1>
      </header>

      <form id="registerForm" novalidate>
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
          <p class="password-hint">Use 8 or more characters with a mix of letters, numbers & symbols</p>
        </div>

        <div class="button-container">
          <button type="submit" class="button button-primary" id="submitButton">Log In</button>
        </div>

        <p class="register-subtext">
          Don't have an account? <a href="#" class="register-link">Sign up</a>
        </p>
      </form>
    </div>
  `;

  document.body.appendChild(page);

  // جلب عناصر النموذج
  const registerForm = document.getElementById('registerForm');
  const submitButton = document.getElementById('submitButton');

  // استدعاء وظائف التحقق
  const { validateEmail, emailInput } = setupEmailValidation();
  const { validatePassword, passwordInput } = setupPasswordValidation();

  let hasSubmitted = false;

  function activateRealTimeValidation() {
    if (!hasSubmitted) {
      emailInput?.addEventListener('input', validateEmail);
      emailInput?.addEventListener('blur', validateEmail);
      passwordInput?.addEventListener('input', validatePassword);
      passwordInput?.addEventListener('blur', validatePassword);
      hasSubmitted = true;
    }
  }

  registerForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // مسح الأخطاء السابقة
    document.querySelectorAll('.invalid-feedback').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // التحقق من صحة الحقول
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      submitButton.disabled = true;
      submitButton.textContent = 'Logging in...';

      setTimeout(() => {
        alert('Login successful! (Demo)');
        submitButton.disabled = false;
        submitButton.textContent = 'Log In';
        registerForm.reset();
      }, 1500);
    } else {
      activateRealTimeValidation();
    }
  });
});
