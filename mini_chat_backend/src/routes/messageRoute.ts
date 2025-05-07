import { messageUpdateContentSchema } from './../shared/validations/messageValidation';
import { Application } from 'express';
import { BaseRoute } from './baseRoute';
import { MessageRepository } from '../repositories/messageRepossitory';
import { MessageService } from '../services/messageService';
import { MessageController } from '../controller/messageController';
import { AuthMiddleware } from '../middlewares/authMiddlewares';
import { validateRequest } from '../middlewares/validationMiddleware';
import { messageIdSchema, sendMessageSchema } from '../shared/validations/messageValidation';

export class MessageRoute extends BaseRoute {
  messageRepository: MessageRepository;
  messageService: MessageService;
  messageController: MessageController;
  constructor(app: Application) {
    super(app);
    this.messageRepository = new MessageRepository();
    this.messageService = MessageService.getInstance(this.messageRepository);
    this.messageController = MessageController.getInstance(this.messageService);
    this.initPostHttpMethod();
    this.initUpdateHttpMethod();
    this.initDeleteHttpMethod();
    this.initGetHttpMethod();
  }
  initGetHttpMethod() {
    this.router.get(
      '/:id/updateMessageStatus',
      AuthMiddleware.authenticate,
      validateRequest(messageIdSchema, 'params'),
      this.messageController.updateMessageStatus.bind(this.messageController)
    );
  }
  private initPostHttpMethod = async () => {
    this.router.post(
      '/sendMessage',
      AuthMiddleware.authenticate,
      validateRequest(sendMessageSchema, 'body'),
      this.messageController.sendMessage.bind(this.messageController)
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteMessage',
      AuthMiddleware.authenticate,
      validateRequest(messageIdSchema, 'body'),
      this.messageController.deleteMessage.bind(this.messageController)
    );
  };
  private initUpdateHttpMethod = async () => {
    this.router.patch(
      '/updateMessageContent',
      AuthMiddleware.authenticate,
      validateRequest(messageUpdateContentSchema, 'body'),
      this.messageController.updateMessageContent.bind(this.messageController)
    );
  };
}
