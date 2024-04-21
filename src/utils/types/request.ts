import { Request } from "express";

export type AppRequest<TBody = unknown, TQuery = unknown> = Request<
  unknown,
  unknown,
  TBody,
  TQuery
>;
