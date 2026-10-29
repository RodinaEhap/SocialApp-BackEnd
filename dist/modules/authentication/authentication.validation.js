"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleLogin = exports.resetPassword = exports.forgotPassword = exports.refreshToken = exports.resendConfirmEmail = exports.signup = exports.confirmEmail = exports.login = void 0;
const zod_1 = require("zod");
const enum_1 = require("../../common/enum");
const validation_1 = require("../../common/utlis/validation");
const loginBodySchema = (lang) => {
    return zod_1.z.strictObject({
        email: validation_1.generalValidationFields.email(lang),
        password: validation_1.generalValidationFields.password(lang),
    });
};
const login = (lang) => {
    return zod_1.z.object({
        body: loginBodySchema(lang),
    });
};
exports.login = login;
const confirmEmail = (lang) => {
    return zod_1.z.object({
        body: zod_1.z.strictObject({
            email: validation_1.generalValidationFields.email(lang),
            otp: validation_1.generalValidationFields.otp(lang),
        }),
    });
};
exports.confirmEmail = confirmEmail;
const signup = (lang) => {
    return zod_1.z.object({
        body: loginBodySchema(lang)
            .safeExtend({
            username: validation_1.generalValidationFields.username(lang),
            phone: validation_1.generalValidationFields.phone(lang),
            confirmPassword: validation_1.generalValidationFields.password(lang),
        })
            .superRefine((data, ctx) => validation_1.generalValidationFields.matchFields({
            original: "password",
            copy: "confirmPassword",
            data,
            ctx,
            lang,
        })),
    });
};
exports.signup = signup;
const resendConfirmEmail = (lang) => {
    return zod_1.z.object({
        body: zod_1.z.strictObject({
            email: validation_1.generalValidationFields.email(lang),
        }),
    });
};
exports.resendConfirmEmail = resendConfirmEmail;
const refreshToken = (lang) => {
    return zod_1.z.object({
        body: zod_1.z.strictObject({
            refreshToken: zod_1.z.string().min(1, {
                message: lang === enum_1.languageEnum.AR
                    ? "مطلوب Refresh Token"
                    : "Refresh token is required",
            }),
        }),
    });
};
exports.refreshToken = refreshToken;
const forgotPassword = (lang) => {
    return zod_1.z.object({
        body: zod_1.z.strictObject({
            email: validation_1.generalValidationFields.email(lang),
        }),
    });
};
exports.forgotPassword = forgotPassword;
const resetPassword = (lang) => {
    return zod_1.z.object({
        body: zod_1.z.strictObject({
            email: validation_1.generalValidationFields.email(lang),
            otp: validation_1.generalValidationFields.otp(lang),
            password: validation_1.generalValidationFields.password(lang),
        }),
    });
};
exports.resetPassword = resetPassword;
const googleLogin = (lang) => {
    return zod_1.z.object({
        body: zod_1.z.strictObject({
            idToken: zod_1.z.string().min(1, {
                message: lang === enum_1.languageEnum.AR
                    ? "مطلوب توكن من جوجل"
                    : "Google ID token is required",
            }),
        }),
    });
};
exports.googleLogin = googleLogin;
