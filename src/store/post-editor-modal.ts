import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

/**
 * STORE: 포스트 작성 모달 전역 상태
 */
const initialState = {
  isOpen: false,
};
const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: () => {
          set({ isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "postEditorModalStore" },
  ),
);

export const useOpenPostEditorModal = () => {
  return usePostEditorModalStore((store) => store.actions.open);
};

export const usePostEditorModal = () => {
  const {
    isOpen,
    actions: { open, close },
  } = usePostEditorModalStore();
  return { isOpen, open, close };
};
