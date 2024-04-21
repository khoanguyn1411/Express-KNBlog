import { NextFunction, Response } from "express";

import { ErrorCode } from "@/configs/app/code.config";
import { PaginationDto } from "@/core/dtos/pagination.dto";
import { catchPaginationQueryError } from "@/utils/funcs/create-pagination";
import { generateErrorWithCode } from "@/utils/funcs/generate-error";
import { AppRequest } from "@/utils/types/request";

export namespace BlogMiddleware {
  export function getBlogs(
    req: AppRequest<unknown, Partial<PaginationDto>>,
    res: Response,
    next: NextFunction,
  ): void {
    const validationError = catchPaginationQueryError(req);
    if (validationError == null) {
      next();
      return;
    }
    res
      .status(ErrorCode.BadData)
      .send(generateErrorWithCode(ErrorCode.BadData, { data: validationError }));
  }
}
