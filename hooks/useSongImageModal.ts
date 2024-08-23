import { create } from "zustand";

interface SongImageModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSongImageModal = create<SongImageModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));

export default useSongImageModal;
