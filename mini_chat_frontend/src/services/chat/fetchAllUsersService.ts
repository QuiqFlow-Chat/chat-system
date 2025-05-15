import { SidebarContact } from '@/types/chatTypes';
import { getAllUsers, getConversationId } from '@/services/chat/userService';

export const fetchAllUsers = async (): Promise<SidebarContact[]> => {
  const users = await getAllUsers();

  const usersWithConversations = await Promise.all(
    users.map(async (user) => {
      try {
        const conversationId = await getConversationId(user);
        return {
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
          },
          conversationId,
          lastMessageTime: "",
        };
      } catch (error) {
        console.error(`Failed to get conversationId for user ${user.id}:`, error);
        return {
          user: {
            id: user.id,
            email: user.email,
            fullName: user.fullName,
          },
          conversationId: "",
          lastMessageTime: "",
        };
      }
    })
  );

  return usersWithConversations;
};
