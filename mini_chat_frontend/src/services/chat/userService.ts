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

export const getUserConversations = async (
  page: number,
  limit: number
): Promise<Conversation[]> => {
  const response = await apiGet<{ data: { data: Conversation[] } }>(
    `/getUserConversations`,
    {
      params: { page, limit },
    }
  );

  return response.data.data;
};


export const getAllUsers = async (
  page: number,
  limit: number
): Promise<GetAllUsersResponse[]> => {
  const response = await apiGet<{ data: { data: GetAllUsersResponse[] } }>(
    `/getAllUsers`,
    {params: { page, limit },}
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
