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
  };
}

export const getConversationMessages = async (
  conversationId: string,
  page: number,
  limit: number,
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
  }>(`${conversationId}/getConversationMessages`,
    {
      params: { page, limit },
    }
  );

  console.log("response", response);

  return response;
};

