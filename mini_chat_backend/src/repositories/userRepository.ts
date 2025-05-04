import Message from '../models/Message';
import User from '../models/User';
import { IGenericRepository } from './genericRepositoryInterface';
import Conversation from '../models/Conversation';
import { Op } from 'sequelize';

export class UserRepository implements IGenericRepository<User> {
  public addAsync = async (data: any): Promise<void> => {
    try {
      await User.create(data);
    } catch (error) {
      console.error('Error in addAsync:', error);
      throw new Error(`Failed to add user:`);
    }
  };
  public getAllAsync = async (): Promise<User[]> => {
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
  };
  public getByEmailAsync = async (email: string) => {
    return await User.findOne({
      where: { email },
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
  };
  public getByIdAsync = async (id: string): Promise<User | null> => {
    try {
      return await User.findByPk(id, {
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
      console.error('Error in getByIdAsync:', error);
      throw new Error(`Failed to get the user `);
    }
  };
  public getUserConversationsAsync = async (id: string): Promise<User | null> => {
    try {
      return await User.findByPk(id, {
        include: [
          {
            model: Message,
            as: 'messages',
          },
          {
            model: Conversation,
            as: 'conversations',
            through: { attributes: [] },
            include: [
              {
                model: User,
                as: 'users',
                through: { attributes: [] },
                attributes: ['id', 'fullName', 'email', 'lastActivity'],
                where: {
                  id: {
                    [Op.ne]: id,
                  },
                },
              },
            ],
          },
        ],
      });
    } catch (error) {
      console.error('Error in getByIdAsync:', error);
      throw new Error(`Failed to get the user `);
    }
  };
  public deleteAsync = async (entity: User): Promise<void> => {
    try {
      await User.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in deleteAsync:', error);
      throw new Error(`Failed to destroy user`);
    }
  };
  public updateAsync = async (entity: User): Promise<void> => {
    try {
      await entity.save();
    } catch (error) {
      console.error('Error in updateAsync:', error);
      throw new Error(`Failed to update user`);
    }
  };
}
