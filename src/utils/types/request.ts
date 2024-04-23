import { Request } from "express";

export type AppRequest<TBody = unknown, TQuery = unknown, TParams = unknown> = Request<
  TParams,
  unknown,
  TBody,
  TQuery
>;
