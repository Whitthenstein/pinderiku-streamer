import usePlayer from "@/hooks/usePlayer";
import usePlaylist, { REPEAT_VALUES } from "./usePlaylist";
import useLoadSongUrl from "./useLoadSongsUrls";
import { useWavesurfer } from "./useWavesurfer";
import { useEffect, useState } from "react";

const usePlay = () => {
  const { getSongById, setIsLoading, getSongsArray, getWaveform, getMedia } = usePlayer(
    (state) => state
  );
  const {
    getCurrentSongId,
    setPlaylist,
    setCurrentSongIndex,
    getNextSongId,
    getPreviousSongId,
    getRepeatValue,
    getCurrentSongIndex,
    getPlaylistLength
  } = usePlaylist((state) => state);
  const { getSongPublicUrl } = useLoadSongUrl();

  const playSong = (songId: string, shouldNotPlay?: boolean) => {
    const song = getSongById(songId);
    const waveform = getWaveform();
    const audioMedia = getMedia();

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
      !shouldNotPlay && audioMedia?.play();
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

  const onFinish = () => {
    const audioMedia = getMedia();
    const waveform = getWaveform();
    const repeatValue = getRepeatValue();
    const playlistLength = getPlaylistLength();
    const currentSongIndex = getCurrentSongIndex();

    switch (repeatValue) {
      case REPEAT_VALUES.NO_REPEAT:
        if (currentSongIndex !== playlistLength - 1) {
          playNext();
        } else {
          // set current song to first one but don't play it
          const nextSongId = getNextSongId();
          playSong(nextSongId);
          waveform?.setVolume(0);
          setTimeout(() => {
            audioMedia?.pause();
            waveform?.setTime(0);
            waveform?.setVolume(1);
          }, 500);
        }
        break;
      case REPEAT_VALUES.REPEAT_ALL:
        playNext();
        break;
      case REPEAT_VALUES.REPEAT_CURRENT:
        setIsLoading(true);
        const songId = getCurrentSongId();
        const song = getSongById(songId)!;
        const publicUrl = getSongPublicUrl(song.song_path);
        const peakData = song.peak_data;

        setCurrentSongIndex(song.id);
        waveform?.load(publicUrl, peakData);
        audioMedia?.play();
        break;
    }
  };

  return { playSong, playNext, playPrevious, onFinish };
};

export default usePlay;
