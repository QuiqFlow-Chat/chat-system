import { messageUpdateContentSchema } from '@/validations/messageValidation';
import { Application } from 'express';
import { BaseRoute } from '@/routes/baseRoute';
import { MessageRepository } from '@/repositories/messageRepository';
import { MessageService } from '@/services/messageService';
import { MessageController } from '@/controller/messageController';
import { AuthMiddleware } from '@/middlewares/authMiddlewares';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { messageIdSchema, sendMessageSchema } from '@/validations/messageValidation';
import { ROUTES } from '@/constants/messages';
export class MessageRoute extends BaseRoute {
  private _messageRepository: MessageRepository;
  private _messageService: MessageService;
  private _messageController: MessageController;
  
  constructor(app: Application) {
    super(app);
    this._messageRepository = new MessageRepository();
    this._messageService = MessageService.getInstance(this._messageRepository);
    this._messageController = MessageController.getInstance(this._messageService);
    this.initPostHttpMethod();
    this.initUpdateHttpMethod();
    this.initDeleteHttpMethod();
    this.initGetHttpMethod();
  }
  
  private initGetHttpMethod() {
    this.router.get(
      ROUTES.MESSAGE.UPDATE_STATUS,
      AuthMiddleware.authenticate,
      validateRequest(messageIdSchema, 'params'),
      this._messageController.updateMessageStatus.bind(this._messageController)
    );
  }
  
  private initPostHttpMethod = () => {
    this.router.post(
      ROUTES.MESSAGE.SEND,
      AuthMiddleware.authenticate,
      validateRequest(sendMessageSchema, 'body'),
      this._messageController.sendMessage.bind(this._messageController)
    );
  };
  
  private initDeleteHttpMethod = () => {
    this.router.delete(
      ROUTES.MESSAGE.DELETE,
      AuthMiddleware.authenticate,
      validateRequest(messageIdSchema, 'body'),
      this._messageController.deleteMessage.bind(this._messageController)
    );
  };
  
  private initUpdateHttpMethod = () => {
    this.router.patch(
      ROUTES.MESSAGE.UPDATE_CONTENT,
      AuthMiddleware.authenticate,
      validateRequest(messageUpdateContentSchema, 'body'),
      this._messageController.updateMessageContent.bind(this._messageController)
    );
  };
}
