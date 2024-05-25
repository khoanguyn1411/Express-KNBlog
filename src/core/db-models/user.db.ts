import { model, Schema } from "mongoose";

import { enumToArray } from "@/utils/funcs/enum-to-array";

import { MongooseBase } from "./mongoose";

export enum UserRole {
  Admin = "admin",
  Cooperator = "partner",
  Viewer = "viewer",
}

export interface MUser extends MongooseBase {
  readonly email: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string | null;
  readonly lastLogin: Date;
  readonly role: UserRole;
}

const schema = new Schema<MUser>(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    lastLogin: {
      type: Date,
      required: true,
    },
    password: {
      type: String,
      default: null,
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

export namespace UserDB {
  export const ModelName = "user";
  export const Model = model(ModelName, schema);
}