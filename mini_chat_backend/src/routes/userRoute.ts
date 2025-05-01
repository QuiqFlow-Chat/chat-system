import { Application } from 'express';
import { BaseRoute } from './baseRoute';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userService';
import { UserController } from '../controller/userController';
import { AuthMiddleware } from '../middlewares/authMiddlewares';

export class UserRoute extends BaseRoute {
  userRepository: UserRepository;
  userService: UserService;
  userController: UserController;
  constructor(app: Application) {
    super(app);
    this.userRepository = new UserRepository();
    this.userService = new UserService(this.userRepository);
    this.userController = new UserController(this.userService);
    this.initPostHttpMethod();
    this.initGetHttpMethod();
    this.initDeleteHttpMethod();
    this.initUpdateHttpMethod();
  }
  private initPostHttpMethod = async () => {
    // Public routes - no authentication needed
    this.router.post('/registerAsync', this.userController.registerAsync);
    this.router.post('/loginAsync', this.userController.loginAsync);

    // Protected routes - require authentication
    this.router.post(
      '/getUserByIdAsync',
      AuthMiddleware.authenticate,
      this.userController.getUserByIdAsync
    );
    this.router.post(
      '/logoutUserAsync',
      AuthMiddleware.authenticate,
      this.userController.logoutUserAsync
    );
    this.router.post(
      '/getUserConversationsAsync',
      AuthMiddleware.authenticate,
      this.userController.getUserConversationsAsync
    );
  };
  private initGetHttpMethod = async () => {
    this.router.get(
      '/getAllUsersAsync',
      AuthMiddleware.authenticate,
      this.userController.getAllUsersAsync
    );
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete(
      '/deleteUserAsync',
      AuthMiddleware.authenticate,
      this.userController.deleteUserAsync
    );
  };
  private initUpdateHttpMethod = async () => {
    this.router.patch(
      '/updateUserAsync',
      AuthMiddleware.authenticate,
      this.userController.updateUserAsync
    );
  };
}
