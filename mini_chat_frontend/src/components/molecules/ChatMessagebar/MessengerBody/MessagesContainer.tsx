// import React, { useEffect, useRef } from "react";
// import styles from "./MessagesContainer.module.css";
// import IncomingMessage from "./IncomingMessage/IncomingMessage";
// import OutgoingMessage from "./OutgoingMessage/OutgoingMessage";

// interface Message {
//   type: "incoming" | "outgoing";
//   name: string;
//   time: string;
//   color?: string;
//   message: string;
//   imgSrc?: string | null;
// }

// interface MessagesContainerProps {
//   messages: Message[];
//   isTyping: boolean;
// }

// const MessagesContainer: React.FC<MessagesContainerProps> = ({
//   messages,
//   isTyping,
// }) => {
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className={styles.messengerBody}>
//       <div className={styles.messagesContainer}>
//         {messages.map((msg, index) => {
//           if (msg.type === "incoming") {
//             return (
//               <IncomingMessage
//                 key={index}
//                 name={msg.name}
//                 time={msg.time}
//                 color={msg.color}
//                 message={msg.message}
//                 imgSrc={msg.imgSrc}
//               />
//             );
//           } else if (msg.type === "outgoing") {
//             return (
//               <OutgoingMessage
//                 key={index}
//                 name={msg.name}
//                 time={msg.time}
//                 color={msg.color}
//                 message={msg.message}
//                 imgSrc={msg.imgSrc}
//               />
//             );
//           }
//           return null;
//         })}

//         {/* Typing Indicator */}
//         {isTyping && (
//           <div className={styles.typingIndicator}>
//             <span className={styles.dot}></span>
//             <span className={styles.dot}></span>
//             <span className={styles.dot}></span>
//           </div>
//         )}

//         {/*  Scroll Anchor */}
//         <div ref={bottomRef} />
//       </div>
//     </div>
//   );
// };

// export default MessagesContainer;

import React, { useEffect, useState } from "react";
import styles from "./MessagesContainer.module.css";
import IncomingMessage from "./IncomingMessage/IncomingMessage";
import OutgoingMessage from "./OutgoingMessage/OutgoingMessage";
import { usePaginatedMessages } from "../../../../hooks/usePaginatedMessages";
import { useSocket } from "../../../../contexts/SocketContext";
import { MessageReceivePayload } from "../../../../contexts/SocketContext";

interface Message {
  type: "incoming" | "outgoing";
  name: string;
  time: string;
  message: string;
}

interface MessagesContainerProps {
  conversationId: string;
  currentUserId: string;
  isTyping: boolean;
}

const MessagesContainer: React.FC<MessagesContainerProps> = ({
  conversationId,
  currentUserId,
  isTyping,
}) => {
  const socket = useSocket();
  const {
    messages: paginatedMessages,
    containerRef,
    loading,
  } = usePaginatedMessages({ conversationId, currentUserId });

  const [messages, setMessages] = useState<Message[]>(paginatedMessages);

  useEffect(() => {
    setMessages(paginatedMessages);
  }, [paginatedMessages]);

  useEffect(() => {
    const handleReceiveMessage = (data: MessageReceivePayload) => {
      const newMsg: Message = {
        type: data.senderId === currentUserId ? "outgoing" : "incoming",
        name: data.fullName,
        time: new Date(data.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: data.content,
      };

      setMessages((prev) => [...prev, newMsg]);
    };

    socket.emit("userOnline", {
      userId: currentUserId,
      conversationId,
    });

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.emit("userOffline", {
        userId: currentUserId,
        conversationId,
      });
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, currentUserId, conversationId]);

  return (
    <div className={styles.messengerBody} ref={containerRef}>
      <div className={styles.messagesContainer}>
        {loading && <div className={styles.loading}>Loading...</div>}
        {messages.map((msg, index) =>
          msg.type === "incoming" ? (
            <IncomingMessage
              key={index}
              name={msg.name}
              time={msg.time}
              message={msg.message}
            />
          ) : (
            <OutgoingMessage
              key={index}
              name={msg.name}
              time={msg.time}
              message={msg.message}
            />
          )
        )}

        {isTyping && (
          <div className={styles.typingIndicator}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesContainer;
