import Joi from "joi";

import { PaginationDto } from "./pagination.dto";

export interface UserQueryDto extends PaginationDto {
  readonly search: string | undefined;
}

export type UserUpdateDto = {
  firstName: string;
  lastName: string;
  pictureUrl: string;
};

export const userUpdateDtoSchema = Joi.object<UserUpdateDto>({
  pictureUrl: Joi.string().allow(null),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
});
