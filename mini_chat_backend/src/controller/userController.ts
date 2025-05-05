import {
  UserGetByParameter,
  UserUpdateParameters,
} from '../shared/dtosInterfaces/userDtos';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/userService';
import { MESSAGES } from '../constants/message';
import { catchAsync } from '../decorators/try_catchDecorators';

export class UserController {
  constructor(private _userService: UserService) {}
  
  @catchAsync()
  public async getAllUsers(_req: Request, res: Response, _next: NextFunction){
    
      const users = await this._userService.getAllUsers();
      res.status(200).json(users);
  };
 
  @catchAsync()
  public async getUserById(req: Request, res: Response, _next: NextFunction) {
   
      const { id } = req.params;
      const user = await this._userService.getUserById(id);
      res.status(200).json(user);
  };
 
  @catchAsync()
  public async deleteUser (req: Request, res: Response, _next: NextFunction) {
    
      const parameter: UserGetByParameter = req.body;
      await this._userService.deleteUser(parameter);
      res.status(200).json({ message: MESSAGES.USER.DELETED });
  };
  
  @catchAsync()
  public async updateUser (req: Request, res: Response, _next: NextFunction) {
     
      const parameters: UserUpdateParameters = req.body;
      await this._userService.updateUser(parameters);
      res.status(200).json({ message: MESSAGES.USER.UPDATED });
  };
  
  @catchAsync()
  public async getUserLastActivity (req: Request, res: Response, _next: NextFunction){
     
      const { id } = req.params;
      const lastActivity = await this._userService.getUserLastActivity(id);
      res.status(200).json(lastActivity);
  };
}
