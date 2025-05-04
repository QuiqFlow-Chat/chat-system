import { ConversationService } from './../services/conversationService';
import { ConversationsRepository } from './../repositories/conversationsRepository';
import { Application } from 'express';
import { BaseRoute } from './baseRoute';
import { ConversationController } from '../controller/conversationController';
import { AuthMiddleware } from '../middlewares/authMiddlewares';

export class ConversationRoute extends BaseRoute {
  conversationRepository: ConversationsRepository;
  conversationService: ConversationService;
  conversationController: ConversationController;
  constructor(app: Application) {
    super(app);
    this.conversationRepository = new ConversationsRepository();
    this.conversationService = new ConversationService(this.conversationRepository);
    this.conversationController = new ConversationController(this.conversationService);
    this.initPostHttpMethod();
    this.initGetHttpMethod();
    this.initDeleteHttpMethod();
  }
  private initPostHttpMethod = async () => {
    this.router.post(
      '/addConversationAsync',
      AuthMiddleware.authenticate,
      this.conversationController.addConversationAsync
    );
    this.router.post(
      '/getConversationByIdAsync',
      AuthMiddleware.authenticate,
      this.conversationController.getConversationByIdAsync
    );
    this.router.post(
      '/getConversationMessagesAsync',
      AuthMiddleware.authenticate,
      this.conversationController.getConversationMessagesAsync
    );
    this.router.post(
      '/getUserConversationsAsync',
      AuthMiddleware.authenticate,
      this.conversationController.getUserConversationsAsync
    );
  };
  private initGetHttpMethod = async () => {
    this.router.get(
      '/getAllConversationsAsync',
      AuthMiddleware.authenticate,
      this.conversationController.getAllConversationsAsync
    );
    
    // Update this route to use GET method instead of POST for better RESTful practice
    this.router.get(
      '/conversations/:id/messages',
      AuthMiddleware.authenticate,
      (req, res, next) => {
        // Initialize req.body if it's undefined
        if (!req.body) {
          req.body = {};
        }
        req.body.id = req.params.id;
        this.conversationController.getConversationMessagesAsync(req, res, next);
      }
    );
    
    // Keep the original route for backward compatibility
    // this.router.post(
    //   '/getConversationMessagesAsync',
    //   AuthMiddleware.authenticate,
    //   this.conversationController.getConversationMessagesAsync
    // );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteConversationAsync',
      AuthMiddleware.authenticate,
      this.conversationController.deleteConversationAsync
    );
  };
}
