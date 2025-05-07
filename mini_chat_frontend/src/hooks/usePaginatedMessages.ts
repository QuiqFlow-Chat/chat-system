// import { useState, useEffect, useRef, useCallback } from "react";
// import axios from "axios";
// import { Message } from "../components/page/MessengerChat/MessengerChat"; // عدل هذا المسار حسب مكان تعريف نوع Message
// interface PaginatedMessagesProps {
//   conversationId: string;
//   currentUserId: string;
// }

// export const usePaginatedMessages = ({
//   conversationId,
//   currentUserId,
// }: PaginatedMessagesProps) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [page, setPage] = useState(1);
//   const [hasNextPage, setHasNextPage] = useState(true);
//   const [loading, setLoading] = useState(false);

//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const fetchMessages = useCallback(async () => {
//     if (!hasNextPage || loading) return;

//     setLoading(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:3777/api/miniChat/getConversationMessages",
//         {
//           conversationId,
//           page,
//           limit: 20,
//         }
//       );

//       const fetched = response.data.data.data || [];

//       const formatted = fetched.map((msg: any) => ({
//         type: msg.senderId === currentUserId ? "outgoing" : "incoming",
//         name: "", // يمكنك إحضار الاسم إذا توفر
//         time: new Date(msg.createdAt).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         }),
//         color: msg.senderId === currentUserId ? "#0984e3" : "#6c5ce7",
//         message: msg.content,
//       }));

//       setMessages((prev) => [...formatted.reverse(), ...prev]);
//       setHasNextPage(response.data.data.pagination.hasNextPage);
//       setPage((prev) => prev + 1);
//     } catch (error) {
//       console.error("Failed to fetch messages", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [conversationId, currentUserId, page, hasNextPage, loading]);

//   const handleScroll = () => {
//     const container = containerRef.current;
//     if (!container || loading || !hasNextPage) return;

//     if (container.scrollTop < 100) {
//       fetchMessages();
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, [conversationId]);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     container.addEventListener("scroll", handleScroll);
//     return () => container.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   return { messages, setMessages, containerRef, loading };
// };

import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";

type RawMessage = {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
  fullName: string;
};

type Message = {
  type: "incoming" | "outgoing";
  name: string;
  time: string;
  message: string;
};

interface UsePaginatedMessagesOptions {
  conversationId: string;
  currentUserId: string;
}

export const usePaginatedMessages = ({
  conversationId,
  currentUserId,
}: UsePaginatedMessagesOptions) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchMessages = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await axios.post(
        `http://localhost:3777/api/miniChat/getConversationMessages`,
        {
          conversationId,
          page,
          limit: 20,
        }
      );

      const newMessages = res.data.data.data.map((msg: RawMessage) => ({
        type: msg.senderId === currentUserId ? "outgoing" : "incoming",
        name: msg.fullName || "User",
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: msg.content,
      }));

      setMessages((prev) => [...newMessages.reverse(), ...prev]);
      setHasMore(res.data.data.pagination.hasNextPage);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  }, [conversationId, currentUserId, page, loading, hasMore]);

  // Scroll handler
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      if (container.scrollTop === 0) {
        fetchMessages();
      }
    };

    container.addEventListener("scroll", onScroll);
    return () => container.removeEventListener("scroll", onScroll);
  }, [fetchMessages]);

  // Load first page
  useEffect(() => {
    fetchMessages();
  }, [conversationId]);

  return { messages, containerRef, loading };
};
