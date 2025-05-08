import { UserRepository } from './../repositories/userRepository';
import { MESSAGES } from '../constants/messages';
import { UserGetByParameter, UserUpdateParameters } from '../shared/dtosInterfaces/userDtos';
import User from '../models/User';
import { PaginatedResult, PaginationParams } from '../shared/dtosInterfaces/paginationDtos';
import { paginate } from '../utils/paginationUtils';
import { AppError } from '../middlewares/errorMiddlewares';
import { AuthUtils } from '../utils/authUtils';

export class UserService {
  private static _userServiceInstance: UserService;
  private constructor(private _userRepository: UserRepository) {}

  public static getInstance(userRepository: UserRepository): UserService {
    if (!this._userServiceInstance) {
      this._userServiceInstance = new UserService(userRepository);
    }
    return this._userServiceInstance;
  }

  public getAllUsers = async (paginationParams?: PaginationParams): Promise<PaginatedResult<User>> => {
    try {
      const users = await this._userRepository.getAll();
      if (users.length === 0) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      
      const page = paginationParams?.page || 1;
      const limit = paginationParams?.limit || 10;
      
      return paginate(users, page, limit);
    } catch (error) {
      console.error('Error in getAllUsers:', error);
      throw error instanceof Error ? error : new Error('Failed to get all users');
    }
  };

  public getUserById = async (id: string): Promise<User> => {
    try {
      const user = await this._userRepository.getById(id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      return user;
    } catch (error) {
      console.error('Error in getUserById:', error);
      throw error instanceof Error ? error : new Error('Failed to get user');
    }
  };

  public deleteUser = async (parameter: UserGetByParameter): Promise<void> => {
    try {
      const user = await this._userRepository.getById(parameter.id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      await this._userRepository.delete(user);
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error instanceof Error ? error : new Error('Failed to delete user');
    }
  };

  /**
   * Updates a user's information
   * @param parameter User update parameters
   */
  public updateUser = async (parameter: UserUpdateParameters): Promise<void> => {
    try {
      const user = await this._userRepository.getById(parameter.id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);

      user.fullName = parameter.fullName || user.fullName;

      if (parameter.password) {
        user.password = await AuthUtils.hashPassword(parameter.password);
      }

      await this._userRepository.update(user);
    } catch (error) {
      console.error('Error in updateUser:', error);
      throw error instanceof Error ? error : new Error('Failed to update user');
    }
  };

  public getUserLastActivity = async (id: string): Promise<Date> => {
    try {
      const user = await this._userRepository.getById(id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);

      user.lastActivity = new Date();
      await this._userRepository.update(user);
      return user.lastActivity;
    } catch (error) {
      console.error('Error in getUserLastActivity:', error);
      throw error instanceof Error ? error : new Error('Failed to update user last activity');
    }
  };
}
