// src/components/molecules/ChatSidebar/ContactItem/ContactItem.tsx

import React from "react";
import Avatar from "../../../atoms/Avatar/Avatar";
import styles from "./ContactItem.module.css";
import { MessageGetByParameter } from "../../../../shared/dtosInterfaces/messageDtos";

interface ContactItemProps {
  user: MessageGetByParameter;  
  time: string;
  color?: string;
  onClick?: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({
  user,
  time,
  color = "#f1416c",
  onClick,
}) => {
  return (
    <div className={styles.contactItem} onClick={onClick}>
      <div className={styles.contactDetails}>
        <Avatar initial={user.fullName[0] || "U"} backgroundColor={color} />
        <div className={styles.contactInfo}>
          <div className={styles.contactName}>{user.fullName}</div> 
          <div className={styles.contactEmail}>{user.email}</div>  
        </div>
      </div>
      <div className={styles.contactTime}>{time}</div>
    </div>
  );
};

export default ContactItem;
