import { NextFunction, Request, Response } from 'express';
import { MessageService } from '../services/messageService';
import {
  MessageCreateParameters,
  MessageGetByParameter,
  MessageUpdateParameters,
} from '../dtosInterfaces/messageDtos';
import { MESSAGES } from '../constants/message';
import { catchAsync } from '../decorators/try_catchDecorators';

export class MessageController {
  constructor(private _messageService: MessageService) {}

  @catchAsync()
  public async addMessage(req: Request, res: Response, _next: NextFunction) {
    
      const parameters: MessageCreateParameters = req.body;
      await this._messageService.sendMessage(parameters);
      res.status(201).json({ message: MESSAGES.MESSAGE.CREATED });
   
  };

  @catchAsync()
  public async deleteMessage (req: Request, res: Response, _next: NextFunction)  {
   
      const parameter: MessageGetByParameter = req.body;
      await this._messageService.deleteMessage(parameter);
      res.status(200).json({ message: MESSAGES.MESSAGE.CREATED });
  };

  @catchAsync()
  public async updateMessageContent (req: Request, res: Response, _next: NextFunction){
    
      const parameters: MessageUpdateParameters = req.body;
      await this._messageService.updateMessageContent(parameters);
      res.status(200).json({ message: MESSAGES.MESSAGE.UPDATED[0] });
  };
  
  @catchAsync()
  public async updateMessageStatus (req: Request, res: Response, _next: NextFunction)  {
   
      const { id } = req.params;
      await this._messageService.updateMessageStatus(id);
      res.status(200).json({ message: MESSAGES.MESSAGE.UPDATED[1] });
  };
}
