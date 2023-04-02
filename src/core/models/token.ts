export interface IToken {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export type IRefreshToken = Pick<IToken, "refreshToken">;
