import Joi from "joi";
import { isValidObjectId } from "mongoose";

export namespace CustomValidator {
  export function validObjectId(value: any, helper: Joi.CustomHelpers<any>) {
    if (!value) {
      return true;
    }
    if (isValidObjectId(value)) {
      return true;
    }
    return helper.message({ custom: "Invalid ID." }, { message: "Invalid ID." });
  }
}
