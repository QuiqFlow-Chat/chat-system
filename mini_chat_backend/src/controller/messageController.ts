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
  public addMessage= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: MessageCreateParameters = req.body;
      await this._messageService.sendMessage(parameters);
      res.status(201).json({ message: MESSAGES.MESSAGE.CREATED });
    } catch (error) {
      next(error);
    }
  };
  public deleteMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: MessageGetByParameter = req.body;
      await this._messageService.deleteMessage(parameter);
      res.status(200).json({ message: MESSAGES.MESSAGE.CREATED });
    } catch (error) {
      next(error);
    }
  };

  public updateMessageContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: MessageUpdateParameters = req.body;
      await this._messageService.updateMessageContent(parameters);
      res.status(200).json({ message: MESSAGES.MESSAGE.UPDATED[0] });
    } catch (error) {
      next(error);
    }
  };

  public updateMessageStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      await this._messageService.updateMessageStatus(id);
      res.status(200).json({ message: MESSAGES.MESSAGE.UPDATED[1] });
    } catch (error) {
      next(error);
    }
  };
}
