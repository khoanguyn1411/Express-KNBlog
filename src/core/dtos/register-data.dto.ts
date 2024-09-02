import Joi from "joi";

export interface RegisterDataDto {
  readonly email: string;
  readonly password: string;
  readonly pictureUrl: string | null;
  readonly firstName: string;
  readonly lastName: string;
}

export const registerDataDtoSchema = Joi.object<RegisterDataDto>({
  pictureUrl: Joi.string().allow(null),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
