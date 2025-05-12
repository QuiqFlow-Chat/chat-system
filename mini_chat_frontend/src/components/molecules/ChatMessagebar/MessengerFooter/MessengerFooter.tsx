import React, { useState, useRef} from "react";
import styles from "./MessengerFooter.module.css";
import Button from "../../../atoms/Button/Button";

interface MessengerFooterProps {
  onSend: (message: string) => void;
  onTyping: () => void; // Make sure this prop is being used
}

const MessengerFooter: React.FC<MessengerFooterProps> = ({ onSend, onTyping }) => {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    } else {
      // Call onTyping when user is typing
      onTyping();
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    // Call onTyping when input changes
    onTyping();
  };

  return (
    <div className={styles.messengerFooter}>
      <div className={styles.inputGroup}>
        <input
          ref={inputRef}
          type="text"
          className={styles.messageInput}
          placeholder="Type a message..."
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <Button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={!message.trim()}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default MessengerFooter;