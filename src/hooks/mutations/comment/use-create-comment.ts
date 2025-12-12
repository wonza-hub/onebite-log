import type { TUseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createComment } from "@/api/comment";

export function useCreateComment(callbacks?: TUseMutationCallback) {
  return useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
