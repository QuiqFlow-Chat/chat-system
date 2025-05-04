import { MESSAGES } from '../constants/message';
import {
  UserCreateParameters,
  UserGetByParameter,
  UserLoginParameters,
  UserUpdateParameters,
  AuthResponse,
} from '../dtosInterfaces/userDtos';
import User from '../models/User';
import { UserRepository } from '../repositories/userRepository';
import { AppError } from '../middlewares/errorMiddlewares';
import { AuthUtils } from '../utils/authUtils';

export class UserService {
  constructor(private _userRepository: UserRepository) {}

  public getAllUsersAsync = async (): Promise<User[]> => {
    try {
      const users = await this._userRepository.getAllAsync();
      if (users.length === 0) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      return users;
    } catch (error) {
      console.log('Error in getAllAsync', error);
      throw new Error('Faild to get all users');
    }
  };

  public getUserByIdAsync = async (id: string): Promise<User> => {
    try {
      const user = await this._userRepository.getByIdAsync(id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      return user;
    } catch (error) {
      console.log('Error in getUserByIdAsync', error);
      throw new Error('Faild to get user');
    }
  };

  public deleteUserAsync = async (parameter: UserGetByParameter): Promise<void> => {
    try {
      const user = await this._userRepository.getByIdAsync(parameter.id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      await this._userRepository.deleteAsync(user);
    } catch (error) {
      console.error('Error in deleteUserAsync:', error);
      throw new Error('Failed to delete user');
    }
  };

  /**
   * Updates a user's information
   * @param parameter User update parameters
   */
  public async updateUserAsync(parameter: UserUpdateParameters): Promise<void> {
    try {
      const user = await this._userRepository.getByIdAsync(parameter.id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      if (!parameter.fullName && !parameter.password)
        throw AppError.badRequest(MESSAGES.AUTH.UN_VALID_UPDATE[0]);
      user.fullName = parameter.fullName || user.fullName;
      user.password = parameter.password || user.password;
      user.password = await AuthUtils.hashPassword(parameter.password);
      await this._userRepository.updateAsync(user);
    } catch (error) {
      console.log('Error in updateUserAsync', error);
      throw new Error('Faild to update user');
    }
  }

}
