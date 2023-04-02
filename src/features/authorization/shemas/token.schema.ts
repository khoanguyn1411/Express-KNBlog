import Joi from "joi";

import { RefreshTokenDto } from "@/core/dtos/token.dto";

export namespace TokenSchema {
  export const refresh = Joi.object<RefreshTokenDto>({
    refreshToken: Joi.string().required().messages({ "any.required": "This field is required" }),
  });
}
