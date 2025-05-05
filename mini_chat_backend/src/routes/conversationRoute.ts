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
      '/addNewConversation',
      AuthMiddleware.authenticate,
      this.conversationController.addNewConversation
    );
  };
  private initGetHttpMethod = async () => {
    this.router.get(
      '/getAllConversations',
      AuthMiddleware.authenticate,
      this.conversationController.getAllConversations
    );
    this.router.get(
      '/:id/getConversationById',
      AuthMiddleware.authenticate,
      this.conversationController.getConversationById
    );
    this.router.get(
      '/:id/getConversationMessages',
      AuthMiddleware.authenticate,
      this.conversationController.getConversationMessages
    );
    this.router.get(
      '/:id/getConversationUsers',
      AuthMiddleware.authenticate,
      this.conversationController.getConversationUsers
    );
    this.router.get(
      '/:id/getUserConversations',
      AuthMiddleware.authenticate,
      this.conversationController.getUserConversations
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteConversationAsync',
      AuthMiddleware.authenticate,
      this.conversationController.deleteConversation
    );
  };
}
