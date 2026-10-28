"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalValidationFields = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const enum_1 = require("../enum");
const translateObj = {
    username: {
        ar: "لا يمكن القبول باسم مستخدم اقل من حرفين",
        en: "min allowed length is 2 char",
    },
    email: {
        ar: "صيغة البريد الإلكتروني غير صحيحة",
        en: "Invalid email format",
    },
    password: {
        ar: "يجب أن تكون كلمة المرور قوية وتحتوي على حروف وأرقام ورموز",
        en: "Password must be strong (contain letters, numbers and symbols)",
    },
    phone: {
        ar: "رقم الهاتف غير صحيح",
        en: "Invalid phone number",
    },
    id: {
        ar: "معرف (ObjectId) غير صالح",
        en: "Invalid ID format",
    },
    otp: {
        ar: "كود التحقق غير صحيح",
        en: "Invalid code",
    },
};
const matchFields = ({ original, copy, data, ctx, lang = enum_1.languageEnum.AR, }) => {
    if (data[original] != data[copy]) {
        ctx.addIssue({
            code: "custom",
            path: [copy],
            message: lang == enum_1.languageEnum.AR
                ? `تعذر تطابق كلا من ${original} , ${copy}`
                : `Fail to match between ${original} , ${copy}`,
        });
    }
};
exports.generalValidationFields = {
    matchFields,
    email: (lang = enum_1.languageEnum.AR) => zod_1.z
        .string()
        .email({
        message: lang == enum_1.languageEnum.AR
            ? translateObj.email.ar
            : translateObj.email.en,
    }),
    otp: (lang = enum_1.languageEnum.AR) => zod_1.z
        .string()
        .regex(/^\d{6}$/, {
        message: lang == enum_1.languageEnum.AR ? translateObj.otp.ar : translateObj.otp.en,
    }),
    password: (lang = enum_1.languageEnum.AR) => zod_1.z
        .string()
        .regex(/^(?=.*[a-z])(?=.*\s*)(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/, {
        message: lang == enum_1.languageEnum.AR
            ? translateObj.password.ar
            : translateObj.password.en,
    }),
    username: (lang = enum_1.languageEnum.AR) => zod_1.z
        .string()
        .min(2, {
        message: lang == enum_1.languageEnum.AR
            ? translateObj.username.ar
            : translateObj.username.en,
    }),
    phone: (lang = enum_1.languageEnum.AR) => zod_1.z.string().regex(/^(\+20|0)?1[0125][0-9]{8}$/, {
        message: lang == enum_1.languageEnum.AR ? translateObj.phone.ar : translateObj.phone.en,
    }),
    id: (lang = enum_1.languageEnum.AR) => zod_1.z.string().refine((data) => {
        return mongoose_1.default.Types.ObjectId.isValid(data);
    }, {
        message: lang == enum_1.languageEnum.AR ? translateObj.id.ar : translateObj.id.en,
    }),
    file: (lang = enum_1.languageEnum.AR) => zod_1.z.strictObject({
        fieldname: zod_1.z.string(),
        originalname: zod_1.z.string(),
        encoding: zod_1.z.string(),
        mimetype: zod_1.z.string(),
        buffer: zod_1.z.instanceof(Buffer),
        size: zod_1.z.number(),
        path: zod_1.z.string(),
    }),
};
