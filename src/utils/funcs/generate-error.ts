import { Document } from "mongoose";

import { ErrorCode, READABLE_ERROR_CODE } from "../../configs/app/code.config";
import { Nullable } from "../types/nullable";
import { StrictOmit } from "../types/strict-omit";

export type ResponseErrorType<T extends Record<string, any>> = {
  readonly data?: InputError<T>["data"] & Pick<InputError<T>, "nonFieldError">;
  readonly detail: string;
};

export type ErrorData<TError extends Record<string, any>> = TError extends Document
  ? StrictOmit<Nullable<TError>, keyof Document>
  : Nullable<TError>;

type InputError<TError extends Record<string, any>> = {
  readonly data?: ErrorData<TError>;
  readonly nonFieldError?: string;
};

function generateError<T extends Record<string, any>>(
  errorDetail: string,
  error?: InputError<T>,
): ResponseErrorType<T> {
  if (error == null) {
    return { detail: errorDetail };
  }
  if (error.data == null) {
    return {
      data: {
        nonFieldError: error.nonFieldError,
      },
      detail: errorDetail,
    } as ResponseErrorType<T>;
  }
  return {
    data: {
      ...error.data,
      nonFieldError: error.nonFieldError,
    },
    detail: errorDetail,
  };
}

export function generateErrorWithCode<T extends Record<string, any>>(
  code: ErrorCode,
  error?: InputError<T>,
): ResponseErrorType<T> {
  let detailMessage = READABLE_ERROR_CODE[code];
  if (detailMessage == null) {
    detailMessage = "Unknown error.";
  }
  return generateError(detailMessage, error);
}
