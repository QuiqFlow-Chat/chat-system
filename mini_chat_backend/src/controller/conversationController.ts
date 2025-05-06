import { ConversaionMessagesGetByParameters } from './../shared/dtosInterfaces/conversationDtos';
import { NextFunction, Request, Response } from 'express';
import { ConversationService } from '../services/conversationService';
import { ConversaionGetByParameter } from '../shared/dtosInterfaces/conversationDtos';
import { MESSAGES } from '../constants/messages';
import { catchAsync } from '../decorators/try_catchDecorators';
import { SuccessCode, sendSuccess } from '../utils/successCode';

export class ConversationController {
  constructor(private _conversationService: ConversationService) {}

  @catchAsync()
  public async deleteConversation(req: Request, res: Response, _next: NextFunction) {
    const parameter: ConversaionGetByParameter = req.body;
    await this._conversationService.deleteConversation(parameter);
    sendSuccess(res, SuccessCode.ok(MESSAGES.CONVERSATION.DELETED));
  }

  @catchAsync()
  public async getAllConversations(_req: Request, res: Response, _next: NextFunction) {
    const conversations = await this._conversationService.getAllConversations();
    sendSuccess(res, SuccessCode.ok(MESSAGES.CONVERSATION.SUCCESS.FETCHED, conversations));
  }

  @catchAsync()
  public async getConversationById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const conversation = await this._conversationService.getConversationById(id);
    sendSuccess(res, SuccessCode.ok(MESSAGES.SUCCESS.GENERAL.OK, conversation));
  }

  @catchAsync()
  public async getConversationMessages(req: Request, res: Response, _next: NextFunction) {
    const parameters: ConversaionMessagesGetByParameters = req.body;
    // Extract pagination parameters from query string
    const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

    const messages = await this._conversationService.getConversationMessages(parameters, {
      page: page || 1,
      limit: limit || 10,
    });

    sendSuccess(res, SuccessCode.ok(MESSAGES.SUCCESS.GENERAL.OK, messages));
  }

  @catchAsync()
  public async getConversationUsers(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;

    const users = await this._conversationService.getConversationUsers(id);

    sendSuccess(res, SuccessCode.ok(MESSAGES.SUCCESS.GENERAL.OK, users));
  }

  @catchAsync()
  public async getUserConversations(req: Request, res: Response, __next: NextFunction) {
    const { id } = req.params;
    // Extract pagination parameters from query string
    const page = req.query.page ? parseInt(req.query.page as string, 10) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : undefined;

    const userConversations = await this._conversationService.getUserConversations(id, {
      page: page || 1,
      limit: limit || 10,
    });

    sendSuccess(res, SuccessCode.ok(MESSAGES.USER_CONVERSATION.SUCCESS.FETCHED, userConversations));
  }
}
