import { SidebarContact } from '@/types/chatTypes';
import { getAllUsers } from '@/services/chat/userService';

export const fetchAllUsers = async (): Promise<SidebarContact[]> => {
  const users = await getAllUsers();

  return users.map((user) => ({
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    },
    conversationId: "",
    lastMessageTime: "", 
  }));
};
