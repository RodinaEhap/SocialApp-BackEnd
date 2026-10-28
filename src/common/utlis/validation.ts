import { z } from "zod";
import mongoose from "mongoose";
import { languageEnum } from "../enum";

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

const matchFields = ({
  original,
  copy,
  data,
  ctx,
  lang = languageEnum.AR,
}: {
  original: string;
  copy: string;
  data: any;
  ctx: z.RefinementCtx;
  lang?: languageEnum;
}) => {
  if (data[original] != data[copy]) {
    ctx.addIssue({
      code: "custom",
      path: [copy],
      message:
        lang == languageEnum.AR
          ? `تعذر تطابق كلا من ${original} , ${copy}`
          : `Fail to match between ${original} , ${copy}`,
    });
  }
};

export const generalValidationFields = {
  matchFields,

  email: (lang: languageEnum = languageEnum.AR) =>
    z
      .string()
      .email({
        message:
          lang == languageEnum.AR
            ? translateObj.email.ar
            : translateObj.email.en,
      }),

  otp: (lang: languageEnum = languageEnum.AR) =>
    z
      .string()
      .regex(/^\d{6}$/, {
        message:
          lang == languageEnum.AR ? translateObj.otp.ar : translateObj.otp.en,
      }),

  password: (lang: languageEnum = languageEnum.AR) =>
    z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*\s*)(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
        {
          message:
            lang == languageEnum.AR
              ? translateObj.password.ar
              : translateObj.password.en,
        },
      ),

  username: (lang: languageEnum = languageEnum.AR) =>
    z
      .string()
      .min(2, {
        message:
          lang == languageEnum.AR
            ? translateObj.username.ar
            : translateObj.username.en,
      }),

  phone: (lang: languageEnum = languageEnum.AR) =>
    z.string().regex(/^(\+20|0)?1[0125][0-9]{8}$/, {
      message:
        lang == languageEnum.AR ? translateObj.phone.ar : translateObj.phone.en,
    }),

  id: (lang: languageEnum = languageEnum.AR) =>
    z.string().refine(
      (data) => {
        return mongoose.Types.ObjectId.isValid(data);
      },
      {
        message:
          lang == languageEnum.AR ? translateObj.id.ar : translateObj.id.en,
      },
    ),

  file: (lang: languageEnum = languageEnum.AR) =>
    z.strictObject({
      fieldname: z.string(),
      originalname: z.string(),
      encoding: z.string(),
      mimetype: z.string(),
      buffer: z.instanceof(Buffer),
      size: z.number(),
      path: z.string(),
    }),
};
