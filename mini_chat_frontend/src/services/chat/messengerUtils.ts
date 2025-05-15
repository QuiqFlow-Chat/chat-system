import { userStorage } from "@/utils/localStorageUtil";
import { getUserConversations } from "@/services/chat/userService";
import { TFunction } from "i18next";

export interface User {
  id: string;
  email: string;
  fullName: string;
}

export interface SidebarContact {
  user: User;
  conversationId: string;
  lastMessageTime: string;
}

export const loadUserAndContacts = async (
  t: TFunction
): Promise<{ currentUser: User | null; contacts: SidebarContact[] }> => {
  const loadedUser = userStorage.load();
  if (!loadedUser) return { currentUser: null, contacts: [] };

  try {
    const conversations = await getUserConversations(loadedUser.id );

    const formattedContacts: SidebarContact[] = conversations.map((conv) => {
      const other = conv.users.find((u: User) => u.id !== loadedUser.id)!;
      const lastMessage = conv.messages?.[conv.messages.length - 1];

      return {
        user: other,
        conversationId: conv.id,
        lastMessageTime: lastMessage?.createdAt || t("noMessages"),
      };
    });

    return { currentUser: loadedUser, contacts: formattedContacts };
  } catch (error) {
    console.error("Failed to fetch conversations:", error);
    return { currentUser: loadedUser, contacts: [] };
  }
};
