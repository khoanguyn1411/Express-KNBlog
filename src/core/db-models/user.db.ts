import { model, ProjectionType, Schema } from "mongoose";

import { enumToArray } from "@/utils/funcs/enum-to-array";

import { MODEL_NAMES } from "./key";
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
  readonly pictureUrl: string | null;
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
    pictureUrl: {
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
  export const ProjectionFull: ProjectionType<MUser> = { password: false };

  export const SelectFull: (keyof MUser)[] = [
    "_id",
    "firstName",
    "lastName",
    "email",
    "pictureUrl",
    "lastLogin",
    "role",
  ];

  export const Model = model(MODEL_NAMES.User, schema);
}
