import { MESSAGES } from '../constants/messages';
import { UserConversationGetByParameter } from '../shared/dtosInterfaces/userConversationDtos';
import { AppError } from '../middlewares/errorMiddlewares';
import UserConversation from '../models/UserConversation';
import { UserConversationRepository } from '../repositories/userConversationRepository';

export class UserConversationService {
  constructor(private _userConversationRepository: UserConversationRepository) {}

  public getAllUserConversations = async (): Promise<UserConversation[]> => {
    try {
      const userConversations = await this._userConversationRepository.getAll();
      if (userConversations.length === 0)
        throw AppError.notFound(MESSAGES.USER_CONVERSATION.NOT_FOUND);
      return userConversations;
    } catch (error) {
      console.log('error in getAllUserConversations', error);
      throw new Error('faild to get all user conversations');
    }
  };

  public getUserConversationsById = async (id: string): Promise<UserConversation> => {
    try {
      const userConversation = await this._userConversationRepository.getById(id);
      if (!userConversation) throw AppError.notFound(MESSAGES.USER_CONVERSATION.NOT_FOUND);
      return userConversation;
    } catch (error) {
      console.log('error in getUserConversationsById', error);
      throw new Error('faild to get user conversations');
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
      console.log('error in deleteUserConversations', error);
      throw new Error('faild to delete user conversations');
    }
  };
}
