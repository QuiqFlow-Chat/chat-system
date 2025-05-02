import { NextFunction, Request, Response } from 'express';
import { ConversationService } from '../services/conversationService';
import { ConversaionGetByParameter } from '../dtosInterfaces/conversationDtos';
import { MESSAGES } from '../constants/message';

export class ConversationController {
  constructor(private _conversationService: ConversationService) {}

  public addConversationAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._conversationService.addConversationAsync();
      res.status(200).json({ message: MESSAGES.CONVERSATION.CREATED });
    } catch (error) {
      next(error);
    }
  };

  public deleteConversationAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: ConversaionGetByParameter = req.body;
      await this._conversationService.deleteConversationAsync(parameter);
      res.status(200).json({ message: MESSAGES.CONVERSATION.DELETED });
    } catch (error) {
      next(error);
    }
  };

  public getAllConversationsAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Extract pagination parameters from query string
      const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

      const conversations = await this._conversationService.getAllConversationsAsync({
        page: page || 1,
        limit: limit || 10,
      });

      res.status(200).json(conversations);
    } catch (error) {
      next(error);
    }
  };

  public getConversationByIdAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: ConversaionGetByParameter = req.body;
      const conversation = await this._conversationService.getConversationByIdAsync(parameter);
      res.status(200).json(conversation);
    } catch (error) {
      next(error);
    }
  };

  public getConversationMessagesAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: ConversaionGetByParameter = req.body;
      
      // Extract pagination parameters from query string
      const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
      
      const messages = await this._conversationService.getConversationMessagesAsync(parameter, { 
        page: page || 1, 
        limit: limit || 10 
      });
      
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  };
}
