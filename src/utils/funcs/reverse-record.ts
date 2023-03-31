/**
 * Reverse all `[key]: value` in record to `[value]: key`.
 * @param record Record to reverse.
 */
export function reverseRecord<T extends PropertyKey, U extends PropertyKey>(
  record: Record<T, U>,
): Readonly<Record<U, T>> {
  return Object.fromEntries(Object.entries(record).map(([key, value]) => [value, key])) as Readonly<
    Record<U, T>
  >;
}
