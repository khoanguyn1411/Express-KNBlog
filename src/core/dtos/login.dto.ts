import Joi from "joi";

export interface LoginDto {
  readonly tokenId: string;
  readonly accessToken: string;
}

export const loginDtoSchema = Joi.object<LoginDto>({
  tokenId: Joi.string().required(),
  accessToken: Joi.string().required(),
});
