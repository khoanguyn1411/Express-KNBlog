import { LoginDataDto } from "../dtos/login-data.dto";
import { LoginData } from "../models/login-data";
import { IMapperFromDto } from "./mapper";

class LoginDataMapper implements IMapperFromDto<LoginDataDto, LoginData> {
  fromDto(data: LoginDataDto): LoginData {
    return {
      email: data.email,
      password: data.password,
    };
  }
}

export const loginDataMapper = new LoginDataMapper();
