import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { getUserInfoFromOauthTokenId } from "@/configs/google-oauth/get-user-info";
import { Login } from "@/core/models/login";
import { User } from "@/core/models/user";
import { generateErrorWithCode } from "@/utils/funcs/generate-error";
import { AppRequest } from "@/utils/types/request";

export namespace AuthController {
  export async function login(req: AppRequest<Login>, res: Response): Promise<void> {
    const { tokenId, accessToken } = req.body;
    if (!accessToken || !tokenId) {
      const error = generateErrorWithCode(ErrorCode.BadData, {
        nonFieldError: "Token ID and Access Token must not be null",
      });
      res.status(ErrorCode.BadData).send(error);
      return;
    }
    const userInfoDto = await getUserInfoFromOauthTokenId(tokenId, accessToken);
    if (userInfoDto == null) {
      const errorCode = ErrorCode.Unauthorized;
      res.status(errorCode).send(generateErrorWithCode(errorCode));
      return;
    }
    const currentUser = await User.findOne({ email: userInfoDto.email });
    if (currentUser == null) {
      const newUser = await new User({ email: userInfoDto.email, name: userInfoDto.name }).save();
      res.status(SuccessCode.Created).send(newUser);
      return;
    }
    res.status(SuccessCode.OK).send(currentUser);
  }
}
