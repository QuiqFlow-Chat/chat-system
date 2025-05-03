class MessageText {
  constructor(textElement) {
    this.textElement = textElement;
  }

  setText(text) {
    this.textElement.innerHTML = text.replace(/\n/g, "<br>");
    return this;
  }
}

export function createMessageText(text = '') {
  const div = document.createElement('div');
  div.className = 'message-text';
  div.innerHTML = text.replace(/\n/g, "<br>");

  return new MessageText(div);
}
