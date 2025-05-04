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
      '/:id/updateMessageStatusAsync',
      AuthMiddleware.authenticate,
      this.messageController.updateMessageStatusAsync
    );
  }
  private initPostHttpMethod = async () => {
    this.router.post(
      '/addMessageAsync',
      AuthMiddleware.authenticate,
      this.messageController.addMessageAsync
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteMessageAsync',
      AuthMiddleware.authenticate,
      this.messageController.deleteMessageAsync
    );
  };
  private initUpdateHttpMethod = async () => {
    this.router.patch(
      '/updateMessageContentAsync',
      AuthMiddleware.authenticate,
      this.messageController.updateMessageContentAsync
    );
  };
}
