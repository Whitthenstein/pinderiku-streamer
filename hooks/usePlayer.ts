import { SoundPlayer } from "@/sound-player";
import { create } from "zustand";

interface PlayerStore {
  sound: SoundPlayer | null;
  showPlayer: boolean;
  setSound: (newSound: HTMLAudioElement) => void;
  setShowPlayer: (value: boolean) => void;
}

const usePlayer = create<PlayerStore>((set) => ({
  sound: null,
  showPlayer: false,
  setSound: (newSound: HTMLAudioElement) =>
    set({ sound: new SoundPlayer(newSound) }),
  setShowPlayer: (value: boolean) => set({ showPlayer: value }),
}));

export default usePlayer;
