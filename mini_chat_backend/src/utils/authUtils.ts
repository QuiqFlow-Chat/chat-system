import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { AppError } from '../middlewares/errorMiddlewares';
import { MESSAGES } from '../constants/messages';

export interface TokenPayload {
  id: string;
  email: string;
}

export class AuthUtils {
  private static readonly SALT_ROUNDS = 10;
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'default_secret';
  private static readonly TOKEN_EXPIRATION = '24h'; // Default token expiration time

  /**
   * Hashes a password
   */
  public static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  /**
   * Compares a plain password with a hashed password
   */
  public static async comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Generates a token with expiration
   * @param payload The data to include in the token
   * @param expiresIn Override default expiration time (e.g. '1h', '7d')
   */
  public static generateToken(
    payload: TokenPayload,
    expiresIn: string | number = this.TOKEN_EXPIRATION
  ): string {
    const now = Math.floor(Date.now() / 1000);
    const enhancedPayload = {
      ...payload,
      iat: now, // Issued at
      nbf: now, // Not valid before
      jti: crypto.randomUUID(), // Unique token ID for revocation capability
    };

    const options: SignOptions = { expiresIn: expiresIn as any };
    return jwt.sign(enhancedPayload, this.JWT_SECRET, options);
  }

  /**
   * Verifies a token
   */
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
