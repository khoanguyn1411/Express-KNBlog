import Joi from "joi";

import { CustomValidator } from "@/utils/funcs/custom-validator";

import { PaginationDto, paginationDtoSchema } from "./pagination.dto";

export interface BlogCreationDto {
  readonly title: string;
  readonly content: string;
  readonly summary: string;
  readonly bannerUrl: string;
}

export interface BlogQueryDto extends PaginationDto {
  readonly search: string | undefined;
  readonly userId: string | undefined;
}

export const blogCreationDtoSchema = Joi.object<BlogCreationDto>({
  title: Joi.string().required(),
  content: Joi.string().required(),
  summary: Joi.string().optional(),
  bannerUrl: Joi.string().optional().allow(null),
});

// Custom schema validation demo.
export const blogQueryDtoSchema = paginationDtoSchema.append<BlogQueryDto>({
  search: Joi.string().optional().allow(""),
  userId: Joi.string().optional().allow("").custom(CustomValidator.validObjectId),
});
