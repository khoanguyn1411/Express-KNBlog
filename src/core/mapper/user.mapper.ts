import { GoogleLoginDataDto } from "../dtos/google-login-data.dto";
import { RegisterDataDto } from "../dtos/register-data.dto";
import { IUserCreation, UserRole } from "../models/user";

class UserMapper {
  fromGoogleData(data: GoogleLoginDataDto): IUserCreation {
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      lastLogin: new Date(),
      password: null,
      role: UserRole.Viewer,
    };
  }

  fromRegisterData(data: RegisterDataDto): IUserCreation {
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      lastLogin: new Date(),
      password: data.password,
      role: UserRole.Viewer,
    };
  }
}

export const userMapper = new UserMapper();
