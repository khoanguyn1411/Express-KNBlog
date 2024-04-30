import { LoginDto } from "../dtos/login.dto";
import { ILogin } from "../models/login";
import { IMapperFromDto } from "./mapper";

class LoginMapper implements IMapperFromDto<LoginDto, ILogin> {
  fromDto(data: LoginDto): ILogin {
    return {
      googleTokenId: data.tokenId,
      googleAccessToken: data.accessToken,
    };
  }
}

export const loginMapper = new LoginMapper();
