import Joi from "joi";

export interface BlogEmoticonCreationDto {
  readonly blogId: string;
}

export const blogEmoticonCreationDtoSchema = Joi.object<BlogEmoticonCreationDto>({
  blogId: Joi.string().required(),
});
