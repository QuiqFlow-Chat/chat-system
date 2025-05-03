import React, { useEffect, useState } from "react";
import styles from "./MessengerChat.module.css";
import ChatSidebar from "../../organisms/Chat/Sidebar/ChatSidebar";
import Messagebar from "../../organisms/Chat/Messagebar/Messagebar";

export interface Contact {
  name: string;
  email: string;
  time: string;
  color: string;
}

const dummyContacts: Contact[] = [
  {
    name: "Melody Macy",
    email: "melody@altbox.com",
    time: "20 hrs",
    color: "#6c5ce7",
  },
  {
    name: "Farah N.",
    email: "farah@domain.com",
    time: "5 hrs",
    color: "#00cec9",
  },
  {
    name: "Tariq Ameen",
    email: "tariq@netcloud.com",
    time: "2 hrs",
    color: "#fd79a8",
  },
  {
    name: "Layla M.",
    email: "layla@techwave.io",
    time: "1 hr",
    color: "#e17055",
  },
  {
    name: "Omar Khaled",
    email: "omar@softpulse.org",
    time: "just now",
    color: "#0984e3",
  },
];

const MessengerChat: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    // 🧪 مؤقت: استخدم dummy data
    // لاحقًا: استبدل بـ API call
    setContacts(dummyContacts);

    // مثال على استخدام axios مستقبلاً:
    // axios.get('/api/contacts').then((res) => setContacts(res.data));
  }, []);

  return (
    <div className={styles.chatContainer}>
      <ChatSidebar contacts={contacts} />
      <div className={styles.chatMain}>
        <Messagebar />
      </div>
    </div>
  );
};

export default MessengerChat;
