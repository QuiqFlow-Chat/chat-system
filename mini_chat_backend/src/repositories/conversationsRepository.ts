import Conversation from '../models/Conversation';
import Message from '../models/Message';
import User from '../models/User';
import { IConversationRepository } from './conversationRepositoryInterface';
export class ConversationsRepository implements IConversationRepository<Conversation> {
  public add = async (): Promise<Conversation> => {
    try {
     return await Conversation.create();
    } catch (error) {
      console.error('Error in addAsync:', error);
      throw new Error(`Failed to add conversation`);
    }
  };
  public getAll = async (): Promise<Conversation[]> => {
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
  };
  public getById = async (id: string): Promise<Conversation | null> => {
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
  };
  public delete = async (entity: Conversation): Promise<void> => {
    try {
      await Conversation.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in deleteAsync :', error);
      throw new Error(`Failed to destroy conversation`);
    }
  };
 
}
