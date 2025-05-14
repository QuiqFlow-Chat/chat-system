import { MessageRepository } from '@/repositories/messageRepository';
import { IMessageUpdateParameters } from '@/types/dtosInterfaces/messageDtos';
import {
  IMessageCreateParameters,
  IMessageGetByParameter,
} from '@/types/dtosInterfaces/messageDtos';
import { ConversationsRepository } from '@/repositories/conversationsRepository';
import { UserRepository } from '@/repositories/userRepository';
import { UserConversationRepository } from '@/repositories/userConversationRepository';
import { MESSAGES } from '@/constants/messages';
import { AppError } from '@/middlewares/errorMiddlewares';
export class MessageService {
  _userRepository: UserRepository;
  _conversationRepository: ConversationsRepository;
  _userConversationRepository: UserConversationRepository;
  private static _messageServiceInstance: MessageService;
  private constructor(private _messageRepository: MessageRepository) {
    this._userRepository = new UserRepository();
    this._conversationRepository = new ConversationsRepository();
    this._userConversationRepository = new UserConversationRepository();
  }
  public static getInstance(messageRepository: MessageRepository): MessageService {
    if (!this._messageServiceInstance) {
      this._messageServiceInstance = new MessageService(messageRepository);
    }
    return this._messageServiceInstance;
  }
  public sendMessage = async (parameters: IMessageCreateParameters): Promise<unknown> => {
    try {
      const sender = await this._userRepository.getById(parameters.senderId);
      if (!sender) throw AppError.unauthorized(MESSAGES.MESSAGE.CREATE.SENDER_NOT_FOUND);

      const receiver = await this._userRepository.getById(parameters.receiverId);
      if (!receiver) throw AppError.unauthorized(MESSAGES.MESSAGE.CREATE.RECEIVER_NOT_FOUND);

      const conversation = await this._conversationRepository.getById(parameters.conversationId);
      if (!conversation) throw AppError.unauthorized(MESSAGES.CONVERSATION.NOT_FOUND);

      const message = await this._messageRepository.add(parameters);
      return message;
    } catch (error) {
      console.error('error in sendMessage', error);
      throw error instanceof Error ? error : new Error('Failed to send new message');
    }
  };

  public deleteMessage = async (parameter: IMessageGetByParameter): Promise<void> => {
    try {
      const message = await this._messageRepository.getById(parameter.id);
      if (!message) throw AppError.notFound(MESSAGES.MESSAGE.NOT_FOUND);
      await this._messageRepository.delete(message);
    } catch (error) {
      console.error('error in deleteMessage', error);
      throw error instanceof Error ? error : new Error('Failed to delete message');
    }
  };

  public updateMessageContent = async (parameters: IMessageUpdateParameters): Promise<void> => {
    try {
      const message = await this._messageRepository.getById(parameters.id);
      if (!message) throw AppError.notFound(MESSAGES.MESSAGE.NOT_FOUND);
      message.content = parameters.content || message.content;
      await this._messageRepository.update(message);
    } catch (error) {
      console.error('error in updateMessageContent', error);
      throw error instanceof Error ? error : new Error('Failed to update message content');
    }
  };

  public updateMessageStatus = async (id: string): Promise<void> => {
    try {
      const message = await this._messageRepository.getById(id);
      if (!message) throw AppError.notFound(MESSAGES.MESSAGE.NOT_FOUND);
      message.isRead = true;
      await this._messageRepository.update(message);
    } catch (error) {
      console.error('error in updateMessageStatus', error);
      throw error instanceof Error ? error : new Error('Failed to update message status');
    }
  };
}
