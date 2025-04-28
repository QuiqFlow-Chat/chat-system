// components/atoms/Label/LabelController.js

class LabelController {
    constructor(labelElement) {
      this.label = labelElement;
      this.init();
    }
  
    init() {
      // يمكن إضافة أي تهيئة أولية هنا
    }
  
    // تغيير نص Label
    setText(text) {
      this.label.textContent = text;
      return this;
    }
  
    // تغيير الـ for attribute
    setFor(forId) {
      this.label.htmlFor = forId;
      return this;
    }
  
    // تغيير حجم الخط
    setFontSize(size) {
      this.label.style.fontSize = size;
      return this;
    }
  
    // تغيير لون النص
    setColor(color) {
      this.label.style.color = color;
      return this;
    }
  
    // إضافة class
    addClass(className) {
      this.label.classList.add(className);
      return this;
    }
  
    // إزالة class
    removeClass(className) {
      this.label.classList.remove(className);
      return this;
    }
  
    // تغيير وزن الخط
    setFontWeight(weight) {
      this.label.style.fontWeight = weight;
      return this;
    }
  
    // التحكم في الهامش
    setMargin(margin) {
      this.label.style.margin = margin;
      return this;
    }
  
    // إضافة حدث
    onClick(callback) {
      this.label.addEventListener('click', callback);
      return this;
    }
  }
  
  // تهيئة جميع العناوين
  function initLabels() {
    const labels = document.querySelectorAll('.form-label');
    return Array.from(labels).map(label => new LabelController(label));
  }
  
  // تصدير للاستخدام في ملفات أخرى
  export { LabelController, initLabels };
  
  // التهيئة التلقائية
  document.addEventListener('DOMContentLoaded', () => {
    window.labels = initLabels(); // للوصول من وحدة التحكم
  });