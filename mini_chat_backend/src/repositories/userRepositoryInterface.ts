import Conversation from '../models/Conversation';

export interface IUserRepository<User> {
  add(data: unknown): Promise<void>;
  getAll(): Promise<User[]>;
  getUserConversations(id: string): Promise<Conversation[] | []>;
  getByEmail(email: string): Promise<User | null>;
  getById(id: string): Promise<User | null>;
  delete(entity: User): Promise<void>;
  update(entity: User): Promise<void>;
}
