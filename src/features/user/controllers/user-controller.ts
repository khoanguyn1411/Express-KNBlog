import { Response } from "express";

import { ErrorCode } from "../../../configs/app/error-code.config";
import { getUserInfoFromOauthTokenId } from "../../../configs/google-oauth/get-user-info";
import { Login } from "../../../core/models/login";
import { generateErrorWithCode } from "../../../utils/funcs/generate-error";
import { AppRequest } from "../../../utils/types/request";

export namespace UserController {
  export function getProfile(req: AppRequest, res: Response): void {
    res.status(200).send(JSON.stringify("Get user profile successfully."));
  }
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
    res.status(200).send({ accessToken: "Test 222", refreshToken: "Tesing 2" });
  }
}
