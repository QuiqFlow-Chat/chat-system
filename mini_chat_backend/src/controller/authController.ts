import { NextFunction, Request, Response } from 'express';
import { MESSAGES } from '../constants/message';
import {
  UserCreateParameters,
  UserLoginParameters,
} from '../dtosInterfaces/userDtos';
import { AuthService } from '../services/authService';
import { catchAsync } from '../decorators/try_catchDecorators';

export class AuthController {
  constructor(private _authService: AuthService) {}

  @catchAsync()
  public async register (req: Request, res: Response, next: NextFunction){  
      const parameters: UserCreateParameters = req.body;
      await this._authService.register(parameters);
      res.status(201).json({ message: MESSAGES.USER.CREATED });
  };

  @catchAsync()
  public async login (req: Request, res: Response, next: NextFunction) {
      
      const parameters: UserLoginParameters = req.body;
      const user = await this._authService.login(parameters);
      res.status(200).json(user);
   
  };
}
