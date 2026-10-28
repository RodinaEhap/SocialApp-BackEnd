"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const validationMiddleware = (schema) => {
    return (req, res, next) => {
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
exports.validationMiddleware = validationMiddleware;
