import { createPostWithImages } from "@/api/post";
import { QUERY_KEYS } from "@/lib/constants";
import type { TUseMutationCallback } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * HOOK: 포스트 생성
 */
export function useCreatePost(callbacks?: TUseMutationCallback) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();

      // 0. 캐시 데이터 초기화
      queryClient.resetQueries({ queryKey: QUERY_KEYS.post.list });
      // 1. 캐시 무효화 (모든 페이지를 불러오는 문제점)
      // 2. 캐시 데이터에 완성된 포스트만 추가
      // 3. 낙관적 업데이트 방식
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
