import { NextFunction, Response } from "express";

import { OutdateTokenDB } from "@/core/db-models/outdate-token.db";
import { tokenHandlerService } from "@/services/token-handler.service";
import { sendUnauthorizedError } from "@/utils/funcs/send-unauthorized-error";
import { AppRequest } from "@/utils/types/request";

export async function requireAuthorizationMiddleware(
  req: AppRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const user = await tokenHandlerService.getUserFromHeaderToken(req);
  if (user == null) {
    sendUnauthorizedError(res);
    return;
  }
  const accessToken = tokenHandlerService.getAccessTokenFromHeader(req);
  const outdateTokenRecord = await OutdateTokenDB.Model.findOne({ user: user._id, accessToken });
  const isOutdateToken = outdateTokenRecord != null;
  if (isOutdateToken) {
    sendUnauthorizedError(res);
    return;
  }
  next();
}
