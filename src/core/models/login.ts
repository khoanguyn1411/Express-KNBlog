export interface ILogin {
  readonly googleTokenId: string;
  readonly pictureUrl: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}
