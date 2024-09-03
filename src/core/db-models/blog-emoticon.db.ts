import { ObjectId } from "mongodb";
import { model, PopulateOptions, Schema } from "mongoose";

import { MBlog } from "./blog.db";
import { MODEL_NAMES } from "./key";
import { MongooseBase } from "./mongoose";
import { MUser, UserDB } from "./user.db";

export interface MBlogEmoticon extends MongooseBase {
  readonly user: MUser;
  readonly blog: MBlog;
}

const schema = new Schema<MBlogEmoticon>(
  {
    user: {
      type: ObjectId,
      ref: MODEL_NAMES.User,
      required: true,
    },
    blog: {
      type: ObjectId,
      ref: MODEL_NAMES.Blog,
      required: true,
    },
  },
  { timestamps: true },
);

export namespace BlogEmoticonDB {
  export const ModelName = "blog-emoticon";
  export const Model = model(MODEL_NAMES.BlogEmoticon, schema);
  export const ShortPopulation: PopulateOptions[] = [
    {
      path: "user",
      select: UserDB.SelectFull,
    },
  ];
}
