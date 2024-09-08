import { ObjectId } from "mongodb";
import { model, PopulateOptions, ProjectionType, Schema } from "mongoose";

import { BlogEmoticonDB } from "./blog-emoticon.db";
import { MODEL_NAMES } from "./key";
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
      ref: MODEL_NAMES.User,
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
).index({ title: "text" });

export namespace BlogDB {
  export const Model = model(MODEL_NAMES.Blog, schema);

  export const ProjectionShort: ProjectionType<MBlog> = { content: false };

  export const ShortPopulation: PopulateOptions[] = [
    {
      path: "writtenBy",
      select: UserDB.SelectFull,
    },
  ];

  export async function getAggregatedResult(blog: MBlog, currentUser: MUser | null) {
    const [emoticonCount, likedBlog] = await Promise.all([
      BlogEmoticonDB.Model.count({ blog: blog._id }),
      currentUser ? BlogEmoticonDB.Model.findOne({ blog: blog._id, user: currentUser }) : null,
    ]);
    return {
      ...blog,
      emoticonCount,
      isUserLiked: likedBlog != null,
    };
  }
}
