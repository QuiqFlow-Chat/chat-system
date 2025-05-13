import { IUserGetByParameter, IUserUpdateParameters } from '../types/dtosInterfaces/userDtos';
import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/userService';
import { MESSAGES } from '../constants/messages';
import { catchAsync } from '../decorators/try_catchDecorators';
import { SuccessCode, sendSuccess } from '../utils/successCode';
import { IPaginationParams } from '../types/dtosInterfaces/paginationDtos';

export class UserController {
  private static _userControllerInstance: UserController;
  private constructor(private _userService: UserService) {}

  public static getInstance(userService: UserService): UserController {
    if (!this._userControllerInstance) {
      this._userControllerInstance = new UserController(userService);
    }
    return this._userControllerInstance;
  }

  @catchAsync()
  public async getAllUsers(req: Request, res: Response, _next: NextFunction) {
    const page = req.query.page ? parseInt(req.query.page as string) : undefined;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

    const paginationParams: IPaginationParams | undefined =
      page !== undefined && limit !== undefined ? { page, limit } : undefined;

    const paginatedUsers = await this._userService.getAllUsers(paginationParams);
    sendSuccess(res, SuccessCode.ok(MESSAGES.COMMON.SUCCESS.OK, paginatedUsers));
  }

  @catchAsync()
  public async getUserById(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const user = await this._userService.getUserById(id);
    sendSuccess(res, SuccessCode.ok(MESSAGES.USER.SUCCESS.PROFILE_FETCHED, user));
  }

  @catchAsync()
  public async deleteUser(req: Request, res: Response, _next: NextFunction) {
    const parameter: IUserGetByParameter = req.body;
    await this._userService.deleteUser(parameter);
    sendSuccess(res, SuccessCode.ok(MESSAGES.USER.DELETED));
  }

  @catchAsync()
  public async updateUser(req: Request, res: Response, _next: NextFunction) {
    const parameters: IUserUpdateParameters = req.body;
    await this._userService.updateUser(parameters);
    sendSuccess(res, SuccessCode.ok(MESSAGES.USER.UPDATED));
  }

  @catchAsync()
  public async getUserLastActivity(req: Request, res: Response, _next: NextFunction) {
    const { id } = req.params;
    const lastActivity = await this._userService.getUserLastActivity(id);
    sendSuccess(res, SuccessCode.ok(MESSAGES.COMMON.SUCCESS.OK, lastActivity));
  }
}
