import { LoginDataDto } from "../dtos/login-data.dto";
import { ILoginData } from "../models/login-data";
import { IMapperFromDto } from "./mapper";

class LoginDataMapper implements IMapperFromDto<LoginDataDto, ILoginData> {
  fromDto(data: LoginDataDto): ILoginData {
    return {
      email: data.email,
      password: data.password,
    };
  }
}

export const loginDataMapper = new LoginDataMapper();
