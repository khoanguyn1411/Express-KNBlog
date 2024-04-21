import Joi from "joi";
export interface TokenDto {
  readonly accessToken: string;
  readonly refreshToken: string;
}
export type RefreshTokenDto = Pick<TokenDto, "refreshToken">;

export const refreshTokenDtoSchema = Joi.object<RefreshTokenDto>({
  refreshToken: Joi.string().required(),
});
