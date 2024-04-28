import { compare, hash } from "bcrypt";

class PasswordService {
  /**
   * Hash password.
   * @param password Password to hash.
   */
  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Salt rounds for generating salt
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  }

  /**
   * Verify password.
   * @param password Password to verify.
   * @param hashedPassword Hashed password to compare.
   */
  public async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await compare(password, hashedPassword);
    return isMatch;
  }
}

export const passwordService = new PasswordService();
