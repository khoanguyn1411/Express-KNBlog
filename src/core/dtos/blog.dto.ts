import { MongooseId } from "../models/mongoose";

export interface BlogDto {
  readonly writtenBy: MongooseId;
  readonly title: string;
  readonly description: string;
}

export type BlogCreationDto = Pick<BlogDto, "title" | "description">;
