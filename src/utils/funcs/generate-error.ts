import { Document } from "mongoose";

import { ErrorCode, READABLE_ERROR_CODE } from "../../configs/app/code.config";
import { StrictOmit } from "../types/strict-omit";

export type ResponseErrorType<T extends Readonly<Record<string, any>>> = {
  readonly data?: InputError<T>["data"] & Pick<InputError<T>, "nonFieldError">;
  readonly detail: string;
};

type InputError<TError extends Readonly<Record<string, any>>> = {
  readonly data?: TError extends Document ? StrictOmit<TError, keyof Document> : TError;
  readonly nonFieldError?: string;
};

function generateError<T extends Readonly<Record<string, any>>>(
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

export function generateErrorWithCode<T extends Readonly<Record<string, any>>>(
  code: ErrorCode,
  error?: InputError<T>,
): ResponseErrorType<T> {
  let detailMessage = READABLE_ERROR_CODE[code];
  if (detailMessage == null) {
    detailMessage = "Unknown error.";
  }
  return generateError(detailMessage, error);
}
