import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

/**
 * STORE: 포스트 작성 모달 전역 상태
 */
type CreateMode = {
  isOpen: true;
  type: "CREATE";
};
type EditMode = {
  isOpen: true;
  type: "EDIT";
  postId: number;
  content: string;
  imageUrls: string[] | null;
};

type OpenState = CreateMode | EditMode;
type CloseState = {
  isOpen: false;
};

type State = CloseState | OpenState;
const initialState = {
  isOpen: false,
} as State;
const usePostEditorModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        // 포스트 생성 시
        openCreate: () => {
          set({ isOpen: true, type: "CREATE" });
        },
        // 포스트 수정 시
        openEdit: (param: Omit<EditMode, "isOpen" | "type">) => {
          set({ isOpen: true, type: "EDIT", ...param });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "postEditorModalStore" },
  ),
);

export const useOpenCreatePostModal = () => {
  const openCreate = usePostEditorModalStore(
    (store) => store.actions.openCreate,
  );
  return openCreate;
};

export const useOpenEditPostModal = () => {
  const openEdit = usePostEditorModalStore((store) => store.actions.openEdit);
  return openEdit;
};

export const usePostEditorModal = () => {
  const store = usePostEditorModalStore();
  // return store
  // cf) 유니온 타입 TState에 대한 타입스크립트의 잘못된 추론을 방지
  return store as typeof store & State;
};
