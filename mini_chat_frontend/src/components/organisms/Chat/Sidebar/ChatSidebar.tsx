import { useState } from "react";
import ContactItem from "../../../molecules/ChatSidebar/ContactItem/ContactItem";
import Search from "../../../molecules/ChatSidebar/Search/Search";
import styles from "./ChatSidebar.module.css";

interface SidebarContact {
  user: {
    id: string;
    email: string;
    fullName: string;
  };
  conversationId: string;
  lastMessageTime: string;
}

interface ChatSidebarProps {
  contacts: SidebarContact[];
  onSelectConversation: (conversationId: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  
  contacts,
  onSelectConversation,
}) => {
  console.log("contacts:", contacts);
  const [query, setQuery] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.user.fullName.toLowerCase().includes(query.toLowerCase()) ||
      contact.user.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.chatSidebar}>
      <div className={styles.contactsCard}>
        {/* Header */}
        <Search query={query} setQuery={setQuery} />

        {/* Body */}
        <div className={styles.contactsList}>
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact, index) => (
              <ContactItem
                key={index}
                user={contact.user}
                time={contact.lastMessageTime}
                onClick={() => onSelectConversation(contact.conversationId)}
              />
            ))
          ) : (
            <div className={styles.noResults}>No results found...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
