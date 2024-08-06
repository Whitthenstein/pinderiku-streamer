import WaveSurfer from "wavesurfer.js";
import { create } from "zustand";

interface PlayerStore {
  sound: WaveSurfer | null;
  media: HTMLAudioElement | null;
  showPlayer: boolean;
  urls: string[];
  activeUrl: string | undefined;
  currentIndex: number;
  isLoading: boolean;
  setSound: (newSound: WaveSurfer) => void;
  setMedia: (newMedia: HTMLAudioElement) => void;
  setShowPlayer: (value: boolean) => void;
  setUrls: (urls: string[]) => void;
  setActiveUrl: (url: string | undefined) => void;
  setIsLoading: (value: boolean) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  sound: null,
  media: null,
  showPlayer: false,
  activeUrl: undefined,
  urls: [],
  currentIndex: 0,
  isLoading: true,
  setSound: (wave: WaveSurfer) => set({ sound: wave }),
  setMedia: (newMedia: HTMLAudioElement) => set({ media: newMedia }),
  setShowPlayer: (value: boolean) => set({ showPlayer: value }),
  setUrls: (newUrls: string[]) => set({ urls: newUrls }),
  setActiveUrl: (url: string | undefined) => set({ activeUrl: url }),
  setCurrentIndex: (index: number) => set({ currentIndex: index }),
  setIsLoading: (value: boolean) => set({ isLoading: value }),
}));

export default usePlayer;
