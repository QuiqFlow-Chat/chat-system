import React, { JSX, useEffect, useState } from "react";
import styles from "./MessengerChat.module.css";
import ChatSidebar from "@/components/organisms/Chat/Sidebar/ChatSidebar";
import Messagebar from "@/components/organisms/Chat/Messagebar/Messagebar";
import SidebarImage from "@/assets/images/sidebar.jpg";
import { SocketProvider } from "@/contexts/SocketContext";
import { userStorage } from "@/utils/localStorageUtil";
import { getUserConversations } from "@/services/chat/userService";
import { logout } from "@/services/auth/authService";
import { useNavigate } from "react-router-dom";
import Avatar, { AvatarVariant } from "@/components/atoms/Avatar/Avatar";
import Button, {
  ButtonSizeEnum,
  ButtonVariantEnum,
} from "@/components/atoms/Button/Button";
import { useTranslation } from "react-i18next";

type User = {
  id: string;
  email: string;
  fullName: string;
};

type SidebarContact = {
  user: User;
  conversationId: string;
  lastMessageTime: string;
};

const MessengerChat: React.FC = (): JSX.Element => {
  const [contacts, setContacts] = useState<SidebarContact[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 768);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setShowSidebar(true);
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

        const formattedContacts: SidebarContact[] = conversations.map(
          (conv) => {
            const other = conv.users.find((u: User) => u.id !== loadedUser.id)!;
            const lastMessage = conv.messages?.[conv.messages.length - 1];

            return {
              user: other,
              conversationId: conv.id,
              lastMessageTime: lastMessage?.createdAt || t("noMessages"),
            };
          }
        );

        setContacts(formattedContacts);
      } catch (error) {
        console.error("Failed to fetch conversations:", error);
      }
    };

    loadUserAndContacts();
  }, [t]);

  const handleSelectConversation = (id: string, user: User) => {
    setConversationId(id);
    setOtherUser(user);

    if (isMobile) {
      setShowSidebar(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/loginPage");
  };

  if (!currentUser) return <div>{t("unauthorized")}</div>;

  return (
    <SocketProvider>
      <div className={styles.chatPage}>
        {!isMobile && (
          <img
            src={SidebarImage}
            className={styles.sidebarImage}
            alt="Sidebar"
          />
        )}

        <div className={styles.chatContainer}>
          <div className={styles.logoutContainer}>
            <div className={styles.currentUser}>
              {isMobile && otherUser && !showSidebar && (
                <button className={styles.backButton} onClick={goBackToSidebar}>
                  ☰
                </button>
              )}
              <Avatar
                initial={currentUser.fullName[0]}
                variant={AvatarVariant.SMALL}
              />
              {currentUser.fullName}
            </div>

            <Button
              onClick={handleLogout}
              variant={ButtonVariantEnum.PRIMARY}
              size={ButtonSizeEnum.MD}
            >
              {t("logout")}
            </Button>
          </div>

          <div className={styles.chatContent}>
            {showSidebar && (
              <ChatSidebar
                contacts={contacts}
                onSelectConversation={handleSelectConversation}
              />
            )}

            {otherUser ? (
              <Messagebar
                currentUser={currentUser}
                otherUser={otherUser}
                conversationId={conversationId}
                onBack={isMobile ? goBackToSidebar : undefined}
              />
            ) : (
              !isMobile && (
                <div className={styles.emptyMessagebar}>
                  <p>{t("chat.selectConversation")}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </SocketProvider>
  );
};

export default MessengerChat;
