import { UserConversationGetByParameter, UserConversationCreateParameters } from '../dtosInterfaces/userConversationDtos';
import UserConversation from '../models/UserConversation';
import { UserConversationRepository } from '../repositories/userConversationRepository';
import { AppError } from '../middlewares/errorMiddlewares';

export class UserConversationService {
  constructor(private readonly userConversationRepository: UserConversationRepository) {}

  /**
   * Gets all user conversations
   * @returns Array of user conversations
   */
  public async getAllUserConversationsAsync(): Promise<UserConversation[]> {
    try {
      const userConversations = await this.userConversationRepository.getAllAsync();
      if (userConversations.length === 0) {
        throw AppError.notFound('No user conversations found');
      }
      return userConversations;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in getAllUserConversationsAsync:', error);
        throw AppError.badRequest('Failed to get all user conversations');
      }
      throw error;
    }
  }

  /**
   * Gets a user conversation by ID
   * @param parameter The user conversation identifier
   * @returns The user conversation
   */
  public async getUserConversationsByIdAsync(
    parameter: UserConversationGetByParameter
  ): Promise<UserConversation> {
    try {
      const userConversation = await this.userConversationRepository.getByIdAsync(parameter.id);
      if (!userConversation) {
        throw AppError.notFound(`User conversation with ID ${parameter.id} not found`);
      }
      return userConversation;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in getUserConversationsByIdAsync:', error);
        throw AppError.badRequest('Failed to get user conversation');
      }
      throw error;
    }
  }

  
  /**
   * Deletes a user conversation by ID
   * @param parameter The user conversation identifier
   */
  public async deleteUserConversationsAsync(
    parameter: UserConversationGetByParameter
  ): Promise<void> {
    try {
      const userConversation = await this.userConversationRepository.getByIdAsync(parameter.id);
      if (!userConversation) {
        throw AppError.notFound(`User conversation with ID ${parameter.id} not found`);
      }
      await this.userConversationRepository.deleteAsync(userConversation);
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in deleteUserConversationsAsync:', error);
        throw AppError.badRequest('Failed to delete user conversation');
      }
      throw error;
    }
  }
  
}
