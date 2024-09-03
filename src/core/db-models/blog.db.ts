import { ObjectId } from "mongodb";
import { model, PipelineStage, PopulateOptions, ProjectionType, Schema } from "mongoose";

import { getDbKey, MODEL_NAMES } from "./key";
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
);

export namespace BlogDB {
  export const Model = model(MODEL_NAMES.Blog, schema);

  export const ProjectionShort: ProjectionType<MBlog> = { content: false };

  export const PipelineStagesList: PipelineStage[] = [
    {
      $lookup: {
        from: getDbKey(MODEL_NAMES.BlogEmoticon),
        localField: "_id",
        foreignField: "blog",
        as: "likesInfo",
      },
    },
    {
      $addFields: {
        emoticonCount: { $size: "$likesInfo" },
      },
    },

    {
      $lookup: {
        from: getDbKey(MODEL_NAMES.User),
        localField: "writtenBy",
        foreignField: "_id",
        as: "writtenBy",
      },
    },

    {
      $project: {
        ...ProjectionShort,
        likesInfo: false,
        writtenBy: UserDB.ProjectionFull,
      },
    },

    { $unwind: "$writtenBy" },
  ];

  export const PipelineStagesDetail: PipelineStage[] = [
    {
      $lookup: {
        from: getDbKey(MODEL_NAMES.BlogEmoticon),
        localField: "_id",
        foreignField: "blog",
        as: "likesInfo",
      },
    },
    {
      $addFields: {
        emoticonCount: { $size: "$likesInfo" },
      },
    },
    {
      $lookup: {
        from: getDbKey(MODEL_NAMES.User),
        localField: "writtenBy",
        foreignField: "_id",
        as: "writtenBy",
      },
    },
    {
      $project: {
        likesInfo: false,
        writtenBy: UserDB.ProjectionFull,
      },
    },
  ];

  export const ShortPopulation: PopulateOptions[] = [
    {
      path: "writtenBy",
      select: UserDB.SelectFull,
    },
  ];
}
