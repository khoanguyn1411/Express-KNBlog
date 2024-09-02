import { FilterQuery } from "mongoose";

import { MongooseBase } from "@/core/db-models/mongoose";

function removeEmptyFields<T extends Record<string, unknown>>(obj: T) {
  Object.keys(obj).forEach((key) => {
    if (obj[key] == null || obj[key] === "") {
      delete obj[key];
    }
  });
  return obj;
}

/**
 * Create filters.
 * @param filters Filters.
 */
export function createFilters<T extends MongooseBase>(filters: FilterQuery<T>): FilterQuery<T> {
  return removeEmptyFields(filters);
}
