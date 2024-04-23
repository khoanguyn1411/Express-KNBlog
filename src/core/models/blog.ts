import { ObjectId } from "mongodb";
import { model, PopulateOptions, Schema } from "mongoose";

import { MongooseBase } from "./mongoose";
import { PaginationBase } from "./pagination";
import { IUser, User } from "./user";

export interface IBlog extends MongooseBase {
  readonly writtenBy: IUser;
  readonly title: string;
  readonly description: string;
  readonly summary: string;
}

export type IBlogCreation = Pick<IBlog, "title" | "summary" | "description">;

export interface BlogQuery extends PaginationBase {
  readonly search: string;
}

const schema = new Schema<IBlog>(
  {
    writtenBy: {
      type: ObjectId,
      ref: User.ModelName,
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
  export const ModelName = "blog";
  export const Model = model(ModelName, schema);
  export const ShortPopulation: PopulateOptions = { path: "writtenBy", select: "name" };
}
