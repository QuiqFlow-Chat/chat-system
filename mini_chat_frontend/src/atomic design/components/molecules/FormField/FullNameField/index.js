export function setupFullNameValidation() {
    const fullNameInput = document.getElementById('fullName');
    const wordSeparatorRegex = /\s+/; // Regex لفصل الكلمات
    const minimumWordCount = 2;       // الحد الأدنى لعدد الكلمات
  
    function validateFullName() {
      const nameValue = fullNameInput.value.trim();
      const nameField = fullNameInput.closest('[data-fullname-field]');
      const errorElement = nameField.querySelector('.invalid-feedback');
  
      if (!nameValue) {
        showError(nameField, errorElement, 'Full name is required');
        return false;
      }
  
      const nameParts = nameValue.split(wordSeparatorRegex);
      if (nameParts.length < minimumWordCount) {
        showError(nameField, errorElement, 'Please enter at least first and last name');
        return false;
      }
  
      showSuccess(nameField);
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
      validateFullName,
      fullNameInput
    };
  }
  