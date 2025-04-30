import {
  UserCreateParameters,
  UserGetByParameter,
  UserLoginParameters,
  UserUpdateParameters,
} from './../dtosInterfaces/userDtos';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/userAuthService';

export class UserController {
  constructor(private _userService: UserService) {}

  public registerAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: UserCreateParameters = req.body;
      await this._userService.registerAsync(parameters);
      res.status(200).json({ message: 'Registration completed successfully' });
    } catch (error) {
      next(error);
    }
  };

  public loginAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: UserLoginParameters = req.body;
      await this._userService.LoginAsync(parameters);
      res.status(200).json({ message: 'Login completed successfully' });
    } catch (error) {
      next(error);
    }
  };

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
      res.status(200).json({ message: 'Delete User Completed Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateUserAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameters: UserUpdateParameters = req.body;
      await this._userService.updateUserAsync(parameters);
      res.status(200).json({ message: 'Update User Completed Successfully' });
    } catch (error) {
      next(error);
    }
  };

  public logoutUserAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: UserGetByParameter = req.body;
      const lastActivity = await this._userService.LogoutAsync(parameter);
      res.status(200).json(lastActivity);
    } catch (error) {
      next(error);
    }
  };

  public getUserConversationsAsync = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parameter: UserGetByParameter = req.body;
      const userConversations = await this._userService.getUserConversationsAsync(parameter);
      res.status(200).json(userConversations);
    } catch (error) {
      next(error);
    }
  };
}
