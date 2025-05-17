// src/components/molecules/MessengerFooter/MessengerFooter.tsx
import React, { useState, useRef } from "react";
import styles from "./MessengerFooter.module.css";
import { ThemeEnum } from "@/shared/enums/ui.enums";
import Button, {
  ButtonSizeEnum,
  ButtonVariantEnum,
} from "@/components/atoms/Button/Button";
import Input, { InputVariantEnum } from "@/components/atoms/Input/Input";
import { useTranslation } from "react-i18next";

interface MessengerFooterProps {
  onSend: (message: string) => void;
  onTyping: () => void;
}

const MessengerFooter: React.FC<MessengerFooterProps> = ({
  onSend,
  onTyping,
}) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed) {
      onSend(trimmed);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    } else {
      onTyping();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    onTyping();
  };

  return (
    <div className={styles.messengerFooter}>
      <div className={styles.inputGroup}>
        <Input
          ref={inputRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          theme={ThemeEnum.LIGHT}
          variant={InputVariantEnum.MESSAGE}
          placeholder={t("chat.messageInputPlaceholder")}
        />
        <Button
          onClick={handleSend}
          isDisabled={!message.trim()}
          variant={ButtonVariantEnum.PRIMARY}
          size={ButtonSizeEnum.MD}
        >
          {t("chat.sendButton")}
        </Button>
      </div>
    </div>
  );
};

export default MessengerFooter;
