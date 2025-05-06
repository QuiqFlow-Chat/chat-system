import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest = (message: string): AppError => {
    return new AppError(message, 400);
  };

  static notFound = (message: string): AppError => {
    return new AppError(message, 404);
  };

  static unauthorized(message: string): AppError {
    return new AppError(message, 401);
  }
}

export class ErrorMiddleware {
  static handleError(err: unknown, req: Request, res: Response, _next: NextFunction): void {
    const statusCode = err instanceof AppError ? err.statusCode : 500;
    const message = err instanceof AppError ? err.message : 'Internal server error'+err;

    console.error(`[${req.method}] ${req.originalUrl} - ${message}`);

    res.status(statusCode).json({
      status: 'error',
      message,
      timestamp: new Date().toISOString(),
    });
  }

  static handleNotFound = (req: Request, _res: Response, next: NextFunction): void => {
    next(AppError.notFound(`Route not found: ${req.originalUrl}`));
  };
}
