import { createMessageContact } from "../SenderData/index.js";
import { createMessageText } from "../../../../atoms/Message/index.js";

export function createOutgoingMessage({
  name = "You",
  time,
  color = "#f1416c",
  message,
  imgSrc = null,
}) {
  const outgoingMessage = document.createElement("div");
  outgoingMessage.className = "message outgoing";

  const wrapper = document.createElement("div");
  wrapper.className = "message-wrapper";

  const contact = createMessageContact({
    name,
    time,
    color,
    imgSrc,
    reverseOrder: true,
  });

  const messageUser = document.createElement("div");
  messageUser.className = "message-contact";

  const avatar = contact.querySelector(".avatar.small");
  const userDetails = contact.querySelector(".user-details");

  messageUser.appendChild(userDetails);
  messageUser.appendChild(avatar);

  const messageText = createMessageText(message);

  wrapper.appendChild(messageUser);
  wrapper.appendChild(messageText.textElement);
  outgoingMessage.appendChild(wrapper);

  return outgoingMessage;
}
