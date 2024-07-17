import { create } from "zustand";

type Modal = { show: boolean; data: any };
type AlertModal = {
  show: boolean;
  title: string;
  description: string;
  action: () => void;
};
type ModalStore = {
  addCategoryModal: Modal;
  alertModal: AlertModal;
  setAddCategoryModal: (value: boolean, data?: any) => void;
  setAlertModal: (value: AlertModal) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  addCategoryModal: { show: false, data: null },
  alertModal: { show: false, title: "", description: "", action: () => {} },
  setAddCategoryModal: (value: boolean, data: any = null) =>
    set({ addCategoryModal: { show: value, data: data } }),
  setAlertModal: (value: AlertModal) => set({ alertModal: value }),
}));

export default useModalStore;
