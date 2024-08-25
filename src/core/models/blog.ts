import { MBlog } from "../db-models/blog.db";
import { PaginationBase } from "./pagination";

export type BlogCreation = Pick<MBlog, "title" | "summary" | "content" | "bannerUrl">;

export interface BlogQuery extends PaginationBase {
  readonly search: string;
}
