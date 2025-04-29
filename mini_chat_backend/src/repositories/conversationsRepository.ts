import Conversation from '../models/Conversation';
import Message from '../models/Message';
import User from '../models/User';
import { IGenericRepository } from './genericRepositoryInterface';

export class ConversationsRepository implements IGenericRepository<Conversation> {
  async addAsync(data: any): Promise<void> {
    try {
      await Conversation.create(data);
    } catch (error) {
      console.error('Error in addAsync:', error);
      throw new Error(`Failed to add conversation`);
    }
  }
  async getAllAsync(): Promise<Conversation[]> {
    try {
      return await Conversation.findAll({
        include: [
          {
            model: Message,
            as: 'messages',
          },
          {
            model: User,
            as: 'users',
            through: { attributes: [] },
          },
        ],
      });
    } catch (error) {
      console.error('Error in getAllAsync:', error);
      throw new Error(`Failed to get all conversations`);
    }
  }
  async getByIdAsync(id: number): Promise<Conversation | null> {
    try {
      return await Conversation.findByPk(id, {
        include: [
          {
            model: Message,
            as: 'messages',
          },
          {
            model: User,
            as: 'users',
            through: { attributes: [] },
          },
        ],
      });
    } catch (error) {
      console.error('Error in getByIdAsync :', error);
      throw new Error(`Failed to get conversation`);
    }
  }
  async deleteAsync(entity: Conversation): Promise<void> {
    try {
      await Conversation.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in deleteAsync :', error);
      throw new Error(`Failed to destroy conversation`);
    }
  }
  async updateAsync(entity: Conversation): Promise<void> {
    try {
      await entity.save();
    } catch (error) {
      console.error('Error in updateAsync :', error);
      throw new Error(`Failed to update conversation`);
    }
  }
}
