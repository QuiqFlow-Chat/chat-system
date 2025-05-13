import { UserConversationService } from '@/services/userConversationService';
import { NextFunction, Request, Response } from 'express';
import { IUserConversationGetByParameter } from '@/types/dtosInterfaces/userConversationDtos';
import { MESSAGES } from '@/constants/messages';
import { catchAsync } from '@/decorators/try_catchDecorators';
import { SuccessCode, sendSuccess } from '@/utils/successCode';

export class UserConversationController {
  private static _userConvControllerInstance: UserConversationController;
  private constructor(private _userConversationService: UserConversationService) {}

  public static getInstance(
    userConversationService: UserConversationService
  ): UserConversationController {
    if (!this._userConvControllerInstance) {
      this._userConvControllerInstance = new UserConversationController(userConversationService);
    }
    return this._userConvControllerInstance;
  }

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
    const parameter: IUserConversationGetByParameter = req.body;
    await this._userConversationService.deleteUserConversations(parameter);
    sendSuccess(res, SuccessCode.ok(MESSAGES.USER_CONVERSATION.DELETED));
  }
}
