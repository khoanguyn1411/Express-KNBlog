import { ErrorCode, READABLE_ERROR_CODE } from "../../configs/app/error-code.config";

export type ResponseErrorType = {
  readonly data?: Record<string, any>;
  readonly detail: string;
};

type InputError<Error extends Readonly<Record<string, any>>> = {
  readonly data?: Error;
  readonly nonFieldError?: string;
};

function generateError<T extends Readonly<Record<string, any>>>(
  errorDetail: string,
  error?: InputError<T>,
): ResponseErrorType {
  if (error == null) {
    return { detail: errorDetail };
  }
  if (error.data == null) {
    return {
      data: {
        nonFieldError: error.nonFieldError,
      },
      detail: errorDetail,
    };
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
): ResponseErrorType {
  let detailMessage = READABLE_ERROR_CODE[code];
  if (detailMessage == null) {
    detailMessage = "Unknown error.";
  }
  return generateError(detailMessage, error);
}
