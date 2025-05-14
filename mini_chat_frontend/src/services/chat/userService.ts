import { User } from '@/types/chatTypes';
import { apiGet } from '@/services/api/requests';

export interface Message {
  createdAt: string;
}

export interface Conversation {
  id: string;
  users: User[];
  messages: Message[];
}

export interface GetAllUsersResponse {
  id: string;
  email: string;
  fullName: string;
}

export const getUserConversations = async (userId: string): Promise<Conversation[]> => {
  const response = await apiGet<{ data: { data: Conversation[] } }>(
    `/${userId}/getUserConversations`
  );
  return response.data.data;
};


export const getAllUsers = async (): Promise<GetAllUsersResponse[]> => {
  const response = await apiGet<{ data: { data: GetAllUsersResponse[] } }>(
    '/getAllUsers?page=1&limit=50'
  );
  return response.data.data;
};

