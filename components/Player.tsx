"use client";

import usePlayer from "@/hooks/usePlayer";

import PlayerContent from "./PlayerContent";

const Player = () => {
  const { activeSong } = usePlayer();

  if (!activeSong) {
    return null;
  }

  return (
    <div className="absolute bottom-0 w-full h-[88px]">
      <PlayerContent song={activeSong} />
    </div>
  );
};

export default Player;
