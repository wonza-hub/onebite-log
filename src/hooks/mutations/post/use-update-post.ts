import { updatePost } from "@/api/post";
import type { TUseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdatePost(callbacks?: TUseMutationCallback) {
  return useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
