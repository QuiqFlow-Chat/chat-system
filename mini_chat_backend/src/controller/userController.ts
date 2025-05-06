import { UserGetByParameter, UserUpdateParameters } from '../shared/dtosInterfaces/userDtos';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/userService';
import { MESSAGES } from '../constants/messages';
import { catchAsync } from '../decorators/try_catchDecorators';
import { SuccessCode, sendSuccess } from '../utils/successCode';

export class UserController {
  constructor(private _userService: UserService) {}

  @catchAsync()
  public async getAllUsers(_req: Request, res: Response, _next: NextFunction) {
    const users = await this._userService.getAllUsers();
    sendSuccess(res, SuccessCode.ok(MESSAGES.SUCCESS.GENERAL.OK, users));
  }

  @catchAsync()
  public async getUserById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const user = await this._userService.getUserById(id);
    sendSuccess(res, SuccessCode.ok(MESSAGES.USER.SUCCESS.PROFILE_FETCHED, user));
  }

  @catchAsync()
  public async deleteUser(req: Request, res: Response, _next: NextFunction) {
    const parameter: UserGetByParameter = req.body;
    await this._userService.deleteUser(parameter);
    sendSuccess(res, SuccessCode.ok(MESSAGES.USER.DELETED));
  }

  @catchAsync()
  public async updateUser(req: Request, res: Response, _next: NextFunction) {
    const parameters: UserUpdateParameters = req.body;
    await this._userService.updateUser(parameters);
    sendSuccess(res, SuccessCode.ok(MESSAGES.USER.UPDATED));
  }

  @catchAsync()
  public async getUserLastActivity(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const lastActivity = await this._userService.getUserLastActivity(id);
    sendSuccess(res, SuccessCode.ok(MESSAGES.SUCCESS.GENERAL.OK, lastActivity));
  }
}
