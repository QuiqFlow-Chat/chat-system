export interface IConversationAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConversationGetByParameter {
  conversationId: string;
}
