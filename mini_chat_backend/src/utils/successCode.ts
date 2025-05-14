import { Response } from 'express';
import { SUCCESS_STATUS_CODE, RESPONSE_STATUS } from '@/constants/messages';

export interface ResponseData {
  message: string;
  data?: any;
}

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
    return new SuccessCode(message, SUCCESS_STATUS_CODE.OK, data);
  };

  static created = (message: string, data?: any): SuccessCode => {
    return new SuccessCode(message, SUCCESS_STATUS_CODE.CREATED, data);
  };

  static accepted = (message: string, data?: any): SuccessCode => {
    return new SuccessCode(message, SUCCESS_STATUS_CODE.ACCEPTED, data);
  };

  static noContent = (message: string = ''): SuccessCode => {
    return new SuccessCode(message, SUCCESS_STATUS_CODE.NO_CONTENT);
  };
}

export const sendSuccess = (res: Response, successCode: SuccessCode): void => {
  res.status(successCode.statusCode).json({
    status: RESPONSE_STATUS.SUCCESS,
    message: successCode.message,
    data: successCode.data || null,
    timestamp: new Date().toISOString(),
  });
};
