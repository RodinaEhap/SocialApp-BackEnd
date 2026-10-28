"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutEnum = exports.languageEnum = exports.tokenAudienceEnum = exports.tokenSubjectEnum = exports.tokenPurposeEnum = exports.tokenStatusEnum = exports.tokenTypeEnum = void 0;
var tokenTypeEnum;
(function (tokenTypeEnum) {
    tokenTypeEnum[tokenTypeEnum["ACCESS"] = 0] = "ACCESS";
    tokenTypeEnum[tokenTypeEnum["REFRESH"] = 1] = "REFRESH";
})(tokenTypeEnum || (exports.tokenTypeEnum = tokenTypeEnum = {}));
var tokenStatusEnum;
(function (tokenStatusEnum) {
    tokenStatusEnum[tokenStatusEnum["ACTIVE"] = 0] = "ACTIVE";
    tokenStatusEnum[tokenStatusEnum["INACTIVE"] = 1] = "INACTIVE";
})(tokenStatusEnum || (exports.tokenStatusEnum = tokenStatusEnum = {}));
var tokenPurposeEnum;
(function (tokenPurposeEnum) {
    tokenPurposeEnum[tokenPurposeEnum["AUTHENTICATION"] = 0] = "AUTHENTICATION";
    tokenPurposeEnum[tokenPurposeEnum["PASSWORD_RESET"] = 1] = "PASSWORD_RESET";
    tokenPurposeEnum[tokenPurposeEnum["EMAIL_VERIFICATION"] = 2] = "EMAIL_VERIFICATION";
})(tokenPurposeEnum || (exports.tokenPurposeEnum = tokenPurposeEnum = {}));
var tokenSubjectEnum;
(function (tokenSubjectEnum) {
    tokenSubjectEnum[tokenSubjectEnum["USER"] = 0] = "USER";
    tokenSubjectEnum[tokenSubjectEnum["ADMIN"] = 1] = "ADMIN";
    tokenSubjectEnum[tokenSubjectEnum["MODERATOR"] = 2] = "MODERATOR";
})(tokenSubjectEnum || (exports.tokenSubjectEnum = tokenSubjectEnum = {}));
var tokenAudienceEnum;
(function (tokenAudienceEnum) {
    tokenAudienceEnum[tokenAudienceEnum["WEB"] = 0] = "WEB";
    tokenAudienceEnum[tokenAudienceEnum["MOBILE"] = 1] = "MOBILE";
    tokenAudienceEnum[tokenAudienceEnum["API"] = 2] = "API";
})(tokenAudienceEnum || (exports.tokenAudienceEnum = tokenAudienceEnum = {}));
var languageEnum;
(function (languageEnum) {
    languageEnum[languageEnum["AR"] = 0] = "AR";
    languageEnum[languageEnum["EN"] = 1] = "EN";
})(languageEnum || (exports.languageEnum = languageEnum = {}));
var logoutEnum;
(function (logoutEnum) {
    logoutEnum[logoutEnum["DEVICE"] = 0] = "DEVICE";
    logoutEnum[logoutEnum["ALL"] = 1] = "ALL";
})(logoutEnum || (exports.logoutEnum = logoutEnum = {}));
