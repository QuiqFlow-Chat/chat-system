import { UserConversationGetByParameter } from '../dtosInterfaces/userConversationDtos';
import UserConversation from '../models/UserConversation';
import { UserConversationRepository } from '../repositories/userConversationRepository';

export class UserConversationService {
  constructor(private _userConversationRepository: UserConversationRepository) {}

  public getAllUserConversationsAsync = async (): Promise<UserConversation[]> => {
    try {
      const userConversations = await this._userConversationRepository.getAllAsync();
      if (userConversations.length === 0) throw new Error('user conversations not found');
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
      if (!userConversation) throw new Error('user conversation not found');
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
      if (!userConversation) throw new Error('user conversation not found');
      await this._userConversationRepository.deleteAsync(userConversation);
    } catch (error) {
      console.log('error in deleteUserConversationsAsync', error);
      throw new Error('faild to delete user conversations');
    }
  };
}
