import { ButtonController } from "../../../atoms/Button/index.js";

export function createMessengerFooter(onSendCallback) {
  const footer = document.createElement("div");
  footer.className = "messenger-footer";

  const textarea = document.createElement("textarea");
  textarea.className = "message-input";
  textarea.placeholder = "Type a message";

  const sendMessage = () => {
    const message = textarea.value.trim();
    if (message && typeof onSendCallback === "function") {

      // const popSound = new Audio('pop-in-message.mp3');
      // popSound.play();

      onSendCallback(message);
      textarea.value = "";

      const typingIndicator = document.getElementById("typing-indicator");
      if (typingIndicator) {
        typingIndicator.style.display = "none";
      }
    }
  };

  textarea.addEventListener("input", () => {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
      const shouldShow = textarea.value.trim() !== "";
      typingIndicator.style.display = shouldShow ? "flex" : "none";
  
      if (shouldShow) {
        typingIndicator.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  });

  const button = document.createElement("button");
  button.className = "send-button";
  const buttonController = new ButtonController(button)
    .setText("Send")
    .setVariant("primary")
    .setSize("md");

  buttonController.onClick((e) => {
    e.preventDefault();
    sendMessage();
  });

  textarea.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  const toolbar = document.createElement("div");
  toolbar.className = "message-toolbar";
  toolbar.appendChild(button);

  footer.appendChild(textarea);
  footer.appendChild(toolbar);

  return footer;
}
