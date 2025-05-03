// src/components/molecules/ChatSidebar/ContactItem/ContactItem.tsx

import React from "react";
import Avatar from "../../../atoms/Avatar/Avatar";
import styles from "./ContactItem.module.css";

interface ContactItemProps {
  name: string;
  email: string;
  time: string;
  color?: string;
}

const ContactItem: React.FC<ContactItemProps> = ({
  name,
  email,
  time,
  color = "#f1416c",
}) => {
  return (
    <div className={styles.contactItem}>
      <div className={styles.contactDetails}>
        <Avatar initial={name[0] || "U"} backgroundColor={color} />
        <div className={styles.contactInfo}>
          <div className={styles.contactName}>{name}</div>
          <div className={styles.contactEmail}>{email}</div>
        </div>
      </div>
      <div className={styles.contactTime}>{time}</div>
    </div>
  );
};

export default ContactItem;
