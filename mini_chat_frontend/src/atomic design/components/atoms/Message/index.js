class MessageText {
    constructor(textElement) {
      this.textElement = textElement;
    }
  
    setText(text) {
      this.textElement.textContent = text;
      return this;
    }
  }
  
  export function createMessageText(text = '') {
    const div = document.createElement('div');
    div.className = 'message-text';
    div.textContent = text;
  
    return new MessageText(div);
  }
  