"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerenum = exports.roleEnum = exports.genderEnum = void 0;
var genderEnum;
(function (genderEnum) {
    genderEnum[genderEnum["MALE"] = 0] = "MALE";
    genderEnum[genderEnum["FEMALE"] = 1] = "FEMALE";
})(genderEnum || (exports.genderEnum = genderEnum = {}));
var roleEnum;
(function (roleEnum) {
    roleEnum[roleEnum["ADMIN"] = 0] = "ADMIN";
    roleEnum[roleEnum["USER"] = 1] = "USER";
})(roleEnum || (exports.roleEnum = roleEnum = {}));
var providerenum;
(function (providerenum) {
    providerenum[providerenum["GOOGLE"] = 0] = "GOOGLE";
    providerenum[providerenum["SYSTEM"] = 1] = "SYSTEM";
})(providerenum || (exports.providerenum = providerenum = {}));
