import UserConversation from '../models/UserConversation';
import { IGenericRepository } from './genericRepositoryInterface';

export class UserConversationRepository implements IGenericRepository<UserConversation> {
  public addAsync = async (data: any): Promise<void> => {
    try {
      await UserConversation.create(data);
    } catch (error) {
      console.error('Error in addAsync:', error);
      throw new Error(`Failed to add userConversation`);
    }
  };
  public getAllAsync = async (): Promise<UserConversation[]> => {
    try {
      return await UserConversation.findAll();
    } catch (error) {
      console.error('Error in getAllAsync:', error);
      throw new Error(`Failed to get all userConversation`);
    }
  };
  public getByIdAsync = async (id: string): Promise<UserConversation | null> => {
    try {
      return await UserConversation.findByPk(id);
    } catch (error) {
      console.error('Error in getByIdAsync:', error);
      throw new Error(`Failed to get the userConversation`);
    }
  };
  public getByUser_IdAndConversation_Id = async (userId:string , conversationId:string) => {
    return await UserConversation.findOne({
      where:{
        userId,
        conversationId
      }
    })
   }
  public deleteAsync = async (entity: UserConversation): Promise<void> => {
    try {
      await UserConversation.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in deleteAsync:', error);
      throw new Error(`Failed to delete userConversation`);
    }
  };
  public updateAsync = async (entity: UserConversation): Promise<void> => {
    try {
      await entity.save();
    } catch (error) {
      console.error('Error in updateAsync:', error);
      throw new Error(`Failed to update userConversation`);
    }
  };
}
