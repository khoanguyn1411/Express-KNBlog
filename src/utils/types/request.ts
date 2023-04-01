import { Request } from "express";

import { Nullable } from "./nullable";

export type AppRequest<T = unknown> = Request<
  unknown,
  unknown,
  T extends Record<string, any> ? Nullable<T> : T
>;
