import { Response } from "express";

import { SuccessCode } from "@/configs/app/code.config";
import { LoginDto } from "@/core/dtos/login.dto";
import { loginMapper } from "@/core/mapper/login.mapper";
import { userMapper } from "@/core/mapper/user.mapper";
import { ILogin } from "@/core/models/login";
import { IToken } from "@/core/models/token";
import { IUser, User } from "@/core/models/user";
import { googleOauthService } from "@/services/google-oauth.service";
import { tokenHandlerService } from "@/services/token-handler.service";
import { ResponseErrorType } from "@/utils/funcs/generate-error";
import { generateUnauthorizedError } from "@/utils/funcs/generate-unauthorized-error";
import { AppRequest } from "@/utils/types/request";

export namespace AuthController {
  export async function login(
    req: AppRequest<LoginDto>,
    res: Response<IToken | ResponseErrorType<ILogin>>,
  ): Promise<void> {
    const { accessToken, tokenId } = loginMapper.fromDto(req.body);
    const userInfoDto = await googleOauthService.getUserInfoFromOauthTokenId(tokenId, accessToken);
    if (userInfoDto == null) {
      generateUnauthorizedError(res);
      return;
    }
    const newUser = userMapper.fromCreationDto(userInfoDto);
    const currentUser = await User.Model.findOneAndUpdate(
      { email: newUser.email },
      { lastLogin: new Date() },
    );
    if (currentUser == null) {
      const userData = await User.Model.create(newUser);
      const userAsObject = userData.toObject<IUser>();
      const token = tokenHandlerService.signToken(userAsObject);
      res.status(SuccessCode.Created).send(token);
      return;
    }
    const userAsObject = currentUser.toObject<IUser>();
    const token = tokenHandlerService.signToken(userAsObject);
    res.status(SuccessCode.OK).send(token);
  }
}
