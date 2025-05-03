import React from "react";
import styles from "./MessengerHeader.module.css";
import UserName from "../../../atoms/UserName/UserName";

type MessengerHeaderProps = {
  name: string;
  status: "active" | "idle" | "offline" | "dnd" | string;
};

const MessengerHeader: React.FC<MessengerHeaderProps> = ({
  name = "Unknown",
  status = "active",
}) => {
  return (
    <div className={styles.messengerHeader}>
      <div className={styles.messengerTitle}>
        <div className={styles.activeUser}>
          <UserName name={name} />
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
