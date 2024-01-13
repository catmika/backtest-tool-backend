import { Request, Response, NextFunction } from 'express';
import { STATUS_CODES, RESPONSE_MESSAGES } from './constants';
export interface IError extends Error {
  status: number;
  message: string;
  details: object;
}

export class ErrorHandler extends Error {
  status!: number;
  message!: string;
  details!: object;

  constructor(message: string, status: number = 500, details: object = {}) {
    super();
    this.message = message;
    this.status = status;
    this.details = details;
  }
}

export const handleError = (
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let customError = err as IError;
  console.log('Error: ', customError);
  if (!(err instanceof ErrorHandler)) {
    customError = new ErrorHandler(
      RESPONSE_MESSAGES.DEFAULT_ERROR_MESSAGE,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      customError,
    );
  }

  res.status(customError.status).send({
    message: customError.message,
    details: customError.details,
  });
};
