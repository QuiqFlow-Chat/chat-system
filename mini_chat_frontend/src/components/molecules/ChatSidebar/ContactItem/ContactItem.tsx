import React from "react";
import { useTranslation } from "react-i18next";
import Avatar, { AvatarVariant } from "@/components/atoms/Avatar/Avatar";
import styles from "./ContactItem.module.css";
import UserName, { UserNameSizeEnum } from "@/components/atoms/UserName/UserName";

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
}

const ContactItem: React.FC<ContactItemProps> = ({
  user,
  time,
  onClick,
}) => {
  const { t } = useTranslation();

  const formattedTime = time
    ? `${new Date(time).getHours().toString().padStart(2, "0")} ${t("chatSidebar.timeUnit")}`
    : "";

  return (
    <div className={styles.contactItem} onClick={onClick}>
      <div className={styles.contactDetails}>
        <Avatar initial={user.fullName[0]} variant={AvatarVariant.LARGE} />
        <div className={styles.contactInfo}>
          <div className={styles.contactName}>
          <UserName name={user.fullName} size={UserNameSizeEnum.LG} />
          </div>
          <div className={styles.contactEmail}>{user.email}</div>
        </div>
      </div>
      <div className={styles.contactTime}>{formattedTime}</div>
    </div>
  );
};

export default ContactItem;
