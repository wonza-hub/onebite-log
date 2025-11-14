import type { Session } from "@supabase/supabase-js";
import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type TSessionState = {
  isLoaded: boolean;
  session: Session | null;
};
const initialState = {
  isLoaded: false,
  session: null,
} as TSessionState;

const useSessionStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        setSession: (session: Session | null) => {
          set({ session, isLoaded: true });
        },
      },
    })),
    {
      name: "sessionStore",
    },
  ),
);

export const useSession = () => {
  return useSessionStore((store) => store.session);
};

export const useIsSessionLoaded = () => {
  return useSessionStore((store) => store.isLoaded);
};

export const useSetSession = () => {
  return useSessionStore((store) => store.actions.setSession);
};
