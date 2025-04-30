import { UserConversationCreateParameters } from './../dtosInterfaces/userConversationDtos';
import { MessageUpdateParameters } from './../dtosInterfaces/messageDtos';
import { MessageCreateParameters, MessageGetByParameter } from '../dtosInterfaces/messageDtos';
import { ConversationsRepository } from '../repositories/conversationsRepository';
import { MessageRepository } from '../repositories/messageRepossitory';
import { UserRepository } from '../repositories/userRepository';
import UserConversation from '../models/UserConversation';
import { UserConversationRepository } from '../repositories/userConversationRepository';
import { waitForDebugger } from 'inspector';

export class MessageService {
  constructor(
    private _messageRepository: MessageRepository,
    private _userRepository: UserRepository,
    private _conversationRepositpry: ConversationsRepository,
    private _userConversationRepository: UserConversationRepository
  ) {}

  public addMessageAsync = async (parameters: MessageCreateParameters): Promise<void> => {
    try {
      if (!parameters.content || !parameters.conversationId || !parameters.senderId)
        throw new Error('senderId , conversationId and message content are required');
      if (parameters.content.length === 0) throw new Error('you can not send empty message');
      const sender = await this._userRepository.getByIdAsync(parameters.senderId);
      if (!sender) throw new Error('sender not found');
      const conversation = await this._conversationRepositpry.getByIdAsync(
        parameters.conversationId
      );
      if (!conversation) throw new Error('conversation not found');
      const message = await this._messageRepository.addAsync(parameters);
      message.isRead = false;
      await this._messageRepository.updateAsync(message);

      const resultOfUserConversationCheck = await this.checkUserConversationAsync(
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
      if (!message) throw new Error('message not found');
      await this._messageRepository.deleteAsync(message);
    } catch (error) {
      console.log('error in deleteMessageAsync', error);
      throw new Error('faild to delete message');
    }
  };

  public updateMessageContentAsync = async (parameters: MessageUpdateParameters): Promise<void> => {
    try {
      const message = await this._messageRepository.getByIdAsync(parameters.id);
      if (!message) throw new Error('message not found');
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
      if (!message) throw new Error('message not found');
      message.isRead = true;
      await this._messageRepository.updateAsync(message);
    } catch (error) {
      console.log('error in updateMessageStatusAsync', error);
      throw new Error('faild to update message status');
    }
  };

  public checkUserConversationAsync = async (
    userId: string,
    conversationId: string
  ): Promise<boolean> => {
    const userConversations = await this._userConversationRepository.getAllAsync();
    const userConversationChecked = userConversations.filter(
      (uc) => uc.userId === userId && uc.conversationId === conversationId
    );
    if (userConversationChecked.length > 0) return false;
    return true;
  };
}
