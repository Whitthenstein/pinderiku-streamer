import { Song } from "@/types";
import usePlayer from "./usePlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import useSubscribeModal from "./useSubscribeModal";
import { useEffect } from "react";
import useLoadSongsUrls from "./useLoadSongsUrls";

const useOnPlay = (songs: Song[]) => {
  const player = usePlayer();
  const subscribeModal = useSubscribeModal();
  const authModal = useAuthModal();
  const { user, subscription } = useUser();
  const publicSongsUrls = useLoadSongsUrls(songs);

  useEffect(() => {
    if (!player.sound) {
      player.setSound(new Audio());
    }
  }, [player]);

  const onPlay = (url: string) => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    const publicUrl = publicSongsUrls.find((publicUrlToTest) =>
      publicUrlToTest.includes(url)
    );

    player.sound?.setUrl(publicUrl ? publicUrl : null);
    player.sound?.setUrls(publicSongsUrls);
  };

  return onPlay;
};

export default useOnPlay;
