import { deleteImagesInPath } from "@/api/image";
import { deletePost } from "@/api/post";
import type { TUseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useDeletePost(callbacks?: TUseMutationCallback) {
  return useMutation({
    mutationFn: deletePost,
    onSuccess: async (deletedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 포스트 삭제 후 포스트에 연결된 스토리지 내 이미지들도 삭제
      if (!deletedPost.image_urls || deletedPost.image_urls.length === 0)
        return;

      await deleteImagesInPath(`${deletedPost.author_id}/${deletedPost.id}`);
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
