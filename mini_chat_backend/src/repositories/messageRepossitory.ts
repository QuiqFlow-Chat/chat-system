import Message from '../models/Message';
import UserConversation from '../models/UserConversation';
import { IGenericRepository } from './genericRepositoryInterface';

export class MessageRepository implements IGenericRepository<Message> {
  public addAsync = async (data: any): Promise<Message> => {
    try {
      return await Message.create(data);
    } catch (error) {
      console.error('Error in addAsync:', error);
      throw new Error(`Failed to add message`);
    }
  };
  public getAllAsync = async (): Promise<Message[]> => {
    try {
      return await Message.findAll();
    } catch (error) {
      console.error('Error in getAllAsync:', error);
      throw new Error(`Failed to get all messages`);
    }
  };
  public getByIdAsync = async (id: string): Promise<Message | null> => {
    try {
      return await Message.findByPk(id);
    } catch (error) {
      console.error('Error in getByIdAsync:', error);
      throw new Error(`Failed to get the message`);
    }
  };
  public deleteAsync = async (entity: Message): Promise<void> => {
    try {
      await Message.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in deleteAsync:', error);
      throw new Error(`Failed to delete message`);
    }
  };
  public updateAsync = async (entity: Message): Promise<void> => {
    try {
      await entity.save();
    } catch (error) {
      console.error('Error in updateAsync:', error);
      throw new Error(`Failed to update message`);
    }
  };
}
