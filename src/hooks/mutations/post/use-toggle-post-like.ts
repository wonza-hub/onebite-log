import { togglePostLike } from "@/api/post";
import type { TUseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export default function useTogglePostLike(callbacks?: TUseMutationCallback) {
  return useMutation({
    mutationFn: togglePostLike,
    onSuccess: () => {
      if (callbacks?.onSuccess) callbacks.onSuccess();
    },
    onError: (error) => {
      if (callbacks?.onError) callbacks.onError(error);
    },
  });
}
