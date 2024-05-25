import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

import { Token } from "../models/token";
import { MongooseBase } from "./mongoose";
import { UserDB } from "./user.db";

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
      ref: UserDB.ModelName,
      required: true,
    },
  },
  { timestamps: true },
);

export namespace OutdateTokenDB {
  export const ModelName = "outdateToken";
  export const Model = model(ModelName, schema);
}
