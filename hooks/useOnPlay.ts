import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import useLoadSongsUrls from "./useLoadSongsUrls";
import { useUser } from "./useUser";

import { Song } from "@/types";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const authModal = useAuthModal();
  const { user } = useUser();
  const publicSongsUrls = useLoadSongsUrls(songs);

  const onPlay = (url: string) => {
    // if (!user) {
    //   return authModal.onOpen();
    // }

    const publicUrl = publicSongsUrls.find((publicUrlToTest) =>
      publicUrlToTest.includes(url)
    );

    player.setActiveUrl(publicUrl ? publicUrl : null);
    player.setUrls(publicSongsUrls);
  };

  return onPlay;
};

export default useOnPlay;
