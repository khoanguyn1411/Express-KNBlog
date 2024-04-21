import { ObjectId } from "mongodb";
import { Document, model, Schema } from "mongoose";

import { MongooseBase } from "./mongoose";
import { IUser } from "./user";

export interface IBlog extends MongooseBase {
  readonly writtenBy: IUser["_id"];
  readonly title: string;
  readonly description: string;
}

export type MBlog = Document & IBlog;

const schema = new Schema<IBlog>(
  {
    writtenBy: {
      type: ObjectId,
      required: true,
    },
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
