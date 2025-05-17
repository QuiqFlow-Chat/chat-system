import { SidebarContact } from '@/types/chatTypes';
import { getAllUsers } from '@/services/chat/userService';

export const fetchAllUsers = async (
  page: number,
  limit: number
): Promise<SidebarContact[]> => {
  const users = await getAllUsers(page, limit);

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
