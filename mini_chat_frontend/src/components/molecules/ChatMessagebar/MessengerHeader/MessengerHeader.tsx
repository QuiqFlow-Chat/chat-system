import React, { useEffect, useState } from "react";
import styles from "./MessengerHeader.module.css";
import UserName from "../../../atoms/UserName/UserName";
import { useSocket } from "../../../../contexts/SocketContext";
//import { User } from "../../../../shared/dtosInterfaces/userDtos";

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
    if (!socket || !user.id) return;
  
    socket.on("userOnline", (onlineUser: { id: string }) => {
      if (onlineUser.id === user.id) {
        setStatus("online");
      }
    });
  
    socket.on("userOffline", (offlineUser: { id: string }) => {
      if (offlineUser.id === user.id) {
        setStatus("offline");
      }
    });
  
    return () => {
      socket.off("userOnline");
      socket.off("userOffline");
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