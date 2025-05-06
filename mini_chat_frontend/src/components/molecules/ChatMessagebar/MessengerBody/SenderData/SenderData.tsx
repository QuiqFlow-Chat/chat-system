import React from "react";
import styles from "./SenderData.module.css";
import Avatar from "../../../../atoms/Avatar/Avatar";
import UserName from "../../../../atoms/UserName/UserName";

interface SenderDataProps {
  name: string;
  time: string;
  color?: string;
  imgSrc?: string | null;
  reverseOrder?: boolean;
}

const SenderData: React.FC<SenderDataProps> = ({
  name,
  time,
  color = "#f1416c",
  imgSrc = null,
  reverseOrder = false,
}) => {
  const avatarContent = imgSrc ? (
    <div className={`${styles.avatarWrapper} ${styles.small}`}>
      <img src={imgSrc} alt={name} />
    </div>
  ) : (
      <Avatar initial={name[0]} backgroundColor={color} className={styles.small} />
  );

  return (
    <div className={`${styles.senderData} ${reverseOrder ? styles.reverse : ""}`}>
    {avatarContent}
    <div className={`${styles.userDetails} ${reverseOrder ? styles.userDetailsReverse : ""}`}>
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
