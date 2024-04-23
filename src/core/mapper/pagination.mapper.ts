import { PaginationDto } from "../dtos/pagination.dto";
import { PaginationBase } from "../models/pagination";
import { IMapperFromDto } from "./mapper";

const DEFAULT_PAGINATION_OPTION: PaginationBase = {
  offset: 0,
  limit: 10,
};

class PaginationMapper implements IMapperFromDto<PaginationDto, PaginationBase> {
  fromDto(data: PaginationDto): PaginationBase {
    return {
      offset: Number(data.offset) ?? DEFAULT_PAGINATION_OPTION.offset,
      limit: Number(data.limit) ?? DEFAULT_PAGINATION_OPTION.limit,
    };
  }
}

export const paginationMapper = new PaginationMapper();
