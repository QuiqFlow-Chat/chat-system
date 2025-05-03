import React from "react";
import styles from "./UserName.module.css";

type UserNameProps = {
  name: string;
};

const UserName: React.FC<UserNameProps> = ({ name }) => {
  return <span className={styles.userName}>{name}</span>;
};

export default UserName;
