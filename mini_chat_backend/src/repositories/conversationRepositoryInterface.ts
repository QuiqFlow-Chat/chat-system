export interface IConversationRepository<Conversation> {
  add(): Promise<Conversation>;
  getAll(): Promise<Conversation[]>;
  getById(id: string): Promise<Conversation | null>;
  delete(entity: Conversation): Promise<void>;
}
