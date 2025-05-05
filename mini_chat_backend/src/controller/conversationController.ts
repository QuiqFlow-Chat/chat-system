import { NextFunction, Request, Response } from 'express';
import { ConversationService } from '../services/conversationService';
import { ConversaionGetByParameter } from '../dtosInterfaces/conversationDtos';
import { MESSAGES } from '../constants/message';
import { catchAsync } from '../decorators/try_catchDecorators';

export class ConversationController {
  constructor(private _conversationService: ConversationService) {}
  
  @catchAsync()
  public async addNewConversation (_req: Request, res: Response, _next: NextFunction) {
   
      await this._conversationService.addNewConversation();
      res.status(201).json({ message: MESSAGES.CONVERSATION.CREATED });
   
  };

  @catchAsync()
  public async deleteConversation  (req: Request, res: Response, _next: NextFunction) {
    
      const parameter: ConversaionGetByParameter = req.body;
      await this._conversationService.deleteConversation(parameter);
      res.status(200).json({ message: MESSAGES.CONVERSATION.DELETED });
   
  };
  
  @catchAsync()
  public async getAllConversations (_req: Request, res: Response, _next: NextFunction)  {
   
      const conversations = await this._conversationService.getAllConversations();

      res.status(200).json(conversations);
   
  };
  
  @catchAsync()
  public async getConversationById (req: Request, res: Response, _next: NextFunction) {
    
      const { id } = req.params;
      const conversation = await this._conversationService.getConversationById(id);
      res.status(200).json(conversation);
  };
  
  @catchAsync()
  public async getConversationMessages(req: Request, res: Response, _next: NextFunction){
   
      const { id } = req.params;

      // Extract pagination parameters from query string
      const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

      const messages = await this._conversationService.getConversationMessages(id, {
        page: page || 1,
        limit: limit || 10,
      });

      res.status(200).json(messages);
    
  };
 
  @catchAsync()
  public async getConversationUsers (req: Request, res: Response, _next: NextFunction){
      const { id } = req.params;

      const users = await this._conversationService.getConversationMessages(id);

      res.status(200).json(users);
    
  };

  @catchAsync()
  public async getUserConversations (req: Request, res: Response, __next: NextFunction) {
   
      const { id } = req.params;
       // Extract pagination parameters from query string
       const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
       const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
 
      const userConversations = await this._conversationService.getUserConversations(id, {
        page: page || 1,
        limit: limit || 10,
      });

      res.status(200).json(userConversations);
  };
}
