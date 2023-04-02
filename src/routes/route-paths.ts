import { buildRoutePaths } from "./build-route-paths";

const baseRoutePaths = buildRoutePaths({
  root: { path: "" },
} as const);

const authRoutePaths = buildRoutePaths({
  auth: {
    path: "auth",
    children: {
      login: { path: "login" },
      token: {
        path: "token",
        children: {
          refresh: {
            path: "refresh",
          },
        },
      },
    },
  },
} as const);

const userRoutePaths = buildRoutePaths({
  user: {
    path: "user",
    children: {
      profile: { path: "profile" },
    },
  },
} as const);

const blogRoutePaths = buildRoutePaths({
  blog: {
    path: "blog",
    children: {
      detail: { path: "detail" },
    },
  },
  blogs: {
    path: "blogs",
  },
} as const);

/** Route paths can be used throughout the project. */
export const routePaths = {
  ...baseRoutePaths,
  ...authRoutePaths,
  ...userRoutePaths,
  ...blogRoutePaths,
};
