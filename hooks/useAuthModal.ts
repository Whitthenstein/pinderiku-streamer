import { create } from "zustand";

type View = "sign_up" | "sign_in";

interface AuthModalStore {
  isOpen: boolean;
  view: View;
  onOpen: (view: View) => void;
  onClose: () => void;
}

const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: "sign_in",
  onOpen: (view = "sign_in") => set({ isOpen: true, view }),
  onClose: () => set({ isOpen: false })
}));

export default useAuthModal;
