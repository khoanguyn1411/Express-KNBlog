import Joi from "joi";

export interface PaginationDto {
  readonly offset: number;
  readonly limit: number;
}

export const paginationDtoSchema = Joi.object<PaginationDto>({
  offset: Joi.number().allow(null),
  limit: Joi.number().allow(null),
});
