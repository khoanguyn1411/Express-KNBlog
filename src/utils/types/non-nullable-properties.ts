export type NonNullableProperties<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
  K extends keyof T,
> = Readonly<
  {
    [k in K]-?: NonNullable<T[k]>;
  } & {
    [k in Exclude<keyof T, K>]: T[k];
  }
>;
