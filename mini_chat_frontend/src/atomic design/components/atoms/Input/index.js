class InputController {
  constructor(inputElement) {
    this.input = inputElement;
    this.initEvents();
  }

  // Initialize input events
  initEvents() {
    this.input.addEventListener('input', this.handleInput.bind(this));
    this.input.addEventListener('focus', this.handleFocus.bind(this));
    this.input.addEventListener('blur', this.handleBlur.bind(this));
  }

  // Handle input events
  handleInput(event) {
    this.emit('custom-input', event.target.value); // ✅ تم تغيير الاسم لتفادي التكرار
  }

  handleFocus() {
    this.input.classList.add('is-focused');
    // this.emit('custom-focus');
  }

  handleBlur() {
    this.input.classList.remove('is-focused');
    // this.emit('custom-blur');
  }

  // Custom event listeners
  on(eventName, callback) {
    this.input.addEventListener(eventName, callback);
    return this;
  }

  emit(eventName, detail = null) {
    const event = new CustomEvent(eventName, { detail });
    this.input.dispatchEvent(event);
  }

  // Control input value
  setValue(value) {
    this.input.value = value;
    this.emit('custom-change', value); // ✅ تم تغيير الاسم
    return this;
  }

  getValue() {
    return this.input.value;
  }

  // Validation state control
  setValid(valid) {
    this.input.classList.remove('is-valid', 'is-invalid');
    if (valid === true) {
      this.input.classList.add('is-valid');
    } else if (valid === false) {
      this.input.classList.add('is-invalid');
    }
    return this;
  }

  // Enable/disable the input
  setDisabled(disabled) {
    this.input.disabled = disabled;
    return this;
  }

  // Set placeholder text
  setPlaceholder(text) {
    this.input.placeholder = text;
    return this;
  }

  // Set input type
  setType(type) {
    this.input.type = type;
    return this;
  }

  // Add/remove CSS class
  addClass(className) {
    this.input.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.input.classList.remove(className);
    return this;
  }
}

// Initialize all input fields
function initInputs() {
  const inputs = document.querySelectorAll('.input');
  return Array.from(inputs).map(input => new InputController(input));
}

// Export for use in other files
export { InputController, initInputs };
