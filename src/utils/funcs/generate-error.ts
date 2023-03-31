export type ResponseErrorType = {
  readonly data?: Record<string, any>;
  readonly detail: string;
};

type InputError<Error extends Readonly<Record<string, any>>> = {
  readonly data?: Error;
  readonly nonFieldError?: string;
};

const ERROR_CODE_MESSAGE: Record<number, string> = {
  400: "Unfortunately, there are some problems with the data you committed.",
  401: "Unauthorized.",
  402: "This process require payment.",
  403: "Forbidden.",
  404: "Not found.",
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
  code: number,
  error?: InputError<T>,
): ResponseErrorType {
  let detailMessage = ERROR_CODE_MESSAGE[code];
  if (detailMessage == null) {
    detailMessage = "Unknown error.";
  }
  return generateError(detailMessage, error);
}
