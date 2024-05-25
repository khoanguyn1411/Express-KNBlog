export interface Token {
  readonly accessToken: string;
  readonly refreshToken: string;
}

export type RefreshToken = Pick<Token, "refreshToken">;
