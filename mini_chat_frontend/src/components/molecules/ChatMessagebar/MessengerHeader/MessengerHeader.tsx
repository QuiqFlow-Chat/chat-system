// src/components/molecules/MessengerHeader/MessengerHeader.tsx
import React, { useEffect, useState } from "react";
import styles from "./MessengerHeader.module.css";
import UserName from "../../../atoms/UserName/UserName";
import { useSocket } from "../../../../contexts/SocketContext";
import { useTranslation } from "react-i18next";

interface MessengerHeaderProps {
  user: {
    id: string;
    fullName: string;
  };
}

const MessengerHeader: React.FC<MessengerHeaderProps> = ({ user }) => {
  const socket = useSocket();
  const { t } = useTranslation();
  const [status, setStatus] = useState<"Online" | "Offline">("Offline");

  useEffect(() => {
    if (!user?.id || !socket) return;

    // Initial status check
    socket.emit("getOnlineUsers", {}, (onlineUsers: string[]) => {
      if (Array.isArray(onlineUsers) && onlineUsers.includes(user.id)) {
        setStatus("Online");
      } else {
        setStatus("Offline");
      }
    });

    const handleUserOnline = (onlineUser: { id: string }) => {
      if (onlineUser.id === user.id) setStatus("Online");
    };

    const handleUserOffline = (offlineUser: { id: string }) => {
      if (offlineUser.id === user.id) setStatus("Offline");
    };

    socket.on("userOnline", handleUserOnline);
    socket.on("userOffline", handleUserOffline);

    return () => {
      socket.off("userOnline", handleUserOnline);
      socket.off("userOffline", handleUserOffline);
    };
  }, [socket, user?.id]);

  return (
    <div className={styles.messengerHeader}>
      <div className={styles.messengerTitle}>
        <div className={styles.activeUser}>
          <UserName name={user.fullName} />
          <div className={styles.userStatus}>
            <span
              className={`${styles.statusIndicator} ${styles[status]}`}
              aria-label={t(status.toLowerCase())}
            ></span>
            <span className={styles.statusText}>{t(status.toLowerCase())}</span>
          </div>
        </div>
      </div>
      <div className={styles.messengerToolbar}>
        <div className={styles.dropdownMenu}>
          <button className={styles.menuTrigger} aria-label="Menu">
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessengerHeader;
