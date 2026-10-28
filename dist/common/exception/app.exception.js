"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tooManyRequestsException = exports.conflictException = exports.forbiddenException = exports.unauthorizedException = exports.notFoundException = exports.badRequestException = exports.appException = void 0;
class appException extends Error {
    message;
    status;
    cause;
    constructor(message, status, cause) {
        super();
        this.message = message;
        this.status = status;
        this.cause = cause;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.appException = appException;
class parent {
    name;
    constructor(name) {
        this.name = name;
    }
}
class child extends parent {
}
class badRequestException extends appException {
    constructor(message = "Bad Request!!!!!!!!!!", cause) {
        super(message, 400, cause);
    }
}
exports.badRequestException = badRequestException;
class notFoundException extends appException {
    constructor(message = "Not Found", cause) {
        super(message, 404, cause);
    }
}
exports.notFoundException = notFoundException;
class unauthorizedException extends appException {
    constructor(message = "Unauthorized", cause) {
        super(message, 401, cause);
    }
}
exports.unauthorizedException = unauthorizedException;
class forbiddenException extends appException {
    constructor(message = "Forbidden", cause) {
        super(message, 403, cause);
    }
}
exports.forbiddenException = forbiddenException;
class conflictException extends appException {
    constructor(message = "Conflict", cause) {
        super(message, 409, cause);
    }
}
exports.conflictException = conflictException;
class tooManyRequestsException extends appException {
    constructor(message = "Too Many Requests", cause) {
        super(message, 429, cause);
    }
}
exports.tooManyRequestsException = tooManyRequestsException;
