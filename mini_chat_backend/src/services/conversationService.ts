import {
  IConversationGetByParameter,
  IConversationMessagesGetByParameters,
} from '@/types/dtosInterfaces/conversationDtos';
import { ConversationsRepository } from '@/repositories/conversationsRepository';
import Conversation from '@/models/Conversation';
import Message from '@/models/Message';
import { MESSAGES } from '@/constants/messages';
import { AppError } from '@/middlewares/errorMiddlewares';
import { IPaginatedResult, IPaginationParams } from '@/types/dtosInterfaces/paginationDtos';
import { paginate } from '@/utils/paginationUtils';
import { UserRepository } from '@/repositories/userRepository';
import User from '@/models/User';
import { MessageRepository } from '@/repositories/messageRepository';

export class ConversationService {
  _userRepository: UserRepository;
  _messageRepository: MessageRepository;
  private static _CONVERSATION_SERVICE_INSTANCE: ConversationService;

  private constructor(private _conversationRepository: ConversationsRepository) {
    this._userRepository = new UserRepository();
    this._messageRepository = new MessageRepository();
  }

  public static getInstance(conversationRepository: ConversationsRepository): ConversationService {
    if (!this._CONVERSATION_SERVICE_INSTANCE) {
      this._CONVERSATION_SERVICE_INSTANCE = new ConversationService(conversationRepository);
    }
    return this._CONVERSATION_SERVICE_INSTANCE;
  }

  public deleteConversation = async (parameter: IConversationGetByParameter): Promise<void> => {
    try {
      const conversation = await this._conversationRepository.getById(parameter.id);
      if (!conversation) throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);
      await this._conversationRepository.delete(conversation);
    } catch (error) {
      throw error instanceof AppError ? error : new AppError(MESSAGES.CONVERSATION.DELETE_FAILED, 500);
    }
  };

  public getAllConversations = async (): Promise<Conversation[]> => {
    try {
      const conversations = await this._conversationRepository.getAll();
      const hasNoConversations = !conversations || conversations.length === 0;
      
      if (hasNoConversations) {
        throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);
      }
      return conversations;
    } catch (error) {
      throw error instanceof AppError
        ? error
        : new AppError(MESSAGES.CONVERSATION.GET_ALL_FAILED, 500);
    }
  };

  public getConversationById = async (id: string): Promise<Conversation> => {
    try {
      const conversation = await this._conversationRepository.getById(id);
      if (!conversation) throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);
      return conversation;
    } catch (error) {
      throw error instanceof AppError
        ? error
        : new AppError(MESSAGES.CONVERSATION.GET_BY_ID_FAILED, 500);
    }
  };

  public getConversationMessages = async (
    parameters: IConversationMessagesGetByParameters,
    paginationParams?: IPaginationParams
  ): Promise<IPaginatedResult<Message> | []> => {
    try {
      const messages = await this._messageRepository.getAllBySender_IdAndReceiver_Id(
        parameters.senderId,
        parameters.receiverId
      );
      
      const page = paginationParams?.page || 1;
      const limit = paginationParams?.limit || 10;
      const DEFAULT_PAGINATION = {
        data: [],
        pagination: {
          total: 0,
          currentPage: page,
          totalPages: 0,
          limit,
          hasNextPage: false,
          hasPrevPage: false,
        },
      };
        const hasNoMessages = messages?.length === 0;
      if (hasNoMessages) {
        return DEFAULT_PAGINATION;
      }

      return paginate({ items: messages, page, limit });
    } catch (error) {
      throw new AppError(MESSAGES.CONVERSATION.GET_MESSAGES_FAILED, 500);
    }
  };

  public getConversationUsers = async (id: string): Promise<User[]> => {
    try {
      const conversation = await this._conversationRepository.getById(id);
      if (!conversation) throw AppError.notFound(MESSAGES.CONVERSATION.NOT_FOUND);

      return conversation.users;
    } catch (error) {
      throw error instanceof AppError
        ? error
        : new AppError(MESSAGES.CONVERSATION.GET_USERS_FAILED, 500);
    }
  };

  public getUserConversations = async (
    userId: string,
    paginationParams?: IPaginationParams
  ): Promise<IPaginatedResult<Conversation>> => {
    try {
      const conversations = await this._userRepository.getUserConversations(userId);      const page = paginationParams?.page || 1;
      const limit = paginationParams?.limit || 10;

      return paginate({ items: conversations, page, limit });
    } catch (error) {
      throw error instanceof AppError ? error : new AppError(MESSAGES.CONVERSATION.GET_USER_CONVS_FAILED, 500);
    }
  };
}
