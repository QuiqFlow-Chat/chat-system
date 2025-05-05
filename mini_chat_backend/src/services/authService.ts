import { MESSAGES } from '../constants/message';
import {
  UserCreateParameters,
  UserLoginParameters,
  AuthResponse,
} from '../dtosInterfaces/userDtos';
import { AppError } from '../middlewares/errorMiddlewares';
import { UserRepository } from '../repositories/userRepository';
import { AuthUtils } from '../utils/authUtils';

export class AuthService {
  constructor(private _userRepository: UserRepository) {}
  public register = async (parameters: UserCreateParameters): Promise<void> => {
    try {
      if (
        !parameters.fullName ||
        !parameters.email ||
        !parameters.password ||
        !parameters.confirmPassword
      )
        throw AppError.badRequest(MESSAGES.AUTH.UN_VALID_REGISTER[0]);
      const checkUser = await this._userRepository.getByEmail(parameters.email);
      if (!checkUser) throw AppError.unauthorized(MESSAGES.AUTH.UN_VALID_REGISTER[1]);
      if (parameters.password !== parameters.confirmPassword)
        throw AppError.badRequest(MESSAGES.AUTH.UN_VALID_REGISTER[2]);

      // Hash the password
      const hashedPassword = await AuthUtils.hashPassword(parameters.password);

      // Create the user with hashed password
      await this._userRepository.add({
        fullName: parameters.fullName,
        email: parameters.email,
        password: hashedPassword,
        lastActivity: new Date(),
      });
    } catch (error) {
      console.log('Error in registerAsync', error);
      throw new Error('Faild to register user');
    }
  };

  public login = async (parameters: UserLoginParameters): Promise<AuthResponse> => {
    try {
      const checkUser = await this._userRepository.getByEmail(parameters.email);
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
}
