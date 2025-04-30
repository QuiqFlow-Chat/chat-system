import { Application } from 'express';
import { BaseRoute } from './baseRoute';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userAuthService';
import { UserController } from '../controller/userAuthController';

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
    this.router.post('/registerAsync', this.userController.registerAsync);
    this.router.post('/loginAsync', this.userController.loginAsync);
    this.router.post('/getUserByIdAsync', this.userController.getUserByIdAsync);
    this.router.post('/logoutUserAsync', this.userController.logoutUserAsync);
    this.router.post('/getUserConversationsAsync', this.userController.getUserConversationsAsync);
  };
  private initGetHttpMethod = async () => {
    this.router.get('/getAllUsersAsync', this.userController.getAllUsersAsync);
  };
  private initDeleteHttpMethod = async () => {
    this.router.delete('/deleteUserAsync', this.userController.deleteUserAsync);
  };
  private initUpdateHttpMethod = async () => {
    this.router.patch('/updateUserAsync', this.userController.updateUserAsync);
  };
}
