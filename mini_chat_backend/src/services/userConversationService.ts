import { MESSAGES } from '../constants/message';
import { UserConversationGetByParameter } from '../dtosInterfaces/userConversationDtos';
import { AppError } from '../middlewares/errorMiddlewares';
import UserConversation from '../models/UserConversation';
import { UserConversationRepository } from '../repositories/userConversationRepository';

export class UserConversationService {
  constructor(private _userConversationRepository: UserConversationRepository) {}

  public getAllUserConversationsAsync = async (): Promise<UserConversation[]> => {
    try {
      const userConversations = await this._userConversationRepository.getAllAsync();
      if (userConversations.length === 0)
        throw AppError.notFound(MESSAGES.USER_CONVERSATION.NOT_FOUND);
      return userConversations;
    } catch (error) {
      console.log('error in getAllUserConversationsAsync', error);
      throw new Error('faild to get all user conversations');
    }
  };

  public getUserConversationsByIdAsync = async (
    parameter: UserConversationGetByParameter
  ): Promise<UserConversation> => {
    try {
      const userConversation = await this._userConversationRepository.getByIdAsync(parameter.id);
      if (!userConversation) throw AppError.notFound(MESSAGES.USER_CONVERSATION.NOT_FOUND);
      return userConversation;
    } catch (error) {
      console.log('error in getUserConversationsByIdAsync', error);
      throw new Error('faild to get user conversations');
    }
  };

  public deleteUserConversationsAsync = async (
    parameter: UserConversationGetByParameter
  ): Promise<void> => {
    try {
      const userConversation = await this._userConversationRepository.getByIdAsync(parameter.id);
      if (!userConversation) throw AppError.notFound(MESSAGES.USER_CONVERSATION.NOT_FOUND);
      await this._userConversationRepository.deleteAsync(userConversation);
    } catch (error) {
      console.log('error in deleteUserConversationsAsync', error);
      throw new Error('faild to delete user conversations');
    }
  };
}
