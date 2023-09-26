import WaveSurfer from "wavesurfer.js";
import { create } from "zustand";

interface PlayerStore {
  sound: WaveSurfer | null;
  showPlayer: boolean;
  urls: string[];
  activeUrl: string | null;
  setSound: (newSound: WaveSurfer) => void;
  setShowPlayer: (value: boolean) => void;
  setUrls: (urls: string[]) => void;
  setActiveUrl: (url: string | null) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  sound: null,
  showPlayer: false,
  activeUrl: null,
  urls: [],
  setSound: (wave: WaveSurfer) => set({ sound: wave }),
  setShowPlayer: (value: boolean) => set({ showPlayer: value }),
  setUrls: (newUrls: string[]) => set({ urls: newUrls }),
  setActiveUrl: (url: string | null) => set({ activeUrl: url }),
}));

export default usePlayer;
