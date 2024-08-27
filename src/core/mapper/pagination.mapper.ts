import { PaginationDto } from "../dtos/pagination.dto";
import { PaginationBase } from "../models/pagination";
import { IMapperFromDto } from "./mapper";

const DEFAULT_PAGINATION_OPTION: PaginationBase = {
  offset: 0,
  limit: 10,
};

class PaginationMapper implements IMapperFromDto<PaginationDto, PaginationBase> {
  public fromDto(data: PaginationDto): PaginationBase {
    const offset = Number(data.offset);
    const limit = Number(data.limit);
    return {
      offset: Number.isNaN(offset) ? DEFAULT_PAGINATION_OPTION.offset : offset,
      limit: Number.isNaN(limit) ? DEFAULT_PAGINATION_OPTION.limit : limit,
    };
  }
}

export const paginationMapper = new PaginationMapper();
