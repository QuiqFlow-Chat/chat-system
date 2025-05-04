import { MESSAGES } from '../constants/message';
import {
  UserCreateParameters,
  UserLoginParameters,
  AuthResponse,
  UserGetByParameter,
} from '../dtosInterfaces/userDtos';
import { AppError } from '../middlewares/errorMiddlewares';
import { ConversationsRepository } from '../repositories/conversationsRepository';
import { UserRepository } from '../repositories/userRepository';
import { AuthUtils } from '../utils/authUtils';

export class AuthService {
  _conversationService: ConversationsRepository;
  constructor(private _userRepository: UserRepository) {
    this._conversationService = new ConversationsRepository();
  }
  public registerAsync = async (parameters: UserCreateParameters): Promise<void> => {
    try {
      if (
        !parameters.fullName ||
        !parameters.email ||
        !parameters.password ||
        !parameters.confirmPassword
      )
        throw AppError.badRequest(MESSAGES.AUTH.UN_VALID_REGISTER[0]);
      const checkUser = await this._userRepository.getByEmailAsync(parameters.email);
      if (!checkUser) throw AppError.unauthorized(MESSAGES.AUTH.UN_VALID_REGISTER[1]);
      if (parameters.password !== parameters.confirmPassword)
        throw AppError.badRequest(MESSAGES.AUTH.UN_VALID_REGISTER[2]);

      // Hash the password
      const hashedPassword = await AuthUtils.hashPassword(parameters.password);

      // Create the user with hashed password
      await this._userRepository.addAsync({
        fullName: parameters.fullName,
        email: parameters.email,
        password: hashedPassword,
        lastActivity: new Date(),
      });
      await this._conversationService.addAsync();
    } catch (error) {
      console.log('Error in registerAsync', error);
      throw new Error('Faild to register user');
    }
  };

  public loginAsync = async (parameters: UserLoginParameters): Promise<AuthResponse> => {
    try {
      const checkUser = await this._userRepository.getByEmailAsync(parameters.email);
      if (!checkUser) throw AppError.unauthorized(MESSAGES.AUTH.UN_VALID_LOGIN[1]);

      // Verify password using bcrypt
      const passwordMatch = await AuthUtils.comparePassword(
        parameters.password,
        checkUser.password
      );

      if (!passwordMatch) {
        throw AppError.unauthorized(MESSAGES.AUTH.UN_VALID_LOGIN[0]);
      }

      // Generate token
      const token = AuthUtils.generateToken({
        id: checkUser.id,
        email: checkUser.email,
      });

      return {
        user: {
          id: checkUser.id,
          email: checkUser.email,
          fullName: checkUser.fullName,
        },
        token,
      };
    } catch (error) {
      console.log('Error in loginAsync', error);
      throw new Error('Faild to login user');
    }
  };
  public logoutAsync = async (id: string): Promise<Date> => {
    try {
      const user = await this._userRepository.getByIdAsync(id);
      if (!user) throw AppError.notFound(MESSAGES.USER.NOT_FOUND);
      user.lastActivity = new Date(Date.now());
      await this._userRepository.updateAsync(user);
      return user.lastActivity;
    } catch (error) {
      console.log('Error in logouAsync', error);
      throw new Error('Faild to logout user');
    }
  };
}
