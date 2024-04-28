import { Response } from "express";

import { SuccessCode } from "@/configs/app/code.config";
import { RefreshTokenDto } from "@/core/dtos/token.dto";
import { tokenMapper } from "@/core/mapper/token.mapper";
import { IRefreshToken, IToken } from "@/core/models/token";
import { tokenHandlerService } from "@/services/token-handler.service";
import { ResponseErrorType } from "@/utils/funcs/generate-error";
import { sendUnauthorizedError } from "@/utils/funcs/send-unauthorized-error";
import { AppRequest } from "@/utils/types/request";

export namespace TokenController {
  export async function refresh(
    req: AppRequest<RefreshTokenDto>,
    res: Response<IToken | ResponseErrorType<IRefreshToken>>,
  ): Promise<void> {
    const { refreshToken } = tokenMapper.fromRefreshTokenDto(req.body);
    const newToken = await tokenHandlerService.resignNewTokenOnRefresh(refreshToken);
    if (newToken == null) {
      sendUnauthorizedError(res);
      return;
    }
    res.status(SuccessCode.OK).send(newToken);
  }
}
