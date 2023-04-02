import { Response } from "express";

import { SuccessCode } from "@/configs/app/code.config";
import { RefreshTokenDto } from "@/core/dtos/token.dto";
import { tokenMapper } from "@/core/mapper/token.mapper";
import { IRefreshToken, IToken } from "@/core/models/token";
import { ResponseErrorType } from "@/utils/funcs/generate-error";
import { generateUnauthorizedError } from "@/utils/funcs/generate-unauthorized-error";
import { tokenHandler } from "@/utils/funcs/token-handler";
import { AppRequest } from "@/utils/types/request";

export namespace TokenController {
  export async function refresh(
    req: AppRequest<RefreshTokenDto>,
    res: Response<IToken | ResponseErrorType<IRefreshToken>>,
  ): Promise<void> {
    const { refreshToken } = tokenMapper.fromRefreshTokenDto(req.body);
    const newToken = await tokenHandler.resignNewTokenOnRefresh(refreshToken);
    if (newToken == null) {
      generateUnauthorizedError(res);
      return;
    }
    res.status(SuccessCode.OK).send(newToken);
  }
}
