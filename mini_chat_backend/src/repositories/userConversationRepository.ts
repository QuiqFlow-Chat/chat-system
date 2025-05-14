import UserConversation from '@/models/UserConversation';
import { IUserConversationAttributes } from '@/types/dtosInterfaces/userConversationDtos';
import { IUserConversationRepository } from '@/repositories/userConversationRepositoryInterface';
export class UserConversationRepository implements IUserConversationRepository<UserConversation> {
  public add = async (data: unknown): Promise<void> => {
    try {
      await UserConversation.create(data as IUserConversationAttributes);
    } catch (error) {
      console.error('Error in add user conversation:', error);
      throw new Error(`Failed to add userConversation`);
    }
  };
  public getAll = async (): Promise<UserConversation[]> => {
    try {
      return await UserConversation.findAll();
    } catch (error) {
      console.error('Error in get all conversations:', error);
      throw new Error(`Failed to get all userConversation`);
    }
  };
  public getById = async (id: string): Promise<UserConversation | null> => {
    try {
      return await UserConversation.findByPk(id);
    } catch (error) {
      console.error('Error in get userConversation by id:', error);
      throw new Error(`Failed to get the userConversation`);
    }
  };
  public getByUser_IdAndConversation_Id = async (
    userId: string,
    conversationId: string
  ): Promise<UserConversation | null> => {
    try {
      return await UserConversation.findOne({
        where: {
          userId,
          conversationId,
        },
      });
    } catch (error) {
      console.error('Error in get userConversation by user and conversation id :', error);
      throw new Error(`Failed to get user conversation`);
    }
  };
  public delete = async (entity: UserConversation): Promise<void> => {
    try {
      await UserConversation.destroy({
        where: { id: (entity as UserConversation).id },
      });
    } catch (error) {
      console.error('Error in delete userConversation:', error);
      throw new Error(`Failed to delete userConversation`);
    }
  };
}
