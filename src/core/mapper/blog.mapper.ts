import { BlogDto } from "../dtos/blog.dto";
import { Blog, MBlog } from "../models/blog";
import { IMapperFromDto } from "./mapper";

class BlogMapper implements IMapperFromDto<BlogDto, MBlog> {
  fromDto(data: BlogDto): MBlog {
    return new Blog({
      writtenBy: data.writtenBy,
      title: data.title,
      description: data.description,
      summary: data.summary,
    });
  }
}

export const blogMapper = new BlogMapper();
