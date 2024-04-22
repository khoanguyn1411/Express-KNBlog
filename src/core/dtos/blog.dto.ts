import Joi from "joi";

import { MongooseId } from "../models/mongoose";

export interface BlogDto {
  readonly writtenBy: MongooseId;
  readonly title: string;
  readonly description: string;
  readonly summary: string;
}

export type BlogCreationDto = Pick<BlogDto, "title" | "description" | "summary">;

export const blogCreationDtoSchema = Joi.object<BlogDto>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  summary: Joi.string().optional(),
});
