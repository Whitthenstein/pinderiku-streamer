// import useAuthModal from "@/hooks/useAuthModal";
// import { useUser } from "@/hooks/useUser";
import useLoadSongsUrls from "@/hooks/useLoadSongsUrls";
import usePlayer from "@/hooks/usePlayer";

import { Song } from "@/types";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  // const authModal = useAuthModal();
  // const { user } = useUser();
  const publicSongsUrls = useLoadSongsUrls(songs);

  const onPlay = (songPath: string) => {
    // if (!user) {
    //   return authModal.onOpen();
    // }

    const publicUrl = publicSongsUrls.find((publicUrlToTest) =>
      publicUrlToTest.includes(songPath)
    );

    const song = songs.find(song => song.song_path === songPath);

    if (publicUrl) {
      if (publicUrl !== player.activeUrl) {
        player.setIsLoading(true);
      }
      player.setActiveUrl(publicUrl ? publicUrl : undefined);
      player.setUrls(publicSongsUrls);
      player.setActivePeakData(song.peak_data);
    }
  };

  return onPlay;
};

export default useOnPlay;
