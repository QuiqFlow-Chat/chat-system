import { NextFunction, Request, Response } from 'express';
import { MessageService } from '../services/messageService';
import {
  MessageCreateParameters,
  MessageGetByParameter,
  MessageUpdateParameters,
} from '../dtosInterfaces/messageDtos';
import { MESSAGES } from '../constants/message';

export class MessageController {
  constructor(private _messageService: MessageService) {}
  public addMessageAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: MessageCreateParameters = req.body;
      await this._messageService.addMessageAsync(parameters);
      res.status(200).json({ message: MESSAGES.MESSAGE.CREATED });
    } catch (error) {
      next(error);
    }
  };
  public deleteMessageAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: MessageGetByParameter = req.body;
      await this._messageService.deleteMessageAsync(parameter);
      res.status(200).json({ message: MESSAGES.MESSAGE.CREATED });
    } catch (error) {
      next(error);
    }
  };

  public updateMessageContentAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: MessageUpdateParameters = req.body;
      await this._messageService.updateMessageContentAsync(parameters);
      res.status(200).json({ message: MESSAGES.MESSAGE.UPDATED[0] });
    } catch (error) {
      next(error);
    }
  };

  public updateMessageStatusAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: MessageGetByParameter = req.body;
      await this._messageService.updateMessageStatusAsync(parameters);
      res.status(200).json({ message: MESSAGES.MESSAGE.UPDATED[1] });
    } catch (error) {
      next(error);
    }
  };
}
