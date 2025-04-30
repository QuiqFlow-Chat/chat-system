import { UserConversationCreateParameters } from './../dtosInterfaces/userConversationDtos';
import { MessageUpdateParameters } from './../dtosInterfaces/messageDtos';
import { MessageCreateParameters, MessageGetByParameter } from '../dtosInterfaces/messageDtos';
import { ConversationsRepository } from '../repositories/conversationsRepository';
import { MessageRepository } from '../repositories/messageRepository';
import { UserRepository } from '../repositories/userRepository';
import UserConversation from '../models/UserConversation';
import { UserConversationRepository } from '../repositories/userConversationRepository';
import { AppError } from '../middlewares/errorMiddlewares';

export class MessageService {
  constructor(
    private _messageRepository: MessageRepository,
    private _userRepository: UserRepository,
    private _conversationRepositpry: ConversationsRepository,
    private _userConversationRepository: UserConversationRepository
  ) {}

  /**
   * Adds a new message to a conversation
   * @param parameters The message creation parameters
   * @throws AppError if validation fails or repository operations fail
   */
  public addMessageAsync = async (parameters: MessageCreateParameters): Promise<void> => {
    try {
      if (!parameters.content || !parameters.conversationId || !parameters.senderId)
        throw AppError.badRequest('senderId, conversationId and message content are required');
      
      if (parameters.content.length === 0) 
        throw AppError.badRequest('You cannot send an empty message');
      
      const sender = await this._userRepository.getByIdAsync(parameters.senderId);
      if (!sender) 
        throw AppError.notFound(`Sender with ID ${parameters.senderId} not found`);
      
      const conversation = await this._conversationRepositpry.getByIdAsync(
        parameters.conversationId
      );
      if (!conversation) 
        throw AppError.notFound(`Conversation with ID ${parameters.conversationId} not found`);
      
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
      if (!(error instanceof AppError)) {
        console.error('Error in addMessageAsync:', error);
        throw AppError.badRequest('Failed to add new message');
      }
      throw error;
    }
  };

  /**
   * Deletes a message by its ID
   * @param parameter The message identifier
   * @throws AppError if the message is not found or deletion fails
   */
  public deleteMessageAsync = async (parameter: MessageGetByParameter): Promise<void> => {
    try {
      const message = await this._messageRepository.getByIdAsync(parameter.id);
      if (!message) 
        throw AppError.notFound(`Message with ID ${parameter.id} not found`);
      
      await this._messageRepository.deleteAsync(message);
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in deleteMessageAsync:', error);
        throw AppError.badRequest('Failed to delete message');
      }
      throw error;
    }
  };

  /**
   * Updates a message's content
   * @param parameters The message update parameters
   * @throws AppError if the message is not found or update fails
   */
  public updateMessageContentAsync = async (parameters: MessageUpdateParameters): Promise<void> => {
    try {
      const message = await this._messageRepository.getByIdAsync(parameters.id);
      if (!message) 
        throw AppError.notFound(`Message with ID ${parameters.id} not found`);
      
      message.content = parameters.content || message.content;
      await this._messageRepository.updateAsync(message);
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in updateMessageContentAsync:', error);
        throw AppError.badRequest('Failed to update message content');
      }
      throw error;
    }
  };

  /**
   * Marks a message as read
   * @param parameter The message identifier
   * @throws AppError if the message is not found or update fails
   */
  public updateMessageStatusAsync = async (parameter: MessageGetByParameter): Promise<void> => {
    try {
      const message = await this._messageRepository.getByIdAsync(parameter.id);
      if (!message) 
        throw AppError.notFound(`Message with ID ${parameter.id} not found`);
      
      message.isRead = true;
      await this._messageRepository.updateAsync(message);
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in updateMessageStatusAsync:', error);
        throw AppError.badRequest('Failed to update message status');
      }
      throw error;
    }
  };

  /**
   * Checks if a user is already in a conversation
   * @param userId The user ID
   * @param conversationId The conversation ID
   * @returns true if the user should be added to the conversation, false if already a member
   */
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
