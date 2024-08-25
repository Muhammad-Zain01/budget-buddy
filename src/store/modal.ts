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
  addAccountModal: Modal;
  addTransactionModal: Modal;
  alertModal: AlertModal;
  setAddCategoryModal: (value: boolean, data?: any) => void;
  setAccountModal: (value: boolean, data?: any) => void;
  setAlertModal: (value: AlertModal) => void;
  setAddTransactionModal: (value: boolean, data?: any) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  addCategoryModal: { show: false, data: null },
  addAccountModal: { show: false, data: null },
  addTransactionModal: { show: false, data: null },
  alertModal: { show: false, title: "", description: "", action: () => {} },
  setAddCategoryModal: (value: boolean, data: any = null) =>
    set({ addCategoryModal: { show: value, data: data } }),
  setAccountModal: (value: boolean, data: any = null) =>
    set({ addAccountModal: { show: value, data: data } }),
  setAlertModal: (value: AlertModal) => set({ alertModal: value }),
  setAddTransactionModal: (value: boolean, data: any = null) =>
    set({ addTransactionModal: { show: value, data: data } }),
}));

export default useModalStore;
