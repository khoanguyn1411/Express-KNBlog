import { UserDto } from "../dtos/user.dto";
import { User, UserMongoose } from "../models/user";
import { IMapperFromDto } from "./mapper";

class UserMapper implements IMapperFromDto<UserDto, UserMongoose> {
  fromDto(data: UserDto): UserMongoose {
    return new User({ email: data.email, name: data.name, lastLogin: new Date().toISOString() });
  }
}

export const userMapper = new UserMapper();
