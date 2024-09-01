import { ObjectId } from "mongodb";
import { model, PopulateOptions, Schema } from "mongoose";

import { MongooseBase } from "./mongoose";
import { MUser, UserDB } from "./user.db";

export interface MBlog extends MongooseBase {
  readonly writtenBy: MUser;
  readonly title: string;
  readonly content: string;
  readonly summary: string;
  readonly bannerUrl: string;
}

const schema = new Schema<MBlog>(
  {
    writtenBy: {
      type: ObjectId,
      ref: UserDB.ModelName,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    bannerUrl: {
      type: String,
      default: null,
    },
    content: {
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

export namespace BlogDB {
  export const ModelName = "blog";
  export const Model = model(ModelName, schema);
  export const ShortPopulation: PopulateOptions[] = [
    {
      path: "writtenBy",
      select: UserDB.SelectFullPopulation,
    },
  ];
}
