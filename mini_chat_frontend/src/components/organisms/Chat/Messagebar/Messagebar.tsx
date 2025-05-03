import React, { useState } from "react";
import styles from "./Messagebar.module.css";
import MessengerHeader from "../../../molecules/ChatMessagebar/MessengerHeader/MessengerHeader";
import MessengerFooter from "../../../molecules/ChatMessagebar/MessengerFooter/MessengerFooter";
import MessagesContainer from "../../../molecules/ChatMessagebar/MessengerBody/MessagesContainer";

export interface Message {
  type: "incoming" | "outgoing";
  name: string;
  time: string;
  color: string;
  message: string;
}

const initialMessages: Message[] = [
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

const Messagebar: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = (newMessage: string) => {
    const formattedTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    setMessages((prev) => [
      ...prev,
      {
        type: "outgoing",
        name: "You",
        time: formattedTime,
        color: "#0984e3",
        message: newMessage,
      },
    ]);
  };

  return (
    <div className={styles.messengerCard}>
      <MessengerHeader name="Farah" status="Online" />
      <MessagesContainer messages={messages} />
      <MessengerFooter onSend={handleSend} />
    </div>
  );
};

export default Messagebar;
