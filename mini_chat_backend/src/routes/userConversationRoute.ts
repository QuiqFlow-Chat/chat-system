import { Application } from 'express';
import { BaseRoute } from './baseRoute';
import { UserConversationRepository } from '../repositories/userConversationRepository';
import { UserConversationController } from '../controller/userConversationController';
import { UserConversationService } from '../services/userConversationService';
import { AuthMiddleware } from '../middlewares/authMiddlewares';

export class UserConversationRoute extends BaseRoute {
  userConversationRepository: UserConversationRepository;
  userConversationService: UserConversationService;
  userConversationController: UserConversationController;
  constructor(app: Application) {
    super(app);
    this.userConversationRepository = new UserConversationRepository();
    this.userConversationService = new UserConversationService(this.userConversationRepository);
    this.userConversationController = new UserConversationController(this.userConversationService);
    this.initGetHttpMethod();
    this.initDeleteHttpMethod();
  }

  private initGetHttpMethod = async () => {
    this.router.get(
      '/getAllUserConversations',
      AuthMiddleware.authenticate,
      this.userConversationController.getAllUserConversations
    );
    this.router.get(
      '/:id/getUserConversationsById',
      AuthMiddleware.authenticate,
      this.userConversationController.getUserConversationsById
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteUserConversations',
      AuthMiddleware.authenticate,
      this.userConversationController.deleteUserConversations
    );
  };
}
