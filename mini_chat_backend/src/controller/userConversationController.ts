import { NextFunction, Request, Response } from 'express';
import { UserConversationService } from '../services/userConversationService';
import { UserConversationGetByParameter } from '../dtosInterfaces/userConversationDtos';
import { MESSAGES } from '../constants/message';

export class UserConversationController {
  constructor(private _userConversationService: UserConversationService) {}
  public getAllUserConversations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userConversations = await this._userConversationService.getAllUserConversations();
      res.status(200).json(userConversations);
    } catch (error) {
      next(error);
    }
  };

  public getUserConversationsById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const userConversation =
        await this._userConversationService.getUserConversationsById(id);
      res.status(200).json(userConversation);
    } catch (error) {
      next(error);
    }
  };
  public deleteUserConversations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: UserConversationGetByParameter = req.body;
      await this._userConversationService.deleteUserConversations(parameter);
      res.status(200).json({ message: MESSAGES.USER_CONVERSATION.DELETED });
    } catch (error) {
      next(error);
    }
  };
}
