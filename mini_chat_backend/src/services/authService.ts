import { MESSAGES } from '../constants/messages';
import {
  UserCreateParameters,
  UserLoginParameters,
  AuthResponse,
} from '../shared/dtosInterfaces/userDtos';
import { AppError } from '../middlewares/errorMiddlewares';
import { UserRepository } from '../repositories/userRepository';
import { AuthUtils } from '../utils/authUtils';

export class AuthService {
  constructor(private _userRepository: UserRepository) {}

  public register = async (parameters: UserCreateParameters): Promise<void> => {
    try {
      const existingUser = await this._userRepository.getByEmail(parameters.email);
      if (existingUser) {
        throw AppError.unauthorized(MESSAGES.AUTH.UN_VALID_REGISTER[1]);
      }

      if (parameters.password !== parameters.confirmPassword) {
        throw AppError.badRequest(MESSAGES.AUTH.UN_VALID_REGISTER[2]);
      }

      const hashedPassword = await AuthUtils.hashPassword(parameters.password);

      await this._userRepository.add({
        fullName: parameters.fullName,
        email: parameters.email,
        password: hashedPassword,
        lastActivity: new Date(),
      });
    } catch (error) {
      console.error('[AuthService][register] Error:', error);
      throw error instanceof AppError
        ? error
        : new AppError('An error occurred while registering the user', 500);
    }
  };

  public login = async (parameters: UserLoginParameters): Promise<AuthResponse> => {
    try {
      const existingUser = await this._userRepository.getByEmail(parameters.email);
      if (!existingUser) {
        throw AppError.unauthorized(MESSAGES.AUTH.UN_VALID_LOGIN[1]);
      }

      const isPasswordValid = await AuthUtils.comparePassword(
        parameters.password,
        existingUser.password
      );

      if (!isPasswordValid) {
        throw AppError.unauthorized(MESSAGES.AUTH.UN_VALID_LOGIN[0]);
      }

      const token = AuthUtils.generateToken({
        id: existingUser.id,
        email: existingUser.email,
      });

      return {
        user: {
          id: existingUser.id,
          email: existingUser.email,
          fullName: existingUser.fullName,
        },
        token,
      };
    } catch (error) {
      console.error('[AuthService][login] Error:', error);
      throw error instanceof AppError
        ? error
        : new AppError('An error occurred while logging in the user', 500);
    }
  };
}
