import { RegisterDataDto } from "../dtos/register-data.dto";
import { IRegisterData } from "../models/register-data";
import { IMapperFromDto } from "./mapper";

class RegisterDataMapper implements IMapperFromDto<RegisterDataDto, IRegisterData> {
  fromDto(data: RegisterDataDto): IRegisterData {
    return {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      pictureUrl: data.pictureUrl,
    };
  }
}

export const registerDataMapper = new RegisterDataMapper();
