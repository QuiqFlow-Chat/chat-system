import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { Message } from "../components/organisms/Chat/Messagebar/Messagebar";
import { useSocket, MessageReceivePayload } from "../contexts/SocketContext";
import { getConversationMessages } from "../services/messageService";

interface RawMessage {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  fullName: string;
}

interface UsePaginatedMessagesOptions {
  conversationId: string;
  currentUserId: string;
  receiverId: string;
  otherUserName: string;
}

export const usePaginatedMessages = ({
  conversationId,
  currentUserId,
  receiverId,
  otherUserName,
}: UsePaginatedMessagesOptions) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const pageRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const socket = useSocket();
  const conversationKeyRef = useRef(`${conversationId}-${receiverId}`);
  
  // Now a regular function, not wrapped in useCallback
  const fetchMessages = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setError(null);
    try {
      const response = await getConversationMessages(pageRef.current, currentUserId, receiverId);
     
      console.log(response);
      if (response?.data && response?.pagination) {
        const newMessages = response.data.map((msg: RawMessage): Message => ({
          type: msg.senderId === currentUserId ? "outgoing" : "incoming",
          name: msg.senderId === currentUserId ? "You" : otherUserName,
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          message: msg.content,
        }));
        setMessages((prev) => [...newMessages.reverse(), ...prev]);
        setHasMore(response.pagination.hasNextPage);
        pageRef.current += 1;
      } else {
        setError("Invalid response format");
      }
    } catch (err) {
      setError("Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const newKey = `${conversationId}-${receiverId}`;
    if (conversationKeyRef.current !== newKey) {
      // إذا تغيرت المحادثة، أعمل ريست
      conversationKeyRef.current = newKey;
      pageRef.current = 1;
      setMessages([]);
      setHasMore(true);
      setError(null);
      fetchMessages();
    }
  }, [conversationId, receiverId]);

  useEffect(() => {
    if(messages){
      fetchMessages();
    }
    const timeout = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;
      const handleScroll = debounce(() => {
        if (container.scrollTop <= 10 && !loading && hasMore) {
          fetchMessages();
        }
      }, 200);
      // container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
        handleScroll.cancel();
      };
    }, 100); // تأخير بسيط لضمان جاهزية الـ ref
    return () => clearTimeout(timeout);
   }, [containerRef, fetchMessages, loading, hasMore, receiverId]);

  useEffect(() => {
    if (!socket || !currentUserId || !receiverId || !conversationId) return;
    const handleReceiveMessage = (data: MessageReceivePayload) => {
      const isSender = data.senderId === currentUserId;
      const name = isSender ? "You" : otherUserName;
      const newMessage: Message = {
        type: isSender ? "outgoing" : "incoming",
        name,
        time: new Date(data.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: data.content,
      };
      setMessages((prev) => [...prev, newMessage]);
      // setTimeout(() => {
      //   bottomRef.current?.scrollIntoView({ behavior: "auto" });
      // }, 100);
    };
    socket.emit("userOnline", {
      id: currentUserId,
      receiverId,
      conversationId,
    });
    socket.on("receiveMessage", handleReceiveMessage);
    return () => {
      socket.emit("userOffline", {
        id: currentUserId,
        receiverId,
        conversationId,
      });
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket, currentUserId, receiverId, conversationId, otherUserName]);

  return {
    messages,
    containerRef,
    bottomRef,
    loading,
    error,
    hasMore,
  };
};
