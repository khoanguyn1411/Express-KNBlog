import { RecordObject } from "@/routes/build-route-paths";

export interface Pagination<T extends RecordObject> {
  readonly offset: number;
  readonly limit: number;
  readonly count: number;
  readonly results: readonly T[];
}
