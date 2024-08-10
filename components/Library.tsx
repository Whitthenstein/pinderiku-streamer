"use client";

import { TbPlaylist } from "react-icons/tb";

import usePlay from "@/hooks/usePlay";

import { SongsMap } from "@/types";

import MediaItem from "./MediaItem";
import usePlayer from "@/hooks/usePlayer";
import { useEffect } from "react";
import AnimatedBorderContainer from "./AnimatedBorderContainer";
import usePlaylist from "@/hooks/usePlaylist";
interface LibraryProps {
  songs: SongsMap;
}

export const Library: React.FC<LibraryProps> = ({ songs }) => {
  const { playSong } = usePlay();
  const { getSongsArray, setSongs } = usePlayer((state) => state);
  const { getCurrentSongId } = usePlaylist((state) => state);

  const currentSongId = getCurrentSongId();
  const songsArray = getSongsArray(songs);

  useEffect(() => {
    setSongs(songs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist
            className="text-neutral-400"
            size={26}
          />
          <p className="text-neutral-400 font-medium text-md">Library</p>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 mt-4 px-3">
        {songsArray.map((song) => (
          <AnimatedBorderContainer
            key={song.id}
            shouldAnimate={currentSongId === song.id}
          >
            <MediaItem
              onClick={(songId: string) => playSong(songId)}
              song={song}
            />
          </AnimatedBorderContainer>
        ))}
      </div>
    </div>
  );
};
