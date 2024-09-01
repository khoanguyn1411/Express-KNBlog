import { PaginationDto } from "./pagination.dto";

export interface UserQueryDto extends PaginationDto {
  readonly search: string | undefined;
}
