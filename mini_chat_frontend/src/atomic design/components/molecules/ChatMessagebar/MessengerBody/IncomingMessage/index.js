import { createMessageContact } from "../SenderData/index.js";
import { createMessageText } from "../../../../atoms/Message/index.js";

export function createIncomingMessage({ name, time, color, message, imgSrc }) {
  const incomingMessage = document.createElement("div");
  incomingMessage.className = "message incoming";

  const wrapper = document.createElement("div");
  wrapper.className = "message-wrapper";

  const contact = createMessageContact({
    name,
    time,
    color,
    imgSrc,
    reverseOrder: false,
  });
  const messageText = createMessageText(message);

  wrapper.appendChild(contact);
  wrapper.appendChild(messageText.textElement);
  incomingMessage.appendChild(wrapper);

  return incomingMessage;
}
