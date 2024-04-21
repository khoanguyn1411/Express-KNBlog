import { Query } from "mongoose";

import { PaginationDto, paginationDtoSchema } from "@/core/dtos/pagination.dto";
import { Pagination } from "@/core/models/pagination";
import { RecordObject } from "@/routes/build-route-paths";

import { Nullable } from "../types/nullable";
import { AppRequest } from "../types/request";
import { generateValidationError } from "./validate-request";

const DEFAULT_PAGINATION_OPTION = {
  offset: 0,
  limit: 10,
};

export async function createPagination<T extends RecordObject, E, K extends PaginationDto>(
  schema: Query<T[], E>,
  req: AppRequest<unknown, K>,
): Promise<Pagination<T>> {
  const paginationConfigDto = req.query;
  const offset = Number(paginationConfigDto.offset) ?? DEFAULT_PAGINATION_OPTION.offset;
  const limit = Number(paginationConfigDto.limit) ?? DEFAULT_PAGINATION_OPTION.limit;
  const results = await schema.limit(limit).skip(offset);
  return {
    offset,
    limit,
    count: results.length,
    results,
  };
}

export function catchPaginationQueryError<
  T extends Partial<PaginationDto> = Partial<PaginationDto>,
>(req: AppRequest<unknown, T>) {
  const paginationDto: Nullable<PaginationDto> = {
    offset: req.query.offset ? Number(req.query.offset) : null,
    limit: req.query.limit ? Number(req.query.limit) : null,
  };
  const { error } = paginationDtoSchema.validate(paginationDto);
  return generateValidationError(error);
}
