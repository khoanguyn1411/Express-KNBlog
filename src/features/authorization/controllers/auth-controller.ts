import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { getUserInfoFromOauthTokenId } from "@/configs/google-oauth/get-user-info";
import { ILogin } from "@/core/models/login";
import { IToken } from "@/core/models/token";
import { User } from "@/core/models/user";
import { generateErrorWithCode, ResponseErrorType } from "@/utils/funcs/generate-error";
import { tokenHandler } from "@/utils/funcs/token-handler";
import { AppRequest } from "@/utils/types/request";

function generateUnauthorizedError(res: Response) {
  const errorCode = ErrorCode.Unauthorized;
  res.status(errorCode).send(generateErrorWithCode(errorCode));
}

export namespace AuthController {
  export async function login(
    req: AppRequest<ILogin>,
    res: Response<IToken | ResponseErrorType<ILogin>>,
  ): Promise<void> {
    const { tokenId, accessToken } = req.body;
    if (!accessToken || !tokenId) {
      const error = generateErrorWithCode<ILogin>(ErrorCode.BadData, {
        nonFieldError: "Token ID and Access Token must not be null",
      });
      res.status(ErrorCode.BadData).send(error);
      return;
    }
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
      const newUser = await new User({
        email: userInfoDto.email,
        name: userInfoDto.name,
        lastLogin: new Date().toISOString(),
      }).save();
      const token = tokenHandler.signToken(newUser);
      res.status(SuccessCode.Created).send(token);
      return;
    }
    const token = tokenHandler.signToken(currentUser);
    res.status(SuccessCode.OK).send(token);
  }
}
