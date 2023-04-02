import { UserDto } from "../dtos/user.dto";
import { IUser, User } from "../models/user";
import { IMapperFromDto } from "./mapper";

class UserMapper implements IMapperFromDto<UserDto, IUser> {
  fromDto(data: UserDto): IUser {
    return new User({ email: data.email, name: data.name, lastLogin: new Date().toISOString() });
  }
}

export const userMapper = new UserMapper();
