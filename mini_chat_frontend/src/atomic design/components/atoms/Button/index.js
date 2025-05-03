class ButtonController {
  constructor(buttonElement) {
    this.button = buttonElement;
  }

  setText(text) {
    const textNode = Array.from(this.button.childNodes).find(
      node => node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== ''
    );

    if (textNode) {
      textNode.textContent = text;
    } else {
      this.button.appendChild(document.createTextNode(text));
    }
    return this;
  }

  setVariant(variant) {
    Array.from(this.button.classList).forEach(className => {
      if (className.startsWith('button-')) {
        this.button.classList.remove(className);
      }
    });

    this.button.classList.add('button', `button-${variant}`);
    return this;
  }

  setDisabled(disabled) {
    this.button.disabled = disabled;
    return this;
  }

  setLoading(loading) {
    if (loading) {
      this.button.classList.add('button-loading');
    } else {
      this.button.classList.remove('button-loading');
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

  getElement() {
    return this.button;
  }
}

function createButton({ text = 'Click', variant = 'primary', size = 'md', type = 'button' } = {}) {
  const button = document.createElement('button');
  button.type = type;
  button.className = `button button-${variant}`;
  button.textContent = text;

  const controller = new ButtonController(button);
  controller.setSize(size);

  return controller;
}

export { ButtonController, createButton };
