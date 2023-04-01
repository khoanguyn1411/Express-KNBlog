import jwt from "jsonwebtoken";

import { APP_JWT_ACCESS_TOKEN, APP_JWT_REFRESH_TOKEN } from "@/configs/app/app.config";
import { Token } from "@/core/models/token";
import { User } from "@/core/models/user";

export namespace TokenHandler {
  export function signToken(user: User): Token {
    const accessToken = jwt.sign(user, APP_JWT_ACCESS_TOKEN, { expiresIn: "3h" });
    const refreshToken = jwt.sign({ id: user.id }, APP_JWT_REFRESH_TOKEN, {
      expiresIn: "1d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }
}
