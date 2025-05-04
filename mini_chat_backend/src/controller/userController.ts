import {
  UserCreateParameters,
  UserGetByParameter,
  UserLoginParameters,
  UserUpdateParameters,
} from './../dtosInterfaces/userDtos';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/userService';
import { MESSAGES } from '../constants/message';

export class UserController {
  constructor(private _userService: UserService) {}

  

  public getAllUsersAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this._userService.getAllUsersAsync();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getUserByIdAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: UserGetByParameter = req.body;
      const user = await this._userService.getUserByIdAsync(parameter);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public deleteUserAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: UserGetByParameter = req.body;
      await this._userService.deleteUserAsync(parameter);
      res.status(200).json({ message: MESSAGES.USER.DELETED });
    } catch (error) {
      next(error);
    }
  };

  public updateUserAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: UserUpdateParameters = req.body;
      await this._userService.updateUserAsync(parameters);
      res.status(200).json({ message: MESSAGES.USER.UPDATED });
    } catch (error) {
      next(error);
    }
  };

}
