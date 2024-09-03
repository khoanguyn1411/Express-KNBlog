import { Aggregate, Query } from "mongoose";

import { Pagination, PaginationBase } from "@/core/models/pagination";
import { RecordObject } from "@/routes/build-route-paths";

/**
 * Create pagination for mongoose models.
 * @param schemaCallback Need to be a callback to prevent mongoose model execute queries multiple times.
 * @param req Request.
 */
export async function createPagination<
  T extends RecordObject,
  E extends RecordObject = RecordObject,
  K extends PaginationBase = PaginationBase,
>(schemaCallback: () => Query<T[], E> | Aggregate<T[]>, pagination: K): Promise<Pagination<T>> {
  const { limit, offset } = pagination;
  let count = 0;
  if (schemaCallback() instanceof Aggregate) {
    const counterResult = await (schemaCallback() as Aggregate<T[]>).count("count");
    console.log(counterResult);
    count = counterResult[0]?.count ?? 0;
  } else {
    count = await (schemaCallback() as Query<T[], E>).count();
  }
  const results = (await schemaCallback().limit(limit).skip(offset)) as T[];

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
