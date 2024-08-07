"use client";

import { TbPlaylist } from "react-icons/tb";

import useOnPlay from "@/hooks/useOnPlay";

import { Song } from "@/types";

import MediaItem from "./MediaItem";
interface LibraryProps {
  songs: Song[];
}

export const Library: React.FC<LibraryProps> = ({ songs }) => {
  const onPlay = useOnPlay(songs);

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
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem
            onClick={(url: string) => onPlay(url)}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};
