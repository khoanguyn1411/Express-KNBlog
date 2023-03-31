import { model, Schema } from "mongoose";

import { routePaths } from "../../routes/route-paths";

interface User {
  readonly id: string;
  readonly email: string;
  readonly userName: string;
}

const schema = new Schema<User>(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const User = model("user", schema);
