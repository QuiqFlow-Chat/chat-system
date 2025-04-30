import { MESSAGES } from '../constants/message';
import {
  UserCreateParameters,
  UserGetByParameter,
  UserLoginParameters,
  UserUpdateParameters,
  AuthResponse,
} from '../dtosInterfaces/userDtos';
import Conversation from '../models/Conversation';
import User from '../models/User';
import { UserRepository } from '../repositories/userRepository';
import { AppError } from '../middlewares/errorMiddlewares';
import { AuthUtils } from '../utils/authUtils';


export class UserService {
  constructor(private _userRepository: UserRepository) {}

  public registerAsync = async (parameters: UserCreateParameters): Promise<void> => {
    try {
      // Validate all required fields
      if (
        !parameters.fullName ||
        !parameters.email ||
        !parameters.password ||
        !parameters.confirmPassword
      )
        throw new Error(MESSAGES.AUTH.UN_VALID_REGISTER[0]);
      const users = await this._userRepository.getAllAsync();
      const checkedUsers = users.filter(
        (u) => u.fullName === parameters.fullName && u.email === parameters.email
      );
      if (checkedUsers.length > 0) throw new Error(MESSAGES.AUTH.UN_VALID_REGISTER[1]);
      if (parameters.password !== parameters.confirmPassword)
        throw new Error(MESSAGES.AUTH.UN_VALID_REGISTER[2]);
      

        // Hash the password
      const hashedPassword = await AuthUtils.hashPassword(parameters.password);

      // Create the user with hashed password
      await this._userRepository.addAsync({
        fullName: parameters.fullName,
        email: parameters.email,
        password: hashedPassword,
        lastActivity: new Date()
      });
    } catch (error) {
      console.log('Error in registerAsync', error);
      throw new Error('Faild to register user');
    }
  };

  public LoginAsync = async (parameters: UserLoginParameters): Promise<AuthResponse> => {
    try {
      const users = await this._userRepository.getAllAsync();
      const checkUser = users.filter(
        (u) => u.email === parameters.email && u.password === parameters.password
      );
      if (checkUser.length === 0) throw new Error(MESSAGES.AUTH.UN_VALID_REGISTER[3]);
      

      // Verify password using bcrypt
      const passwordMatch = await AuthUtils.comparePassword(parameters.password, checkUser[0].password);
      
      if (!passwordMatch) {
        throw AppError.notFound('Invalid email or password');
      }
      
      
      // Generate token
      const token = AuthUtils.generateToken({
        id: checkUser[0].id,
        email: checkUser[0].email
      });
      
      return {
        user: {
          id: checkUser[0].id,
          email: checkUser[0].email,
          fullName: checkUser[0].fullName
        },
        token
      };
    } catch (error) {
      console.log('Error in loginAsync', error);
      throw new Error('Faild to login user');
    }
  };

  public getAllUsersAsync = async (): Promise<User[]> => {
    try {
      const users = await this._userRepository.getAllAsync();
      if (users.length === 0) throw new Error('users not found');
      return users;
    } catch (error) {
      console.log('Error in getAllAsync', error);
      throw new Error('Faild to get all users');
    }
  };

  public getUserByIdAsync = async (parameter: UserGetByParameter): Promise<User> => {
    try {
      const user = await this._userRepository.getByIdAsync(parameter.id);
      if (!user) throw new Error(MESSAGES.USER.NOT_FOUND);
      return user;
    } catch (error) {
      console.log('Error in getUserByIdAsync', error);
      throw new Error('Faild to get user');
    }
  };

  public deleteUserAsync = async (parameter: UserGetByParameter): Promise<void> => {
    try {
      const user = await this._userRepository.getByIdAsync(parameter.id);
      if (!user) throw new Error(MESSAGES.USER.NOT_FOUND);
      await this._userRepository.deleteAsync(user);
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in deleteUserAsync:', error);
        throw AppError.badRequest('Failed to delete user');
      }
      throw error;
    }
  }

  /**
   * Updates a user's information
   * @param parameter User update parameters
   */
  public async updateUserAsync(parameter: UserUpdateParameters): Promise<void> {
    try {
      const user = await this._userRepository.getByIdAsync(parameter.id);
      if (!user) throw new Error(MESSAGES.USER.NOT_FOUND);
      if (!parameter.fullName && !parameter.password)
        throw new Error(MESSAGES.AUTH.UN_VALID_REGISTER[4]);
      user.fullName = parameter.fullName || user.fullName;
      user.password = parameter.password || user.password;
      user.password = await AuthUtils.hashPassword(parameter.password);
      await this._userRepository.updateAsync(user);

    
    } catch (error) {
      console.log('Error in updateUserAsync', error);
      throw new Error('Faild to update user');
    }
  };

  public LogoutAsync = async (parameter: UserGetByParameter): Promise<Date> => {
    try {
      const user = await this._userRepository.getByIdAsync(parameter.id);
      if (!user) throw new Error(MESSAGES.USER.NOT_FOUND);
      user.lastActivity = new Date(Date.now());
      await this._userRepository.updateAsync(user);
      return user.lastActivity;
    } catch (error) {
      console.log('Error in logouAsync', error);
      throw new Error('Faild to logout user');
    }
  };

  public getUserConversationsAsync = async (
    parameter: UserGetByParameter
  ): Promise<Conversation[]> => {
    try {
      const user = await this._userRepository.getUserConversationsAsync(parameter.id);
      if (!user) throw new Error(MESSAGES.USER.NOT_FOUND);
      return user.conversations;
    } catch (error) {
      console.log('Error in getUserConversationsAsync', error);
      throw new Error('Faild to get user conversations');
    }
  }
}
