import { NextFunction, Request, Response } from 'express';
import { MessageService } from '../services/messageService';
import {
  MessageCreateParameters,
  MessageGetByParameter,
  MessageUpdateParameters,
} from '../shared/dtosInterfaces/messageDtos';
import { MESSAGES } from '../constants/message';
import { catchAsync } from '../decorators/try_catchDecorators';
import { SuccessCode, sendSuccess } from '../utils/successCode';

export class MessageController {
  constructor(private _messageService: MessageService) {}

  @catchAsync()
  public async sendMessage(req: Request, res: Response, _next: NextFunction) {
    const parameters: MessageCreateParameters = req.body;
    await this._messageService.sendMessage(parameters);
    sendSuccess(res, SuccessCode.created(MESSAGES.MESSAGE.SUCCESS.SENT));
  }

  @catchAsync()
  public async deleteMessage(req: Request, res: Response, _next: NextFunction) {
    const parameter: MessageGetByParameter = req.body;
    await this._messageService.deleteMessage(parameter);
    sendSuccess(res, SuccessCode.ok(MESSAGES.MESSAGE.DELETED));
  }

  @catchAsync()
  public async updateMessageContent(req: Request, res: Response, _next: NextFunction) {
    const parameters: MessageUpdateParameters = req.body;
    await this._messageService.updateMessageContent(parameters);
    sendSuccess(res, SuccessCode.ok(MESSAGES.MESSAGE.UPDATED[0]));
  }

  @catchAsync()
  public async updateMessageStatus(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    await this._messageService.updateMessageStatus(id);
    sendSuccess(res, SuccessCode.ok(MESSAGES.MESSAGE.SUCCESS.READ));
  }
}
