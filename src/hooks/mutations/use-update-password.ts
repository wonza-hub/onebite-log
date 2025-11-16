import { updatePassword } from "@/api/auth";
import type { TUseMutationCallback } from "@/types";
import { useMutation } from "@tanstack/react-query";

export function useUpdatePassword(cbs?: TUseMutationCallback) {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      if (cbs?.onSuccess) cbs.onSuccess();
    },
    onError: (error) => {
      if (cbs?.onError) cbs.onError(error);
    },
  });
}
