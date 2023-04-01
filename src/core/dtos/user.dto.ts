export interface UserDto {
  readonly sub: string;
  readonly name: string;
  readonly given_name: string;
  readonly google_id: string;
  readonly family_name: string;
  readonly picture: string;
  readonly email: string;
  readonly email_verified: string;
  readonly locale: string;
}
