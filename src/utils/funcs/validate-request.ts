import { NextFunction, Request, Response } from "express";
import Joi, { ValidationErrorItem } from "joi";

import { ErrorCode } from "@/configs/app/code.config";
import { paginationDtoSchema } from "@/core/dtos/pagination.dto";

import { ErrorData, generateErrorWithCode } from "./generate-error";

enum ValidationErrorCode {
  Required = "any.required",
  Email = "string.email",
  String = "string.base",
  Domain = "string.domain",
  Empty = "string.empty",
  Max = "string.max",
  Min = "string.min",
  Number = "number.base",
}

const VALIDATION_ERROR_MAPPED: Record<ValidationErrorCode, (context: any) => string> = {
  [ValidationErrorCode.Required]: () => "This field is required.",
  [ValidationErrorCode.Email]: () => "This field must be a valid email.",
  [ValidationErrorCode.Empty]: () => "This field should not be empty.",
  [ValidationErrorCode.String]: () => "This field must be string.",
  [ValidationErrorCode.Number]: () => "This field must be number.",
  [ValidationErrorCode.Min]: (context) => `This field must includes ${context.limit} characters .`,
  [ValidationErrorCode.Max]: (context) =>
    `This field cannot exceed ${context.limit} characters long.`,
  [ValidationErrorCode.Domain]: () => "This field must be a valid domain.",
};

type RequestInput<TSchema> = {
  schema: Joi.ObjectSchema<TSchema>;
  req: Request;
};

function getValidationCustomMessage(errorItem: ValidationErrorItem) {
  const errorCode = errorItem.type as ValidationErrorCode;
  return [VALIDATION_ERROR_MAPPED[errorCode](errorItem.context) ?? errorItem.message];
}

export function generateValidationError<TSchema extends Record<string, any>>(
  error?: Joi.ValidationError,
) {
  if (error == null) {
    return null;
  }
  const validationError = error.details.reduce((acc, cur) => {
    if (cur.context == null || cur.context.key == null) {
      return acc;
    }
    return {
      ...acc,
      [cur.context.key]: getValidationCustomMessage(cur),
    };
  }, {}) as ErrorData<TSchema>;
  return validationError;
}

export function validateRequestBody<TSchema extends Record<string, any>>({
  schema,
  req,
}: RequestInput<TSchema>) {
  const { error } = schema.validate(req.body);
  return generateValidationError(error);
}

export function validateRequestBodyWithSchema<T extends Record<string, any>>(
  schema: Joi.ObjectSchema<T>,
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationError = validateRequestBody({ schema, req });
    if (validationError == null) {
      next();
      return;
    }
    res
      .status(ErrorCode.BadData)
      .send(generateErrorWithCode(ErrorCode.BadData, { data: validationError }));
  };
}
