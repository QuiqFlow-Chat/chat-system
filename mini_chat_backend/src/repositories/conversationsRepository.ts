import Conversation from '@/models/Conversation';
import Message from '@/models/Message';
import User from '@/models/User';
import { IConversationRepository } from '@/repositories/conversationRepositoryInterface'
export class ConversationsRepository implements IConversationRepository<Conversation> {
  public add = async (): Promise<Conversation> => {
    try {
      return await Conversation.create();
    } catch (error) {
      console.error('Error in add conversation:', error);
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
      console.error('Error in get all conversations:', error);
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
      console.error('Error in get conversation by id :', error);
      throw new Error(`Failed to get conversation`);
    }
  };
  public delete = async (entity: Conversation): Promise<void> => {
    try {
      await Conversation.destroy({
        where: { id: (entity as Conversation).id },
      });
    } catch (error) {
      console.error('Error in delete conversation :', error);
      throw new Error(`Failed to destroy conversation`);
    }
  };
}
