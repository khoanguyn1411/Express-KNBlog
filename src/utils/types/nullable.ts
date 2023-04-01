export type Nullable<T extends Record<string, any>> = {
  [K in keyof T]: T[K] | null | undefined;
};
