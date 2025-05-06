import { Response } from 'express';

export class SuccessCode {
  readonly message: string;
  readonly statusCode: number;
  readonly data?: any;

  constructor(message: string, statusCode: number, data?: any) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
  }

  static ok = (message: string, data?: any): SuccessCode => {
    return new SuccessCode(message, 200, data);
  };

  static created = (message: string, data?: any): SuccessCode => {
    return new SuccessCode(message, 201, data);
  };

  static accepted = (message: string, data?: any): SuccessCode => {
    return new SuccessCode(message, 202, data);
  };

  static noContent = (message: string = ''): SuccessCode => {
    return new SuccessCode(message, 204);
  };
}

// Helper function to send standardized success responses
export const sendSuccess = (res: Response, successCode: SuccessCode): void => {
  res.status(successCode.statusCode).json({
    status: 'success',
    message: successCode.message,
    data: successCode.data || null,
    timestamp: new Date().toISOString(),
  });
};