import { Request, Response } from "express";

import { ErrorCode, SuccessCode } from "@/configs/app/code.config";
import { generateErrorWithCode } from "@/utils/funcs/generate-error";
import { tokenHandler } from "@/utils/funcs/token-handler";

export namespace UserController {
  export async function getProfile(req: Request, res: Response): Promise<void> {
    const user = await tokenHandler.decodeAccessTokenFromHeader(req);
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
