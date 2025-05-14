
export interface IConversationAttributes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IConversationGetByParameter {
  id: string;
}

export interface IConversationMessagesGetByParameters {
  senderId: string;
  receiverId: string;
}
