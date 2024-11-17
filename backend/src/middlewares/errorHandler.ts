import { Request, Response, NextFunction } from 'express';

export class ErrorHandler extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

const handleError = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errStatus = err.statusCode || 500;
  const errMsg =
    process.env.NODE_ENV === 'production'
      ? 'Coś poszło nie tak'
      : err.message || 'Coś poszło nie tak';

  console.error(`${errStatus}: ${errMsg}`);
  if (err.stack) {
    console.error(err.stack);
  }

  const errorResponse: { statusCode: number; message: string; stack?: string } =
    {
      statusCode: errStatus,
      message: errMsg,
    };

  if (process.env.NODE_ENV !== 'production') {
    errorResponse.stack = err.stack;
  }

  res.status(errStatus).json(errorResponse);
};

export default handleError;
