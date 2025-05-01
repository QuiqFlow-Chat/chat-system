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
    this.initPostHttpMethod();
    this.initGetHttpMethod();
    this.initDeleteHttpMethod();
  }
  private initPostHttpMethod = async () => {
    this.router.post(
      '/getUserConversationsByIdAsync',
      AuthMiddleware.authenticate,
      this.userConversationController.getUserConversationsByIdAsync
    );
  };
  private initGetHttpMethod = async () => {
    this.router.get(
      '/getAllUserConversationsAsync',
      AuthMiddleware.authenticate,
      this.userConversationController.getAllUserConversationsAsync
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteUserConversationsAsync',
      AuthMiddleware.authenticate,
      this.userConversationController.deleteUserConversationsAsync
    );
  };
}
