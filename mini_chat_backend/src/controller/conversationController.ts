import { NextFunction, Request, Response } from 'express';
import { ConversationService } from '../services/conversationService';
import { ConversaionGetByParameter } from '../dtosInterfaces/conversationDtos';
import { MESSAGES } from '../constants/message';

export class ConversationController {
  constructor(private _conversationService: ConversationService) {}

  public addNewConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this._conversationService.addNewConversation();
      res.status(201).json({ message: MESSAGES.CONVERSATION.CREATED });
    } catch (error) {
      next(error);
    }
  };

  public deleteConversation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: ConversaionGetByParameter = req.body;
      await this._conversationService.deleteConversation(parameter);
      res.status(200).json({ message: MESSAGES.CONVERSATION.DELETED });
    } catch (error) {
      next(error);
    }
  };

  public getAllConversations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const conversations = await this._conversationService.getAllConversations();

      res.status(200).json(conversations);
    } catch (error) {
      next(error);
    }
  };

  public getConversationById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const conversation = await this._conversationService.getConversationById(id);
      res.status(200).json(conversation);
    } catch (error) {
      next(error);
    }
  };

  public getConversationMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      // Extract pagination parameters from query string
      const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

      const messages = await this._conversationService.getConversationMessages(id, {
        page: page || 1,
        limit: limit || 10,
      });

      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  };

  public getConversationUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const users = await this._conversationService.getConversationMessages(id);

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };
  public getUserConversations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
       // Extract pagination parameters from query string
       const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
       const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;
 
      const userConversations = await this._conversationService.getUserConversations(id, {
        page: page || 1,
        limit: limit || 10,
      });

      res.status(200).json(userConversations);
    } catch (error) {
      next(error);
    }
  };
}
