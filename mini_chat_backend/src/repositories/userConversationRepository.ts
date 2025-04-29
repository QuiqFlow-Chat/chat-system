import UserConversation from '../models/UserConversation';
import { IGenericRepository } from './genericRepositoryInterface';

export class UserConversationRepository implements IGenericRepository<UserConversation> {
  async addAsync(data: any): Promise<void> {
    try {
      await UserConversation.create(data);
    } catch (error) {
      console.error('Error in addAsync:', error);
      throw new Error(`Failed to add userConversation`);
    }
  }
  async getAllAsync(): Promise<UserConversation[]> {
    try {
      return await UserConversation.findAll();
    } catch (error) {
      console.error('Error in getAllAsync:', error);
      throw new Error(`Failed to get all userConversation`);
    }
  }
  async getByIdAsync(id: string): Promise<UserConversation | null> {
    try {
      return await UserConversation.findByPk(id);
    } catch (error) {
      console.error('Error in getByIdAsync:', error);
      throw new Error(`Failed to get the userConversation`);
    }
  }
  async deleteAsync(entity: UserConversation): Promise<void> {
    try {
      await UserConversation.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in deleteAsync:', error);
      throw new Error(`Failed to delete userConversation`);
    }
  }
  async updateAsync(entity: UserConversation): Promise<void> {
    try {
      await entity.save();
    } catch (error) {
      console.error('Error in updateAsync:', error);
      throw new Error(`Failed to update userConversation`);
    }
  }
}
