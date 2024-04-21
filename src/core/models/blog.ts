import { model, Schema } from "mongoose";

import { MongooseBase } from "./mongoose";

export interface IBlog extends MongooseBase {
  readonly title: string;
  readonly description: string;
}

export type MBlog = Document & IBlog;

const schema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Blog = model("blog", schema);
