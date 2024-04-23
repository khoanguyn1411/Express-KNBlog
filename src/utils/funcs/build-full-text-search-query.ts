import { RootQuerySelector } from "mongoose";

/**
 * Built config for full text search feature of mongoose.
 * @param searchQuery Search query.
 * @example
 * const schema = new Schema<IBlog>(
  {
    writtenBy: {
      type: ObjectId,
      ref: User.ModelName,
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

 const pagination = await mapAndCreatePaginationFor(
      () =>
        Blog.Model.find({ ...builtFullTextSearchQuery(queryParamFromDto.search) }).populate(
          Blog.ShortPopulation,
        ),
      req,
    );
 */
export function builtFullTextSearchQuery<T>(searchQuery: string | null): RootQuerySelector<T> {
  if (searchQuery === "" || searchQuery == null) {
    return {};
  }
  return {
    $text: { $search: searchQuery, $caseSensitive: false },
  };
}
