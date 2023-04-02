/**
 * Mapper of DTO to domain model.
 */
export interface IMapperFromDto<TDto, TDomain> {
  /**
   * Maps from DTO to Domain model.
   */
  fromDto(data: TDto): TDomain;
}
