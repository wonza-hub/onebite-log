import { togglePostLike } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { TPost, TUseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useTogglePostLike(callbacks?: TUseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries({
        queryKey: QUERY_KEYS.post.byId(postId),
      });

      const prevPost = queryClient.getQueryData<TPost>(
        QUERY_KEYS.post.byId(postId),
      );

      queryClient.setQueryData<TPost>(QUERY_KEYS.post.byId(postId), (post) => {
        if (!post)
          throw new Error(
            `${postId}에 해당하는 포스트를 캐시 데이터에서 찾을 수 없습니다.`,
          );

        return {
          ...post,
          isLiked: !post.isLiked,
          like_count: post.isLiked ? post.like_count - 1 : post.like_count + 1,
        };
      });

      return { prevPost };
    },
    mutationFn: togglePostLike,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error, _, context) => {
      if (context?.prevPost) {
        queryClient.setQueryData<TPost>(
          QUERY_KEYS.post.byId(context.prevPost.id),
          context.prevPost,
        );
      }
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
