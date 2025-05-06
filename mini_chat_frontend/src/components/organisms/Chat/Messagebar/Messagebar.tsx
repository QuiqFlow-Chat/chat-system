import React, { useState, useEffect } from "react";
import styles from "./Messagebar.module.css";
import MessengerHeader from "../../../molecules/ChatMessagebar/MessengerHeader/MessengerHeader";
import MessengerFooter from "../../../molecules/ChatMessagebar/MessengerFooter/MessengerFooter";
import MessagesContainer from "../../../molecules/ChatMessagebar/MessengerBody/MessagesContainer";

import { useSocket } from "../../../../contexts/SocketContext";
import { UserConversationCreateParameters } from "../../../../shared/dtosInterfaces/userConversationDtos";
import { MessageCreateParameters } from "../../../../shared/dtosInterfaces/messageDtos";

type MessagebarProps = {
  currentUser: {
    id: string;
    fullName: string;
  };
  conversationId: string;
};

export interface Message {
  type: "incoming" | "outgoing";
  name: string;
  time: string;
  color: string;
  message: string;
}

const Messagebar: React.FC<MessagebarProps> = ({ currentUser, conversationId }) => {
  const socket = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);


  useEffect(() => {
    const userOnlineData: UserConversationCreateParameters = {
      userId: currentUser.id,
      conversationId,
    };
    socket.emit("userOnline", userOnlineData);
  
    socket.on("receiveMessage", (data) => {
      const formattedTime = new Date(data.createdAt ).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
  
      setMessages((prev) => [
        ...prev,
        {
          type: "incoming",
          name: data.fullName, 
          time: formattedTime,
          color: "#6c5ce7",
          message: data.content ,
        },
      ]);
    });
  
    socket.on("isTyping", (userId = "user123") => {
      if (userId !== currentUser.id) {
        setIsTyping(true);
      }
    });
  
    return () => {
      const userOfflineData: UserConversationCreateParameters = {
        userId: currentUser.id,
        conversationId,
      };
      socket.emit("userOffline", userOfflineData);
      socket.off("receiveMessage");
      socket.off("isTyping");
    };
  }, [socket, currentUser.id, conversationId]);
  

  const handleSend = (newMessage: string) => {
    const formattedTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  
    setMessages((prev) => [
      ...prev,
      {
        type: "outgoing",
        name: currentUser.fullName,
        time: formattedTime,
        color: "#0984e3",
        message: newMessage,
      },
    ]);
  
    const messageData: MessageCreateParameters = {
      senderId: currentUser.id,
      conversationId,
      content: newMessage,
    };
  
    socket.emit("sendMessage", messageData);
  };
  

  const handleTyping = () => {
    const typingData: UserConversationCreateParameters = {
      userId: currentUser.id,
      conversationId,
    };
    socket.emit("isTyping", typingData);
  };
  

  return (
    <div className={styles.chatMain}>
      <div className={styles.messengerCard}>
        <MessengerHeader name={currentUser.fullName} userId={currentUser.id} /> {/* تمرير name و userId */}
        <MessagesContainer messages={messages} isTyping={isTyping} />
        <MessengerFooter onSend={handleSend} onTyping={handleTyping}/>
      </div>
    </div>
  );
};

export default Messagebar;