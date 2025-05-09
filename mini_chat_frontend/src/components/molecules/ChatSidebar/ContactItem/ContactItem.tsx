// src/components/molecules/ChatSidebar/ContactItem/ContactItem.tsx

import React from "react";
import Avatar from "../../../atoms/Avatar/Avatar";
import styles from "./ContactItem.module.css";

interface ContactItemProps {
  user: {
    email: string;
    fullName: string;
    id: string;
    lastActivity: string;
  };
  time: string;
  color?: string;
  onClick?: () => void;
  // conversationId:string
}

const ContactItem: React.FC<ContactItemProps> = ({
  // conversationId,
  user,
  time,
  color = "#f1416c",
  onClick,
}

) => {
  const formattedTime = time
  ? `${new Date(time).getHours().toString().padStart(2, "0")} hrs`
  : "";
  return (
    <div className={styles.contactItem} onClick={onClick}>
      <div className={styles.contactDetails}>
        <Avatar initial={user.fullName[0] || "U"} backgroundColor={color} />
        <div className={styles.contactInfo}>
          <div className={styles.contactName}>{user.fullName}</div>
          {/* <div className={styles.contactName}>{id}</div> */}
          <div className={styles.contactEmail}>{user.email}</div>
        </div>
      </div>
      <div className={styles.contactTime}>{formattedTime}</div>
    </div>
  );
};
export default ContactItem;