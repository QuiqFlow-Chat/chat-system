import { useEffect, useState } from "react";
import { RawMessage, getConversationMessages } from "@/services/chat/messageService";

export interface Message {
  type: "incoming" | "outgoing";
  time: string;
  message: string;
}

export const useMessagePagination = (
  conversationId: string,
  currentUserId: string,
  limit = 4
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMore(true);

    const loadInitialMessages = async () => {
      setLoading(true);
      try {
        const response = await getConversationMessages(conversationId, 1, limit);
        const fetchedMessages = response.data.data;

        const mappedMessages: Message[] = fetchedMessages.map((msg: RawMessage) => ({
          type: msg.senderId === currentUserId ? "outgoing" : "incoming",
          time: new Date(msg.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          message: msg.content,
        }));

        setMessages(mappedMessages.reverse());
        setPage(2);
        setHasMore(fetchedMessages.length === limit);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialMessages();
  }, [conversationId]);

  const fetchMessages = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await getConversationMessages(conversationId, page, limit);
      const fetchedMessages = response.data.data;

      const mappedMessages: Message[] = fetchedMessages.map((msg: RawMessage) => ({
        type: msg.senderId === currentUserId ? "outgoing" : "incoming",
        time: new Date(msg.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        message: msg.content,
      }));

      setMessages((prev) => [...mappedMessages.reverse(), ...prev]);
      setPage((prev) => prev + 1);
      setHasMore(fetchedMessages.length === limit);
    } catch (error) {
      console.error("Error fetching more messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const addMessage = (msg: Message) => {
    setMessages((prev) => [...prev, msg]);
  };

  return { messages, fetchMessages, hasMore, loading, addMessage };
};

