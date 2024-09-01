import { ObjectId } from "mongodb";

import { BlogCreationDto, BlogQueryDto } from "../dtos/blog.dto";
import { BlogCreation, BlogQuery } from "../models/blog";
import { paginationMapper } from "./pagination.mapper";

class BlogMapper {
  fromCreationDto(data: BlogCreationDto): BlogCreation {
    return {
      title: data.title,
      content: data.content,
      summary: data.summary,
      bannerUrl: data.bannerUrl,
    };
  }

  fromQueryDto(data: BlogQueryDto): BlogQuery {
    const pagination = paginationMapper.fromDto(data);
    return {
      ...pagination,
      search: data.search ?? "",
      userId: new ObjectId(data.userId) ?? "",
    };
  }
}

export const blogMapper = new BlogMapper();
