import { ConversationService } from './../services/conversationService';
import { ConversationsRepository } from './../repositories/conversationsRepository';
import { Application } from 'express';
import { BaseRoute } from './baseRoute';
import { ConversationController } from '../controller/conversationController';
import { AuthMiddleware } from '../middlewares/authMiddlewares';
import { validateRequest } from '../middlewares/validationMiddleware';
import { conversationIdSchema } from '../shared/validations/conversationValidation';

export class ConversationRoute extends BaseRoute {
  conversationRepository: ConversationsRepository;
  conversationService: ConversationService;
  conversationController: ConversationController;
  constructor(app: Application) {
    super(app);
    this.conversationRepository = new ConversationsRepository();
    this.conversationService = new ConversationService(this.conversationRepository);
    this.conversationController = new ConversationController(this.conversationService);
    this.initGetHttpMethod();
    this.initDeleteHttpMethod();
  }

  private initGetHttpMethod = async () => {
    this.router.get(
      '/getAllConversations',
      AuthMiddleware.authenticate,
      this.conversationController.getAllConversations
    );
    this.router.get(
      '/:id/getConversationById',
      validateRequest(conversationIdSchema, 'params'),
      AuthMiddleware.authenticate,
      this.conversationController.getConversationById
    );
    this.router.get(
      '/:id/getConversationMessages',
      validateRequest(conversationIdSchema, 'params'),
      AuthMiddleware.authenticate,
      this.conversationController.getConversationMessages
    );
    this.router.get(
      '/:id/getConversationUsers',
      validateRequest(conversationIdSchema, 'params'),
      AuthMiddleware.authenticate,
      this.conversationController.getConversationUsers
    );
    this.router.get(
      '/:id/getUserConversations',
      validateRequest(conversationIdSchema, 'params'),
      AuthMiddleware.authenticate,
      this.conversationController.getUserConversations
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteConversationAsync',
      validateRequest(conversationIdSchema, 'body'),
      AuthMiddleware.authenticate,
      this.conversationController.deleteConversation
    );
  };
}
