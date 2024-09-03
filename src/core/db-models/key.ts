export const MODEL_NAMES = {
  Blog: "blog",
  User: "user",
  OutdateToken: "outdate-token",
  BlogEmoticon: "blog-emoticon",
} as const;

export function getDbKey(name: (typeof MODEL_NAMES)[keyof typeof MODEL_NAMES]) {
  return `${name}s`;
}
