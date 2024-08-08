// import useAuthModal from "@/hooks/useAuthModal";
// import { useUser } from "@/hooks/useUser";
import useLoadSongsUrls from "@/hooks/useLoadSongsUrls";
import usePlayer from "@/hooks/usePlayer";

import { Song } from "@/types";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const urls = useLoadSongsUrls(songs);

  const onPlay = (songPath: string) => {
    const publicUrl = urls.find(url => url.includes(songPath));
    const song = songs.find(song => song.song_path === songPath);

    if (song) {
      if (player.activeSong?.song_path !== songPath) {
        player.setIsLoading(true);
      }
      player.setActiveSong(song);
      player.setActiveUrl(publicUrl);
      player.setUrls(urls);
    }
  };

  return onPlay;
};

export default useOnPlay;
