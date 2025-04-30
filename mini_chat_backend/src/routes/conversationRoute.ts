import { ConversationService } from './../services/conversationService';
import { ConversationsRepository } from './../repositories/conversationsRepository';
import { Application } from 'express';
import { BaseRoute } from './baseRoute';
import { ConversationController } from '../controller/conversationController';

export class ConversationRoute extends BaseRoute {
  conversationRepository: ConversationsRepository;
  conversationService: ConversationService;
  conversationController: ConversationController;
  constructor(app: Application) {
    super(app);
    this.conversationRepository = new ConversationsRepository();
    this.conversationService = new ConversationService(this.conversationRepository);
    this.conversationController = new ConversationController(this.conversationService);
    this.initPostHttpMethod();
    this.initGetHttpMethod();
    this.initDeleteHttpMethod();
  }
  private initPostHttpMethod = async () => {
    this.router.post('/addConversationAsync', this.conversationController.addConversationAsync);
    this.router.post(
      '/getConversationByIdAsync',
      this.conversationController.getConversationByIdAsync
    );
    this.router.post(
      '/getConversationMessagesAsync',
      this.conversationController.getConversationMessagesAsync
    );
  };
  private initGetHttpMethod = async () => {
    this.router.get(
      '/getAllConversationsAsync',
      this.conversationController.getAllConversationsAsync
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteConversationAsync',
      this.conversationController.deleteConversationAsync
    );
  };
}
