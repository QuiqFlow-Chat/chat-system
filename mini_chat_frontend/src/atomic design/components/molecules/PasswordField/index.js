import { InputController } from '../components/atoms/Input/index.js';
import { LabelController } from '../components/atoms/Lable/index.js';
import { ButtonController } from '../components/atoms/Button/index.js'; // فقط لو حبيت تستخدم زر التبديل مع ButtonController

document.addEventListener('DOMContentLoaded', () => {
  // ابدأ بالتحكم في العناصر
  
  // input
  const passwordInputEl = document.getElementById('password');
  const passwordInput = new InputController(passwordInputEl);

  // label
  const passwordLabelEl = document.querySelector('label[for="password"]');
  const passwordLabel = new LabelController(passwordLabelEl);

  // button toggle
  const toggleBtnEl = document.querySelector('.password-toggle');
  const toggleBtn = toggleBtnEl; // يمكنك تغليفه بـ ButtonController لو أردت

  // قوة كلمة المرور
  const strengthBars = document.querySelectorAll('.password-strength .strength-bar');

  // Hint و Feedback
  const passwordHint = document.querySelector('.password-hint');
  const invalidFeedback = document.querySelector('.invalid-feedback');

  // تبديل إظهار/إخفاء كلمة المرور
  toggleBtn.addEventListener('click', () => {
    const type = passwordInput.getValue() && passwordInput.input.type === 'password' ? 'text' : 'password';
    passwordInput.setType(type);
  });

  // التحقق من قوة كلمة المرور وعرض الـ Bars
  passwordInput.on('input', (e) => {
    const value = e.detail;
    updatePasswordStrength(value);
    validatePassword(value);
  });

  function updatePasswordStrength(password) {
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    strengthBars.forEach((bar, index) => {
      if (index < strength) {
        bar.style.backgroundColor = 'green';
      } else {
        bar.style.backgroundColor = 'lightgray';
      }
    });
  }

  function validatePassword(password) {
    if (password.length < 8) {
      passwordInput.setValid(false);
      invalidFeedback.style.display = 'block';
    } else {
      passwordInput.setValid(true);
      invalidFeedback.style.display = 'none';
    }
  }

});
