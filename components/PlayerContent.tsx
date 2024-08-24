"use client";

import { useState } from "react";
import { usePrevious } from "@uidotdev/usehooks";

import { ScaleLoader } from "react-spinners";
import {
  BsPauseFill,
  BsPlayFill,
  BsFillSkipEndFill,
  BsFillSkipStartFill,
  BsFillSkipBackwardFill,
  BsFillSkipForwardFill
} from "react-icons/bs";

import { LuVolume, LuVolume1, LuVolume2, LuVolumeX, LuRepeat, LuRepeat1 } from "react-icons/lu";

import usePlayer from "@/hooks/usePlayer";

import Wave from "./Wave";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import EQBars from "./EQBars";
import Slider from "./Slider";
import usePlaylist, { REPEAT_VALUES } from "@/hooks/usePlaylist";
import usePlay from "@/hooks/usePlay";

const getRepeatIcon = (repeatValue: number, toggleRepeat: () => void) => {
  switch (repeatValue) {
    case REPEAT_VALUES.NO_REPEAT:
      return (
        <LuRepeat
          onClick={toggleRepeat}
          size={34}
          className="cursor-pointer opacity-50"
        />
      );
    case REPEAT_VALUES.REPEAT_ALL:
      return (
        <LuRepeat
          onClick={toggleRepeat}
          size={34}
          className="cursor-pointer"
        />
      );
    case REPEAT_VALUES.REPEAT_CURRENT:
      return (
        <LuRepeat1
          onClick={toggleRepeat}
          size={34}
          className="cursor-pointer"
        />
      );
  }
};

const getVolumeIcon = (volume: number) => {
  if (volume === 0) {
    return LuVolumeX;
  }

  if (volume <= 0.33) {
    return LuVolume;
  }

  if (volume <= 0.66) {
    return LuVolume1;
  }

  return LuVolume2;
};

const PlayerContent = () => {
  const { getIsLoading, getCurrentSong, getWaveform, getMedia, getSongs } = usePlayer(
    (state) => state
  );
  const currentSong = getCurrentSong();
  const isLoading = getIsLoading();
  const waveform = getWaveform();
  const audioMedia = getMedia();
  const songs = getSongs();

  const { getRepeatValue, toggleRepeat } = usePlaylist((state) => state);
  const repeatValue = getRepeatValue();

  const { playNext, playPrevious } = usePlay();
  const [volume, setVolume] = useState(1);
  const previousVolume = usePrevious(volume);
  const [isPlaying, setIsPlaying] = useState(waveform?.isPlaying());
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = getVolumeIcon(volume);

  const handlePlay = async () => {
    if (isLoading || !audioMedia) {
      return;
    }

    if (audioMedia.paused) {
      audioMedia.play();
    } else {
      audioMedia.pause();
    }
  };

  const handlePrevious = () => {
    if (isLoading || songs.size === 0) {
      return;
    }

    playPrevious();
  };

  const handleNext = () => {
    if (isLoading || songs.size === 0) {
      return;
    }

    playNext();
  };

  const handleBackward = () => {
    if (!audioMedia) {
      return;
    }

    const newTime = audioMedia.currentTime - 5;
    if (newTime < 0) {
      playPrevious();
    } else {
      audioMedia.currentTime = newTime;
    }
  };

  const handleForward = () => {
    if (!audioMedia) {
      return;
    }

    const newTime = audioMedia.currentTime + 5;
    if (newTime > audioMedia.duration) {
      playNext();
    } else {
      audioMedia.currentTime = newTime;
    }
  };

  const toggleMute = () => {
    const isMuted = waveform?.getMuted();
    waveform?.setMuted(!isMuted);
    if (isMuted) {
      setVolume(previousVolume);
      waveform?.setVolume(previousVolume);
    } else {
      setVolume(0);
      waveform?.setVolume(0);
    }
  };

  const handleSetVolume = (value: number) => {
    setVolume(value);
    waveform?.setVolume(value);
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="grid h-full w-full grid-cols-2 px-4 md:grid-cols-5">
        <div className="flex w-full justify-start gap-4">
          <div className="flex w-3/4 items-center gap-x-4">
            {currentSong && <MediaItem song={currentSong} />}
            {currentSong && <LikeButton songId={currentSong.id} />}
          </div>
        </div>
        <div className="col-auto flex items-center justify-end md:hidden">
          <div
            onClick={handlePlay}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
          >
            {isLoading ? (
              <ScaleLoader
                height={20}
                radius={5}
                width={2}
              />
            ) : (
              <Icon
                size={30}
                className="text-black"
              />
            )}
          </div>
        </div>
        <div className="hidden items-center gap-x-4 md:flex">
          <Wave setIsPlaying={setIsPlaying} />
        </div>
        <div className="hidden h-full w-full items-center justify-center gap-x-6 md:flex">
          <BsFillSkipStartFill
            onClick={handlePrevious}
            size={20}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
          />
          <BsFillSkipBackwardFill
            onClick={handleBackward}
            size={25}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
          />
          <div
            onClick={handlePlay}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white p-1"
          >
            {isLoading ? (
              <ScaleLoader
                height={20}
                radius={5}
                width={2}
              />
            ) : (
              <Icon
                size={30}
                className="text-black"
              />
            )}
          </div>

          <BsFillSkipForwardFill
            onClick={handleForward}
            size={25}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
          />
          <BsFillSkipEndFill
            onClick={handleNext}
            size={20}
            className="cursor-pointer text-neutral-400 transition hover:text-white"
          />
        </div>
        {/* EQ Bars */}
        <div className="hidden h-full w-full items-center md:flex">
          <EQBars />
        </div>
        <div className="hidden w-full justify-end pr-2 md:flex">
          <div className="flex w-[120px] items-center gap-x-2">
            {getRepeatIcon(repeatValue, toggleRepeat)}
            <VolumeIcon
              onClick={toggleMute}
              size={34}
              className="cursor-pointer"
            />
            <Slider
              value={volume}
              onChange={handleSetVolume}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
