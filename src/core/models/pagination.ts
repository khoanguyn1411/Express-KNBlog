export interface Pagination<T extends Record<string, any>> {
  readonly offset: number;
  readonly limit: number;
  readonly count: number;
  readonly results: readonly T[];
}
