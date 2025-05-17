import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./ChatSidebar.module.css";

import { ChatSidebarProps, SidebarContact } from "@/types/chatTypes";
import { fetchAllUsers } from "@/services/chat/fetchAllUsersService";
import Search from "@/components/molecules/ChatSidebar/Search/Search";
import ContactItem from "@/components/molecules/ChatSidebar/ContactItem/ContactItem";
import { getConversationId } from "@/services/chat/userService";

import { USERS_CONVERSATION_LIMIT } from "@/constants/regex";
import { usePagination } from "@/hooks/useSidebarPagination";

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  contacts,
  onSelectConversation,
}) => {
  const { t } = useTranslation();

  const listRef = useRef<HTMLDivElement | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [query, setQuery] = useState("");

  const {
    data: paginatedUsers,
    loading,
  } = usePagination<SidebarContact>({
    fetchFn: (page, limit) => fetchAllUsers(page, limit),
    limit: USERS_CONVERSATION_LIMIT,
    containerRef: listRef,
  });

  const baseContacts = isSearchActive ? paginatedUsers : contacts;

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

  return (
    <div className={styles.chatSidebar}>
      <Search
        query={query}
        setQuery={(value) => {
          setQuery(value);
          setIsSearchActive(value.trim() !== "");
        }}
      />
      <div className={styles.contactsList} ref={listRef}>
        {loading && baseContacts.length === 0 ? (
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
            {loading && baseContacts.length > 0 && <div>{t("loading")}</div>}
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
