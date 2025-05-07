import { MESSAGES } from '../constants/messages';
import { UserConversationGetByParameter } from '../shared/dtosInterfaces/userConversationDtos';
import { AppError } from '../middlewares/errorMiddlewares';
import UserConversation from '../models/UserConversation';
import { UserConversationRepository } from '../repositories/userConversationRepository';

export class UserConversationService {
  private static _userConvServiceInstance: UserConversationService;
  private constructor(private _userConversationRepository: UserConversationRepository) {}

  public static getInstance(
    userConversationRepository: UserConversationRepository
  ): UserConversationService {
    if (!this._userConvServiceInstance) {
      this._userConvServiceInstance = new UserConversationService(userConversationRepository);
    }
    return this._userConvServiceInstance;
  }

  public getAllUserConversations = async (): Promise<UserConversation[]> => {
    try {
      const userConversations = await this._userConversationRepository.getAll();
      if (userConversations.length === 0)
        throw AppError.notFound(MESSAGES.USER_CONVERSATION.NOT_FOUND);
      return userConversations;
    } catch (error) {
      console.error('error in getAllUserConversations', error);
      throw error instanceof Error ? error : new Error('Failed to get all user conversations');
    }
  };

  public getUserConversationsById = async (id: string): Promise<UserConversation> => {
    try {
      const userConversation = await this._userConversationRepository.getById(id);
      if (!userConversation) throw AppError.notFound(MESSAGES.USER_CONVERSATION.NOT_FOUND);
      return userConversation;
    } catch (error) {
      console.error('error in getUserConversationsById', error);
      throw error instanceof Error ? error : new Error('Failed to get user conversation');
    }
  };

  public deleteUserConversations = async (
    parameter: UserConversationGetByParameter
  ): Promise<void> => {
    try {
      const userConversation = await this._userConversationRepository.getById(parameter.id);
      if (!userConversation) throw AppError.notFound(MESSAGES.USER_CONVERSATION.NOT_FOUND);
      await this._userConversationRepository.delete(userConversation);
    } catch (error) {
      console.error('error in deleteUserConversations', error);
      throw error instanceof Error ? error : new Error('Failed to delete user conversation');
    }
  };
}
