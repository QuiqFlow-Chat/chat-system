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
// \?page=${page}&limit=${limit}
export const getUserConversations = async (): Promise<Conversation[]> => {
  const response = await apiGet<{ data: { data: Conversation[] } }>(
    `/getUserConversations`
  );

  return response.data.data;
};

export const getAllUsers = async (): Promise<GetAllUsersResponse[]> => {
  const response = await apiGet<{ data: { data: GetAllUsersResponse[] } }>(
    `/getAllUsers?page=1&limit=50`
  );
  return response.data.data;
};


export const getConversationId = async (  
  user: any,
): Promise<string> => {
  const response = await apiGet<{ data: string }>(
    `${user.id}/checkOrCreateNewConversation`
  );
  console.log("getConversationId**",response)
  return response.data;
};
