"use client";

import { useUser } from "@/hooks/useUser";
import ListItem from "./ListItem";

const LikedSongs = () => {
  const { user } = useUser();
  return (
    <div
      className="grid
        grid-cols-1
        sm:grid-cols-2
        xl:grid-cols-3
        2xl:grid-cols-4
        gap-3
        mt-4
      "
    >
      {user?.id && (
        <ListItem
          image="/img/liked.png"
          name="Liked Songs"
          href="liked"
        />
      )}
    </div>
  );
};

export default LikedSongs;
