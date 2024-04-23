import { RecordObject } from "@/routes/build-route-paths";

export interface PaginationBase {
  readonly offset: number;
  readonly limit: number;
}

export interface Pagination<T extends RecordObject> extends NonNullable<PaginationBase> {
  readonly count: number;
  readonly results: readonly T[];
}
