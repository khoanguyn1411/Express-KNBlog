export interface TokenDto {
  readonly accessToken: string;
  readonly refreshToken: string;
}
export type RefreshTokenDto = Pick<TokenDto, "refreshToken">;
