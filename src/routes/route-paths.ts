import { BlogParamDto } from "@/core/dtos/blog.dto";

import { buildRoutePaths } from "./build-route-paths";

export const BLOG_ID_PARAM_NAME: keyof BlogParamDto = "blogId";

const baseRoutePaths = buildRoutePaths({
  root: { path: "" },
} as const);

const authRoutePaths = buildRoutePaths({
  auth: {
    path: "auth",
    children: {
      login: { path: "login" },
      register: { path: "register" },
      googleLogin: { path: "google-login" },
      logout: { path: "logout" },
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
  blogs: {
    path: "blogs",
  },
  blogDetail: { path: `blogs/:${BLOG_ID_PARAM_NAME}` },
} as const);

const uploadRoutePath = buildRoutePaths({
  upload: {
    path: "upload",
    children: {
      image: {
        path: "image",
      },
    },
  },
} as const);

/** Route paths can be used throughout the project. */
export const routePaths = {
  ...baseRoutePaths,
  ...authRoutePaths,
  ...userRoutePaths,
  ...blogRoutePaths,
  ...uploadRoutePath,
};
