import { NextFunction,Request,Response } from "express";
import { UserConversationCreateParameters } from "../dtosInterfaces/userConversationDtos";
import { ConversationService } from "../services/conversationService";
import { ConversaionGetByParameter } from "../dtosInterfaces/conversationDtos";

export class ConversationController{
    constructor(private _conversationService:ConversationService){};
     public addConversationAsync = async (req: Request, res: Response, next: NextFunction) => {
        try {
          await this._conversationService.addConversationAsync();
          res.status(200).json({ message: 'Add Conversation Completed Successfuly.' });
        } catch (error) {
          next(error);
        }
      };

       public deleteConversationAsync = async (req: Request, res: Response, next: NextFunction) => {
          try {
            const parameter: ConversaionGetByParameter = req.body;
            await this._conversationService.deleteConversationAsync(parameter);
            res.status(200).json({ message: 'Delete Conversation Completed Successfully' });
          } catch (error) {
            next(error);
          }
        };

         public getAllConversationsAsync = async (req: Request, res: Response, next: NextFunction) => {
            try {
              const conversations = await this._conversationService.getAllConversationsAsync();
              res.status(200).json(conversations);
            } catch (error) {
              next(error);
            }
          };
        
          public getConversationByIdAsync = async (req: Request, res: Response, next: NextFunction) => {
            try {
              const parameter: ConversaionGetByParameter = req.body;
              const conversation = await this._conversationService.getConversationByIdAsync(parameter);
              res.status(200).json(conversation);
            } catch (error) {
              next(error);
            }
          };

          public getConversationMessagesAsync = async (req: Request, res: Response, next: NextFunction) => {
            try {
              const parameter: ConversaionGetByParameter = req.body;
              const conversationMessages = await this._conversationService.getConversationMessagesAsync(parameter);
              res.status(200).json(conversationMessages);
            } catch (error) {
              next(error);
            }
          };
      
}