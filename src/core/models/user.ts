import { StrictOmit } from "@/utils/types/strict-omit";

import { MUser } from "../db-models/user.db";
import { PaginationBase } from "./pagination";

export type UserCreation = StrictOmit<MUser, "_id">;
export type UserUpdate = Pick<MUser, "firstName" | "lastName" | "pictureUrl">;

export interface UserQuery extends PaginationBase {
  readonly search: string;
}
