import User from '../models/User';
import Conversation from '../models/Conversation';
import { Op } from 'sequelize';
import { IUserRepository } from './userRepositoryInterface';
import Message from '../models/Message';

export class UserRepository implements IUserRepository<User> {
  public add = async (data: any): Promise<void> => {
    try {
      await User.create(data);
    } catch (error) {
      console.error('Error in addAsync:', error);
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
      console.error('Error in getAllAsync:', error);
      throw new Error(`Failed to get all users:`);
    }
  };
  public getByEmail = async (email: string) : Promise<User | null> => {
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
  };
  public getById = async (id: string): Promise<User | null> => {
    try {
      return await User.findByPk(id, {
        include:[{
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
  public getUserConversations = async (id: string): Promise<User | null> => {
    try {
      return await User.findByPk(id, {
        include: [
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
              {
                model: Message,
                order: [['createdAt', 'DESC']],
              }
            ],
          },
        ],
      });
    } catch (error) {
      console.error('Error in getByIdAsync:', error);
      throw new Error(`Failed to get the user `);
    }
  };
  public delete = async (entity: User): Promise<void> => {
    try {
      await User.destroy({
        where: { id: (entity as any).id },
      });
    } catch (error) {
      console.error('Error in deleteAsync:', error);
      throw new Error(`Failed to destroy user`);
    }
  };
  public update = async (entity: User): Promise<void> => {
    try {
      await entity.save();
    } catch (error) {
      console.error('Error in updateAsync:', error);
      throw new Error(`Failed to update user`);
    }
  };
}
