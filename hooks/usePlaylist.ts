import { create } from "zustand";

export const enum REPEAT_VALUES {
  NO_REPEAT,
  REPEAT_ALL,
  REPEAT_CURRENT,
  __LENGTH
}

export interface PlaylistStore {
  // attributes
  playlist: string[];
  currentSongIndex: number;
  repeatValue: REPEAT_VALUES;

  // setters
  setCurrentSongIndex: (value: number | string) => void;
  setPlaylist: (playlist: string[]) => void;
  toggleRepeat: () => void;

  // getters
  getCurrentSongIndex: () => number;
  getCurrentSongId: () => string;
  getPreviousSongPlaylistIndex: () => number;
  getPreviousSongId: () => string;
  getNextSongPlaylistIndex: () => number;
  getNextSongId: () => string;
  getRepeatValue: () => REPEAT_VALUES;
}

const usePlaylist = create<PlaylistStore>((set) => ({
  // initial state
  playlist: [],
  currentSongIndex: 0,
  repeatValue: REPEAT_VALUES.NO_REPEAT,

  // setters
  setCurrentSongIndex: (value: number | string) => {
    const state = usePlaylist.getState() as PlaylistStore;

    if (typeof value === "number") {
      set({ currentSongIndex: value });
    } else {
      const index = state.playlist.findIndex((id) => id === value);
      set({ currentSongIndex: index });
    }
  },
  setPlaylist: (playlist: string[]) => {
    set({ playlist });
  },
  toggleRepeat: () => {
    const state = usePlaylist.getState() as PlaylistStore;

    if (state.repeatValue === REPEAT_VALUES.__LENGTH - 1) {
      set({ repeatValue: 0 });
    } else {
      set({ repeatValue: state.repeatValue + 1 });
    }
  },

  // getters
  getCurrentSongIndex: () => {
    const state = usePlaylist.getState() as PlaylistStore;

    return state.currentSongIndex;
  },
  getCurrentSongId: () => {
    const state = usePlaylist.getState() as PlaylistStore;

    return state.playlist[state.currentSongIndex];
  },
  getPreviousSongPlaylistIndex: () => {
    const state = usePlaylist.getState() as PlaylistStore;

    // if on first song return the last one
    if (state.currentSongIndex === 0) {
      return state.playlist.length - 1;
    } else {
      return state.currentSongIndex - 1;
    }
  },
  getPreviousSongId: () => {
    const state = usePlaylist.getState() as PlaylistStore;

    return state.playlist[state.getPreviousSongPlaylistIndex()];
  },
  getNextSongPlaylistIndex: () => {
    const state = usePlaylist.getState() as PlaylistStore;

    // if on last song, goes back to the first one
    if (state.currentSongIndex === state.playlist.length - 1) {
      return 0;
    } else {
      return state.currentSongIndex + 1;
    }
  },
  getNextSongId: () => {
    const state = usePlaylist.getState() as PlaylistStore;

    return state.playlist[state.getNextSongPlaylistIndex()];
  },
  getRepeatValue: () => {
    const state = usePlaylist.getState() as PlaylistStore;

    return state.repeatValue;
  }
}));

export default usePlaylist;
