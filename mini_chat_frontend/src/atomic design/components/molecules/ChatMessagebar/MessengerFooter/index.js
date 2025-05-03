import { ButtonController } from "../../../atoms/Button/index.js";

export function createMessengerFooter(onSendCallback) {
  const footer = document.createElement("div");
  footer.className = "messenger-footer";

  const textarea = document.createElement("textarea");
  textarea.className = "message-input";
  textarea.placeholder = "Type a message";

  const button = document.createElement("button");
  button.className = "send-button";
  const buttonController = new ButtonController(button)
    .setText("Send")
    .setVariant("primary")
    .setSize("md");

  buttonController.onClick((e) => {
    e.preventDefault();
    const message = textarea.value.trim(); 
    if (message && typeof onSendCallback === "function") {
      onSendCallback(message);
      textarea.value = ""; 
    }
  });

  const toolbar = document.createElement("div");
  toolbar.className = "message-toolbar";
  toolbar.appendChild(button);

  footer.appendChild(textarea);
  footer.appendChild(toolbar);

  return footer;
}
