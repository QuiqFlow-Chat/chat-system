import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ChatSidebar.module.css";

import { ChatSidebarProps, SidebarContact } from "@/types/chatTypes";
import { fetchAllUsers } from "@/services/chat/fetchAllUsersService";
import Search from "@/components/molecules/ChatSidebar/Search/Search";
import ContactItem from "@/components/molecules/ChatSidebar/ContactItem/ContactItem";
import { getConversationId } from "@/services/chat/userService";

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  contacts,
  onSelectConversation,
}) => {
  const { t } = useTranslation();

  const [allUsers, setAllUsers] = useState<SidebarContact[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      if (isSearchActive && !allUsers) {
        loadUsers();
      }
    }, 500);

    return () => clearTimeout(delay);
  }, [isSearchActive, allUsers]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await fetchAllUsers();
      setAllUsers(data);
      console.log("allUsers", allUsers);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setAllUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const baseContacts = isSearchActive ? allUsers ?? [] : contacts;

  const filteredContacts = baseContacts.filter((contact) =>
    contact.user.fullName.toLowerCase().includes(query.toLowerCase()) ||
    contact.user.email.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectContact = async (contact: SidebarContact) => {
    try {
      const conversationId = await getConversationId(contact.user);
      onSelectConversation(conversationId, contact.user);
    } catch (error) {
      console.error("Error getting conversation ID:", error);
    }
  };
  
  console.log("filteredContacts",filteredContacts)

  return (
    <div className={styles.chatSidebar}>
      <Search
        query={query}
        setQuery={(value) => {
          setQuery(value);
          setIsSearchActive(value.trim() !== "");
        }}
        onFocus={loadUsers}
      />
      <div className={styles.contactsList}>
        {isLoading ? (
          <div>{t("loading")}</div>
        ) : filteredContacts.length > 0 ? (
          <>
            {filteredContacts.map((contact, index) => (
              <ContactItem
                key={index}
                user={{
                  ...contact.user,
                  lastActivity: contact.lastMessageTime,
                }}
                time={contact.lastMessageTime}
                onClick={() => handleSelectContact(contact)}
              />
            ))}
          </>
        ) : (
          <div className={styles.noResults}>
            {t("chatSidebar.noResultsFound")}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
