import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '@/middlewares/errorMiddlewares';
import { AUTH_MESSAGES, AUTH_CONSTANTS } from '@/constants/messages';
import { AuthUtils } from '@/utils/authUtils';
import { catchAsync } from '@/decorators/try_catchDecorators';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }  }
}

export class AuthMiddleware {  @catchAsync()
  static async authenticate(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const hasValidAuthHeader = authHeader && authHeader.startsWith(AUTH_CONSTANTS.TOKEN_PREFIX);

    if (!hasValidAuthHeader) {
      throw AppError.unauthorized(AUTH_MESSAGES.MISSING_TOKEN);
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = AuthUtils.verifyToken(token);

      req.user = {
        id: decoded.id,
        email: decoded.email,
      };

      next();
    } catch (err) {
      const isJsonWebTokenError = err instanceof jwt.JsonWebTokenError;
      
      if (isJsonWebTokenError) {
        throw AppError.unauthorized(AUTH_MESSAGES.INVALID_TOKEN);
      } else {
        throw err;
      }
    }
  }
}
