import { RecordObject } from "@/routes/build-route-paths";

export type Nullable<T extends RecordObject> = {
  [K in keyof T]: T[K] | null | undefined;
};
