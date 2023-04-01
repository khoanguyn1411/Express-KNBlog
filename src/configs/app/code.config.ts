export enum ErrorCode {
  BadData = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
}

export enum SuccessCode {
  OK = 200,
  Created = 201,
  Accepted = 202,
  NonAuthorized = 203,
  NoContent = 204,
}

export const READABLE_ERROR_CODE: Record<ErrorCode, string> = {
  [ErrorCode.BadData]: "Unfortunately, there are some problems with the data you committed.",
  [ErrorCode.Unauthorized]: "Unauthorized.",
  [ErrorCode.PaymentRequired]: "This process require payment.",
  [ErrorCode.Forbidden]: "Forbidden.",
  [ErrorCode.NotFound]: "Not found.",
};
