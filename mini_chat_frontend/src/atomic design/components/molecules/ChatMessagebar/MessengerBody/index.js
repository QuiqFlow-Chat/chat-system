import { createIncomingMessage } from "./IncomingMessage/index.js";
import { createOutgoingMessage } from "./OutgoingMessage/index.js";

export function createMessagesContainer(messages = []) {
  const container = document.createElement("div");
  container.className = "messages-container";

  messages.forEach((msg) => {
    let messageElement;
    if (msg.type === "incoming") {
      messageElement = createIncomingMessage({
        name: msg.name,
        time: msg.time,
        color: msg.color,
        message: msg.message,
      });
    } else if (msg.type === "outgoing") {
      messageElement = createOutgoingMessage({
        name: msg.name,
        time: msg.time,
        color: msg.color,
        message: msg.message,
      });
    }

    if (messageElement) {
      container.appendChild(messageElement);
    }
  });

  const messagesBody = document.createElement("div");
  messagesBody.className = "messenger-body";

  messagesBody.appendChild(container);

  return messagesBody;
}
