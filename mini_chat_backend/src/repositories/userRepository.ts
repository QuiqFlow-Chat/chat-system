import User from '../models/User';
import Conversation from '../models/Conversation';
import { Op } from 'sequelize';
import { IUserRepository } from './userRepositoryInterface';
import Message from '../models/Message';
import { Sequelize } from 'sequelize-typescript';

export class UserRepository implements IUserRepository<User> {
  public add = async (data: any): Promise<void> => {
    try {
      await User.create(data);
    } catch (error) {
      console.error('Error in add user:', error);
      throw new Error(`Failed to add user:`);
    }
  };
  public getAll = async (): Promise<User[]> => {
    try {
      return await User.findAll({
        include: [
          {
            model: Conversation,
            as: 'conversations',
            through: { attributes: [] },
          },
        ],
      });
    } catch (error) {
      console.error('Error in get all users:', error);
      throw new Error(`Failed to get all users:`);
    }
  };
  public getByEmail = async (email: string): Promise<User | null> => {
    try {
      return await User.findOne({
        where: { email },
        include: [
          {
            model: Conversation,
            as: 'conversations',
            through: { attributes: [] },
          },
        ],
      });
    } catch (error) {
      console.error('Error in get user by email:', error);
      throw new Error(`Failed to get user`);
    }
  };
  public getById = async (id: string): Promise<User | null> => {
    try {
      return await User.findByPk(id, {
        include: [
          {
            model: Conversation,
            as: 'conversations',
            through: { attributes: [] },
          },
        ],
      });
    } catch (error) {
      console.error('Error in get user by id:', error);
      throw new Error(`Failed to get the user `);
    }
  };
  public getUserConversations = async (id: string): Promise<Conversation[]> => {
    try {
      const conversations = await Conversation.findAll({
        include: [
          {
            model: User,
            as: 'users',
            where: {
              id: {
                [Op.ne]: id,
              },
            },
            attributes: ['id', 'fullName', 'email'],
            through: { attributes: [] },
          },
          {
            model: Message,
            separate: true,
            order: [['createdAt', 'ASC']],
          },
        ],
        where: Sequelize.literal(`
          EXISTS (
            SELECT 1 FROM "UserConversations"
            WHERE "UserConversations"."conversation_id" = "Conversation"."id"
            AND "UserConversations"."user_id" = '${id}'
          )
        `),
        order: [
          [
            Sequelize.literal(`(
              SELECT MAX("created_at") FROM "Messages"
              WHERE "Messages"."conversation_id" = "Conversation"."id"
            )`),
            'DESC',
          ],
        ],
      });
      return conversations ?? [];
    } catch (error) {
      console.error('Error in get user by id:', error);
      throw new Error(`Failed to get the user `);
    }
  };
  public delete = async (entity: User): Promise<void> => {
    try {
      await User.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in delete user:', error);
      throw new Error(`Failed to destroy user`);
    }
  };
  public update = async (entity: User): Promise<void> => {
    try {
      await entity.save();
    } catch (error) {
      console.error('Error in update user:', error);
      throw new Error(`Failed to update user`);
    }
  };
}
