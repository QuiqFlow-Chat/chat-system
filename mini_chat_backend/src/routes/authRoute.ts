import { Application } from 'express';
import { AuthController } from '@/controller/authController';
import { UserRepository } from '@/repositories/userRepository';
import { AuthService } from '@/services/authService';
import { authLoginSchema, authRegisterSchema } from '@/validations/authValidation';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { BaseRoute } from '@/routes/baseRoute';
import { ROUTES } from '@/constants/messages';

export class AuthRoute extends BaseRoute {
  private _userRepository: UserRepository;
  private _authService: AuthService;
  private _authController: AuthController;
  
  constructor(app: Application) {
    super(app);
    this._userRepository = new UserRepository();
    this._authService = AuthService.getInstance(this._userRepository);
    this._authController = AuthController.getInstance(this._authService);
    this.initPostHttpMethod();
  }

  private initPostHttpMethod = () => {
    this.router.post(
      ROUTES.AUTH.REGISTER,
      validateRequest(authRegisterSchema, 'body'),
      this._authController.register.bind(this._authController)
    );
    
    this.router.post(
      ROUTES.AUTH.LOGIN,
      validateRequest(authLoginSchema, 'body'),
      this._authController.login.bind(this._authController)
    );
  };
}
