import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
export const validationMiddleware = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const validationResult = schema.safeParse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((err) => err.message)
        .join(", ");
      res.status(400).json({
        message: "Validation Error!!!!!!!",
        details: errorMessage,
      });
      return;
    }
    next();
  };
};
