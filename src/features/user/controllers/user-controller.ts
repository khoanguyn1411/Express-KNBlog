import { Request, Response } from "express";

export class UserController {
  public static getUserProfile(req: Request, res: Response): void {
    res.status(200).send(JSON.stringify("Get user profile successfully."));
  }
}
