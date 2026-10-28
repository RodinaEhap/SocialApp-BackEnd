export class appException extends Error {
    constructor(override message:string,public status:number,override cause?:unknown) {
        super();
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
 class parent {
    constructor(public name?:string) {}
}
class child extends parent { 
    
   }
export class badRequestException extends appException {
    constructor(message:string="Bad Request!!!!!!!!!!", cause?:unknown) {
        super(message, 400, cause);
    }
}
 
export class notFoundException extends appException {
    constructor(message:string="Not Found", cause?:unknown) {
        super(message, 404, cause);
    }
}
 export class unauthorizedException extends appException {
    constructor(message:string="Unauthorized", cause?:unknown) {
        super(message, 401, cause);
    }
}
 export class forbiddenException extends appException {
    constructor(message:string="Forbidden", cause?:unknown) {
        super(message, 403, cause);
    }
}
 export class conflictException extends appException {
    constructor(message:string="Conflict", cause?:unknown) {
        super(message, 409, cause);
    }
}
 export class tooManyRequestsException extends appException {
    constructor(message:string="Too Many Requests", cause?:unknown) {
        super(message, 429, cause);
    }
}
 