import { BlogCreationDto } from "../dtos/blog.dto";
import { IBlogCreation } from "../models/blog";

class BlogMapper {
  fromCreationDto(data: BlogCreationDto): IBlogCreation {
    return {
      title: data.title,
      description: data.description,
      summary: data.summary,
    };
  }
}

export const blogMapper = new BlogMapper();
