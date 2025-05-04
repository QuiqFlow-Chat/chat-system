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
    this.initGetHttpMethod();
    this.initDeleteHttpMethod();
    this.initUpdateHttpMethod();
  }

  private initGetHttpMethod = async () => {
    this.router.get(
      '/getAllUsersAsync',
      AuthMiddleware.authenticate,
      this.userController.getAllUsersAsync
    );
    this.router.get(
      '/:id/getUserByIdAsync',
      AuthMiddleware.authenticate,
      this.userController.getUserByIdAsync
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
