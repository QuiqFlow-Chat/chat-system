// MessengerChat.tsx
import React, { useEffect, useState } from "react";
import styles from "./MessengerChat.module.css";
import ChatSidebar from "../../organisms/Chat/Sidebar/ChatSidebar";
import Messagebar from "../../organisms/Chat/Messagebar/Messagebar";

import SidebarImage from "../../../assets/images/sidebar.jpg";
import { UserGetByParameter } from "../../../shared/dtosInterfaces/userDtos";
import { SocketProvider } from "../../../contexts/SocketContext";

// بيانات dummy يمكن استبدالها بالبيانات الحقيقية من API
const dummyContacts: UserGetByParameter[] = [
  {
    id: "user1",
    fullName: "John Doe",
    email: "johndoe@example.com"
  },
  {
    id: "user2",
    fullName: "Jane Smith",
    email: "janesmith@example.com"
  },
];

const MessengerChat: React.FC = () => {
  const [contacts, setContacts] = useState<UserGetByParameter[]>([]); 
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const currentUser = {
    id: "user123", 
    fullName: "You", 
  };

  useEffect(() => {
    setContacts(dummyContacts);  
  }, []);

  return (
  <SocketProvider>
    <div className={styles.chatPage}>
      <img src={SidebarImage} className={styles.sidebarImage} />
      <div className={styles.chatContainer}>
        <ChatSidebar
          contacts={contacts} 
          onSelectConversation={(conversationId) => setActiveConversationId(conversationId)}
          />
        {activeConversationId && (
          <Messagebar
            currentUser={currentUser}
            conversationId={activeConversationId}
          />
        )}
      </div>
    </div>
  </SocketProvider>
  );
};

export default MessengerChat;