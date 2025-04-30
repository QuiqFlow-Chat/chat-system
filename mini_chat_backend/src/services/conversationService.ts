import { ConversaionGetByParameter } from '../dtosInterfaces/conversationDtos';
import { ConversationsRepository } from '../repositories/conversationsRepository';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import { AppError } from '../middlewares/errorMiddlewares';

export class ConversationService {
  constructor(private readonly conversationRepository: ConversationsRepository) {}

  /**
   * Creates a new conversation
   */
  public async addConversationAsync(): Promise<void> {
    try {
      await this.conversationRepository.addAsync();
    } catch (error) {
      console.error('Error in addConversationAsync:', error);
      throw AppError.badRequest('Failed to add new conversation');
    }
  }

  /**
   * Deletes a conversation by its ID
   * @param parameter The conversation identifier
   */
  public async deleteConversationAsync(parameter: ConversaionGetByParameter): Promise<void> {
    try {
      const conversation = await this.conversationRepository.getByIdAsync(parameter.id);
      if (!conversation) {
        throw AppError.notFound(`Conversation with ID ${parameter.id} not found`);
      }
      await this.conversationRepository.deleteAsync(conversation);
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in deleteConversationAsync:', error);
        throw AppError.badRequest(`Failed to delete conversation ${parameter.id}`);
      }
      throw error;
    }
  }

  /**
   * Gets all conversations
   * @returns Array of all conversations
   */
  public async getAllConversationsAsync(): Promise<Conversation[]> {
    try {
      const conversations = await this.conversationRepository.getAllAsync();
      if (conversations.length === 0) {
        throw AppError.notFound('No conversations found');
      }
      return conversations;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in getAllConversationsAsync:', error);
        throw AppError.badRequest('Failed to get all conversations');
      }
      throw error;
    }
  }

  /**
   * Gets a conversation by its ID
   * @param parameter The conversation identifier
   * @returns The specified conversation
   */
  public async getConversationByIdAsync(
    parameter: ConversaionGetByParameter
  ): Promise<Conversation> {
    try {
      const conversation = await this.conversationRepository.getByIdAsync(parameter.id);
      if (!conversation) {
        throw AppError.notFound(`Conversation with ID ${parameter.id} not found`);
      }
      return conversation;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in getConversationByIdAsync:', error);
        throw AppError.badRequest(`Failed to get conversation ${parameter.id}`);
      }
      throw error;
    }
  }

  /**
   * Gets all messages for a specific conversation
   * @param parameter The conversation identifier
   * @returns Array of messages in the conversation
   */
  public async getConversationMessagesAsync(
    parameter: ConversaionGetByParameter
  ): Promise<Message[]> {
    try {
      const conversation = await this.conversationRepository.getByIdAsync(parameter.id);
      if (!conversation) {
        throw AppError.notFound(`Conversation with ID ${parameter.id} not found`);
      }
      
      if (!conversation.messages || conversation.messages.length === 0) {
        throw AppError.notFound(`No messages found in conversation ${parameter.id}`);
      }
      
      return conversation.messages;
    } catch (error) {
      if (!(error instanceof AppError)) {
        console.error('Error in getConversationMessagesAsync:', error);
        throw AppError.badRequest(`Failed to get messages for conversation ${parameter.id}`);
      }
      throw error;
    }
  }
}
