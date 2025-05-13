import React from "react";
import styles from "./SenderData.module.css";
import Avatar, { AvatarVariant } from "../../../../atoms/Avatar/Avatar";
import UserName from "../../../../atoms/UserName/UserName";

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
        className={`${styles.userDetails} ${
          reverseOrder ? styles.userDetailsReverse : ""
        }`}
      >
        {reverseOrder ? (
          <>
            <div className={styles.messageTime}>{time}</div>
            <UserName name={name} />
          </>
        ) : (
          <>
            <UserName name={name} />
            <div className={styles.messageTime}>{time}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default SenderData;
