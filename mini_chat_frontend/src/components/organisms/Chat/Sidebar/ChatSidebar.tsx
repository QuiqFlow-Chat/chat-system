import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ContactItem from "../../../molecules/ChatSidebar/ContactItem/ContactItem";
import Search from "../../../molecules/ChatSidebar/Search/Search";
import styles from "./ChatSidebar.module.css";

import { useSidebarPagination } from "@/hooks/useSidebarPagination";
import { ChatSidebarProps, SidebarContact } from "@/types/chatTypes";
import { fetchAllUsers } from "@/services/chat/fetchAllUsersService";

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
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setAllUsers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const baseContacts = isSearchActive ? allUsers ?? [] : contacts;

  const { visibleItems: filteredContacts, observerRef } = useSidebarPagination(
    baseContacts,
    query,
    (contact, q) =>
      contact.user.fullName.toLowerCase().includes(q.toLowerCase()) ||
      contact.user.email.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className={styles.chatSidebar}>
      <div className={styles.contactsCard}>
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
                  onClick={() =>
                    onSelectConversation(contact.conversationId, contact.user)
                  }
                />
              ))}
              <div ref={observerRef} className={styles.observerSpacer} />
            </>
          ) : (
            <div className={styles.noResults}>
              {t("chatSidebar.noResultsFound")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
