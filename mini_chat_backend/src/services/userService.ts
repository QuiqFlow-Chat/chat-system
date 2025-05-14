import { UserRepository } from '@/repositories/userRepository';
import { MESSAGES } from '@/constants/messages';
import { IUserGetByParameter, IUserUpdateParameters } from '@/types/dtosInterfaces/userDtos';
import User from '@/models/User';
import { IPaginatedResult, IPaginationParams } from '@/types/dtosInterfaces/paginationDtos';
import { paginate } from '@/utils/paginationUtils';
import { AppError } from '@/middlewares/errorMiddlewares';
import { AuthUtils } from '@/utils/authUtils';

export class UserService {
  private static _USER_SERVICE_INSTANCE: UserService;
  private constructor(private _userRepository: UserRepository) {}

  public static getInstance(userRepository: UserRepository): UserService {
    if (!this._USER_SERVICE_INSTANCE) {
      this._USER_SERVICE_INSTANCE = new UserService(userRepository);
    }
    return this._USER_SERVICE_INSTANCE;
  }

  public getAllUsers = async (
    paginationParams?: IPaginationParams
  ): Promise<IPaginatedResult<User>> => {
    try {
      const users = await this._userRepository.getAll();
      const hasNoUsers = users.length === 0;
      
      if (hasNoUsers) {
        throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      }      const page = paginationParams?.page || 1;
      const limit = paginationParams?.limit || 10;

      return paginate({ items: users, page, limit });
    } catch (error) {
      throw error instanceof AppError
        ? error
        : new AppError(MESSAGES.USER.GET_ALL_FAILED, 500);
    }
  };

  public getUserById = async (id: string): Promise<User> => {
    try {
      const user = await this._userRepository.getById(id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      return user;
    } catch (error) {
      throw error instanceof AppError
        ? error
        : new AppError(MESSAGES.USER.GET_FAILED, 500);
    }
  };

  public deleteUser = async (parameter: IUserGetByParameter): Promise<void> => {
    try {
      const user = await this._userRepository.getById(parameter.id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      await this._userRepository.delete(user);
    } catch (error) {
      throw error instanceof AppError
        ? error
        : new AppError(MESSAGES.USER.DELETE_FAILED, 500);
    }
  };

  /**
   * Updates a user's information
   * @param parameter User update parameters
   */
  public updateUser = async (parameter: IUserUpdateParameters): Promise<void> => {
    try {
      const user = await this._userRepository.getById(parameter.id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);

      user.fullName = parameter.fullName || user.fullName;

      if (parameter.password) {
        user.password = await AuthUtils.hashPassword(parameter.password);
      }

      await this._userRepository.update(user);
    } catch (error) {
      throw error instanceof AppError
        ? error
        : new AppError(MESSAGES.USER.UPDATE_FAILED, 500);
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
      throw error instanceof AppError
        ? error
        : new AppError(MESSAGES.USER.UPDATE_ACTIVITY_FAILED, 500);
    }
  };
}
