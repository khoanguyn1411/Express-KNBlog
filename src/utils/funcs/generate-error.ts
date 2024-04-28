import { Document } from "mongoose";

import { RecordObject } from "@/routes/build-route-paths";

import { ErrorCode, READABLE_ERROR_CODE } from "../../configs/app/code.config";
import { Nullable } from "../types/nullable";
import { StrictOmit } from "../types/strict-omit";

type Stringify<T> = {
  [K in keyof T]: string;
};

export type ResponseErrorType<T extends RecordObject = RecordObject> = {
  readonly data?: InputError<T>["data"] & Pick<InputError<T>, "nonFieldError">;
  readonly detail: string;
};

export type ErrorData<TError extends RecordObject> = TError extends Document
  ? StrictOmit<Nullable<TError>, keyof Document>
  : Nullable<TError>;

type InputError<TError extends RecordObject> = {
  readonly data?: ErrorData<Stringify<TError>>;
  readonly nonFieldError?: string;
};

function generateError<T extends RecordObject>(
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

export function generateErrorWithCode<T extends RecordObject>(
  code: ErrorCode,
  error?: InputError<T>,
): ResponseErrorType<T> {
  let detailMessage = READABLE_ERROR_CODE[code];
  if (detailMessage == null) {
    detailMessage = "Unknown error.";
  }
  return generateError(detailMessage, error);
}
