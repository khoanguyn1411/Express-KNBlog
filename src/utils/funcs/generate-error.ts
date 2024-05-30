import { Document } from "mongoose";

import { RecordObject } from "@/routes/build-route-paths";

import { ErrorCode, READABLE_ERROR_CODE } from "../../configs/app/code.config";
import { Nullable } from "../types/nullable";
import { StrictOmit } from "../types/strict-omit";

type Stringify<T> = {
  [K in keyof T]: string[];
};

export type ResponseErrorType<T extends RecordObject = RecordObject> = {
  readonly data?: InputError<T>["data"] & Pick<InputError<T>, "nonFieldErrors">;
  readonly detail: string;
};

export type ErrorData<TError extends RecordObject> = TError extends Document
  ? StrictOmit<Nullable<TError>, keyof Document>
  : Nullable<TError>;

type InputError<TError extends RecordObject> = {
  readonly data?: Partial<ErrorData<Stringify<TError>>>;
  readonly nonFieldErrors?: string[];
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
        nonFieldErrors: error.nonFieldErrors,
      },
      detail: errorDetail,
    } as ResponseErrorType<T>;
  }
  return {
    data: {
      ...error.data,
      nonFieldErrors: error.nonFieldErrors,
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
