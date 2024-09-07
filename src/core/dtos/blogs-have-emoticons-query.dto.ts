import Joi from "joi";

export interface BlogsHaveEmoticonsQueryDto {
  readonly blogIds: readonly string[];
}

export const blogsHaveEmoticonsQueryDtoSchema = Joi.object<BlogsHaveEmoticonsQueryDto>({
  blogIds: Joi.array().items(Joi.string()).required(),
});
