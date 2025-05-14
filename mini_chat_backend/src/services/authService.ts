import { MESSAGES } from '@/constants/messages';
import {
  IUserCreateParameters,
  IUserLoginParameters,
  IAuthResponse,
} from '@/types/dtosInterfaces/userDtos';
import { AppError } from '@/middlewares/errorMiddlewares';
import { UserRepository } from '@/repositories/userRepository';
import { AuthUtils } from '@/utils/authUtils';
export class AuthService {
  private static _AUTH_SERVICE_INSTANCE: AuthService;
  private constructor(private _userRepository: UserRepository) {}

  public static getInstance(userRepository: UserRepository): AuthService {
    if (!this._AUTH_SERVICE_INSTANCE) {
      this._AUTH_SERVICE_INSTANCE = new AuthService(userRepository);
    }
    return this._AUTH_SERVICE_INSTANCE;
  }

  public register = async (parameters: IUserCreateParameters): Promise<void> => {
    try {
      const existingUser = await this._userRepository.getByEmail(parameters.email);
      if (existingUser) {
        throw AppError.unauthorized(MESSAGES.AUTH.REGISTER.USER_EXISTS);
      }

      const isPasswordsMatching = parameters.password === parameters.confirmPassword;
      if (!isPasswordsMatching) {
        throw AppError.badRequest(MESSAGES.AUTH.REGISTER.PASSWORD_MISMATCH);
      }

      const hashedPassword = await AuthUtils.hashPassword(parameters.password);

      await this._userRepository.add({
        fullName: parameters.fullName,
        email: parameters.email,
        password: hashedPassword,
        lastActivity: new Date(),
      });
    } catch (error) {
      throw error instanceof AppError
        ? error
        : new AppError(MESSAGES.AUTH.REGISTER.FAILED, 500);
    }
  };

  public login = async (parameters: IUserLoginParameters): Promise<IAuthResponse> => {
    try {
      const existingUser = await this._userRepository.getByEmail(parameters.email);
      if (!existingUser) {
        throw AppError.unauthorized(MESSAGES.AUTH.LOGIN.INVALID_USER);
      }

      const isPasswordValid = await AuthUtils.comparePassword(
        parameters.password,
        existingUser.password
      );

      if (!isPasswordValid) {
        throw AppError.unauthorized(MESSAGES.AUTH.LOGIN.INVALID_PASSWORD);
      }      const token = AuthUtils.generateToken({
        payload: {
          id: existingUser.id,
          email: existingUser.email,
        }
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
      throw error instanceof AppError
        ? error
        : new AppError(MESSAGES.AUTH.LOGIN.FAILED, 500);
    }
  };
}
