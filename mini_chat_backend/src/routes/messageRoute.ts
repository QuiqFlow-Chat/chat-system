import { Application } from 'express';
import { BaseRoute } from './baseRoute';
import { MessageRepository } from '../repositories/messageRepossitory';
import { MessageService } from '../services/messageService';
import { MessageController } from '../controller/messageController';
import { AuthMiddleware } from '../middlewares/authMiddlewares';

export class MessageRoute extends BaseRoute {
  messageRepository: MessageRepository;
  messageService: MessageService;
  messageController: MessageController;
  constructor(app: Application) {
    super(app);
    this.messageRepository = new MessageRepository();
    this.messageService = new MessageService(this.messageRepository);
    this.messageController = new MessageController(this.messageService);
    this.initPostHttpMethod();
    this.initUpdateHttpMethod();
    this.initDeleteHttpMethod();
    this.initGetHttpMethod();
  }
  initGetHttpMethod() {
    this.router.get(
      '/:id/updateMessageStatus',
      AuthMiddleware.authenticate,
      this.messageController.updateMessageStatus
    );
  }
  private initPostHttpMethod = async () => {
    this.router.post(
      '/sendMessage',
      AuthMiddleware.authenticate,
      this.messageController.addMessage
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteMessage',
      AuthMiddleware.authenticate,
      this.messageController.deleteMessage
    );
  };
  private initUpdateHttpMethod = async () => {
    this.router.patch(
      '/updateMessageContent',
      AuthMiddleware.authenticate,
      this.messageController.updateMessageContent
    );
  };
}
