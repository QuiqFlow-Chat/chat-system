export interface IMessageAttributes {
  id: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  isRead: boolean;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageCreateParameters {
  senderId: string;
  receiverId: string;
  content: string;
}

export interface IMessageCreateFullParameters {
  senderId: string;
  receiverId: string;
  conversationId: string;
  content: string;
}

export interface IMessageGetByParameter {
  id: string;
}

export interface IMessageUpdateParameters {
  id: string;
  content: string;
}
