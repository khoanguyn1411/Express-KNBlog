import Joi from "joi";

export interface PaginationDto {
  readonly offset: number | undefined;
  readonly limit: number | undefined;
}

export const paginationDtoSchema = Joi.object<PaginationDto>({
  offset: Joi.number().optional(),
  limit: Joi.number().optional(),
});
