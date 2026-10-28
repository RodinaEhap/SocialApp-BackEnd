import type { NextFunction, Request, Response } from "express";
import { IError } from "../common/interface";
export const globalErrorHandler = (err: IError, req: Request, res: Response, next: NextFunction) => {
return res.status(err.status??500).json({
 error_message: err.message??"Internal Server Error",
 error: err,
 cause: err.cause,
 stack: err.stack,
})}