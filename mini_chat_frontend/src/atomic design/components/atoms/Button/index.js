// components/atoms/Button/button.js

class ButtonController {
    constructor(buttonElement) {
      this.button = buttonElement;
      this.spinner = buttonElement.querySelector('.btn-spinner');
      this.initEvents();
    }
  
    initEvents() {
      //event listeners
    }
  
    setText(text) {
      const textNode = Array.from(this.button.childNodes).find(
        node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
      );
      
      if (textNode) {
        textNode.textContent = text;
      } else {
        this.button.insertBefore(document.createTextNode(text), this.spinner);
      }
      return this;
    }
  
    setVariant(variant) {
      Array.from(this.button.classList).forEach(className => {
        if (className.startsWith('btn-')) {
          this.button.classList.remove(className);
        }
      });
      
      this.button.classList.add('btn', `btn-${variant}`);
      return this;
    }
  
    setDisabled(disabled) {
      this.button.disabled = disabled;
      return this;
    }
  
    setLoading(loading) {
      if (loading) {
        this.button.classList.add('btn-loading');
      } else {
        this.button.classList.remove('btn-loading');
      }
      return this;
    }
  
    setSize(size) {
      const sizes = {
        'sm': '0.5rem 1rem',
        'md': '0.75rem 1.5rem',
        'lg': '1rem 2rem'
      };
      
      if (sizes[size]) {
        this.button.style.padding = sizes[size];
      }
      return this;
    }
  
    onClick(callback) {
      this.button.addEventListener('click', callback);
      return this;
    }
  }
  
  function initButtons() {
    const buttons = document.querySelectorAll('.btn');
    return Array.from(buttons).map(button => new ButtonController(button));
  }
  
  export { ButtonController, initButtons };
  
  document.addEventListener('DOMContentLoaded', () => {
    window.buttons = initButtons(); 
  });