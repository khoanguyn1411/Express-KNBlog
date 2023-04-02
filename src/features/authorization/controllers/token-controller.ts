import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { IRefreshToken, IToken } from "@/core/models/token";
import { generateErrorWithCode, ResponseErrorType } from "@/utils/funcs/generate-error";
import { tokenHandler } from "@/utils/funcs/token-handler";
import { AppRequest } from "@/utils/types/request";

function generateUnauthorizedError(res: Response) {
  const errorCode = ErrorCode.Unauthorized;
  res.status(errorCode).send(generateErrorWithCode(errorCode));
}

export namespace TokenController {
  export async function refresh(
    req: AppRequest<IRefreshToken>,
    res: Response<IToken | ResponseErrorType<IRefreshToken>>,
  ): Promise<void> {
    const refreshToken = req.body.refreshToken;
    if (refreshToken == null) {
      generateUnauthorizedError(res);
      return;
    }
    const newToken = await tokenHandler.resignNewTokenOnRefresh(refreshToken);
    if (newToken == null) {
      generateUnauthorizedError(res);
      return;
    }
    res.status(SuccessCode.OK).send(newToken);
  }
}
