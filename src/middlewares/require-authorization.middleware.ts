import { NextFunction, Request, Response } from "express";

import { routePaths } from "@/routes/route-paths";
import { generateUnauthorizedError } from "@/utils/funcs/generate-unauthorized-error";
import { tokenHandler } from "@/utils/funcs/token-handler";

const NON_AUTHORIZED_ROUTES = [
  routePaths.auth.children.login.url,
  routePaths.auth.children.token.children.refresh.url,
  routePaths.blogs.url,
];

function canProceedWithoutAuthorization(url: string): boolean {
  return NON_AUTHORIZED_ROUTES.includes(url);
}

export async function requireAuthorizationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (canProceedWithoutAuthorization(req.url)) {
    next();
    return;
  }
  const user = await tokenHandler.decodeAccessTokenFromHeader(req);
  if (user == null) {
    generateUnauthorizedError(res);
    return;
  }
  next();
}
