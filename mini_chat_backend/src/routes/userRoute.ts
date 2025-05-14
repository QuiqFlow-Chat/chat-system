import { Application } from 'express';
import { BaseRoute } from '@/routes/baseRoute';
import { UserRepository } from '@/repositories/userRepository';
import { UserService } from '@/services/userService';
import { UserController } from '@/controller/userController';
import { AuthMiddleware } from '@/middlewares/authMiddlewares';
import { validateRequest } from '@/middlewares/validationMiddleware';
import { userIdSchema, userUpdateSchema } from '@/validations/userValidation';
import { ROUTES } from '@/constants/messages';
export class UserRoute extends BaseRoute {
  private _userRepository: UserRepository;
  private _userService: UserService;
  private _userController: UserController;
  
  constructor(app: Application) {
    super(app);
    this._userRepository = new UserRepository();
    this._userService = UserService.getInstance(this._userRepository);
    this._userController = UserController.getInstance(this._userService);
    this.initGetHttpMethod();
    this.initDeleteHttpMethod();
    this.initUpdateHttpMethod();
  }

  private initGetHttpMethod = () => {
    this.router.get(
      ROUTES.USER.ALL,
      AuthMiddleware.authenticate,
      this._userController.getAllUsers.bind(this._userController)
    );
    
    this.router.get(
      ROUTES.USER.BY_ID,
      AuthMiddleware.authenticate,
      validateRequest(userIdSchema, 'params'),
      this._userController.getUserById.bind(this._userController)
    );
    
    this.router.get(
      ROUTES.USER.LAST_ACTIVITY,
      AuthMiddleware.authenticate,
      validateRequest(userIdSchema, 'params'),
      this._userController.getUserLastActivity.bind(this._userController)
    );
  };
  
  private initDeleteHttpMethod = () => {
    this.router.delete(
      ROUTES.USER.DELETE,
      AuthMiddleware.authenticate,
      validateRequest(userIdSchema, 'body'),
      this._userController.deleteUser.bind(this._userController)
    );
  };
  
  private initUpdateHttpMethod = () => {
    this.router.patch(
      ROUTES.USER.UPDATE,
      AuthMiddleware.authenticate,
      validateRequest(userUpdateSchema, 'body'),
      this._userController.updateUser.bind(this._userController)
    );
  };
}
