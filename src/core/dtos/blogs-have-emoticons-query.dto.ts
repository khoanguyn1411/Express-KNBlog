import Joi from "joi";

import { CustomValidator } from "@/utils/funcs/custom-validator";

export interface BlogsHaveEmoticonsQueryDto {
  readonly blogIds: readonly string[];
}

export const blogsHaveEmoticonsQueryDtoSchema = Joi.object<BlogsHaveEmoticonsQueryDto>({
  blogIds: Joi.array().items(Joi.string().custom(CustomValidator.validObjectId)).required(),
});
