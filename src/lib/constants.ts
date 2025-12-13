export const QUERY_KEYS = {
  // 프로필
  profile: {
    all: ["profile"],
    list: ["profile", "list"],
    byId: (userId: string) => ["profile", "byId", userId],
  },
  // 포스트
  post: {
    all: ["posts"],
    list: ["post", "list"],
    byId: (postId: number) => ["post", "byId", postId],
  },
  // 댓글
  comment: {
    all: ["comments"],
    post: (postId: number) => ["comment", "post", postId],
  },
};

export const BUCKET_NAME = "uploads";
