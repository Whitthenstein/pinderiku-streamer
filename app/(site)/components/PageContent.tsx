"use client";

import SongItem from "@/components/SongItem";

import usePlayer from "@/hooks/usePlayer";

import { SongsMap } from "@/types";

interface PageContentProps {
  songs: SongsMap;
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  const { getSongsArray } = usePlayer((state) => state);

  if (songs.size === 0) {
    return <div className="mt-4 text-neutral-400">No songs available.</div>;
  }

  const songsArray = getSongsArray(songs);

  return (
    <div
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-3
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-8
        gap-4
        mt-4
      "
      data-testid="songs-container"
    >
      {songsArray.map((song) => (
        <SongItem
          key={song.id}
          song={song}
        />
      ))}
    </div>
  );
};

export default PageContent;
