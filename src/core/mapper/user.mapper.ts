import { LoginDto } from "../dtos/login.dto";
import { IUserCreation, UserRole } from "../models/user";

class UserMapper {
  fromCreationDto(data: LoginDto): IUserCreation {
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      lastLogin: new Date(),
      role: UserRole.Viewer,
    };
  }
}

export const userMapper = new UserMapper();
