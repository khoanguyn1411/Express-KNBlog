import Joi from "joi";

export type RequestPasswordDto = {
  readonly password: string;
};

export const requestPasswordDtoSchema = Joi.object<RequestPasswordDto>({
  password: Joi.string().required(),
});
