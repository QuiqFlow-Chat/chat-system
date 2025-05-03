import { createMessengerHeader } from "../../../molecules/ChatMessagebar/MessengerHeader/indix.js";
import { createMessagesContainer } from "../../../molecules/ChatMessagebar/MessengerBody/index.js";
import { createMessengerFooter } from "../../../molecules/ChatMessagebar/MessengerFooter/index.js";
import { createOutgoingMessage } from "../../../molecules/ChatMessagebar/MessengerBody/OutgoingMessage/index.js";

const messages = [
  {
    type: "incoming",
    name: "Farah",
    time: "10:00 AM",
    color: "#6c5ce7",
    message: "Hello! How are you?",
  },
  {
    type: "outgoing",
    name: "You",
    time: "10:01 AM",
    color: "#0984e3",
    message: "I'm good, thanks!",
  },
];

const header = createMessengerHeader({ name: "Farah", status: "Online" });
const body = createMessagesContainer(messages);

const footer = createMessengerFooter((newMessage) => {
  const formattedTime = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const newMessageElement = createOutgoingMessage({
    name: "You",
    time: formattedTime,
    color: "#0984e3",
    message: newMessage,
  });

  const messagesContainer = body.querySelector(".messages-container");
  const typingIndicator = messagesContainer.querySelector("#typing-indicator");

  messagesContainer.insertBefore(newMessageElement, typingIndicator);

  newMessageElement.scrollIntoView({ behavior: "smooth", block: "end" });
  
});
  
export function renderMessengerPage() {
  const messengerCard = document.querySelector(".messenger-card");
  if (!messengerCard) return;

  messengerCard.innerHTML = ""; 
  messengerCard.appendChild(header);
  messengerCard.appendChild(body);
  messengerCard.appendChild(footer);
}
