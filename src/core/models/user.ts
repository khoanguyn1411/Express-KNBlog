import { StrictOmit } from "@/utils/types/strict-omit";

import { MUser } from "../db-models/user.db";

export type UserCreation = StrictOmit<MUser, "_id">;
export type User = StrictOmit<MUser, "password">;
