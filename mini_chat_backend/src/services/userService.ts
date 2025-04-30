import {
  UserCreateParameters,
  UserGetByParameter,
  UserLoginParameters,
  UserUpdateParameters,
} from '../dtosInterfaces/userDtos';
import Conversation from '../models/Conversation';
import User from '../models/User';
import { UserRepository } from '../repositories/userRepository';
import { AppError } from '../middlewares/errorMiddlewares';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  /**
   * Registers a new user
   * @param parameters User registration parameters
   */
  public async registerAsync(parameters: UserCreateParameters): Promise<void> {
    try {
      // Validate all required fields
      if (
        !parameters.fullName ||
        !parameters.email ||
        !parameters.password ||
        !parameters.confirmPassword
      ) {
        throw AppError.badRequest('Full name, email, password and confirm password are required');
      }

      // Check if user already exists
      const users = await this.userRepository.getAllAsync();
      const existingUser = users.find(
        (u) => u.email === parameters.email
      );
      
      if (existingUser) {
        throw AppError.badRequest('A user with this email already exists');
      }

      // Validate password confirmation
      if (parameters.password !== parameters.confirmPassword) {
        throw AppError.badRequest('Password and confirm password must match');
      }

      // Create the user
      await this.userRepository.addAsync(parameters);
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in registerAsync:', error);
        throw AppError.badRequest('Failed to register user');
      }
      throw error;
    }
  }

  /**
   * Authenticates a user
   * @param parameters User login parameters
   * @returns The authenticated user
   */
  public async LoginAsync(parameters: UserLoginParameters): Promise<User> {
    try {
      if (!parameters.email || !parameters.password) {
        throw AppError.badRequest('Email and password are required');
      }
      
      const users = await this.userRepository.getAllAsync();
      const user = users.find(
        (u) => u.email === parameters.email && u.password === parameters.password
      );
      
      if (!user) {
        throw AppError.notFound('Invalid email or password');
      }
      
      // No longer managing online status here - Socket.IO will handle this
      return user;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in LoginAsync:', error);
        throw AppError.badRequest('Failed to login user');
      }
      throw error;
    }
  }

  /**
   * Gets all users
   * @returns Array of all users
   */
  public async getAllUsersAsync(): Promise<User[]> {
    try {
      const users = await this.userRepository.getAllAsync();
      if (users.length === 0) {
        throw AppError.notFound('No users found');
      }
      return users;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in getAllUsersAsync:', error);
        throw AppError.badRequest('Failed to get all users');
      }
      throw error;
    }
  }

  /**
   * Gets a user by ID
   * @param parameter User identifier
   * @returns The specified user
   */
  public async getUserByIdAsync(parameter: UserGetByParameter): Promise<User> {
    try {
      const user = await this.userRepository.getByIdAsync(parameter.id);
      if (!user) {
        throw AppError.notFound(`User with ID ${parameter.id} not found`);
      }
      return user;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in getUserByIdAsync:', error);
        throw AppError.badRequest('Failed to get user');
      }
      throw error;
    }
  }

  /**
   * Deletes a user by ID
   * @param parameter User identifier
   */
  public async deleteUserAsync(parameter: UserGetByParameter): Promise<void> {
    try {
      const user = await this.userRepository.getByIdAsync(parameter.id);
      if (!user) {
        throw AppError.notFound(`User with ID ${parameter.id} not found`);
      }
      await this.userRepository.deleteAsync(user);
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
      const user = await this.userRepository.getByIdAsync(parameter.id);
      if (!user) {
        throw AppError.notFound(`User with ID ${parameter.id} not found`);
      }
      
      if (!parameter.fullName && !parameter.password) {
        throw AppError.badRequest('Please provide at least one field to update');
      }
      
      if (parameter.fullName) user.fullName = parameter.fullName;
      if (parameter.password) user.password = parameter.password;
      
      await this.userRepository.updateAsync(user);
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in updateUserAsync:', error);
        throw AppError.badRequest('Failed to update user');
      }
      throw error;
    }
  }

  /**
   * Records last authentication time for a user
   * Note: Online status is now managed by Socket.IO
   * @param parameter User identifier
   */
  public async logOutAsync(parameter: UserGetByParameter): Promise<void> {
    try {
      const user = await this.userRepository.getByIdAsync(parameter.id);
      if (!user) {
        throw AppError.notFound(`User with ID ${parameter.id} not found`);
      }
      
      // Just update last activity time, but don't manage online status
      user.lastActivity = new Date();
      await this.userRepository.updateAsync(user);
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in updateLastActivityAsync:', error);
        throw AppError.badRequest('Failed to update user activity');
      }
      throw error;
    }
  }

  /**
   * Gets all conversations for a specific user
   * @param parameter User identifier
   * @returns Array of user's conversations
   */
  public async getUserConversationsAsync(parameter: UserGetByParameter): Promise<Conversation[]> {
    try {
      const user = await this.userRepository.getUserConversationsAsync(parameter.id);
      if (!user) {
        throw AppError.notFound(`User with ID ${parameter.id} not found`);
      }
      
      if (!user.conversations || user.conversations.length === 0) {
        throw AppError.notFound(`No conversations found for user with ID ${parameter.id}`);
      }
      
      return user.conversations;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in getUserConversationsAsync:', error);
        throw AppError.badRequest('Failed to get user conversations');
      }
      throw error;
    }
  }
}
