import type { Database } from "@/database.types";

export type PostEntity = Database["public"]["Tables"]["post"]["Row"];

export type TUseMutationCallback = {
  onMutate?: () => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
};
