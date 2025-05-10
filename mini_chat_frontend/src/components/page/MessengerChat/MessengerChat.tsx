import React, { JSX, useEffect, useState } from "react";
import styles from "./MessengerChat.module.css";
import ChatSidebar from "../../organisms/Chat/Sidebar/ChatSidebar";
import Messagebar from "../../organisms/Chat/Messagebar/Messagebar";
import SidebarImage from "../../../assets/images/sidebar.jpg";
import { SocketProvider } from "../../../contexts/SocketContext";
import { userStorage } from "../../../utils/storage";
import { getUserConversations } from "../../../services/userService";


interface User {
  id: string;
  email: string;
  fullName: string;
}

interface SidebarContact {
  user: User;
  conversationId: string;
  lastMessageTime: string;
}

const MessengerChat: React.FC = (): JSX.Element => {
  const [contacts, setContacts] = useState<SidebarContact[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [otherUser, setOtherUser] = useState<any | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowSidebar(true); 
        window.location.reload();
      }
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goBackToSidebar = () => {
    setOtherUser(null);
    setConversationId(null);
    setShowSidebar(true);
  };


  useEffect(() => {
    const loadUserAndContacts = async () => {
      const loadedUser = userStorage.load();
      if (!loadedUser) return;

      setCurrentUser(loadedUser);

      try {
        const conversations = await getUserConversations(loadedUser.id);
        const formattedContacts: SidebarContact[] = conversations.map((conv) => {
          const otherUser = conv.users.find(u => u.id !== loadedUser.id)!;
          const lastMessage = conv.messages?.[conv.messages.length - 1];
          return {
            user: otherUser,
            conversationId: conv.id,
            lastMessageTime: lastMessage?.createdAt || "No messages",
          };
        });
        setContacts(formattedContacts);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    loadUserAndContacts();
  }, []);

  const handleSelectConversation = (conversationId: string, user: User) => {
    setOtherUser(user);
    setConversationId(conversationId);
  
    const selectedContact = contacts.find(contact => contact.conversationId === conversationId);
    if (selectedContact) {
      setOtherUser(selectedContact.user);
    }
  
    if (isMobile) {
      setShowSidebar(false); 
    }
  };

  if (!currentUser) 
  {
    return <div>unauthorized 401</div>;
  }

  return (
    <SocketProvider>
      <div className={styles.chatPage}>
        {!isMobile && (
          <img src={SidebarImage} className={styles.sidebarImage} alt="Sidebar" />
        )}
  
        <div className={styles.chatContainer}>
          {showSidebar && (
            <ChatSidebar
              contacts={contacts}
              onSelectConversation={handleSelectConversation}
            />
          )}
  
          {otherUser && (
            <Messagebar
              currentUser={currentUser}
              otherUser={otherUser}
              conversationId={conversationId}
              onBack={isMobile ? goBackToSidebar : undefined}
            />
          )}
  
          {!otherUser && !isMobile && (
            <div className={styles.emptyMessagebar}>
              <p>Select a conversation to start chatting</p>
            </div>
          )}
        </div>
      </div>
    </SocketProvider>
  );
  
};

export default MessengerChat;
