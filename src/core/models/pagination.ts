import { RecordObject } from "@/routes/build-route-paths";

export interface PaginationQuery {
  readonly offset: number | null;
  readonly limit: number | null;
}

export interface Pagination<T extends RecordObject> extends NonNullable<PaginationQuery> {
  readonly count: number;
  readonly results: readonly T[];
}
