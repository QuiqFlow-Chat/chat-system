import { userConversationIdSchema } from '@/validations/userConversationValidation';
import { Application } from 'express';
import { BaseRoute } from '@/routes/baseRoute';
import { UserConversationRepository } from '@/repositories/userConversationRepository';
import { UserConversationController } from '@/controller/userConversationController';
import { UserConversationService } from '@/services/userConversationService';
import { AuthMiddleware } from '@/middlewares/authMiddlewares';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { ROUTES } from '@/constants/messages';
export class UserConversationRoute extends BaseRoute {
  private _userConversationRepository: UserConversationRepository;
  private _userConversationService: UserConversationService;
  private _userConversationController: UserConversationController;

  constructor(app: Application) {
    super(app);
    this._userConversationRepository = new UserConversationRepository();
    this._userConversationService = UserConversationService.getInstance(
      this._userConversationRepository
    );
    this._userConversationController = UserConversationController.getInstance(
      this._userConversationService
    );
    this.initGetHttpMethod();
    this.initDeleteHttpMethod();
  }

  private initGetHttpMethod = () => {
    this.router.get(
      ROUTES.USER_CONVERSATION.ALL,
      AuthMiddleware.authenticate,
      this._userConversationController.getAllUserConversations.bind(
        this._userConversationController
      )
    );

    this.router.get(
      ROUTES.USER_CONVERSATION.BY_ID,
      AuthMiddleware.authenticate,
      validateRequest(userConversationIdSchema, 'params'),
      this._userConversationController.getUserConversationsById.bind(
        this._userConversationController
      )
    );
  };

  private initDeleteHttpMethod = () => {
    this.router.delete(
      ROUTES.USER_CONVERSATION.DELETE,
      AuthMiddleware.authenticate,
      validateRequest(userConversationIdSchema, 'body'),
      this._userConversationController.deleteUserConversations.bind(
        this._userConversationController
      )
    );
  };
}
