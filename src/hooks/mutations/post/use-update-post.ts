import { updatePost } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { TPost, TUseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * HOOK: 포스트 수정
 */
export function useUpdatePost(callbacks?: TUseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePost,
    onSuccess: (updatedPost) => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      queryClient.setQueryData<TPost>(
        QUERY_KEYS.post.byId(updatedPost.id),
        (prevPost) => {
          if (!prevPost)
            throw new Error(
              `${updatedPost.id}에 해당하는 포스트를 캐시 데이터에서 찾을 수 없습니다.`,
            );

          // 스프레드 연산자는 뒷 내용이 앞 내용을 덮어씀에 유의
          return {
            ...prevPost,
            ...updatedPost,
          };
        },
      );
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
