import { Request, Response } from "express";

export namespace UserController {
  export function getProfile(req: Request, res: Response): void {
    res.status(200).send(JSON.stringify("Get user profile successfully."));
  }
}
