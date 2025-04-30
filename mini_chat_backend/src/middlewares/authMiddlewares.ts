import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorMiddlewares';
import { AuthUtils } from '../utils/authUtils';

// Extend Express Request to include user property
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export class AuthMiddleware {
  /**
   * Middleware to verify JWT token and attach user data to the request object.
   */
  static authenticate = (req: Request, res: Response, next: NextFunction): void => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw AppError.unauthorized('Authorization token is missing or invalid');
      }

      const token = authHeader.split(' ')[1];
      
      try {
        const decoded = AuthUtils.verifyToken(token);
        
        // Attach user data to the request
        req.user = {
          id: decoded.id,
          email: decoded.email
        };

        next();
      } catch (err) {
        if (err instanceof jwt.JsonWebTokenError) {
          throw AppError.unauthorized('Invalid token');
        } else {
          throw err;
        }
      }
    } catch (err) {
      next(err);
    }
  };
}
