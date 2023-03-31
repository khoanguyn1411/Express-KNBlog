import { Request, Response } from "express";

export namespace BlogController {
  export function getBlogs(req: Request, res: Response): void {
    res.status(200).send(JSON.stringify("Get blogs successfully."));
  }
}
