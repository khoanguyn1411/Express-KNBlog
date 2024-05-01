import { LoginDto } from "../dtos/login.dto";
import { ILogin } from "../models/login";
import { IMapperFromDto } from "./mapper";

class LoginMapper implements IMapperFromDto<LoginDto, ILogin> {
  fromDto(data: LoginDto): ILogin {
    return {
      googleTokenId: data.googleTokenId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      pictureUrl: data.pictureUrl,
    };
  }
}

export const loginMapper = new LoginMapper();
