export interface IUserConversationRepository<UserConversation> {
  add(data: unknown): Promise<void>;
  getAll(): Promise<UserConversation[]>;
  getById(id: string): Promise<UserConversation | null>;
  getByUser_IdAndConversation_Id(
    userId: string,
    conversationId: string
  ): Promise<UserConversation | null>;
  delete(entity: UserConversation): Promise<void>;
}
