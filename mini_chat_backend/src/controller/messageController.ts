import { NextFunction, Request, Response } from 'express';
import { MessageService } from '@/services/messageService';
import {
  IMessageCreateParameters,
  IMessageGetByParameter,
  IMessageUpdateParameters,
} from '@/types/dtosInterfaces/messageDtos';
import { MESSAGES } from '@/constants/messages';
import { catchAsync } from '@/decorators/try_catchDecorators';
import { SuccessCode, sendSuccess } from '@/utils/successCode';

export class MessageController {
  private static _messageControllerInstance: MessageController;
  private constructor(private _messageService: MessageService) {}

  public static getInstance(messageService: MessageService): MessageController {
    if (!this._messageControllerInstance) {
      this._messageControllerInstance = new MessageController(messageService);
    }
    return this._messageControllerInstance;
  }

  @catchAsync()
  public async sendMessage(req: Request, res: Response, _next: NextFunction) {
    const parameters: IMessageCreateParameters = req.body;
    const message = await this._messageService.sendMessage(parameters);
    sendSuccess(res, SuccessCode.created(MESSAGES.MESSAGE.CREATE.SUCCESS, message));
    
  }

  @catchAsync()
  public async deleteMessage(req: Request, res: Response, _next: NextFunction) {
    const parameter: IMessageGetByParameter = req.body;
    await this._messageService.deleteMessage(parameter);
    sendSuccess(res, SuccessCode.ok(MESSAGES.MESSAGE.DELETED));
  }

  @catchAsync()
  public async updateMessageContent(req: Request, res: Response, _next: NextFunction) {
    const parameters: IMessageUpdateParameters = req.body;
    await this._messageService.updateMessageContent(parameters);
    sendSuccess(res, SuccessCode.ok(MESSAGES.MESSAGE.UPDATED.CONTENT));
  }

  @catchAsync()
  public async updateMessageStatus(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    await this._messageService.updateMessageStatus(id);
    sendSuccess(res, SuccessCode.ok(MESSAGES.MESSAGE.UPDATED.STATUS));
  }
}
