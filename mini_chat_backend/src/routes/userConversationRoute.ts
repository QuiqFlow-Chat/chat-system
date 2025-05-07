import { userConversationIdSchema } from './../shared/validations/userConversationValidation';
import { Application } from 'express';
import { BaseRoute } from './baseRoute';
import { UserConversationRepository } from '../repositories/userConversationRepository';
import { UserConversationController } from '../controller/userConversationController';
import { UserConversationService } from '../services/userConversationService';
import { AuthMiddleware } from '../middlewares/authMiddlewares';
import { validateRequest } from '../middlewares/validationMiddleware';

export class UserConversationRoute extends BaseRoute {
  userConversationRepository: UserConversationRepository;
  userConversationService: UserConversationService;
  userConversationController: UserConversationController;
  constructor(app: Application) {
    super(app);
    this.userConversationRepository = new UserConversationRepository();
    this.userConversationService = UserConversationService.getInstance(
      this.userConversationRepository
    );
    this.userConversationController = UserConversationController.getInstance(
      this.userConversationService
    );
    this.initGetHttpMethod();
    this.initDeleteHttpMethod();
  }

  private initGetHttpMethod = async () => {
    this.router.get(
      '/getAllUserConversations',
      AuthMiddleware.authenticate,
      this.userConversationController.getAllUserConversations.bind(this.userConversationController)
    );
    this.router.get(
      '/:id/getUserConversationsById',
      AuthMiddleware.authenticate,
      validateRequest(userConversationIdSchema, 'params'),
      this.userConversationController.getUserConversationsById.bind(this.userConversationController)
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteUserConversations',
      AuthMiddleware.authenticate,
      validateRequest(userConversationIdSchema, 'body'),
      this.userConversationController.deleteUserConversations.bind(this.userConversationController)
    );
  };
}
