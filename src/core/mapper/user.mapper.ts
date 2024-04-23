import { UserCreationDto } from "../dtos/user.dto";
import { IUserCreation, UserRole } from "../models/user";

class UserMapper {
  fromCreationDto(data: UserCreationDto): IUserCreation {
    return {
      email: data.email,
      name: data.name,
      lastLogin: new Date(),
      role: UserRole.Viewer,
    };
  }
}

export const userMapper = new UserMapper();
