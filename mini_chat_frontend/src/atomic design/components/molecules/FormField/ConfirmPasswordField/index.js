// Confirm Password Validation Module
export function setupConfirmPasswordValidation(passwordInput) {
    const confirmPasswordInput = document.getElementById('confirm-password');
    
    // Check if elements exist before proceeding
    if (!confirmPasswordInput) {
        // console.error('Confirm password input not found');
        return {
            validateConfirmPassword: () => true,
            confirmPasswordInput: null
        };
    }

    const confirmPasswordField = confirmPasswordInput.closest('[data-confirm-password-field]');
    const errorElement = confirmPasswordField ? confirmPasswordField.querySelector('.invalid-feedback') : null;

    if (!errorElement) {
        console.error('Error element not found for confirm password field');
    }
  
    function validateConfirmPassword() {
        if (!confirmPasswordInput || !errorElement) return false;
        
        const confirmPasswordValue = confirmPasswordInput.value.trim();
        const passwordValue = passwordInput.value.trim();
    
        // Hide previous message first
        if (errorElement) {
            errorElement.style.display = 'none';
        }
        if (confirmPasswordField) {
            confirmPasswordField.classList.remove('error');
        }
    
        if (!confirmPasswordValue) {
            showError('Confirm password is required');
            return false;
        }
    
        if (confirmPasswordValue !== passwordValue) {
            showError('Passwords do not match');
            return false;
        }
    
        return true;
    }
  
    function showError(message) {
        if (confirmPasswordField) {
            confirmPasswordField.classList.add('error');
        }
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
  
    function showSuccess() {
        if (confirmPasswordField) {
            confirmPasswordField.classList.remove('error');
        }
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    }
  
    return {
        validateConfirmPassword,
        confirmPasswordInput
    };
}