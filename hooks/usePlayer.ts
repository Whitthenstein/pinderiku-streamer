import { Song, SongsMap } from "@/types";
import WaveSurfer from "wavesurfer.js";
import { create } from "zustand";

import usePlaylist from "./usePlaylist";

interface PlayerStore {
  // attributes
  waveform: WaveSurfer | null;
  media: HTMLAudioElement | null;
  songs: SongsMap;
  isLoading: boolean;

  // setters
  setWaveform: (waveform: WaveSurfer) => void;
  setMedia: (newMedia: HTMLAudioElement) => void;
  setSongs: (songs: SongsMap) => void;
  setIsLoading: (value: boolean) => void;

  // getters
  getWaveform: () => WaveSurfer | null;
  getMedia: () => HTMLAudioElement | null;
  getSongs: () => SongsMap;
  getIsLoading: () => boolean;
  getSongsArray: (receivedSongsMap?: SongsMap) => Song[];
  getCurrentSong: () => Song | undefined;
  getSongById: (songId: string) => Song | undefined;
}

const usePlayer = create<PlayerStore>((set) => ({
  // initial state
  waveform: null,
  media: null,
  songs: new Map(),
  isLoading: true,

  // setters
  setWaveform: (waveform: WaveSurfer) => {
    set({ waveform });
  },
  setMedia: (newMedia: HTMLAudioElement) => {
    set({ media: newMedia });
  },
  setSongs: (songs: SongsMap) => {
    set({ songs });
  },
  setIsLoading: (value: boolean) => {
    set({ isLoading: value });
  },

  //getters
  getWaveform: () => {
    const state = usePlayer.getState() as PlayerStore;
    return state.waveform;
  },
  getMedia: () => {
    const state = usePlayer.getState() as PlayerStore;
    return state.media;
  },
  getSongs: () => {
    const state = usePlayer.getState() as PlayerStore;
    return state.songs;
  },
  getIsLoading: () => {
    const state = usePlayer.getState() as PlayerStore;
    return state.isLoading;
  },
  getSongsArray: (receivedSongsMap?: SongsMap) => {
    const state = usePlayer.getState() as PlayerStore;

    return Array.from(receivedSongsMap ? receivedSongsMap.values() : state.songs.values());
  },
  getCurrentSong: () => {
    const state = usePlayer.getState() as PlayerStore;
    const playlist = usePlaylist.getState();

    if (!playlist) {
      return undefined;
    }

    return state.songs.get(playlist.getCurrentSongId());
  },
  getSongById: (songId: string) => {
    const state = usePlayer.getState() as PlayerStore;
    return state.songs.get(songId);
  }
}));

export default usePlayer;
