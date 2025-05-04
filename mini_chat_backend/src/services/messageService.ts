import { UserConversationCreateParameters } from './../dtosInterfaces/userConversationDtos';
import { MessageUpdateParameters } from './../dtosInterfaces/messageDtos';
import { MessageCreateParameters, MessageGetByParameter } from '../dtosInterfaces/messageDtos';
import { ConversationsRepository } from '../repositories/conversationsRepository';
import { MessageRepository } from '../repositories/messageRepossitory';
import { UserRepository } from '../repositories/userRepository';
import { UserConversationRepository } from '../repositories/userConversationRepository';
import { MESSAGES } from '../constants/message';
import { AppError } from '../middlewares/errorMiddlewares';

export class MessageService {
  _userRepository: UserRepository;
  _conversationRepository: ConversationsRepository;
  _userConversationRepository: UserConversationRepository;
  constructor(private _messageRepository: MessageRepository) {
    this._userRepository = new UserRepository();
    this._conversationRepository = new ConversationsRepository();
    this._userConversationRepository = new UserConversationRepository();
  }

  public addMessageAsync = async (parameters: MessageCreateParameters): Promise<void> => {
    try {
      if (!parameters.content || !parameters.conversationId || !parameters.senderId)
        throw AppError.badRequest(MESSAGES.AUTH.UN_VALID_MESSAGE[0]);
      if (parameters.content.length === 0)
        throw AppError.badRequest(MESSAGES.AUTH.UN_VALID_MESSAGE[1]);
      const sender = await this._userRepository.getByIdAsync(parameters.senderId);
      if (!sender) throw AppError.unauthorized(MESSAGES.AUTH.UN_VALID_MESSAGE[2]);
      const conversation = await this._conversationRepository.getByIdAsync(
        parameters.conversationId
      );
      if (!conversation) throw AppError.notFound(MESSAGES.MESSAGE.NOT_FOUND);
      const message = await this._messageRepository.addAsync(parameters);
      message.isRead = false;
      await this._messageRepository.updateAsync(message);

      const resultOfUserConversationCheck = await this.shouldCreateUserConversation(
        parameters.senderId,
        parameters.conversationId
      );
      if (resultOfUserConversationCheck) {
        const userConv_parameter: UserConversationCreateParameters = {
          userId: parameters.senderId,
          conversationId: parameters.conversationId,
        };
        await this._userConversationRepository.addAsync(userConv_parameter);
      }
    } catch (error) {
      console.log('error in addMessageAsync', error);
      throw new Error('faild to add new message');
    }
  };

  public deleteMessageAsync = async (parameter: MessageGetByParameter): Promise<void> => {
    try {
      const message = await this._messageRepository.getByIdAsync(parameter.id);
      if (!message) throw AppError.notFound(MESSAGES.MESSAGE.NOT_FOUND);
      await this._messageRepository.deleteAsync(message);
    } catch (error) {
      console.log('error in deleteMessageAsync', error);
      throw new Error('faild to delete message');
    }
  };

  public updateMessageContentAsync = async (parameters: MessageUpdateParameters): Promise<void> => {
    try {
      const message = await this._messageRepository.getByIdAsync(parameters.id);
      if (!message) throw AppError.notFound(MESSAGES.MESSAGE.NOT_FOUND);
      message.content = parameters.content || message.content;
      await this._messageRepository.updateAsync(message);
    } catch (error) {
      console.log('error in updateMessageContentAsync', error);
      throw new Error('faild to update message content');
    }
  };

  public updateMessageStatusAsync = async (parameter: MessageGetByParameter): Promise<void> => {
    try {
      const message = await this._messageRepository.getByIdAsync(parameter.id);
      if (!message) throw AppError.notFound(MESSAGES.MESSAGE.NOT_FOUND);
      message.isRead = true;
      await this._messageRepository.updateAsync(message);
    } catch (error) {
      console.log('error in updateMessageStatusAsync', error);
      throw new Error('faild to update message status');
    }
  };

  public shouldCreateUserConversation = async (
    userId: string,
    conversationId: string
  ): Promise<boolean> => {
    const userConversation = await this._userConversationRepository.getByUser_IdAndConversation_Id(userId,conversationId);
    if (!userConversation) return true;
    return false;
  };
}
