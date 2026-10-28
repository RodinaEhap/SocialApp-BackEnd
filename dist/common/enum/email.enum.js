"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailType = exports.EmailStatus = void 0;
var EmailStatus;
(function (EmailStatus) {
    EmailStatus["PENDING"] = "PENDING";
    EmailStatus["SENT"] = "SENT";
    EmailStatus["FAILED"] = "FAILED";
})(EmailStatus || (exports.EmailStatus = EmailStatus = {}));
var EmailType;
(function (EmailType) {
    EmailType["CONFIRM_EMAIL"] = "CONFIRM_EMAIL";
    EmailType["RESET_PASSWORD"] = "RESET_PASSWORD";
    EmailType["WELCOME"] = "WELCOME";
    EmailType["TWO_FACTOR_AUTH"] = "TWO_FACTOR_AUTH";
})(EmailType || (exports.EmailType = EmailType = {}));
