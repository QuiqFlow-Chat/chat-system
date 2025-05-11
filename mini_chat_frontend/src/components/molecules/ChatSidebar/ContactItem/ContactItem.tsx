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
  color ,
  onClick,
}

) => {

  const colors = [
    "#FF6B6B", // Pink Red
    "#6BCB77", // Soft Green
    "#4D96FF", // Bright Blue
    "#FFD93D", // Golden Yellow
    "#FF7F50", // Coral
    "#A66DD4", // Light Purple
    "#00C49A", // Aqua Green
    "#FFA07A", // Peach
    "#2ECC71", // Emerald Green
    "#3498DB", // Sky Blue
  ];
  // Hash function to generate consistent index from string (e.g., user.id)
  // const getColorFromId = (id: string) => {
  //   let hash = 0;
  //   for (let i = 0; i < id.length; i++) {
  //     hash = id.charCodeAt(i) + ((hash << 5) - hash);
  //   }
  //   return colors[Math.abs(hash) % colors.length];
  // };

  // const backgroundColor = color || getColorFromId(user.id);

  const formattedTime = time
    ? `${new Date(time).getHours().toString().padStart(2, "0")} hrs`
    : "";

  return (
    <div className={styles.contactItem} onClick={onClick}>
      <div className={styles.contactDetails}>
        <Avatar 
        initial={user.fullName[0] || "U"} 
        // backgroundColor={backgroundColor} 
        />
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