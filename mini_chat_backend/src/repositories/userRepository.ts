import { Model } from 'sequelize-typescript';
import Message from '../models/Message';
import User from '../models/User';
import { IGenericRepository } from './genericRepositoryInterface';
import UserConversation from '../models/UserConversation';
import Conversation from '../models/Conversation';

export class UserRepository implements IGenericRepository<User> {
  async addAsync(data: any): Promise<void> {
    try {
      await User.create(data);
    } catch (error) {
      console.error('Error in addAsync:', error);
      throw new Error(`Failed to add user:`);
    }
  }
  async getAllAsync(): Promise<User[]> {
    try {
      return await User.findAll({
        include: [
          {
            model: Message,
            as: 'messages',
          },
          {
            model: Conversation,
            as: 'conversations',
            through: { attributes: [] },
          },
        ],
      });
    } catch (error) {
      console.error('Error in getAllAsync:', error);
      throw new Error(`Failed to get all users:`);
    }
  }
  async getByIdAsync(id: number): Promise<User | null> {
    try {
      return await User.findByPk(id, {
        include: [
          {
            model: Message,
            as: 'messages',
          },
          {
            model: Conversation,
            as: 'conversation',
            through: { attributes: [] },
          },
        ],
      });
    } catch (error) {
      console.error('Error in getByIdAsync:', error);
      throw new Error(`Failed to get the user `);
    }
  }
  async deleteAsync(entity: User): Promise<void> {
    try {
      await User.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in deleteAsync:', error);
      throw new Error(`Failed to destroy user`);
    }
  }
  async updateAsync(entity: User): Promise<void> {
    try {
      await entity.save();
    } catch (error) {
      console.error('Error in updateAsync:', error);
      throw new Error(`Failed to update user`);
    }
  }
}
