import { NextFunction, Request, Response } from 'express';
import { UserConversationService } from '../services/userConversationService';
import { UserConversationGetByParameter } from '../shared/dtosInterfaces/userConversationDtos';
import { MESSAGES } from '../constants/message';
import { catchAsync } from '../decorators/try_catchDecorators';
import { SuccessCode, sendSuccess } from '../utils/successCode';

export class UserConversationController {
  constructor(private _userConversationService: UserConversationService) {}

  @catchAsync()
  public async getAllUserConversations(_req: Request, res: Response, _next: NextFunction) {
    const userConversations = await this._userConversationService.getAllUserConversations();
    sendSuccess(res, SuccessCode.ok(MESSAGES.USER_CONVERSATION.SUCCESS.FETCHED, userConversations));
  }

  @catchAsync()
  public async getUserConversationsById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const userConversation = await this._userConversationService.getUserConversationsById(id);
    sendSuccess(res, SuccessCode.ok(MESSAGES.USER_CONVERSATION.SUCCESS.FETCHED, userConversation));
  }

  @catchAsync()
  public async deleteUserConversations(req: Request, res: Response, _next: NextFunction) {
    const parameter: UserConversationGetByParameter = req.body;
    await this._userConversationService.deleteUserConversations(parameter);
    sendSuccess(res, SuccessCode.ok(MESSAGES.USER_CONVERSATION.DELETED));
  }
}
