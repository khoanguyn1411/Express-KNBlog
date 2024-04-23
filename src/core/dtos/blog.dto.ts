import Joi from "joi";

import { PaginationDto, paginationDtoSchema } from "./pagination.dto";

export interface BlogCreationDto {
  readonly title: string;
  readonly description: string;
  readonly summary: string;
}

export interface BlogParamDto {
  readonly blogId: string;
}

export interface BlogQueryDto extends PaginationDto {
  readonly search: string | undefined;
}

export const blogCreationDtoSchema = Joi.object<BlogCreationDto>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  summary: Joi.string().optional(),
});

export const blogQueryDtoSchema = paginationDtoSchema.append<BlogQueryDto>({
  search: Joi.string().optional().allow(""),
});
