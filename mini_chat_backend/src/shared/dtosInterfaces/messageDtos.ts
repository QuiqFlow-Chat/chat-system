export interface MessageCreateParameters {
  senderId: string;
  receiverId: string;
  content: string;
}

export interface MessageCreateFullParameters {
  senderId: string;
  receiverId: string;
  conversationId: string;
  content: string;
}

export interface MessageGetByParameter {
  id: string;
}

export interface MessageUpdateParameters {
  id: string;
  content: string;
}
