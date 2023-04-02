import { LoginDto } from "../dtos/login.dto";
import { ILogin } from "../models/login";
import { IMapperFromDto } from "./mapper";

class LoginMapper implements IMapperFromDto<LoginDto, ILogin> {
  fromDto(data: LoginDto): LoginDto {
    return {
      tokenId: data.tokenId,
      accessToken: data.accessToken,
    };
  }
}

export const loginMapper = new LoginMapper();
