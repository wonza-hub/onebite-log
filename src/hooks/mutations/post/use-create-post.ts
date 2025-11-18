import { createPostWithImages } from "@/api/post";
import type { TUseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useCreatePost(callbacks?: TUseMutationCallback) {
  return useMutation({
    mutationFn: createPostWithImages,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
