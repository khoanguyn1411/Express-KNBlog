import { model, Schema } from "mongoose";
import { Document } from "mongoose";

import { enumToArray } from "@/utils/funcs/enum-to-array";

import { MongooseBase } from "./mongoose";

export enum UserRole {
  Admin = "admin",
  Cooperator = "partner",
  Viewer = "viewer",
}

export interface IUser extends MongooseBase {
  readonly email: string;
  readonly name: string;
  readonly lastLogin: string;
  readonly role: UserRole;
}

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
      type: String,
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

export const User = model("user", schema);
