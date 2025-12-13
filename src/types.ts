import type { Database } from "@/database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];
export type ProfileEntity = Database["public"]["Tables"]["profile"]["Row"];
export type CommentEntity = Database["public"]["Tables"]["comment"]["Row"];

export type TPost = PostEntity & { author: ProfileEntity; isLiked: boolean };
export type Comment = CommentEntity & { author: ProfileEntity };

export type TUseMutationCallback = {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
};
