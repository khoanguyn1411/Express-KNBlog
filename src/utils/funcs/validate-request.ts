import { NextFunction, Response } from "express";
import Joi, { ValidationErrorItem } from "joi";

import { ErrorCode } from "@/configs/app/code.config";
import { RecordObject } from "@/routes/build-route-paths";

import { Nullable } from "../types/nullable";
import { AppRequest } from "../types/request";
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
  req: AppRequest;
};

/**
 * Retrieves a custom validation error message based on the error item.
 * @param errorItem The validation error item.
 */
function getValidationCustomMessage(errorItem: ValidationErrorItem) {
  const errorCode = errorItem.type as ValidationErrorCode;
  return [VALIDATION_ERROR_MAPPED[errorCode](errorItem.context) ?? errorItem.message];
}

/**
 * Sends a validation error response with a given validation error object.
 * @param res The Express response object to send the response.
 */
function sendValidationErrorResponse<T extends Nullable<RecordObject> | undefined>(
  res: Response,
  validationError: T,
) {
  res
    .status(ErrorCode.BadData)
    .send(generateErrorWithCode(ErrorCode.BadData, { data: validationError }));
}

/**
 * Generates a structured validation error object from a Joi validation error.
 * @param error The Joi validation error object.
 */
export function generateValidationError<TSchema extends RecordObject>(error?: Joi.ValidationError) {
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

/**
 * Validates the request body against a given Joi schema.
 * @param schema The Joi schema to validate the request body against.
 * @param req The Express request object containing the request body.
 */
export function validateRequestBody<TSchema extends RecordObject>({
  schema,
  req,
}: RequestInput<TSchema>) {
  const { error } = schema.validate(req.body);
  return generateValidationError(error);
}

/**
 * Middleware function to validate the request body against a given Joi schema.
 * @param schema The Joi schema to validate the request body against.
 */
export function validateRequestBodyWithSchema<T extends RecordObject>(schema: Joi.ObjectSchema<T>) {
  return (req: AppRequest, res: Response, next: NextFunction) => {
    const validationError = validateRequestBody({ schema, req });
    if (validationError == null) {
      next();
      return;
    }
    sendValidationErrorResponse(res, validationError);
  };
}

/**
 * Validates the request query parameters against a given Joi schema.
 * @param schema The Joi schema to validate the request query parameters against.
 * @param req The Express request object containing the request query parameters.
 */
export function validateRequestQuery<TSchema extends RecordObject>({
  schema,
  req,
}: RequestInput<TSchema>) {
  const { error } = schema.validate(req.query);
  return generateValidationError(error);
}

/**
 * Middleware function to validate the request query parameters against a given Joi schema.
 * @param schema The Joi schema to validate the request query parameters against.
 */
export function validateRequestQueryWithSchema<T extends RecordObject>(
  schema: Joi.ObjectSchema<T>,
) {
  return (req: AppRequest, res: Response, next: NextFunction) => {
    const validationError = validateRequestQuery({ schema, req });
    if (validationError == null) {
      next();
      return;
    }
    sendValidationErrorResponse(res, validationError);
  };
}
