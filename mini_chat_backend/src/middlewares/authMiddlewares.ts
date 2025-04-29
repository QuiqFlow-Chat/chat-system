import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from './errorMiddlewares';

export class AuthMiddleware {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

  /**
   * Middleware to verify JWT token and attach user data to the request object.
   */
  static authenticate(req: Request, res: Response, next: NextFunction): void {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw AppError.badRequest('Authorization token is missing or invalid');
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, AuthMiddleware.JWT_SECRET) as JwtPayload;

      // Attach user data to the request object for further use
      // @ts-expect-error Extending Express Request
      req.user = decoded;

      next();
    } catch (err) {
      if (err instanceof jwt.JsonWebTokenError) {
        next(AppError.badRequest('Invalid or expired token'));
      } else {
        next(err);
      }
    }
  }
}
