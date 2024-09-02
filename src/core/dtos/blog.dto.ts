import Joi from "joi";

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

export const blogQueryDtoSchema = paginationDtoSchema.append<BlogQueryDto>({
  search: Joi.string().optional().allow(""),
  userId: Joi.string().optional().allow(""),
});

// Custom schema validation demo.
// export const blogQueryDtoSchema = paginationDtoSchema.append<BlogQueryDto>({
//   search: Joi.string().optional().allow(""),
//   userId: Joi.string()
//     .optional()
//     .allow("")
//     .custom((value, helper) => {
//       if (!value) {
//         return true;
//       }
//       if (isValidObjectId(value)) {
//         return true;
//       }
//       return helper.message({ custom: "Invalid ID." }, { message: "Invalid ID." });
//     }),
// });
