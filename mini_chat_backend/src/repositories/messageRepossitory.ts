import Message from '../models/Message';
import { IGenericRepository } from './genericRepositoryInterface';

export class MessageRepository implements IGenericRepository<Message> {
  async addAsync(data: any): Promise<void> {
    try {
      await Message.create(data);
    } catch (error) {
      console.error('Error in addAsync:', error);
      throw new Error(`Failed to add message`);
    }
  }
  async getAllAsync(): Promise<Message[]> {
    try {
      return await Message.findAll();
    } catch (error) {
      console.error('Error in getAllAsync:', error);
      throw new Error(`Failed to get all messages`);
    }
  }
  async getByIdAsync(id: number): Promise<Message | null> {
    try {
      return await Message.findByPk(id);
    } catch (error) {
      console.error('Error in getByIdAsync:', error);
      throw new Error(`Failed to get the message`);
    }
  }
  async deleteAsync(entity: Message): Promise<void> {
    try {
      await Message.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in deleteAsync:', error);
      throw new Error(`Failed to delete message`);
    }
  }
  async updateAsync(entity: Message): Promise<void> {
    try {
      await entity.save();
    } catch (error) {
      console.error('Error in updateAsync:', error);
      throw new Error(`Failed to update message`);
    }
  }
}
