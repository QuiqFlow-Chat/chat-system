export interface ConversationGetByParameter {
  id: string;
}

export interface ConversationMessagesGetByParameters {
  senderId: string;
  receiverId: string;
}

export interface Messages {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}