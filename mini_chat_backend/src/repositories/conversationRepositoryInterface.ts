export interface IConversationRepository<Conversation> {
  add(data: any): Promise<Conversation>;
  getAll(): Promise<Conversation[]>;
  getById(id: string): Promise<Conversation | null>;
  delete(entity: Conversation): Promise<void>;
}
