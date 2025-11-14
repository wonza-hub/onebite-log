import { signInWithPassword } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";

export function useSignInWithPassword() {
  return useMutation({
    mutationFn: signInWithPassword,
    onError: (error) => {
      console.error(error);
    },
  });
}
