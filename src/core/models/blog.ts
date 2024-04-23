import { ObjectId } from "mongodb";
import { Document, model, PopulateOptions, Schema } from "mongoose";

import { MongooseBase } from "./mongoose";
import { IUser } from "./user";

export interface IBlog extends MongooseBase {
  readonly writtenBy: IUser;
  readonly title: string;
  readonly description: string;
  readonly summary: string;
}

export type IBlogCreation = Pick<IBlog, "title" | "summary" | "description">;

export type MBlog = Document & IBlog;

const schema = new Schema<IBlog>(
  {
    writtenBy: {
      type: ObjectId,
      ref: "user",
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
    summary: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export namespace Blog {
  export const Model = model("blog", schema);
  export const ShortPopulation: PopulateOptions = { path: "writtenBy", select: "name" };
}
