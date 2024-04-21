import { NextFunction, Request, Response } from "express";

import { ErrorCode } from "@/configs/app/code.config";
import { generateErrorWithCode } from "@/utils/funcs/generate-error";
import { validateRequest } from "@/utils/funcs/validate-request";

import { BlogSchema } from "../shemas/blog.schema";

export namespace BlogMiddleware {
  export function createBlog(req: Request, res: Response, next: NextFunction): void {
    const validationError = validateRequest({ schema: BlogSchema.createBlog, req });
    if (validationError == null) {
      next();
      return;
    }
    res
      .status(ErrorCode.BadData)
      .send(generateErrorWithCode(ErrorCode.BadData, { data: validationError }));
  }
}
