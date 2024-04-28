import { NextFunction, Response } from "express";

import { ErrorCode } from "@/configs/app/code.config";

import { AppRequest } from "../types/request";
import { assertNonNull } from "./assert-non-null";
import { generateErrorWithCode } from "./generate-error";

const mimeTypes = [
  "text/plain",
  "text/html",
  "text/css",
  "application/javascript",
  "application/json",
  "application/xml",
  "image/jpeg",
  "image/png",
  "image/gif",
  "audio/mpeg",
  "audio/ogg",
  "video/mp4",
  "video/mpeg",
  "application/pdf",
  "application/msword",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
] as const;

export type MimeType = (typeof mimeTypes)[number];

const mimeTypeToExtension: Record<MimeType, string> = {
  "text/plain": "txt",
  "text/html": "html",
  "text/css": "css",
  "application/javascript": "js",
  "application/json": "json",
  "application/xml": "xml",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/gif": "gif",
  "audio/mpeg": "mp3",
  "audio/ogg": "ogg",
  "video/mp4": "mp4",
  "video/mpeg": "mpeg",
  "application/pdf": "pdf",
  "application/msword": "doc",
  "application/vnd.ms-excel": "xls",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
};

export const IMAGE_MIME_TYPES: readonly MimeType[] = ["image/jpeg", "image/png"];

export function mapMimeTypeToExtension(mimeType: MimeType) {
  return mimeTypeToExtension[mimeType];
}

export function validateUploadFileRequestSchema(
  req: AppRequest,
  res: Response,
  next: NextFunction,
) {
  const file = req.file;
  if (file == null) {
    res
      .status(ErrorCode.BadData)
      .send(
        generateErrorWithCode(ErrorCode.BadData, { data: { file: "This field is required." } }),
      );
    return;
  }
  next();
}

export function validateFileType(mimeTypes: readonly MimeType[]) {
  return (req: AppRequest, res: Response, next: NextFunction) => {
    assertNonNull(req.file);
    const validFileTypes = mimeTypes.join(", ");
    if (!mimeTypes.includes(req.file.mimetype as MimeType)) {
      res.status(ErrorCode.BadData).send(
        generateErrorWithCode(ErrorCode.BadData, {
          data: { file: `Invalid file type. Allow: ${validFileTypes}` },
        }),
      );
      return;
    }
    next();
  };
}
