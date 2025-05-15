export interface IUserConversationRepository<UserConversation> {
  add(data: unknown): Promise<void>;
  getAll(): Promise<UserConversation[]>;
  getById(id: string): Promise<UserConversation | null>;
  delete(entity: UserConversation): Promise<void>;
  getSharedConversation(senderId: string, receiverId: string): Promise<UserConversation[] | null>;
}
