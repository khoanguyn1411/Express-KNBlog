import { Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { tokenHandlerService } from "@/services/token-handler.service";
import { generateErrorWithCode } from "@/utils/funcs/generate-error";
import { AppRequest } from "@/utils/types/request";

export namespace UserController {
  export async function getProfile(req: AppRequest, res: Response): Promise<void> {
    const user = await tokenHandlerService.decodeAccessTokenFromHeader(req);
    if (user == null) {
      res.status(ErrorCode.InternalServer).send(
        generateErrorWithCode(ErrorCode.InternalServer, {
          nonFieldError: "Could not find user profile.",
        }),
      );
      return;
    }
    res.status(SuccessCode.OK).send(user);
  }
}
