import { buildRoutePaths } from "./build-route-paths";

export const PARAM_NAME = {
  BLOG_ID_PARAM_NAME: "blogId",
  USER_ID_PARAM_NAME: "userId",
} as const;

export type ParamName = Record<(typeof PARAM_NAME)[keyof typeof PARAM_NAME], string>;

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
  users: {
    path: "users",
    children: {
      profile: { path: "profile" },
      detail: { path: `:${PARAM_NAME.USER_ID_PARAM_NAME}` },
    },
  },
} as const);

const blogRoutePaths = buildRoutePaths({
  blogs: {
    path: "blogs",
    children: {
      detail: {
        path: `:${PARAM_NAME.BLOG_ID_PARAM_NAME}`,
      },
    },
  },
} as const);

const blogEmoticonRoutePaths = buildRoutePaths({
  blogEmoticon: {
    path: "blog-emoticon",
    children: {
      detail: {
        path: `:${PARAM_NAME.BLOG_ID_PARAM_NAME}`,
      },
    },
  },
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
  ...blogEmoticonRoutePaths,
  ...uploadRoutePath,
};
