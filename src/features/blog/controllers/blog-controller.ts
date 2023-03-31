import { Request, Response } from "express";

export class BlogController {
  public static getBlogs(req: Request, res: Response): void {
    res.status(200).send(JSON.stringify("Get blogs successfully."));
  }
}
