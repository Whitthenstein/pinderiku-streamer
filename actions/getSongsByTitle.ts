import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import getSongs from "@/actions/getSongs";

import { Song } from "@/types";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  if (!title) {
    const allSongs = await getSongs();
    return Array.from(allSongs.values());
  }

  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .ilike("title", `%${title}%`)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("[GET_SONGS_BY_TITLE]: ", error);
  }

  return (data as any) || [];
};

export default getSongsByTitle;
