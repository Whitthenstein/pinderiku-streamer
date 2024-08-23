import { useSessionContext } from "@supabase/auth-helpers-react";

const useLoadSongUrl = () => {
  const { supabaseClient } = useSessionContext();

  const getSongPublicUrl = (songPath: string) => {
    const {
      data: { publicUrl }
    } = supabaseClient.storage.from("songs").getPublicUrl(songPath);

    return publicUrl;
  };

  const getSongImagePublicUrl = (imagePath: string) => {
    const {
      data: { publicUrl }
    } = supabaseClient.storage.from("images").getPublicUrl(imagePath);

    return publicUrl;
  };

  return { getSongPublicUrl, getSongImagePublicUrl };
};

export default useLoadSongUrl;
