import { useEffect, useRef, useState, useCallback } from "react";
import { apiPost } from "../utils/apiUtils";
import { debounce } from "lodash";
import { Message } from "../components/organisms/Chat/Messagebar/Messagebar";

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
}

interface PaginationResponse {
  data: RawMessage[];
  pagination: {
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

export const usePaginatedMessages = ({
  conversationId,
  currentUserId,
  receiverId,
}: UsePaginatedMessagesOptions) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const fetchMessages = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    setError(null);

    try {
      const response = await apiPost<{ data: PaginationResponse }>(
        `/getConversationMessages?page=1&limit=10`,
        { 
          senderId: currentUserId, 
          receiverId
        }
      );

      if (!response.data?.data) {
        throw new Error("Invalid response format from server");
      }

      const newMessages = response.data.data.map((msg: RawMessage): Message => ({
        type: msg.senderId === currentUserId ? "outgoing" : "incoming",
        name: msg.fullName || "User",
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: msg.content,
      }));

      setMessages((prev) => [...newMessages.reverse(), ...prev]);
      setHasMore(response.data.pagination.hasNextPage);
      setPage((prev) => prev + 1);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : "Failed to load messages";
      setError(errorMessage);
      console.error("Failed to fetch messages:", err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, conversationId, currentUserId, receiverId]);

  // Debounced scroll handler to prevent excessive API calls
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = debounce(() => {
      if (container.scrollTop === 0 && !loading && hasMore) {
        fetchMessages();
      }
    }, 200);

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      handleScroll.cancel();
    };
  }, [fetchMessages, loading, hasMore]);

  // Reset pagination and load first page when conversation changes
  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    
    // Small delay to ensure state updates are processed
    const timeoutId = setTimeout(() => {
      fetchMessages();
    }, 0);
    
    return () => clearTimeout(timeoutId);
  }, [conversationId, currentUserId, receiverId]);

  return { 
    messages, 
    containerRef, 
    loading, 
    error,
    hasMore 
  };
};