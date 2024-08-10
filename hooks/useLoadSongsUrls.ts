import { useSessionContext } from "@supabase/auth-helpers-react";

const useLoadSongUrl = () => {
  const { supabaseClient } = useSessionContext();

  const getSongPublicUrl = (songPath: string) => {
    const {
      data: { publicUrl }
    } = supabaseClient.storage.from("songs").getPublicUrl(songPath);

    return publicUrl;
  };

  return { getSongPublicUrl };
};

export default useLoadSongUrl;
