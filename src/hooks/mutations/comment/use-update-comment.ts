import type { TUseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { updateComment } from "@/api/comment";

export function useUpdateComment(callbacks?: TUseMutationCallback) {
  return useMutation({
    mutationFn: updateComment,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
