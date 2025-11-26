import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { TUseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeletePost(callbacks?: TUseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 포스트 삭제 후 포스트에 연결된 스토리지 내 이미지들도 삭제
      if (deletedPost.image_urls && deletedPost.image_urls.length > 0) {
        await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
      }

      queryClient.resetQueries({ queryKey: QUERY_KEYS.post.list });
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
