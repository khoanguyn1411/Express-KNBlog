import { Response } from "express";

import { AppRequest } from "../../../utils/types/request";

export namespace UserController {
  export function getProfile(req: AppRequest, res: Response): void {
    res.status(200).send(JSON.stringify("Get user profile successfully."));
  }
}
