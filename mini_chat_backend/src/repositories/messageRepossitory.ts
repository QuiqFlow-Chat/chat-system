import Message from '../models/Message';
import { IMessageRepository } from './messageRepositoryInterface';

export class MessageRepository implements IMessageRepository<Message> {
  public add = async (data: any): Promise<void> => {
    try {
      await Message.create(data);
    } catch (error) {
      console.error('Error in addAsync:', error);
      throw new Error(`Failed to add message`);
    }
  };
  public getAll = async (): Promise<Message[]> => {
    try {
      return await Message.findAll();
    } catch (error) {
      console.error('Error in getAllAsync:', error);
      throw new Error(`Failed to get all messages`);
    }
  };
  public getById = async (id: string): Promise<Message | null> => {
    try {
      return await Message.findByPk(id);
    } catch (error) {
      console.error('Error in getByIdAsync:', error);
      throw new Error(`Failed to get the message`);
    }
  };
  public getBySender_IdAndReceiver_Id = async(senderId:string,receiverId:string):Promise<Message|null> => {
     return await Message.findOne({
       where:{senderId,receiverId}
    });
  }
  public delete = async (entity: Message): Promise<void> => {
    try {
      await Message.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in deleteAsync:', error);
      throw new Error(`Failed to delete message`);
    }
  };
  public update = async (entity: Message): Promise<void> => {
    try {
      await entity.save();
    } catch (error) {
      console.error('Error in updateAsync:', error);
      throw new Error(`Failed to update message`);
    }
  };
}
