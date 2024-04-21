import { RecordObject } from "@/routes/build-route-paths";

export type NonNullableProperties<T extends RecordObject, K extends keyof T> = Readonly<
  {
    [k in K]-?: NonNullable<T[k]>;
  } & {
    [k in Exclude<keyof T, K>]: T[k];
  }
>;
