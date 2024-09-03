import { BlogEmoticonCreationDto } from "../dtos/blog-emoticon.dto";
import { BlogEmoticonCreation } from "../models/blog-emoticon";

class BlogEmoticonMapper {
  fromCreationDto(data: BlogEmoticonCreationDto): BlogEmoticonCreation {
    return {
      blogId: data.blogId,
    };
  }
}

export const blogEmoticonMapper = new BlogEmoticonMapper();
