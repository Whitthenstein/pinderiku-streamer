import { SoundPlayer, SoundPlayerOptions } from "@/sound-player";
import { create } from "zustand";

interface PlayerStore {
  sound: SoundPlayer | null;
  showPlayer: boolean;
  urls: string[];
  activeUrl: string | null;
  setSound: (newSound: HTMLAudioElement, options: SoundPlayerOptions) => void;
  setShowPlayer: (value: boolean) => void;
  setUrls: (urls: string[]) => void;
  setActiveUrl: (url: string | null) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  sound: null,
  showPlayer: false,
  activeUrl: null,
  urls: [],
  setSound: (newSound: HTMLAudioElement, options: SoundPlayerOptions) =>
    set({ sound: new SoundPlayer(newSound, options) }),
  setShowPlayer: (value: boolean) => set({ showPlayer: value }),
  setUrls: (newUrls: string[]) => set({ urls: newUrls }),
  setActiveUrl: (url: string | null) => set({ activeUrl: url }),
}));

export default usePlayer;
