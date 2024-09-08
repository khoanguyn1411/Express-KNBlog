import { RootQuerySelector } from "mongoose";

class SearchService {
  /**
 * Built config for full text search feature of mongoose.
 * @param searchQuery Search query.
 * @example
 * const schema = new Schema<MBlog>(
  {
    writtenBy: {
      type: ObjectId,
      ref: UserDB.ModelName,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
).index({ title: "text" });

 const pagination = await createPagination(
      () =>
        Blog.Model.find({ ...builtFullTextSearchQuery(queryParamFromDto.search) }).populate(
          Blog.ShortPopulation,
        ),
      req,
    );
 */
  public builtFullTextSearchQuery<T>(searchQuery: string | null): RootQuerySelector<T> {
    if (searchQuery === "" || searchQuery == null) {
      return {};
    }
    return { $text: { $search: searchQuery, $caseSensitive: false } };
  }

  /**
   * Create search ability.
   * @param searchQuery Search text query.
   */
  public createSearchFor<T>(searchQuery: string | null): RootQuerySelector<T> {
    return { $regex: `^${searchQuery ?? ""}`, $options: "i" };
  }
}

export const searchService = new SearchService();
