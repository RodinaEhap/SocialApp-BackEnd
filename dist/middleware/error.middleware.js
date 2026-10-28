"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    return res.status(err.status ?? 500).json({
        error_message: err.message ?? "Internal Server Error",
        error: err,
        cause: err.cause,
        stack: err.stack,
    });
};
exports.globalErrorHandler = globalErrorHandler;
