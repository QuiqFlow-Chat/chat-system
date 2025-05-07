import React, { JSX, useEffect, useState } from "react";
import styles from "./MessengerChat.module.css";
import ChatSidebar from "../../organisms/Chat/Sidebar/ChatSidebar";
import Messagebar from "../../organisms/Chat/Messagebar/Messagebar";
import SidebarImage from "../../../assets/images/sidebar.jpg";
import { SocketProvider } from "../../../contexts/SocketContext";
import { apiGet } from "../../../utils/apiUtils";
import { userStorage } from "../../../utils/storage";

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface Message {
  createdAt: string;
}

interface Conversation {
  id: string;
  users: User[];
  messages: Message[];
}

interface SidebarContact {
  user: User;
  conversationId: string;
  lastMessageTime: string;
}

const MessengerChat: React.FC = (): JSX.Element => {
  const [contacts, setContacts] = useState<SidebarContact[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUserAndContacts = async () => {
      const loadedUser = userStorage.load();
      if (!loadedUser) return;

      setCurrentUser(loadedUser);
      try {
        const response = await apiGet<{ data: { data: Conversation[] } }>(
          `/${loadedUser.id}/getUserConversations`
        );

        const conversations = response.data.data;
        console.log({ conversations });

        const formattedContacts: SidebarContact[] = conversations.map((conv) => {
          const otherUser = conv.users.find((u) => u.id !== loadedUser.id);
          const lastMessage = conv.messages?.[conv.messages.length - 1];

          return {
            user: otherUser ?? { id: "", email: "", fullName: "Unknown" },
            conversationId: conv.id,
            lastMessageTime: lastMessage?.createdAt || "No messages",
          };
        });

        setContacts(formattedContacts);
      } catch (error) {
        console.error("Failed to fetch users or conversations:", error);
      }
    };

    loadUserAndContacts();
  }, []);

  if (!currentUser) return <div>Loading...</div>;

  return (
    <SocketProvider>
      <div className={styles.chatPage}>
        <img src={SidebarImage} className={styles.sidebarImage} alt="Sidebar" />
        <div className={styles.chatContainer}>
          <ChatSidebar
            contacts={contacts}
            onSelectConversation={(conversationId) =>
              setActiveConversationId(conversationId)
            }
          />
          {activeConversationId ? (
            <Messagebar
              currentUser={currentUser}
              conversationId={activeConversationId}
            />
          ) : (
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
