import { signInWithPassword } from "@/api/auth";
import type { TUseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithPassword(cbs?: TUseMutationCallback) {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      console.error(error);

      if (cbs?.onError) cbs.onError(error);
    },
  });
}
