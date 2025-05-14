export interface IMessageRepository<Message> {
  add(data: unknown): Promise<Message>;
  getAll(): Promise<Message[]>;
  getById(id: string): Promise<Message | null>;
  getBySender_IdAndReceiver_Id(senderId: string, receiverId: string): Promise<Message | null>;
  getAllBySender_IdAndReceiver_Id(senderId: string, receiverId: string): Promise<Message[]>;
  delete(entity: Message): Promise<void>;
  update(entity: Message): Promise<void>;
}
