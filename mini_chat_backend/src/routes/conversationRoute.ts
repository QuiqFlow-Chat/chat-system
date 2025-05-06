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
      this.conversationController.getAllConversations.bind(this.conversationController)
    );
    this.router.get(
      '/:id/getConversationById',
      AuthMiddleware.authenticate,
      validateRequest(conversationIdSchema, 'params'),
      this.conversationController.getConversationById.bind(this.conversationController)
    );
    this.router.get(
      '/:id/getConversationMessages',
      AuthMiddleware.authenticate,
      validateRequest(conversationIdSchema, 'params'),
      this.conversationController.getConversationMessages.bind(this.conversationController)
    );
    this.router.get(
      '/:id/getConversationUsers',
      AuthMiddleware.authenticate,
      validateRequest(conversationIdSchema, 'params'),
      this.conversationController.getConversationUsers.bind(this.conversationController)
    );
    this.router.get(
      '/:id/getUserConversations',
      AuthMiddleware.authenticate,
      validateRequest(conversationIdSchema, 'params'),
      this.conversationController.getUserConversations.bind(this.conversationController)
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteConversationAsync',
      AuthMiddleware.authenticate,
      validateRequest(conversationIdSchema, 'body'),
      this.conversationController.deleteConversation.bind(this.conversationController)
    );
  };
}
