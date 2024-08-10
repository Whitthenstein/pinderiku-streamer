import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { Song } from "@/types";

const getSongById = async (id: string): Promise<Song> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const { data: song, error } = await supabase
    .from("songs")
    .select("*")
    .eq("id", id)
    .limit(1)
    .single();

  if (error) {
    console.log("[GET_SONG_BY_ID]: ", error);
  }

  return song;
};

export default getSongById;
