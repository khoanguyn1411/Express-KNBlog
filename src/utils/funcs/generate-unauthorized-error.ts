import { Response } from "express";

import { ErrorCode } from "@/configs/app/code.config";

import { generateErrorWithCode } from "./generate-error";

export function generateUnauthorizedError(res: Response): void {
  const errorCode = ErrorCode.Unauthorized;
  res.status(errorCode).send(generateErrorWithCode(errorCode));
}
