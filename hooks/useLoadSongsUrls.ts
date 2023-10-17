import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadSongsUrls = (songs: Song[]) => {
  const { supabaseClient } = useSessionContext();

  if (!songs || songs.length === 0) {
    return [];
  }

  return songs.map((song) => {
    const { data: songData } = supabaseClient.storage
      .from("songs")
      .getPublicUrl(song.song_path);

    return songData.publicUrl;
  });
};

export default useLoadSongsUrls;
