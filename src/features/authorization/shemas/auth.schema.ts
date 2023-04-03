import Joi from "joi";

import { LoginDto } from "@/core/dtos/login.dto";

export namespace AuthSchema {
  export const login = Joi.object<LoginDto>({
    tokenId: Joi.string().required(),
    accessToken: Joi.string().required(),
  });
}
