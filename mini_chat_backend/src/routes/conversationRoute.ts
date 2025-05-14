import { ConversationService } from '@/services/conversationService';
import { ConversationsRepository } from '@/repositories/conversationsRepository';
import { Application } from 'express';
import { BaseRoute } from '@/routes/baseRoute';
import { ConversationController } from '@/controller/conversationController';
import { AuthMiddleware } from '@/middlewares/authMiddlewares';
import { validateRequest } from '@/middlewares/validationMiddleware';
import {
  conversationIdSchema,
  conversationIdSchemaforMessages,
} from '@/validations/conversationValidation';
import { ROUTES } from '@/constants/messages';
export class ConversationRoute extends BaseRoute {
  private _conversationRepository: ConversationsRepository;
  private _conversationService: ConversationService;
  private _conversationController: ConversationController;
  
  constructor(app: Application) {
    super(app);
    this._conversationRepository = new ConversationsRepository();
    this._conversationService = ConversationService.getInstance(this._conversationRepository);
    this._conversationController = ConversationController.getInstance(this._conversationService);
    this.initGetHttpMethod();
    this.initDeleteHttpMethod();
    this.initPostHttpMethod();
  }
  
  private initPostHttpMethod() {
    this.router.post(
      ROUTES.CONVERSATION.MESSAGES,
      AuthMiddleware.authenticate,
      validateRequest(conversationIdSchemaforMessages, 'body'),
      this._conversationController.getConversationMessages.bind(this._conversationController)
    );
  }

  private initGetHttpMethod = () => {
    this.router.get(
      ROUTES.CONVERSATION.ALL,
      AuthMiddleware.authenticate,
      this._conversationController.getAllConversations.bind(this._conversationController)
    );
    
    this.router.get(
      ROUTES.CONVERSATION.BY_ID,
      AuthMiddleware.authenticate,
      validateRequest(conversationIdSchema, 'params'),
      this._conversationController.getConversationById.bind(this._conversationController)
    );
    
    this.router.get(
      ROUTES.CONVERSATION.USERS,
      AuthMiddleware.authenticate,
      validateRequest(conversationIdSchema, 'params'),
      this._conversationController.getConversationUsers.bind(this._conversationController)
    );
    
    this.router.get(
      ROUTES.CONVERSATION.USER_CONVERSATIONS,
      AuthMiddleware.authenticate,
      validateRequest(conversationIdSchema, 'params'),
      this._conversationController.getUserConversations.bind(this._conversationController)
    );
  };
  
  private initDeleteHttpMethod = () => {
    this.router.delete(
      ROUTES.CONVERSATION.DELETE,
      AuthMiddleware.authenticate,
      validateRequest(conversationIdSchema, 'body'),
      this._conversationController.deleteConversation.bind(this._conversationController)
    );
  };
}
