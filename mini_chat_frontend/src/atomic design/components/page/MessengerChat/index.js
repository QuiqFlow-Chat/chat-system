import { createChatSidebar } from "../../organisms/Chat/Sidebar/index.js";
import { renderMessengerPage } from "../../organisms/Chat/Messagebar/index.js";

const contacts = [
  {
    name: "Melody Macy",
    email: "melody@altbox.com",
    time: "20 hrs",
    color: "#6c5ce7",
  },
  {
    name: "Farah N.",
    email: "farah@domain.com",
    time: "5 hrs",
    color: "#00cec9",
  },
  {
    name: "Tariq Ameen",
    email: "tariq@netcloud.com",
    time: "2 hrs",
    color: "#fd79a8",
  },
  {
    name: "Layla M.",
    email: "layla@techwave.io",
    time: "1 hr",
    color: "#e17055",
  },
  {
    name: "Omar Khaled",
    email: "omar@softpulse.org",
    time: "just now",
    color: "#0984e3",
  },  
];

document.addEventListener("DOMContentLoaded", () => {

  const chatContainer = document.createElement("div");
  chatContainer.className = "chat-container";

  const sidebar = createChatSidebar(contacts);

  const chatMain = document.createElement("div");
  chatMain.className = "chat-main";

  const messengerCard = document.createElement("div");
  messengerCard.className = "messenger-card";

  chatMain.appendChild(messengerCard);

  chatContainer.appendChild(sidebar);
  chatContainer.appendChild(chatMain);

  const app = document.getElementById("apptest");
  app.innerHTML = "";
  app.appendChild(chatContainer);

  renderMessengerPage();
});
