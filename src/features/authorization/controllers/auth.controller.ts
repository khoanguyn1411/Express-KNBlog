import { Response } from "express";

import { SuccessCode } from "@/configs/app/code.config";
import { LoginDto } from "@/core/dtos/login.dto";
import { loginMapper } from "@/core/mapper/login.mapper";
import { userMapper } from "@/core/mapper/user.mapper";
import { ILogin } from "@/core/models/login";
import { OutdateToken } from "@/core/models/outdate-token";
import { IToken } from "@/core/models/token";
import { User } from "@/core/models/user";
import { googleOauthService } from "@/services/google-oauth.service";
import { tokenHandlerService } from "@/services/token-handler.service";
import { assertNonNull } from "@/utils/funcs/assert-non-null";
import { ResponseErrorType } from "@/utils/funcs/generate-error";
import { sendUnauthorizedError } from "@/utils/funcs/send-unauthorized-error";
import { AppRequest } from "@/utils/types/request";

export namespace AuthController {
  export async function logout(req: AppRequest<LoginDto>, res: Response): Promise<void> {
    const accessToken = tokenHandlerService.getAccessTokenFromHeader(req);
    const user = await tokenHandlerService.decodeAccessTokenFromHeader(req);
    assertNonNull(user);
    await OutdateToken.Model.create({ accessToken, user: user._id });
    res.sendStatus(SuccessCode.OK);
  }
  export async function login(
    req: AppRequest<LoginDto>,
    res: Response<IToken | ResponseErrorType<ILogin>>,
  ): Promise<void> {
    const loginDtoData = loginMapper.fromDto(req.body);
    const userInfoDto = await googleOauthService.verifyTokenId(loginDtoData);
    if (userInfoDto == null) {
      sendUnauthorizedError(res);
      return;
    }
    const newUser = userMapper.fromCreationDto(userInfoDto);
    const currentUser = await User.Model.findOne({ email: newUser.email });
    if (currentUser == null) {
      const userData = new User.Model(newUser);
      const token = tokenHandlerService.signToken({ _id: userData._id });
      await userData.save();
      res.status(SuccessCode.Created).send(token);
      return;
    }
    const token = tokenHandlerService.signToken({ _id: currentUser._id });
    res.status(SuccessCode.OK).send(token);
  }
}
