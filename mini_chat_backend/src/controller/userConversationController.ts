import { NextFunction, Request, Response } from 'express';
import { UserConversationService } from '../services/userConversationService';
import { UserConversationGetByParameter } from '../dtosInterfaces/userConversationDtos';
import { MESSAGES } from '../constants/message';
import { catchAsync } from '../decorators/try_catchDecorators';

export class UserConversationController {
  constructor(private _userConversationService: UserConversationService) {}

  @catchAsync()
  public async getAllUserConversations   (_req: Request, res: Response, _next: NextFunction)   {
  
      const userConversations = await this._userConversationService.getAllUserConversations();
      res.status(200).json(userConversations);
  };
  
  @catchAsync()
  public async getUserConversationsById   (
    req: Request,
    res: Response,
    _next: NextFunction
  )   {
   
      const { id } = req.params;
      const userConversation =
        await this._userConversationService.getUserConversationsById(id);
      res.status(200).json(userConversation);
  };

  @catchAsync()
  public async deleteUserConversations   (req: Request, res: Response, _next: NextFunction)   {
    
      const parameter: UserConversationGetByParameter = req.body;
      await this._userConversationService.deleteUserConversations(parameter);
      res.status(200).json({ message: MESSAGES.USER_CONVERSATION.DELETED });
  };
}
