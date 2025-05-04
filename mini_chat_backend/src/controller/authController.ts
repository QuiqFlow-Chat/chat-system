import { NextFunction , Request , Response } from "express";
import { MESSAGES } from "../constants/message";
import { UserCreateParameters, UserLoginParameters, UserGetByParameter } from "../dtosInterfaces/userDtos";
import { AuthService } from "../services/authService";

export class AuthController{
    constructor(private _authService:AuthService){}
    public registerAsync = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const parameters: UserCreateParameters = req.body;
          await this._authService.registerAsync(parameters);
          res.status(201).json({ message: MESSAGES.USER.CREATED });
        } catch (error) {
          next(error);
        }
      };
    
      public loginAsync = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const parameters: UserLoginParameters = req.body;
          const user = await this._authService.loginAsync(parameters);
          res.status(200).json(user);
        } catch (error) {
          next(error);
        }
      };
    
      public logoutUserAsync = async (req: Request, res: Response, next: NextFunction) => {
        try {
          const parameter: UserGetByParameter = req.body;
          const lastActivity = await this._authService.logoutAsync(parameter);
          res.status(200).json(lastActivity);
        } catch (error) {
          next(error);
        }
      };
}