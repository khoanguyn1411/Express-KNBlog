import { Request, Response } from "express";

import { generateErrorWithCode } from "../../../utils/funcs/generate-error";

export namespace UserController {
  export function getProfile(req: Request, res: Response): void {
    res.status(200).send(JSON.stringify("Get user profile successfully."));
  }
  export function login(req: Request, res: Response): void {
    console.log("Here");
    const authorizationInfo = req.headers.authorization;
    const tokenId = authorizationInfo ? authorizationInfo.split(" ")[1] : null;
    if (tokenId == null) {
      const errorCode = 400;
      const error = generateErrorWithCode(errorCode, {
        nonFieldError: "Token ID must not be null",
      });
      res.status(errorCode).send(error);
      return;
    }
    res.status(200).send(tokenId);
  }
}
