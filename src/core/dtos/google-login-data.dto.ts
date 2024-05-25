import Joi from "joi";

export interface GoogleLoginDataDto {
  readonly googleTokenId: string;
  readonly pictureUrl: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}

export const GoogleLoginDataDtoSchema = Joi.object<GoogleLoginDataDto>({
  googleTokenId: Joi.string().required(),
  pictureUrl: Joi.string().allow(null),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
});
