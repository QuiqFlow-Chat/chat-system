import { ConversationService } from './../services/conversationService';
import { ConversationsRepository } from './../repositories/conversationsRepository';
import { Application } from 'express';
import { BaseRoute } from './baseRoute';
import { ConversationController } from '../controller/conversationController';
import { AuthMiddleware } from '../middlewares/authMiddlewares';

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
    this.router.post(
      '/addConversationAsync',
      AuthMiddleware.authenticate,
      this.conversationController.addConversationAsync
    );
  };
  private initGetHttpMethod = async () => {
    this.router.get(
      '/getAllConversationsAsync',
      AuthMiddleware.authenticate,
      this.conversationController.getAllConversationsAsync
    );
    this.router.get(
      '/:id/getConversationByIdAsync',
      AuthMiddleware.authenticate,
      this.conversationController.getConversationByIdAsync
    );
    this.router.get(
      '/:id/getConversationMessagesAsync',
      AuthMiddleware.authenticate,
      this.conversationController.getConversationMessagesAsync
    );
    this.router.get(
      '/:id/getUserConversationsAsync',
      AuthMiddleware.authenticate,
      this.conversationController.getUserConversationsAsync
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteConversationAsync',
      AuthMiddleware.authenticate,
      this.conversationController.deleteConversationAsync
    );
  };
}
