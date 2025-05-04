import { Application } from 'express';
import { AuthController } from '../controller/authController';
import { UserRepository } from '../repositories/userRepository';
import { AuthService } from '../services/authService';
import { BaseRoute } from './baseRoute';

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
    this.initGetHttpMethod();
  }
  initGetHttpMethod() {
    this.router.get('/:id/logoutAsync', this.authController.logoutUserAsync);
  }
  private initPostHttpMethod = async () => {
    // Public routes - no authentication needed
    this.router.post('/registerAsync', this.authController.registerAsync);
    this.router.post('/loginAsync', this.authController.loginAsync);
  };
}
