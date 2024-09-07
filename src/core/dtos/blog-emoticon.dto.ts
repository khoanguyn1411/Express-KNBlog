import Joi from "joi";

import { CustomValidator } from "@/utils/funcs/custom-validator";

export interface BlogEmoticonCreationDto {
  readonly blogId: string;
}

export const blogEmoticonCreationDtoSchema = Joi.object<BlogEmoticonCreationDto>({
  blogId: Joi.string().required().custom(CustomValidator.validObjectId),
});
