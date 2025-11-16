import { signInWithOAuth } from "@/api/auth";
import type { TUseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithOAuth(cbs?: TUseMutationCallback) {
  return useMutation({
    mutationFn: signInWithOAuth,
    onError: (error) => {
      if (cbs?.onError) cbs.onError(error);
    },
  });
}
