import usePlayer from "@/hooks/usePlayer";
import usePlaylist from "./usePlaylist";
import useLoadSongUrl from "./useLoadSongsUrls";

const usePlay = () => {
  const { getSongById, setIsLoading, getSongsArray, getWaveform } = usePlayer(
    (state) => state
  );
  const {
    getCurrentSongId,
    setPlaylist,
    setCurrentSongIndex,
    getNextSongId,
    getPreviousSongId
  } = usePlaylist((state) => state);
  const { getSongPublicUrl } = useLoadSongUrl();

  const playSong = (songId: string) => {
    const song = getSongById(songId);
    const waveform = getWaveform();

    if (song) {
      const currentSongID = getCurrentSongId();

      if (currentSongID === songId) {
        // don't play the same song again
        return;
      }

      if (currentSongID !== songId) {
        setIsLoading(true);
      }
      const publicUrl = getSongPublicUrl(song.song_path);
      const peakData = song.peak_data;

      setPlaylist(
        // TODO: support for a more dynamic playlist set
        getSongsArray().map((song) => song.id)
      );

      setCurrentSongIndex(song.id);
      waveform?.load(publicUrl, peakData);
    }
  };

  const playNext = () => {
    const nextSongId = getNextSongId();

    playSong(nextSongId);
  };

  const playPrevious = () => {
    const previousSongId = getPreviousSongId();

    playSong(previousSongId);
  };

  return { playSong, playNext, playPrevious };
};

export default usePlay;
