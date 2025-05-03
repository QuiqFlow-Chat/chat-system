import React, { useState } from "react";
import styles from "./MessengerFooter.module.css";

interface MessengerFooterProps {
  onSend: (message: string) => void;
}

const MessengerFooter: React.FC<MessengerFooterProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const trimmed = message.trim();
    if (trimmed) {
      onSend(trimmed);
      setMessage("");

      const typingIndicator = document.getElementById("typing-indicator");
      if (typingIndicator) typingIndicator.style.display = "none";
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);

    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) {
      const shouldShow = value.trim() !== "";
      typingIndicator.style.display = shouldShow ? "flex" : "none";
      if (shouldShow) {
        typingIndicator.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.messengerFooter}>
      <textarea
        className={styles.messageInput}
        placeholder="Type a message"
        value={message}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        rows={2}
      />
      <div className={styles.messageToolbar}>
        <button className="send-button" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessengerFooter;
