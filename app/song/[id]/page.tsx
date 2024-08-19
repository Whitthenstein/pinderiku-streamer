import React from "react";

import Header from "@/components/Header";
import SongContent from "./components/SongContent";

import getSongById from "@/actions/getSongById";

export const revalidate = 0;

const Song = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const song = await getSongById(id);

  if (!song) {
    return null;
  }

  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header className="">
        <div className="mb-2 flex flex-col items-center justify-center gap-y-6">
          <h1 className="text-5xl font-bold text-white">{song.title}</h1>
          <h2 className="text-lg font-semibold text-white">{song.author}</h2>
        </div>
      </Header>
      <SongContent song={song} />
    </div>
  );
};

export default Song;
