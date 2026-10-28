"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tooManyRequestsException = exports.conflictException = exports.forbiddenException = exports.unauthorizedException = exports.notFoundException = exports.badRequestException = void 0;
const app_exception_1 = require("./app.exception");
class badRequestException extends app_exception_1.appException {
    constructor(message = "Bad Request!!!!!!!!!!", cause) {
        super(message, 400, cause);
    }
}
exports.badRequestException = badRequestException;
class notFoundException extends app_exception_1.appException {
    constructor(message = "Not Found", cause) {
        super(message, 404, cause);
    }
}
exports.notFoundException = notFoundException;
class unauthorizedException extends app_exception_1.appException {
    constructor(message = "Unauthorized", cause) {
        super(message, 401, cause);
    }
}
exports.unauthorizedException = unauthorizedException;
class forbiddenException extends app_exception_1.appException {
    constructor(message = "Forbidden", cause) {
        super(message, 403, cause);
    }
}
exports.forbiddenException = forbiddenException;
class conflictException extends app_exception_1.appException {
    constructor(message = "Conflict", cause) {
        super(message, 409, cause);
    }
}
exports.conflictException = conflictException;
class tooManyRequestsException extends app_exception_1.appException {
    constructor(message = "Too Many Requests", cause) {
        super(message, 429, cause);
    }
}
exports.tooManyRequestsException = tooManyRequestsException;
