"use client";

import usePlayer from "@/hooks/usePlayer";

import PlayerContent from "./PlayerContent";
import { cn } from "@/libs/utils";

const Player = () => {
  const { getCurrentSong } = usePlayer((state) => state);

  const currentSong = getCurrentSong();

  return (
    <div
      className={cn("absolute bottom-0 h-[88px] w-full bg-black", !currentSong ? "invisible" : "")}
    >
      <PlayerContent />
    </div>
  );
};

export default Player;
