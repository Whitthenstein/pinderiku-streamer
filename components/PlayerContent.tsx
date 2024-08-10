"use client";

import { useCallback, useState } from "react";
import { usePrevious } from "@uidotdev/usehooks";

import { ScaleLoader } from "react-spinners";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import {
  LuVolume,
  LuVolume1,
  LuVolume2,
  LuVolumeX,
  LuRepeat,
  LuRepeat1
} from "react-icons/lu";

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
  const { getIsLoading, getCurrentSong, getWaveform, getSongs } = usePlayer(
    (state) => state
  );
  const currentSong = getCurrentSong();
  const isLoading = getIsLoading();
  const waveform = getWaveform();
  const songs = getSongs();

  const { playNext, playPrevious } = usePlay();
  const [volume, setVolume] = useState(1);
  const previousVolume = usePrevious(volume);
  const [isPlaying, setIsPlaying] = useState(waveform?.isPlaying());
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = getVolumeIcon(volume);

  const handlePlay = useCallback(async () => {
    if (isLoading) {
      return;
    }

    waveform?.playPause();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waveform]);

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
    <div className="flex items-center w-full flex-col h-full">
      <div className="grid grid-cols-2 md:grid-cols-5 h-full w-full px-4">
        <div
          className="
        flex
        w-full
        justify-start
        gap-4
        "
        >
          <div className="flex items-center w-3/4 gap-x-4">
            {currentSong && <MediaItem song={currentSong} />}
            {currentSong && <LikeButton songId={currentSong.id} />}
          </div>
        </div>
        <div
          className="
        flex
        md:hidden
        col-auto
        justify-end
        items-center
      "
        >
          <div
            onClick={handlePlay}
            className="
            h-10
            w-10
            flex
            items-center
            justify-center
            rounded-full
            bg-white
            p-1
            cursor-pointer
        "
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
        <div className="hidden md:flex items-center gap-x-4">
          <Wave setIsPlaying={setIsPlaying} />
        </div>
        <div
          className="
        hidden
        h-full
        md:flex
        justify-center
        items-center
        w-full
        gap-x-6
      "
        >
          <AiFillStepBackward
            onClick={handlePrevious}
            size={30}
            className="
            text-neutral-400
            cursor-pointer
            hover:text-white
            transition

        "
          />
          <div
            onClick={handlePlay}
            className="
            flex
            items-center
            justify-center
            h-10
            w-10
            rounded-full
            bg-white
            p-1
            cursor-pointer
        "
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
          <AiFillStepForward
            onClick={handleNext}
            size={30}
            className="
              text-neutral-400
              cursor-pointer
              hover:text-white
              transition
            "
          />
        </div>
        {/* EQ Bars */}
        <div className="hidden md:flex w-full h-full items-center">
          <EQBars />
        </div>
        <div className="hidden md:flex w-full justify-end pr-2">
          <div className="flex items-center gap-x-2 w-[120px]">
            {/* {getRepeatIcon(playlist.repeatValue, playlist.toggleRepeat)} */}
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
