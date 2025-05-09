import React, { useEffect, useState } from "react";
import styles from "./MessengerHeader.module.css";
import UserName from "../../../atoms/UserName/UserName";
import { useSocket } from "../../../../contexts/SocketContext";

type MessengerHeaderProps = {
  user: {
    id: string;
    fullName: string;
  };
};

const MessengerHeader: React.FC<MessengerHeaderProps> = ({ user }) => {
  const socket = useSocket();
  const [status, setStatus] = useState<string>("offline");

  useEffect(() => {
    if (!user?.id || !socket) return;

    // 1. Initial status check
    socket.emit("getOnlineUsers", {}, (onlineUsers: string[]) => {
      if (Array.isArray(onlineUsers) && onlineUsers.includes(user.id)) {
        console.log("User is online:", user.id);
        setStatus("online");
      } else {
        setStatus("offline");
      }
    });

    // 2. Listen for real-time status changes
    const handleUserOnline = (onlineUser: { id: string }) => {
      if (onlineUser.id === user.id) setStatus("online");
    };
    const handleUserOffline = (offlineUser: { id: string }) => {
      if (offlineUser.id === user.id) setStatus("offline");
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
            ></span>
            <span className={styles.statusText}>{status}</span>
          </div>
        </div>
      </div>
      <div className={styles.messengerToolbar}>
        <div className={styles.dropdownMenu}>
          <button className={styles.menuTrigger}>
            <i className="fa-solid fa-ellipsis"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessengerHeader;