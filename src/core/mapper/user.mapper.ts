import { UserRole } from "../db-models/user.db";
import { GoogleLoginDataDto } from "../dtos/google-login-data.dto";
import { RegisterDataDto } from "../dtos/register-data.dto";
import { UserQueryDto } from "../dtos/user.dto";
import { UserCreation, UserQuery } from "../models/user";
import { paginationMapper } from "./pagination.mapper";

class UserMapper {
  fromGoogleData(data: GoogleLoginDataDto): UserCreation {
    return {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      lastLogin: new Date(),
      password: null,
      role: UserRole.Viewer,
      pictureUrl: data.pictureUrl,
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
      pictureUrl: data.pictureUrl,
    };
  }

  fromQueryDto(data: UserQueryDto): UserQuery {
    const pagination = paginationMapper.fromDto(data);
    return {
      ...pagination,
      search: data.search ?? "",
    };
  }
}

export const userMapper = new UserMapper();
