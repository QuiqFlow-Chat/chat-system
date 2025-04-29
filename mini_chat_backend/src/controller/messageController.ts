import { NextFunction, Request, Response } from 'express';
import { MessageService } from '../services/messageService';
import {
  MessageCreateParameters,
  MessageGetByParameter,
  MessageUpdateParameters,
} from '../dtosInterfaces/messageDtos';

export class MessageController {
  constructor(private _messageService: MessageService) {}
  public addMessageAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: MessageCreateParameters = req.body;
      await this._messageService.addMessageAsync(parameters);
      res.status(200).json({ message: 'Add Message Completed Successfuly.' });
    } catch (error) {
      next(error);
    }
  };
  public deleteMessageAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: MessageGetByParameter = req.body;
      await this._messageService.deleteMessageAsync(parameter);
      res.status(200).json({ message: 'Delete Message Completed Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateMessageContentAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: MessageUpdateParameters = req.body;
      await this._messageService.updateMessageContentAsync(parameters);
      res.status(200).json({ message: 'Update Message content Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateMessageStatusAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: MessageGetByParameter = req.body;
      await this._messageService.updateMessageStatusAsync(parameters);
      res.status(200).json({ message: 'Update Message status Successfully' });
    } catch (error) {
      next(error);
    }
  };
}
