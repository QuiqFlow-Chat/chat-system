import { apiGet } from '@/services/api/requests';

export interface RawMessage {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: string;
  fullName: string;
}

export interface PaginationResponse {
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

export const getConversationMessages = async (
  conversationId: string,
): Promise<{
  status: string;
  message: string;
  data: PaginationResponse;
  timestamp: string;
}> => {
  const response = await apiGet<{
    status: string;
    message: string;
    data: PaginationResponse;
    timestamp: string;
  }>(`${conversationId}/getConversationMessages/?page=1&limit=10`);

  console.log("response", response);

  return response;
};

