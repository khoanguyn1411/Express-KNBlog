import { BlogCreationDto, BlogQueryDto } from "../dtos/blog.dto";
import { BlogQuery, IBlogCreation } from "../models/blog";
import { paginationMapper } from "./pagination.mapper";

class BlogMapper {
  fromCreationDto(data: BlogCreationDto): IBlogCreation {
    return {
      title: data.title,
      description: data.description,
      summary: data.summary,
    };
  }

  fromQueryDto(data: BlogQueryDto): BlogQuery {
    const pagination = paginationMapper.fromDto(data);
    return {
      ...pagination,
      search: data.search ?? "",
    };
  }
}

export const blogMapper = new BlogMapper();
