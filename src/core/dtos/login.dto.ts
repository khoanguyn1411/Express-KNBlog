import Joi from "joi";

export interface LoginDto {
  readonly googleTokenId: string;
  readonly pictureUrl: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}

export const loginDtoSchema = Joi.object<LoginDto>({
  googleTokenId: Joi.string().required(),
  pictureUrl: Joi.string().allow(null),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
});
