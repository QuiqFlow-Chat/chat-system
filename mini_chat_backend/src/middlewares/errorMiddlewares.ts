import { NextFunction, Request, Response } from 'express';
import { MESSAGES, HTTP_STATUS_CODES, ERROR_CONSTANTS } from '@/constants/messages';

export class AppError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest = (message: string): AppError => {
    return new AppError(message, HTTP_STATUS_CODES.BAD_REQUEST);
  };

  static notFound = (message: string): AppError => {
    return new AppError(message, HTTP_STATUS_CODES.NOT_FOUND);
  };

  static unauthorized(message: string): AppError {
    return new AppError(message, HTTP_STATUS_CODES.UNAUTHORIZED);
  }
}

export class ErrorMiddleware {
  static handleError(err: unknown, req: Request, res: Response, _next: NextFunction): void {
    const isAppError = err instanceof AppError;
    const statusCode = isAppError ? err.statusCode : HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;
    const message = isAppError ? err.message : `${MESSAGES.ERROR.INTERNAL_SERVER_ERROR}${err}`;    console.error(`[${req.method}] ${req.originalUrl} - ${message}`);

    res.status(statusCode).json({
      status: ERROR_CONSTANTS.STATUS,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  static handleNotFound = (req: Request, _res: Response, next: NextFunction): void => {
    next(AppError.notFound(`${MESSAGES.ERROR.ROUTE_NOT_FOUND}: ${req.originalUrl}`));
  };
}
