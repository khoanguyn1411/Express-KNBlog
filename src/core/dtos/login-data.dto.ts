import Joi from "joi";

export interface LoginDataDto {
  readonly email: string;
  readonly password: string;
}

export const LoginDataDtoSchema = Joi.object<LoginDataDto>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
