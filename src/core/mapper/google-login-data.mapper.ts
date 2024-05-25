import { GoogleLoginDataDto } from "../dtos/google-login-data.dto";
import { GoogleLoginData } from "../models/google-login-data";
import { IMapperFromDto } from "./mapper";

class GoogleLoginDataMapper implements IMapperFromDto<GoogleLoginDataDto, GoogleLoginData> {
  fromDto(data: GoogleLoginDataDto): GoogleLoginData {
    return {
      googleTokenId: data.googleTokenId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      pictureUrl: data.pictureUrl,
    };
  }
}

export const googleLoginDataMapper = new GoogleLoginDataMapper();
