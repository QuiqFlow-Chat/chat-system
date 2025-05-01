import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: string;
  email: string;
}

export class AuthUtils {
  private static readonly SALT_ROUNDS = 10;
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

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
   * Generates a token with no expiration
   */
  public static generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.JWT_SECRET);
  }

  /**
   * Verifies a token
   */
  public static verifyToken(token: string): TokenPayload {
    return jwt.verify(token, this.JWT_SECRET) as TokenPayload;
  }
}
