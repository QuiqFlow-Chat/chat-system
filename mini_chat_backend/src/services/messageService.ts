import { MessageRepository } from '../repositories/messageRepository';
import {
  MessageCreateFullParameters,
  MessageUpdateParameters,
} from '../shared/dtosInterfaces/messageDtos';
import {
  MessageCreateParameters,
  MessageGetByParameter,
} from '../shared/dtosInterfaces/messageDtos';
import { ConversationsRepository } from '../repositories/conversationsRepository';
import { UserRepository } from '../repositories/userRepository';
import { UserConversationRepository } from '../repositories/userConversationRepository';
import { MESSAGES } from '../constants/messages';
import { AppError } from '../middlewares/errorMiddlewares';
import Message from '../models/Message';
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
  public sendMessage = async (parameters: MessageCreateParameters): Promise<any> => {
    try {
      const sender = await this._userRepository.getById(parameters.senderId);
      if (!sender) throw AppError.unauthorized(MESSAGES.MESSAGE.CREATE.SENDER_NOT_FOUND);

      const receiver = await this._userRepository.getById(parameters.receiverId);
      if (!receiver) throw AppError.unauthorized(MESSAGES.MESSAGE.CREATE.RECEIVER_NOT_FOUND);

      const flag = await this.shouldCreateConversation(parameters.senderId, parameters.receiverId);
      let conversation_Id: string;
      if (flag) {
        const conversation = await this._conversationRepository.add();
        conversation_Id = conversation.id;
        await this.addUsersToConversation(
          parameters.senderId,
          parameters.receiverId,
          conversation_Id
        );
      } else {
        conversation_Id = await this.getConversation_Id(parameters.senderId, parameters.receiverId);
      }
      const createMessage: MessageCreateFullParameters = {
        senderId: parameters.senderId,
        receiverId: parameters.receiverId,
        conversationId: conversation_Id,
        content: parameters.content,
      };
      const message = await this._messageRepository.add(createMessage);
      return {message,
        flag
      };
    } catch (error) {
      console.error('error in sendMessage', error);
      throw error instanceof Error ? error : new Error('Failed to send new message');
    }
  };

  public deleteMessage = async (parameter: MessageGetByParameter): Promise<void> => {
    try {
      const message = await this._messageRepository.getById(parameter.id);
      if (!message) throw AppError.notFound(MESSAGES.MESSAGE.NOT_FOUND);
      await this._messageRepository.delete(message);
    } catch (error) {
      console.error('error in deleteMessage', error);
      throw error instanceof Error ? error : new Error('Failed to delete message');
    }
  };

  public updateMessageContent = async (parameters: MessageUpdateParameters): Promise<void> => {
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

  //Validation methods of send message
  public shouldCreateConversation = async (
    senderId: string,
    receiverId: string
  ): Promise<boolean> => {
    const message = await this._messageRepository.getBySender_IdAndReceiver_Id(
      senderId,
      receiverId
    );
    if (message) return false;
    return true;
  };

  public getConversation_Id = async (senderId: string, receiverId: string): Promise<string> => {
    const message = await this._messageRepository.getBySender_IdAndReceiver_Id(
      senderId,
      receiverId
    );
    if (message) return message.conversationId;
    return '';
  };

  public addUsersToConversation = async (
    user1_Id: string,
    user2_Id: string,
    conversationId: string
  ) => {
    const users = [user1_Id, user2_Id];

    await Promise.all(
      users.map((userId) => this._userConversationRepository.add({ userId, conversationId }))
    );
  };
}
