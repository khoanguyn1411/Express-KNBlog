import { compare, hash } from "bcrypt";

class PasswordService {
  // Hashing a password
  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Salt rounds for generating salt
    const hashedPassword = await hash(password, saltRounds);
    return hashedPassword;
  }

  // Verifying a password
  public async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const isMatch = await compare(password, hashedPassword);
    return isMatch;
  }
}

export const passwordService = new PasswordService();
