"use client";

import { useCallback, useState } from "react";
import { usePrevious } from "@uidotdev/usehooks";

import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { LuVolume, LuVolume1, LuVolume2, LuVolumeX, LuRepeat, LuRepeat1 } from "react-icons/lu";

import usePlayer, { REPEAT_VALUES} from "@/hooks/usePlayer";

import { Song } from "@/types";

import Wave from "./Wave";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import EQBars from "./EQBars";
import Slider from "./Slider";

interface PlayerContentProps {
  song: Song;
}

const getRepeatIcon = (repeatValue: number, toggleRepeat: () => void) => {
  switch (repeatValue) {
    case REPEAT_VALUES.NO_REPEAT:
      return <LuRepeat 
      onClick={toggleRepeat}
      size={34}
      className="cursor-pointer opacity-50"/>
    case REPEAT_VALUES.REPEAT_ALL:
      return <LuRepeat 
      onClick={toggleRepeat}
      size={34}
      className="cursor-pointer"/>;
    case REPEAT_VALUES.REPEAT_CURRENT:
      return <LuRepeat1
      onClick={toggleRepeat}
      size={34}
      className="cursor-pointer"/>;
  }
}

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

const PlayerContent: React.FC<PlayerContentProps> = ({ song }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const previousVolume = usePrevious(volume);
  const [isPlaying, setIsPlaying] = useState(player.sound?.isPlaying());
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = getVolumeIcon(volume);

  // TODO: fix change activeSong on play next and previous to fix media item in player not changing image
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
    player.setIsLoading(true);
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
    player.setIsLoading(true);
  };

  const handlePlay = useCallback(async () => {
    if (player.isLoading) {
      return;
    }

    player.sound?.playPause();
  }, [player]);

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

  const toggleRepeat = () => {
    player.toggleRepeat()
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
          {/* {getRepeatIcon(player.repeat, toggleRepeat)} */}
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
