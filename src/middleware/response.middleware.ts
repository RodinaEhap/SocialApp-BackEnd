import { Request, Response, NextFunction } from "express";
import { IResponse } from "../common/interface";
export const responseFormatter = (handler: Function) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response|void> => {
    try {
      const result: IResponse = (await handler(req, res, next)) || {};
      const {
        status = 200,
        message = true,
        data = undefined,
        extra = undefined,
      } = result;
      console.log(res.headersSent);
      if (res.headersSent)return;
      return res.status(status).json({
        message,
        status,
        data,
        extra,
      });
    } catch (error) {
      return next(error); 
    }
  };
};
