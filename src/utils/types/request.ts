import { Request } from "express";

interface ParamsDictionary {
  [key: string]: string;
}

export type AppRequest<TBody = unknown, TQuery = unknown, TParams = ParamsDictionary> = Request<
  TParams,
  unknown,
  TBody,
  TQuery
>;
