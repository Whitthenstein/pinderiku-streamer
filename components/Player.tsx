"use client";

import useGetSongBySongPath from "@/hooks/useGetSongBySongPath";
import usePlayer from "@/hooks/usePlayer";
import { useUser } from "@/hooks/useUser";

import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { user } = useUser();
  const songPath = player.activeUrl?.split("/").at(-1);
  const { song } = useGetSongBySongPath(songPath);

  if (!song || !player.activeUrl || !player || !user) {
    return null;
  }

  return (
    <div
      className="
        absolute
        bottom-0
        w-full
        h-[80px]
      "
    >
      <PlayerContent song={song} />
    </div>
  );
};

export default Player;
