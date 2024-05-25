export interface IGoogleLoginData {
  readonly googleTokenId: string;
  readonly pictureUrl: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
}
