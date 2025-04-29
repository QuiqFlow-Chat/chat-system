// components/atoms/Label/LabelController.js

class LabelController {
  constructor(labelElement) {
    this.label = labelElement;
    this.init();
  }

  // You can add any initial setup here
  init() {
    // Initial setup can go here
  }

  // Change label text
  setText(text) {
    this.label.textContent = text;
    return this;
  }

  // Change the "for" attribute
  setFor(forId) {
    this.label.htmlFor = forId;
    return this;
  }

  // Change font size
  setFontSize(size) {
    this.label.style.fontSize = size;
    return this;
  }

  // Change text color
  setColor(color) {
    this.label.style.color = color;
    return this;
  }

  // Add a CSS class
  addClass(className) {
    this.label.classList.add(className);
    return this;
  }

  // Remove a CSS class
  removeClass(className) {
    this.label.classList.remove(className);
    return this;
  }

  // Change font weight
  setFontWeight(weight) {
    this.label.style.fontWeight = weight;
    return this;
  }

  // Set margin
  setMargin(margin) {
    this.label.style.margin = margin;
    return this;
  }

  // Add click event listener
  onClick(callback) {
    this.label.addEventListener('click', callback);
    return this;
  }
}

// Initialize all label elements
function initLabels() {
  const labels = document.querySelectorAll('.form-label');
  return Array.from(labels).map(label => new LabelController(label));
}

// Export for use in other files
export { LabelController, initLabels };

// Auto-initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.labels = initLabels(); // For console access
});
