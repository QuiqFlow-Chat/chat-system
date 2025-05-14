import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { MESSAGES } from '@/constants/messages';
import { AppError } from '@/middlewares/errorMiddlewares';

export interface TokenPayload {
  id: string;
  email: string;
}

export interface TokenOptions {
  payload: TokenPayload;
  expiresIn?: string | number;
}

export class AuthUtils {
  private static readonly SALT_ROUNDS = 10;
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
  private static readonly TOKEN_EXPIRATION = '24h';

  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  public static async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  public static generateToken(
    { payload, expiresIn = this.TOKEN_EXPIRATION }: TokenOptions
  ): string {
    const now = Math.floor(Date.now() / 1000);
    const enhancedPayload = {
      ...payload,
      iat: now,
      nbf: now,
      jti: crypto.randomUUID(),
    };

    const options: SignOptions = { expiresIn: expiresIn as any };
    return jwt.sign(enhancedPayload, this.JWT_SECRET, options);
  }

  public static verifyToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as TokenPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw AppError.unauthorized(MESSAGES.AUTH.TOKEN.EXPIRED);
      } else if (error instanceof jwt.JsonWebTokenError) {
        throw AppError.unauthorized(MESSAGES.AUTH.TOKEN.INVALID);
      }
      throw AppError.unauthorized(MESSAGES.AUTH.TOKEN.VERIFICATION_FAILED);
    }
  }
}
