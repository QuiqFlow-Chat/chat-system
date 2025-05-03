import { useState } from "react";
import ContactItem from "../../../molecules/ChatSidebar/ContactItem/ContactItem";
import Search from "../../../molecules/ChatSidebar/Search/Search";
import styles from "./ChatSidebar.module.css";

interface Contact {
  name: string;
  email: string;
  time: string;
  color?: string;
}

interface ChatSidebarProps {
  contacts: Contact[];
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ contacts }) => {
  const [query, setQuery] = useState("");

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.email.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className={styles.chatSidebar}>
      <div className={styles.contactsCard}>
        {/* Header */}
        <Search query={query} setQuery={setQuery} />

        {/* Body */}
        <div className={styles.contactsBody}>
          <div className={styles.contactsList}>
            {filteredContacts.map((contact, index) => (
              <ContactItem
                key={index}
                name={contact.name}
                email={contact.email}
                time={contact.time}
                color={contact.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
