export interface MessageCreateParameters {
  senderId: string;
  conversationId: string;
  content: string;
}

export interface MessageGetByParameter {
  id: string;
}

export interface MessageUpdateParameters {
  id: string;
  content: string;
  isRead: boolean;
}
