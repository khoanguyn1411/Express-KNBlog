import { MUser, UserRole } from "../db-models/user.db";
import { GoogleLoginDataDto } from "../dtos/google-login-data.dto";
import { RegisterDataDto } from "../dtos/register-data.dto";
import { User, UserCreation } from "../models/user";

class UserMapper {
  fromGoogleData(data: GoogleLoginDataDto): UserCreation {
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      lastLogin: new Date(),
      password: null,
      role: UserRole.Viewer,
    };
  }

  fromRegisterData(data: RegisterDataDto): UserCreation {
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      lastLogin: new Date(),
      password: data.password,
      role: UserRole.Viewer,
    };
  }

  fromMUser(data: MUser): User {
    return {
      _id: data._id,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      lastLogin: data.lastLogin,
      role: data.role,
    };
  }
}

export const userMapper = new UserMapper();
