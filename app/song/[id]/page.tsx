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
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto ">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">{song.title}</h1>
          <h2 className="text-white text-lg font-semibold">{song.author}</h2>
        </div>
      </Header>
      <SongContent song={song} />
    </div>
  );
};

export default Song;
