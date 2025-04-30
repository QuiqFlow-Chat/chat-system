import { NextFunction, Request, Response } from 'express';
import { UserConversationService } from '../services/userConversationService';
import { UserConversationGetByParameter } from '../dtosInterfaces/userConversationDtos';
import { MESSAGES } from '../constants/message';

export class UserConversationController {
  constructor(private _userConversationService: UserConversationService) {}
  public getAllUserConversationsAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userConversations = await this._userConversationService.getAllUserConversationsAsync();
      res.status(200).json(userConversations);
    } catch (error) {
      next(error);
    }
  };

  public getUserConversationsByIdAsync = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const parameter: UserConversationGetByParameter = req.body;
      const userConversation =
        await this._userConversationService.getUserConversationsByIdAsync(parameter);
      res.status(200).json(userConversation);
    } catch (error) {
      next(error);
    }
  };
  public deleteUserConversationsAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: UserConversationGetByParameter = req.body;
      await this._userConversationService.deleteUserConversationsAsync(parameter);
      res.status(200).json({ message: MESSAGES.USER_CONVERSATION.DELETED });
    } catch (error) {
      next(error);
    }
  };
}
