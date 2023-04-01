import { model, Schema } from "mongoose";

import { MongooseModelled } from "./mongoose";

export interface User extends MongooseModelled {
  readonly email: string;
  readonly name: string;
}

const schema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const User = model("user", schema);
