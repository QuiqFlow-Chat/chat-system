import { MESSAGES } from '../constants/messages';
import { UserGetByParameter, UserUpdateParameters } from '../shared/dtosInterfaces/userDtos';
import User from '../models/User';
import { UserRepository } from '../repositories/userRepository';
import { AppError } from '../middlewares/errorMiddlewares';
import { AuthUtils } from '../utils/authUtils';

export class UserService {
  constructor(private _userRepository: UserRepository) {}

  public getAllUsers = async (): Promise<User[]> => {
    try {
      const users = await this._userRepository.getAll();
      if (users.length === 0) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      return users;
    } catch (error) {
      console.log('Error in getAll', error);
      throw new Error('Faild to get all users');
    }
  };

  public getUserById = async (id: string): Promise<User> => {
    try {
      const user = await this._userRepository.getById(id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      return user;
    } catch (error) {
      console.log('Error in getUserById', error);
      throw new Error('Faild to get user');
    }
  };

  public deleteUser = async (parameter: UserGetByParameter): Promise<void> => {
    try {
      const user = await this._userRepository.getById(parameter.id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      await this._userRepository.delete(user);
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw new Error('Failed to delete user');
    }
  };

  /**
   * Updates a user's information
   * @param parameter User update parameters
   */
  public async updateUser(parameter: UserUpdateParameters): Promise<void> {
    try {
      const user = await this._userRepository.getById(parameter.id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      if (!parameter.fullName && !parameter.password)
        throw AppError.badRequest(MESSAGES.AUTH.UN_VALID_UPDATE[0]);
      user.fullName = parameter.fullName || user.fullName;
      user.password = parameter.password || user.password;
      user.password = await AuthUtils.hashPassword(parameter.password);
      await this._userRepository.update(user);
    } catch (error) {
      console.log('Error in updateUser', error);
      throw new Error('Faild to update user');
    }
  }

  public getUserLastActivity = async (id: string): Promise<Date> => {
    try {
      const user = await this._userRepository.getById(id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      user.lastActivity = new Date(Date.now());
      await this._userRepository.update(user);
      return user.lastActivity;
    } catch (error) {
      console.log('Error in logou', error);
      throw new Error('Faild to logout user');
    }
  };
}
