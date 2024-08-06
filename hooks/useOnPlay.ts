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

  const onPlay = (url: string) => {
    // if (!user) {
    //   return authModal.onOpen();
    // }

    const publicUrl = publicSongsUrls.find((publicUrlToTest) =>
      publicUrlToTest.includes(url)
    );

    player.setActiveUrl(publicUrl ? publicUrl : undefined);
    player.setUrls(publicSongsUrls);
  };

  return onPlay;
};

export default useOnPlay;
