import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song, SongsMap } from "@/types";

const getSongs = async (): Promise<SongsMap> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log("[GET_SONGS]: ", error);
  }

  let songs: SongsMap = new Map();
  if (data) {
    for (const song of data) {
      songs.set(song.id, song);
    }
  }
  return songs;
};

export default getSongs;
