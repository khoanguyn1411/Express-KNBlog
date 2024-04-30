import { ObjectId } from "mongodb";
import { model, Schema } from "mongoose";

import { MongooseBase } from "./mongoose";
import { IToken } from "./token";
import { User } from "./user";

export interface IOutdateToken {
  readonly accessToken: IToken["accessToken"];
  readonly user: MongooseBase["_id"];
}

const schema = new Schema<IOutdateToken>(
  {
    accessToken: {
      type: String,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: User.ModelName,
      required: true,
    },
  },
  { timestamps: true },
);

export namespace OutdateToken {
  export const ModelName = "outdateToken";
  export const Model = model(ModelName, schema);
}
