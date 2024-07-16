import { set } from "date-fns";
import { create } from "zustand";

type Modal = { show: boolean };
type ModalStore = {
  addCategoryModal: Modal;
  setAddCategoryModal: (value: boolean) => void;
};

const useModalStore = create<ModalStore>((set) => ({
  addCategoryModal: { show: false },
  setAddCategoryModal: (value: boolean) =>
    set({ addCategoryModal: { show: value } }),
}));

export default useModalStore;
