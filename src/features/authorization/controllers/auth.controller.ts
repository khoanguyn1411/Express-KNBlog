import { Response } from "express";

import { SuccessCode } from "@/configs/app/code.config";
import { getUserInfoFromOauthTokenId } from "@/configs/google-oauth/get-user-info";
import { LoginDto } from "@/core/dtos/login.dto";
import { loginMapper } from "@/core/mapper/login.mapper";
import { userMapper } from "@/core/mapper/user.mapper";
import { ILogin } from "@/core/models/login";
import { IToken } from "@/core/models/token";
import { User } from "@/core/models/user";
import { ResponseErrorType } from "@/utils/funcs/generate-error";
import { generateUnauthorizedError } from "@/utils/funcs/generate-unauthorized-error";
import { tokenHandler } from "@/utils/funcs/token-handler";
import { AppRequest } from "@/utils/types/request";

export namespace AuthController {
  export async function login(
    req: AppRequest<LoginDto>,
    res: Response<IToken | ResponseErrorType<ILogin>>,
  ): Promise<void> {
    const { accessToken, tokenId } = loginMapper.fromDto(req.body);
    const userInfoDto = await getUserInfoFromOauthTokenId(tokenId, accessToken);
    if (userInfoDto == null) {
      generateUnauthorizedError(res);
      return;
    }
    const currentUser = await User.findOneAndUpdate(
      { email: userInfoDto.email },
      { lastLogin: new Date().toISOString() },
    );
    if (currentUser == null) {
      const newUser = await userMapper.fromDto(userInfoDto).save();
      const token = tokenHandler.signToken(newUser);
      res.status(SuccessCode.Created).send(token);
      return;
    }
    const token = tokenHandler.signToken(currentUser);
    res.status(SuccessCode.OK).send(token);
  }
}
