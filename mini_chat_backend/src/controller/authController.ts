import { NextFunction, Request, Response } from 'express';
import { MESSAGES } from '../constants/message';
import {
  UserCreateParameters,
  UserLoginParameters,
} from '../dtosInterfaces/userDtos';
import { AuthService } from '../services/authService';

export class AuthController {
  constructor(private _authService: AuthService) {}
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: UserCreateParameters = req.body;
      await this._authService.register(parameters);
      res.status(201).json({ message: MESSAGES.USER.CREATED });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: UserLoginParameters = req.body;
      const user = await this._authService.login(parameters);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };
}
