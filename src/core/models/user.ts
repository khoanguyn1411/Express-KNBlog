import { Document, model, Schema } from "mongoose";

import { enumToArray } from "@/utils/funcs/enum-to-array";
import { StrictOmit } from "@/utils/types/strict-omit";

import { MongooseBase } from "./mongoose";

export enum UserRole {
  Admin = "admin",
  Cooperator = "partner",
  Viewer = "viewer",
}

export interface IUser extends MongooseBase {
  readonly email: string;
  readonly name: string;
  readonly lastLogin: Date;
  readonly role: UserRole;
}

export type IUserCreation = StrictOmit<IUser, "_id">;

export type MUser = Document & IUser;

const schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      required: true,
    },
    role: {
      type: String,
      enum: enumToArray(UserRole),
      required: true,
      default: UserRole.Viewer,
    },
  },
  { timestamps: true },
);

export namespace User {
  export const Model = model("user", schema);
}
