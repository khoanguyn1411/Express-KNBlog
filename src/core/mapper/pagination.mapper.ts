import { PaginationDto } from "../dtos/pagination.dto";
import { PaginationQuery } from "../models/pagination";
import { IMapperFromDto } from "./mapper";

export class PaginationMapper implements IMapperFromDto<PaginationDto, PaginationQuery> {
  fromDto(data: PaginationDto): PaginationQuery {
    return {
      offset: data.offset ?? null,
      limit: data.limit ?? null,
    };
  }
}
