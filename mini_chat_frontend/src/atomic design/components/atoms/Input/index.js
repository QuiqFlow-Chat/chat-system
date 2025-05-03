class InputController {
  constructor(inputElement) {
    this.input = inputElement;
  }

  // Initialize input events
  initEvents() {
    this.input.addEventListener('input', this.handleInput.bind(this));
    this.input.addEventListener('focus', this.handleFocus.bind(this));
    this.input.addEventListener('blur', this.handleBlur.bind(this));
    return this; 
  }

  // Handle input events
  handleInput(event) {
    this.emit('custom-input', event.target.value);
    return this;
  }

  handleFocus() {
    this.input.classList.add('is-focused');
    return this;
  }

  handleBlur() {
    this.input.classList.remove('is-focused');
    return this;
  }

  // Add custom event listener
  addEventListener(eventName, callback) {
    this.input.addEventListener(eventName, callback);
    return this;
  }

  // Remove custom event listener
  removeEventListener(eventName, callback) {
    this.input.removeEventListener(eventName, callback);
    return this;
  }

  // Emit custom event
  emit(eventName, detail = null) {
    const event = new CustomEvent(eventName, { detail });
    this.input.dispatchEvent(event);
    return this;
  }

  // Set input value
  setValue(value) {
    this.input.value = value;
    this.emit('custom-change', value);
    return this;
  }

  // Get input value
  getValue() {
    return this.input.value;
  }

  // Set validation state
  setValid(valid) {
    this.input.classList.remove('is-valid', 'is-invalid');
    if (valid === true) {
      this.input.classList.add('is-valid');
    } else if (valid === false) {
      this.input.classList.add('is-invalid');
    }
    return this;
  }

  // Set disabled state
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

  // Add a CSS class to the input
  addClass(className) {
    this.input.classList.add(className);
    return this;
  }

  // Remove a CSS class from the input
  removeClass(className) {
    this.input.classList.remove(className);
    return this;
  }

  // Get the input element itself
  getElement() {
    return this.input;
  }
}

// Initialize all input fields with InputController
function initInputs() {
  const inputs = document.querySelectorAll('.input');
  return Array.from(inputs).map(input => new InputController(input));
}

// Export for use in other files
export { InputController, initInputs };
