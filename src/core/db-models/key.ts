export const MODEL_NAMES = {
  Blog: "blog",
  User: "user",
  OutdateToken: "outdateToken",
  BlogEmoticon: "blogEmoticon",
} as const;

export function getDbKey(name: (typeof MODEL_NAMES)[keyof typeof MODEL_NAMES]) {
  return `${name}s`;
}
