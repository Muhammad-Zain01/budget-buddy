import useModalStore from "@/store/modal";

const useAlertDialoag = () => {
  const { alertModal, setAlertModal } = useModalStore((state) => state);
  const open = (title: string, description: string, action: () => void) => {
    setAlertModal({ show: true, title, description, action });
  };
  const close = () => {
    setAlertModal({
      show: false,
      title: "",
      description: "",
      action: () => {},
    });
  };

  return { open, close, ...alertModal };
};

export default useAlertDialoag;
