import WaveSurfer from "wavesurfer.js";
import { create } from "zustand";

interface PlayerStore {
  sound: WaveSurfer | null;
  showPlayer: boolean;
  urls: string[];
  activeUrl: string | null;
  currentIndex: number;
  isLoading: boolean;
  setSound: (newSound: WaveSurfer) => void;
  setShowPlayer: (value: boolean) => void;
  setUrls: (urls: string[]) => void;
  setActiveUrl: (url: string | null) => void;
  setIsLoading: (value: boolean) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  sound: null,
  showPlayer: false,
  activeUrl: null,
  urls: [],
  currentIndex: 0,
  isLoading: true,
  setSound: (wave: WaveSurfer) => set({ sound: wave }),
  setShowPlayer: (value: boolean) => set({ showPlayer: value }),
  setUrls: (newUrls: string[]) => set({ urls: newUrls }),
  setActiveUrl: (url: string | null) => set({ activeUrl: url }),
  setCurrentIndex: (index: number) => set({ currentIndex: index }),
  setIsLoading: (value: boolean) => set({ isLoading: value }),
}));

export default usePlayer;
