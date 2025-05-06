import { useState } from "react";
import ContactItem from "../../../molecules/ChatSidebar/ContactItem/ContactItem";
import Search from "../../../molecules/ChatSidebar/Search/Search";
import styles from "./ChatSidebar.module.css";
import { UserGetByParameter } from "../../../../shared/dtosInterfaces/userDtos";

interface ChatSidebarProps {
  contacts: UserGetByParameter[];  
  onSelectConversation: (conversationId: string) => void;
}

function generateConversationId(email: string): string {
  return `conv-${email.replace(/[@.]/g, "")}`;  
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ contacts, onSelectConversation }) => {
  const [query, setQuery] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(query.toLowerCase()) || // التصفية بناءً على fullName
      contact.email.toLowerCase().includes(query.toLowerCase()) // أو email
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
                user={contact} 
                time="10:00 AM"  
                onClick={() => {
                  const conversationId = generateConversationId(contact.email); // توليد conversationId بناءً على البريد
                  onSelectConversation(conversationId);
                }}
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