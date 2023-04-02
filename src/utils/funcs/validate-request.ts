import { Request } from "express";
import Joi from "joi";

import { ErrorData } from "./generate-error";

type RequestInput<TSchema> = {
  schema: Joi.ObjectSchema<TSchema>;
  req: Request;
};

export function validateRequest<TSchema extends Record<string, any>>({
  schema,
  req,
}: RequestInput<TSchema>) {
  const { error } = schema.validate(req.body);
  if (error == null) {
    return null;
  }
  const validationError = error.details.reduce((acc, cur) => {
    if (cur.context == null || cur.context.key == null) {
      return acc;
    }
    return { ...acc, [cur.context.key]: [cur.message] };
  }, {}) as ErrorData<TSchema>;
  return validationError;
}
