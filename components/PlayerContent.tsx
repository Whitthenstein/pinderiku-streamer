"use client";

import { useCallback, useEffect, useState } from "react";
import { usePrevious } from "@uidotdev/usehooks";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import usePlayer from "@/hooks/usePlayer";

import { Song } from "@/types";

import Wave from "./Wave";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import EQBars from "./EQBars";
import Slider from "./Slider";

interface PlayerContentProps {
  song: Song;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const previousVolume = usePrevious(volume);
  const [isPlaying, setIsPlaying] = useState(false);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.isLoading) {
      return;
    }

    if (player.urls.length === 0) {
      return;
    }

    const currentIndex = player.urls.findIndex(
      (url) => url === player.activeUrl
    );
    const nextSong = player.urls[currentIndex + 1];

    player.setActiveUrl(nextSong ? nextSong : player.urls[0]);
  };

  const onPlayPrevious = () => {
    if (player.isLoading) {
      return;
    }
    if (player.urls.length === 0) {
      return;
    }

    const currentIndex = player.urls.findIndex(
      (url) => url === player.activeUrl
    );
    const previousSong = player.urls[currentIndex - 1];

    player.setActiveUrl(
      previousSong ? previousSong : player.urls[player.urls.length - 1]
    );
  };

  const handlePlay = useCallback(async () => {
    if (player.isLoading) {
      return;
    }

    player.sound?.playPause();
    setIsPlaying(!isPlaying);
  }, [isPlaying, player.sound, player.isLoading]);

  const toggleMute = () => {
    const isMuted = player.sound?.getMuted();
    player.sound?.setMuted(!isMuted);
    if (isMuted) {
      setVolume(previousVolume);
      player.sound?.setVolume(previousVolume);
    } else {
      setVolume(0);
      player.sound?.setVolume(0);
    }
  };

  const handleSetVolume = (value: number) => {
    setVolume(value);
    player.sound?.setVolume(value);
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
            <MediaItem data={song} />
            <LikeButton songId={song.id} />
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
            <Icon
              size={30}
              className="text-black"
            />
          </div>
        </div>
        <div className="hidden md:flex items-center gap-x-4">
          <Wave
            song={song}
            onPlayNext={onPlayNext}
            onPlayPrevious={onPlayPrevious}
            setIsPlaying={setIsPlaying}
          />
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
            onClick={onPlayPrevious}
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
            <Icon
              size={30}
              className="text-black"
            />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
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
