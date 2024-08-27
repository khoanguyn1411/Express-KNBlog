import { Query } from "mongoose";

import { PaginationDto } from "@/core/dtos/pagination.dto";
import { paginationMapper } from "@/core/mapper/pagination.mapper";
import { Pagination } from "@/core/models/pagination";
import { RecordObject } from "@/routes/build-route-paths";

import { AppRequest } from "../types/request";

/**
 * Map pagination from DTO to models an create pagination for mongoose models.
 * @param schemaCallback Need to be a callback to prevent mongoose model execute queries multiple times.
 * @param req Request.
 */
export async function mapAndCreatePaginationFor<T extends RecordObject, E, K extends PaginationDto>(
  schemaCallback: () => Query<T[], E>,
  req: AppRequest<unknown, K>,
): Promise<Pagination<T>> {
  const paginationConfigDto = req.query;
  const { limit, offset } = paginationMapper.fromDto(paginationConfigDto);
  const count = await schemaCallback().count();
  const results = await schemaCallback().limit(limit).skip(offset);

  // Check if there's a next page
  const hasNextPage = offset + results.length < count;

  // Check if there's a previous page
  const hasPrevPage = offset > 0;

  return {
    offset,
    limit,
    count,
    hasNext: hasNextPage,
    hasPrev: hasPrevPage,
    results,
  };
}
