import { z } from "zod";
import { languageEnum } from "../../common/enum";
import { generalValidationFields } from "../../common/utlis/validation";

const loginBodySchema = (lang: languageEnum) => {
  return z.strictObject({
    email: generalValidationFields.email(lang),
    password: generalValidationFields.password(lang),
  });
};
export const login = (lang: languageEnum) => {
  return loginBodySchema(lang); 
};

export const confirmEmail = (lang: languageEnum) => {
  return z.strictObject({
    email: generalValidationFields.email(lang),
    otp: generalValidationFields.otp(lang),
  }); 
};


export const signup = (lang: languageEnum) => {
  return z.object({
    body: loginBodySchema(lang)
      .safeExtend({
        username: generalValidationFields.username(lang),
        phone: generalValidationFields.phone(lang),
        confirmPassword: generalValidationFields.password(lang),
      })
      .superRefine((data, ctx) =>
        generalValidationFields.matchFields({
          original: "password",
          copy: "confirmPassword",
          data,
          ctx,
          lang,
        }),
      ),
  });
};

export const resendConfirmEmail = (lang: languageEnum) => {
  return z.object({
    body: z.strictObject({
      email: generalValidationFields.email(lang),
    }),
  });
};
export const refreshToken = (lang: languageEnum) => {
  return z.object({
    body: z.strictObject({
      refreshToken: z.string().min(1, {
        message:
          lang === languageEnum.AR
            ? "مطلوب Refresh Token"
            : "Refresh token is required",
      }),
    }),
  });
};