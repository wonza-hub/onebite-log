import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

type TOpenState = {
  isOpen: true;
  title: string;
  description: string;
  onPositive?: () => void;
  onNegative?: () => void;
};
type TCloseState = {
  isOpen: false;
};
type TAlertState = TCloseState | TOpenState;

/**
 * STORE: 얼럿 모달
 */
const initialState = {
  isOpen: false,
} as TAlertState;
const useAlertModalStore = create(
  devtools(
    combine(initialState, (set) => ({
      actions: {
        open: (params: Omit<TOpenState, "isOpen">) => {
          set({ ...params, isOpen: true });
        },
        close: () => {
          set({ isOpen: false });
        },
      },
    })),
    { name: "AlertModalStore" },
  ),
);

export const useOpenAlertModal = () => {
  return useAlertModalStore((store) => store.actions.open);
};

export const useAlertModal = () => {
  const store = useAlertModalStore();
  // cf) 유니온 타입 TAlertState에 대한 타입스크립트의 잘못된 추론을 방지
  return store as typeof store & TAlertState;
};
