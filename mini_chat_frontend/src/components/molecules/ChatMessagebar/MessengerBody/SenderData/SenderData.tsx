import React from "react";
import styles from "./SenderData.module.css";
import Avatar, { AvatarVariant } from "@/components/atoms/Avatar/Avatar";
import UserName, { UserNameSizeEnum } from "@/components/atoms/UserName/UserName";

interface SenderDataProps {
  name: string;
  time: string;
  imgSrc?: string | null;
  reverseOrder?: boolean;
}

const SenderData: React.FC<SenderDataProps> = ({
  name,
  time,
  imgSrc = null,
  reverseOrder = false,
}) => {
  const avatarContent = imgSrc ? (
    <div className={styles.avatarWrapper}>
      <img src={imgSrc} alt={name} />
    </div>
  ) : (
    <Avatar 
      initial={name[0]} 
      variant={AvatarVariant.SMALL} 
    />
  );

  return (
    <div className={`${styles.senderData} ${reverseOrder ? styles.reverse : ""}`}>
      {avatarContent}
      <div
        className={styles.userDetails}
      >
        {reverseOrder ? (
          <>
            <div className={styles.messageTime}>{time}</div>
            <UserName name={name} size={UserNameSizeEnum.SM} />
          </>
        ) : (
          <>
            <UserName name={name} size={UserNameSizeEnum.SM} />
            <div className={styles.messageTime}>{time}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default SenderData;
