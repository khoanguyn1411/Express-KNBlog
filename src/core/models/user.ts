import { model, Schema } from "mongoose";

interface User {
  id: string;
  email: string;
  userName: string;
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
