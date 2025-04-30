import { Application } from 'express';
import { BaseRoute } from './baseRoute';
import { MessageRepository } from '../repositories/messageRepossitory';
import { MessageService } from '../services/messageService';
import { MessageController } from '../controller/messageController';

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
  }
  private initPostHttpMethod = async () => {
    this.router.post('/addMessageAsync', this.messageController.addMessageAsync);
    this.router.post('/updateMessageStatusAsync', this.messageController.updateMessageStatusAsync);
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete('/deleteMessageAsync', this.messageController.deleteMessageAsync);
  };
  private initUpdateHttpMethod = async () => {
    this.router.patch(
      '/updateMessageContentAsync',
      this.messageController.updateMessageContentAsync
    );
  };
}
