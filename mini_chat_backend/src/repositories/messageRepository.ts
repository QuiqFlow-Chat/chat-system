import { Op } from 'sequelize';
import Message from '../models/Message';
import { IMessageRepository } from './messageRepositoryInterface';

export class MessageRepository implements IMessageRepository<Message> {
  public add = async (data: any): Promise<Message> => {
    try {
      return await Message.create(data);
    } catch (error) {
      console.error('Error in add message:', error);
      throw new Error(`Failed to add message`);
    }
  };
  public getAll = async (): Promise<Message[]> => {
    try {
      return await Message.findAll();
    } catch (error) {
      console.error('Error in get all messages:', error);
      throw new Error(`Failed to get all messages`);
    }
  };
  public getById = async (id: string): Promise<Message | null> => {
    try {
      return await Message.findByPk(id);
    } catch (error) {
      console.error('Error in get message by id:', error);
      throw new Error(`Failed to get the message`);
    }
  };
  public getBySender_IdAndReceiver_Id = async (
    senderId: string,
    receiverId: string
  ): Promise<Message | null> => {
    try {
      return await Message.findOne({
        where: {
          [Op.or]: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
      });
    } catch (error) {
      console.error('error in get message by sender and receiver id : ', error);
      throw new Error(`Failed to get message`);
    }
  };
  public getAllBySender_IdAndReceiver_Id = async (
    senderId: string,
    receiverId: string
  ): Promise<Message[]> => {
    try {
      return await Message.findAll({
        where: {
          [Op.or]: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        },
        order: [['createdAt', 'ASC']], 
      });
    } catch (error) {
      console.error('Error in getAllBySender_IdAndReceiver_Id:', error);
      throw new Error(`Failed to get all messages`);
    }
  };
  public delete = async (entity: Message): Promise<void> => {
    try {
      await Message.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in delete message:', error);
      throw new Error(`Failed to delete message`);
    }
  };
  public update = async (entity: Message): Promise<void> => {
    try {
      await entity.save();
    } catch (error) {
      console.error('Error in update message:', error);
      throw new Error(`Failed to update message`);
    }
  };
}
