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

  public getAllUsers= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this._userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getUserById= async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const user = await this._userService.getUserById(id);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: UserGetByParameter = req.body;
      await this._userService.deleteUser(parameter);
      res.status(200).json({ message: MESSAGES.USER.DELETED });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: UserUpdateParameters = req.body;
      await this._userService.updateUser(parameters);
      res.status(200).json({ message: MESSAGES.USER.UPDATED });
    } catch (error) {
      next(error);
    }
  };

  public getUserLastActivity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const lastActivity = await this._userService.getUserLastActivity(id);
      res.status(200).json(lastActivity);
    } catch (error) {
      next(error);
    }
  };
}
