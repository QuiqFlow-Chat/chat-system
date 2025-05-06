import { Application } from 'express';
import { AuthController } from '../controller/authController';
import { UserRepository } from '../repositories/userRepository';
import { AuthService } from '../services/authService';
import { BaseRoute } from './baseRoute';
import { authLoginSchema, authRegisterSchema } from '../shared/validations/authValidation';
import { validateRequest } from '../middlewares/validationMiddleware';

export class AuthRoute extends BaseRoute {
  userRepository: UserRepository;
  authService: AuthService;
  authController: AuthController;
  constructor(app: Application) {
    super(app);
    this.userRepository = new UserRepository();
    this.authService = new AuthService(this.userRepository);
    this.authController = new AuthController(this.authService);
    this.initPostHttpMethod();
  }
  private initPostHttpMethod = async () => {
    // Public routes - no authentication needed
    this.router.post(
      '/register',
      validateRequest(authRegisterSchema, 'body'),
      this.authController.register.bind(this.authController)
    );
    this.router.post(
      '/login',
      validateRequest(authLoginSchema, 'body'),
      this.authController.login.bind(this.authController)
    );
  };
}
