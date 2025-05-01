import { ConversaionGetByParameter } from './../dtosInterfaces/conversationDtos';
import { ConversationsRepository } from '../repositories/conversationsRepository';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import { MESSAGES } from '../constants/message';

export class ConversationService {
  constructor(private _conversationRepository: ConversationsRepository) {}

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
      if (!conversation) throw new Error(MESSAGES.CONVERSATION.NOT_FOUND);
      await this._conversationRepository.deleteAsync(conversation);
    } catch (error) {
      console.log('error in deleteConversationAsync', error);
      throw new Error('faild to delete conversation');
    }
  };

  public getAllConversationsAsync = async (): Promise<Conversation[]> => {
    try {
      const conversations = await this._conversationRepository.getAllAsync();
      if (!conversations) throw new Error(MESSAGES.CONVERSATION.NOT_FOUND);
      return conversations;
    } catch (error) {
      console.log('error in getAllConversationsAsync', error);
      throw new Error('faild to get all conversations');
    }
  };

  public getConversationByIdAsync = async (
    parameter: ConversaionGetByParameter
  ): Promise<Conversation> => {
    try {
      const conversation = await this._conversationRepository.getByIdAsync(parameter.id);
      if (!conversation) throw new Error(MESSAGES.CONVERSATION.NOT_FOUND);
      return conversation;
    } catch (error) {
      console.log('error in getConversationByIdAsync', error);
      throw new Error('faild to get conversation');
    }
  };

  public getConversationMessagesAsync = async (
    parameter: ConversaionGetByParameter
  ): Promise<Message[]> => {
    try {
      const conversation = await this._conversationRepository.getByIdAsync(parameter.id);
      if (!conversation) throw new Error(MESSAGES.CONVERSATION.NOT_FOUND);
      return conversation.messages;
    } catch (error) {
      console.log('error in getConversationMessagesAsync', error);
      throw new Error('faild to get conversation messages');
    }
  };
}
