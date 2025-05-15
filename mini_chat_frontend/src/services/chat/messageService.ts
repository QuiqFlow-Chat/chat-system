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
  // page: number,
  conversationId: string,
): Promise<PaginationResponse> => {
  const response = await apiGet<{ data: PaginationResponse }>(
    `${conversationId}/getConversationMessages`,

  );
  return response.data;
};
