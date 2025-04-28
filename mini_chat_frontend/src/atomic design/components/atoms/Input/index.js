// components/atoms/Input/InputController.js

class InputController {
    constructor(inputElement) {
      this.input = inputElement;
      this.initEvents();
    }
  
    initEvents() {
      this.input.addEventListener('input', this.handleInput.bind(this));
      this.input.addEventListener('focus', this.handleFocus.bind(this));
      this.input.addEventListener('blur', this.handleBlur.bind(this));
    }
  
    // معالجة أحداث الإدخال
    handleInput(event) {
      this.emit('input', event.target.value);
    }
  
    handleFocus() {
      this.input.classList.add('is-focused');
      this.emit('focus');
    }
  
    handleBlur() {
      this.input.classList.remove('is-focused');
      this.emit('blur');
    }
  
    // الأحداث المخصصة
    on(eventName, callback) {
      this.input.addEventListener(eventName, callback);
      return this;
    }
  
    emit(eventName, detail = null) {
      const event = new CustomEvent(eventName, { detail });
      this.input.dispatchEvent(event);
    }
  
    // التحكم في القيمة
    setValue(value) {
      this.input.value = value;
      this.emit('change', value);
      return this;
    }
  
    getValue() {
      return this.input.value;
    }
  
    // التحقق من الصحة
    setValid(valid) {
      this.input.classList.remove('is-valid', 'is-invalid');
      if (valid === true) {
        this.input.classList.add('is-valid');
      } else if (valid === false) {
        this.input.classList.add('is-invalid');
      }
      return this;
    }
  
    // التحكم في حالة التعطيل
    setDisabled(disabled) {
      this.input.disabled = disabled;
      return this;
    }
  
    // التحكم في النص التوضيحي
    setPlaceholder(text) {
      this.input.placeholder = text;
      return this;
    }
  
    // التحكم في نوع الحقل
    setType(type) {
      this.input.type = type;
      return this;
    }
  
    // إضافة/إزالة class
    addClass(className) {
      this.input.classList.add(className);
      return this;
    }
  
    removeClass(className) {
      this.input.classList.remove(className);
      return this;
    }
  }
  
  // تهيئة جميع حقول الإدخال
  function initInputs() {
    const inputs = document.querySelectorAll('.form-control');
    return Array.from(inputs).map(input => new InputController(input));
  }
  
  // تصدير للاستخدام في ملفات أخرى
  export { InputController, initInputs };
  
  // التهيئة التلقائية
  document.addEventListener('DOMContentLoaded', () => {
    window.inputs = initInputs(); // للوصول من وحدة التحكم
  });