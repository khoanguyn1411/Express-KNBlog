import { NextFunction, Request, Response } from "express";

import { ErrorCode } from "@/configs/app/code.config";
import { generateErrorWithCode } from "@/utils/funcs/generate-error";
import { validateRequest } from "@/utils/funcs/validate-request";

import { AuthSchema } from "../shemas/auth.schema";

export namespace AuthMiddleware {
  export function login(req: Request, res: Response, next: NextFunction): void {
    const validationError = validateRequest({ schema: AuthSchema.login, req });
    if (validationError == null) {
      next();
      return;
    }
    res
      .status(ErrorCode.BadData)
      .send(generateErrorWithCode(ErrorCode.BadData, { data: validationError }));
  }
}
