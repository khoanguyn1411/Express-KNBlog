import { Query } from "mongoose";

import { PaginationDto } from "@/core/dtos/pagination.dto";
import { Pagination } from "@/core/models/pagination";

export async function createPagination<T extends Record<string, any>, E>(
  schema: Query<T[], E>,
  paginationConfig: PaginationDto,
): Promise<Pagination<T>> {
  const page = await schema.limit(paginationConfig.limit).skip(paginationConfig.offset);
  return {
    offset: paginationConfig.offset,
    limit: paginationConfig.limit,
    count: page.length,
    results: page,
  };
}
