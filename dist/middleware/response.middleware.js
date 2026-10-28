"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFormatter = void 0;
const responseFormatter = (handler) => {
    return async (req, res, next) => {
        try {
            const result = (await handler(req, res, next)) || {};
            const { status = 200, message = true, data = undefined, extra = undefined, } = result;
            console.log(res.headersSent);
            if (res.headersSent)
                return;
            return res.status(status).json({
                message,
                status,
                data,
                extra,
            });
        }
        catch (error) {
            return next(error);
        }
    };
};
exports.responseFormatter = responseFormatter;
