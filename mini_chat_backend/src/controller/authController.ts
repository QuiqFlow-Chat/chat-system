import { NextFunction, Request, Response } from 'express';
import { MESSAGES } from '../constants/messages';
import { AuthService } from '../services/authService';
import { catchAsync } from '../decorators/try_catchDecorators';
import { UserCreateParameters, UserLoginParameters } from '../shared/dtosInterfaces/userDtos';
import { SuccessCode, sendSuccess } from '../utils/successCode';

export class AuthController {
  private static _authControllerInstance: AuthController;

  private constructor(private _authService: AuthService) {}

  public static getInstance(authService: AuthService): AuthController {
    if (!this._authControllerInstance) {
      this._authControllerInstance = new AuthController(authService);
    }
    return this._authControllerInstance;
  }

  @catchAsync()
  public async register(req: Request, res: Response, _next: NextFunction) {
    const parameters: UserCreateParameters = req.body;
    await this._authService.register(parameters);
    sendSuccess(res, SuccessCode.created(MESSAGES.AUTH.REGISTER.SUCCESS));
  }

  @catchAsync()
  public async login(req: Request, res: Response, _next: NextFunction) {
    const parameters: UserLoginParameters = req.body;
    const user = await this._authService.login(parameters);
    sendSuccess(res, SuccessCode.ok(MESSAGES.AUTH.LOGIN.SUCCESS ,user));
  }
}
