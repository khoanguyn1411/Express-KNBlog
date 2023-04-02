import { Request } from "express";

export type AppRequest<T = unknown> = Request<unknown, unknown, T>;
