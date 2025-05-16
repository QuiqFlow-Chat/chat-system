import React from "react";
import styles from "./UserName.module.css";
import clsx from "clsx";

export enum UserNameSizeEnum {
  SM = "sm",
  MD = "md",
  LG = "lg",
}

interface UserNameProps {
  name: string;
  size?: UserNameSizeEnum; 
}

const UserName: React.FC<UserNameProps> = ({ name, size = UserNameSizeEnum.MD }) => {


  return (
    <span className={clsx(styles.userName, styles[size])}>
      {name}
    </span>
  );
};

export default UserName;
