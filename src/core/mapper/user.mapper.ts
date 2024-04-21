import { UserDto } from "../dtos/user.dto";
import { MUser, User, UserRole } from "../models/user";
import { IMapperFromDto } from "./mapper";

class UserMapper implements IMapperFromDto<UserDto, MUser> {
  fromDto(data: UserDto): MUser {
    return new User({
      email: data.email,
      name: data.name,
      lastLogin: new Date().toISOString(),
      role: UserRole.Viewer,
    });
  }
}

export const userMapper = new UserMapper();
