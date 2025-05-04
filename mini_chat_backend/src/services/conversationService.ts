import { ConversaionGetByParameter } from './../dtosInterfaces/conversationDtos';
import { ConversationsRepository } from '../repositories/conversationsRepository';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import { MESSAGES } from '../constants/message';
import { AppError } from '../middlewares/errorMiddlewares';
import { PaginatedResult, PaginationParams} from '../dtosInterfaces/paginationDtos';
import { paginate } from '../utils/paginationUtils';

export class ConversationService {
  _userRepository:UserRepository
  constructor(private _conversationRepository: ConversationsRepository) {
    this._userRepository = new UserRepository();
  }

  public addConversationAsync = async (): Promise<void> => {
    try {
      await this._conversationRepository.addAsync();
    } catch (error) {
      console.log('error in addConversationAsync', error);
      throw new Error('faild to add new conversation');
    }
  };

  public deleteConversationAsync = async (parameter: ConversaionGetByParameter): Promise<void> => {
    try {
      const conversation = await this._conversationRepository.getByIdAsync(parameter.id);
      if (!conversation) throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);
      await this._conversationRepository.deleteAsync(conversation);
    } catch (error) {
      console.log('error in deleteConversationAsync', error);
      throw new Error('faild to delete conversation');
    }
  };

  public getAllConversationsAsync = async (
    paginationParams?: PaginationParams
  ): Promise<PaginatedResult<Conversation>> => {
    try {
      const conversations = await this._conversationRepository.getAllAsync();
      if (!conversations || conversations.length === 0) {
        throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);
      }

      // Apply pagination
      const page = paginationParams?.page || 1;
      const limit = paginationParams?.limit || 10;
      return paginate(conversations, page, limit);
    } catch (error) {
      console.log('error in getAllConversationsAsync', error);
      throw new Error('Failed to get all conversations');
    }
  };

  public getConversationByIdAsync = async (
    parameter: ConversaionGetByParameter
  ): Promise<Conversation> => {
    try {
      const conversation = await this._conversationRepository.getByIdAsync(parameter.id);
      if (!conversation) throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);
      return conversation;
    } catch (error) {
      console.log('error in getConversationByIdAsync', error);
      throw new Error('faild to get conversation');
    }
  };

  public getConversationMessagesAsync = async (
    parameter: ConversaionGetByParameter,
    paginationParams?: PaginationParams
  ): Promise<PaginatedResult<Message>> => {
    try {
      const conversation = await this._conversationRepository.getByIdAsync(parameter.id);
      if (!conversation) throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);
      
      // Get all messages from the conversation
      const messages = conversation.messages;
      
      // Sort messages by createdAt (newest first)
      const sortedMessages = [...messages].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      
      // Apply pagination
      const page = paginationParams?.page || 1;
      const limit = paginationParams?.limit || 10;
      
      return paginate(sortedMessages, page, limit);

    } catch (error) {
      console.log('error in getConversationMessagesAsync', error);
      throw new Error('faild to get conversation messages');
    }
  };
  
  public getUserConversationsAsync = async (
    parameter: UserGetByParameter
  ): Promise<Conversation[]> => {
    try {
      const user = await this._userRepository.getUserConversationsAsync(parameter.id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      return user.conversations;
    } catch (error) {
      console.log('Error in getUserConversationsAsync', error);
      throw new Error('Faild to get user conversations');
    }
  };
}
