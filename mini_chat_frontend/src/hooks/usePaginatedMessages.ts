import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
import { useSocket, MessageReceivePayload } from "../contexts/SocketContext";
import { getConversationMessages } from "../services/chat/messageService";
import { Message } from "@/types/chatTypes";

interface RawMessage {
  content: string;
  createdAt: string;
  fullName: string;
  id: string;
  receiverId: string;
  senderId: string;
}

interface UsePaginatedMessagesOptions {
  conversationId: string;
  currentUserId: string;
  otherUserName: string;
  receiverId: string;
}

export const usePaginatedMessages = ({
  conversationId,
  currentUserId,
  otherUserName,
  receiverId,
}: UsePaginatedMessagesOptions) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<any[]>([]); // To store conversation list
  const pageRef = useRef(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const socket = useSocket();
  const isInitialFetch = useRef(true);

  const fetchMessages = async () => {
    if (loading || (!hasMore && !isInitialFetch.current)) return;
  
    setLoading(true);
    setError(null);
  
    try {
      const response = await getConversationMessages(conversationId);
      if (response.data && response.pagination) {
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
    } catch {
      setError("Error fetching messages");
    } finally {
      setLoading(false);
      isInitialFetch.current = false;
    }
  };
  
  useEffect(() => {
    // Reset state when conversation or receiver changes
    setMessages([]);
    setHasMore(true);
    setError(null);
    pageRef.current = 1;
    isInitialFetch.current = true; 
    fetchMessages(); // Always fetch messages when these change
  }, [conversationId, receiverId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
  
    const handleScroll = debounce(() => {
      if (container.scrollTop === 0 && !loading && hasMore && !isInitialFetch.current) {
        fetchMessages();
      }
    }, 200);
  
    container.addEventListener("scroll", handleScroll);
  
    return () => {
      container.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [loading, hasMore, receiverId]);

  useEffect(() => {
    if (socket) {
      console.log("Socket connected:", socket.connected);
      socket.onAny((event, ...args) => {
        console.log("Received event:", event, args);
      });
    }
  }, [socket]);
  
  useEffect(() => {
    if (!socket || !currentUserId || !receiverId || !conversationId) return;

    const handleReceiveMessage = (data: MessageReceivePayload) => {
      console.log({data})
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

      // Add the new message to the current conversation's list
      setMessages((prev) => [...prev, newMessage]);

      // Update conversation list if this is a new conversation
      showNewConversationIfNeeded(data);

      // Scroll to the bottom of the chat window when a new message arrives
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    };

    socket.emit("userOnline", {
      id: currentUserId,
      receiverId,
      conversationId,
    });
    
    // Always listen for new messages globally
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

  // Function to handle adding new conversations when they arrive
  const showNewConversationIfNeeded = (message: MessageReceivePayload) => {
    if (!conversations.some(convo => convo.id === message.conversationId)) {
      setConversations(prev => [
        ...prev,
        {
          id: message.conversationId,
          otherUserId: message.senderId,
          lastMessage: message.content,
        },
      ]);
    }
  };

  return {
    messages,
    containerRef,
    bottomRef,
    loading,
    error,
    hasMore,
    conversations, // Provide the conversations list if needed
  };
};
