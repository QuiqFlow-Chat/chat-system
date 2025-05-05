import { ConversaionGetByParameter } from './../dtosInterfaces/conversationDtos';
import { ConversationsRepository } from '../repositories/conversationsRepository';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import { MESSAGES } from '../constants/message';
import { AppError } from '../middlewares/errorMiddlewares';
import { PaginatedResult, PaginationParams } from '../dtosInterfaces/paginationDtos';
import { paginate } from '../utils/paginationUtils';
import { UserRepository } from '../repositories/userRepository';
import User from '../models/User';

export class ConversationService {
  _userRepository: UserRepository;
  constructor(private _conversationRepository: ConversationsRepository) {
    this._userRepository = new UserRepository();
  }

  public addNewConversation = async (): Promise<Conversation> => {
    try {
      return await this._conversationRepository.add();
    } catch (error) {
      console.log('error in addConversation', error);
      throw new Error('faild to add new conversation');
    }
  };

  public deleteConversation = async (parameter: ConversaionGetByParameter): Promise<void> => {
    try {
      const conversation = await this._conversationRepository.getById(parameter.id);
      if (!conversation) throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);
      await this._conversationRepository.delete(conversation);
    } catch (error) {
      console.log('error in deleteConversation', error);
      throw new Error('faild to delete conversation');
    }
  };

  public getAllConversations = async (
  ): Promise<Conversation[]> => {
    try {
      const conversations = await this._conversationRepository.getAll();
      if (!conversations || conversations.length === 0) {
        throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);
      }
      return conversations;
    } catch (error) {
      console.log('error in getAllConversations', error);
      throw new Error('Failed to get all conversations');
    }
  };

  public getConversationById = async (id: string): Promise<Conversation> => {
    try {
      const conversation = await this._conversationRepository.getById(id);
      if (!conversation) throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);
      return conversation;
    } catch (error) {
      console.log('error in getConversationById', error);
      throw new Error('faild to get conversation');
    }
  };

  public getConversationMessages = async (
    id: string,
    paginationParams?: PaginationParams
  ): Promise<PaginatedResult<Message> | []> => {
    try {
      const conversation = await this._conversationRepository.getById(id);
      if (!conversation) return [];

      // Get all messages from the conversation
      const messages = conversation.messages;

      // Sort messages by createdAt (newest first)
      const sortedMessages = [...messages].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Apply pagination
      const page = paginationParams?.page || 1;
      const limit = paginationParams?.limit || 10;

      return paginate(sortedMessages, page, limit);
    } catch (error) {
      console.log('error in getConversationMessages', error);
      throw new Error('faild to get conversation messages');
    }
  };

  public getConversationUsers = async (
    id: string,
  ): Promise<User[]> => {
    try {
      const conversation = await this._conversationRepository.getById(id);
      if (!conversation) throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);

      // Get all users from the conversation
      const users = conversation.users;
      return users;

    } catch (error) {
      console.log('error in getConversationUsers', error);
      throw new Error('faild to get conversation users');
    }
  };

  public getUserConversations = async (id: string, paginationParams?: PaginationParams): Promise<PaginatedResult<Conversation>> => {
    try {
      const user = await this._userRepository.getUserConversations(id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      const userConversations =  user.conversations;
      // Sort conversations messages by createdAt (newest first)
     
      userConversations.forEach((conversation) => {
        conversation.messages?.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      });
      
      const sortedUserConversations = [...userConversations].sort((a, b) => {
        const aLastMessage = a.messages?.[a.messages.length - 1];
        const bLastMessage = b.messages?.[b.messages.length - 1];
      
        const aTime = aLastMessage ? new Date(aLastMessage.createdAt).getTime() : 0;
        const bTime = bLastMessage ? new Date(bLastMessage.createdAt).getTime() : 0;
      
        return bTime - aTime;
      });

      // Apply pagination
      const page = paginationParams?.page || 1;
      const limit = paginationParams?.limit || 10;

      return paginate(sortedUserConversations, page, limit);
    } catch (error) {
      console.log('Error in getUserConversations', error);
      throw new Error('Faild to get user conversations');
    }
  };
}
