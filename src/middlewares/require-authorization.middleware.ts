import { NextFunction, Response } from "express";

import { OutdateToken } from "@/core/models/outdate-token";
import { routePaths } from "@/routes/route-paths";
import { tokenHandlerService } from "@/services/token-handler.service";
import { sendUnauthorizedError } from "@/utils/funcs/send-unauthorized-error";
import { AppRequest } from "@/utils/types/request";

const NON_AUTHORIZED_ROUTES = [
  routePaths.auth.children.login.url,
  routePaths.auth.children.register.url,
  routePaths.auth.children.googleLogin.url,
  routePaths.auth.children.token.children.refresh.url,
  routePaths.blogs.url,
];

function canProceedWithoutAuthorization(url: string): boolean {
  return NON_AUTHORIZED_ROUTES.includes(url);
}

export async function requireAuthorizationMiddleware(
  req: AppRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (canProceedWithoutAuthorization(req.url)) {
    next();
    return;
  }
  const user = await tokenHandlerService.decodeAccessTokenFromHeader(req);
  if (user == null) {
    sendUnauthorizedError(res);
    return;
  }
  const accessToken = tokenHandlerService.getAccessTokenFromHeader(req);
  const outdateTokenRecord = await OutdateToken.Model.findOne({ user: user._id, accessToken });
  const isOutdateToken = outdateTokenRecord != null;
  if (isOutdateToken) {
    sendUnauthorizedError(res);
    return;
  }
  next();
}
