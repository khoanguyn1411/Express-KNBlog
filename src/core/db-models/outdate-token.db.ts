import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

import { Token } from "../models/token";
import { MODEL_NAMES } from "./key";
import { MongooseBase } from "./mongoose";

export interface MOutdateToken {
  readonly accessToken: Token["accessToken"];
  readonly user: MongooseBase["_id"];
}

const schema = new Schema<MOutdateToken>(
  {
    accessToken: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: MODEL_NAMES.User,
      required: true,
    },
  },
  { timestamps: true },
);

export namespace OutdateTokenDB {
  export const ModelName = "outdate-token";
  export const Model = model(ModelName, schema);
}
