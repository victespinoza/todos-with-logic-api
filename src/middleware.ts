import { Request, Response, NextFunction } from "express";

const middlewareErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
};

export default middlewareErrorHandler;
