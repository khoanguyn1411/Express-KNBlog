import { NextFunction, Request, Response } from "express";

import { ErrorCode } from "@/configs/app/code.config";
import { generateErrorWithCode } from "@/utils/funcs/generate-error";
import { validateRequest } from "@/utils/funcs/validate-request";

import { TokenSchema } from "../shemas/token.schema";

export namespace TokenMiddleware {
  export function refresh(req: Request, res: Response, next: NextFunction): void {
    const validationError = validateRequest({ schema: TokenSchema.refresh, req });
    if (validationError == null) {
      next();
      return;
    }
    res
      .status(ErrorCode.BadData)
      .send(generateErrorWithCode(ErrorCode.BadData, { data: validationError }));
  }
}
