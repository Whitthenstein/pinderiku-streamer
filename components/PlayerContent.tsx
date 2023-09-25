"use client";

import React, { useEffect, useState } from "react";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";

interface PlayerContentProps {
  song: Song;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const onPlayNext = () => {
    if (player.urls.length === 0) {
      return;
    }

    const currentIndex = player.urls.findIndex(
      (url) => url === player.activeUrl
    );
    const nextSong = player.urls[currentIndex + 1];

    player.sound?.pause();

    if (!nextSong) {
      player.setActiveUrl(player.urls[0]);
      player.sound?.play(player.urls[0]);
      return;
    }

    player.setActiveUrl(nextSong);
    player.sound?.play(nextSong);
  };

  const onPlayPrevious = () => {
    if (player.urls.length === 0) {
      return;
    }

    const currentIndex = player.urls.findIndex(
      (url) => url === player.activeUrl
    );
    const previousSong = player.urls[currentIndex - 1];

    player.sound?.pause();

    if (!previousSong) {
      player.setActiveUrl(player.urls[player.urls.length - 1]);
      player.sound?.play(player.urls[player.urls.length - 1]);
      return;
    }

    player.setActiveUrl(previousSong);
    player.sound?.play(previousSong);
  };

  useEffect(() => {
    player.sound?.play();
    setIsPlaying(true);
  }, [player]);

  const handlePlay = () => {
    if (!isPlaying) {
      player.sound?.play();
    } else {
      player.sound?.pause();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  useEffect(() => {
    if (!player.sound) {
      player.setSound(new Audio(), {
        onEnd: () => {
          player.sound?.pause();
          onPlayNext();
        },
      });
    }
    player.sound?.play(player.activeUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      <div
        className="
        flex
        w-full
        justify-start
        gap-20
        "
      >
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
        <div
          className="
        flex
        w-full
        items-center
        justify-center
      "
        >
          Progress Bar here
        </div>
      </div>

      <div
        className="
        flex
        md:hidden
        col-auto
        w-full
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
      <div
        className="
        hidden
        h-full
        md:flex
        justify-center
        items-center
        w-full
        max-w-[722px]
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
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            size={34}
            className="cursor-pointer"
          />
          <Slider
            value={volume}
            onChange={(value) => setVolume(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerContent;
