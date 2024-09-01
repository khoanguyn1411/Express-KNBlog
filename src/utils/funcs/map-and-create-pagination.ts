import { Query } from "mongoose";

import { Pagination, PaginationBase } from "@/core/models/pagination";
import { RecordObject } from "@/routes/build-route-paths";

/**
 * Map pagination from DTO to models an create pagination for mongoose models.
 * @param schemaCallback Need to be a callback to prevent mongoose model execute queries multiple times.
 * @param req Request.
 */
export async function mapAndCreatePaginationFor<
  T extends RecordObject,
  E,
  K extends PaginationBase,
>(schemaCallback: () => Query<T[], E>, pagination: K): Promise<Pagination<T>> {
  const { limit, offset } = pagination;
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
