import { Song } from "@/types";
import WaveSurfer from "wavesurfer.js";
import { create } from "zustand";

export const enum REPEAT_VALUES {
  NO_REPEAT,
  REPEAT_ALL,
  REPEAT_CURRENT,
  __LENGTH
}

interface PlayerStore {
  sound: WaveSurfer | null;
  media: HTMLAudioElement | null;
  urls: string[];
  activeSong: Song | undefined;
  activeUrl: string | undefined;
  activePeakData: number[][] | undefined;
  currentIndex: number;
  isLoading: boolean;
  repeat: number;
  setSound: (newSound: WaveSurfer) => void;
  setMedia: (newMedia: HTMLAudioElement) => void;
  setUrls: (urls: string[]) => void;
  setActiveSong: (song: Song) => void;
  setActiveUrl: (url: string | undefined) => void;
  setActivePeakData: (peakData: number[][]) => void;
  setIsLoading: (value: boolean) => void;
  toggleRepeat: () => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  sound: null,
  media: null,
  activeSong: undefined,
  activeUrl: undefined,
  activePeakData: undefined,
  urls: [],
  currentIndex: 0,
  isLoading: true,
  repeat: REPEAT_VALUES.NO_REPEAT,
  setSound: (wave: WaveSurfer) => set({ sound: wave }),
  setMedia: (newMedia: HTMLAudioElement) => set({ media: newMedia }),
  setUrls: (newUrls: string[]) => set({ urls: newUrls }),
  setActiveUrl: (url: string | undefined) => set({ activeUrl: url }),
  setActiveSong(song: Song) {
    this.setActivePeakData(song.peak_data);
    set({ activeSong: song });
  },
  setActivePeakData: (peakData: number[][]) =>
    set({ activePeakData: peakData }),
  setCurrentIndex: (index: number) => set({ currentIndex: index }),
  setIsLoading: (value: boolean) => set({ isLoading: value }),
  toggleRepeat() {
    if (this.repeat === REPEAT_VALUES.__LENGTH - 1) {
      set({ repeat: 0 });
    } else {
      set({ repeat: this.repeat + 1 });
    }
  }
}));

export default usePlayer;
