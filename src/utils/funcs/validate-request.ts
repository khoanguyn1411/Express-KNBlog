import { NextFunction, Response } from "express";
import Joi, { ValidationErrorItem } from "joi";
import { isValidObjectId } from "mongoose";

import { ErrorCode } from "@/configs/app/code.config";
import { RecordObject } from "@/routes/build-route-paths";
import { PARAM_NAME, ParamName } from "@/routes/route-paths";

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
  InvalidField = "object.unknown",
  Custom = "custom",
}

const VALIDATION_ERROR_MAPPED: Record<ValidationErrorCode, (context: any) => string> = {
  [ValidationErrorCode.Required]: () => "This field is required.",
  [ValidationErrorCode.InvalidField]: () => "Invalid field.",
  [ValidationErrorCode.Email]: () => "This field must be a valid email.",
  [ValidationErrorCode.Empty]: () => "This field should not be empty.",
  [ValidationErrorCode.String]: () => "This field must be string.",
  [ValidationErrorCode.Number]: () => "This field must be number.",
  [ValidationErrorCode.Min]: (context) => `This field must includes ${context.limit} characters .`,
  [ValidationErrorCode.Max]: (context) =>
    `This field cannot exceed ${context.limit} characters long.`,
  [ValidationErrorCode.Domain]: () => "This field must be a valid domain.",
  [ValidationErrorCode.Custom]: (context) => `${context.message}`,
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
  return [
    VALIDATION_ERROR_MAPPED[errorCode]
      ? VALIDATION_ERROR_MAPPED[errorCode](errorItem.context)
      : errorItem.message,
  ];
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
    .send(generateErrorWithCode({ code: ErrorCode.BadData, error: { data: validationError } }));
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
    const key = cur.context.label ?? cur.context.key;
    return {
      ...acc,
      [key]: getValidationCustomMessage(cur),
    };
  }, {}) as ErrorData<TSchema>;
  return validationError;
}

/**
 * Validates the request body against a given Joi schema.
 * @param schema The Joi schema to validate the request body against.
 * @param req The Express request object containing the request body.
 */
function validateRequestBody<TSchema extends RecordObject>({ schema, req }: RequestInput<TSchema>) {
  const { error } = schema.validate(req.body, { abortEarly: false });
  return generateValidationError(error);
}

/**
 * Validates the request query parameters against a given Joi schema.
 * @param schema The Joi schema to validate the request query parameters against.
 * @param req The Express request object containing the request query parameters.
 */
function validateRequestQuery<TSchema extends RecordObject>({
  schema,
  req,
}: RequestInput<TSchema>) {
  const { error } = schema.validate(req.query, { abortEarly: false });
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

/**
 * Validate param object ID.
 * @param paramName Param name.
 */
export function validateParamObjectId(paramName: (typeof PARAM_NAME)[keyof typeof PARAM_NAME]) {
  return (req: AppRequest<unknown, unknown, ParamName>, res: Response, next: NextFunction) => {
    if (isValidObjectId(req.params[paramName])) {
      next();
      return;
    }
    res.status(ErrorCode.InternalServer).send(
      generateErrorWithCode({
        code: ErrorCode.InternalServer,
        message: `Invalid object ID for param: ${paramName}`,
      }),
    );
  };
}
