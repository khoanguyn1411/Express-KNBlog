import { model, Schema } from "mongoose";

import { MongooseBase } from "./mongoose";

export interface IUser extends MongooseBase {
  readonly email: string;
  readonly name: string;
  readonly lastLogin: string;
}

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
  },
  { timestamps: true },
);

export const User = model("user", schema);
